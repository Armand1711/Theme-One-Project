import {
  SVG_FLAME,
  SVG_COMPASS_MARK,
  SVG_RADIANT_DELTA,
  SVG_WAX_SEAL,
  SVG_SYM_CHAIN,
  SVG_SYM_BRIDGE,
  SVG_SYM_CANDLE,
  SVG_SYM_HANDS
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

function showCluePopup(clue) {
  if (!clue) return;
  const overlay = document.createElement('div');
  overlay.className = 'cpp-overlay';
  overlay.innerHTML = `
    <div class="cpp-card">
      <div class="cpp-header">
        <div>
          <div class="cpp-title">HINT FROM THE ARCHIVIST</div>
          <div class="cpp-title-underline"></div>
        </div>
        <button class="cpp-close" id="clue-popup-close">&#215;</button>
      </div>
      <div class="cpp-body">
        ${clue.lines.map(l => `
          <div class="cpp-line">
            <span class="cpp-line-icon">${l.icon}</span>
            <span>${l.text}</span>
          </div>
        `).join('')}
      </div>
      <button class="cpp-dismiss" id="clue-popup-dismiss">GOT IT, BACK TO THE PUZZLE</button>
      <div class="cpp-ornament">
        <div class="cpp-ornament-line"></div>
        <span class="cpp-ornament-diamond">◆</span>
        <div class="cpp-ornament-line"></div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' });
  gsap.fromTo('.cpp-card',
    { opacity: 0, y: 30, scale: 0.95 },
    { opacity: 1, y: 0, scale: 1, duration: 0.4, delay: 0.05, ease: 'back.out(1.7)' }
  );
  function closePopup() {
    gsap.to(overlay, { opacity: 0, duration: 0.25, ease: 'power2.in',
      onComplete: () => overlay.remove() });
  }
  document.getElementById('clue-popup-close').addEventListener('click', closePopup);
  document.getElementById('clue-popup-dismiss').addEventListener('click', closePopup);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closePopup(); });
}

export function initPuzzle2(container, clue, onBack, onNext) {
  const html = `
    <div id="screen-puzzle2" class="screen active">

      <div class="ptb">
        <div class="ptb-left" id="back-btn">
          ${SVG_COMPASS_MARK}
          <span class="ptb-back-label">BACK</span>
        </div>
        <div class="ptb-center">
          <p class="ptb-enigma-tag">ENIGMA II OF III</p>
          <h1 class="ptb-title">Symbol Cipher</h1>
        </div>
        <div class="ptb-right">
          ${clue ? `<button class="ptb-hint-btn" id="clue-btn" title="Get a hint from the Archivist"><span class="material-symbols-outlined">lightbulb</span><span class="ptb-hint-label">Need a hint?</span></button>` : ''}
          <div class="ptb-hearts" id="health-bar">
            ${renderFlames(3)}
          </div>
        </div>
      </div>

      <div class="puzzle-scroll-body">

        <section class="puzzle-intro-strip">
          <p class="pis-tag">MATCH SYMBOLS TO MEANINGS</p>
          <p class="pis-quote">Four Masonic symbols. Four meanings. Drag each symbol onto the meaning you think fits best.</p>
        </section>

        <div class="puzzle-instr">
          <h4 class="pi-title">HOW TO PLAY</h4>
          <p class="pi-body"><strong>Drag</strong> a stone tile from the left over to a meaning on the right. <strong>Get it right</strong> and the slot lights up gold. <strong>Get it wrong</strong> and you lose a life, but you keep three lives, and stuck players can tap the red <strong>"Need a hint?"</strong> button up top.</p>
        </div>

        <div class="masonic-divider">
          <div class="md-line"></div>
          <span class="md-diamonds">◆◆</span>
          <div class="md-line"></div>
        </div>

        <!-- Manuscript folio header -->
        <div class="plate-header folio-header">
          <div class="plate-header-corner ph-tl"></div>
          <div class="plate-header-corner ph-tr"></div>
          <div class="plate-header-inner">
            <span class="plate-tag">FOLIO II</span>
            <span class="plate-divider">·</span>
            <span class="plate-title">THE BOOK OF SYMBOLS</span>
            <span class="plate-divider">·</span>
            <span class="plate-meta">FOUR EMBLEMS &middot; FOUR BONDS</span>
          </div>
        </div>

        <div class="puzzle-panels">
          <div class="pp-col pp-fragments">
            <div class="pp-col-top-accent"></div>
            <h3 class="pp-col-label">
              <span class="pp-col-label-dot">◆</span>
              SYMBOLS
            </h3>
            <div class="puzzle-source" id="symbol-source"></div>
          </div>
          <div class="pp-col pp-sanctuary">
            <span class="pp-corner-bl"></span>
            <span class="pp-corner-br"></span>
            <h3 class="pp-col-label">
              <span class="pp-col-label-dot">◆</span>
              MEANINGS
            </h3>
            <div class="puzzle-target pp-drop-grid pp-drop-grid--4" id="symbol-target">
              <div class="drop-slot manuscript-slot" data-slot="1">
                <span class="ms-initial">S</span>
                <span class="slot-label">The Silent Oath</span>
                <span class="slot-sublabel">A solemn promise made between brothers, binding them to loyalty and secrecy</span>
              </div>
              <div class="drop-slot manuscript-slot" data-slot="2">
                <span class="ms-initial">P</span>
                <span class="slot-label">Shared Prosperity</span>
                <span class="slot-sublabel">Members support each other in business and hardship — what benefits one benefits all</span>
              </div>
              <div class="drop-slot manuscript-slot" data-slot="3">
                <span class="ms-initial">C</span>
                <span class="slot-label">Cultural Bridge</span>
                <span class="slot-sublabel">A bond that crosses language and nationality, allowing men from different countries to work as one</span>
              </div>
              <div class="drop-slot manuscript-slot" data-slot="4">
                <span class="ms-initial">L</span>
                <span class="slot-label">Enduring Legacy</span>
                <span class="slot-sublabel">A tradition passed from generation to generation, keeping the brotherhood alive across centuries</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div class="pff" id="feedback">
        <div class="pff-main">
          <span class="material-symbols-outlined pff-icon">emergency_home</span>
          <p class="pff-text" id="feedback-text">Drag each symbol onto the meaning that fits. <strong>3 lives</strong>, and you can tap the red <em>Need a hint?</em> button if you get stuck.</p>
        </div>
      </div>

    </div>
  `;

  container.innerHTML = html;
  window.scrollTo(0, 0);

  if (clue) {
    document.getElementById('clue-btn')?.addEventListener('click', () => showCluePopup(clue));
  }

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
    document.getElementById('feedback-text').textContent = '+1 life restored, keep decoding!';
    setTimeout(() => {
      if (!completed) {
        const placed = [...document.querySelectorAll('.drop-slot')].filter(s => s.querySelector('.piece')).length;
        document.getElementById('feedback-text').textContent =
          placed === 0 ? 'Drag each symbol to its meaning. Use the hint button if you need help.'
                       : `${solved} of 4 symbols correctly matched. Keep going.`;
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
        <div class="go-icon-wrap go-eye-wrap">${SVG_RADIANT_DELTA}</div>
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
      initPuzzle2(container, clue, onBack, onNext);
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

  const source = document.getElementById('symbol-source');

  const symbols = [
    { id: 1, svgIcon: SVG_SYM_CHAIN,  label: 'Chain of Unity'     },
    { id: 2, svgIcon: SVG_SYM_BRIDGE, label: 'Bridge of Cultures' },
    { id: 3, svgIcon: SVG_SYM_CANDLE, label: 'Light of Tradition' },
    { id: 4, svgIcon: SVG_SYM_HANDS,  label: 'Hands of Alliance'  }
  ];

  const shuffled = [...symbols].sort(() => Math.random() - 0.5);
  const pieceEls = [];

  shuffled.forEach((sym, index) => {
    const el = document.createElement('div');
    el.className = 'piece symbol-piece';
    el.draggable = true;
    el.dataset.value = sym.id;
    const romanNumerals = ['', 'I', 'II', 'III', 'IV'];
    el.innerHTML = `
      <span class="symbol-seal">${romanNumerals[sym.id]}</span>
      <div class="symbol-icon">${sym.svgIcon}</div>
      <div class="symbol-label">${sym.label}</div>
    `;
    source.appendChild(el);
    pieceEls.push(el);

    gsap.set(el, { opacity: 0, scale: 0.6, y: 20 });
    gsap.to(el, { opacity: 1, scale: 1, y: 0, duration: 0.5, delay: index * 0.1, ease: 'back.out(1.7)' });

    el.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', sym.id.toString());
      e.dataTransfer.effectAllowed = 'move';
      el.classList.add('dragging');
    });
    el.addEventListener('dragend', () => el.classList.remove('dragging'));
  });

  // Solution:
  // Slot 1 "The Silent Oath"   → id 4 Hands of Alliance  (handshake = oath)
  // Slot 2 "Shared Prosperity" → id 1 Chain of Unity      (chain = linked effort)
  // Slot 3 "Cultural Bridge"   → id 2 Bridge of Cultures  (direct match)
  // Slot 4 "Enduring Legacy"   → id 3 Light of Tradition  (flame = memory)
  const solution = { '1': '4', '2': '1', '3': '2', '4': '3' };

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
    if (solved < slots.length) {
      document.getElementById('feedback-text').textContent =
        placed === 0
          ? 'Drag each symbol to its meaning. Use the hint button if you need help.'
          : `${solved} of 4 symbols correctly matched. Keep going.`;
    }

    if (solved === slots.length) handleComplete();
  }

  function returnToSource(piece) {
    if (completed) return;
    source.appendChild(piece);
    gsap.fromTo(piece, { scale: 0.85 }, { scale: 1, duration: 0.25, ease: 'back.out(1.7)' });
    recalcSlots();
  }

  function handleSlotDrop(piece, slot) {
    if (completed) return;
    slot.classList.remove('drag-over');

    const existing = slot.querySelector('.piece');
    if (existing) source.appendChild(existing);

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

  // Touch drag support
  pieceEls.forEach(piece => {
    let clone = null;
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
      } else if (el.closest('#symbol-source') && piece.closest('.drop-slot')) {
        returnToSource(piece);
      }
    }, { passive: false });
  });

  function handleComplete() {
    completed = true;

    gsap.to('.drop-slot.correct', {
      scale: 1.04, duration: 0.3, yoyo: true, repeat: 1, stagger: 0.08
    });

    document.getElementById('feedback-text').textContent = 'All 4 symbols matched. The cipher is broken.';

    const nextClue = {
      title: 'Six historical connections',
      lines: [
        { icon: '⬡', text: 'Union Temple ↔ <em>English Craft</em>' },
        { icon: '⬡', text: 'Union Temple ↔ <em>Scottish Chapter</em>' },
        { icon: '⬡', text: 'Union Temple ↔ <em>Dutch Brethren</em>' },
        { icon: '⬡', text: 'English Craft ↔ <em>Diamond Traders</em>' },
        { icon: '⬡', text: 'Diamond Traders ↔ <em>Dutch Brethren</em>' },
        { icon: '⬡', text: 'Dutch Brethren ↔ <em>Scottish Chapter</em>' }
      ]
    };

    setTimeout(() => {
      showCompletionModal({
        title: 'Symbols Decoded',
        body: "The chain, the bridge, the candle, and the clasped hands. These four symbols were the shared language that bridged Scottish, Dutch, and English Masons in 1886. They couldn't always speak the same words, but they recognized the same emblems.",
        clueLabel: '&#128279; Six real connections to draw in Puzzle 3',
        clueLines: nextClue.lines,
        btnLabel: 'Continue to Puzzle 3',
        onContinue: () => {
          if (typeof onNext === 'function') onNext(nextClue);
        }
      });
    }, 600);
  }
}
