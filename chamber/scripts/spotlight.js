async function loadSpotlights() {
  try {
    //  make sure file is in chamber/data/members.json
    const response = await fetch("data/members.json");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const members = await response.json();

    //  normalize case and filter
    const filtered = members.filter(
      (m) => m.membership.toLowerCase() === "gold" || m.membership.toLowerCase() === "silver"
    );

    //  randomly select 2–3
    const selected = filtered
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * 2) + 2); // 2 or 3

    const container = document.getElementById("spotlight-container");
    container.innerHTML = "";

    selected.forEach((member) => {
      //  safe logo path (supports absolute or relative paths)
      const logoPath = member.logo.startsWith("http")
        ? member.logo
        : `images/${member.logo}`;

      container.innerHTML += `
        <div class="spotlight-card">
          <img src="${logoPath}" alt="${member.name} logo" loading="lazy">
          <h3>${member.name}</h3>
          <p>${member.address}</p>
          <p>${member.phone}</p>
          <a href="${member.website}" target="_blank" rel="noopener">Visit Website</a>
          <p class="level">${member.membership} Member</p>
        </div>
      `;
    });
  } catch (error) {
    console.error("❌ Spotlights failed to load:", error);
    document.getElementById("spotlight-container").innerHTML =
      "<p>Unable to load member spotlights right now.</p>";
  }
}

loadSpotlights();
