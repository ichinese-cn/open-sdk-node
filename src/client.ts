/**
 * The open platform's server SDK for Node.js (M4.85): every operation of the open API as a method
 * (generated from docs/api/open-api.yaml), plus what each app would otherwise write itself — getting the
 * app and tenant tokens and renewing them before they expire, retrying after rate limits and server
 * errors with backoff, paging through lists, typed errors, and exchanging the web login's codes.
 *
 *   const client = new Client({ appId: process.env.APP_ID!, appSecret: process.env.APP_SECRET! });
 *   for await (const m of client.listTenantMembersAll({}, { tenantKey })) console.log(m.name);
 *   const user = await client.exchangeAuthCode(code);            // the code from the JS SDK
 *   const me = await client.getUserInfo({ userAccessToken: user.access_token });
 */
import { OpenApiError } from './errors.ts';
import { API_PREFIX, DEFAULT_BASE_URL, VERSION } from './gen/meta.ts';
import { type BodyOf, Operations, type QueryOf, type ResultOf } from './gen/operations.ts';
import type {
  CallSpec,
  ClientOptions,
  RequestOptions,
  TenantAccessToken,
  TokenType,
  UserAccessToken,
  WaitVideoOptions,
} from './types.ts';

interface Cached {
  token: string;
  expiresAt: number;
}

const RETRY_STATUSES = new Set([500, 502, 503, 504]);
const IDEMPOTENT = new Set(['GET', 'PUT', 'DELETE']);

export class Client extends Operations {
  readonly appId: string;
  readonly baseUrl: string;
  private readonly appSecret: string;
  private readonly maxRetries: number;
  private readonly timeoutMs: number;
  private readonly fetchFn: typeof fetch;
  private readonly refreshBefore: number;
  private readonly userAgent: string;
  /** Base of the retry backoff in ms (tests make it small). */
  retryBaseMs = 500;
  private readonly tokens = new Map<string, Cached>();
  private readonly inflight = new Map<string, Promise<Cached>>();

  constructor(options: ClientOptions) {
    super();
    if (!options.appId || !options.appSecret) throw new TypeError('appId and appSecret are required');
    this.appId = options.appId;
    this.appSecret = options.appSecret;
    this.baseUrl = (options.baseUrl ?? DEFAULT_BASE_URL).replace(/\/+$/, '').replace(/\/open-apis\/v1$/, '');
    this.maxRetries = options.maxRetries ?? 3;
    this.timeoutMs = options.timeoutMs ?? 30_000;
    this.fetchFn = options.fetch ?? fetch;
    this.refreshBefore = options.refreshBeforeSeconds ?? 300;
    this.userAgent = `ichinese-open-sdk-node/${VERSION}${options.userAgent ? ` ${options.userAgent}` : ''}`;
  }

  // ── tokens ────────────────────────────────────────────────────────────────

  /** The app token (cached, renewed before it expires). */
  async appAccessToken(): Promise<string> {
    return (
      await this.cached('app', async () => {
        const r = await this.send<{ app_access_token: string; expires_in: number }>('POST', '/auth/app_access_token', {
          body: this.credentials(),
        });
        return { token: r.app_access_token, expiresIn: r.expires_in };
      })
    ).token;
  }

  /** The tenant token of an institution that installed the app (cached per institution, renewed). */
  async tenantAccessToken(tenantKey: string): Promise<string> {
    return (
      await this.cached(`tenant:${tenantKey}`, async () => {
        const r = await this.send<TenantAccessToken>('POST', '/auth/tenant_access_token', {
          body: { ...this.credentials(), tenant_key: tenantKey },
        });
        return { token: r.tenant_access_token, expiresIn: r.expires_in };
      })
    ).token;
  }

  /**
   * The web login (免登): exchanges the code your page got from the JS SDK's `requestAuthCode()` for a
   * user token and the user's `open_id`. A code from the plain-browser fallback (standard OIDC) also
   * needs the `redirectUri` and `codeVerifier` the JS SDK returned with it. Exchange codes on your
   * backend only: the App Secret never goes to the page.
   */
  exchangeAuthCode(code: string, opts: { redirectUri?: string; codeVerifier?: string } = {}): Promise<UserAccessToken> {
    return this.send<UserAccessToken>('POST', '/auth/exchange_auth_code', {
      body: {
        ...this.credentials(),
        code,
        ...(opts.redirectUri ? { redirect_uri: opts.redirectUri } : {}),
        ...(opts.codeVerifier ? { code_verifier: opts.codeVerifier } : {}),
      },
      retryPost: false,
    });
  }

