/* Shared table count. Edit here, restart the server and refresh all pages. */
(function (root) {
  const config = Object.freeze({
    tables: 11,
    // Public website: the menu is view-only. Ordering and the staff screen run only on the
    // shop's own Wi-Fi server, which is not part of this site.
    viewOnly: true,
  });
  if (typeof module === 'object' && module.exports) module.exports = config;
  else root.THL_CONFIG = config;
})(typeof window !== 'undefined' ? window : globalThis);
