/**
 * Lists the members of an institution that installed your app (tenant token, paged).
 *
 *   APP_ID=… APP_SECRET=… TENANT_KEY=cn.… [OPEN_API_BASE=http://open.localhost:4380] tsx examples/tenant-members.ts
 */
import { Client, isOpenApiError } from '../src/index.ts';

const client = new Client({
  appId: process.env.APP_ID!,
  appSecret: process.env.APP_SECRET!,
  baseUrl: process.env.OPEN_API_BASE, // default: the release's address
});
const tenantKey = process.env.TENANT_KEY!;

try {
  const tenant = await client.getTenant({ tenantKey });
  console.log(`${tenant.name} (${tenant.rating})`);
  for await (const m of client.listTenantMembersAll({}, { tenantKey })) {
    console.log(`${m.open_id}  ${m.name}  ${m.roles.join(',')}`);
  }
} catch (e) {
  // The institution's admin may have refused this scope: do without the member list.
  if (isOpenApiError(e) && e.isScopeError) console.log(`not allowed (${e.reason} ${e.scope ?? ''})`);
  else throw e;
}
