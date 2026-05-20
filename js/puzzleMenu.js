import {
  SVG_LOCK,
  SVG_SEAL_BROKEN,
  SVG_HANGING_PENDANT,
  SVG_COMPASS_MARK,
  SVG_FLAME
} from './svg-library.js';

export function initPuzzleMenu(app, onStartPuzzle1, onStartPuzzle2, onStartPuzzle3, completedPuzzles = 0, onBack = null) {

  const puzzles = [
    { num: 'I',   romanFull: 'PUZZLE I',   title: 'Rebuild the Photo',   subtitle: 'Drag 6 pieces back together', unlocked: true, complete: completedPuzzles >= 1 },
    { num: 'II',  romanFull: 'PUZZLE II',  title: 'Match the Symbols',   subtitle: 'Pair 4 emblems with meanings', unlocked: completedPuzzles >= 1, complete: completedPuzzles >= 2 },
    { num: 'III', romanFull: 'PUZZLE III', title: 'Draw the Connections', subtitle: 'Find 6 real bonds between lodges', unlocked: completedPuzzles >= 2, complete: completedPuzzles >= 3 }
  ];

  const html = `
    <div id="screen-menu">

      <header class="lodge-header">
        <button class="lodge-back-btn" id="lodge-back-btn">
          ${SVG_COMPASS_MARK}
          <span>Return</span>
        </button>
        <div class="lodge-title-center">
          <h1>The Lodge</h1>
          <div class="lodge-title-underline"></div>
        </div>
        <div class="lodge-hearts">
          ${SVG_FLAME(true)}${SVG_FLAME(true)}${SVG_FLAME(true)}
        </div>
      </header>

      <main class="lodge-main">

        <div class="initiations-header">
          <div class="ih-line"></div>
          <div class="ih-center">
            <span class="ih-diamond">◆</span>
            <span class="ih-label">Choose a Puzzle</span>
            <span class="ih-diamond">◆</span>
          </div>
          <div class="ih-line"></div>
        </div>

        <div class="initiations-list">
          ${puzzles.map((p, i) => `
            <div class="ic-card ${p.complete ? 'ic-complete' : ''} ${!p.unlocked ? 'ic-locked' : 'ic-available card-play-btn'}" ${p.unlocked ? `data-idx="${i}"` : ''}>
              <div class="ic-cursor-glow"></div>
              <div class="ic-ribbon-seal"></div>
              <div class="ic-tab">${p.romanFull}</div>

              ${!p.unlocked ? `<div class="ic-lock-svg">${SVG_LOCK}</div>` : ''}
              ${p.complete ? `<div class="ic-seal-broken">${SVG_SEAL_BROKEN}</div>` : ''}

              <div class="ic-content">
                <span class="ic-num">No. ${String(i + 1).padStart(2, '0')}</span>
                <h3 class="ic-title">${p.title}</h3>
                <p class="ic-subtitle">${p.subtitle}</p>
              </div>

              <div class="ic-status-row">
                ${p.complete
                  ? `<span class="ic-status-text ic-done-text">&#10003; &nbsp; Completed</span>`
                  : p.unlocked
                    ? `<span class="ic-status-text shimmer-gold">Ready &mdash; Click to Play</span>`
                    : `<span class="ic-status-text ic-locked-text">Complete the previous puzzle first</span>`}
              </div>

              <div class="ic-bottom-bar">
                <div class="ic-bottom-fill" style="width:${p.complete ? '100%' : '0%'}"></div>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="lodge-footer-link" id="archives-link" title="Open the Secret Archives">
          <div class="pendant-svg">${SVG_HANGING_PENDANT}</div>
          <span class="pendant-label">Open the Secret Archives</span>
        </div>

      </main>
    </div>
  `;

  app.innerHTML = html;
  window.scrollTo(0, 0);

  // Wire puzzle play buttons
  const starters = [onStartPuzzle1, onStartPuzzle2, onStartPuzzle3];
  document.querySelectorAll('.card-play-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const idx = parseInt(this.dataset.idx, 10);
      if (typeof starters[idx] === 'function') starters[idx]();
    });
  });

  // Cursor-tracked gold glow on cards
  document.querySelectorAll('.ic-card.ic-available').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const mx = ((e.clientX - r.left) / r.width) * 100;
      const my = ((e.clientY - r.top) / r.height) * 100;
      card.style.setProperty('--mx', `${mx}%`);
      card.style.setProperty('--my', `${my}%`);
    });
  });

  // Back button
  const backBtn = document.getElementById('lodge-back-btn');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      if (typeof onBack === 'function') {
        gsap.to('#screen-menu', {
          opacity: 0, duration: 0.4, ease: 'power2.in',
          onComplete: () => onBack()
        });
      }
    });
  }

  // Secret archives link
  const archivesLink = document.getElementById('archives-link');
  if (archivesLink) {
    archivesLink.addEventListener('click', () => {
      if (typeof window.__openArchives === 'function') {
        gsap.to('#screen-menu', {
          opacity: 0, duration: 0.35, ease: 'power2.in',
          onComplete: () => window.__openArchives()
        });
      }
    });
  }

  try { gsap.killTweensOf(app); } catch (e) {}

  // Entrance animations
  try {
    gsap.fromTo('.lodge-header',
      { opacity: 0, y: -24 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    );
    gsap.fromTo('.initiations-header',
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', delay: 0.15 }
    );
    gsap.fromTo('.ic-card',
      { opacity: 0, y: 60, scale: 0.93 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.12, ease: 'back.out(1.4)', delay: 0.25 }
    );
    gsap.fromTo('.lodge-footer-link',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.6 }
    );
  } catch (e) {}
}
