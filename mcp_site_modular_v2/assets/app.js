
(function () {
  function getPlan(key) {
    return SITE.plans.find((plan) => plan.key === key);
  }

  function getCheckoutUrl(planKey) {
    return planKey === 'starter' ? SITE.checkout.starterUrl : SITE.checkout.proUrl;
  }

  function getDownloadUrl(planKey) {
    return planKey === 'starter' ? SITE.checkout.starterDownloadUrl : SITE.checkout.proDownloadUrl;
  }

  function handleBuy(planKey) {
    const url = getCheckoutUrl(planKey);
    if (!url || url.includes('YOUR_')) {
      alert('Add your PayPal checkout URL in assets/data.js before going live.');
      return;
    }
    window.location.href = url;
  }

  document.addEventListener('DOMContentLoaded', () => {
    const headerSlot = document.querySelector('[data-nav]');
    const footerSlot = document.querySelector('[data-footer]');
    if (headerSlot) headerSlot.innerHTML = Components.nav();
    if (footerSlot) footerSlot.innerHTML = Components.footer();

    document.addEventListener('click', async (event) => {
      const copyButton = event.target.closest('[data-copy-target]');
      if (copyButton) {
        const target = document.getElementById(copyButton.dataset.copyTarget);
        if (!target) return;
        const text = target.innerText.trim();
        try {
          await navigator.clipboard.writeText(text);
          const old = copyButton.textContent;
          copyButton.textContent = 'Copied';
          setTimeout(() => (copyButton.textContent = old), 1200);
        } catch {
          copyButton.textContent = 'Copy failed';
          setTimeout(() => (copyButton.textContent = 'Copy'), 1200);
        }
        return;
      }

      const jump = event.target.closest('[data-jump]');
      if (jump) {
        window.location.href = jump.dataset.jump;
        return;
      }

      const buyButton = event.target.closest('[data-buy-plan]');
      if (buyButton) {
        handleBuy(buyButton.dataset.buyPlan);
      }
    });

    const planSlot = document.getElementById('plans-grid');
    if (planSlot) {
      planSlot.innerHTML = SITE.plans.map(Components.planCard).join('');
    }

    const successDownloadSlot = document.getElementById('success-download');
    if (successDownloadSlot) {
      const params = new URLSearchParams(window.location.search);
      const planKey = params.get('plan') || 'starter';
      const plan = getPlan(planKey) || getPlan('starter');
      const url = getDownloadUrl(plan.key);
      successDownloadSlot.innerHTML = url && !url.includes('your-domain.com')
        ? `<a class="button primary" href="${url}">Download ${plan.name}</a>`
        : `<button class="button primary" data-copy-target="success-note">Copy setup note</button>
           <pre id="success-note" hidden>Set the private download URL for ${plan.name} in assets/data.js.</pre>`;
      const planLabel = document.getElementById('success-plan-name');
      if (planLabel) planLabel.textContent = plan.name;
    }

    const yearSlots = document.querySelectorAll('[data-year]');
    yearSlots.forEach((slot) => (slot.textContent = new Date().getFullYear()));
  });
})();
