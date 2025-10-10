const KEY_FAV = 'sefa_favorites';
const KEY_LAST = 'sefa_lastVisit';

export function getFavorites(){
  const raw = localStorage.getItem(KEY_FAV);
  return raw ? JSON.parse(raw) : [];
}
export function toggleFavorite(id){
  const favs = getFavorites();
  const i = favs.indexOf(id);
  if(i>-1) favs.splice(i,1); else favs.push(id);
  localStorage.setItem(KEY_FAV, JSON.stringify(favs));
}

export function setLastVisit(){
  localStorage.setItem(KEY_LAST, Date.now());
}

export function showLastVisit(){
  const last = localStorage.getItem(KEY_LAST);
  const tipEl = document.getElementById('tip');
  if(!tipEl) return;
  if(!last){
    tipEl.textContent = 'Welcome! Let us know if you have any questions.';
  } else {
    const days = Math.floor((Date.now() - Number(last)) / (1000*60*60*24));
    if(days === 0) tipEl.textContent = 'Back so soon! Awesome!';
    else tipEl.textContent = `You last visited ${days} ${days===1 ? 'day' : 'days'} ago.`;
  }
}
