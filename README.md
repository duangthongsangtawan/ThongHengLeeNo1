# Thong Heng Lee (ท่งเฮงหลี · 同興利)

Public website for Thong Heng Lee, a family-run Thai restaurant in the Tha Chang community, Bangkok.

- `index.html` — home page
- `menu.html` — menu with photos, in 8 languages (Thai, English, Chinese, Japanese, Burmese, Korean, Spanish, French)

This is the **view-only** build of the site: guests can browse the menu, but ordering and the
staff screen are not included. Those run only on the restaurant's own Wi-Fi server, which is kept
in a separate, private copy of the project.

## Editing

- Restaurant details (address, hours, phone, team): `assets/js/common.js`, the `SITE` block at the top.
- Dishes and prices: `assets/js/menu-data.js`.
- Dish photos: `assets/images/menu/<id>.jpg` (thumbnail) and `assets/images/menu/full/<id>.jpg` (large).
- `viewOnly: true` in `assets/js/site-config.js` is what hides the ordering controls on this site.

The site is plain HTML, CSS and JavaScript with no build step, served by GitHub Pages from the `main` branch.
