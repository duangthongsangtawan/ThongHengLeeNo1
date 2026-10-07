# Thong Heng Lee (ท่งเฮงหลี · 同興利)

Public website for Thong Heng Lee, a family-run Thai restaurant in the Tha Chang community, Bangkok.

- `index.html` — home page
- `menu.html` — menu with photos, in 8 languages (Thai, English, Chinese, Japanese, Burmese, Korean, Spanish, French)
- `staff.html` — staff screen (sign-in required; the sign-in is checked by the restaurant's own server)

## Ordering

Anyone can look at the menu. Ordering is switched on only for a guest who scans the QR code on
their table in the restaurant: the code carries the table number and that table's key, and the
order goes over the internet to the restaurant's own order server. That server is not part of
this repository. Its internet address is `publicSite.api` in `assets/js/site-config.js`; while
that is empty, or the server is off, the site shows the menu only.

## Editing

- Restaurant details (address, hours, phone, team): `assets/js/common.js`, the `SITE` block at the top.
- Dishes and prices: `assets/js/menu-data.js`.
- Dish photos: `assets/images/menu/<id>.jpg` (thumbnail) and `assets/images/menu/full/<id>.jpg` (large).
- Public website address and order server address: `assets/js/site-config.js`.

These files are the same as in the restaurant's working copy; change both together.

The site is plain HTML, CSS and JavaScript with no build step, served by GitHub Pages from the `gh-pages` branch (`main` holds the same files).
