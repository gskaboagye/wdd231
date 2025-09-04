// Footer: current year + last modified
(() => {
  const yearEl = document.getElementById('year');
  const modEl = document.getElementById('lastModified');

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  if (modEl) {
    // document.lastModified is a simple string; no heavy formatting needed
    modEl.textContent = `Last Modified: ${document.lastModified}`;
  }
})();
