# Architecture

## Runtime
Next.js App Router renders the marketing pages, property details, and `/admin`. Route handlers use Cloudflare bindings through OpenNext. D1 stores structured listing data; R2 stores uploaded images. Public routes read only published records.

## Data and fallback
`migrations/0001_properties.sql` defines property records. `lib/demo-properties.ts` provides clearly tagged sample content until the owner enters verified listings. The public pages use the database when configured and retain previews for local setup.

## Admin path
`/admin` uses `ADMIN_PASSWORD` and `SESSION_SECRET`; login creates a 7-day signed HttpOnly, SameSite=Strict cookie. Admin API routes check that signature before reading or changing D1/R2. New records start as drafts; publishing/unpublishing controls public visibility. Image uploads allow common image formats up to 8 MB and save in R2.

## Deployment
The supported full-stack target is Cloudflare Workers using OpenNext, D1, and R2. Cloudflare currently recommends vinext for new Next.js projects, while OpenNext remains documented and is used here to preserve native Next.js development/build compatibility; check the migration status before a future platform update. Vercel Hobby is preview-only for personal non-commercial use.
