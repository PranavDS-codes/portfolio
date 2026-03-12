/* ==========================================================
   External Links — open in new tab
   Applied after DOM loads. Skips internal, mailto:, tel:, and
   hash-only links.
   ========================================================== */
document.addEventListener('DOMContentLoaded', function () {
  var siteHost = window.location.host; // e.g. "pranavds-codes.github.io"

  document.querySelectorAll('a[href]').forEach(function (link) {
    var href = link.getAttribute('href');

    // Skip non-http, mailto, tel, hash-only, and javascript links
    if (!href || href.charAt(0) === '#' || href.charAt(0) === '/'
        || href.startsWith('mailto:') || href.startsWith('tel:')
        || href.startsWith('javascript:')) {
      return;
    }

    // Only act on http(s) links
    if (href.startsWith('http://') || href.startsWith('https://')) {
      // Skip links pointing to our own domain
      try {
        var url = new URL(href);
        if (url.host === siteHost) return;
      } catch (e) { return; }

      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });
});
