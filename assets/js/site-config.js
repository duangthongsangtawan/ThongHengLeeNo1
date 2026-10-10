/* Shared settings for the pages and server.js. Edit here, restart the server and refresh all pages. */
(function (root) {
  const config = Object.freeze({
    // Number of tables.
    tables: 11,

    // The public website on the internet (the shop Wi-Fi address is not affected by this).
    // On these host names the pages send orders over the internet to the order server. A guest
    // orders by scanning the QR code on their table, or (see orderWithoutQr) by picking the table.
    publicSite: Object.freeze({
      // Address printed inside the table QR codes. Reprint the codes if this changes.
      url: 'https://duangthongsangtawan.github.io/ThongHengLeeNo1/',
      // Every host name the public website answers on (add a custom domain here).
      hosts: Object.freeze(['duangthongsangtawan.github.io']),
      // Internet address of the order server: the Cloudflare Worker in cloud/ (always on), or a
      // tunnel address to the shop computer. No trailing slash. With '' the public website
      // shows the menu only.
      api: 'https://thong-heng-lee-orders.thong-heng-lee-orders-cloud.workers.dev',

      // Ordering WITHOUT scanning a table QR code: the guest picks the table number on the page.
      // Anyone who knows the website address can then send an order, so those orders are marked
      // "No QR" on the staff screen and are accepted only during orderWithoutQrHours.
      // false = only a scanned table QR code can order. After changing either setting: publish the
      // website AND run `npm run deploy` in cloud/ (the order server enforces the same rule).
      orderWithoutQr: true,
      // Bangkok time. days: 0 = Sunday, 1 = Monday … 6 = Saturday (closed Mondays). QR orders are not limited.
      orderWithoutQrHours: Object.freeze({ days: Object.freeze([0, 2, 3, 4, 5, 6]), from: '08:00', to: '17:00' }),
    }),
  });
  if (typeof module === 'object' && module.exports) module.exports = config;
  else root.THL_CONFIG = config;
})(typeof window !== 'undefined' ? window : globalThis);
