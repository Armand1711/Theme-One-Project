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

export function initPuzzle1(container, onBack, onNext) {
  const html = `
    <div id="screen-puzzle1" class="screen active">
      <div class="puzzle-header">
        <button class="back-btn" id="back-btn">&#8592; Back</button>
        <div class="puzzle-header-center">
          <div class="puzzle-step">Enigma 01 of 03</div>
          <h1>Shattered Sanctuary</h1>
        </div>
        <div class="puzzle-header-right"></div>
      </div>

      <div class="puzzle-intro">
        <div class="puzzle-tag">Drag &amp; Restore</div>
        <p class="puzzle-description">The facade of the 1886 Union Masonic Temple has fractured across time. Six pieces of its Roman Corinthian architecture lie scattered. Put them back in the right order to reveal the first hidden bond.</p>
      </div>

      <div class="how-to-play">
        <div class="htp-title">&#9670; How to Play</div>
        <ol class="htp-steps">
          <li>Pick up a piece from the <strong>Fragments</strong> panel on the left.</li>
          <li>Drag it across and drop it into the slot it belongs in on the <strong>Sanctuary</strong> panel.</li>
          <li>Place all 6 pieces correctly to reveal the first hidden bond.</li>
        </ol>
      </div>

      <div class="puzzle-layout">
        <div class="puzzle-col">
          <div class="col-label">Fragments</div>
          <div class="puzzle-source grid-3" id="puzzle-source"></div>
        </div>
        <div class="puzzle-col">
          <div class="col-label">Sanctuary</div>
          <div class="puzzle-target grid-3" id="puzzle-target">
            <div class="drop-slot" data-slot="1"><span class="slot-label">North-West</span></div>
            <div class="drop-slot" data-slot="2"><span class="slot-label">Temple Crown</span></div>
            <div class="drop-slot" data-slot="3"><span class="slot-label">North-East</span></div>
            <div class="drop-slot" data-slot="4"><span class="slot-label">West Colonnade</span></div>
            <div class="drop-slot" data-slot="5"><span class="slot-label">Lodge Threshold</span></div>
            <div class="drop-slot" data-slot="6"><span class="slot-label">East Colonnade</span></div>
          </div>
        </div>
      </div>

      <div id="feedback" class="feedback-bar">
        <span class="feedback-icon">&#9670;</span>
        <span id="feedback-text">Drag each piece into its slot. The image will guide you — look at the edges.</span>
      </div>
    </div>
  `;

  container.innerHTML = html;

  gsap.set('.puzzle-header', { opacity: 0, y: -20 });
  gsap.set('.puzzle-intro',  { opacity: 0, y: 16  });
  gsap.set('.how-to-play',   { opacity: 0, y: 12  });
  gsap.set('.puzzle-layout', { opacity: 0, y: 24  });
  gsap.set('#feedback',      { opacity: 0 });

  const tl = gsap.timeline();
  tl.to('.puzzle-header', { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' })
    .to('.puzzle-intro',  { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2')
    .to('.how-to-play',   { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.2')
    .to('.puzzle-layout', { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3')
    .to('#feedback',      { opacity: 1, duration: 0.4 }, '-=0.2');

  document.getElementById('back-btn').addEventListener('click', () => {
    if (typeof onBack === 'function') onBack();
  });

  const imageUrl = '../assets/PT-Masonic_Temple-1888.jpg';

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

  shuffled.forEach((pieceMeta, index) => {
    const piece = document.createElement('div');
    piece.className = 'piece';
    piece.draggable = true;
    piece.dataset.value = pieceMeta.id;
    piece.style.backgroundImage    = `url(${imageUrl})`;
    piece.style.backgroundSize     = '300% 200%';
    piece.style.backgroundPosition = `${pieceMeta.x} ${pieceMeta.y}`;

    source.appendChild(piece);
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

  function handleSlotDrop(piece, slot) {
    if (completed) return;
    slot.classList.remove('drag-over');

    const existing = slot.querySelector('.piece');
    if (existing) source.appendChild(existing);

    slot.appendChild(piece);
    gsap.fromTo(piece, { scale: 0.85 }, { scale: 1, duration: 0.3, ease: 'back.out(1.7)' });

    solved = 0;
    slots.forEach(s => {
      const child = s.querySelector('.piece');
      if (child && solution[s.dataset.slot] === child.dataset.value) {
        solved++;
        s.classList.add('correct');
      } else {
        s.classList.remove('correct');
      }
    });

    const placed = [...slots].filter(s => s.querySelector('.piece')).length;
    if (solved < slots.length) {
      document.getElementById('feedback-text').textContent =
        placed === 0
          ? 'Drag each piece into its slot. The image will guide you — look at the edges.'
          : `${solved} of 6 pieces in the right place. Keep going.`;
    }

    if (solved === slots.length) handleComplete();
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
      if (slot) handleSlotDrop(piece, slot);
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
