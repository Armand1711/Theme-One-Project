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
        <p class="puzzle-description">The temple's visage is shattered into four enigmatic pieces. Reassemble them to unveil the first hidden bond that sustained the enclave. <em>Solving this will unlock a clue for the next enigma.</em></p>
      </div>

      <div class="puzzle-layout">
        <div class="puzzle-col">
          <div class="col-label">Fragments</div>
          <div class="puzzle-source" id="puzzle-source"></div>
        </div>
        <div class="puzzle-col">
          <div class="col-label">Sanctuary</div>
          <div class="puzzle-target" id="puzzle-target">
            <div class="drop-slot" data-slot="1"><span class="slot-label">Temple Base</span></div>
            <div class="drop-slot" data-slot="2"><span class="slot-label">Center Arch</span></div>
            <div class="drop-slot" data-slot="3"><span class="slot-label">Relic Wall</span></div>
            <div class="drop-slot" data-slot="4"><span class="slot-label">Heritage Roof</span></div>
          </div>
        </div>
      </div>

      <div id="feedback" class="feedback-bar">
        <span class="feedback-icon">&#128161;</span>
        <span id="feedback-text">Drag each fragment into its rightful place. When the sanctuary is whole, a hidden bond will emerge from the shadows.</span>
      </div>
    </div>
  `;

  container.innerHTML = html;

  gsap.set('.puzzle-header', { opacity: 0, y: -20 });
  gsap.set('.puzzle-intro', { opacity: 0, y: 16 });
  gsap.set('.puzzle-layout', { opacity: 0, y: 24 });
  gsap.set('#feedback', { opacity: 0 });

  const tl = gsap.timeline();
  tl.to('.puzzle-header', { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' })
    .to('.puzzle-intro', { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2')
    .to('.puzzle-layout', { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3')
    .to('#feedback', { opacity: 1, duration: 0.4 }, '-=0.2');

  document.getElementById('back-btn').addEventListener('click', () => {
    if (typeof onBack === 'function') onBack();
  });

  const imageUrl = '../assets/PT-Masonic_Temple-1888.jpg';
  const pieces = [
    { id: 1, label: 'Temple Base',   x: '0%',  y: '0%'  },
    { id: 2, label: 'Center Arch',   x: '50%', y: '0%'  },
    { id: 3, label: 'Relic Wall',    x: '0%',  y: '50%' },
    { id: 4, label: 'Heritage Roof', x: '50%', y: '50%' }
  ];

  const source = document.getElementById('puzzle-source');
  const shuffled = [...pieces].sort(() => Math.random() - 0.5);

  shuffled.forEach((pieceMeta, index) => {
    const piece = document.createElement('div');
    piece.className = 'piece';
    piece.draggable = true;
    piece.dataset.value = pieceMeta.id;
    piece.style.backgroundImage = `url(${imageUrl})`;
    piece.style.backgroundSize = '200% 200%';
    piece.style.backgroundPosition = `${pieceMeta.x} ${pieceMeta.y}`;

    source.appendChild(piece);

    gsap.set(piece, { opacity: 0, scale: 0.6, rotation: Math.random() * 14 - 7 });
    gsap.to(piece, {
      opacity: 1, scale: 1, rotation: 0,
      duration: 0.5, delay: index * 0.1, ease: 'back.out(1.7)'
    });

    piece.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', pieceMeta.id.toString());
      e.dataTransfer.effectAllowed = 'move';
      piece.classList.add('dragging');
    });
    piece.addEventListener('dragend', () => piece.classList.remove('dragging'));
  });

  const solution = { '1': '1', '2': '2', '3': '3', '4': '4' };
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

      // If slot already has a piece, send it back to source
      const existing = slot.querySelector('.piece');
      if (existing) document.getElementById('puzzle-source').appendChild(existing);

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
      const placed = [...slots].filter(s => s.querySelector('.piece')).length;
      if (solved < slots.length) {
        document.getElementById('feedback-text').textContent =
          placed === 0
            ? 'Drag each fragment into its rightful place. When the sanctuary is whole, a hidden bond will emerge from the shadows.'
            : `${solved} of 4 fragments correctly placed. Keep going — the sanctuary awaits restoration.`;
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
        <div class="feedback-success-title">&#10022; The Sanctuary Stands Whole &#10022;</div>
        <p>You've uncovered the first hidden bond: the silent pact of mutual aid that wove the community together.</p>
        <div class="clue-reveal">
          <div class="clue-reveal-label">&#128269; Clue Unlocked &mdash; Carry this into the next enigma</div>
          <div class="clue-lines">
            <div class="clue-line"><span class="clue-icon">🤝</span><span>The clasped hand seals <em>The Silent Oath</em></span></div>
            <div class="clue-line"><span class="clue-icon">🔗</span><span>The unbroken chain weaves <em>Shared Prosperity</em></span></div>
            <div class="clue-line"><span class="clue-icon">🌉</span><span>The arched bridge spans the <em>Cultural Bridge</em></span></div>
            <div class="clue-line"><span class="clue-icon">🕯️</span><span>The undying flame guards the <em>Enduring Legacy</em></span></div>
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

    const clue = {
      title: "The Sanctuary's Inscription",
      lines: [
        { icon: '🤝', text: 'The clasped hand seals <em>The Silent Oath</em>' },
        { icon: '🔗', text: 'The unbroken chain weaves <em>Shared Prosperity</em>' },
        { icon: '🌉', text: 'The arched bridge spans the <em>Cultural Bridge</em>' },
        { icon: '🕯️', text: 'The undying flame guards the <em>Enduring Legacy</em>' }
      ]
    };

    // Append a Continue button after a short delay so user can read the clue
    setTimeout(() => {
      const feedbackEl = document.getElementById('feedback');
      const btn = document.createElement('button');
      btn.className = 'continue-btn';
      btn.innerHTML = 'Continue to Symbol Cipher &#8594;';
      feedbackEl.querySelector('.feedback-success').appendChild(btn);
      gsap.fromTo(btn, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)' });
      btn.addEventListener('click', () => {
        if (typeof onNext === 'function') onNext(clue);
      });
    }, 1200);
  }
}
