# Setup, admin, and free-first deployment

The site runs on Cloudflare Workers. D1 stores property records and R2 stores uploaded photos. You do not need a separate CRM, CMS, or paid database account. Cloudflare's free quotas are intended for modest traffic and can change; check [Workers pricing](https://developers.cloudflare.com/workers/platform/pricing/) and [D1 pricing](https://developers.cloudflare.com/d1/platform/pricing/) before launch. Your existing domain registration stays with its registrar.

## Deploy (one-time setup)

1. Create a Cloudflare account and install Node.js 20.9 or newer.
2. Create a Google OAuth web client in [Google Cloud Console](https://console.cloud.google.com/auth/clients). Add the public site origin (for example `https://your-domain.com`) and this authorized redirect URI: `https://your-domain.com/api/auth/callback/google`. For local preview also add `http://localhost:3000` and `http://localhost:3000/api/auth/callback/google`. If Google's consent screen is in Testing mode, add the admin Google account as a test user.
3. In the repository folder, run:

   ```cmd
   npm.cmd install
   npx.cmd wrangler login
   npm.cmd run setup:cloudflare
   ```

   The setup command creates the D1 database and R2 photo bucket, applies both database migrations, asks which Google email is the sole admin and for the Google OAuth Client ID/secret, then saves them and a generated Auth.js secret directly to Cloudflare. It updates `wrangler.jsonc` with the database ID. Keep that file in Git; never commit `.dev.vars` or OAuth secrets.

4. Deploy:

   ```cmd
   npm.cmd run cf:deploy
   ```

5. In Cloudflare, add your custom domain under **Workers & Pages → estate-group-site → Settings → Domains & Routes**. The domain must resolve to the Worker before the Google sign-in callback can complete. If Cloudflare asks you to move DNS, preserve existing MX, SPF, DKIM, and DMARC records so company email keeps working.

## Add a home

Open `https://your-domain/admin` and choose **Continue with Google**. Only the exact Google email entered during setup can manage listings; other Google accounts are denied. Use **Add a home** to enter the title, location, type, sale/rent, price, photo, and short description. New homes publish immediately; open **More details** to save as a draft or add bedrooms, bathrooms, area, and features. Use the Properties list to unpublish or republish.

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
