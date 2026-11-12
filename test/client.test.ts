import { existsSync, readFileSync } from 'node:fs';
import { createServer, type IncomingMessage, type Server } from 'node:http';
import { resolve } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
  Client,
  challengeResponse,
  decrypt,
  isUrlVerification,
  OpenApiError,
  parseCardAction,
  parseEvent,
  sign,
  VERSION,
  verifySignature,
} from '../src/index.ts';

type Handler = (
  req: IncomingMessage,
  body: string,
) => { status: number; body?: unknown; headers?: Record<string, string> };

let server: Server;
let base = '';
let handler: Handler;
const seen: { method: string; url: string; auth?: string; body: string; ua?: string }[] = [];

beforeEach(async () => {
  seen.length = 0;
  server = createServer((req, res) => {
    const chunks: Buffer[] = [];
    req.on('data', (c: Buffer) => chunks.push(c));
    req.on('end', () => {
      const body = Buffer.concat(chunks).toString('utf8');
      seen.push({
        method: req.method!,
        url: req.url!,
        auth: req.headers.authorization,
        body,
        ua: req.headers['user-agent'],
      });
      const r = handler(req, body);
      res.writeHead(r.status, { 'content-type': 'application/json', ...r.headers });
      res.end(r.body === undefined ? '' : JSON.stringify(r.body));
    });
  });
  await new Promise<void>((ok) => server.listen(0, '127.0.0.1', ok));
  const a = server.address();
  base = `http://127.0.0.1:${typeof a === 'object' && a ? a.port : 0}`;
});
afterEach(() => new Promise<void>((ok) => server.close(() => ok())));

const client = () => {
  const c = new Client({
    appId: 'cn.cli_a1b2c3d4e5f6a7b8',
    appSecret: 'secret-secret-secret-1',
    baseUrl: `${base}/open-apis/v1/`,
  });
  c.retryBaseMs = 1;
  return c;
};
const err = (status: number, code: string, reason?: string, headers?: Record<string, string>) => ({
  status,
  headers,
  body: { error: { code, message: code, request_id: 'req-1', details: reason ? { reason } : {} } },
});

const tokens = (req: IncomingMessage) => {
  if (req.url === '/open-apis/v1/auth/tenant_access_token') {
    return {
      status: 200,
      body: { tenant_access_token: `cn.t-${seen.length}`, expires_in: 7200, tenant_key: 'cn.x', scopes: [] },
    };
  }
  if (req.url === '/open-apis/v1/auth/app_access_token')
    return { status: 200, body: { app_access_token: 'cn.a-1', expires_in: 7200 } };
  return null;
};

