# Estate Group — property website starter

A polished, responsive real-estate website inspired by the reference at aim-estategroup.com. It is an original implementation: the layout, copy, styles, and code are not copied from that site. Demo properties are clearly identified and must be replaced before launch.

## Stack and cost target

- **Website:** semantic HTML, CSS, and JavaScript; no paid theme or runtime dependency.
- **Property admin:** Sanity Studio, with a structured property editor and image uploads. Editors add or update homes through a browser form without editing site code.
- **Free deployment target:** Cloudflare Pages for the public site and Sanity's hosted `*.sanity.studio` domain for the admin.
- **Source control:** GitHub. Keep the repository public if using free GitHub Pages instead; Cloudflare Pages can deploy from a connected GitHub repository.

The target stack has free plans, not a guarantee of unlimited service. Review the vendors' current quotas and terms before launch. The owned domain itself may have renewal costs. Connecting the root domain to Cloudflare may require changing nameservers; preserve any existing email DNS records.

## Visual direction

- **Deep olive ink `#17231D`:** navigation, hero panels, footer, and primary buttons.
- **Warm ivory `#F5F3ED`:** search, about, and editorial backgrounds.
- **Soft bronze `#C3A575`:** small highlights, dividers, and italic display emphasis.
- **Paper white `#FFFEFA`:** cards and reading surfaces.
- **Muted olive `#717B66`:** secondary text and supporting details.

The visual direction uses spacious editorial typography, restrained brass-colored accents, and Mediterranean property photography. The reference informed the mood and information flow; this site uses its own layout and copy.

## Local preview

Run a local static server from the public-site folder:

```sh
cd site
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Connect the no-code property admin

1. Create a free Sanity account and project at [sanity.io/manage](https://www.sanity.io/manage); choose a **public** `production` dataset for public listings.
2. In `studio/sanity.config.ts` and `studio/sanity.cli.ts`, replace `YOUR_SANITY_PROJECT_ID` with the project ID from Sanity Manage.
3. In `site/js/config.js`, set the same `sanityProjectId`, `sanityDataset: "production"`, and `studioUrl` (for example `https://your-studio.sanity.studio`).
4. From `studio/`, run `npm install` and `npx sanity deploy`; sign in when the CLI asks and choose a unique studio hostname.
5. Add the hosted studio origin to Sanity's CORS origins if prompted. Sign into the studio and create/publish property entries.
6. The public site reads published records from Sanity's read-only CDN. If the project ID is not set yet, it shows the marked sample listings in `site/data/demo-properties.json`.

The Sanity Studio is the admin login. Only invite trusted editors in Sanity Manage. Never put a write token in the public website.

## Free public deployment

See [`docs/free-deployment.md`](docs/free-deployment.md). The intended route is GitHub → Cloudflare Pages (Free) → your existing domain. After Cloudflare Pages creates a deploy hook, add it as a Sanity webhook so publishing a property triggers a site rebuild only if the site is later changed to build-time data. This starter currently queries published listings at runtime, so listing edits appear from Sanity without a rebuild.

## Property workflow

Open the site's **Admin** link, sign into Sanity Studio, choose **Properties → Create**, complete the form, upload a cover image and gallery, then Publish. To remove a listing from the public site, set its status to Sold, Rented, or Hidden.

## Before the real launch

- Replace the sample brand details in `site/js/config.js`, and replace all sample property records/images with authorized, current listings.
- Add the real business email, phone, legal company details, privacy notice, and cookie/analytics choices.
- Confirm property prices, measurements, investment/visa claims, availability, and image usage with the business owner.
- Check the applicable real-estate advertising, consumer-protection, privacy, and accessibility obligations for the target country.

See [`docs/architecture.md`](docs/architecture.md) and [`AGENTS.md`](AGENTS.md) for project decisions and agent guidance.
