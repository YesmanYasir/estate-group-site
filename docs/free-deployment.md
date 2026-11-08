# Setup, admin, and free-first deployment

The site runs on Cloudflare Workers. D1 stores property records and R2 stores uploaded photos. You do not need a separate CRM, CMS, or paid database account. Cloudflare's free quotas are intended for modest traffic and can change; check [Workers pricing](https://developers.cloudflare.com/workers/platform/pricing/) and [D1 pricing](https://developers.cloudflare.com/d1/platform/pricing/) before launch. Your existing domain registration stays with its registrar.

## Deploy (one-time setup)

1. Create a Cloudflare account and install Node.js 20.9 or newer.
2. Create a Google OAuth web client in [Google Cloud Console](https://console.cloud.google.com/auth/clients). Add the public site origin (for example `https://your-domain.com`) and this authorized redirect URI: `https://your-domain.com/api/auth/callback/google`. For local preview also add `http://localhost:3000` and `http://localhost:3000/api/auth/callback/google`. **Testing status allows only accounts on Test users.** To let any Google account use sign-in, finish Branding and set Audience → Publishing status to **In production**. Google may request verification depending on the app details and scopes.
3. In the repository folder, run:

   ```cmd
   npm.cmd install
   npx.cmd wrangler login
   npm.cmd run setup:cloudflare
   ```

   The setup command creates the D1 database and R2 photo bucket, applies pending database migrations, asks for one or more comma-separated Google admin emails and the Google OAuth Client ID/secret, then saves them and a generated Auth.js secret directly to Cloudflare. It updates `wrangler.jsonc` with the database ID. Keep that file in Git; never commit `.dev.vars` or OAuth secrets.

4. Deploy:

   ```cmd
   npm.cmd run cf:deploy
   ```

5. In Cloudflare, add your custom domain under **Workers & Pages → estate-group-site → Settings → Domains & Routes**. The domain must resolve to the Worker before the Google sign-in callback can complete. If Cloudflare asks you to move DNS, preserve existing MX, SPF, DKIM, and DMARC records so company email keeps working.

## Add a home

Open `https://your-domain/admin` and choose **Continue with Google**. Only the comma-separated Google emails stored in the Cloudflare `ADMIN_EMAIL` secret can manage listings. Other Google accounts can sign in and send a listing for approval at `/submit-property`; submissions remain private until an admin approves them. Admins can create sale, rent or Golden Visa listings, add up to eight photos, approve submissions, and publish, unpublish or save drafts. If you add another admin after setup, update the secret in **Workers & Pages → estate-group-site → Settings → Variables and Secrets**, or run `npx wrangler secret put ADMIN_EMAIL` and enter the full comma-separated allowlist.

For a photo upload, R2 must be connected (the setup command does this). A direct HTTPS image URL is also accepted. Sample properties on the public site are clearly labeled and are fallback preview content only; replace them with verified listings before launch.

## Preview locally

- `npm run dev` starts the visual preview at `http://localhost:3000`. It uses sample listings; admin changes are not persistent without a database.
- To try Google admin login locally, copy `.dev.vars.example` to `.dev.vars`, enter the same Google OAuth credentials and admin email, and make sure the local callback URLs above are registered. Then run:

  ```cmd
  npx.cmd wrangler d1 migrations apply estate-group --local
  npm.cmd run cf:preview
  ```

  This uses local development copies of D1 and R2. It does not alter production listings. The plain `npm run dev` site preview does not load Cloudflare secrets and cannot complete admin sign-in.

## Changes after setup

Push the change to GitHub, then run `npm.cmd run cf:deploy` from the project folder, or connect the repository to Cloudflare Workers Builds and use `npm run cf:deploy` as its build/deploy command. Cloudflare Workers has free daily request limits and D1/R2 have included free usage; exceeding included quotas may require reducing usage or choosing a paid plan. The domain itself is already owned/paid for separately.
