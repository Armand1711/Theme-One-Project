export function initPuzzle2(container, onBack, onNext) {
  const html = `
    <div class="screen active">
      <header>
        <div class="puzzle-top-row">
          <div>
            <h1>Puzzle 2: Symbol Cipher</h1>
            <p>Ancient emblems whisper secrets. Decode their meanings to unlock the next hidden bond.</p>
          </div>
          <button id="back-to-menu" class="back-btn">← Back</button>
        </div>
      </header>

      <div class="puzzle-intro">
        <div class="puzzle-tag">Cryptic Challenge</div>
        <div class="puzzle-description">Match each enigmatic symbol with its veiled meaning. When aligned, a deeper bond will emerge from the mystery.</div>
      </div>

      <div class="puzzle-layout">
        <div class="puzzle-source" id="symbol-source"></div>
        <div class="puzzle-target" id="symbol-target">
          <div class="drop-slot" data-slot="1">The Silent Oath</div>
          <div class="drop-slot" data-slot="2">Shared Prosperity</div>
          <div class="drop-slot" data-slot="3">Cultural Bridge</div>
          <div class="drop-slot" data-slot="4">Enduring Legacy</div>
        </div>
      </div>

      <p id="feedback">Tip: Drag symbols to their matching descriptions. Correct pairings will reveal the cipher's secret.</p>
    </div>
  `;

  container.innerHTML = html;

  // Animate puzzle entrance
  gsap.set('header', { opacity: 0, y: -30 });
  gsap.set('.puzzle-layout', { opacity: 0, y: 30 });
  gsap.set('#feedback', { opacity: 0 });

  const tl = gsap.timeline();
  tl.to('header', { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
    .to('.puzzle-layout', { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3')
    .to('#feedback', { opacity: 1, duration: 0.4 }, '-=0.2');

  document.getElementById('back-to-menu').addEventListener('click', () => {
    if (typeof onBack === 'function') {
      onBack();
    }
  });

  const source = document.getElementById('symbol-source');
  const symbols = [
    { id: 1, symbol: '🔗', label: 'Chain of Unity' },
    { id: 2, symbol: '🌉', label: 'Bridge of Cultures' },
    { id: 3, symbol: '🕯️', label: 'Light of Tradition' },
    { id: 4, symbol: '🤝', label: 'Hands of Alliance' }
  ];

  symbols.forEach((symbolMeta, index) => {
    const symbol = document.createElement('div');
    symbol.className = 'piece';
    symbol.draggable = true;
    symbol.dataset.value = symbolMeta.id;
    symbol.innerHTML = `<div style="font-size: 2rem; margin-bottom: 8px;">${symbolMeta.symbol}</div><div style="font-size: 0.9rem;">${symbolMeta.label}</div>`;
    source.appendChild(symbol);

    // Stagger piece entrance
    gsap.set(symbol, { opacity: 0, scale: 0.5, rotation: -10 });
    gsap.to(symbol, {
      opacity: 1,
      scale: 1,
      rotation: 0,
      duration: 0.4,
      delay: index * 0.1,
      ease: 'back.out(1.7)'
    });

    symbol.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', symbolMeta.id.toString());
      e.dataTransfer.effectAllowed = 'move';
      gsap.to(symbol, { scale: 1.1, duration: 0.2, ease: 'power2.out' });
    });

    symbol.addEventListener('dragend', () => {
      gsap.to(symbol, { scale: 1, duration: 0.2, ease: 'power2.out' });
    });
  });

  const solution = {
    '1': '4', // Chain of Unity -> Hands of Alliance
    '2': '3', // Bridge of Cultures -> Cultural Bridge
    '3': '1', // Light of Tradition -> The Silent Oath
    '4': '2'  // Hands of Alliance -> Shared Prosperity
  };

  let solved = 0;
  const slots = document.querySelectorAll('.drop-slot');

  slots.forEach(slot => {
    slot.addEventListener('dragover', (e) => {
      e.preventDefault();
      slot.classList.add('drag-over');
    });

    slot.addEventListener('dragleave', () => {
      slot.classList.remove('drag-over');
    });

    slot.addEventListener('drop', (e) => {
      e.preventDefault();
      slot.classList.remove('drag-over');
      const dragged = e.dataTransfer.getData('text/plain');
      if (!dragged) return;

      const symbol = document.querySelector(`.piece[data-value='${dragged}']`);
      if (!symbol) return;

      // Animate symbol placement
      gsap.to(symbol, {
        x: slot.offsetLeft - symbol.offsetLeft,
        y: slot.offsetTop - symbol.offsetTop,
        duration: 0.3,
        ease: 'power2.out',
        onComplete: () => {
          slot.appendChild(symbol);
          gsap.set(symbol, { x: 0, y: 0 });
        }
      });

      solved = 0;
      slots.forEach(s => {
        const child = s.querySelector('.piece');
        if (child && solution[s.dataset.slot] === child.dataset.value) {
          solved += 1;
          s.classList.add('correct');
          gsap.to(s, { scale: 1.05, duration: 0.2, yoyo: true, repeat: 1 });
        } else {
          s.classList.remove('correct');
        }
      });

      if (solved === slots.length) {
        const feedback = document.getElementById('feedback');
        feedback.innerHTML = `<strong>The cipher is broken.</strong><br><span>You've deciphered the second hidden bond: the symbolic alliances that transcended cultural divides.</span>`;
        gsap.fromTo(feedback, { opacity: 0, y: 20, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power2.out' });

        // Celebrate with symbol animations
        gsap.to('.piece', {
          scale: 1.1,
          duration: 0.3,
          yoyo: true,
          repeat: 1,
          stagger: 0.1,
          ease: 'power2.out'
        });

        setTimeout(() => {
          if (typeof onNext === 'function') {
            onNext();
          }
        }, 2500);
      }
    });
  });
}
