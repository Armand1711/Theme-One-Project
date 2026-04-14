function buildCluePanel(clue, sourceLabel) {
  if (!clue) return '';
  return `
    <div class="clue-panel" id="clue-panel">
      <button class="clue-toggle" id="clue-toggle">
        <span class="clue-toggle-icon">&#128269;</span>
        <span>Cipher Map from ${sourceLabel}</span>
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
  const body   = document.getElementById('clue-body');
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
        <p class="puzzle-description">The 1886 Union Masonic Temple stood at the centre of a web of trust binding Kimberley's immigrant enclave. Seven lodges from three nations shared its floor — but not every bond was equal. Use the cipher's map to forge the hidden connections. Select a node, then select another to draw the bond. <em>Only true bonds will hold.</em></p>
      </div>

      <div class="puzzle-layout network-layout">
        <div class="network-canvas" id="network-canvas">
          <div class="network-node" data-node="1"
               data-label="Union Temple"
               data-tooltip="Built 1886–89 on Dutoitspan Road. National Monument 1990."
               style="left:50%;top:12%;">Union Temple</div>
          <div class="network-node" data-node="2"
               data-label="English Craft"
               data-tooltip="Cosmopolitan Lodge No.1574, founded 1872 — the first lodge in Kimberley."
               style="left:84%;top:38%;">English Craft</div>
          <div class="network-node" data-node="3"
               data-label="Diamond Traders"
               data-tooltip="Merchants of Dutoitspan Road, opposite the synagogue — financiers of the temple."
               style="left:71%;top:78%;">Diamond Traders</div>
          <div class="network-node" data-node="4"
               data-label="Dutch Brethren"
               data-tooltip="Peace &amp; Harmony Lodge, Netherlandic Constitution — immigrants from the Cape Dutch community."
               style="left:29%;top:78%;">Dutch Brethren</div>
          <div class="network-node" data-node="5"
               data-label="Scottish Chapter"
               data-tooltip="Athole Lodge, Scottish Constitution — Scots who followed the diamond rush from Cape Colony."
               style="left:16%;top:38%;">Scottish Chapter</div>
          <svg class="network-lines" id="network-lines"></svg>
        </div>
      </div>

      <div id="feedback" class="feedback-bar">
        <span class="feedback-icon">&#128269;</span>
        <span id="feedback-text">Select a node to begin. Open the cipher map — each hidden bond tells part of the story.</span>
      </div>
    </div>
  `;

  container.innerHTML = html;
  attachClueToggle();

  gsap.set('.puzzle-header',  { opacity: 0, y: -20 });
  gsap.set('.clue-panel',     { opacity: 0, y: 12  });
  gsap.set('.puzzle-intro',   { opacity: 0, y: 16  });
  gsap.set('.network-canvas', { opacity: 0, y: 24  });
  gsap.set('.network-node',   { opacity: 0, scale: 0.7 });
  gsap.set('#feedback',       { opacity: 0 });

  const tl = gsap.timeline();
  tl.to('.puzzle-header',  { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' })
    .to('.clue-panel',     { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.2')
    .to('.puzzle-intro',   { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2')
    .to('.network-canvas', { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3')
    .to('.network-node',   { opacity: 1, scale: 1, duration: 0.4, stagger: 0.1, ease: 'back.out(1.7)' }, '-=0.2')
    .to('#feedback',       { opacity: 1, duration: 0.4 }, '-=0.2');

  document.getElementById('back-btn').addEventListener('click', () => {
    if (typeof onBack === 'function') onBack();
  });

  const canvas   = document.getElementById('network-canvas');
  const linesSvg = document.getElementById('network-lines');
  const nodes    = document.querySelectorAll('.network-node');
  let selectedNode = null;
  let connections  = [];
  let completed    = false;

  // 6 historically-grounded required connections forming a pentagonal web:
  // Temple(1) → English(2), Temple(1) → Scottish(5), Temple(1) → Dutch(4)
  // English(2) → Diamonds(3), Diamonds(3) → Dutch(4), Dutch(4) → Scottish(5)
  const correctConnections = [
    { from: 1, to: 2 },
    { from: 1, to: 5 },
    { from: 1, to: 4 },
    { from: 2, to: 3 },
    { from: 3, to: 4 },
    { from: 4, to: 5 }
  ];

  // Show tooltip on hover
  nodes.forEach(node => {
    const tip = document.createElement('div');
    tip.className = 'node-tooltip';
    tip.textContent = node.dataset.tooltip;
    node.appendChild(tip);
  });

  nodes.forEach(node => {
    node.addEventListener('click', () => {
      if (completed) return;

      if (!selectedNode) {
        selectedNode = node;
        node.classList.add('selected');
        gsap.to(node, { scale: 1.1, duration: 0.2, ease: 'back.out(1.7)' });

      } else if (selectedNode === node) {
        node.classList.remove('selected');
        gsap.to(node, { scale: 1, duration: 0.2 });
        selectedNode = null;

      } else {
        const fromId = parseInt(selectedNode.dataset.node);
        const toId   = parseInt(node.dataset.node);

        const alreadyExists = connections.some(c =>
          (c.from === fromId && c.to === toId) || (c.from === toId && c.to === fromId)
        );

        if (!alreadyExists) {
          const isCorrect = correctConnections.some(req =>
            (req.from === fromId && req.to === toId) || (req.from === toId && req.to === fromId)
          );

          if (isCorrect) {
            connections.push({ from: fromId, to: toId });
            drawLine(selectedNode, node);
            selectedNode.classList.add('bonded');
            node.classList.add('bonded');

            const correctSoFar = connections.length;
            if (correctSoFar < correctConnections.length) {
              document.getElementById('feedback-text').textContent =
                `${correctSoFar} of 6 bonds forged. The web is taking shape — consult the cipher's map.`;
            }
            checkCompletion();
          } else {
            drawWrongLine(selectedNode, node);
            const feedbackText = document.getElementById('feedback-text');
            feedbackText.textContent = 'No bond exists here — the archives hold no record of this connection.';
            setTimeout(() => {
              if (!completed) {
                feedbackText.textContent =
                  `${connections.length} of 6 bonds forged. Consult the cipher's map — every thread must be true.`;
              }
            }, 1800);
          }
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

    const x1 = r1.left + r1.width  / 2 - cr.left;
    const y1 = r1.top  + r1.height / 2 - cr.top;
    const x2 = r2.left + r2.width  / 2 - cr.left;
    const y2 = r2.top  + r2.height / 2 - cr.top;

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x1); line.setAttribute('y1', y1);
    line.setAttribute('x2', x2); line.setAttribute('y2', y2);
    line.setAttribute('stroke', '#b28d5a');
    line.setAttribute('stroke-width', '2.5');
    line.setAttribute('stroke-linecap', 'round');
    linesSvg.appendChild(line);

    const length = line.getTotalLength();
    gsap.fromTo(line,
      { strokeDasharray: length, strokeDashoffset: length },
      { strokeDashoffset: 0, duration: 0.6, ease: 'power2.out' }
    );
  }

  function drawWrongLine(node1, node2) {
    const r1 = node1.getBoundingClientRect();
    const r2 = node2.getBoundingClientRect();
    const cr = canvas.getBoundingClientRect();

    const x1 = r1.left + r1.width  / 2 - cr.left;
    const y1 = r1.top  + r1.height / 2 - cr.top;
    const x2 = r2.left + r2.width  / 2 - cr.left;
    const y2 = r2.top  + r2.height / 2 - cr.top;

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x1); line.setAttribute('y1', y1);
    line.setAttribute('x2', x2); line.setAttribute('y2', y2);
    line.setAttribute('stroke', '#8b2020');
    line.setAttribute('stroke-width', '2');
    line.setAttribute('stroke-linecap', 'round');
    line.setAttribute('stroke-dasharray', '6 5');
    linesSvg.appendChild(line);

    gsap.fromTo(line,
      { opacity: 0.75 },
      { opacity: 0, duration: 1.4, ease: 'power2.in', onComplete: () => line.remove() }
    );

    // Brief red flash on both nodes
    gsap.to([node1, node2], {
      boxShadow: '0 0 18px rgba(139,32,32,0.55)',
      duration: 0.15, yoyo: true, repeat: 1,
      onComplete: () => gsap.set([node1, node2], { clearProps: 'boxShadow' })
    });
  }

  function checkCompletion() {
    const correctCount = correctConnections.filter(req =>
      connections.some(c =>
        (c.from === req.from && c.to === req.to) ||
        (c.from === req.to   && c.to === req.from)
      )
    ).length;

    if (correctCount < correctConnections.length) return;

    completed = true;

    // All lines turn gold with a ripple
    const allLines = document.querySelectorAll('#network-lines line');
    allLines.forEach((line, i) => {
      gsap.to(line, {
        attr: { stroke: '#c9a227', 'stroke-width': 3.5 },
        duration: 0.5, delay: i * 0.08, ease: 'power2.out'
      });
    });

    gsap.to('.network-node', {
      borderColor: '#c9a227',
      background: 'linear-gradient(135deg,#fffbf0 0%,#fef5d9 100%)',
      boxShadow: '0 0 20px rgba(201,162,39,0.3)',
      duration: 0.5, stagger: 0.08, ease: 'power2.out'
    });

    const feedbackEl = document.getElementById('feedback');
    feedbackEl.innerHTML = `
      <div class="feedback-success">
        <div class="feedback-success-title">&#10022; The Web is Complete &#10022;</div>
        <p>The hidden network stands revealed. Seven lodges from three nations — English, Scottish, and Dutch — shared one floor, one oath, and one building on Dutoitspan Road. This is the web of trust that built Kimberley's 1886 Union Masonic Temple.</p>
        <div class="clue-reveal" style="margin-top:14px;">
          <div class="clue-reveal-label">&#128279; The Six Bonds of the Enclave</div>
          <div class="clue-lines">
            <div class="clue-line"><span class="clue-icon">⬡</span><span>Union Temple anchored the <em>English Craft</em> — its founding lodges</span></div>
            <div class="clue-line"><span class="clue-icon">⬡</span><span>Union Temple sheltered the <em>Scottish Chapter</em> — Athole Lodge, Scottish Constitution</span></div>
            <div class="clue-line"><span class="clue-icon">⬡</span><span>Union Temple welcomed the <em>Dutch Brethren</em> — Peace &amp; Harmony Lodge</span></div>
            <div class="clue-line"><span class="clue-icon">⬡</span><span>English Craft traded with the <em>Diamond Traders</em> of Dutoitspan Road</span></div>
            <div class="clue-line"><span class="clue-icon">⬡</span><span>Diamond Traders financed the <em>Dutch Brethren's</em> debentures</span></div>
            <div class="clue-line"><span class="clue-icon">⬡</span><span>Dutch Brethren kept faith with the <em>Scottish Chapter</em></span></div>
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

    setTimeout(() => {
      const btn = document.createElement('button');
      btn.className = 'continue-btn';
      btn.innerHTML = 'See the Veiled Revelation &#8594;';
      document.querySelector('.feedback-success').appendChild(btn);
      gsap.fromTo(btn, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)' });
      btn.addEventListener('click', () => {
        if (typeof onNext === 'function') onNext();
      });
    }, 1400);
  }
}
