const COMPASS_SVG = `<svg class="ctx-icon-svg" viewBox="0 0 80 70" fill="none" xmlns="http://www.w3.org/2000/svg">
  <line x1="40" y1="6" x2="16" y2="62" stroke="#c9a227" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="40" y1="6" x2="64" y2="62" stroke="#c9a227" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M18 50 Q40 43 62 50" stroke="#c9a227" stroke-width="2" fill="none" stroke-linecap="round"/>
  <line x1="16" y1="24" x2="16" y2="62" stroke="#8c1f1f" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="16" y1="62" x2="64" y2="62" stroke="#8c1f1f" stroke-width="2.5" stroke-linecap="round"/>
  <circle cx="40" cy="6" r="3" fill="#c9a227"/>
</svg>`;

const BUILDING_SVG = `<svg class="ctx-icon-svg" viewBox="0 0 80 70" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="8" y="54" width="64" height="4" rx="1" stroke="#8c1f1f" stroke-width="2" fill="none"/>
  <rect x="18" y="30" width="8" height="24" rx="1" stroke="#8c1f1f" stroke-width="2" fill="none"/>
  <rect x="36" y="30" width="8" height="24" rx="1" stroke="#8c1f1f" stroke-width="2" fill="none"/>
  <rect x="54" y="30" width="8" height="24" rx="1" stroke="#8c1f1f" stroke-width="2" fill="none"/>
  <rect x="12" y="26" width="56" height="6" rx="1" stroke="#8c1f1f" stroke-width="2" fill="none"/>
  <path d="M10 26 L40 8 L70 26" stroke="#c9a227" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="40" cy="8" r="2.5" fill="#c9a227"/>
</svg>`;

const NETWORK_SVG = `<svg class="ctx-icon-svg" viewBox="0 0 80 70" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="40" cy="12" r="7" stroke="#c9a227" stroke-width="2.5" fill="none"/>
  <circle cx="14" cy="56" r="7" stroke="#8c1f1f" stroke-width="2" fill="none"/>
  <circle cx="66" cy="56" r="7" stroke="#8c1f1f" stroke-width="2" fill="none"/>
  <line x1="40" y1="19" x2="14" y2="49" stroke="#c9a227" stroke-width="1.8" stroke-linecap="round"/>
  <line x1="40" y1="19" x2="66" y2="49" stroke="#c9a227" stroke-width="1.8" stroke-linecap="round"/>
  <line x1="21" y1="56" x2="59" y2="56" stroke="#8c1f1f" stroke-width="1.8" stroke-dasharray="4 3" stroke-linecap="round"/>
</svg>`;

