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

export function initPuzzle3(container, clue, onBack, onNext) {
  const html = `
    <div id="screen-puzzle3" class="screen active">

      <div class="ptb">
        <div class="ptb-left" id="back-btn">
          <span class="material-symbols-outlined ptb-arrow">arrow_back</span>
          <span class="ptb-back-label">BACK</span>
        </div>
        <div class="ptb-center">
          <p class="ptb-enigma-tag">ENIGMA 03 OF 03</p>
          <h1 class="ptb-title">Web of Whispers</h1>
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
          <p class="pis-tag">CONNECT &amp; REVEAL</p>
          <p class="pis-quote">&ldquo;Seven lodges from three nations shared the 1886 Union Masonic Temple. Not every group was connected &mdash; only six true bonds existed. Draw those bonds to reveal the web of trust.&rdquo;</p>
        </section>

        <div class="puzzle-instr">
          <h4 class="pi-title">INSTRUCTIONS</h4>
          <p class="pi-body">Click and drag from one circle to another to draw a bond between them. A gold line means the bond is correct. A red flash means no bond exists there. Use the <strong>Hint</strong> button if you need a clue from the previous enigma.</p>
        </div>

        <div class="masonic-divider">
          <div class="md-line"></div>
          <span class="md-diamonds">◆◆</span>
          <div class="md-line"></div>
        </div>

        <div class="network-layout">
          <div class="network-canvas" id="network-canvas">
            <div class="network-node" data-node="1"
                 data-tooltip="Built 1886&ndash;89. National Monument 1990. Shared home of seven lodges."
                 style="left:50%;top:12%;">Union Temple<span class="node-bond-count" data-badge="1">0/3</span></div>
            <div class="network-node" data-node="2"
                 data-tooltip="Cosmopolitan Lodge No.1574 &mdash; the first lodge in Kimberley, founded 1872."
                 style="left:84%;top:38%;">English Craft<span class="node-bond-count" data-badge="2">0/2</span></div>
            <div class="network-node" data-node="3"
                 data-tooltip="Merchants of Dutoitspan Road who financed the temple with debentures."
                 style="left:71%;top:78%;">Diamond Traders<span class="node-bond-count" data-badge="3">0/2</span></div>
            <div class="network-node" data-node="4"
                 data-tooltip="Peace &amp; Harmony Lodge &mdash; Cape Dutch immigrants, Netherlandic Constitution."
                 style="left:29%;top:78%;">Dutch Brethren<span class="node-bond-count" data-badge="4">0/3</span></div>
            <div class="network-node" data-node="5"
                 data-tooltip="Athole Lodge, Scottish Constitution &mdash; followed the diamond rush from Cape Colony."
                 style="left:16%;top:38%;">Scottish Chapter<span class="node-bond-count" data-badge="5">0/2</span></div>
            <svg class="network-lines" id="network-lines"></svg>
            <div class="network-drag-hint" id="drag-hint">Click and drag from a node to begin</div>
          </div>
        </div>

      </div>

      <div class="pff" id="feedback">
        <div class="pff-main">
          <span class="material-symbols-outlined pff-icon">emergency_home</span>
          <p class="pff-text" id="feedback-text">Click and drag from one circle to another to draw a bond. Use the hint button if you need a clue.</p>
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
    document.getElementById('feedback-text').textContent = '+1 life restored — keep drawing!';
    setTimeout(() => {
      if (!completed) {
        document.getElementById('feedback-text').textContent =
          `${connections.length} of 6 bonds drawn. Use the hint button for guidance.`;
      }
    }, 1600);
  }

  function checkStreak() {
    correctStreak++;
    if (correctStreak >= 2 && lives < MAX_LIVES) { correctStreak = 0; gainLife(); }
  }

  function handleGameOver() {
    cleanup();
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
      initPuzzle3(container, clue, onBack, onNext);
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
  gsap.set('.network-canvas',     { opacity: 0, y: 24  });
  gsap.set('.network-node',       { opacity: 0, scale: 0.7 });
  gsap.set('#feedback',           { opacity: 0 });

  const tl = gsap.timeline();
  tl.to('.ptb',                { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' })
    .to('.puzzle-intro-strip', { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2')
    .to('.puzzle-instr',       { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.2')
    .to('.network-canvas',     { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3')
    .to('.network-node',       { opacity: 1, scale: 1, duration: 0.4, stagger: 0.1, ease: 'back.out(1.7)' }, '-=0.2')
    .to('#feedback',           { opacity: 1, duration: 0.4 }, '-=0.2');

  document.getElementById('back-btn').addEventListener('click', () => {
    cleanup();
    if (typeof onBack === 'function') onBack();
  });

  const canvas   = document.getElementById('network-canvas');
  const linesSvg = document.getElementById('network-lines');
  const nodes    = document.querySelectorAll('.network-node');
  const dragHint = document.getElementById('drag-hint');

  let dragStartNode = null;
  let previewLine   = null;
  let connections   = [];
  let completed     = false;

  // 6 historically-grounded bonds
  const correctConnections = [
    { from: 1, to: 2 },
    { from: 1, to: 5 },
    { from: 1, to: 4 },
    { from: 2, to: 3 },
    { from: 3, to: 4 },
    { from: 4, to: 5 }
  ];

  // Add historical tooltips
  nodes.forEach(node => {
    const tip = document.createElement('div');
    tip.className = 'node-tooltip';
    tip.textContent = node.dataset.tooltip;
    node.appendChild(tip);
  });

  // Max bonds per node derived from correctConnections
  const maxBonds = {};
  nodes.forEach(n => { maxBonds[parseInt(n.dataset.node)] = 0; });
  correctConnections.forEach(({ from, to }) => { maxBonds[from]++; maxBonds[to]++; });

  function updateBadges() {
    nodes.forEach(node => {
      const id = parseInt(node.dataset.node);
      const current = connections.filter(c => c.from === id || c.to === id).length;
      const badge = node.querySelector('.node-bond-count');
      if (badge) {
        badge.textContent = `${current}/${maxBonds[id]}`;
        badge.classList.toggle('badge-full', current === maxBonds[id]);
      }
    });
  }

  // ─── Helpers ──────────────────────────────────────────────────────────────
  function getCenter(node) {
    const r  = node.getBoundingClientRect();
    const cr = canvas.getBoundingClientRect();
    return {
      x: r.left + r.width  / 2 - cr.left,
      y: r.top  + r.height / 2 - cr.top
    };
  }

  function createPreviewLine(x1, y1) {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x1); line.setAttribute('y1', y1);
    line.setAttribute('x2', x1); line.setAttribute('y2', y1);
    line.setAttribute('stroke', '#5e0b15');
    line.setAttribute('stroke-width', '2');
    line.setAttribute('stroke-dasharray', '6 4');
    line.setAttribute('stroke-linecap', 'round');
    line.setAttribute('opacity', '0.55');
    line.id = 'preview-line';
    linesSvg.appendChild(line);
    return line;
  }

  function startDrag(node) {
    if (completed || dragStartNode) return;
    dragStartNode = node;
    node.classList.add('selected');
    gsap.to(node, { scale: 1.1, duration: 0.15, ease: 'back.out(1.7)' });
    const c = getCenter(node);
    previewLine = createPreviewLine(c.x, c.y);
    dragHint.style.opacity = '0';
    document.body.style.cursor = 'crosshair';
  }

  function updatePreview(clientX, clientY) {
    if (!previewLine) return;
    const cr = canvas.getBoundingClientRect();
    previewLine.setAttribute('x2', clientX - cr.left);
    previewLine.setAttribute('y2', clientY - cr.top);
  }

  function endDrag(clientX, clientY) {
    if (!dragStartNode) return;

    // Capture start node and clear state before any async work
    const startNode = dragStartNode;
    dragStartNode = null;
    document.body.style.cursor = '';

    if (previewLine) { previewLine.remove(); previewLine = null; }
    startNode.classList.remove('selected');
    gsap.to(startNode, { scale: 1, duration: 0.15 });

    // Temporarily hide start node so elementFromPoint can find what's underneath
    startNode.style.pointerEvents = 'none';
    const el = document.elementFromPoint(clientX, clientY);
    startNode.style.pointerEvents = '';
    const targetNode = el?.closest('.network-node');

    if (targetNode && targetNode !== startNode) {
      attemptConnection(startNode, targetNode);
    }
  }

  function attemptConnection(fromNode, toNode) {
    const fromId = parseInt(fromNode.dataset.node);
    const toId   = parseInt(toNode.dataset.node);

    const alreadyExists = connections.some(c =>
      (c.from === fromId && c.to === toId) || (c.from === toId && c.to === fromId)
    );
    if (alreadyExists) return;

    const isCorrect = correctConnections.some(req =>
      (req.from === fromId && req.to === toId) || (req.from === toId && req.to === fromId)
    );

    if (isCorrect) {
      connections.push({ from: fromId, to: toId });
      drawLine(fromNode, toNode);
      fromNode.classList.add('bonded');
      toNode.classList.add('bonded');
      updateBadges();
      checkStreak();
      const count = connections.length;
      if (count < correctConnections.length) {
        document.getElementById('feedback-text').textContent =
          `${count} of 6 bonds drawn. Keep going — use the hint button if you need a clue.`;
      }
      checkCompletion();
    } else {
      loseLife();
      drawWrongLine(fromNode, toNode);
      const ft = document.getElementById('feedback-text');
      ft.textContent = 'No bond exists between those two — try a different connection.';
      setTimeout(() => {
        if (!completed) {
          ft.textContent = `${connections.length} of 6 bonds drawn. Use the hint button for guidance.`;
        }
      }, 1800);
    }
  }

  // ─── Mouse drag (document-level, added on mousedown, removed on mouseup) ──
  function onMouseMove(e) { updatePreview(e.clientX, e.clientY); }
  function onMouseUp(e) {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup',   onMouseUp);
    endDrag(e.clientX, e.clientY);
  }

  nodes.forEach(node => {
    node.addEventListener('mousedown', (e) => {
      if (completed) return;
      e.preventDefault();
      startDrag(node);
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup',   onMouseUp);
    });
  });

  // ─── Touch drag (document-level, added on touchstart, removed on touchend) ─
  function onTouchMove(e) {
    e.preventDefault();
    const touch = e.touches[0];
    updatePreview(touch.clientX, touch.clientY);
  }
  function onTouchEnd(e) {
    document.removeEventListener('touchmove', onTouchMove);
    document.removeEventListener('touchend',  onTouchEnd);
    const touch = e.changedTouches[0];
    endDrag(touch.clientX, touch.clientY);
  }

  nodes.forEach(node => {
    node.addEventListener('touchstart', (e) => {
      if (completed) return;
      e.preventDefault();
      startDrag(node);
      document.addEventListener('touchmove', onTouchMove, { passive: false });
      document.addEventListener('touchend',  onTouchEnd);
    }, { passive: false });
  });

  // ─── Line drawing ──────────────────────────────────────────────────────────
  function drawLine(node1, node2) {
    const c1 = getCenter(node1);
    const c2 = getCenter(node2);
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', c1.x); line.setAttribute('y1', c1.y);
    line.setAttribute('x2', c2.x); line.setAttribute('y2', c2.y);
    line.setAttribute('stroke', '#b28d5a');
    line.setAttribute('stroke-width', '2.5');
    line.setAttribute('stroke-linecap', 'round');
    linesSvg.appendChild(line);
    const length = line.getTotalLength();
    gsap.fromTo(line,
      { strokeDasharray: length, strokeDashoffset: length },
      { strokeDashoffset: 0, duration: 0.55, ease: 'power2.out' }
    );
  }

  function drawWrongLine(node1, node2) {
    const c1 = getCenter(node1);
    const c2 = getCenter(node2);
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', c1.x); line.setAttribute('y1', c1.y);
    line.setAttribute('x2', c2.x); line.setAttribute('y2', c2.y);
    line.setAttribute('stroke', '#8b2020');
    line.setAttribute('stroke-width', '2');
    line.setAttribute('stroke-linecap', 'round');
    line.setAttribute('stroke-dasharray', '6 5');
    linesSvg.appendChild(line);
    gsap.fromTo(line,
      { opacity: 0.8 },
      { opacity: 0, duration: 1.4, ease: 'power2.in', onComplete: () => line.remove() }
    );
    gsap.to([node1, node2], {
      boxShadow: '0 0 18px rgba(139,32,32,0.6)',
      duration: 0.15, yoyo: true, repeat: 1,
      onComplete: () => gsap.set([node1, node2], { clearProps: 'boxShadow' })
    });
  }

  // ─── Cleanup (remove document listeners if user navigates away) ────────────
  function cleanup() {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup',   onMouseUp);
    document.removeEventListener('touchmove', onTouchMove);
    document.removeEventListener('touchend',  onTouchEnd);
    document.body.style.cursor = '';
  }

  // ─── Completion ────────────────────────────────────────────────────────────
  function checkCompletion() {
    const correctCount = correctConnections.filter(req =>
      connections.some(c =>
        (c.from === req.from && c.to === req.to) ||
        (c.from === req.to   && c.to === req.from)
      )
    ).length;
    if (correctCount < correctConnections.length) return;

    completed = true;
    cleanup();

    document.querySelectorAll('#network-lines line').forEach((line, i) => {
      gsap.to(line, {
        attr: { stroke: '#c9a227', 'stroke-width': 3.5 },
        duration: 0.5, delay: i * 0.07, ease: 'power2.out'
      });
    });

    gsap.to('.network-node', {
      borderColor: '#c9a227',
      background: 'linear-gradient(135deg,#fffbf0 0%,#fef5d9 100%)',
      boxShadow: '0 0 22px rgba(201,162,39,0.35)',
      duration: 0.5, stagger: 0.08, ease: 'power2.out'
    });

    document.getElementById('feedback-text').textContent = 'All 6 bonds drawn — the web is complete!';

    setTimeout(() => {
      showCompletionModal({
        title: 'The Web is Complete',
        body: "You have mapped the hidden network. Seven lodges from three nations — English, Scottish, and Dutch — shared one floor, one oath, and one building on Dutoitspan Road. This invisible web of trust is what built Kimberley's 1886 Union Masonic Temple.",
        clueLabel: '&#128279; The Six Bonds of the Enclave',
        clueLines: [
          { icon: '⬡', text: 'Union Temple anchored the <em>English Craft</em> — its founding lodges' },
          { icon: '⬡', text: 'Union Temple sheltered the <em>Scottish Chapter</em> — Athole Lodge' },
          { icon: '⬡', text: 'Union Temple welcomed the <em>Dutch Brethren</em> — Peace &amp; Harmony Lodge' },
          { icon: '⬡', text: 'English Craft traded with the <em>Diamond Traders</em> of Dutoitspan Road' },
          { icon: '⬡', text: "Diamond Traders financed the <em>Dutch Brethren's</em> debentures" },
          { icon: '⬡', text: 'Dutch Brethren kept faith with the <em>Scottish Chapter</em>' }
        ],
        btnLabel: 'See the Full Discovery',
        onContinue: () => {
          if (typeof onNext === 'function') onNext();
        }
      });
    }, 800);
  }
}
