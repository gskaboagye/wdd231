// ========== Dynamic Year ==========
document.querySelector("#year").textContent = new Date().getFullYear();

// ========== Last Visit Message ==========
const visitMessage = document.querySelector("#visit-message");
const lastVisitDisplay = document.querySelector("#last-visit");
const lastVisit = localStorage.getItem("lastVisit");
const now = Date.now();

if (!lastVisit) {
  visitMessage.textContent = "Welcome! This is your first visit. Explore our community!";
} else {
  const daysSinceLast = Math.floor((now - Number(lastVisit)) / (1000 * 60 * 60 * 24));
  visitMessage.textContent = `Welcome back! It's been ${daysSinceLast} day(s) since your last visit.`;
}

localStorage.setItem("lastVisit", now);
lastVisitDisplay.textContent = new Date(Number(lastVisit)).toLocaleString() || "First Visit";

// ========== Load Places from JSON ==========
const gallery = document.getElementById("discover-gallery");

fetch("data/discover.json")
  .then((response) => response.json())
  .then((data) => {
    data.places.forEach((place) => {
      const card = document.createElement("div");
      card.classList.add("gallery-card");

      const img = document.createElement("img");
      img.dataset.src = place.image;
      img.alt = place.name;
      img.loading = "lazy";

      const name = document.createElement("h3");
      name.textContent = place.name;

      const desc = document.createElement("p");
      desc.textContent = place.description;

      card.append(img, name, desc);
      gallery.appendChild(card);
    });

    // Lazy loading setup
    const lazyImages = document.querySelectorAll("img[data-src]");
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
          observer.unobserve(img);
        }
      });
    });

    lazyImages.forEach((img) => imageObserver.observe(img));
  })
  .catch((error) => console.error("Error loading discover.json:", error));
