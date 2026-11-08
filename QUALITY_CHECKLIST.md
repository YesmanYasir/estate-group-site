# Quality checklist

## Product and content
- [ ] Every demo listing has a visible preview notice; all real property facts are owner-verified.
- [ ] Hero search, property-type/price/location filters, detail links, owner CTA, admin login, create, publish and unpublish work.
- [ ] Replace preview contact identity and add reviewed legal/privacy pages before public launch.

## UI and accessibility
- [ ] Desktop, tablet and phone layouts have no clipped content or lost actions.
- [ ] Keyboard order and visible focus are clear; mobile navigation works; alt text describes photos.
- [ ] Reduced-motion keeps content visible and usable; hero photo and navigation work without JavaScript animation.

## Security and operations
- [ ] `ADMIN_PASSWORD` and `SESSION_SECRET` are configured as runtime secrets; login attempts are throttled.
- [ ] D1 migrations are applied; R2 upload bucket exists; upload and draft/public visibility are verified.
- [ ] Email/DNS records are preserved while connecting the custom domain.
- [ ] Preview locally before deployment; verify Cloudflare production preview with Wrangler before launch.