describe('Client', () => {
  it('gets the tenant token once, caches it and sends it', async () => {
    handler = (req) => tokens(req) ?? { status: 200, body: { tenant_key: 'cn.x', name: 'X' } };
    const c = client();
    await c.getTenant({ tenantKey: 'cn.x' });
    await c.getTenant({ tenantKey: 'cn.x' });
    expect(seen.filter((s) => s.url.endsWith('tenant_access_token'))).toHaveLength(1);
    const call = seen.filter((s) => s.url === '/open-apis/v1/tenant');
    expect(call).toHaveLength(2);
    expect(call[0]!.auth).toBe('Bearer cn.t-1');
    expect(call[0]!.ua).toContain(`ichinese-open-sdk-node/${VERSION}`);
    expect(JSON.parse(seen[0]!.body)).toMatchObject({ app_id: 'cn.cli_a1b2c3d4e5f6a7b8', tenant_key: 'cn.x' });
  });

  it('fetches a new token after 401 token_expired and tries again once', async () => {
    let calls = 0;
    handler = (req) => {
      const t = tokens(req);
      if (t) return t;
      calls++;
      return calls === 1 ? err(401, 'UNAUTHENTICATED', 'token_expired') : { status: 200, body: { ok: true } };
    };
    const c = client();
    expect(await c.getTenant({ tenantKey: 'cn.x' })).toEqual({ ok: true });
    expect(seen.filter((s) => s.url.endsWith('tenant_access_token'))).toHaveLength(2);
  });

  it('waits Retry-After on 429 and retries', async () => {
    let calls = 0;
    handler = (req) =>
      tokens(req) ??
      (++calls < 3
        ? err(429, 'RATE_LIMITED', 'rate_limited', { 'retry-after': '0' })
        : { status: 200, body: { open_id: 'ou_x' } });
    expect(await client().getUserInfo({ userAccessToken: 'cn.u-1' })).toEqual({ open_id: 'ou_x' });
    expect(calls).toBe(3);
  });

  it('preserves independently optional phone and email fields in user info', async () => {
    for (const contacts of [
      {},
      { phone_number: '+8613812345678' },
      { email: 'user@example.com' },
      { phone_number: '+8613812345678', email: 'user@example.com' },
    ]) {
      handler = () => ({ status: 200, body: { open_id: 'ou_contact', ...contacts } });
      const user = await client().getUserInfo({ userAccessToken: 'cn.u-1' });
      expect(user).toEqual({ open_id: 'ou_contact', ...contacts });
    }
  });

  it('does not retry a daily quota', async () => {
    let calls = 0;
    handler = () => {
      calls++;
      return err(429, 'RATE_LIMITED', 'daily_quota_exceeded', { 'retry-after': '0' });
    };
    await expect(client().listPublicContent('courses', {}, { userAccessToken: 'cn.u-1' })).rejects.toMatchObject({
      reason: 'daily_quota_exceeded',
    });
    expect(calls).toBe(1);
  });

  it('retries a GET after a 503 but not a POST', async () => {
    let calls = 0;
    handler = () => (++calls === 1 ? err(503, 'SERVICE_UNAVAILABLE') : { status: 200, body: { open_id: 'ou_x' } });
    await client().getUserInfo({ userAccessToken: 'u' });
    expect(calls).toBe(2);
    calls = 0;
    await expect(
      client().addClassMember('3f2b8c1e-5d4a-4e6f-9a7b-1c2d3e4f5a6b', { open_id: 'ou_x' }, { userAccessToken: 'u' }),
    ).rejects.toMatchObject({ status: 503 });
    expect(calls).toBe(1);
  });

  it('pages through a list', async () => {
    handler = (req) => {
      const u = new URL(req.url!, base);
      const page = u.searchParams.get('page_token');
      expect(u.searchParams.get('page_size')).toBe('2');
      if (!page) return { status: 200, body: { items: [{ n: 1 }, { n: 2 }], has_more: true, page_token: 'p2' } };
      return { status: 200, body: { items: [{ n: 3 }], has_more: false, page_token: null } };
    };
    const out: unknown[] = [];
    for await (const m of client().listClassMembersAll('c1', { page_size: 2 }, { userAccessToken: 'u' })) out.push(m);
    expect(out).toEqual([{ n: 1 }, { n: 2 }, { n: 3 }]);
    expect(seen[0]!.url).toBe('/open-apis/v1/classes/c1/members?page_size=2');
  });

  it('turns error answers into OpenApiError with the reason and the scope', async () => {
    handler = () => ({
      status: 403,
      body: {
        error: {
          code: 'FORBIDDEN',
          message: 'no',
          request_id: 'r-9',
          details: { reason: 'scope_denied', scope: 'profile', never_ask: true },
        },
      },
    });
    const e = (await client()
      .getUserInfo({ userAccessToken: 'u' })
      .catch((x: unknown) => x)) as OpenApiError;
    expect(e).toBeInstanceOf(OpenApiError);
    expect([e.status, e.code, e.reason, e.scope, e.neverAsk, e.requestId, e.isScopeError]).toEqual([
      403,
      'FORBIDDEN',
      'scope_denied',
      'profile',
      true,
      'r-9',
      true,
    ]);
  });

  it('asks for a tenant or user token when the operation takes no app token', async () => {
    handler = () => ({ status: 200, body: {} });
    await expect(client().getTenant()).rejects.toMatchObject({ code: 'TOKEN_REQUIRED', status: 0 });
    expect(seen).toHaveLength(0);
  });

  it('uses the app token where the operation takes one', async () => {
    handler = (req) => tokens(req) ?? { status: 200, body: { items: [], has_more: false } };
    await client().listPublicContent('events');
    expect(seen.at(-1)!.auth).toBe('Bearer cn.a-1');
  });

  it('exchanges a code (never retried) with the redirect URI and verifier of the OIDC fallback', async () => {
    handler = () => err(503, 'SERVICE_UNAVAILABLE');
    await expect(
      client().exchangeAuthCode('cn.bc-1', { redirectUri: 'https://a/cb', codeVerifier: 'v'.repeat(43) }),
    ).rejects.toMatchObject({ status: 503 });
    expect(seen).toHaveLength(1);
    expect(JSON.parse(seen[0]!.body)).toMatchObject({
      code: 'cn.bc-1',
      redirect_uri: 'https://a/cb',
      code_verifier: 'v'.repeat(43),
    });
  });
});

