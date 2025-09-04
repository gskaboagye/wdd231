// Course array (edit 'completed' to reflect your progress)
const courses = [
  { code: 'WDD130', title: 'Web Fundamentals', credits: 2, subject: 'WDD', completed: true },
  { code: 'WDD131', title: 'Dynamic Web Fundamentals', credits: 2, subject: 'WDD', completed: true },
  { code: 'CSE110', title: 'Intro to Programming', credits: 2, subject: 'CSE', completed: true },
  { code: 'CSE111', title: 'Programming with Functions', credits: 2, subject: 'CSE', completed: false },
  { code: 'CSE210', title: 'Programming with Classes', credits: 2, subject: 'CSE', completed: false },
  { code: 'WDD231', title: 'Web Frontend Development I', credits: 3, subject: 'WDD', completed: false },
  { code: 'WDD241', title: 'Web Frontend Development II', credits: 3, subject: 'WDD', completed: false }
];

(() => {
  const grid = document.getElementById('coursesGrid');
  const totalOut = document.getElementById('creditsTotal');

  const buttons = {
    ALL: document.getElementById('filterAll'),
    WDD: document.getElementById('filterWDD'),
    CSE: document.getElementById('filterCSE')
  };

  let currentFilter = 'ALL';

  function setActive(filterKey){
    Object.keys(buttons).forEach(k => {
      buttons[k].classList.toggle('is-active', k === filterKey);
    });
    currentFilter = filterKey;
  }

  function getFiltered(){
    if (currentFilter === 'WDD') return courses.filter(c => c.subject === 'WDD');
    if (currentFilter === 'CSE') return courses.filter(c => c.subject === 'CSE');
    return courses.slice();
  }

  function render(){
    if (!grid) return;
    grid.innerHTML = '';

    const list = getFiltered();

    // credits via reduce (per rubric)
    const total = list.reduce((sum, c) => sum + (Number(c.credits) || 0), 0);
    if (totalOut) totalOut.textContent = `Total Credits: ${total}`;

    list.forEach(c => {
      const card = document.createElement('article');
      card.className = 'course';
      card.setAttribute('tabindex', '0');

      const head = document.createElement('div');
      head.className = 'course-head';

      const title = document.createElement('div');
      title.className = 'course-title';
      title.textContent = `${c.code} • ${c.title}`;

      const badge = document.createElement('span');
      badge.className = 'badge';
      badge.textContent = `${c.credits} cr`;

      head.append(title, badge);

      const meta = document.createElement('p');
      meta.className = 'meta';
      meta.textContent = `${c.subject} • ${c.completed ? 'Completed' : 'Not completed'}`;

      if (c.completed) {
        // highlight completed
        card.style.borderColor = '#86efac';
        card.style.boxShadow = '0 8px 18px rgba(22,163,74,.10)';
        const done = document.createElement('span');
        done.className = 'badge success';
        done.textContent = 'Completed';
        head.appendChild(done);
      }

      card.append(head, meta);
      grid.appendChild(card);
    });
  }

  // wire buttons
  Object.keys(buttons).forEach(key => {
    buttons[key]?.addEventListener('click', () => {
      setActive(key);
      render();
    });
  });

  // initial
  setActive('ALL');
  render();
})();
