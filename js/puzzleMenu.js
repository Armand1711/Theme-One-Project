export function initPuzzleMenu(app, onStartPuzzle1, onStartPuzzle2, onStartPuzzle3, completedPuzzles = 0) {
  const progressPct = Math.round((Math.min(completedPuzzles, 3) / 3) * 100);

  const puzzles = [
    {
      num: '01',
      title: 'Shattered Sanctuary',
      desc: "Reassemble the temple's broken visage to glimpse the first veiled connection.",
      tag: 'Drag & Restore',
      unlocked: true,
      complete: completedPuzzles >= 1
    },
    {
      num: '02',
      title: 'Symbol Cipher',
      desc: 'Decipher ancient emblems to unlock the second hidden bond.',
      tag: 'Decode & Match',
      unlocked: completedPuzzles >= 1,
      complete: completedPuzzles >= 2
    },
    {
      num: '03',
      title: 'Web of Whispers',
      desc: 'Trace the invisible threads that bound the enclave together.',
      tag: 'Connect & Reveal',
      unlocked: completedPuzzles >= 2,
      complete: completedPuzzles >= 3
    }
  ];

  const html = `
    <div id="screen-menu">
      <div class="menu-inner">
        <header class="menu-header">
          <div class="menu-eyebrow">
            <span class="eyebrow-line"></span>
            <span>The Enigma Path</span>
            <span class="eyebrow-line"></span>
          </div>
          <h1>UNRAVEL THE MYSTERY</h1>
          <p>Four riddles await. Each solved unveils a fragment of the hidden bonds that once wove a community together in secrecy.</p>
        </header>

        <div class="menu-progress">
          <div class="progress-label">
            <span>Discovery Progress</span>
            <span>${Math.min(completedPuzzles, 3)}/3 Enigmas Solved</span>
          </div>
          <div class="progress-track">
            <div class="progress-fill" style="width: ${progressPct}%"></div>
          </div>
        </div>

        <div class="menu-grid">
          ${puzzles.map((p, i) => `
            <button
              class="menu-card ${p.complete ? 'complete' : ''} ${!p.unlocked ? 'locked' : ''}"
              data-puzzle="${i + 1}"
              data-unlocked="${p.unlocked}"
              ${!p.unlocked ? 'disabled' : ''}
            >
              <div class="card-status">
                ${p.complete
                  ? '<span class="status-badge complete-badge">&#10003; Solved</span>'
                  : p.unlocked
                    ? '<span class="status-badge active-badge">Available</span>'
                    : '<span class="status-badge locked-badge">&#128274; Locked</span>'}
              </div>
              <div class="card-num">${p.num}</div>
              <div class="card-title">${p.title}</div>
              <div class="card-desc">${p.desc}</div>
              <div class="card-tag">${p.tag}</div>
            </button>
          `).join('')}
        </div>

        <div class="menu-actions">
          <button id="start-puzzle" class="primary-btn">
            <span>Enter the Enigma</span>
            <span class="btn-arrow">&#8594;</span>
          </button>
        </div>
      </div>
    </div>
  `;

  app.innerHTML = html;

  gsap.set('.menu-header', { opacity: 0, y: -30 });
  gsap.set('.menu-progress', { opacity: 0, y: 20 });
  gsap.set('.menu-card', { opacity: 0, y: 40, scale: 0.95 });
  gsap.set('.menu-actions', { opacity: 0, y: 20 });

  const tl = gsap.timeline();
  tl.to('.menu-header', { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' })
    .to('.menu-progress', { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3')
    .to('.menu-card', { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.12, ease: 'back.out(1.7)' }, '-=0.2')
    .to('.menu-actions', { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.2');

  const allCards = document.querySelectorAll('.menu-card');
  let selected = '1';

  // Auto-select the first unsolved puzzle
  if (completedPuzzles >= 1 && completedPuzzles < 3) {
    selected = (completedPuzzles + 1).toString();
  }

  allCards.forEach(card => {
    if (card.dataset.puzzle === selected) card.classList.add('active');
  });

  const unlockedCards = document.querySelectorAll('.menu-card:not([disabled])');
  unlockedCards.forEach(card => {
    card.addEventListener('click', () => {
      allCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      selected = card.dataset.puzzle;
      gsap.to(card, { scale: 1.03, duration: 0.15, yoyo: true, repeat: 1 });
    });
  });

  document.getElementById('start-puzzle').addEventListener('click', () => {
    const handlers = { '1': onStartPuzzle1, '2': onStartPuzzle2, '3': onStartPuzzle3 };
    handlers[selected]?.();
  });
}
