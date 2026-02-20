class SizeChartDrawer extends HTMLElement {
  connectedCallback() {
    this.overlay = this.querySelector('[data-overlay]');
    this.panel = this.querySelector('[data-panel]');

    if (!this._initialized) {
      this.querySelectorAll('[data-size-chart-drawer-close]').forEach((el) =>
        el.addEventListener('click', () => this.close()),
      );

      document.addEventListener('keyup', (e) => {
        if (e.key === 'Escape') this.close();
      });

      this._initialized = true;
    }
  }

  open() {
    this.classList.remove('tw:pointer-events-none');

    this.overlay?.classList.remove('tw:opacity-0');
    this.overlay?.classList.add('tw:opacity-100');
    this.overlay?.classList.add('tw:block!');

    this.panel?.classList.remove('tw:translate-x-full');
    this.panel?.classList.add('tw:translate-x-0');

    document.body.classList.add('tw:overflow-hidden');
  }

  close() {
    this.overlay?.classList.add('tw:opacity-0');
    this.overlay?.classList.remove('tw:opacity-100');
    this.overlay?.classList.remove('tw:block!');

    this.panel?.classList.add('tw:translate-x-full');

    setTimeout(() => {
      this.classList.add('tw:pointer-events-none');
      document.body.classList.remove('tw:overflow-hidden');
    }, 300);
  }
}

if (!customElements.get('size-chart-drawer')) {
  customElements.define('size-chart-drawer', SizeChartDrawer);
}

/* ✅ Dawn-style delegated trigger */
document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-open-size-chart]');
  if (!btn) return;

  const drawer = document.querySelector('size-chart-drawer');
  drawer?.open();
});
