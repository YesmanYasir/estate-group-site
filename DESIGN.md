# Design direction

## Creative concept
**A home, found in one clear moment.** Follow the supplied reference's useful rhythm: full-screen property photography with a compact search control, a horizontal row of featured homes, and simple property-type tiles. Keep the implementation original: AIM's own wordmark, copy, colors, and listing imagery.

## Palette and type
- Ink `#151515` — navigation, text, and primary actions.
- White `#FFFFFF` — cards and search surface.
- Warm paper `#F6F5F1` — subtle page sections and filter background.
- Brushed bronze `#A88355` — restrained accent.
- Soft gray `#76746F` — secondary details and thin borders.
- Playfair Display for expressive property headlines; DM Sans for navigation, search, metadata, and forms.

## Layout
- Photo-first, darkened hero; the search form is the primary action and remains easy to scan.
- Featured homes use horizontal snap scrolling with visible previous/next buttons; cards keep price, location, home type, and core facts in the same order.
- Browse by type uses simple labeled cards rather than decorative 3D illustrations.
- The `/admin` link stays visible in the main navigation and footer. Keep new listing creation short; put secondary details under an optional disclosure.
- Phone layouts use a real menu, stacked search fields, swipeable cards, and two-column category tiles.

## Accessibility
Use semantic headings, labels, and buttons; support keyboard navigation and visible focus. Images need meaningful alt text. Keep adequate contrast and honor reduced-motion settings. Do not use color or icons alone to communicate listing states.
