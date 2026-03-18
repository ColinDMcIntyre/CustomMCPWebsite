(function () {
  const site = window.SITE;

  function nav() {
    return `
      <div class="site-nav">
        <div class="nav-inner">
          <a class="brand" href="index.html">${site.brand.name}</a>
          <div class="nav-links">
            <a class="nav-button" href="index.html#plans">Plans</a>
            <a class="nav-button" href="starter.html">Starter</a>
            <a class="nav-button" href="pro.html">Pro</a>
            <a class="nav-button" href="custom.html">Custom</a>
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

  function planCard(plan) {
    const bullets = plan.bullets.map((b) => `<li>${b}</li>`).join('');
    const action = plan.key === 'custom'
      ? `<a class="button primary" href="${plan.href}">${plan.cta}</a>`
      : `<button class="button primary" data-buy-plan="${plan.key}">${plan.cta}</button>`;
    return `
      <article class="plan-card ${plan.featured ? 'featured' : ''}">
        <div class="plan-top">
          <div>
            <h3>${plan.name}</h3>
            <div class="plan-subtitle">${plan.shortName}</div>
          </div>
          <div class="price">${plan.price}</div>
        </div>
        <p>${plan.description}</p>
        <ul>${bullets}</ul>
        <div class="button-row">
          ${action}
          <a class="ghost-button" href="${plan.href}">View details</a>
        </div>
      </article>`;
  }

  function codeCard(title, code, idSuffix, options = {}) {
    const escaped = code.replace(/&/g, '&amp;').replace(/</g, '&lt;');
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

  function buyButton(planKey, label = 'Buy now') {
    return `<button class="button primary" data-buy-plan="${planKey}">${label}</button>`;
  }

  window.Components = { nav, footer, planCard, codeCard, buyButton };
})();
