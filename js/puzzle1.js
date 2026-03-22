export function initPuzzle1(container, onBack, onNext) {
  const html = `
    <div class="screen active">
      <header>
        <div class="puzzle-top-row">
          <div>
            <h1>Puzzle 1: Shattered Sanctuary</h1>
            <p>In the dust of Kimberley, a temple lies fragmented. What unseen forces held it together?</p>
          </div>
          <button id="back-to-landing" class="back-btn">← Back</button>
        </div>
      </header>

      <div class="puzzle-intro">
        <div class="puzzle-tag">Mysterious Task</div>
        <div class="puzzle-description">The temple's visage is shattered into four enigmatic pieces. Reassemble them to unveil the first hidden bond that sustained the enclave.</div>
      </div>

      <div class="puzzle-layout">
        <div class="puzzle-source" id="puzzle-source"></div>
        <div class="puzzle-target" id="puzzle-target">
          <div class="drop-slot" data-slot="1">Temple Base</div>
          <div class="drop-slot" data-slot="2">Center Arch</div>
          <div class="drop-slot" data-slot="3">Relic Wall</div>
          <div class="drop-slot" data-slot="4">Heritage Roof</div>
        </div>
      </div>

      <p id="feedback">Tip: Drag each fragment into its rightful place. When the sanctuary is whole, a hidden bond will emerge from the shadows.</p>
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

  document.getElementById('back-to-landing').addEventListener('click', () => {
    if (typeof onBack === 'function') {
      onBack();
    }
  });

  const source = document.getElementById('puzzle-source');
  const imageUrl = 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1000&q=80';
  const pieces = [
    { id: 1, label: 'Temple Base', x: '0%', y: '0%' },
    { id: 2, label: 'Center Arch', x: '50%', y: '0%' },
    { id: 3, label: 'Relic Wall', x: '0%', y: '50%' },
    { id: 4, label: 'Heritage Roof', x: '50%', y: '50%' }
  ];

  pieces.forEach((pieceMeta, index) => {
    const piece = document.createElement('div');
    piece.className = 'piece';
    piece.draggable = true;
    piece.dataset.value = pieceMeta.id;
    piece.style.backgroundImage = `url(${imageUrl})`;
    piece.style.backgroundSize = '200% 200%';
    piece.style.backgroundPosition = `${pieceMeta.x} ${pieceMeta.y}`;
    piece.textContent = pieceMeta.id;
    source.appendChild(piece);

    // Stagger piece entrance
    gsap.set(piece, { opacity: 0, scale: 0.5, rotation: -10 });
    gsap.to(piece, {
      opacity: 1,
      scale: 1,
      rotation: 0,
      duration: 0.4,
      delay: index * 0.1,
      ease: 'back.out(1.7)'
    });

    piece.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', pieceMeta.id.toString());
      e.dataTransfer.effectAllowed = 'move';
      gsap.to(piece, { scale: 1.1, duration: 0.2, ease: 'power2.out' });
    });

    piece.addEventListener('dragend', () => {
      gsap.to(piece, { scale: 1, duration: 0.2, ease: 'power2.out' });
    });
  });

  const solution = {
    '1': '1',
    '2': '2',
    '3': '3',
    '4': '4'
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

      const piece = document.querySelector(`.piece[data-value='${dragged}']`);
      if (!piece) return;

      // Animate piece placement
      gsap.to(piece, {
        x: slot.offsetLeft - piece.offsetLeft,
        y: slot.offsetTop - piece.offsetTop,
        duration: 0.3,
        ease: 'power2.out',
        onComplete: () => {
          slot.appendChild(piece);
          gsap.set(piece, { x: 0, y: 0 });
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
        feedback.innerHTML = `<strong>The sanctuary stands whole once more.</strong><br><span>You've uncovered the first hidden bond: the silent pact of mutual aid that wove the community together.</span>`;
        gsap.fromTo(feedback, { opacity: 0, y: 20, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power2.out' });

        // Celebrate with piece animations
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
