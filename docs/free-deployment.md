# Free-first deployment: Cloudflare Workers + D1 + R2

The domain registration remains with your current registrar. Cloudflare account setup is required because the website needs a runtime, database, and image storage. CRM or an external CMS account is not required. Free-plan quotas apply and can change; monitor them.

## One-time setup
1. Create a Cloudflare account and add the existing domain (the domain itself is not free). Carefully review imported DNS; preserve MX, SPF, DKIM and DMARC records before changing nameservers.
2. Install dependencies: `npm install`. Create a D1 database named `estate-group` and an R2 bucket named `estate-group-media`.
3. Replace the placeholder `database_id` in `wrangler.jsonc` with the ID shown in the Cloudflare dashboard.
4. Apply schema: `npx wrangler d1 migrations apply estate-group --remote`.
5. Configure `ADMIN_PASSWORD` and `SESSION_SECRET` as Worker secrets using `npx wrangler secret put ADMIN_PASSWORD` and `npx wrangler secret put SESSION_SECRET`. Use a unique long password and a random secret of at least 32 characters. For local work copy `.dev.vars.example` to `.dev.vars` and change both values. Never commit `.dev.vars`.
6. Local preview: `npm run dev` (Next.js) or `npm run cf:preview` (production-like Worker runtime).
7. Deploy using `npm run cf:deploy`, or connect GitHub to Cloudflare Workers Builds and use `npm run cf:deploy` as the build/deploy command.
8. Add the custom domain in Workers & Pages after deployment. Confirm certificate and canonical host.

## How listings work
Open `/admin`, sign in with `ADMIN_PASSWORD`, upload a cover image (up to 8 MB) or paste an HTTPS image URL, and save. New listings are drafts. Use Publish to show a listing publicly; Unpublish returns it to draft. Images go to R2; property details go to D1.

The free plans are subject to quotas and change. Cloudflare currently documents D1 prototype/experiment use on the Workers Free plan. Vercel's Hobby plan is limited to personal non-commercial use, so it may not be eligible for a business site. Verify current terms and quotas before launch.
