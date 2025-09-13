async function loadMembers() {
  const response = await fetch('data/members.json');
  const members = await response.json();
  const container = document.getElementById('members-container');

  container.innerHTML = '';
  members.forEach(member => {
    const card = document.createElement('div');
    card.classList.add('member-card');
    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name}">
      <h2>${member.name}</h2>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">${member.website}</a>
      <p>Membership: ${member.membership}</p>
    `;
    container.appendChild(card);
  });
}

document.getElementById('grid-view').addEventListener('click', () => {
  document.getElementById('members-container').classList.add('grid-view');
  document.getElementById('members-container').classList.remove('list-view');
});

document.getElementById('list-view').addEventListener('click', () => {
  document.getElementById('members-container').classList.add('list-view');
  document.getElementById('members-container').classList.remove('grid-view');
});

document.getElementById('menu-toggle').addEventListener('click', () => {
  document.querySelector('nav ul').classList.toggle('show');
});

document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

loadMembers();
