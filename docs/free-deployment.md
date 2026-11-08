# Free deployment and custom domain

## Planned services

| Part | Service | Cost target | Setup needed |
|---|---|---:|---|
| Code repository | GitHub | Free plan | Create a repository and push this project |
| Website hosting | Cloudflare Pages | Free plan | Connect GitHub, choose the project root, publish directory `site` for this no-build static site |
| Property editor | Sanity Studio | Free plan within quotas | Create a project, set its ID, and run `npx sanity deploy` from `studio/` |
| Custom domain | Existing registrar + Cloudflare DNS | No new hosting charge; domain renewal may still cost money | Add domain in Cloudflare and update DNS/nameservers as required |

## Cloudflare Pages steps

1. Sign into Cloudflare and add the existing domain. Choose the Free plan.
2. Review the DNS import carefully. Preserve MX, SPF, DKIM, DMARC, and any verification records if the domain also handles email.
3. If the root/apex domain will be used, follow Cloudflare's custom-domain instructions; this can require moving authoritative nameservers to Cloudflare. Do not remove old DNS records until the import is checked.
4. In **Workers & Pages → Create → Pages → Connect to Git**, authorize the selected GitHub account and choose the new repository.
5. For this no-build starter, leave the build command empty and set the output directory to `site`.
6. Deploy, then add the custom domain under the Pages project. Wait for certificate/hostname status to become active.
7. Check both the root domain and `www` variant, decide which is canonical, and redirect the other to it.

Cloudflare's dashboard steps and exact record values may change. Follow the DNS targets displayed in your own project, not values copied from another site.

## Sanity setup

Create a project and public production dataset. Set the project ID in `site/js/config.js`, `studio/sanity.config.ts`, and `studio/sanity.cli.ts`. Install dependencies and deploy the Studio using the commands in the root README. Sanity's Studio deploy is a separate first-time setup from the public-site deploy.

## Final checks

- Open every route on a phone and desktop.
- Publish a test listing and verify it appears in the public property grid and detail route.
- Hide the test listing and verify it disappears from available results.
- Confirm the Admin link reaches the hosted Studio and that only intended editors can sign in.
- Confirm mail-related DNS records and mail delivery still work after nameserver changes.
- Verify the provider's current free quotas and commercial-use terms before relying on a zero-cost production setup.