export function initLanding(app, startMenu) {
  const html = `
    <div id="screen-landing">

      <!-- ── Hero ── -->
      <div class="landing-hero">
        <div class="hero-grain"></div>
        <div class="hero-overlay">
          <nav class="hero-nav">
            <div class="hero-badge">SAHRA Heritage Discovery</div>
          </nav>
          <div class="hero-content">
            <div class="hero-eyebrow">
              <span class="eyebrow-line"></span>
              <span>Kimberley &middot; South Africa &middot; 1886</span>
              <span class="eyebrow-line"></span>
            </div>
            <h1 class="hero-title">ONE BUILDING.<br><span class="hero-title-accent">THREE NATIONS.</span></h1>
            <p class="hero-tagline">How did Scottish miners, Dutch traders, and English merchants &mdash; strangers in a foreign land &mdash; learn to trust each other? The answer is hidden inside a building that still stands today.</p>
            <div class="hero-dividers">
              <div class="hero-divider-line"></div>
              <div class="hero-divider-icon">&#9670;</div>
              <div class="hero-divider-line"></div>
            </div>
            <div class="hero-stats">
              <div class="hero-stat">
                <span class="stat-num">1886</span>
                <span class="stat-label">Year Built</span>
              </div>
              <div class="hero-stat-sep">&middot;</div>
              <div class="hero-stat">
                <span class="stat-num">7</span>
                <span class="stat-label">Groups</span>
              </div>
              <div class="hero-stat-sep">&middot;</div>
              <div class="hero-stat">
                <span class="stat-num">3</span>
                <span class="stat-label">Puzzles</span>
              </div>
            </div>
            <button id="start-discovery">
              <span class="btn-text">READ THE STORY FIRST</span>
              <span class="btn-arrow">&#8595;</span>
            </button>
          </div>
          <div class="hero-footer">
            <span>1886 Union Masonic Temple &middot; 126&ndash;128 Dutoitspan Road, Kimberley &middot; National Monument No.&nbsp;395</span>
          </div>
        </div>
      </div>

      <!-- ── Context: read before you play ── -->
      <div class="landing-context" id="landing-context">
        <div class="context-inner">

          <div class="context-eyebrow">
            <span class="ctx-eyebrow-line"></span>
            <span>&#9670;&nbsp; The history &mdash; in plain language &nbsp;&#9670;</span>
            <span class="ctx-eyebrow-line"></span>
          </div>
          <h2 class="context-heading">What is this about?</h2>

          <div class="context-story">
            <p>In <strong>1871</strong>, diamonds were discovered near Kimberley, South Africa. Thousands of people arrived from across the world &mdash; Scottish miners, Dutch traders, English merchants &mdash; all chasing the same opportunity. They were strangers who didn&rsquo;t share a language, a culture, or a history.</p>
            <p>Among them were <strong>Freemasons</strong>: members of a centuries-old brotherhood. Freemasonry works like a global club &mdash; members share the same symbols, the same rituals, and a promise to help each other, regardless of where they come from. A Scottish Freemason and a Dutch Freemason might not speak the same language, but they recognise the same handshake and the same symbols.</p>
            <p>By <strong>1886</strong>, seven separate Masonic groups &mdash; some Scottish, some Dutch, some English &mdash; were all sharing one building in Kimberley: the <strong>Union Masonic Temple</strong> at 126 Dutoitspan Road. Historical records show that six specific bonds linked certain groups together. These connections quietly shaped how an entire immigrant city learned to function.</p>
            <p>This experience lets you <strong>explore that history through three puzzles</strong>. No prior knowledge needed &mdash; everything you need to understand is explained as you go.</p>
          </div>

          <div class="context-grid">
            <div class="context-block">
              <div class="ctx-icon">${COMPASS_SVG}</div>
              <h3 class="ctx-block-title">What is Freemasonry?</h3>
              <p class="ctx-block-text">Think of it as a global brotherhood with a shared language of symbols and rituals. Members &mdash; called Masons &mdash; join a local group called a &ldquo;lodge&rdquo; and make oaths to help each other. The symbols they use (like the compass and square) mean the same thing in every country, which made Freemasonry one of the few ways different nationalities could connect in colonial Kimberley.</p>
            </div>
            <div class="context-block">
              <div class="ctx-icon">${BUILDING_SVG}</div>
              <h3 class="ctx-block-title">The 1886 Union Temple</h3>
              <p class="ctx-block-text">Built between 1886 and 1889 at 126&ndash;128 Dutoitspan Road, this Roman Corinthian building was shared by seven lodges from three different countries. It&rsquo;s still standing in Kimberley today and was declared a <strong>National Monument in 1990</strong> by the South African government &mdash; a recognition of just how significant this place was to the city&rsquo;s history.</p>
            </div>
            <div class="context-block">
              <div class="ctx-icon">${NETWORK_SVG}</div>
              <h3 class="ctx-block-title">The Six Bonds</h3>
              <p class="ctx-block-text">The seven lodges were not all equally connected. Archives from the 1880s reveal six specific relationships between certain groups &mdash; based on shared members, business dealings, and ritual ties. These six bonds formed a network of trust that held Kimberley&rsquo;s immigrant community together during one of the most turbulent periods in South African history.</p>
            </div>
          </div>

          <div class="context-learn">
            <div class="ctx-learn-label">&#9670;&nbsp; What you will do in the three puzzles</div>
            <div class="ctx-learn-grid">
              <div class="ctx-learn-item">
                <span class="ctx-learn-num">01</span>
                <div>
                  <div class="ctx-learn-title">Rebuild the Temple</div>
                  <div class="ctx-learn-text">Drag six photographic pieces of the 1886 building back into position and see what this landmark looked like at its height.</div>
                </div>
              </div>
              <div class="ctx-learn-item">
                <span class="ctx-learn-num">02</span>
                <div>
                  <div class="ctx-learn-title">Decode the Symbols</div>
                  <div class="ctx-learn-text">Match four Masonic symbols to the values they stand for. Each symbol represents a different bond between the lodges.</div>
                </div>
              </div>
              <div class="ctx-learn-item">
                <span class="ctx-learn-num">03</span>
                <div>
                  <div class="ctx-learn-title">Map the Connections</div>
                  <div class="ctx-learn-text">Draw the six historical bonds between the seven lodges to reveal the real network of trust that shaped Kimberley&rsquo;s society.</div>
                </div>
              </div>
            </div>
          </div>

          <div class="context-cta">
            <p class="ctx-ready-text">Ready? Each puzzle takes 2&ndash;3 minutes. You can go back at any time.</p>
            <button class="ctx-start-btn" id="ctx-start-btn">
              <span class="btn-text">START THE FIRST PUZZLE</span>
              <span class="btn-arrow">&#8594;</span>
            </button>
          </div>

        </div>
      </div>

    </div>
  `;

  app.innerHTML = html;
  window.scrollTo(0, 0);

  // Hero entrance animation
  gsap.set('.hero-eyebrow',    { opacity: 0, y: -16 });
  gsap.set('.hero-title',      { opacity: 0, y: 50, scale: 0.94 });
  gsap.set('.hero-tagline',    { opacity: 0, y: 20 });
  gsap.set('.hero-dividers',   { opacity: 0, scaleX: 0 });
  gsap.set('.hero-stats',      { opacity: 0, y: 16 });
  gsap.set('#start-discovery', { opacity: 0, y: 20, scale: 0.95 });
  gsap.set('.hero-footer',     { opacity: 0 });
  gsap.set('.landing-context', { opacity: 0 });

  const tl = gsap.timeline({ delay: 0.3 });
  tl.to('.hero-eyebrow',    { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' })
    .to('.hero-title',      { opacity: 1, y: 0, scale: 1, duration: 1.0, ease: 'power3.out' }, '-=0.3')
    .to('.hero-tagline',    { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.6')
    .to('.hero-dividers',   { opacity: 1, scaleX: 1, duration: 0.6, ease: 'power2.out' }, '-=0.5')
    .to('.hero-stats',      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.4')
    .to('#start-discovery', { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.7)' }, '-=0.3')
    .to('.hero-footer',     { opacity: 0.5, duration: 0.5 }, '-=0.2');

  // Hero button scrolls to context section and fades it in
  document.getElementById('start-discovery').addEventListener('click', () => {
    const ctx = document.getElementById('landing-context');
    gsap.to('.landing-context', { opacity: 1, duration: 0.5, ease: 'power2.out' });
    ctx.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // Context button goes to puzzle menu
  document.getElementById('ctx-start-btn').addEventListener('click', () => {
    gsap.to('#screen-landing', {
      opacity: 0, duration: 0.5, ease: 'power2.in',
      onComplete: startMenu
    });
  });
}
