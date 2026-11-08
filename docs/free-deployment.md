# Setup, admin, and free-first deployment

The site runs on Cloudflare Workers. D1 stores property records and R2 stores uploaded photos. You do not need a separate CRM, CMS, or paid database account. Cloudflare's free quotas are intended for modest traffic and can change; check [Workers pricing](https://developers.cloudflare.com/workers/platform/pricing/) and [D1 pricing](https://developers.cloudflare.com/d1/platform/pricing/) before launch. Your existing domain registration stays with its registrar.

## Deploy (one-time setup)

1. Create a Cloudflare account and install Node.js 20.9 or newer.
2. In the repository folder, run:

   ```cmd
   npm.cmd install
   npx.cmd wrangler login
   npm.cmd run setup:cloudflare
   ```

   The setup command creates the D1 database and R2 photo bucket, applies both database migrations, asks you to choose an admin password, and saves secrets directly to Cloudflare. It updates `wrangler.jsonc` with the database ID. Keep that file in Git; do not commit `.dev.vars` or passwords.

3. Deploy:

   ```cmd
   npm.cmd run cf:deploy
   ```

4. In Cloudflare, add your custom domain under **Workers & Pages → estate-group-site → Settings → Domains & Routes**. If Cloudflare asks you to move DNS, preserve existing MX, SPF, DKIM, and DMARC records so company email keeps working.

## Add a home

Open `https://your-domain/admin`, enter the admin password you chose, and use **Add a home**. Enter the title, location, type, sale/rent, price, photo, and short description. New homes publish immediately; open **More details** to save as a draft or add bedrooms, bathrooms, area, and features. Use the Properties list to unpublish or republish.

For a photo upload, R2 must be connected (the setup command does this). A direct HTTPS image URL is also accepted. Sample properties on the public site are clearly labeled and are fallback preview content only; replace them with verified listings before launch.

## Preview locally

- `npm run dev` starts the visual preview at `http://localhost:3000`. It uses sample listings; admin changes are not persistent without a database.
- To try the admin locally after the one-time Cloudflare setup, copy `.dev.vars.example` to `.dev.vars`, enter your chosen local secrets, then run:

  ```cmd
  npx.cmd wrangler d1 migrations apply estate-group --local
  npm.cmd run cf:preview
  ```

  This uses local development copies of D1 and R2. It does not alter production listings.

## Changes after setup

Push the change to GitHub, then run `npm.cmd run cf:deploy` from the project folder, or connect the repository to Cloudflare Workers Builds and use `npm run cf:deploy` as its build/deploy command. Cloudflare Workers has free daily request limits and D1/R2 have included free usage; exceeding included quotas may require reducing usage or choosing a paid plan. The domain itself is already owned/paid for separately.
