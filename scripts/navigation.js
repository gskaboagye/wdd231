// Responsive navigation & wayfinding
(() => {
  const btn = document.getElementById('menuButton');
  const nav = document.getElementById('primaryNav');

  if (btn && nav) {
    btn.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Wayfinding: mark current page link with aria-current
  const links = nav ? nav.querySelectorAll('a[href]') : [];
  const here = location.pathname.replace(/\/+$/, ''); // trim trailing slash

  links.forEach(a => {
    const path = new URL(a.href, location.origin).pathname.replace(/\/+$/, '');
    if (path === here || (here.endsWith('/') && path.endsWith('/'))) {
      a.setAttribute('aria-current', 'page');
    }
  });
})();