describe("posting in a person's name", () => {
  const ASSET = '8a1f2c3d-4e5f-4a6b-9c7d-0e1f2a3b4c5d';

  it('uploads an image: a slot, a PUT with its headers and no token, the key', async () => {
    let putHeaders: IncomingMessage['headers'] = {};
    handler = (req, body) => {
      if (req.url === '/open-apis/v1/community/images') {
        expect(JSON.parse(body)).toEqual({ content_type: 'image/png', size_bytes: 3 });
        return {
          status: 201,
          body: {
            key: 'img/k1',
            upload_url: `${base}/upload/img-1?sig=x`,
            method: 'PUT',
            headers: { 'content-type': 'image/png', 'x-amz-meta-a': '1' },
            expires_at: '2026-11-06T10:00:00Z',
          },
        };
      }
      putHeaders = req.headers;
      return { status: 200 };
    };
    expect(await client().uploadImage('cn.u-1', new Uint8Array([1, 2, 3]), 'image/png')).toBe('img/k1');
    expect(seen.map((s) => `${s.method} ${s.url}`)).toEqual([
      'POST /open-apis/v1/community/images',
      'PUT /upload/img-1?sig=x',
    ]);
    expect(seen[0]!.auth).toBe('Bearer cn.u-1');
    expect(seen[1]!.auth).toBeUndefined();
    expect(seen[1]!.body).toBe('\u0001\u0002\u0003');
    expect(putHeaders['x-amz-meta-a']).toBe('1');
    expect(putHeaders['content-type']).toBe('image/png');
  });

  it('turns a refused PUT into an OpenApiError', async () => {
    handler = (req) =>
      req.url === '/open-apis/v1/community/images'
        ? {
            status: 201,
            body: { key: 'k', upload_url: `${base}/upload/x`, method: 'PUT', headers: {}, expires_at: '' },
          }
        : { status: 403 };
    await expect(client().uploadImage('u', new Uint8Array([1]), 'image/jpeg')).rejects.toMatchObject({
      status: 403,
      code: 'UPLOAD_FAILED',
    });
  });

  it('uploads a video: create, PUT, complete', async () => {
    handler = (req, body) => {
      if (req.url === '/open-apis/v1/community/videos') {
        expect(JSON.parse(body)).toEqual({ filename: 'a.mp4', content_type: 'video/mp4', size_bytes: 4 });
        return {
          status: 201,
          body: {
            asset_id: ASSET,
            status: 'uploading',
            upload: { url: `${base}/upload/v-1`, method: 'PUT', headers: { 'x-h': 'v' }, expires_at: '' },
          },
        };
      }
      if (req.url === `/open-apis/v1/community/videos/${ASSET}/complete`)
        return { status: 200, body: { asset_id: ASSET, status: 'queued' } };
      expect(req.headers['x-h']).toBe('v');
      return { status: 200 };
    };
    const v = await client().uploadVideo('u', new Blob([new Uint8Array([1, 2, 3, 4])]), {
      filename: 'a.mp4',
      contentType: 'video/mp4',
    });
    expect(v).toEqual({ asset_id: ASSET, status: 'queued' });
    expect(seen.map((s) => `${s.method} ${s.url}`)).toEqual([
      'POST /open-apis/v1/community/videos',
      'PUT /upload/v-1',
      `POST /open-apis/v1/community/videos/${ASSET}/complete`,
    ]);
    expect(seen[2]!.auth).toBe('Bearer u');
  });

  it('waits until a video is ready', async () => {
    const states = ['queued', 'processing', 'ready'];
    handler = () => ({ status: 200, body: { asset_id: ASSET, status: states.shift(), duration_s: 12 } });
    const v = await client().waitVideoReady('u', ASSET, { intervalMs: 1 });
    expect(v).toMatchObject({ status: 'ready', duration_s: 12 });
    expect(seen).toHaveLength(3);
    expect(seen[0]!.url).toBe(`/open-apis/v1/community/videos/${ASSET}`);
  });

  it('throws video_failed when the transcode failed, TIMEOUT when it takes too long', async () => {
    handler = () => ({ status: 200, body: { asset_id: ASSET, status: 'failed', error: 'unsupported_codec' } });
    await expect(client().waitVideoReady('u', ASSET, { intervalMs: 1 })).rejects.toMatchObject({
      reason: 'video_failed',
      details: { error: 'unsupported_codec' },
    });
    handler = () => ({ status: 200, body: { asset_id: ASSET, status: 'processing' } });
    const e = (await client()
      .waitVideoReady('u', ASSET, { timeoutMs: 30, intervalMs: 5 })
      .catch((x: unknown) => x)) as OpenApiError;
    expect(e).toBeInstanceOf(OpenApiError);
    expect([e.code, e.reason]).toEqual(['TIMEOUT', 'video_not_ready']);
  });

  it('posts with a uuid it made, the same one on its own retries, and keeps a given one', async () => {
    let calls = 0;
    handler = () => (++calls === 1 ? err(503, 'SERVICE_UNAVAILABLE') : { status: 201, body: { post_id: 'cn:post:1' } });
    await client().createPost('u', { body: '你好 #学中文' });
    const sent = seen.map((s) => JSON.parse(s.body) as { uuid: string; body: string });
    expect(sent).toHaveLength(2);
    expect(sent[0]!.uuid).toMatch(/^[0-9a-f-]{36}$/);
    expect(sent[1]!.uuid).toBe(sent[0]!.uuid);
    expect(sent[0]!.body).toBe('你好 #学中文');

    seen.length = 0;
    await client().createPost('u', { uuid: 'mine-1', title: 'T' });
    expect(JSON.parse(seen[0]!.body)).toEqual({ uuid: 'mine-1', title: 'T' });
  });

  it('posts as the institution: its tenant token, a uuid it made, and its uploads (K2)', async () => {
    handler = (req) => {
      const t = tokens(req);
      if (t) return t;
      if (req.url === '/open-apis/v1/community/images') {
        return {
          status: 201,
          body: { key: 'img/org', upload_url: `${base}/upload/org-1`, method: 'PUT', headers: {}, expires_at: '' },
        };
      }
      if (req.url === '/open-apis/v1/community/posts') return { status: 201, body: { post_id: 'cn:post:2' } };
      return { status: 200 };
    };
    const c = client();
    expect(await c.uploadImageAsOrg('cn.x', new Uint8Array([9]), 'image/png')).toBe('img/org');
    await c.createPostAsOrg('cn.x', { body: '招生啦', images: [{ key: 'img/org' }] });
    const calls = seen.filter((s) => !s.url.includes('/auth/'));
    expect(calls.map((s) => `${s.method} ${s.url}`)).toEqual([
      'POST /open-apis/v1/community/images',
      'PUT /upload/org-1',
      'POST /open-apis/v1/community/posts',
    ]);
    expect(calls[0]!.auth).toMatch(/^Bearer cn\.t-/);
    expect(calls[1]!.auth).toBeUndefined();
    expect(calls[2]!.auth).toBe(calls[0]!.auth);
    const sent = JSON.parse(calls[2]!.body) as { uuid: string; body: string };
    expect(sent.uuid).toMatch(/^[0-9a-f-]{36}$/);
    expect(sent.body).toBe('招生啦');
  });

  it('sends a Chinese gray post-count topic once-encoded using the app token', async () => {
    handler = (req) => {
      const auth = tokens(req);
      if (auth) return auth;
      const url = new URL(req.url ?? '/', base);
      expect(url.pathname).toBe('/open-apis/v1/gray/community/post-counts');
      expect(url.searchParams.get('topic')).toBe('国际中文教育');
      expect(url.search).not.toContain('%25');
      return { status: 200, body: { topic: '国际中文教育', total: 12, partial: false, regions: [] } };
    };
    const result = await client().getGrayCommunityPostCounts({ topic: '国际中文教育' });
    expect(result.total).toBe(12);
    expect(seen.at(-1)?.auth).toBe('Bearer cn.a-1');
  });

  it('reads every dashboard page the API offers, with the same query (K2)', async () => {
    handler = (req) => {
      const t = tokens(req);
      if (t) return t;
      const u = new URL(req.url ?? '/', base);
      const tab = u.searchParams.get('tab') ?? 'enrollment';
      return {
        status: 200,
        body: { tab, tabs: ['enrollment', 'teaching', 'income'], range: u.searchParams.get('range') },
      };
    };
    const pages = await client().getAllInsights('cn.x', { range: '7d' });
    expect(Object.keys(pages)).toEqual(['enrollment', 'teaching', 'income']);
    expect(pages.income).toMatchObject({ tab: 'income', range: '7d' });
    const calls = seen.filter((s) => !s.url.includes('/auth/'));
    expect(calls.map((s) => s.url)).toEqual([
      '/open-apis/v1/insights?range=7d',
      '/open-apis/v1/insights?range=7d&tab=teaching',
      '/open-apis/v1/insights?range=7d&tab=income',
    ]);
    expect(calls[0]!.auth).toMatch(/^Bearer cn\.t-/);
  });

  it('keeps consent_required and the consent URL', async () => {
    handler = () => ({
      status: 409,
      body: {
        error: {
          code: 'CONFLICT',
          message: 'consent',
          details: { reason: 'consent_required', consent_url: 'https://www.ichinese.cn/consent/x' },
        },
      },
    });
    const e = (await client()
      .createPost('u', { body: 'x' })
      .catch((x: unknown) => x)) as OpenApiError;
    expect([e.status, e.reason, e.consentUrl]).toEqual([409, 'consent_required', 'https://www.ichinese.cn/consent/x']);
    expect(seen).toHaveLength(1);
  });
});

