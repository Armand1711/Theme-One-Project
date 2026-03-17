import { initPuzzle1 } from './puzzle1.js';

export function initPuzzleMenu(app, onStartPuzzle1, onStartPuzzle2, onStartPuzzle3) {
  const html = `
    <div id="screen-menu" class="screen active">
      <header>
        <h1>HIDDEN BONDS ROUTE</h1>
        <p>Complete each puzzle in order to reveal one continuous bond story through the Union Lodge history.</p>
      </header>

      <div class="menu-stats">
        <div class="menu-chip"><strong>0/4</strong><span>Completed</span></div>
        <div class="menu-chip"><strong>4</strong><span>Story chapters</span></div>
        <div class="menu-chip"><strong>100%</strong><span>Heritage focus</span></div>
      </div>

      <div class="menu-grid">
        <button class="menu-card active" data-puzzle="1">
          <div class="menu-title">01</div>
          <div class="menu-item-title">Rebuild the Union Temple</div>
          <div class="menu-small">Restore 1886 temple structure to reveal the first bond.</div>
        </button>
        <button class="menu-card" data-puzzle="2">
          <div class="menu-title">02</div>
          <div class="menu-item-title">Symbol Match</div>
          <div class="menu-small">Pair lodge symbols with community values.</div>
        </button>
        <button class="menu-card" data-puzzle="3">
          <div class="menu-title">03</div>
          <div class="menu-item-title">Network Graph</div>
          <div class="menu-small">Connect people, trade, and support links.</div>
        </button>
      </div>

      <div class="menu-actions">
        <button id="start-puzzle" class="primary-btn">Start Puzzle</button>
      </div>
    </div>
  `;

  app.innerHTML = html;

  // Animate menu entrance
  gsap.set('#screen-menu header h1', { opacity: 0, y: -30 });
  gsap.set('#screen-menu header p', { opacity: 0, y: -20 });
  gsap.set('.menu-card', { opacity: 0, y: 30, scale: 0.9 });
  gsap.set('.menu-actions', { opacity: 0, y: 20 });

  const tl = gsap.timeline();
  tl.to('#screen-menu header h1', { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
    .to('#screen-menu header p', { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3')
    .to('.menu-card', { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.7)' }, '-=0.2')
    .to('.menu-actions', { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.3');

  const cards = document.querySelectorAll('.menu-card');
  let selected = '1';
  cards.forEach(card => {
    card.addEventListener('click', () => {
      cards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      selected = card.dataset.puzzle;

      // Animate card selection
      gsap.to(card, { scale: 1.05, duration: 0.2, yoyo: true, repeat: 1, ease: 'power2.out' });
    });
  });

  document.getElementById('start-puzzle').addEventListener('click', () => {
    if (selected === '1') {
      onStartPuzzle1();
      return;
    }
    if (selected === '2') {
      onStartPuzzle2?.();
      return;
    }
    if (selected === '3') {
      onStartPuzzle3?.();
      return;
    }
  });
}