  /** A new pair for a refresh token (the old one stops working). */
  refreshUserToken(refreshToken: string): Promise<UserAccessToken> {
    return this.send<UserAccessToken>('POST', '/auth/refresh_user_token', {
      body: { ...this.credentials(), refresh_token: refreshToken },
      retryPost: false,
    });
  }

  /** Revokes a user or refresh token (when the user signs out of your app). */
  async revokeToken(token: string): Promise<void> {
    await this.send<void>('POST', '/auth/revoke', { body: { ...this.credentials(), token } });
  }

  /** Forgets the cached app and tenant tokens (they are fetched again when next needed). */
  clearTokenCache() {
    this.tokens.clear();
  }

  // ── posting in a person's name (D105), and as the institution (M6.21 K2) ─────

  /**
   * Uploads an image for a post: asks for an upload slot, PUTs the bytes there and returns the `key` to
   * put in `images[].key`. Up to 10 MB; jpeg, png, webp or gif.
   */
  uploadImage(
    userAccessToken: string,
    data: Uint8Array | Blob,
    contentType: BodyOf<'createCommunityImageUpload'>['content_type'],
    options: { signal?: AbortSignal } = {},
  ): Promise<string> {
    return this.uploadImageWith({ userAccessToken, signal: options.signal }, data, contentType);
  }

  /** `uploadImage` for a post of the institution (its tenant token, `community:post` granted by it). */
  uploadImageAsOrg(
    tenantKey: string,
    data: Uint8Array | Blob,
    contentType: BodyOf<'createCommunityImageUpload'>['content_type'],
    options: { signal?: AbortSignal } = {},
  ): Promise<string> {
    return this.uploadImageWith({ tenantKey, signal: options.signal }, data, contentType);
  }

  /**
   * Uploads a video for a post (up to 4 GB, 1 hour): asks for an upload slot, PUTs the file there and
   * starts transcoding. A large file goes as a Blob that reads from disk (`await fs.openAsBlob(path)`).
   * Returns the video's status (`asset_id`); wait for `ready` with `waitVideoReady` before posting.
   */
  uploadVideo(
    userAccessToken: string,
    data: Uint8Array | Blob,
    file: { filename: string; contentType: string },
    options: { signal?: AbortSignal } = {},
  ): Promise<ResultOf<'completeCommunityVideoUpload'>> {
    return this.uploadVideoWith({ userAccessToken, signal: options.signal }, data, file);
  }

  /** `uploadVideo` for a post of the institution. */
  uploadVideoAsOrg(
    tenantKey: string,
    data: Uint8Array | Blob,
    file: { filename: string; contentType: string },
    options: { signal?: AbortSignal } = {},
  ): Promise<ResultOf<'completeCommunityVideoUpload'>> {
    return this.uploadVideoWith({ tenantKey, signal: options.signal }, data, file);
  }

  /**
   * Waits until a video has been transcoded and returns it (`status: ready`). A failed transcode throws
   * an OpenApiError with reason `video_failed` (upload another file); running out of time throws one
   * with code TIMEOUT (reason `video_not_ready`). You also get the `community.video_ready` event.
   */
  waitVideoReady(
    userAccessToken: string,
    assetId: string,
    options: WaitVideoOptions = {},
  ): Promise<ResultOf<'getCommunityVideo'>> {
    return this.waitVideoWith({ userAccessToken }, assetId, options);
  }

  /** `waitVideoReady` for a video uploaded for the institution. */
  waitVideoReadyAsOrg(
    tenantKey: string,
    assetId: string,
    options: WaitVideoOptions = {},
  ): Promise<ResultOf<'getCommunityVideo'>> {
    return this.waitVideoWith({ tenantKey }, assetId, options);
  }

  /**
   * Posts in the person's name. Without a `uuid` the SDK makes one, so its own retries never post twice;
   * give your own `uuid` to make your retries safe too (one post per `uuid` within an hour). Errors keep the server's reason: `consent_required`
   * (send the person to `error.consentUrl`), `video_not_ready`, `video_failed`, `post_rate_limited`,
   * `app_user_daily_limit`, `daily_quota_exceeded`, `minor_not_allowed`, `app_post_stopped`, …
   */
  createPost(
    userAccessToken: string,
    post: BodyOf<'createCommunityPost'>,
    options: { signal?: AbortSignal } = {},
  ): Promise<ResultOf<'createCommunityPost'>> {
    return this.createPostWith({ userAccessToken, signal: options.signal }, post);
  }

