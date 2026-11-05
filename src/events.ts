/**
 * Event pushes and card callbacks from the platform to your request address: checking the signature,
 * decrypting, and answering the address check.
 *
 *   X-Ich-Signature: v1=hex(HMAC-SHA256(signing secret, timestamp + "." + nonce + "." + raw body))
 *   encrypted body:  {"encrypt": base64(12-byte IV ‖ AES-256-GCM ciphertext ‖ 16-byte tag)}, key = SHA-256(encrypt key)
 *
 * Always verify against the raw body bytes as received (not re-serialized JSON).
 */
import { createDecipheriv, createHash, createHmac, timingSafeEqual } from 'node:crypto';
import { OpenApiError } from './errors.ts';
import type { EventType } from './gen/meta.ts';

export interface EventEnvelope<E = Record<string, unknown>> {
  schema: '1.0';
  header: {
    event_id: string;
    event_type: EventType;
    create_time: string;
    app_id: string;
    tenant_key?: string | null;
  };
  event: E;
}

export interface UrlVerification {
  type: 'url_verification';
  challenge: string;
}

export interface CardAction {
  schema: '1.0';
  header: { event_id: string; app_id: string; tenant_key?: string | null; create_time: string };
  operator?: { open_id?: string };
  action: { value: Record<string, unknown> };
  /** The conversation the card is in. */
  chat_id?: string;
  message_id?: string;
}

export type Headers = Record<string, string | string[] | undefined> | globalThis.Headers;

const header = (h: Headers, name: string): string | undefined => {
  if (typeof (h as globalThis.Headers).get === 'function') return (h as globalThis.Headers).get(name) ?? undefined;
  const rec = h as Record<string, string | string[] | undefined>;
  const v =
    rec[name] ??
    rec[name.toLowerCase()] ??
    Object.entries(rec).find(([k]) => k.toLowerCase() === name.toLowerCase())?.[1];
  return Array.isArray(v) ? v[0] : v;
};

/** The signature the platform puts in `X-Ich-Signature` for these values. */
export function sign(signingSecret: string, timestamp: string, nonce: string, body: string | Buffer): string {
  return `v1=${createHmac('sha256', signingSecret).update(`${timestamp}.${nonce}.`).update(body).digest('hex')}`;
}

/**
 * Checks a push's signature and age (default: at most 5 minutes off). Throws `OpenApiError` with
 * code `INVALID_SIGNATURE` otherwise.
 */
export function verifySignature(
  headers: Headers,
  rawBody: string | Buffer,
  signingSecret: string,
  opts: { toleranceSeconds?: number; now?: number } = {},
): void {
  const fail = (message: string) => new OpenApiError({ status: 401, code: 'INVALID_SIGNATURE', message });
  const timestamp = header(headers, 'x-ich-timestamp');
  const nonce = header(headers, 'x-ich-nonce');
  const signature = header(headers, 'x-ich-signature');
  if (!timestamp || !nonce || !signature) throw fail('missing X-Ich-Timestamp, X-Ich-Nonce or X-Ich-Signature');
  const now = Math.floor((opts.now ?? Date.now()) / 1000);
  if (!/^\d+$/.test(timestamp) || Math.abs(now - Number(timestamp)) > (opts.toleranceSeconds ?? 300)) {
    throw fail('the timestamp is too far from now');
  }
  const expected = Buffer.from(sign(signingSecret, timestamp, nonce, rawBody));
  const given = Buffer.from(signature);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) throw fail('the signature does not match');
}

/** Decrypts an `{"encrypt": …}` body with the app's encrypt key. */
export function decrypt(encrypted: string, encryptKey: string): string {
  const data = Buffer.from(encrypted, 'base64');
  if (data.length < 12 + 16) throw new OpenApiError({ status: 400, code: 'INVALID_PAYLOAD', message: 'too short' });
  const key = createHash('sha256').update(encryptKey).digest();
  const iv = data.subarray(0, 12);
  const tag = data.subarray(data.length - 16);
  const d = createDecipheriv('aes-256-gcm', key, iv);
  d.setAuthTag(tag);
  try {
    return Buffer.concat([d.update(data.subarray(12, data.length - 16)), d.final()]).toString('utf8');
  } catch {
    throw new OpenApiError({ status: 400, code: 'INVALID_PAYLOAD', message: 'cannot decrypt (wrong encrypt key?)' });
  }
}

/**
 * Verifies, decrypts and parses a push. Answer a `url_verification` with `{ challenge }`
 * (`challengeResponse`), and an event with any 2xx within 5 seconds (dedupe by `header.event_id`:
 * retries keep it).
 */
export function parseEvent<E = Record<string, unknown>>(
  headers: Headers,
  rawBody: string | Buffer,
  opts: { signingSecret: string; encryptKey?: string; toleranceSeconds?: number; now?: number },
): EventEnvelope<E> | UrlVerification {
  verifySignature(headers, rawBody, opts.signingSecret, opts);
  let json = JSON.parse(typeof rawBody === 'string' ? rawBody : rawBody.toString('utf8')) as Record<string, unknown>;
  if (typeof json.encrypt === 'string') {
    if (!opts.encryptKey) {
      throw new OpenApiError({ status: 400, code: 'INVALID_PAYLOAD', message: 'encrypted push but no encryptKey' });
    }
    json = JSON.parse(decrypt(json.encrypt, opts.encryptKey)) as Record<string, unknown>;
  }
  return json as unknown as EventEnvelope<E> | UrlVerification;
}

/** A card callback (a button of a bot's card was clicked): same signature and encryption as events. */
export function parseCardAction(
  headers: Headers,
  rawBody: string | Buffer,
  opts: { signingSecret: string; encryptKey?: string; toleranceSeconds?: number; now?: number },
): CardAction | UrlVerification {
  return parseEvent(headers, rawBody, opts) as unknown as CardAction | UrlVerification;
}

export const isUrlVerification = (x: unknown): x is UrlVerification =>
  typeof x === 'object' && x !== null && (x as UrlVerification).type === 'url_verification';

/** The answer to the address check. */
export const challengeResponse = (v: UrlVerification) => ({ challenge: v.challenge });
