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
      <button class="cpp-dismiss" id="clue-popup-dismiss">GOT IT &mdash; BACK TO THE PUZZLE</button>
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
          <span class="material-symbols-outlined ptb-arrow">arrow_back</span>
          <span class="ptb-back-label">BACK</span>
        </div>
        <div class="ptb-center">
          <p class="ptb-enigma-tag">ENIGMA 02 OF 03</p>
          <h1 class="ptb-title">Symbol Cipher</h1>
        </div>
        <div class="ptb-right">
          ${clue ? `<button class="ptb-hint-btn" id="clue-btn"><span class="material-symbols-outlined">lightbulb</span><span class="ptb-hint-label">HINT</span></button>` : ''}
          <div class="ptb-hearts" id="health-bar">
            <span class="material-symbols-outlined ptb-heart ptb-heart-on" style="font-variation-settings:'FILL' 1">favorite</span>
            <span class="material-symbols-outlined ptb-heart ptb-heart-on" style="font-variation-settings:'FILL' 1">favorite</span>
            <span class="material-symbols-outlined ptb-heart ptb-heart-on" style="font-variation-settings:'FILL' 1">favorite</span>
          </div>
        </div>
      </div>

      <div class="puzzle-scroll-body">

        <section class="puzzle-intro-strip">
          <p class="pis-tag">DECODE &amp; MATCH</p>
          <p class="pis-quote">&ldquo;Four symbols of the Brotherhood wait to be decoded. Match each emblem to the bond it represents &mdash; and unlock the secrets of the inner sanctum.&rdquo;</p>
        </section>

        <div class="puzzle-instr">
          <h4 class="pi-title">INSTRUCTIONS</h4>
          <p class="pi-body">Drag a symbol from the left panel and drop it onto the meaning you think it represents on the right. Each symbol has been used as a shared language across the three national brotherhoods.</p>
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
              <span class="material-symbols-outlined pp-col-label-icon">explore</span>
              SYMBOLS
            </h3>
            <div class="puzzle-source" id="symbol-source"></div>
          </div>
          <div class="pp-col pp-sanctuary">
            <span class="material-symbols-outlined pp-star-icon">star</span>
            <h3 class="pp-col-label">
              <span class="material-symbols-outlined pp-col-label-icon">auto_stories</span>
              MEANINGS
            </h3>
            <div class="puzzle-target pp-drop-grid pp-drop-grid--4" id="symbol-target">
              <div class="drop-slot" data-slot="1"><span class="slot-label">The Silent Oath</span></div>
              <div class="drop-slot" data-slot="2"><span class="slot-label">Shared Prosperity</span></div>
              <div class="drop-slot" data-slot="3"><span class="slot-label">Cultural Bridge</span></div>
              <div class="drop-slot" data-slot="4"><span class="slot-label">Enduring Legacy</span></div>
            </div>
          </div>
        </div>

      </div>

      <div class="pff" id="feedback">
        <div class="pff-main">
          <span class="material-symbols-outlined pff-icon">emergency_home</span>
          <p class="pff-text" id="feedback-text">Drag each symbol to its meaning. Use the hint button if you need help.</p>
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
    document.getElementById('feedback-text').textContent = '+1 life restored — keep decoding!';
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
