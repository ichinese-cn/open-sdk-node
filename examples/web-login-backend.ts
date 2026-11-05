/**
 * The backend half of the web login (免登): the page calls the JS SDK's `requestAuthCode()` and posts
 * what it got here; we exchange the code for a user token (App Secret stays on the server), read who it
 * is and start the app's own session.
 *
 *   APP_ID=… APP_SECRET=… PORT=3000 tsx examples/web-login-backend.ts
 *   POST /login  {"code": "…", "state": "…", "redirect_uri"?: "…", "code_verifier"?: "…"}
 */

import { randomBytes } from 'node:crypto';
import { createServer } from 'node:http';
import { Client, isOpenApiError } from '../src/index.ts';

const client = new Client({
  appId: process.env.APP_ID!,
  appSecret: process.env.APP_SECRET!,
  baseUrl: process.env.OPEN_API_BASE,
});
const sessions = new Map<string, { openId: string; token: string; refresh: string }>();

createServer(async (req, res) => {
  if (req.method !== 'POST' || req.url !== '/login') {
    res.writeHead(404).end();
    return;
  }
  let raw = '';
  for await (const chunk of req) raw += chunk;
  try {
    const { code, redirect_uri, code_verifier } = JSON.parse(raw) as Record<string, string>;
    // Check `state` against what your page stored before asking (the JS SDK does this for the fallback).
    const user = await client.exchangeAuthCode(code!, { redirectUri: redirect_uri, codeVerifier: code_verifier });
    const me = await client.getUserInfo({ userAccessToken: user.access_token });
    const sid = randomBytes(16).toString('base64url');
    sessions.set(sid, { openId: user.open_id, token: user.access_token, refresh: user.refresh_token });
    res.writeHead(200, {
      'content-type': 'application/json',
      'set-cookie': `sid=${sid}; HttpOnly; SameSite=Lax; Path=/`,
    });
    res.end(JSON.stringify({ open_id: me.open_id, name: me.name ?? null, denied: user.denied_scopes }));
  } catch (e) {
    // code_expired / code_used / code_invalid: ask the page to call requestAuthCode() again.
    const status = isOpenApiError(e) ? e.status || 502 : 500;
    res.writeHead(status, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ error: isOpenApiError(e) ? (e.reason ?? e.code) : 'internal' }));
  }
}).listen(Number(process.env.PORT ?? 3000));
