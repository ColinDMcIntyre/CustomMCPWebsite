(function () {
  function getDownloadUrl() {
    return SITE.checkout.packageDownloadUrl;
  }

  function handleBuy() {
    const url = SITE.checkout.packageUrl;
    if (!url || url.includes('YOUR_')) {
      alert('Add your payment link in assets/data.js before going live.');
      return;
    }
    window.location.href = url;
  }

  function randomSecret(length = 48) {
    const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789-_';
    const bytes = new Uint8Array(length);
    crypto.getRandomValues(bytes);
    let out = '';
    for (let i = 0; i < length; i += 1) {
      out += alphabet[bytes[i] % alphabet.length];
    }
    return out;
  }

  function copyText(text, button) {
    navigator.clipboard.writeText(text).then(() => {
      const old = button.textContent;
      button.textContent = 'Copied';
      setTimeout(() => (button.textContent = old), 1200);
    }).catch(() => {
      const old = button.textContent;
      button.textContent = 'Copy failed';
      setTimeout(() => (button.textContent = old), 1200);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const headerSlot = document.querySelector('[data-nav]');
    const footerSlot = document.querySelector('[data-footer]');
    if (headerSlot) headerSlot.innerHTML = Components.nav();
    if (footerSlot) footerSlot.innerHTML = Components.footer();

    document.addEventListener('click', (event) => {
      const copyButton = event.target.closest('[data-copy-target]');
      if (copyButton) {
        const target = document.getElementById(copyButton.dataset.copyTarget);
        if (!target) return;
        copyText(target.innerText.trim(), copyButton);
        return;
      }

      const generateButton = event.target.closest('[data-generate-target]');
      if (generateButton) {
        const target = document.getElementById(generateButton.dataset.generateTarget);
        if (!target) return;
        target.value = randomSecret(Number(generateButton.dataset.length || 48));
        target.dispatchEvent(new Event('input'));
        return;
      }

      const copyFieldsButton = event.target.closest('[data-copy-fields]');
      if (copyFieldsButton) {
        const ids = copyFieldsButton.dataset.copyFields.split(',').map((item) => item.trim()).filter(Boolean);
        const lines = ids.map((id) => {
          const input = document.getElementById(id);
          return `${input.dataset.key}=${input.value}`;
        }).join('\n');
        copyText(lines, copyFieldsButton);
        return;
      }

      const buyButton = event.target.closest('[data-buy-package]');
      if (buyButton) {
        handleBuy();
      }
    });

    const successDownloadSlot = document.getElementById('success-download');
    if (successDownloadSlot) {
      const url = getDownloadUrl();
      successDownloadSlot.innerHTML = url && !url.includes('your-domain.com')
        ? `<a class="button primary" href="${url}">Download package</a>`
        : `<div class="notice">Set your private download URL in assets/data.js.</div>`;
    }

    const yearSlots = document.querySelectorAll('[data-year]');
    yearSlots.forEach((slot) => (slot.textContent = new Date().getFullYear()));
  });
})();
