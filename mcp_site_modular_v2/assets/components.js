(function () {
  const site = window.SITE;

  function nav() {
    return `
      <div class="site-nav">
        <div class="nav-inner">
          <a class="brand" href="index.html">${site.brand.name}</a>
          <div class="nav-links">
            <a class="nav-button" href="index.html">Home</a>
            <a class="nav-button" href="setup-variables.html">Setup & Variables</a>
            <a class="nav-button" href="custom-setup.html">Custom Setup</a>
            <a class="nav-button" href="about.html">About</a>
            <a class="nav-button" href="contact.html">Contact</a>
          </div>
        </div>
      </div>`;
  }

  function footer() {
    return `
      <footer class="footer page-shell">
        <div class="footer-inner">
          <div>© ${new Date().getFullYear()} ${site.brand.name}</div>
          <div>
            <a href="mailto:${site.brand.email}">${site.brand.email}</a>
            &nbsp;·&nbsp;
            <a href="tel:${site.brand.phone}">${site.brand.phone}</a>
          </div>
        </div>
      </footer>`;
  }

  function codeCard(title, code, idSuffix, options = {}) {
    const escaped = String(code).replace(/&/g, '&amp;').replace(/</g, '&lt;');
    const hint = options.hint ? `<div class="code-card-hint">${options.hint}</div>` : '';
    return `
      <div class="code-card">
        <div class="code-card-header">
          <div>
            <strong>${title}</strong>
            ${hint}
          </div>
          <button class="copy-button" data-copy-target="copy-${idSuffix}">Copy</button>
        </div>
        <pre id="copy-${idSuffix}"><code>${escaped}</code></pre>
      </div>`;
  }

  function bulletList(items) {
    return `<ul class="clean-list">${items.map((item) => `<li>${item}</li>`).join('')}</ul>`;
  }

  window.Components = { nav, footer, codeCard, bulletList };
})();
