/**
 * Receives event pushes at your request address: verifies the signature on the raw body, decrypts when
 * an encrypt key is set, answers the address check, and dedupes by event_id.
 *
 *   SIGNING_SECRET=… [ENCRYPT_KEY=…] PORT=3001 tsx examples/events-server.ts
 */
import { createServer } from 'node:http';
import { challengeResponse, isOpenApiError, isUrlVerification, parseEvent } from '../src/index.ts';

const seen = new Set<string>();

createServer(async (req, res) => {
  const chunks: Buffer[] = [];
  for await (const c of req) chunks.push(c as Buffer);
  const raw = Buffer.concat(chunks);
  try {
    const push = parseEvent(req.headers, raw, {
      signingSecret: process.env.SIGNING_SECRET!,
      encryptKey: process.env.ENCRYPT_KEY,
    });
    res.writeHead(200, { 'content-type': 'application/json' });
    if (isUrlVerification(push)) {
      res.end(JSON.stringify(challengeResponse(push)));
      return;
    }
    res.end('{}'); // answer within 5 seconds; do the work afterwards
    if (seen.has(push.header.event_id)) return; // a retry of one already handled
    seen.add(push.header.event_id);
    console.log(push.header.event_type, push.header.tenant_key, push.event);
  } catch (e) {
    res.writeHead(isOpenApiError(e) ? 401 : 400).end();
  }
}).listen(Number(process.env.PORT ?? 3001));