describe('events', () => {
  // Beside this file in the SDK's own repository; in the monorepo, shared by every SDK.
  const local = resolve(import.meta.dirname, 'test-vectors.json');
  const vectors = existsSync(local) ? local : resolve(import.meta.dirname, '../../test-vectors.json');
  const v = JSON.parse(readFileSync(vectors, 'utf8')) as Record<string, string>;
  const headers = (sig: string) => ({
    'X-Ich-Timestamp': v.timestamp!,
    'X-Ich-Nonce': v.nonce!,
    'X-Ich-Signature': sig,
  });
  const now = Number(v.timestamp) * 1000;

  it('signs like the platform', () => {
    expect(sign(v.signing_secret!, v.timestamp!, v.nonce!, v.plain_body!)).toBe(v.plain_signature);
    expect(sign(v.signing_secret!, v.timestamp!, v.nonce!, v.encrypted_body!)).toBe(v.encrypted_signature);
  });

  it('verifies, refuses a wrong signature and an old timestamp', () => {
    expect(() => verifySignature(headers(v.plain_signature!), v.plain_body!, v.signing_secret!, { now })).not.toThrow();
    expect(() => verifySignature(headers('v1=00'), v.plain_body!, v.signing_secret!, { now })).toThrow(
      /does not match/,
    );
    expect(() =>
      verifySignature(headers(v.plain_signature!), v.plain_body!, v.signing_secret!, { now: now + 301_000 }),
    ).toThrow(/too far/);
  });

  it('decrypts and parses an encrypted push', () => {
    expect(decrypt(JSON.parse(v.encrypted_body!).encrypt, v.encrypt_key!)).toBe(v.decrypted);
    const e = parseEvent(headers(v.encrypted_signature!), Buffer.from(v.encrypted_body!), {
      signingSecret: v.signing_secret!,
      encryptKey: v.encrypt_key!,
      now,
    });
    expect(isUrlVerification(e)).toBe(false);
    expect(e).toMatchObject({ header: { event_type: 'app.installed' } });
    expect(() => decrypt(JSON.parse(v.encrypted_body!).encrypt, 'wrong')).toThrow(/cannot decrypt/);
  });

  it('verifies a card callback like an event (chat_id, operator, value)', () => {
    const body = JSON.stringify({
      schema: '1.0',
      header: { event_id: 'e1', app_id: 'cn.cli_a1b2c3d4e5f6a7b8', create_time: '2026-10-20T09:00:00Z' },
      operator: { open_id: 'ou_x' },
      chat_id: 'c-1',
      action: { value: { action: 'ack' } },
    });
    const sig = sign(v.signing_secret!, v.timestamp!, v.nonce!, body);
    const a = parseCardAction(headers(sig), body, { signingSecret: v.signing_secret!, now });
    expect(a).toMatchObject({ chat_id: 'c-1', action: { value: { action: 'ack' } } });
    expect(() => parseCardAction(headers(sig), `${body} `, { signingSecret: v.signing_secret!, now })).toThrow();
  });

  it('answers the address check', () => {
    const body = JSON.stringify({ type: 'url_verification', challenge: 'abc' });
    const sig = sign(v.signing_secret!, v.timestamp!, v.nonce!, body);
    const e = parseEvent(headers(sig), body, { signingSecret: v.signing_secret!, now });
    expect(isUrlVerification(e) && challengeResponse(e)).toEqual({ challenge: 'abc' });
  });
});
