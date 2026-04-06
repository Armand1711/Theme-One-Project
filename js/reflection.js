export function initReflection(app, onRestart) {
  const html = `
    <div id="screen-reflection">
      <div class="reflection-inner">
        <div class="reflection-eyebrow">
          <span class="eyebrow-line"></span>
          <span>The Journey Complete</span>
          <span class="eyebrow-line"></span>
        </div>
        <h1>Veiled Revelation</h1>
        <p class="reflection-subtitle">The hidden bonds of the 1886 Union Masonic Temple have been unveiled. Three threads of connection, now exposed to the light of discovery.</p>

        <div class="bonds-grid">
          <div class="bond-card">
            <div class="bond-num">Bond I</div>
            <div class="bond-icon">&#127963;</div>
            <div class="bond-title">The Silent Pact</div>
            <div class="bond-desc">Mutual aid wove the immigrant community together &mdash; a secret covenant of support that sustained the enclave through hardship and uncertainty in the diamond fields.</div>
          </div>
          <div class="bond-card">
            <div class="bond-num">Bond II</div>
            <div class="bond-icon">&#128275;</div>
            <div class="bond-title">Symbolic Alliances</div>
            <div class="bond-desc">Shared emblems encoded their agreements &mdash; symbols of unity, culture, and tradition that transcended language and bound diverse peoples together under one roof.</div>
          </div>
          <div class="bond-card">
            <div class="bond-num">Bond III</div>
            <div class="bond-icon">&#128376;</div>
            <div class="bond-title">The Web of Trust</div>
            <div class="bond-desc">An invisible network of relationships &mdash; between traders, merchants, guardians, and the temple itself &mdash; sustained the enclave through every economic trial.</div>
          </div>
        </div>

        <div class="reflection-stats">
          <div class="r-stat">
            <span class="r-stat-num">3/3</span>
            <span class="r-stat-label">Enigmas Solved</span>
          </div>
          <div class="r-stat">
            <span class="r-stat-num">3</span>
            <span class="r-stat-label">Bonds Unveiled</span>
          </div>
          <div class="r-stat">
            <span class="r-stat-num">1886</span>
            <span class="r-stat-label">Veiled History</span>
          </div>
        </div>

        <div class="reflection-quote">
          <blockquote>"The bonds that sustained them were not written in law, but whispered in trust &mdash; forged in the shadows of Kimberley's past, enduring long after the diamond dust had settled."</blockquote>
        </div>

        <button id="restart-journey" class="primary-btn">
          <span>Return to the Beginning</span>
          <span class="btn-arrow">&#8594;</span>
        </button>
      </div>
    </div>
  `;

  app.innerHTML = html;

  gsap.set('.reflection-eyebrow', { opacity: 0, y: -20 });
  gsap.set('#screen-reflection h1', { opacity: 0, y: 30, scale: 0.95 });
  gsap.set('.reflection-subtitle', { opacity: 0, y: 16 });
  gsap.set('.bond-card', { opacity: 0, y: 40, scale: 0.93 });
  gsap.set('.reflection-stats', { opacity: 0, y: 20 });
  gsap.set('.reflection-quote', { opacity: 0, y: 16 });
  gsap.set('#restart-journey', { opacity: 0, y: 16 });

  const tl = gsap.timeline({ delay: 0.3 });
  tl.to('.reflection-eyebrow', { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
    .to('#screen-reflection h1', { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out' }, '-=0.3')
    .to('.reflection-subtitle', { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4')
    .to('.bond-card', { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.15, ease: 'back.out(1.7)' }, '-=0.3')
    .to('.reflection-stats', { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2')
    .to('.reflection-quote', { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3')
    .to('#restart-journey', { opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.7)' }, '-=0.2');

  document.getElementById('restart-journey').addEventListener('click', () => {
    gsap.to('#screen-reflection', {
      opacity: 0, duration: 0.4, ease: 'power2.in',
      onComplete: () => onRestart?.()
    });
  });
}
