export function openModal(product){
  const modal = document.getElementById('modal');
  const content = document.getElementById('modalContent');
  content.innerHTML = `
    <h2 id="modalTitle">${product.name}</h2>
    <img src="${product.image}" alt="${product.name}" style="max-width:100%;height:auto;border-radius:8px">
    <p>${product.description}</p>
    <ul>
      <li>Price: ₵${product.price.toFixed(2)}</li>
      <li>Color: ${product.color}</li>
      <li>Size: ${product.size}</li>
      <li>SKU: ${product.sku}</li>
      <li>Stock: ${product.stock}</li>
    </ul>
  `;
  modal.setAttribute('aria-hidden','false');
  modal.style.display = 'flex';
  document.getElementById('closeModal').focus();
}

document.getElementById('closeModal')?.addEventListener('click', () => {
  const modal = document.getElementById('modal');
  modal.setAttribute('aria-hidden','true');
  modal.style.display = 'none';
});
/* close on Escape */
document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape'){
    const modal = document.getElementById('modal');
    if(modal && modal.getAttribute('aria-hidden') === 'false'){
      modal.setAttribute('aria-hidden','true'); modal.style.display='none';
    }
  }
});
