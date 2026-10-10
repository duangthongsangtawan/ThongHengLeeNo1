/* Shared settings for the pages and server.js. Edit here, restart the server and refresh all pages. */
(function (root) {
  const config = Object.freeze({
    // Number of tables.
    tables: 11,

    // The public website on the internet (the shop Wi-Fi address is not affected by this).
    // On these host names the pages send orders over the internet to the shop computer, and a
    // guest can order only after scanning the QR code on their table.
    publicSite: Object.freeze({
      // Address printed inside the table QR codes. Reprint the codes if this changes.
      url: 'https://duangthongsangtawan.github.io/ThongHengLeeNo1/',
      // Every host name the public website answers on (add a custom domain here).
      hosts: Object.freeze(['duangthongsangtawan.github.io']),
      // Internet address of the shop computer's order server (the tunnel address), for example
      // 'https://shop-pc.example.ts.net'. Leave '' until the tunnel is set up: the public
      // website then shows the menu only.
      api: 'https://introduction-qty-backup-reader.trycloudflare.com',
    }),
  });
  if (typeof module === 'object' && module.exports) module.exports = config;
  else root.THL_CONFIG = config;
})(typeof window !== 'undefined' ? window : globalThis);
