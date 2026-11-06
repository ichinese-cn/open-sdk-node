import type { ErrorReason } from './gen/meta.ts';

/**
 * An error answer of the open API (`{"error": {"code", "message", "request_id", "details"}}`), or a
 * failure before one came (`code` NETWORK / TIMEOUT, `status` 0).
 */
export class OpenApiError extends Error {
  override readonly name = 'OpenApiError';
  /** HTTP status (0: no answer). */
  readonly status: number;
  /** Stable error code: UNAUTHENTICATED, FORBIDDEN, NOT_FOUND, VALIDATION_FAILED, CONFLICT, RATE_LIMITED, … */
  readonly code: string;
  readonly requestId: string | null;
  /** `details.reason`, e.g. `scope_denied`, `token_expired`, `code_used`. */
  readonly reason: ErrorReason | (string & {}) | null;
  readonly details: Record<string, unknown>;
  /** Seconds to wait (429), from Retry-After. */
  readonly retryAfter: number | null;

  constructor(init: {
    status: number;
    code: string;
    message: string;
    requestId?: string | null;
    details?: Record<string, unknown>;
    retryAfter?: number | null;
  }) {
    super(init.message || init.code);
    this.status = init.status;
    this.code = init.code;
    this.requestId = init.requestId ?? null;
    this.details = init.details ?? {};
    this.reason = typeof this.details.reason === 'string' ? (this.details.reason as ErrorReason) : null;
    this.retryAfter = init.retryAfter ?? null;
  }

  /** The scope the user or institution refused (`scope_denied`): the app should do without it. */
  get scope(): string | null {
    return typeof this.details.scope === 'string' ? this.details.scope : null;
  }

  /** The user chose「不再询问」for the refused scope: do not ask again. */
  get neverAsk(): boolean {
    return this.details.never_ask === true;
  }

  /**
   * Where the person agrees to show their name on posts (409 `consent_required`): send them there, an
   * app cannot agree for them.
   */
  get consentUrl(): string | null {
    return typeof this.details.consent_url === 'string' ? this.details.consent_url : null;
  }

  /** A refused, not yet asked or undeclared scope (403): degrade gracefully. */
  get isScopeError(): boolean {
    return (
      this.status === 403 &&
      ['scope_denied', 'scope_pending', 'scope_not_declared', 'gold_only'].includes(String(this.reason))
    );
  }
}

export const isOpenApiError = (e: unknown): e is OpenApiError => e instanceof OpenApiError;
