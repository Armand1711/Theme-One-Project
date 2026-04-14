export function initLanding(app, startMenu) {
  const html = `
    <div id="screen-landing">
      <div class="landing-hero">
        <div class="hero-grain"></div>
        <div class="hero-overlay">
          <nav class="hero-nav">
            <div class="hero-badge">SAHRA Heritage Discovery</div>
          </nav>
          <div class="hero-content">
            <div class="hero-eyebrow">
              <span class="eyebrow-line"></span>
              <span>Kimberley &middot; 1886 &middot; National Monument</span>
              <span class="eyebrow-line"></span>
            </div>
            <h1 class="hero-title">CONNECT THE<br><span class="hero-title-accent">HIDDEN BONDS</span></h1>
            <p class="hero-tagline">A building still stands on Dutoitspan Road. The secrets it kept for over a century are about to be yours.</p>
            <div class="hero-dividers">
              <div class="hero-divider-line"></div>
              <div class="hero-divider-icon">&#10022;</div>
              <div class="hero-divider-line"></div>
            </div>
            <div class="hero-stats">
              <div class="hero-stat">
                <span class="stat-num">3</span>
                <span class="stat-label">Enigmas</span>
              </div>
              <div class="hero-stat-sep">&middot;</div>
              <div class="hero-stat">
                <span class="stat-num">7</span>
                <span class="stat-label">Lodges</span>
              </div>
              <div class="hero-stat-sep">&middot;</div>
              <div class="hero-stat">
                <span class="stat-num">1</span>
                <span class="stat-label">Discovery</span>
              </div>
            </div>
            <p class="hero-copy">In 1886, seven lodges from three nations raised one building in Kimberley&rsquo;s diamond fields. The bonds that held them &mdash; immigrant traders, Scottish brethren, Dutch craftsmen, English founders &mdash; were never written in law. They were whispered in trust. Three enigmas guard their story. <em>Will you uncover it?</em></p>
            <button id="start-discovery">
              <span class="btn-text">BEGIN THE DISCOVERY</span>
              <span class="btn-arrow">&#8594;</span>
            </button>
          </div>
          <div class="hero-footer">
            <span>1886 Union Masonic Temple &middot; 126&ndash;128 Dutoitspan Road, Kimberley &middot; National Monument</span>
          </div>
        </div>
      </div>
    </div>
  `;

  app.innerHTML = html;

  gsap.set('.hero-eyebrow',    { opacity: 0, y: -16 });
  gsap.set('.hero-title',      { opacity: 0, y: 50, scale: 0.94 });
  gsap.set('.hero-tagline',    { opacity: 0, y: 20 });
  gsap.set('.hero-dividers',   { opacity: 0, scaleX: 0 });
  gsap.set('.hero-stats',      { opacity: 0, y: 16 });
  gsap.set('.hero-copy',       { opacity: 0, y: 16 });
  gsap.set('#start-discovery', { opacity: 0, y: 20, scale: 0.95 });
  gsap.set('.hero-footer',     { opacity: 0 });

  const tl = gsap.timeline({ delay: 0.4 });
  tl.to('.hero-eyebrow',    { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' })
    .to('.hero-title',      { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: 'power3.out' }, '-=0.3')
    .to('.hero-tagline',    { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.6')
    .to('.hero-dividers',   { opacity: 1, scaleX: 1, duration: 0.7, ease: 'power2.out' }, '-=0.5')
    .to('.hero-stats',      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4')
    .to('.hero-copy',       { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4')
    .to('#start-discovery', { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.7)' }, '-=0.3')
    .to('.hero-footer',     { opacity: 0.5, duration: 0.6 }, '-=0.2');

  document.getElementById('start-discovery').addEventListener('click', () => {
    gsap.to('.hero-content', { opacity: 0, y: -20, duration: 0.4, ease: 'power2.in' });
    gsap.to('#screen-landing', {
      opacity: 0, duration: 0.6, delay: 0.2, ease: 'power2.in',
      onComplete: startMenu
    });
  });
}
