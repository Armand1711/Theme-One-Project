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
        <div class="puzzle-header-right"></div>
      </div>

      ${buildCluePanel(clue, 'Shattered Sanctuary')}

      <div class="puzzle-intro">
        <div class="puzzle-tag">Decode &amp; Match</div>
        <p class="puzzle-description">Ancient emblems whisper their secrets. Match each symbol to its veiled meaning — the inscription from the sanctuary holds the key. <em>The cipher, when broken, reveals the map for the final enigma.</em></p>
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
        <span class="feedback-icon">&#128161;</span>
        <span id="feedback-text">Match each symbol to its veiled meaning. The clue from the Shattered Sanctuary reveals the truth &mdash; look closely.</span>
      </div>
    </div>
  `;

  container.innerHTML = html;
  attachClueToggle();

  gsap.set('.puzzle-header', { opacity: 0, y: -20 });
  gsap.set('.clue-panel', { opacity: 0, y: 12 });
  gsap.set('.puzzle-intro', { opacity: 0, y: 16 });
  gsap.set('.puzzle-layout', { opacity: 0, y: 24 });
  gsap.set('#feedback', { opacity: 0 });

  const tl = gsap.timeline();
  tl.to('.puzzle-header', { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' })
    .to('.clue-panel', { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.2')
    .to('.puzzle-intro', { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2')
    .to('.puzzle-layout', { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3')
    .to('#feedback', { opacity: 1, duration: 0.4 }, '-=0.2');

  document.getElementById('back-btn').addEventListener('click', () => {
    if (typeof onBack === 'function') onBack();
  });

  const source = document.getElementById('symbol-source');
  const symbols = [
    { id: 1, symbol: '🔗', label: 'Chain of Unity'     },
    { id: 2, symbol: '🌉', label: 'Bridge of Cultures' },
    { id: 3, symbol: '🕯️', label: 'Light of Tradition' },
    { id: 4, symbol: '🤝', label: 'Hands of Alliance'  }
  ];

  const shuffled = [...symbols].sort(() => Math.random() - 0.5);

  shuffled.forEach((sym, index) => {
    const el = document.createElement('div');
    el.className = 'piece symbol-piece';
    el.draggable = true;
    el.dataset.value = sym.id;
    el.innerHTML = `
      <div class="symbol-icon">${sym.symbol}</div>
      <div class="symbol-label">${sym.label}</div>
    `;
    source.appendChild(el);

    gsap.set(el, { opacity: 0, scale: 0.6, y: 20 });
    gsap.to(el, { opacity: 1, scale: 1, y: 0, duration: 0.5, delay: index * 0.1, ease: 'back.out(1.7)' });

    el.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', sym.id.toString());
      e.dataTransfer.effectAllowed = 'move';
      el.classList.add('dragging');
    });
    el.addEventListener('dragend', () => el.classList.remove('dragging'));
  });

  // Logical solution matching the clue given by Puzzle 1:
  // Slot 1 "The Silent Oath"   → id 4 Hands of Alliance  (a handshake IS an oath)
  // Slot 2 "Shared Prosperity" → id 1 Chain of Unity      (chain = linked effort)
  // Slot 3 "Cultural Bridge"   → id 2 Bridge of Cultures  (direct match)
  // Slot 4 "Enduring Legacy"   → id 3 Light of Tradition  (flame = enduring memory)
  const solution = { '1': '4', '2': '1', '3': '2', '4': '3' };

  let solved = 0;
  let completed = false;
  const slots = document.querySelectorAll('.drop-slot');

  slots.forEach(slot => {
    slot.addEventListener('dragover', (e) => {
      e.preventDefault();
      if (!slot.querySelector('.piece')) slot.classList.add('drag-over');
    });
    slot.addEventListener('dragleave', () => slot.classList.remove('drag-over'));
    slot.addEventListener('drop', (e) => {
      e.preventDefault();
      slot.classList.remove('drag-over');
      if (completed) return;

      const dragged = e.dataTransfer.getData('text/plain');
      if (!dragged) return;
      const piece = document.querySelector(`.piece[data-value='${dragged}']`);
      if (!piece) return;

      const existing = slot.querySelector('.piece');
      if (existing) document.getElementById('symbol-source').appendChild(existing);

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

      // Live progress update
      if (solved < slots.length) {
        const placed = [...slots].filter(s => s.querySelector('.piece')).length;
        document.getElementById('feedback-text').textContent =
          placed === 0
            ? 'Match each symbol to its veiled meaning. The clue from the Shattered Sanctuary reveals the truth — look closely.'
            : `${solved} of 4 symbols correctly matched. Study the clue — the inscription reveals the answer.`;
      }

      if (solved === slots.length) handleComplete();
    });
  });

  function handleComplete() {
    completed = true;
    gsap.to('.drop-slot.correct', {
      scale: 1.04, duration: 0.3, yoyo: true, repeat: 1, stagger: 0.08
    });

    const feedbackEl = document.getElementById('feedback');
    feedbackEl.innerHTML = `
      <div class="feedback-success">
        <div class="feedback-success-title">&#10022; The Cipher is Broken &#10022;</div>
        <p>You've deciphered the second hidden bond: the symbolic alliances that transcended cultural divides.</p>
        <div class="clue-reveal">
          <div class="clue-reveal-label">&#128269; Clue Unlocked &mdash; Carry this into the final enigma</div>
          <div class="clue-lines">
            <div class="clue-line"><span class="clue-icon">⬡</span><span>Temple Lodge reaches to <em>Immigrant Traders</em></span></div>
            <div class="clue-line"><span class="clue-icon">⬡</span><span>Temple Lodge anchors <em>Local Merchants</em></span></div>
            <div class="clue-line"><span class="clue-icon">⬡</span><span>Immigrant Traders align with <em>Cultural Guardians</em></span></div>
            <div class="clue-line"><span class="clue-icon">⬡</span><span>Local Merchants sustain <em>Cultural Guardians</em></span></div>
          </div>
        </div>
      </div>
    `;
    gsap.fromTo('#feedback',
      { opacity: 0, y: 16, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power2.out',
        onComplete: () => document.getElementById('feedback').scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }
    );

    const nextClue = {
      title: "The Cipher's Network Map",
      lines: [
        { icon: '⬡', text: 'Temple Lodge reaches to <em>Immigrant Traders</em>' },
        { icon: '⬡', text: 'Temple Lodge anchors <em>Local Merchants</em>' },
        { icon: '⬡', text: 'Immigrant Traders align with <em>Cultural Guardians</em>' },
        { icon: '⬡', text: 'Local Merchants sustain <em>Cultural Guardians</em>' }
      ]
    };

    setTimeout(() => {
      const feedbackEl = document.getElementById('feedback');
      const btn = document.createElement('button');
      btn.className = 'continue-btn';
      btn.innerHTML = 'Continue to Web of Whispers &#8594;';
      feedbackEl.querySelector('.feedback-success').appendChild(btn);
      gsap.fromTo(btn, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)' });
      btn.addEventListener('click', () => {
        if (typeof onNext === 'function') onNext(nextClue);
      });
    }, 1200);
  }
}
