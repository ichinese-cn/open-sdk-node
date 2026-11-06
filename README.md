# iChinese Open Platform SDK for Node.js

> **Prerelease 1.0.0-rc.3.** 这是预发布版，开放平台还没有正式开放，SDK 的默认地址可能连不上。This is a prerelease: the open platform is not open to the public yet, so the SDK's default address may not answer.

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

## Posting in a person's name

With a user token that has the `community:post` scope, four methods do the uploads and the waiting:

- `uploadImage(userToken, data, contentType)`: gets an upload slot, PUTs the image there, returns its `key`.
- `uploadVideo(userToken, data, { filename, contentType })`: gets a slot, PUTs the video, starts transcoding;
  returns the video (`asset_id`). Pass a large file as `await fs.openAsBlob(path)`.
- `waitVideoReady(userToken, assetId, { timeoutMs, intervalMs })`: polls until the video is `ready`; throws
  an `OpenApiError` with reason `video_failed`, or code `TIMEOUT`.
- `createPost(userToken, post)`: posts; adds a `uuid` when you give none, so retries never post twice.

```ts
import { openAsBlob } from 'node:fs';
import { readFile } from 'node:fs/promises';

try {
  // A post with an image…
  const key = await client.uploadImage(userToken, await readFile('photo.jpg'), 'image/jpeg');
  const post = await client.createPost(userToken, { body: '今天学了新词 #HSK3', images: [{ key }] });
  console.log(post.url, post.status);

  // …or with a video, once it is transcoded.
  const video = await client.uploadVideo(userToken, await openAsBlob('lesson.mp4'), {
    filename: 'lesson.mp4',
    contentType: 'video/mp4',
  });
  await client.waitVideoReady(userToken, video.asset_id);
  await client.createPost(userToken, { title: '第一课', video: { asset_id: video.asset_id } });
} catch (e) {
  // The person has not agreed to show their name on posts: only they can, at this address.
  if (isOpenApiError(e) && e.reason === 'consent_required') console.log(e.consentUrl);
  else throw e;
}
```

A post has either images (`images: [{ key }]`, up to 9) or one video. Errors keep the server's
`reason`: `consent_required`, `video_not_ready`, `post_rate_limited`, `app_user_daily_limit`,
`daily_quota_exceeded`, `minor_not_allowed`, `app_post_stopped`, …. `createPost` and completing a video
upload are retried after server errors like a GET (the server makes them idempotent).

### Posting as the institution (机构号)

With the institution's tenant key the same helpers post as its community account (its name and logo, the
post says it came from your app): `uploadImageAsOrg`, `uploadVideoAsOrg`, `waitVideoReadyAsOrg`,
`createPostAsOrg`. The institution must have installed the app and granted `community:post`; before its
homepage was first published there is no account yet (409 `no_org_account`). Limits and review are the same.

```ts
const key = await client.uploadImageAsOrg(tenantKey, bytes, 'image/png');
await client.createPostAsOrg(tenantKey, { body: '秋季班开始报名 #少儿中文', images: [{ key }] });
```

### The institution's dashboard

`getAllInsights` reads every page of the institution's dashboard the API offers (`GET /insights`, scope
`insights:readonly`, tenant token): the default page first, then each other tab it lists, with the same
query. It returns tab → page. Fewer than five people come back as null with `withheld: true`; money is
per currency, never converted.

```ts
const pages = await client.getAllInsights(tenantKey, { range: '30d' });
console.log(pages.enrollment.tiles);
```

## Documentation

Guides and the API reference: <https://open.ichinese.cn>

This repository is generated from the platform's monorepo at each release, so a change made here would be
overwritten; please open an issue instead.

## License

MIT
