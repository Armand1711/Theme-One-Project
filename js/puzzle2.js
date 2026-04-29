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
      <div class="modal-masonic-row">${MODAL_MASONIC}</div>
      <div class="modal-solved-badge">&#10022; Solved &#10022;</div>
      <h2 class="modal-title">${title}</h2>
      <p class="modal-body">${body}</p>
      ${clueLines ? `
        <div class="modal-clue">
          <div class="modal-clue-label">${clueLabel}</div>
          <div class="modal-clue-lines">
            ${clueLines.map(l => `
              <div class="modal-clue-line">
                <span class="modal-clue-icon">${l.icon}</span>
                <span>${l.text}</span>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}
      <button class="modal-continue-btn" id="modal-continue">
        ${btnLabel} <span class="btn-arrow">&#8594;</span>
      </button>
    </div>
  `;
  document.body.appendChild(modal);

  gsap.fromTo(modal,
    { opacity: 0 },
    { opacity: 1, duration: 0.35, ease: 'power2.out' }
  );
  gsap.fromTo('.completion-modal-card',
    { opacity: 0, y: 40, scale: 0.94 },
    { opacity: 1, y: 0, scale: 1, duration: 0.5, delay: 0.1, ease: 'back.out(1.7)' }
  );

  document.getElementById('modal-continue').addEventListener('click', () => {
    gsap.to(modal, {
      opacity: 0, duration: 0.25, ease: 'power2.in',
      onComplete: () => { modal.remove(); onContinue(); }
    });
  });
}

function buildCluePanel(clue, sourceLabel) {
  if (!clue) return '';
  return `
    <div class="clue-panel" id="clue-panel">
      <button class="clue-toggle" id="clue-toggle">
        <span class="clue-toggle-icon">&#128269;</span>
        <span>Clue from ${sourceLabel}</span>
        <span class="clue-chevron" id="clue-chevron">&#9660;</span>
      </button>
      <div class="clue-body" id="clue-body">
        <div class="clue-title">${clue.title}</div>
        ${clue.lines.map(l => `
          <div class="clue-line">
            <span class="clue-icon">${l.icon}</span>
            <span>${l.text}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function attachClueToggle() {
  const toggle = document.getElementById('clue-toggle');
  if (!toggle) return;
  const body = document.getElementById('clue-body');
  const chevron = document.getElementById('clue-chevron');
  let open = false;
  body.style.display = 'none';
  toggle.addEventListener('click', () => {
    open = !open;
    body.style.display = open ? 'block' : 'none';
    chevron.innerHTML = open ? '&#9650;' : '&#9660;';
    if (open) gsap.fromTo(body, { opacity: 0, y: -8 }, { opacity: 1, y: 0, duration: 0.3 });
  });
}

export function initPuzzle2(container, clue, onBack, onNext) {
  const html = `
    <div id="screen-puzzle2" class="screen active">
      <div class="puzzle-header">
        <button class="back-btn" id="back-btn">&#8592; Back</button>
        <div class="puzzle-header-center">
          <div class="puzzle-step">Enigma 02 of 03</div>
          <h1>Symbol Cipher</h1>
        </div>
        <div class="puzzle-header-right">
          <div class="health-bar" id="health-bar">
            <span class="heart active">&#9829;</span>
            <span class="heart active">&#9829;</span>
            <span class="heart active">&#9829;</span>
          </div>
        </div>
      </div>

      ${buildCluePanel(clue, 'Shattered Sanctuary')}

      <div class="puzzle-intro">
        <div class="puzzle-tag">Decode &amp; Match</div>
        <p class="puzzle-description">Four Masonic symbols were used as a secret language inside the 1886 Union Masonic Temple. Each symbol stands for one of the bonds that held the community together. Match every symbol to its meaning.</p>
      </div>

      <div class="how-to-play">
        <div class="htp-title">&#9670; How to Play</div>
        <ol class="htp-steps">
          <li>Look at the <strong>Symbols</strong> on the left — each one has a name below it.</li>
          <li>Drag a symbol and drop it onto the <strong>Meaning</strong> you think it represents on the right.</li>
          <li>Use the clue from Enigma 01 to help you decode each one.</li>
        </ol>
      </div>

      <div class="puzzle-layout">
        <div class="puzzle-col">
          <div class="col-label">Symbols</div>
          <div class="puzzle-source" id="symbol-source"></div>
        </div>
        <div class="puzzle-col">
          <div class="col-label">Meanings</div>
          <div class="puzzle-target" id="symbol-target">
            <div class="drop-slot" data-slot="1"><span class="slot-label">The Silent Oath</span></div>
            <div class="drop-slot" data-slot="2"><span class="slot-label">Shared Prosperity</span></div>
            <div class="drop-slot" data-slot="3"><span class="slot-label">Cultural Bridge</span></div>
            <div class="drop-slot" data-slot="4"><span class="slot-label">Enduring Legacy</span></div>
          </div>
        </div>
      </div>

      <div id="feedback" class="feedback-bar">
        <span class="feedback-icon">&#9670;</span>
        <span id="feedback-text">Drag each symbol to its meaning. Open the clue panel above if you need a hint.</span>
      </div>
    </div>
  `;

  container.innerHTML = html;
  attachClueToggle();

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
      h.className = 'heart' + (i <= lives ? ' active' : ' lost');
      h.innerHTML = i <= lives ? '&#9829;' : '&#9825;';
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
    const hearts = document.querySelectorAll('.heart');
    const gained = hearts[lives - 1];
    if (gained) gsap.fromTo(gained, { scale: 0 }, { scale: 1, duration: 0.4, ease: 'back.out(2.5)' });
    document.getElementById('feedback-text').textContent = '+1 life restored — keep decoding!';
    setTimeout(() => {
      if (!completed) {
        const placed = [...document.querySelectorAll('.drop-slot')].filter(s => s.querySelector('.piece')).length;
        document.getElementById('feedback-text').textContent =
          placed === 0 ? 'Drag each symbol to its meaning. Open the clue panel above if you need a hint.'
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
        <div class="game-over-icon">&#9825;</div>
        <h2 class="game-over-title">No Lives Remaining</h2>
        <p class="game-over-body">The cipher defeats you — but every initiate may try once more.</p>
        <button class="game-over-btn" id="try-again-btn">Try Again &#8629;</button>
      </div>
    `;
    document.body.appendChild(overlay);
    gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.35 });
    gsap.fromTo('.game-over-card', { opacity: 0, scale: 0.85, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 0.45, delay: 0.1, ease: 'back.out(1.7)' });
    document.getElementById('try-again-btn').addEventListener('click', () => {
      overlay.remove();
      initPuzzle2(container, clue, onBack, onNext);
    });
  }
  // ────────────────────────────────────────────────────────────────────────────

  gsap.set('.puzzle-header', { opacity: 0, y: -20 });
  gsap.set('.clue-panel',    { opacity: 0, y: 12  });
  gsap.set('.puzzle-intro',  { opacity: 0, y: 16  });
  gsap.set('.how-to-play',   { opacity: 0, y: 12  });
  gsap.set('.puzzle-layout', { opacity: 0, y: 24  });
  gsap.set('#feedback',      { opacity: 0 });

  const tl = gsap.timeline();
  tl.to('.puzzle-header', { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' })
    .to('.clue-panel',    { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.2')
    .to('.puzzle-intro',  { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2')
    .to('.how-to-play',   { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.2')
    .to('.puzzle-layout', { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3')
    .to('#feedback',      { opacity: 1, duration: 0.4 }, '-=0.2');

  document.getElementById('back-btn').addEventListener('click', () => {
    if (typeof onBack === 'function') onBack();
  });

  const source = document.getElementById('symbol-source');

  const SVG_CHAIN  = `<svg class="symbol-svg" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="36" height="16" rx="8" stroke="#5e0b15" stroke-width="2.5"/><rect x="20" y="22" width="16" height="28" rx="8" stroke="#5e0b15" stroke-width="2.5"/><circle cx="28" cy="23" r="3" fill="#c9a227" opacity="0.75"/></svg>`;
  const SVG_BRIDGE = `<svg class="symbol-svg" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="4" y1="52" x2="52" y2="52" stroke="#5e0b15" stroke-width="2.5" stroke-linecap="round"/><rect x="7" y="30" width="10" height="22" rx="1" stroke="#5e0b15" stroke-width="2"/><rect x="39" y="30" width="10" height="22" rx="1" stroke="#5e0b15" stroke-width="2"/><path d="M7 30 Q7 8 28 8 Q49 8 49 30" stroke="#5e0b15" stroke-width="2.5" fill="none" stroke-linecap="round"/><circle cx="28" cy="9" r="3.5" fill="#c9a227"/></svg>`;
  const SVG_CANDLE = `<svg class="symbol-svg" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M28 4C28 4 21 16 21 22C21 26.4 24.1 30 28 30C31.9 30 35 26.4 35 22C35 16 28 4 28 4Z" stroke="#5e0b15" stroke-width="2.5" fill="#c9a227" fill-opacity="0.28"/><path d="M28 14C25 19 25 22 25 22" stroke="#5e0b15" stroke-width="1.5" stroke-linecap="round"/><line x1="28" y1="22" x2="28" y2="30" stroke="#5e0b15" stroke-width="2" stroke-linecap="round"/><rect x="22" y="30" width="12" height="16" rx="2" stroke="#5e0b15" stroke-width="2"/><rect x="15" y="46" width="26" height="6" rx="3" stroke="#5e0b15" stroke-width="2"/></svg>`;
  const SVG_HANDS  = `<svg class="symbol-svg" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="8" y1="50" x2="24" y2="28" stroke="#5e0b15" stroke-width="4.5" stroke-linecap="round"/><line x1="48" y1="50" x2="32" y2="28" stroke="#5e0b15" stroke-width="4.5" stroke-linecap="round"/><ellipse cx="28" cy="26" rx="10" ry="7" stroke="#5e0b15" stroke-width="2.5" fill="#c9a227" fill-opacity="0.2"/><path d="M20 26 Q17 18 22 14" stroke="#5e0b15" stroke-width="2" stroke-linecap="round" fill="none"/><path d="M36 26 Q39 18 34 14" stroke="#5e0b15" stroke-width="2" stroke-linecap="round" fill="none"/></svg>`;

  const symbols = [
    { id: 1, svgIcon: SVG_CHAIN,  label: 'Chain of Unity'     },
    { id: 2, svgIcon: SVG_BRIDGE, label: 'Bridge of Cultures' },
    { id: 3, svgIcon: SVG_CANDLE, label: 'Light of Tradition' },
    { id: 4, svgIcon: SVG_HANDS,  label: 'Hands of Alliance'  }
  ];

  const shuffled = [...symbols].sort(() => Math.random() - 0.5);
  const pieceEls = [];

  shuffled.forEach((sym, index) => {
    const el = document.createElement('div');
    el.className = 'piece symbol-piece';
    el.draggable = true;
    el.dataset.value = sym.id;
    el.innerHTML = `
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
          ? 'Drag each symbol to its meaning. Open the clue panel above if you need a hint.'
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

    document.getElementById('feedback-text').textContent = 'All 4 symbols decoded — the cipher is broken!';

    const nextClue = {
      title: 'The Lodge Network Map — Six Hidden Bonds',
      lines: [
        { icon: '⬡', text: 'Union Temple binds the <em>English Craft</em>' },
        { icon: '⬡', text: 'Union Temple shelters the <em>Scottish Chapter</em>' },
        { icon: '⬡', text: 'Union Temple welcomes the <em>Dutch Brethren</em>' },
        { icon: '⬡', text: 'English Craft trades with the <em>Diamond Traders</em>' },
        { icon: '⬡', text: 'Diamond Traders deal with the <em>Dutch Brethren</em>' },
        { icon: '⬡', text: 'Dutch Brethren keep faith with the <em>Scottish Chapter</em>' }
      ]
    };

    setTimeout(() => {
      showCompletionModal({
        title: 'The Cipher is Broken',
        body: "You've decoded the second hidden bond: the symbolic alliances that bridged cultural divides. From Scotland to the Cape Dutch settlements, Masonic emblems created a shared language that turned strangers into brothers.",
        clueLabel: '&#128279; Map Unlocked — use this in the final enigma',
        clueLines: nextClue.lines,
        btnLabel: 'Continue to Web of Whispers',
        onContinue: () => {
          if (typeof onNext === 'function') onNext(nextClue);
        }
      });
    }, 600);
  }
}
