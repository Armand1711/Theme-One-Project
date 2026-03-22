export function initPuzzle3(container, onBack, onNext) {
  const html = `
    <div class="screen active">
      <header>
        <div class="puzzle-top-row">
          <div>
            <h1>Puzzle 3: Web of Whispers</h1>
            <p>Invisible threads connect the enclave. Trace them to reveal the final hidden bond.</p>
          </div>
          <button id="back-to-menu" class="back-btn">← Back</button>
        </div>
      </header>

      <div class="puzzle-intro">
        <div class="puzzle-tag">Enigmatic Network</div>
        <div class="puzzle-description">Connect the nodes of influence. Each link unveils a whisper of connection that bound the community in unseen ways.</div>
      </div>

      <div class="puzzle-layout">
        <div class="network-canvas" id="network-canvas">
          <div class="network-node" data-node="1" style="left: 20%; top: 20%;">Temple Lodge</div>
          <div class="network-node" data-node="2" style="left: 70%; top: 20%;">Immigrant Traders</div>
          <div class="network-node" data-node="3" style="left: 20%; top: 70%;">Local Merchants</div>
          <div class="network-node" data-node="4" style="left: 70%; top: 70%;">Cultural Guardians</div>
          <svg class="network-lines" id="network-lines"></svg>
        </div>
      </div>

      <p id="feedback">Tip: Click nodes to draw connections. Complete the web to reveal the final hidden bond.</p>
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

  const canvas = document.getElementById('network-canvas');
  const linesSvg = document.getElementById('network-lines');
  const nodes = document.querySelectorAll('.network-node');
  let selectedNode = null;
  let connections = [];

  const correctConnections = [
    { from: 1, to: 2 }, // Temple to Traders
    { from: 1, to: 3 }, // Temple to Merchants
    { from: 2, to: 4 }, // Traders to Guardians
    { from: 3, to: 4 }  // Merchants to Guardians
  ];

  nodes.forEach(node => {
    node.addEventListener('click', () => {
      if (!selectedNode) {
        selectedNode = node;
        node.classList.add('selected');
      } else if (selectedNode === node) {
        selectedNode.classList.remove('selected');
        selectedNode = null;
      } else {
        // Create connection
        const fromId = parseInt(selectedNode.dataset.node);
        const toId = parseInt(node.dataset.node);

        // Check if connection already exists
        const existing = connections.find(c => 
          (c.from === fromId && c.to === toId) || (c.from === toId && c.to === fromId)
        );

        if (!existing) {
          connections.push({ from: fromId, to: toId });
          drawLine(selectedNode, node);
          checkCompletion();
        }

        selectedNode.classList.remove('selected');
        selectedNode = null;
      }
    });
  });

  function drawLine(node1, node2) {
    const rect1 = node1.getBoundingClientRect();
    const rect2 = node2.getBoundingClientRect();
    const canvasRect = canvas.getBoundingClientRect();

    const x1 = rect1.left + rect1.width / 2 - canvasRect.left;
    const y1 = rect1.top + rect1.height / 2 - canvasRect.top;
    const x2 = rect2.left + rect2.width / 2 - canvasRect.left;
    const y2 = rect2.top + rect2.height / 2 - canvasRect.top;

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y2);
    line.setAttribute('stroke', '#b28d5a');
    line.setAttribute('stroke-width', '3');
    line.setAttribute('stroke-linecap', 'round');

    linesSvg.appendChild(line);

    // Animate line drawing
    gsap.fromTo(line, 
      { strokeDasharray: '0 100' }, 
      { strokeDasharray: '100 0', duration: 0.5, ease: 'power2.out' }
    );
  }

  function checkCompletion() {
    const correctCount = correctConnections.filter(correct => 
      connections.some(conn => 
        (conn.from === correct.from && conn.to === correct.to) ||
        (conn.from === correct.to && conn.to === correct.from)
      )
    ).length;

    if (correctCount === correctConnections.length) {
      const feedback = document.getElementById('feedback');
      feedback.innerHTML = `<strong>The web is complete.</strong><br><span>You've traced the final hidden bond: the intricate network of relationships that sustained the enclave through every trial.</span>`;
      gsap.fromTo(feedback, { opacity: 0, y: 20, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power2.out' });

      // Celebrate with node animations
      gsap.to('.network-node', {
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
  }
}
