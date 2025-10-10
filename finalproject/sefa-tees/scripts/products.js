import { openModal } from './modal.js';
import { getFavorites, toggleFavorite, setLastVisit } from './storage.js';

const grid = document.getElementById('itemsGrid');
const filter = document.getElementById('filterColor');
const clearFavBtn = document.getElementById('clearFavorites');

let products = [];

async function fetchProducts(){
  try {
    const res = await fetch('data/products.json');
    if(!res.ok) throw new Error('Network response not ok');
    products = await res.json();
    renderProducts(products);
    initLazyReveal();
    setLastVisit();
  } catch(err){
    grid.innerHTML = `<p class="error">Unable to load products: ${err.message}</p>`;
    console.error(err);
  }
}

function renderProducts(list){
  grid.innerHTML = list.map(p => productCard(p)).join('');
  attachHandlers();
  revealVisible();
}

function productCard(p){
  const favs = getFavorites();
  const isFav = favs.includes(p.id);
  return `
    <article class="item" data-id="${p.id}">
      <figure>
        <img data-src="${p.image}" alt="${p.name}" class="lazy-img" loading="lazy">
      </figure>
      <div class="meta">
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <p><strong>₵${p.price.toFixed(2)}</strong> • ${p.color} • ${p.size}</p>
      </div>
      <div class="actions">
        <button class="btn view" data-id="${p.id}">View</button>
        <button class="btn favorite" data-id="${p.id}" aria-pressed="${isFav}">${isFav ? '★' : '☆'} Favorite</button>
      </div>
    </article>
  `;
}

function attachHandlers(){
  document.querySelectorAll('.view').forEach(b => b.addEventListener('click', (e) => {
    const id = Number(e.currentTarget.dataset.id);
    const p = products.find(x=>x.id===id);
    openModal(p);
  }));
  document.querySelectorAll('.favorite').forEach(b => b.addEventListener('click', (e) => {
    const id = Number(e.currentTarget.dataset.id);
    toggleFavorite(id);
    // update UI quickly
    renderProducts(filter.value ? products.filter(x=>x.color===filter.value) : products);
  }));
}

filter?.addEventListener('change', (e) => {
  const val = e.target.value;
  const list = val ? products.filter(p=>p.color===val) : products;
  renderProducts(list);
});

clearFavBtn?.addEventListener('click', () => {
  localStorage.removeItem('sefa_favorites');
  renderProducts(products);
});

/* Lazy reveal & image lazy-load via IntersectionObserver */
function initLazyReveal(){
  const items = document.querySelectorAll('.item');
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        const img = entry.target.querySelector('.lazy-img');
        if(img && img.dataset.src){
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        io.unobserve(entry.target);
      }
    });
  }, {threshold:0.15});
  items.forEach(i => io.observe(i));
}

/* for initial reveal of items already in view */
function revealVisible(){ document.querySelectorAll('.item').forEach(it => it.classList.add('visible')) }

fetchProducts();
