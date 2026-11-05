export type TokenType = 'app' | 'tenant' | 'user';

/** Which token a call goes with. Without any, the client uses the app token when the operation takes one. */
export interface RequestOptions {
  /** Call as an institution that installed the app: the client gets (and renews) its tenant token. */
  tenantKey?: string;
  /** Call as a user (a token from `exchangeAuthCode` or `refreshUserToken`). */
  userAccessToken?: string;
  /** A token you already hold (any type), used as is. */
  accessToken?: string;
  /** Extra request headers. */
  headers?: Record<string, string>;
  /** Cancels the call (and its retries). */
  signal?: AbortSignal;
}

/** One call of an operation (made by the generated methods). */
export interface CallSpec {
  id: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  /** The contract's path, e.g. `/classes/{class_id}`. */
  path: string;
  pathParams: Record<string, string>;
  query?: Record<string, unknown>;
  body?: unknown;
  tokenTypes: readonly TokenType[];
}

export interface ClientOptions {
  appId: string;
  appSecret: string;
  /**
   * The open API's address (default: the release's, see `DEFAULT_BASE_URL`). One address for every
   * region: tokens carry their region and the gateway routes by it.
   */
  baseUrl?: string;
  /** Retries after a rate limit (429), a server error (5xx) or a network failure. Default 3. */
  maxRetries?: number;
  /** Per request, in milliseconds. Default 30 000. */
  timeoutMs?: number;
  /** Your own fetch (tests, proxies). Default the global fetch. */
  fetch?: typeof fetch;
  /** Renew a cached app or tenant token this many seconds before it expires. Default 300. */
  refreshBeforeSeconds?: number;
  /** Appended to the User-Agent header. */
  userAgent?: string;
}

export interface UserAccessToken {
  access_token: string;
  token_type: 'Bearer';
  expires_in: number;
  refresh_token: string;
  refresh_expires_in: number;
  open_id: string;
  scopes: string[];
  denied_scopes: string[];
  tenant_key?: string | null;
}

export interface TenantAccessToken {
  tenant_access_token: string;
  expires_in: number;
  tenant_key: string;
  scopes: string[];
}
