export function initPuzzleMenu(app, onStartPuzzle1, onStartPuzzle2, onStartPuzzle3, completedPuzzles = 0, onBack = null) {

  const puzzles = [
    {
      num: '01',
      title: 'Shattered Sanctuary',
      unlocked: true,
      complete: completedPuzzles >= 1
    },
    {
      num: '02',
      title: 'Symbol Cipher',
      unlocked: completedPuzzles >= 1,
      complete: completedPuzzles >= 2
    },
    {
      num: '03',
      title: 'Web of Whispers',
      unlocked: completedPuzzles >= 2,
      complete: completedPuzzles >= 3
    }
  ];

  const html = `
    <div id="screen-menu">

      <header class="lodge-header">
        <button class="lodge-back-btn" id="lodge-back-btn">
          <span class="material-symbols-outlined" style="font-size:18px;line-height:1;vertical-align:middle">arrow_back</span>
          Return
        </button>
        <div class="lodge-title-center">
          <h1>The Lodge</h1>
          <div class="lodge-title-underline"></div>
        </div>
        <div class="lodge-hearts">
          <span class="material-symbols-outlined">favorite</span>
          <span class="material-symbols-outlined">favorite</span>
          <span class="material-symbols-outlined">favorite</span>
        </div>
      </header>

      <main class="lodge-main">

        <div class="initiations-header">
          <div class="ih-line"></div>
          <div class="ih-center">
            <span class="ih-diamond">◆</span>
            <span class="ih-label">Your Initiations</span>
            <span class="ih-diamond">◆</span>
          </div>
          <div class="ih-line"></div>
        </div>

        <div class="initiations-list">
          ${puzzles.map((p, i) => `
            <div class="ic-card ${p.complete ? 'ic-complete' : ''} ${!p.unlocked ? 'ic-locked' : 'ic-available card-play-btn'}" ${p.unlocked ? `data-idx="${i}"` : ''}>
              ${p.unlocked ? '<span class="ic-star-icon material-symbols-outlined">star</span>' : ''}
              <div class="ic-content">
                <span class="ic-num">ENIGMA ${p.num}</span>
                <h3 class="ic-title">${p.title}</h3>
              </div>
              <div class="ic-status-row">
                ${p.complete
                  ? `<span class="material-symbols-outlined ic-status-icon ic-done-icon">check_circle</span><span class="ic-status-text ic-done-text">Solved</span>`
                  : p.unlocked
                    ? `<span class="material-symbols-outlined ic-status-icon ic-play-icon">play_circle</span><span class="ic-status-text shimmer-gold">Available</span>`
                    : `<span class="material-symbols-outlined ic-status-icon ic-lock-icon">lock</span><span class="ic-status-text ic-locked-text">Locked</span>`}
              </div>
              <div class="ic-bottom-bar">
                <div class="ic-bottom-fill" style="width:${p.complete ? '100%' : '0%'}"></div>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="lodge-footer-link" id="archives-link">
          <span class="material-symbols-outlined" style="font-size:14px;vertical-align:middle">menu_book</span>
          Secret Archives
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
      if (typeof starters[idx] === 'function') {
        starters[idx]();
      }
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

  // Secret archives link (wired in main.js via global event)
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

  // Kill any lingering tweens
  try { gsap.killTweensOf(app); } catch (e) {}

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
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.1, delay: 0.25 }
    );
    gsap.fromTo('.lodge-footer-link',
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: 'power2.out', delay: 0.6 }
    );
  } catch (e) {}
}
