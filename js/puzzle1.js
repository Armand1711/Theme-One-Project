// Masonic compass-and-square SVG for modal header
const MODAL_MASONIC = `<svg class="modal-masonic-svg" viewBox="0 0 80 70" fill="none" xmlns="http://www.w3.org/2000/svg">
  <line x1="40" y1="6" x2="16" y2="62" stroke="#c9a227" stroke-width="2.2" stroke-linecap="round"/>
  <line x1="40" y1="6" x2="64" y2="62" stroke="#c9a227" stroke-width="2.2" stroke-linecap="round"/>
  <path d="M18 50 Q40 43 62 50" stroke="#c9a227" stroke-width="1.8" fill="none" stroke-linecap="round"/>
  <line x1="16" y1="24" x2="16" y2="62" stroke="#8c1f1f" stroke-width="2.2" stroke-linecap="round"/>
  <line x1="16" y1="62" x2="64" y2="62" stroke="#8c1f1f" stroke-width="2.2" stroke-linecap="round"/>
  <circle cx="40" cy="6" r="2.5" fill="#c9a227"/>
</svg>`;

function showCompletionModal({ title, body, clueLabel, clueLines, btnLabel, onContinue }) {
  const modal = document.createElement('div');
  modal.className = 'completion-modal';
  modal.id = 'completion-modal';
  modal.innerHTML = `
    <div class="completion-modal-card">
      <span class="material-symbols-outlined cmc-corner cmc-tl">architecture</span>
      <span class="material-symbols-outlined cmc-corner cmc-tr">architecture</span>
      <div class="cmc-star">✦</div>
      <div class="cmc-badge">
        <div class="cmc-badge-line"></div>
        <span class="cmc-badge-text">ENIGMA SOLVED</span>
        <div class="cmc-badge-line"></div>
      </div>
      <h2 class="cmc-title">${title}</h2>
      <div class="cmc-divider">
        <div class="cmc-divider-line"></div>
        <span class="cmc-divider-diamond">◆</span>
        <div class="cmc-divider-line"></div>
      </div>
      <p class="cmc-body">${body}</p>
      ${clueLines ? `
        <div class="cmc-clue">
          <div class="cmc-clue-label">${clueLabel}</div>
          <div class="cmc-clue-lines">
            ${clueLines.map(l => `
              <div class="cmc-clue-line">
                <span class="cmc-clue-icon">${l.icon}</span>
                <span>${l.text}</span>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}
      <button class="cmc-continue-btn shimmer-btn" id="modal-continue">${btnLabel}</button>
    </div>
  `;
  document.body.appendChild(modal);
  gsap.fromTo(modal, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: 'power2.out' });
  gsap.fromTo('.completion-modal-card',
    { opacity: 0, y: 40, scale: 0.94 },
    { opacity: 1, y: 0, scale: 1, duration: 0.5, delay: 0.1, ease: 'back.out(1.7)' }
  );
  document.getElementById('modal-continue').addEventListener('click', () => {
    gsap.to(modal, { opacity: 0, duration: 0.25, ease: 'power2.in',
      onComplete: () => { modal.remove(); onContinue(); }
    });
  });
}

export function initPuzzle1(container, onBack, onNext) {
  const html = `
    <div id="screen-puzzle1" class="screen active">

      <div class="ptb">
        <div class="ptb-left" id="back-btn">
          <span class="material-symbols-outlined ptb-arrow">arrow_back</span>
          <span class="ptb-back-label">BACK</span>
        </div>
        <div class="ptb-center">
          <p class="ptb-enigma-tag">ENIGMA 01 OF 03</p>
          <h1 class="ptb-title">Shattered Sanctuary</h1>
        </div>
        <div class="ptb-right" id="health-bar">
          <span class="material-symbols-outlined ptb-heart ptb-heart-on">favorite</span>
          <span class="material-symbols-outlined ptb-heart ptb-heart-on">favorite</span>
          <span class="material-symbols-outlined ptb-heart ptb-heart-on">favorite</span>
        </div>
      </div>

      <div class="puzzle-scroll-body">

        <section class="puzzle-intro-strip">
          <p class="pis-tag">PHOTO RECONSTRUCTION</p>
          <p class="pis-quote">&ldquo;Six fragments of the Sanctuary have been scattered across the ritual floor. Restore the image to unlock the path to the inner sanctum.&rdquo;</p>
        </section>

        <div class="puzzle-instr">
          <h4 class="pi-title">INSTRUCTIONS</h4>
          <p class="pi-body">Drag fragments from the left archive and place them into the correct corresponding slots on the right ritual plate.</p>
        </div>

        <div class="masonic-divider">
          <div class="md-line"></div>
          <span class="md-diamonds">◆◆</span>
          <div class="md-line"></div>
        </div>

        <div class="puzzle-panels">
          <div class="pp-col pp-fragments">
            <div class="pp-col-top-accent"></div>
            <h3 class="pp-col-label">
              <span class="material-symbols-outlined pp-col-label-icon">category</span>
              FRAGMENTS
            </h3>
            <div class="puzzle-source grid-3" id="puzzle-source"></div>
          </div>
          <div class="pp-col pp-sanctuary">
            <span class="material-symbols-outlined pp-star-icon">star</span>
            <h3 class="pp-col-label">
              <span class="material-symbols-outlined pp-col-label-icon">museum</span>
              SANCTUARY
            </h3>
            <div class="puzzle-target grid-3 pp-drop-grid" id="puzzle-target">
              <div class="drop-slot" data-slot="1"><span class="slot-diamond">◆</span></div>
              <div class="drop-slot" data-slot="2"><span class="slot-diamond">◆</span></div>
              <div class="drop-slot" data-slot="3"><span class="slot-diamond">◆</span></div>
              <div class="drop-slot" data-slot="4"><span class="slot-diamond">◆</span></div>
              <div class="drop-slot" data-slot="5"><span class="slot-diamond">◆</span></div>
              <div class="drop-slot" data-slot="6"><span class="slot-diamond">◆</span></div>
            </div>
            <div class="pp-submit-wrap">
              <button class="pp-submit-btn">SUBMIT SEAL</button>
            </div>
          </div>
        </div>

      </div>

      <div class="pff" id="feedback">
        <div class="pff-main">
          <span class="material-symbols-outlined pff-icon">emergency_home</span>
          <p class="pff-text" id="feedback-text">The pieces hum with a faint vibration when placed near their true origin&hellip;</p>
        </div>
        <div class="pff-stats">
          <div class="pff-stat">
            <span class="pff-stat-label">PROGRESS</span>
            <span class="pff-stat-val" id="progress-counter">0/6</span>
          </div>
        </div>
      </div>

    </div>
  `;

  container.innerHTML = html;
  window.scrollTo(0, 0);

  // ── Health system ────────────────────────────────────────────────────────────
  let lives = 3;
  const MAX_LIVES = 3;
  let correctStreak = 0;

  function renderHearts() {
    const bar = document.getElementById('health-bar');
    if (!bar) return;
    bar.innerHTML = '';
    for (let i = 1; i <= MAX_LIVES; i++) {
      const h = document.createElement('span');
      h.className = 'material-symbols-outlined ptb-heart' + (i <= lives ? ' ptb-heart-on' : ' ptb-heart-off');
      h.style.fontVariationSettings = i <= lives ? "'FILL' 1" : "'FILL' 0";
      h.textContent = 'favorite';
      bar.appendChild(h);
    }
  }

  function loseLife() {
    if (lives <= 0 || completed) return;
    correctStreak = 0;
    lives--;
    renderHearts();
    gsap.fromTo('#health-bar', { x: -7 }, { x: 0, duration: 0.45, ease: 'elastic.out(1,0.3)' });
    if (lives === 0) setTimeout(handleGameOver, 600);
  }

  function gainLife() {
    if (lives >= MAX_LIVES || completed) return;
    lives++;
    renderHearts();
    const hearts = document.querySelectorAll('.ptb-heart');
    const gained = hearts[lives - 1];
    if (gained) gsap.fromTo(gained, { scale: 0 }, { scale: 1, duration: 0.4, ease: 'back.out(2.5)' });
    document.getElementById('feedback-text').textContent = '+1 life restored — keep going!';
    setTimeout(() => {
      if (!completed) {
        const placed = [...document.querySelectorAll('.drop-slot')].filter(s => s.querySelector('.piece')).length;
        document.getElementById('feedback-text').textContent =
          placed === 0 ? 'Drag each piece into its slot. The image will guide you — look at the edges.'
                       : `${solved} of 6 pieces in the right place. Keep going.`;
      }
    }, 1600);
  }

  function checkStreak() {
    correctStreak++;
    if (correctStreak >= 2 && lives < MAX_LIVES) { correctStreak = 0; gainLife(); }
  }

  function handleGameOver() {
    const overlay = document.createElement('div');
    overlay.className = 'game-over-overlay';
    overlay.innerHTML = `
      <div class="game-over-card">
        <span class="material-symbols-outlined go-flare go-flare-tl">flare</span>
        <span class="material-symbols-outlined go-flare go-flare-tr">flare</span>
        <div class="go-icon-wrap">
          <span class="material-symbols-outlined go-skull">skull</span>
          <div class="go-skull-glow"></div>
        </div>
        <h2 class="go-heading">The chamber goes dark</h2>
        <div class="go-divider">
          <div class="go-divider-line"></div>
          <span class="go-divider-diamond">◆</span>
          <div class="go-divider-line"></div>
        </div>
        <p class="go-body">Your vitality has withered beneath the weight of these ancient corridors. The Great Architect's secrets remain hidden from those who falter.</p>
        <button class="go-try-btn" id="try-again-btn">
          <div class="go-try-border"></div>
          Try Again
        </button>
        <button class="go-return-btn" id="back-to-lodge-btn">Return to the Lodge</button>
      </div>
    `;
    document.body.appendChild(overlay);
    gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.35 });
    gsap.fromTo('.game-over-card', { opacity: 0, scale: 0.85, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 0.45, delay: 0.1, ease: 'back.out(1.7)' });
    document.getElementById('try-again-btn').addEventListener('click', () => {
      overlay.remove();
      initPuzzle1(container, onBack, onNext);
    });
    document.getElementById('back-to-lodge-btn').addEventListener('click', () => {
      overlay.remove();
      if (typeof onBack === 'function') onBack();
    });
  }
  // ────────────────────────────────────────────────────────────────────────────

  gsap.set('.ptb',                { opacity: 0, y: -20 });
  gsap.set('.puzzle-intro-strip', { opacity: 0, y: 16  });
  gsap.set('.puzzle-instr',       { opacity: 0, y: 12  });
  gsap.set('.puzzle-panels',      { opacity: 0, y: 24  });
  gsap.set('#feedback',           { opacity: 0 });

  const tl = gsap.timeline();
  tl.to('.ptb',                { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' })
    .to('.puzzle-intro-strip', { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2')
    .to('.puzzle-instr',       { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.2')
    .to('.puzzle-panels',      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3')
    .to('#feedback',           { opacity: 1, duration: 0.4 }, '-=0.2');

  document.getElementById('back-btn').addEventListener('click', () => {
    if (typeof onBack === 'function') onBack();
  });

  const imageUrl = 'assets/PT-Masonic_Temple-1888.jpg';

  // 6-piece jigsaw: 3 columns × 2 rows
  const pieceDefs = [
    { id: 1, x: '0%',   y: '0%'   },
    { id: 2, x: '50%',  y: '0%'   },
    { id: 3, x: '100%', y: '0%'   },
    { id: 4, x: '0%',   y: '100%' },
    { id: 5, x: '50%',  y: '100%' },
    { id: 6, x: '100%', y: '100%' }
  ];

  const source   = document.getElementById('puzzle-source');
  const shuffled = [...pieceDefs].sort(() => Math.random() - 0.5);
  const pieceEls = [];

  // Create fixed holder cells first so the grid never reflows when pieces leave
  pieceDefs.forEach(def => {
    const holder = document.createElement('div');
    holder.className = 'source-holder';
    holder.dataset.holderId = def.id;
    source.appendChild(holder);
  });

  function sendBackToSource(piece) {
    const holder = source.querySelector(`.source-holder[data-holder-id="${piece.dataset.value}"]`);
    if (holder) holder.appendChild(piece);
  }

  shuffled.forEach((pieceMeta, index) => {
    const piece = document.createElement('div');
    piece.className = 'piece';
    piece.draggable = true;
    piece.dataset.value = pieceMeta.id;
    piece.style.backgroundImage    = `url(${imageUrl})`;
    piece.style.backgroundSize     = '300% 200%';
    piece.style.backgroundPosition = `${pieceMeta.x} ${pieceMeta.y}`;

    sendBackToSource(piece);
    pieceEls.push(piece);

    gsap.set(piece, { opacity: 0, scale: 0.6, rotation: Math.random() * 14 - 7 });
    gsap.to(piece, {
      opacity: 1, scale: 1, rotation: 0,
      duration: 0.5, delay: index * 0.08, ease: 'back.out(1.7)'
    });

    piece.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', pieceMeta.id.toString());
      e.dataTransfer.effectAllowed = 'move';
      piece.classList.add('dragging');
    });
    piece.addEventListener('dragend', () => piece.classList.remove('dragging'));
  });

  const solution = { '1': '1', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6' };
  let solved    = 0;
  let completed = false;
  const slots   = document.querySelectorAll('.drop-slot');

  function recalcSlots() {
    solved = 0;
    slots.forEach(s => {
      const child = s.querySelector('.piece');
      if (child && solution[s.dataset.slot] === child.dataset.value) {
        solved++;
        s.classList.add('correct');
        s.classList.remove('wrong');
      } else if (child) {
        s.classList.add('wrong');
        s.classList.remove('correct');
      } else {
        s.classList.remove('correct', 'wrong');
      }
    });

    const placed = [...slots].filter(s => s.querySelector('.piece')).length;
    const counter = document.getElementById('progress-counter');
    if (counter) counter.textContent = `${solved}/6`;

    if (solved < slots.length) {
      document.getElementById('feedback-text').textContent =
        placed === 0
          ? 'Drag each piece into its slot. The image will guide you — look at the edges.'
          : `${solved} of 6 pieces in the right place. Keep going.`;
    }

    if (solved === slots.length) handleComplete();
  }

  function returnToSource(piece) {
    if (completed) return;
    sendBackToSource(piece);
    gsap.fromTo(piece, { scale: 0.85 }, { scale: 1, duration: 0.25, ease: 'back.out(1.7)' });
    recalcSlots();
  }

  function handleSlotDrop(piece, slot) {
    if (completed) return;
    slot.classList.remove('drag-over');

    const existing = slot.querySelector('.piece');
    if (existing) sendBackToSource(existing);

    slot.appendChild(piece);
    gsap.fromTo(piece, { scale: 0.85 }, { scale: 1, duration: 0.3, ease: 'back.out(1.7)' });
    recalcSlots();

    if (slot.classList.contains('correct')) checkStreak();
    else if (slot.classList.contains('wrong')) loseLife();
  }

  slots.forEach(slot => {
    slot.addEventListener('dragover', (e) => {
      e.preventDefault();
      if (!slot.querySelector('.piece')) slot.classList.add('drag-over');
    });
    slot.addEventListener('dragleave', () => slot.classList.remove('drag-over'));
    slot.addEventListener('drop', (e) => {
      e.preventDefault();
      if (completed) return;
      const dragged = e.dataTransfer.getData('text/plain');
      if (!dragged) return;
      const piece = document.querySelector(`.piece[data-value='${dragged}']`);
      if (!piece) return;
      handleSlotDrop(piece, slot);
    });
  });

  // Submit button
  const submitBtn = document.querySelector('.pp-submit-btn');
  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      if (completed) return;
      const placed = [...slots].filter(s => s.querySelector('.piece')).length;
      if (placed < slots.length) {
        document.getElementById('feedback-text').textContent =
          `Place all 6 pieces before submitting. ${placed}/6 placed so far.`;
        gsap.fromTo('#feedback', { x: -6 }, { x: 0, duration: 0.4, ease: 'elastic.out(1,0.3)' });
        return;
      }
      recalcSlots();
    });
  }

  // Allow dropping pieces back onto the source panel
  source.addEventListener('dragover', (e) => { e.preventDefault(); });
  source.addEventListener('drop', (e) => {
    e.preventDefault();
    if (completed) return;
    const dragged = e.dataTransfer.getData('text/plain');
    if (!dragged) return;
    const piece = document.querySelector(`.piece[data-value='${dragged}']`);
    if (!piece || !piece.closest('.drop-slot')) return;
    returnToSource(piece);
  });

  // Touch drag support for mobile
  pieceEls.forEach(piece => {
    let clone   = null;
    let offsetX = 0, offsetY = 0;

    piece.addEventListener('touchstart', (e) => {
      if (completed) return;
      e.preventDefault();
      const touch = e.touches[0];
      const rect  = piece.getBoundingClientRect();
      offsetX = touch.clientX - rect.left;
      offsetY = touch.clientY - rect.top;

      clone = piece.cloneNode(true);
      Object.assign(clone.style, {
        position: 'fixed', left: rect.left + 'px', top: rect.top + 'px',
        width: rect.width + 'px', height: rect.height + 'px',
        opacity: '0.85', pointerEvents: 'none', zIndex: '9999',
        margin: '0', transform: 'none', transition: 'none'
      });
      document.body.appendChild(clone);
      piece.classList.add('dragging');
    }, { passive: false });

    piece.addEventListener('touchmove', (e) => {
      if (!clone) return;
      e.preventDefault();
      const touch = e.touches[0];
      clone.style.left = (touch.clientX - offsetX) + 'px';
      clone.style.top  = (touch.clientY - offsetY) + 'px';
    }, { passive: false });

    piece.addEventListener('touchend', (e) => {
      if (!clone) return;
      const touch = e.changedTouches[0];
      clone.remove(); clone = null;
      piece.classList.remove('dragging');
      piece.style.visibility = 'hidden';
      const el = document.elementFromPoint(touch.clientX, touch.clientY);
      piece.style.visibility = '';
      if (!el) return;
      const slot = el.closest('.drop-slot');
      if (slot) {
        handleSlotDrop(piece, slot);
      } else if (el.closest('#puzzle-source') && piece.closest('.drop-slot')) {
        returnToSource(piece);
      }
    }, { passive: false });
  });

  function handleComplete() {
    completed = true;

    // Flash all correct slots gold
    gsap.to('.drop-slot.correct', {
      scale: 1.04, duration: 0.3, yoyo: true, repeat: 1, stagger: 0.06
    });

    // Update inline feedback
    document.getElementById('feedback-text').textContent = 'All 6 pieces placed — the sanctuary stands whole!';

    const clue = {
      title: "The Sanctuary's Inscription",
      lines: [
        { icon: '🤝', text: 'The clasped hand seals <em>The Silent Oath</em>' },
        { icon: '🔗', text: 'The unbroken chain weaves <em>Shared Prosperity</em>' },
        { icon: '🌉', text: 'The arched bridge spans the <em>Cultural Bridge</em>' },
        { icon: '🕯️', text: 'The undying flame guards the <em>Enduring Legacy</em>' }
      ]
    };

    setTimeout(() => {
      showCompletionModal({
        title: 'The Sanctuary Stands Whole',
        body: "You've uncovered the first hidden bond: the silent pact of mutual aid. Seven lodges from three nations pooled their resources to raise this Roman Corinthian building on Dutoitspan Road — a covenant forged in the diamond fields.",
        clueLabel: '&#128269; Clue Unlocked — carry this into the next enigma',
        clueLines: clue.lines,
        btnLabel: 'Continue to Symbol Cipher',
        onContinue: () => {
          if (typeof onNext === 'function') onNext(clue);
        }
      });
    }, 600);
  }
}
