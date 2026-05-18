/* ═══════════════════════════════════════════════════════════════════════════
   immersion.js — global atmospheric layer
   ─────────────────────────────────────────────────────────────────────────
   • Ambient gold-mote particles drifting up the entire page
   • Cursor-following gold orb (subtle, delayed)
   • Scroll-cued reveals — sections rise into view as they enter the viewport
   • Edge vignette + film grain overlay
   • Init once; mounts a fixed-position overlay above body but below content.
   ═══════════════════════════════════════════════════════════════════════ */

(function () {
  if (window.__immersionMounted) return;
  window.__immersionMounted = true;

  /* ─── Atmospheric overlay layer (fixed) ──────────────────────────────── */
  const atm = document.createElement('div');
  atm.className = 'om-atm';
  atm.innerHTML = `
    <div class="om-grain"></div>
    <div class="om-vignette"></div>
    <div class="om-particles" id="om-particles"></div>
    <div class="om-orb"></div>
  `;
  document.body.appendChild(atm);

  /* ─── Ambient particles ──────────────────────────────────────────────── */
  const particles = document.getElementById('om-particles');
  const count = window.innerWidth < 720 ? 8 : 14;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('span');
    p.className = 'om-particle';
    const left   = Math.random() * 100;
    const size   = 1.5 + Math.random() * 2.5;
    const dur    = 18 + Math.random() * 18;
    const delay  = -Math.random() * dur;
    const drift  = (Math.random() - 0.5) * 80;
    p.style.cssText = `
      left:${left}%;
      width:${size}px; height:${size}px;
      --dx:${drift}px;
      animation-duration:${dur}s;
      animation-delay:${delay}s;
    `;
    particles.appendChild(p);
  }

  /* ─── Cursor-following gold orb ──────────────────────────────────────── */
  const orb = atm.querySelector('.om-orb');
  let tx = window.innerWidth / 2, ty = window.innerHeight / 2;
  let cx = tx, cy = ty;
  window.addEventListener('mousemove', (e) => {
    tx = e.clientX; ty = e.clientY;
  });
  function tick() {
    cx += (tx - cx) * 0.08;
    cy += (ty - cy) * 0.08;
    orb.style.transform = `translate3d(${cx - 200}px, ${cy - 200}px, 0)`;
    requestAnimationFrame(tick);
  }
  tick();

  /* ─── Scroll-cued reveal ─────────────────────────────────────────────── */
  const revealSelectors = [
    '.context-block', '.context-learn', '.context-cta',
    '.bond-card',
    '.archives-doc', '.archives-bento'
  ];

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('om-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -80px 0px' });

  function arm() {
    revealSelectors.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        if (el.classList.contains('om-cued') || el.classList.contains('om-revealed')) return;
        el.classList.add('om-cued');
        observer.observe(el);
      });
    });
  }

  /* Re-scan when innerHTML changes (puzzles & tabs swap). MutationObserver
     keeps watch over #app so newly-rendered screens get the reveal treatment. */
  const mo = new MutationObserver(() => {
    requestAnimationFrame(arm);
  });
  const app = document.getElementById('app');
  if (app) mo.observe(app, { childList: true, subtree: true });
  arm();

  /* ─── Doc-card cursor-tracked glow (Archives) ────────────────────────── */
  document.addEventListener('mousemove', (e) => {
    const card = e.target.closest && e.target.closest('.archives-doc, .ic-card.ic-available');
    if (!card) return;
    const r = card.getBoundingClientRect();
    const mx = ((e.clientX - r.left) / r.width) * 100;
    const my = ((e.clientY - r.top) / r.height) * 100;
    card.style.setProperty('--mx', mx + '%');
    card.style.setProperty('--my', my + '%');
  });
})();
