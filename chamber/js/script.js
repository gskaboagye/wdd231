document.getElementById('year').textContent = new Date().getFullYear(); 
document.getElementById('lastModified').textContent = document.lastModified;

// Responsive nav
const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');
menuBtn.addEventListener('click', () => navMenu.classList.toggle('show'));

// Load members
async function loadMembers() {
  try {
    const response = await fetch('data/members.json');
    const data = await response.json();
    displayMembers(data.members);
  } catch (error) {
    console.error("Error loading members.json:", error);
  }
}

function displayMembers(members) {
  const container = document.getElementById('members');
  container.innerHTML = '';
  members.forEach(member => {
    // Use default.png if member.image is missing
    const imgSrc = `images/${member.image || "default.png"}`;

    if (container.classList.contains('grid-view')) {
      container.innerHTML += `
        <div class="member-card">
          <img src="${imgSrc}" alt="${member.name}" 
               onerror="this.onerror=null;this.src='images/default.png';">
          <h3>${member.name}</h3>
          <p>${member.address}</p>
          <p>${member.phone}</p>
          <a href="${member.website}" target="_blank">Visit Website</a>
          <p>Level: ${member.membership}</p>
        </div>`;
    } else {
      container.innerHTML += `
        <div class="member-list">
          <h3>${member.name}</h3>
          <p>${member.address} | ${member.phone} | 
            <a href="${member.website}" target="_blank">Website</a> | 
            Level: ${member.membership}</p>
        </div>`;
    }
  });
}

document.getElementById('gridBtn').addEventListener('click', () => {
  document.getElementById('members').className = 'grid-view';
  loadMembers();
});

document.getElementById('listBtn').addEventListener('click', () => {
  document.getElementById('members').className = 'list-view';
  loadMembers();
});

loadMembers();