  /**
   * Posts as the institution, with its community account (its name and logo; the post says it came from
   * this app). The institution must have installed the app and granted `community:post`; before its
   * homepage was first published there is no account yet (409 `no_org_account`). The same limits,
   * review and `uuid` handling as `createPost`.
   */
  createPostAsOrg(
    tenantKey: string,
    post: BodyOf<'createCommunityPost'>,
    options: { signal?: AbortSignal } = {},
  ): Promise<ResultOf<'createCommunityPost'>> {
    return this.createPostWith({ tenantKey, signal: options.signal }, post);
  }

  // ── the institution's dashboard (M6.21 K2) ────────────────────────────────

  /**
   * Every page of the institution's dashboard the API offers (`GET /insights`, `insights:readonly`): the
   * default page first, then each other tab it lists, with the same query (range, dates, filters). Returns
   * tab → page. Fewer than five people come back as `null` with `withheld: true`; money is per currency.
   */
  async getAllInsights(
    tenantKey: string,
    query: Omit<NonNullable<QueryOf<'getInsights'>>, 'tab'> = {},
    options: { signal?: AbortSignal } = {},
  ): Promise<Record<string, ResultOf<'getInsights'>>> {
    const who = { tenantKey, signal: options.signal };
    const first = await this.getInsights(query as QueryOf<'getInsights'>, who);
    const out: Record<string, ResultOf<'getInsights'>> = { [first.tab]: first };
    for (const tab of first.tabs) {
      if (out[tab]) continue;
      out[tab] = await this.getInsights({ ...query, tab } as QueryOf<'getInsights'>, who);
    }
    return out;
  }

  private async uploadImageWith(
    who: RequestOptions,
    data: Uint8Array | Blob,
    contentType: BodyOf<'createCommunityImageUpload'>['content_type'],
  ): Promise<string> {
    const slot = await this.createCommunityImageUpload({ content_type: contentType, size_bytes: sizeOf(data) }, who);
    await this.putUpload(slot.upload_url, slot.headers, data, who.signal);
    return slot.key;
  }

  private async uploadVideoWith(
    who: RequestOptions,
    data: Uint8Array | Blob,
    file: { filename: string; contentType: string },
  ): Promise<ResultOf<'completeCommunityVideoUpload'>> {
    const slot = await this.createCommunityVideoUpload(
      { filename: file.filename, content_type: file.contentType, size_bytes: sizeOf(data) },
      who,
    );
    await this.putUpload(slot.upload.url, slot.upload.headers, data, who.signal);
    // Calling it again has no effect, so it is retried like a GET.
    return this.send<ResultOf<'completeCommunityVideoUpload'>>(
      'POST',
      `/community/videos/${encodeURIComponent(slot.asset_id)}/complete`,
      { auth: this.postingAuth('completeCommunityVideoUpload', who), retryPost: true },
    );
  }

  private async waitVideoWith(
    who: RequestOptions,
    assetId: string,
    options: WaitVideoOptions,
  ): Promise<ResultOf<'getCommunityVideo'>> {
    const deadline = Date.now() + (options.timeoutMs ?? 30 * 60_000);
    let interval = options.intervalMs ?? 2_000;
    const maxInterval = options.maxIntervalMs ?? 15_000;
    for (;;) {
      const video = await this.getCommunityVideo(assetId, { ...who, signal: options.signal });
      if (video.status === 'ready') return video;
      if (video.status === 'failed') {
        throw new OpenApiError({
          status: 409,
          code: 'CONFLICT',
          message: `video ${assetId} could not be transcoded${video.error ? ` (${video.error})` : ''}`,
          details: { reason: 'video_failed', asset_id: assetId, error: video.error ?? null },
        });
      }
      const left = deadline - Date.now();
      if (left <= 0) {
        throw new OpenApiError({
          status: 0,
          code: 'TIMEOUT',
          message: `video ${assetId} is not ready yet (${video.status})`,
          details: { reason: 'video_not_ready', asset_id: assetId, status: video.status },
        });
      }
      await this.sleep(Math.min(interval, left), options.signal);
      interval = Math.min(interval * 2, maxInterval);
    }
  }

  private createPostWith(
    who: RequestOptions,
    post: BodyOf<'createCommunityPost'>,
  ): Promise<ResultOf<'createCommunityPost'>> {
    const body = post.uuid ? post : { ...post, uuid: crypto.randomUUID() };
    return this.send<ResultOf<'createCommunityPost'>>('POST', '/community/posts', {
      body,
      auth: this.postingAuth('createCommunityPost', who),
      retryPost: true,
    });
  }

  // ── calls ─────────────────────────────────────────────────────────────────

