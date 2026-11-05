# iChinese Open Platform SDK for Node.js

> **Prerelease 1.0.0-rc.2.** 这是预发布版，开放平台还没有正式开放，SDK 的默认地址可能连不上。This is a prerelease: the open platform is not open to the public yet, so the SDK's default address may not answer.

爱中文开放平台的 Node.js 服务端 SDK：开放接口（`/open-apis/v1`）的每个接口都是一个方法，并处理令牌、重试、分页和事件推送。

The server SDK of the iChinese open platform. Every operation of the open API is a method on `Client`
(generated from the contract), plus what each app would otherwise write itself: getting the app and
tenant tokens and renewing them before they expire, retrying after rate limits and server errors with
backoff, paging through lists, typed errors, exchanging the web login's codes, and verifying and
decrypting event pushes. No runtime dependencies.

## Install

```sh
npm install @ichinese/open-sdk
```

Requires Node.js 20 or newer. ESM and CommonJS are both supported, with type declarations.

## Quick start

List an institution's members with a tenant token:

```ts
import { Client, isOpenApiError } from '@ichinese/open-sdk';

const client = new Client({ appId: process.env.APP_ID!, appSecret: process.env.APP_SECRET! });

try {
  const tenant = await client.getTenant({ tenantKey });
  console.log(`${tenant.name} (${tenant.rating})`);
  for await (const m of client.listTenantMembersAll({}, { tenantKey })) {
    console.log(`${m.open_id}  ${m.name}  ${m.roles.join(',')}`);
  }
} catch (e) {
  // The institution's admin may have refused this scope.
  if (isOpenApiError(e) && e.isScopeError) console.log(`not allowed (${e.reason})`);
  else throw e;
}
```

The `examples` directory has this one in full, a backend for the web login and a server for event pushes.

## Documentation

Guides and the API reference: <https://open.ichinese.cn>

This repository is generated from the platform's monorepo at each release, so a change made here would be
overwritten; please open an issue instead.

## License

MIT
