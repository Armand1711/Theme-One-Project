import { SVG_RADIANT_DELTA, SVG_STONE_ARCH, SVG_CORNER_FLOURISH } from './svg-library.js';

export function initReflection(app, onRestart) {

  const corners = `
    <span class="bond-corner tl">${SVG_CORNER_FLOURISH}</span>
    <span class="bond-corner tr">${SVG_CORNER_FLOURISH}</span>
    <span class="bond-corner bl">${SVG_CORNER_FLOURISH}</span>
    <span class="bond-corner br">${SVG_CORNER_FLOURISH}</span>
  `;

  const html = `
    <div id="screen-reflection">
      <div class="reflection-vignette"></div>
      <div class="reflection-arch-bg">${SVG_STONE_ARCH}</div>

      <div class="reflection-inner">

        <div class="reflection-delta">${SVG_RADIANT_DELTA}</div>

        <h1>You found the hidden network</h1>

        <div class="reflection-ritual-divider">
          <div class="rrd-line"></div>
          <span class="rrd-diamond">&#9670;</span>
          <div class="rrd-line"></div>
        </div>

        <div class="bonds-stack">

          <div class="bond-card" data-num="I">
            ${corners}
            <div class="bond-card-icon-badge material-symbols-outlined">architecture</div>
            <div class="bc-body">
              <span class="bond-card-label">DISCOVERY ONE</span>
              <span class="bond-num">Bond I</span>
              <div class="bond-title">One building, seven groups</div>
              <div class="bond-desc">Seven Masonic lodges from English, Scottish, and Dutch backgrounds pooled their money to build the Union Masonic Temple in 1886. None of them could afford it alone. So they did it together. That quiet act of cooperation is the first bond.</div>
            </div>
          </div>

          <div class="bond-card" data-num="II">
            ${corners}
            <div class="bond-card-icon-badge material-symbols-outlined">menu_book</div>
            <div class="bc-body">
              <span class="bond-card-label">DISCOVERY TWO</span>
              <span class="bond-num">Bond II</span>
              <div class="bond-title">A shared language of symbols</div>
              <div class="bond-desc">A Scottish miner and a Dutch trader didn&rsquo;t share a spoken language. But they recognized the same handshake, the same compass and square, the same flame. The symbols you decoded in Puzzle 2 were the common ground that held the brotherhood together.</div>
            </div>
          </div>

          <div class="bond-card" data-num="III">
            ${corners}
            <div class="bond-card-icon-badge material-symbols-outlined">account_balance</div>
            <div class="bc-body">
              <span class="bond-card-label">DISCOVERY THREE</span>
              <span class="bond-num">Bond III</span>
              <div class="bond-title">A real network of trust</div>
              <div class="bond-desc">The six connections you drew in Puzzle 3 are documented in real lodge records. Diamond traders financed it. Cecil Rhodes donated the stained glass. Cape Dutch immigrants prayed there. In a town of 30,000 strangers from twenty nations, this small building was where trust quietly grew.</div>
            </div>
          </div>

        </div>

        <button id="restart-journey" class="reflection-ghost-btn">
          Return to the Lodge
        </button>

      </div>
    </div>
  `;

  app.innerHTML = html;
  window.scrollTo(0, 0);

  gsap.set('.reflection-delta',          { opacity: 0, scale: 0.7 });
  gsap.set('#screen-reflection h1',      { opacity: 0, y: 30, scale: 0.95 });
  gsap.set('.reflection-ritual-divider', { opacity: 0, y: 12 });
  gsap.set('.bond-card',                 { opacity: 0, x: 60 });
  gsap.set('.reflection-ghost-btn',      { opacity: 0, y: 16 });
  gsap.set('.reflection-arch-bg',        { opacity: 0 });

  const tl = gsap.timeline({ delay: 0.2 });
  tl.to('.reflection-arch-bg',         { opacity: 1, duration: 1.2, ease: 'power2.out' })
    .to('.reflection-delta',           { opacity: 1, scale: 1, duration: 0.9, ease: 'back.out(1.5)' }, '-=1.0')
    .to('#screen-reflection h1',       { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out' }, '-=0.4')
    .to('.reflection-ritual-divider',  { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.4')
    .to('.bond-card',                  { opacity: 1, x: 0, duration: 0.7, stagger: 0.2, ease: 'power3.out' }, '-=0.2')
    .to('.reflection-ghost-btn',       { opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.7)' }, '-=0.2');

  document.getElementById('restart-journey').addEventListener('click', () => {
    gsap.to('#screen-reflection', {
      opacity: 0, duration: 0.4, ease: 'power2.in',
      onComplete: () => onRestart?.()
    });
  });
}