  /** Any open API call by method and path (`/tenant/members`), for what the generated methods do not cover. */
  request<T = unknown>(
    method: CallSpec['method'],
    path: string,
    init: { query?: Record<string, unknown>; body?: unknown; tokenTypes?: TokenType[] } = {},
    options?: RequestOptions,
  ): Promise<T> {
    return this.call<T>(
      {
        id: path,
        method,
        path,
        pathParams: {},
        query: init.query,
        body: init.body,
        tokenTypes: init.tokenTypes ?? ['app', 'tenant', 'user'],
      },
      options,
    );
  }

  protected async call<T>(spec: CallSpec, options: RequestOptions = {}): Promise<T> {
    const path = spec.path.replace(/\{(\w+)\}/g, (_, name: string) => {
      const v = spec.pathParams[name];
      if (v === undefined || v === null || v === '') throw new TypeError(`${spec.id}: ${name} is required`);
      return encodeURIComponent(String(v));
    });
    return this.send<T>(spec.method, path, { query: spec.query, body: spec.body, auth: { spec, options } });
  }

  protected async *iterate<T>(spec: CallSpec, options: RequestOptions = {}): AsyncIterable<T> {
    let pageToken: string | null | undefined;
    const query = { ...(spec.query ?? {}) };
    if (query.page_size === undefined) query.page_size = 100;
    do {
      const page = await this.call<{ items: T[]; has_more: boolean; page_token?: string | null }>(
        { ...spec, query: { ...query, ...(pageToken ? { page_token: pageToken } : {}) } },
        options,
      );
      for (const item of page.items ?? []) yield item;
      pageToken = page.has_more ? page.page_token : null;
    } while (pageToken);
  }

  // ── internals ─────────────────────────────────────────────────────────────

  private credentials() {
    return { app_id: this.appId, app_secret: this.appSecret };
  }

  private postingAuth(id: string, who: RequestOptions) {
    const spec: CallSpec = { id, method: 'POST', path: '', pathParams: {}, tokenTypes: ['user', 'tenant'] };
    return { spec, options: who };
  }

  /**
   * PUTs an upload to the slot the platform gave (object storage, not the open API: no token, its own
   * headers). Not limited by `timeoutMs`, a large video takes as long as it takes; cancel with the signal.
   */
  private async putUpload(url: string, headers: Record<string, string>, data: Uint8Array | Blob, signal?: AbortSignal) {
    let res: Response;
    try {
      res = await this.fetchFn(url, { method: 'PUT', headers, body: data as BodyInit, signal });
    } catch (err) {
      if (signal?.aborted) throw err;
      throw new OpenApiError({ status: 0, code: 'NETWORK', message: `PUT upload: ${(err as Error).message}` });
    }
    if (!res.ok) {
      throw new OpenApiError({
        status: res.status,
        code: 'UPLOAD_FAILED',
        message: `PUT upload: ${res.status} ${res.statusText}`,
        details: { reason: 'upload_failed', body: (await res.text().catch(() => '')).slice(0, 500) },
      });
    }
  }

  private async cached(key: string, fetchToken: () => Promise<{ token: string; expiresIn: number }>): Promise<Cached> {
    const hit = this.tokens.get(key);
    if (hit && hit.expiresAt - this.refreshBefore * 1000 > Date.now()) return hit;
    const running = this.inflight.get(key);
    if (running) return running;
    const p = fetchToken()
      .then((r) => {
        const c = { token: r.token, expiresAt: Date.now() + r.expiresIn * 1000 };
        this.tokens.set(key, c);
        return c;
      })
      .finally(() => this.inflight.delete(key));
    this.inflight.set(key, p);
    return p;
  }

  /** The token for a call, and the cache key it came from (dropped and fetched again after a 401). */
  private async tokenFor(spec: CallSpec, o: RequestOptions): Promise<{ token: string; cacheKey?: string }> {
    if (o.accessToken) return { token: o.accessToken };
    if (o.userAccessToken) return { token: o.userAccessToken };
    if (o.tenantKey) return { token: await this.tenantAccessToken(o.tenantKey), cacheKey: `tenant:${o.tenantKey}` };
    if (spec.tokenTypes.includes('app')) return { token: await this.appAccessToken(), cacheKey: 'app' };
    throw new OpenApiError({
      status: 0,
      code: 'TOKEN_REQUIRED',
      message: `${spec.id} takes a ${spec.tokenTypes.join(' or ')} token: pass { tenantKey } or { userAccessToken }`,
    });
  }

  private url(path: string, query?: Record<string, unknown>) {
    const u = new URL(`${this.baseUrl}${API_PREFIX}${path}`);
    for (const [k, v] of Object.entries(query ?? {})) {
      if (v === undefined || v === null || v === '') continue;
      if (Array.isArray(v)) for (const x of v) u.searchParams.append(k, String(x));
      else u.searchParams.set(k, String(v));
    }
    return u.toString();
  }

