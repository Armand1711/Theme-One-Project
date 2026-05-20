import {
  SVG_SQUARE_COMPASS,
  SVG_RADIANT_DELTA,
  SVG_HOURGLASS_COMPASS,
  SVG_PILLARS,
  SVG_WAX_SEAL,
  SVG_COMPASS_MARK,
  SVG_ENGRAVED_RULE
} from './svg-library.js';

export function initLanding(app, startMenu) {

  // Particle string, 14 floating gold motes
  const particles = Array.from({ length: 14 }, (_, i) => {
    const left = (i * 7 + 4) % 95 + Math.random() * 3;
    const dur  = 14 + Math.random() * 10;
    const delay = -Math.random() * dur;
    const dx   = (Math.random() - 0.5) * 80;
    const size = 2 + Math.random() * 2.5;
    return `<span class="hero-particle" style="
      left:${left}%;
      width:${size}px; height:${size}px;
      --dx:${dx}px;
      animation-duration:${dur}s;
      animation-delay:${delay}s;
    "></span>`;
  }).join('');

  const html = `
    <div id="screen-landing">

      <!-- ── Hero ── -->
      <div class="landing-hero">

        <!-- faint All-Seeing Eye behind the title -->
        <div class="hero-eye-bg">${SVG_RADIANT_DELTA}</div>

        <div class="hero-grain"></div>
        <div class="hero-particles">${particles}</div>

        <div class="hero-overlay">
          <div class="hero-content">

            <div class="hero-arch-icon-wrap">
              ${SVG_SQUARE_COMPASS}
            </div>

            <div class="hero-eyebrow">
              <span class="eyebrow-line"></span>
              <span class="eyebrow-text">KIMBERLEY &middot; 1886</span>
              <span class="eyebrow-line"></span>
            </div>

            <h1 class="hero-title">Connect the Hidden Bonds</h1>

            <p class="hero-tagline">
              Discover the secret bonds that built a city, one ritual at a time.
              Explore the echoes of the past within the stone walls of the Great Lodge.
            </p>

            <button id="start-discovery" class="hero-cta-btn">
              <span class="seal-svg-wrap">${SVG_WAX_SEAL}</span>
              <span class="seal-label">
                <span class="seal-label-eyebrow">ENTER</span>
                <span>The Lodge</span>
              </span>
            </button>

          </div>
        </div>
      </div>

      <!-- ── Context ── -->
      <div class="landing-context" id="landing-context">
        <div class="context-inner">

          <div class="context-eyebrow">
            <span class="ctx-eyebrow-line"></span>
            <span>The history, in plain language</span>
            <span class="ctx-eyebrow-line"></span>
          </div>
          <h2 class="context-heading">What is this about?</h2>

          <div class="context-story">
            <p>In <strong>1871</strong>, diamonds were discovered near Kimberley, South Africa. Thousands of people arrived from across the world. Scottish miners. Dutch traders. English merchants. All chasing the same opportunity. They were strangers who didn&rsquo;t share a language, a culture, or a history.</p>
            <p>Among them were <strong>Freemasons</strong>: members of a centuries-old brotherhood. Freemasonry works like a global club. Members share the same symbols, the same rituals, and a promise to help each other, regardless of where they come from. A Scottish Freemason and a Dutch Freemason might not speak the same language, but they recognise the same handshake and the same symbols.</p>
            <p>By <strong>1886</strong>, seven separate Masonic groups (some Scottish, some Dutch, some English) were all sharing one building in Kimberley: the <strong>Union Masonic Temple</strong> at 126 Dutoitspan Road. Historical records show that six specific bonds linked certain groups together. These connections quietly shaped how an entire immigrant city learned to function.</p>
            <p>This experience lets you <strong>explore that history through three puzzles</strong>. No prior knowledge needed. Everything you need to understand is explained as you go.</p>
          </div>

          <div class="context-grid">

            <div class="context-block">
              <div class="ctx-icon-wrap">${SVG_HOURGLASS_COMPASS}</div>
              <h3 class="ctx-block-title">A Brotherhood Across Time</h3>
              <p class="ctx-block-text">Freemasonry has existed for centuries. The same rituals practised in a Kimberley lodge in 1886 were being performed in lodges across Scotland, Holland, and England at the same time. That shared tradition is why strangers from different countries trusted each other instantly.</p>
              <span class="ctx-watermark">I</span>
              <span class="ctx-base"></span>
            </div>

            <div class="context-block">
              <div class="ctx-icon-wrap">${SVG_SQUARE_COMPASS}</div>
              <h3 class="ctx-block-title">A Language of Symbols</h3>
              <p class="ctx-block-text">Masonic lodges communicate through symbols, not just words. The compass, square, and level each carry a specific meaning. A Scottish miner and a Dutch trader might not share a spoken language, but they could read the same symbols and understand exactly what the other stood for.</p>
              <span class="ctx-watermark">II</span>
              <span class="ctx-base"></span>
            </div>

            <div class="context-block">
              <div class="ctx-icon-wrap">${SVG_PILLARS}</div>
              <h3 class="ctx-block-title">One Building, Many Nations</h3>
              <p class="ctx-block-text">The Union Masonic Temple at 126&ndash;128 Dutoitspan Road was built in 1886 and is still standing today. It was declared a National Monument in 1990. During the Siege of Kimberley in 1899, it was converted into a fever hospital. Through all of it, it remained the one place the different lodges shared.</p>
              <span class="ctx-watermark">III</span>
              <span class="ctx-base"></span>
            </div>

          </div>

          <div class="context-learn">
            <div class="ctx-learn-label">What you will do in the three puzzles</div>
            <div class="ctx-learn-grid">
              <div class="ctx-learn-item">
                <span class="ctx-learn-num">I</span>
                <div>
                  <div class="ctx-learn-title">Rebuild the Temple</div>
                  <div class="ctx-learn-text">Drag six photographic pieces of the 1886 building back into position and see what this landmark looked like at its height.</div>
                </div>
              </div>
              <div class="ctx-learn-item">
                <span class="ctx-learn-num">II</span>
                <div>
                  <div class="ctx-learn-title">Decode the Symbols</div>
                  <div class="ctx-learn-text">Match four Masonic symbols to the values they stand for. Each symbol represents a different bond between the lodges.</div>
                </div>
              </div>
              <div class="ctx-learn-item">
                <span class="ctx-learn-num">III</span>
                <div>
                  <div class="ctx-learn-title">Map the Connections</div>
                  <div class="ctx-learn-text">Draw the six historical bonds between the seven lodges to reveal the real network of trust that shaped Kimberley&rsquo;s society.</div>
                </div>
              </div>
            </div>
          </div>

          <div class="context-cta">
            <p class="ctx-ready-text">Ready? Each puzzle takes 2-3 minutes. You can go back at any time.</p>
            <button class="ctx-start-btn" id="ctx-start-btn">
              <span class="btn-text">Cross the Threshold</span>
              <span class="btn-arrow">&#10142;</span>
            </button>
          </div>

        </div>
      </div>

    </div>
  `;

  app.innerHTML = html;
  window.scrollTo(0, 0);

  // Hero entrance animation
  gsap.set('.hero-arch-icon-wrap', { opacity: 0, scale: 0.7 });
  gsap.set('.hero-eyebrow',        { opacity: 0, y: -12 });
  gsap.set('.hero-title',          { opacity: 0, y: 40, scale: 0.95 });
  gsap.set('.hero-tagline',        { opacity: 0, y: 20 });
  gsap.set('#start-discovery',     { opacity: 0, y: 20, scale: 0.9 });
  gsap.set('.landing-context',     { opacity: 0 });

  const tl = gsap.timeline({ delay: 0.2 });
  tl.to('.hero-arch-icon-wrap', { opacity: 1, scale: 1, duration: 0.9, ease: 'power3.out' })
    .to('.hero-eyebrow',        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4')
    .to('.hero-title',          { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out' }, '-=0.4')
    .to('.hero-tagline',        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.5')
    .to('#start-discovery',     { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'back.out(1.6)' }, '-=0.4');

  // Hero button, wax seal "crack" then scroll
  document.getElementById('start-discovery').addEventListener('click', (e) => {
    const btn = e.currentTarget;
    btn.classList.add('cracking');
    const ctx = document.getElementById('landing-context');
    gsap.to('.landing-context', { opacity: 1, duration: 0.7, ease: 'power2.out', delay: 0.2 });
    setTimeout(() => {
      ctx.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 350);
    setTimeout(() => btn.classList.remove('cracking'), 900);
  });

  // Context button → puzzle menu
  document.getElementById('ctx-start-btn').addEventListener('click', () => {
    gsap.to('#screen-landing', {
      opacity: 0, duration: 0.5, ease: 'power2.in',
      onComplete: startMenu
    });
  });

  // Context block entrance (when scrolled into view)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        gsap.fromTo(entry.target,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }
        );
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  gsap.set('.context-block, .context-learn, .context-cta', { opacity: 0 });
  document.querySelectorAll('.context-block').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.1}s`;
    observer.observe(el);
  });
  document.querySelectorAll('.context-learn, .context-cta').forEach(el => observer.observe(el));
}
