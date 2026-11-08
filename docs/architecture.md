# Architecture

## Chosen approach

The public site is static HTML/CSS/JS hosted on Cloudflare Pages Free. A separate Sanity Studio at a free `*.sanity.studio` address provides the no-code property admin. Public listing data is requested from Sanity's read-only CDN at runtime. This avoids a custom server, database maintenance, deploys for routine listing edits, and write credentials in the browser.

## Why

The brief prioritizes free hosting and easy property entry. A static frontend is inexpensive to host and fast to serve; Sanity provides editable fields, image upload, drafts/publishing, and editor accounts. Cloudflare Pages supports Git-based deployments and custom domains on its free plan subject to its published quotas. Sanity's free plan has quotas; verify current terms before relying on it for a commercial production site.

## Main flows

1. Visitor opens the homepage and searches or filters available properties.
2. Browser fetches published `property` documents from Sanity's public CDN; demo data is used if Sanity is not configured or unavailable.
3. Visitor opens a property detail URL and can enquire by email/phone once the owner supplies real contact details.
4. Editor signs into the hosted Studio, adds/edits a property, uploads images, and publishes. The public site reads the published data on its next request.

## Trade-offs and boundaries

- A public dataset means published content is public. Drafts remain unpublished. Never store sensitive client information in property records.
- Runtime content fetches require the Sanity project/dataset IDs in `site/js/config.js`; those IDs are identifiers, not secrets.
- Sanity quotas, Cloudflare free-plan limits, domain renewal, and registrar/DNS costs can change. Free service is not an SLA.
- Listings and contact details are demo placeholders until replaced. This repository does not provide transaction processing, customer accounts, CRM, or legal compliance advice.
