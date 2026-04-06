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

export function initPuzzle3(container, clue, onBack, onNext) {
  const html = `
    <div id="screen-puzzle3" class="screen active">
      <div class="puzzle-header">
        <button class="back-btn" id="back-btn">&#8592; Back</button>
        <div class="puzzle-header-center">
          <div class="puzzle-step">Enigma 03 of 03</div>
          <h1>Web of Whispers</h1>
        </div>
        <div class="puzzle-header-right"></div>
      </div>

      ${buildCluePanel(clue, 'Symbol Cipher')}

      <div class="puzzle-intro">
        <div class="puzzle-tag">Connect &amp; Reveal</div>
        <p class="puzzle-description">Invisible threads connect the enclave. Click a node to select it, then click another to draw the hidden bond between them. The cipher's map reveals which connections must be forged.</p>
      </div>

      <div class="puzzle-layout network-layout">
        <div class="network-canvas" id="network-canvas">
          <div class="network-node" data-node="1" style="left:25%;top:25%;">Temple Lodge</div>
          <div class="network-node" data-node="2" style="left:75%;top:25%;">Immigrant Traders</div>
          <div class="network-node" data-node="3" style="left:25%;top:75%;">Local Merchants</div>
          <div class="network-node" data-node="4" style="left:75%;top:75%;">Cultural Guardians</div>
          <svg class="network-lines" id="network-lines"></svg>
        </div>
      </div>

      <div id="feedback" class="feedback-bar">
        <span class="feedback-icon">&#128161;</span>
        <span>Click a node to select it (it will glow green), then click another to draw the bond. The cipher's map shows you which connections to make.</span>
      </div>
    </div>
  `;

  container.innerHTML = html;
  attachClueToggle();

  gsap.set('.puzzle-header', { opacity: 0, y: -20 });
  gsap.set('.clue-panel', { opacity: 0, y: 12 });
  gsap.set('.puzzle-intro', { opacity: 0, y: 16 });
  gsap.set('.network-canvas', { opacity: 0, y: 24 });
  gsap.set('.network-node', { opacity: 0, scale: 0.7 });
  gsap.set('#feedback', { opacity: 0 });

  const tl = gsap.timeline();
  tl.to('.puzzle-header', { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' })
    .to('.clue-panel', { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.2')
    .to('.puzzle-intro', { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2')
    .to('.network-canvas', { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3')
    .to('.network-node', { opacity: 1, scale: 1, duration: 0.4, stagger: 0.1, ease: 'back.out(1.7)' }, '-=0.2')
    .to('#feedback', { opacity: 1, duration: 0.4 }, '-=0.2');

  document.getElementById('back-btn').addEventListener('click', () => {
    if (typeof onBack === 'function') onBack();
  });

  const canvas = document.getElementById('network-canvas');
  const linesSvg = document.getElementById('network-lines');
  const nodes = document.querySelectorAll('.network-node');
  let selectedNode = null;
  let connections = [];
  let completed = false;

  // Required connections: Temple(1)→Traders(2), Temple(1)→Merchants(3),
  // Traders(2)→Guardians(4), Merchants(3)→Guardians(4)
  const correctConnections = [
    { from: 1, to: 2 },
    { from: 1, to: 3 },
    { from: 2, to: 4 },
    { from: 3, to: 4 }
  ];

  nodes.forEach(node => {
    node.addEventListener('click', () => {
      if (completed) return;

      if (!selectedNode) {
        selectedNode = node;
        node.classList.add('selected');
        gsap.to(node, { scale: 1.08, duration: 0.2, ease: 'back.out(1.7)' });

      } else if (selectedNode === node) {
        node.classList.remove('selected');
        gsap.to(node, { scale: 1, duration: 0.2 });
        selectedNode = null;

      } else {
        const fromId = parseInt(selectedNode.dataset.node);
        const toId = parseInt(node.dataset.node);

        const alreadyExists = connections.some(c =>
          (c.from === fromId && c.to === toId) || (c.from === toId && c.to === fromId)
        );

        if (!alreadyExists) {
          connections.push({ from: fromId, to: toId });
          drawLine(selectedNode, node);
          checkCompletion();
        }

        selectedNode.classList.remove('selected');
        gsap.to(selectedNode, { scale: 1, duration: 0.2 });
        selectedNode = null;
      }
    });
  });

  function drawLine(node1, node2) {
    const r1 = node1.getBoundingClientRect();
    const r2 = node2.getBoundingClientRect();
    const cr = canvas.getBoundingClientRect();

    const x1 = r1.left + r1.width / 2 - cr.left;
    const y1 = r1.top  + r1.height / 2 - cr.top;
    const x2 = r2.left + r2.width / 2 - cr.left;
    const y2 = r2.top  + r2.height / 2 - cr.top;

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y2);
    line.setAttribute('stroke', '#b28d5a');
    line.setAttribute('stroke-width', '3');
    line.setAttribute('stroke-linecap', 'round');

    linesSvg.appendChild(line);

    const length = line.getTotalLength();
    gsap.fromTo(line,
      { strokeDasharray: length, strokeDashoffset: length },
      { strokeDashoffset: 0, duration: 0.5, ease: 'power2.out' }
    );
  }

  function checkCompletion() {
    const correctCount = correctConnections.filter(req =>
      connections.some(c =>
        (c.from === req.from && c.to === req.to) ||
        (c.from === req.to   && c.to === req.from)
      )
    ).length;

    if (correctCount === correctConnections.length) {
      completed = true;

      // Turn all lines gold
      document.querySelectorAll('#network-lines line').forEach(line => {
        gsap.to(line, { attr: { stroke: '#c9a227', 'stroke-width': 4 }, duration: 0.6 });
      });
      gsap.to('.network-node', {
        borderColor: '#c9a227', duration: 0.4, stagger: 0.1
      });

      const feedbackEl = document.getElementById('feedback');
      feedbackEl.innerHTML = `
        <div class="feedback-success">
          <div class="feedback-success-title">&#10022; The Web is Complete &#10022;</div>
          <p>You've traced the final hidden bond: the intricate network of relationships that sustained the enclave through every trial.</p>
        </div>
      `;
      gsap.fromTo('#feedback',
        { opacity: 0, y: 16, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power2.out' }
      );

      setTimeout(() => {
        if (typeof onNext === 'function') onNext();
      }, 3000);
    }
  }
}
