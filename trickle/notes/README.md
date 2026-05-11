# Art Passaion — Flower Shop (Demo)

This is a multi-page demo storefront for a flower shop called “Art Passaion”.

## Pages

- `index.html` — Home page with hero, featured bouquets, delivery/service info, reviews, and FAQ
- `catalog.html` — Catalog with filters, sorting, and search
- `product.html` — Product detail page (`?id=...`)
- `checkout.html` — Checkout flow with validation and order confirmation
- `contacts.html` — Contact information and quick actions

## Key Features

- Product catalog sourced from the images uploaded into `trickle/assets/` (titles match the upload "description" you typed)
- Product detail supports quantity for all items and size selection for teddy products
- Catalog can include special items that redirect to external pages (e.g., “Свадьба” → Facebook)
- Cart drawer with quantity controls
- Checkout form with basic validation and updated payment methods
- User-friendly toast notifications
- Language switcher in the header (RU / EN / EL) with full-page translations
- Greece localization (store address and phone shown across the site)

## Notes for future updates

When you update the project, always check if this README needs updates:
- If you add/remove pages, update the “Pages” section.
- If you change user-facing flows (cart/checkout), update “Key Features”.
- If you add new assets (images), record them in `trickle/assets/` (one JSON per resource).