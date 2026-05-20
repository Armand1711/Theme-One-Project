import {
  SVG_FLAME,
  SVG_COMPASS_MARK,
  SVG_RADIANT_DELTA,
  SVG_WAX_SEAL,
  SVG_HANGING_PENDANT
} from './svg-library.js';

function renderFlames(lives, max = 3) {
  const out = [];
  for (let i = 1; i <= max; i++) out.push(SVG_FLAME(i <= lives));
  return out.join('');
}

function showCompletionModal({ title, body, clueLabel, clueLines, btnLabel, onContinue }) {
  const modal = document.createElement('div');
  modal.className = 'completion-modal';
  modal.id = 'completion-modal';
  modal.innerHTML = `
    <div class="completion-modal-card">
      <div class="cmc-seal">${SVG_WAX_SEAL}</div>
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
      <button class="cmc-continue-btn shimmer-btn" id="modal-continue">${btnLabel}</button>
    </div>
  `;
  document.body.appendChild(modal);
  gsap.fromTo(modal, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: 'power2.out' });
  gsap.fromTo('.completion-modal-card',
    { opacity: 0, clipPath: 'inset(50% 0 50% 0)' },
    { opacity: 1, clipPath: 'inset(0% 0 0% 0)', duration: 0.7, delay: 0.15, ease: 'power2.out' }
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
      <button class="cpp-dismiss" id="clue-popup-dismiss">GOT IT, BACK TO THE PUZZLE</button>
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

export function initPuzzle3(container, clue, onBack, onNext, onArchives = null, unlocked = false) {
  const html = `
    <div id="screen-puzzle3" class="screen active">

      <div class="ptb">
        <div class="ptb-left" id="back-btn">
          ${SVG_COMPASS_MARK}
          <span class="ptb-back-label">BACK</span>
        </div>
        <div class="ptb-center">
          <p class="ptb-enigma-tag">ENIGMA III OF III</p>
          <h1 class="ptb-title">Web of Whispers</h1>
        </div>
        <div class="ptb-right">
          <div class="ptb-hearts" id="health-bar">
            ${renderFlames(3)}
          </div>
        </div>
      </div>

      <div class="puzzle-scroll-body">

        <section class="puzzle-intro-strip">
          <p class="pis-quote">Seven lodges shared one building in 1886. But not every group was connected, only six real bonds linked them. Find those six.</p>
        </section>

        <div class="puzzle-instr">
          <h4 class="pi-title">HOW TO PLAY</h4>
          <p class="pi-body"><strong>Click and drag</strong> from one circle to another to draw a line between them. <strong>A real bond</strong> lights up gold. <strong>A wrong guess</strong> flashes red and costs a life. Stuck? Tap the seal on the right to review your research.</p>
        </div>

        <div class="network-layout">
          <div class="network-canvas" id="network-canvas">
            <div class="network-node" data-node="1"
                 data-tooltip="Built 1886 to 89. National Monument 1990. Shared home of seven lodges."
                 style="left:50%;top:12%;">Union Temple<span class="node-bond-count" data-badge="1">0/3</span></div>
            <div class="network-node" data-node="2"
                 data-tooltip="Cosmopolitan Lodge No.1574, the first lodge in Kimberley, founded 1872."
                 style="left:84%;top:38%;">English Craft<span class="node-bond-count" data-badge="2">0/2</span></div>
            <div class="network-node" data-node="3"
                 data-tooltip="Merchants of Dutoitspan Road who financed the temple with debentures."
                 style="left:71%;top:78%;">Diamond Traders<span class="node-bond-count" data-badge="3">0/2</span></div>
            <div class="network-node" data-node="4"
                 data-tooltip="Peace &amp; Harmony Lodge, Cape Dutch immigrants, Netherlandic Constitution."
                 style="left:29%;top:78%;">Dutch Brethren<span class="node-bond-count" data-badge="4">0/3</span></div>
            <div class="network-node" data-node="5"
                 data-tooltip="Athole Lodge, Scottish Constitution, followed the diamond rush from Cape Colony."
                 style="left:16%;top:38%;">Scottish Chapter<span class="node-bond-count" data-badge="5">0/2</span></div>
            <svg class="network-lines" id="network-lines"></svg>
            <div class="network-drag-hint" id="drag-hint">Click and drag from a node to begin</div>
          </div>
        </div>

      </div>

      <div class="pff" id="feedback">
        <div class="pff-main">
          <span class="material-symbols-outlined pff-icon">emergency_home</span>
          <p class="pff-text" id="feedback-text">Click and drag from one circle to another. Find <strong>6 real connections</strong>. You have 3 lives — tap the seal on the right to review your research.</p>
        </div>
      </div>

      <div class="puzzle-arc-float" id="puzzle-arc-float" role="button" tabindex="0" title="Open the Secret Archives">
        <div class="pendant-svg">${SVG_HANGING_PENDANT}</div>
        <span class="paf-label">Archives</span>
      </div>

    </div>
  `;

  container.innerHTML = html;
  window.scrollTo(0, 0);

  // ── Health system ────────────────────────────────────────────────────────────
  let lives = 3;
  const MAX_LIVES = 3;
  let correctStreak = 0;

  function renderHearts() {
    const bar = document.getElementById('health-bar');
    if (!bar) return;
    bar.innerHTML = renderFlames(lives, MAX_LIVES);
  }

  function loseLife() {
    if (lives <= 0 || completed) return;
    correctStreak = 0;
    const bar = document.getElementById('health-bar');
    const dyingFlame = bar ? [...bar.querySelectorAll('.svg-flame')][lives - 1] : null;
    function doDecrement() {
      lives--;
      renderHearts();
      gsap.fromTo('#health-bar', { x: -7 }, { x: 0, duration: 0.45, ease: 'elastic.out(1,0.3)' });
      const flash = document.createElement('div');
      flash.style.cssText = 'position:fixed;inset:0;background:rgba(120,0,0,0.22);pointer-events:none;z-index:99;';
      document.body.appendChild(flash);
      gsap.to(flash, { opacity: 0, duration: 0.6, ease: 'power2.out', onComplete: () => flash.remove() });
      if (lives === 0) setTimeout(handleGameOver, 600);
    }
    if (dyingFlame) {
      gsap.timeline()
        .to(dyingFlame, { scale: 1.7, duration: 0.18, ease: 'power2.out', transformOrigin: '50% 100%' })
        .to(dyingFlame, { scale: 0.05, opacity: 0, duration: 0.3, ease: 'power2.in', onComplete: doDecrement });
    } else {
      doDecrement();
    }
  }

  function gainLife() {
    if (lives >= MAX_LIVES || completed) return;
    lives++;
    renderHearts();
    gsap.fromTo('#health-bar .svg-flame', { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, stagger: 0.08, ease: 'back.out(2.5)' });
    document.getElementById('feedback-text').textContent = '+1 life restored, keep drawing!';
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
        <div class="go-icon-wrap go-eye-wrap">${SVG_RADIANT_DELTA}</div>
        <h2 class="go-heading">Out of Lives</h2>
        <div class="go-divider">
          <div class="go-divider-line"></div>
          <span class="go-divider-diamond">&#9670;</span>
          <div class="go-divider-line"></div>
        </div>
        <p class="go-body">You used all three lives. The puzzle resets — try again from the beginning.</p>
        <button class="go-try-btn" id="try-again-btn">Try Again</button>
        <button class="go-return-btn" id="back-to-lodge-btn">Return to the Lodge</button>
      </div>
    `;
    document.body.appendChild(overlay);
    gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.35 });
    gsap.fromTo('.game-over-card', { y: '-100%', opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, delay: 0.05, ease: 'power3.out' });
    document.getElementById('try-again-btn').addEventListener('click', () => {
      overlay.remove();
      initPuzzle3(container, clue, onBack, onNext, onArchives, unlocked);
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

  if (typeof onArchives === 'function') {
    document.getElementById('puzzle-arc-float')?.addEventListener('click', () => {
      cleanup();
      gsap.to('#screen-puzzle3', { opacity: 0, duration: 0.3, ease: 'power2.in', onComplete: onArchives });
    });
  }

  if (!unlocked) {
    const networkLayout = document.querySelector('.network-layout');
    if (networkLayout) networkLayout.classList.add('is-locked');
    const lockCard = document.createElement('div');
    lockCard.className = 'puzzle-lock-card';
    lockCard.innerHTML = `
      <h3 class="plc-title">Research Required</h3>
      <p class="plc-body">Open the Secret Archives to unlock this puzzle — tap the seal on the right side of the screen.</p>
    `;
    networkLayout?.after(lockCard);
    gsap.fromTo(lockCard, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', delay: 0.5 });
  }

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
      // Update tally
      const tally = document.getElementById('bonds-drawn-count');
      if (tally) tally.textContent = connections.length;
      checkStreak();
      const count = connections.length;
      if (count < correctConnections.length) {
        document.getElementById('feedback-text').textContent =
          `${count} of 6 bonds drawn. Keep going, use the hint button if you need a clue.`;
      }
      checkCompletion();
    } else {
      loseLife();
      drawWrongLine(fromNode, toNode);
      const ft = document.getElementById('feedback-text');
      ft.textContent = 'No bond exists between those two, try a different connection.';
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
    // Calligraphic gold line: thicker outer stroke + thinner highlight on top
    const outer = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    outer.setAttribute('x1', c1.x); outer.setAttribute('y1', c1.y);
    outer.setAttribute('x2', c2.x); outer.setAttribute('y2', c2.y);
    outer.setAttribute('stroke', '#8a6b1c');
    outer.setAttribute('stroke-width', '4');
    outer.setAttribute('stroke-linecap', 'round');
    outer.setAttribute('opacity', '0.85');
    linesSvg.appendChild(outer);

    const inner = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    inner.setAttribute('x1', c1.x); inner.setAttribute('y1', c1.y);
    inner.setAttribute('x2', c2.x); inner.setAttribute('y2', c2.y);
    inner.setAttribute('stroke', '#ecc246');
    inner.setAttribute('stroke-width', '1.6');
    inner.setAttribute('stroke-linecap', 'round');
    linesSvg.appendChild(inner);

    const length = inner.getTotalLength();
    gsap.fromTo([outer, inner],
      { strokeDasharray: length, strokeDashoffset: length },
      { strokeDashoffset: 0, duration: 0.7, ease: 'power2.out' }
    );

    // Travelling sparkle along the line
    const dotR = 3;
    const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    dot.setAttribute('r', dotR);
    dot.setAttribute('fill', '#f5e8c8');
    dot.setAttribute('cx', c1.x);
    dot.setAttribute('cy', c1.y);
    dot.setAttribute('opacity', '0.95');
    linesSvg.appendChild(dot);
    gsap.to(dot, {
      attr: { cx: c2.x, cy: c2.y },
      duration: 0.7, ease: 'power1.inOut',
      onComplete: () => gsap.to(dot, { opacity: 0, duration: 0.25, onComplete: () => dot.remove() })
    });
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

    document.getElementById('feedback-text').textContent = 'All 6 bonds drawn. The network is complete.';

    setTimeout(() => {
      showCompletionModal({
        title: 'All Six Bonds Found',
        body: "You mapped the real network. Seven Masonic lodges from three nations shared one building on Dutoitspan Road in Kimberley. The temple sat at the center. The traders dealt with both English and Dutch sides. Old loyalties tied the Dutch to the Scots. These six links held the whole community together.",
        clueLabel: '&#128279; The six bonds you uncovered',
        clueLines: [
          { icon: '⬡', text: 'Union Temple ↔ <em>English Craft</em>' },
          { icon: '⬡', text: 'Union Temple ↔ <em>Scottish Chapter</em>' },
          { icon: '⬡', text: 'Union Temple ↔ <em>Dutch Brethren</em>' },
          { icon: '⬡', text: 'English Craft ↔ <em>Diamond Traders</em>' },
          { icon: '⬡', text: 'Diamond Traders ↔ <em>Dutch Brethren</em>' },
          { icon: '⬡', text: 'Dutch Brethren ↔ <em>Scottish Chapter</em>' }
        ],
        btnLabel: 'See What You Found',
        onContinue: () => {
          if (typeof onNext === 'function') onNext();
        }
      });
    }, 800);
  }
}