  private sleep(ms: number, signal?: AbortSignal) {
    return new Promise<void>((resolve, reject) => {
      const t = setTimeout(resolve, ms);
      signal?.addEventListener(
        'abort',
        () => {
          clearTimeout(t);
          reject(signal.reason);
        },
        { once: true },
      );
    });
  }

  private backoff(attempt: number) {
    const base = this.retryBaseMs * 2 ** attempt;
    return Math.min(30_000, base + Math.random() * base * 0.25);
  }

  private async send<T>(
    method: string,
    path: string,
    init: {
      query?: Record<string, unknown>;
      body?: unknown;
      auth?: { spec: CallSpec; options: RequestOptions };
      /**
       * Token requests are safe to repeat; exchanging a one-time code is not. `true` also retries a POST
       * with a token (one the server makes idempotent: a post with its `uuid`, completing an upload).
       */
      retryPost?: boolean;
    },
  ): Promise<T> {
    const options = init.auth?.options ?? {};
    let refreshed = false;
    for (let attempt = 0; ; attempt++) {
      const headers: Record<string, string> = {
        accept: 'application/json',
        'user-agent': this.userAgent,
        ...options.headers,
      };
      let cacheKey: string | undefined;
      if (init.auth) {
        const t = await this.tokenFor(init.auth.spec, options);
        headers.authorization = `Bearer ${t.token}`;
        cacheKey = t.cacheKey;
      }
      if (init.body !== undefined) headers['content-type'] = 'application/json';
      const timeout = AbortSignal.timeout(this.timeoutMs);
      const signal = options.signal ? AbortSignal.any([options.signal, timeout]) : timeout;
      const canRetry = attempt < this.maxRetries;
      const idempotent =
        IDEMPOTENT.has(method) ||
        (method === 'POST' && (init.retryPost === true || (init.retryPost !== false && !init.auth)));
      let res: Response;
      try {
        res = await this.fetchFn(this.url(path, init.query), {
          method,
          headers,
          body: init.body === undefined ? undefined : JSON.stringify(init.body),
          signal,
        });
      } catch (err) {
        if (options.signal?.aborted) throw err;
        const timedOut = timeout.aborted;
        if (canRetry && idempotent) {
          await this.sleep(this.backoff(attempt), options.signal);
          continue;
        }
        throw new OpenApiError({
          status: 0,
          code: timedOut ? 'TIMEOUT' : 'NETWORK',
          message: `${method} ${path}: ${(err as Error).message}`,
        });
      }
      if (res.ok) {
        if (res.status === 204) return undefined as T;
        const text = await res.text();
        return (text ? JSON.parse(text) : undefined) as T;
      }
      const error = await toError(res);
      if (res.status === 429 && canRetry) {
        const reset = Number(res.headers.get('x-ratelimit-reset'));
        const wait = error.retryAfter ?? (Number.isFinite(reset) && reset > 0 ? reset : null);
        // A daily quota does not come back within a retry.
        if (error.reason !== 'daily_quota_exceeded') {
          await this.sleep(wait !== null ? wait * 1000 : this.backoff(attempt), options.signal);
          continue;
        }
      }
      if (RETRY_STATUSES.has(res.status) && canRetry && idempotent) {
        await this.sleep(this.backoff(attempt), options.signal);
        continue;
      }
      if (
        res.status === 401 &&
        cacheKey &&
        !refreshed &&
        (error.reason === 'token_expired' || error.reason === 'invalid_token')
      ) {
        this.tokens.delete(cacheKey);
        refreshed = true;
        attempt--;
        continue;
      }
      throw error;
    }
  }
}

const sizeOf = (data: Uint8Array | Blob) => (data instanceof Uint8Array ? data.byteLength : data.size);

async function toError(res: Response): Promise<OpenApiError> {
  let body: { error?: { code?: string; message?: string; request_id?: string; details?: Record<string, unknown> } } =
    {};
  try {
    body = (await res.json()) as typeof body;
  } catch {
    body = {};
  }
  const retryAfter = Number(res.headers.get('retry-after'));
  return new OpenApiError({
    status: res.status,
    code: body.error?.code ?? `HTTP_${res.status}`,
    message: body.error?.message ?? res.statusText,
    requestId: body.error?.request_id ?? res.headers.get('x-request-id'),
    details: body.error?.details ?? {},
    retryAfter: Number.isFinite(retryAfter) && res.headers.has('retry-after') ? retryAfter : null,
  });
}
