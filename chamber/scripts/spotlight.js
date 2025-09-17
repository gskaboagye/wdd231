async function loadSpotlights() {
  try {
    const response = await fetch("data/member.json");
    const members = await response.json();

    // Filter gold and silver members
    const filtered = members.filter(m => m.membership === "Gold" || m.membership === "Silver");

    // Randomly pick 2–3 members
    const selected = filtered.sort(() => 0.5 - Math.random()).slice(0, 3);

    const container = document.getElementById("spotlight-container");
    container.innerHTML = "";

    selected.forEach(member => {
      container.innerHTML += `
        <div class="spotlight-card">
          <img src="images/${member.logo}" alt="${member.name} logo">
          <h3>${member.name}</h3>
          <p>${member.address}</p>
          <p>${member.phone}</p>
          <a href="${member.website}" target="_blank">Visit Website</a>
          <p class="level">${member.membership} Member</p>
        </div>
      `;
    });
  } catch (error) {
    console.error("Spotlights failed to load", error);
  }
}

loadSpotlights();
