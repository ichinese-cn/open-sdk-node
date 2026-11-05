/**
 * Integration test against a running `DEV_SLOT=n pnpm dev:regions`: `pnpm sdk:test` sets ICH_OPEN_IT to
 * the fixture (sdks/tools/src/it-fixture.ts); without it the test is skipped.
 */
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { Client, OpenApiError } from '../src/index.ts';

// The fixture JSON itself, or the path of a file holding it.
const raw = process.env.ICH_OPEN_IT?.trim();
const fx = raw
  ? (JSON.parse(raw.startsWith('{') ? raw : readFileSync(raw, 'utf8')) as {
      base: string;
      app_id: string;
      app_secret: string;
      tenant_key: string;
      code_url: string;
    })
  : null;

describe.skipIf(!fx)('open API (integration)', () => {
  const client = () => new Client({ appId: fx!.app_id, appSecret: fx!.app_secret, baseUrl: fx!.base });
  const freshCode = async () => ((await (await fetch(fx!.code_url)).json()) as { code: string }).code;

  it('a tenant token lists the members page by page', async () => {
    const c = client();
    const tenant = await c.getTenant({ tenantKey: fx!.tenant_key });
    expect(tenant.tenant_key).toBe(fx!.tenant_key);
    const members = [];
    for await (const m of c.listTenantMembersAll({ page_size: 1 }, { tenantKey: fx!.tenant_key })) members.push(m);
    expect(members.length).toBeGreaterThan(0);
    expect(members[0]!.open_id).toMatch(/^ou_/);
  });

  it('exchangeAuthCode gives a user token; the code works once', async () => {
    const c = client();
    const code = await freshCode();
    const user = await c.exchangeAuthCode(code);
    expect(user.open_id).toMatch(/^ou_/);
    const me = await c.getUserInfo({ userAccessToken: user.access_token });
    expect(me.open_id).toBe(user.open_id);
    await expect(c.exchangeAuthCode(code)).rejects.toMatchObject({ status: 400, reason: 'code_used' });
    const refreshed = await c.refreshUserToken(user.refresh_token);
    expect(refreshed.open_id).toBe(user.open_id);
  });

  it('a tenant endpoint refuses a user token with a typed error', async () => {
    const c = client();
    const user = await c.exchangeAuthCode(await freshCode());
    const err = await c.getTenant({ userAccessToken: user.access_token }).catch((e: unknown) => e);
    expect(err).toBeInstanceOf(OpenApiError);
    expect((err as OpenApiError).status).toBe(403);
    expect((err as OpenApiError).requestId).toBeTruthy();
  });
});
