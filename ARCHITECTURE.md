# Architecture

## Runtime
Next.js App Router serves the homepage, searchable property collection, property details, and `/admin`. The homepage and property pages render on the server; small client components handle the hero controls, search, carousel, mobile navigation, and admin form. No 3D renderer or large motion library is shipped to visitors.

## Data and images
Cloudflare D1 stores listing metadata and publication status. Cloudflare R2 stores uploaded listing images. `migrations/0001_properties.sql` creates listings/admin rate-limit records; `0002_property_type.sql` adds property categories. Public routes query published listings. Clearly labeled sample properties make the design previewable before database setup.

## Admin
`/admin` is linked in the main navigation and footer. Auth.js handles Google OAuth with an encrypted JWT session cookie. The sign-in callback checks Google's verified email against the single `ADMIN_EMAIL` Worker secret, and the admin API checks that same allowlist before reading or writing. `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`, and `AUTH_SECRET` are Worker secrets. No users table or separate CMS account is needed. A new listing can publish immediately or remain a draft; D1 stores fields, and uploads go to R2.

## Deployment
OpenNext builds the Next.js site for Cloudflare Workers. The `setup:cloudflare` command creates resources, applies migrations, and configures secrets. Then `cf:deploy` publishes the Worker. See `docs/free-deployment.md`.
