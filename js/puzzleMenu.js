export function initPuzzleMenu(app, onStartPuzzle1, onStartPuzzle2, onStartPuzzle3, completedPuzzles = 0) {
  const progressPct = Math.round((Math.min(completedPuzzles, 3) / 3) * 100);

  const puzzles = [
    {
      num: '01',
      title: 'Shattered Sanctuary',
      desc: 'The facade of the 1886 Union Masonic Temple has been broken apart. Drag each piece back into its correct position to restore the building.',
      how: 'Drag a piece from the left panel — drop it into the matching slot on the right.',
      tag: 'Drag & Restore',
      unlocked: true,
      complete: completedPuzzles >= 1
    },
    {
      num: '02',
      title: 'Symbol Cipher',
      desc: "Four Masonic symbols are encoded in the lodge's archive. Each one hides the name of a bond forged inside the temple. Match every symbol to its meaning.",
      how: 'Drag a symbol from the left — drop it onto the meaning that fits on the right.',
      tag: 'Decode & Match',
      unlocked: completedPuzzles >= 1,
      complete: completedPuzzles >= 2
    },
    {
      num: '03',
      title: 'Web of Whispers',
      desc: 'Seven lodges from three nations shared one building in Kimberley. Draw the hidden connections between them to reveal the web of trust.',
      how: 'Click and drag from one circle to another to draw a bond between them.',
      tag: 'Connect & Reveal',
      unlocked: completedPuzzles >= 2,
      complete: completedPuzzles >= 3
    }
  ];

  const COMPASS = `<svg class="menu-masonic-icon" viewBox="0 0 80 70" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="40" y1="6" x2="16" y2="62" stroke="#c9a227" stroke-width="2.2" stroke-linecap="round"/>
    <line x1="40" y1="6" x2="64" y2="62" stroke="#c9a227" stroke-width="2.2" stroke-linecap="round"/>
    <path d="M18 50 Q40 43 62 50" stroke="#c9a227" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    <line x1="16" y1="24" x2="16" y2="62" stroke="#8c1f1f" stroke-width="2.2" stroke-linecap="round"/>
    <line x1="16" y1="62" x2="64" y2="62" stroke="#8c1f1f" stroke-width="2.2" stroke-linecap="round"/>
    <circle cx="40" cy="6" r="2.5" fill="#c9a227"/>
  </svg>`;

  const html = `
    <div id="screen-menu">
      <div class="menu-inner">

        <header class="menu-header">
          <div class="menu-masonic-header">
            ${COMPASS}
            <div class="menu-eyebrow">
              <span class="eyebrow-line"></span>
              <span>The Enigma Path</span>
              <span class="eyebrow-line"></span>
            </div>
            ${COMPASS}
          </div>
          <h1>CHOOSE YOUR ENIGMA</h1>
          <p>Three puzzles guard the hidden history of the 1886 Union Masonic Temple. Solve each one to uncover the bonds that built Kimberley's immigrant community.</p>
        </header>

        <div class="menu-progress">
          <div class="progress-label">
            <span>Your Progress</span>
            <span>${Math.min(completedPuzzles, 3)}/3 Solved</span>
          </div>
          <div class="progress-track">
            <div class="progress-fill" style="width:${progressPct}%"></div>
          </div>
        </div>

        <div class="menu-grid">
          ${puzzles.map((p, i) => `
            <div class="menu-card ${p.complete ? 'complete' : ''} ${!p.unlocked ? 'locked' : ''}">
              <div class="card-status">
                ${p.complete
                  ? '<span class="status-badge complete-badge">&#10003; Solved</span>'
                  : p.unlocked
                    ? '<span class="status-badge active-badge">&#9670; Available</span>'
                    : '<span class="status-badge locked-badge">&#128274; Locked</span>'}
              </div>
              <div class="card-num">${p.num}</div>
              <div class="card-title">${p.title}</div>
              <div class="card-tag">${p.tag}</div>
              <div class="card-desc">${p.desc}</div>
              <div class="card-how">
                <span class="card-how-icon">&#9654;</span>
                <span>${p.how}</span>
              </div>
              ${p.unlocked
                ? `<button class="card-play-btn" data-idx="${i}">
                     ${p.complete ? 'Play Again' : 'Begin Enigma'}
                     <span class="btn-arrow">&#8594;</span>
                   </button>`
                : `<div class="card-locked-msg">Complete the previous enigma to unlock.</div>`}
            </div>
          `).join('')}
        </div>

      </div>
    </div>
  `;

  // Write the HTML first — event wiring comes AFTER, with no GSAP in between
  app.innerHTML = html;

  // Wire every play button directly — idx maps to puzzle number
  const starters = [onStartPuzzle1, onStartPuzzle2, onStartPuzzle3];
  document.querySelectorAll('.card-play-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const idx = parseInt(this.dataset.idx, 10);
      if (typeof starters[idx] === 'function') {
        starters[idx]();
      }
    });
  });

  // Animate header + progress only (no GSAP on cards = no opacity:0 risk)
  try {
    gsap.from('.menu-header',  { opacity: 0, y: -24, duration: 0.6, ease: 'power2.out' });
    gsap.from('.menu-progress',{ opacity: 0, y: 16,  duration: 0.5, ease: 'power2.out', delay: 0.15 });
    gsap.from('.menu-card',    { opacity: 0, y: 30,  duration: 0.5, ease: 'power2.out', stagger: 0.1, delay: 0.25 });
  } catch (e) {
    // GSAP unavailable — cards are still fully visible and clickable without animation
  }
}
