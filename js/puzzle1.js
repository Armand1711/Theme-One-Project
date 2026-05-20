import {
  SVG_FLAME,
  SVG_COMPASS_MARK,
  SVG_RADIANT_DELTA,
  SVG_WAX_SEAL,
  SVG_SQUARE_COMPASS,
  SVG_CORNER_FLOURISH
} from './svg-library.js';

function renderFlames(lives, max = 3) {
  const out = [];
  for (let i = 1; i <= max; i++) out.push(SVG_FLAME(i <= lives));
  return out.join('');
}

function showCompletionModal({ title, body, clueLabel, clueLines, btnLabel, onContinue }) {
  const modal = document.createElement('div');
  modal.className = 'completion-modal';
  modal.id = 'completion-modal';
  modal.innerHTML = `
    <div class="completion-modal-card">
      <div class="cmc-seal">${SVG_WAX_SEAL}</div>
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
    { opacity: 0, clipPath: 'inset(50% 0 50% 0)' },
    { opacity: 1, clipPath: 'inset(0% 0 0% 0)', duration: 0.7, delay: 0.15, ease: 'power2.out' }
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
          ${SVG_COMPASS_MARK}
          <span class="ptb-back-label">BACK</span>
        </div>
        <div class="ptb-center">
          <p class="ptb-enigma-tag">ENIGMA I OF III</p>
          <h1 class="ptb-title">Shattered Sanctuary</h1>
        </div>
        <div class="ptb-right" id="health-bar">
          ${renderFlames(3)}
        </div>
      </div>

      <div class="puzzle-scroll-body">

        <section class="puzzle-intro-strip">
          <p class="pis-tag">REBUILD THE PHOTO</p>
          <p class="pis-quote">Six pieces of the 1886 Union Masonic Temple, scattered. Drag them back into place to see what the building looked like.</p>
        </section>

        <div class="puzzle-instr">
          <h4 class="pi-title">HOW TO PLAY</h4>
          <p class="pi-body"><strong>Drag</strong> each photo fragment from the left into the right slot on the grid. <strong>Watch the edges</strong>, they line up like a real jigsaw. <strong>You have three lives</strong>, every wrong placement costs one. The gold flame icons in the top right show how many lives you have left.</p>
        </div>

        <div class="masonic-divider">
          <div class="md-line"></div>
          <span class="md-diamonds">◆◆</span>
          <div class="md-line"></div>
        </div>

        <!-- Architectural plate header -->
        <div class="plate-header">
          <div class="plate-header-corner ph-tl"></div>
          <div class="plate-header-corner ph-tr"></div>
          <div class="plate-header-inner">
            <span class="plate-tag">PLATE I</span>
            <span class="plate-divider">·</span>
            <span class="plate-title">UNION TEMPLE, EXTERIOR ELEVATION</span>
            <span class="plate-divider">·</span>
            <span class="plate-meta">DUTOITSPAN ROAD, 1888</span>
          </div>
        </div>

        <div class="puzzle-panels">
          <div class="pp-col pp-fragments">
            <div class="pp-col-top-accent"></div>
            <h3 class="pp-col-label">
              <span class="pp-col-label-dot">◆</span>
              FRAGMENTS
            </h3>
            <div class="puzzle-source grid-3" id="puzzle-source"></div>
          </div>
          <div class="pp-col pp-sanctuary">
            <span class="pp-corner-bl"></span>
            <span class="pp-corner-br"></span>
            <h3 class="pp-col-label">
              <span class="pp-col-label-dot">◆</span>
              SANCTUARY
            </h3>
            <div class="puzzle-target grid-3 pp-drop-grid" id="puzzle-target">
              <div class="drop-slot" data-slot="1"><span class="slot-pos-marker">I</span><span class="slot-diamond">◆</span></div>
              <div class="drop-slot" data-slot="2"><span class="slot-pos-marker">II</span><span class="slot-diamond">◆</span></div>
              <div class="drop-slot" data-slot="3"><span class="slot-pos-marker">III</span><span class="slot-diamond">◆</span></div>
              <div class="drop-slot" data-slot="4"><span class="slot-pos-marker">IV</span><span class="slot-diamond">◆</span></div>
              <div class="drop-slot" data-slot="5"><span class="slot-pos-marker">V</span><span class="slot-diamond">◆</span></div>
              <div class="drop-slot" data-slot="6"><span class="slot-pos-marker">VI</span><span class="slot-diamond">◆</span></div>
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
          <p class="pff-text" id="feedback-text">Drag the photo pieces from the left into the right grid. You have <strong>3 lives</strong>, every wrong placement costs one.</p>
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
    bar.innerHTML = renderFlames(lives, MAX_LIVES);
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
    gsap.fromTo('#health-bar .svg-flame', { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, stagger: 0.08, ease: 'back.out(2.5)' });
    document.getElementById('feedback-text').textContent = '+1 life restored, keep going!';
    setTimeout(() => {
      if (!completed) {
        const placed = [...document.querySelectorAll('.drop-slot')].filter(s => s.querySelector('.piece')).length;
        document.getElementById('feedback-text').textContent =
          placed === 0 ? 'Drag each piece into its slot. The image will guide you, look at the edges.'
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
        <div class="go-icon-wrap go-eye-wrap">
          ${SVG_RADIANT_DELTA}
        </div>
        <h2 class="go-heading">Out of Lives</h2>
        <div class="go-divider">
          <div class="go-divider-line"></div>
          <span class="go-divider-diamond">&#9670;</span>
          <div class="go-divider-line"></div>
        </div>
        <p class="go-body">You used all three lives. The puzzle resets — try again from the beginning.</p>
        <button class="go-try-btn" id="try-again-btn">Try Again</button>
        <button class="go-return-btn" id="back-to-lodge-btn">Return to the Lodge</button>
      </div>
    `;
    document.body.appendChild(overlay);
    gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.35 });
    gsap.fromTo('.game-over-card', { y: '-100%', opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, delay: 0.05, ease: 'power3.out' });
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

  // Create holder cells in random order so visual positions differ each game
  [...pieceDefs].sort(() => Math.random() - 0.5).forEach(def => {
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
          ? 'Drag each piece into its slot. The image will guide you, look at the edges.'
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
    document.getElementById('feedback-text').textContent = 'All 6 pieces placed. The temple is whole.';

    const clue = {
      title: "What the symbols mean",
      lines: [
        { icon: '🤝', text: 'The clasped hand = <em>The Silent Oath</em>' },
        { icon: '🔗', text: 'The chain = <em>Shared Prosperity</em>' },
        { icon: '🌉', text: 'The bridge = <em>Cultural Bridge</em>' },
        { icon: '🕯️', text: 'The flame = <em>Enduring Legacy</em>' }
      ]
    };

    setTimeout(() => {
      showCompletionModal({
        title: 'The Temple Rises Again',
        body: "You rebuilt the 1888 photograph of the Union Masonic Temple at 126-128 Dutoitspan Road in Kimberley. Seven Masonic groups from English, Scottish, and Dutch backgrounds pooled their money to raise this building. It became the first place in town where all three communities worked side by side.",
        clueLabel: '&#128269; You unlocked these clues. They help in the next puzzle.',
        clueLines: clue.lines,
        btnLabel: 'Continue to Puzzle 2',
        onContinue: () => {
          if (typeof onNext === 'function') onNext(clue);
        }
      });
    }, 600);
  }
}
