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
        <p class="reflection-subtitle">You have done what historians have only begun to piece together. Three hidden bonds of the 1886 Union Masonic Temple &mdash; now exposed to the light of discovery.</p>

        <div class="reflection-discovery-bar">
          <div class="rdb-item">
            <span class="rdb-icon">&#127963;</span>
            <span class="rdb-text">126&ndash;128 Dutoitspan Road, Kimberley</span>
          </div>
          <div class="rdb-sep">&middot;</div>
          <div class="rdb-item">
            <span class="rdb-icon">&#128197;</span>
            <span class="rdb-text">Opened 15 August 1889</span>
          </div>
          <div class="rdb-sep">&middot;</div>
          <div class="rdb-item">
            <span class="rdb-icon">&#127959;</span>
            <span class="rdb-text">National Monument 1990</span>
          </div>
        </div>

        <div class="bonds-grid">
          <div class="bond-card">
            <div class="bond-num">Bond I</div>
            <div class="bond-icon">&#127963;</div>
            <div class="bond-title">The Silent Pact</div>
            <div class="bond-desc">Seven lodges from three rival national constitutions &mdash; English, Scottish, and Dutch &mdash; set aside their differences to raise one shared temple in Kimberley&rsquo;s diamond fields. Their debenture subscriptions funded every stone. This silent covenant of mutual aid sustained the enclave through hardship and wealth alike.</div>
          </div>
          <div class="bond-card">
            <div class="bond-num">Bond II</div>
            <div class="bond-icon">&#128275;</div>
            <div class="bond-title">Symbolic Alliances</div>
            <div class="bond-desc">The compass, the square, the arch, and the clasped hand &mdash; Masonic emblems became a shared language that transcended the babel of accents in the 1886 diamond rush. From Shanghai to Scotland, these symbols forged trust between strangers who arrived speaking different tongues but left as brothers under one roof.</div>
          </div>
          <div class="bond-card">
            <div class="bond-num">Bond III</div>
            <div class="bond-icon">&#128376;</div>
            <div class="bond-title">The Web of Trust</div>
            <div class="bond-desc">Cecil Rhodes donated its stained glass window. Diamond Traders on Dutoitspan Road &mdash; opposite the synagogue &mdash; funded its debentures. Dutch Brethren and Scottish Chapter shared its floors with English craftsmen. This invisible web sustained the enclave through every trial &mdash; and the Siege of Kimberley itself.</div>
          </div>
        </div>

        <div class="reflection-historical-note">
          <div class="rhn-eyebrow">&#128196; Did You Know</div>
          <p>During the Siege of Kimberley (1899&ndash;1900), the Great Hall of the Union Masonic Temple was commandeered as a fever hospital for British forces. The building that bound a community in brotherhood became a refuge in war &mdash; its hidden bonds stretching far beyond the lodge floor.</p>
        </div>

        <div class="reflection-stats">
          <div class="r-stat">
            <span class="r-stat-num">3/3</span>
            <span class="r-stat-label">Enigmas Solved</span>
          </div>
          <div class="r-stat">
            <span class="r-stat-num">7</span>
            <span class="r-stat-label">Lodges Unveiled</span>
          </div>
          <div class="r-stat">
            <span class="r-stat-num">1886</span>
            <span class="r-stat-label">Veiled History</span>
          </div>
          <div class="r-stat">
            <span class="r-stat-num">134</span>
            <span class="r-stat-label">Years Hidden</span>
          </div>
        </div>

        <div class="reflection-quote">
          <blockquote>&ldquo;The bonds that sustained them were not written in law, but whispered in trust &mdash; forged in the shadows of Kimberley&rsquo;s past, enduring long after the diamond dust had settled.&rdquo;</blockquote>
        </div>

        <div class="reflection-cta-group">
          <button id="restart-journey" class="primary-btn">
            <span>Relive the Discovery</span>
            <span class="btn-arrow">&#8594;</span>
          </button>
        </div>

      </div>
    </div>
  `;

  app.innerHTML = html;
  window.scrollTo(0, 0);

  gsap.set('.reflection-eyebrow',         { opacity: 0, y: -20 });
  gsap.set('#screen-reflection h1',       { opacity: 0, y: 30, scale: 0.95 });
  gsap.set('.reflection-subtitle',        { opacity: 0, y: 16 });
  gsap.set('.reflection-discovery-bar',   { opacity: 0, y: 12 });
  gsap.set('.bond-card',                  { opacity: 0, y: 40, scale: 0.93 });
  gsap.set('.reflection-historical-note', { opacity: 0, y: 20 });
  gsap.set('.reflection-stats',           { opacity: 0, y: 20 });
  gsap.set('.reflection-quote',           { opacity: 0, y: 16 });
  gsap.set('.reflection-cta-group',       { opacity: 0, y: 16 });

  const tl = gsap.timeline({ delay: 0.3 });
  tl.to('.reflection-eyebrow',         { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
    .to('#screen-reflection h1',       { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out' }, '-=0.3')
    .to('.reflection-subtitle',        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4')
    .to('.reflection-discovery-bar',   { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3')
    .to('.bond-card',                  { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.15, ease: 'back.out(1.7)' }, '-=0.2')
    .to('.reflection-historical-note', { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.2')
    .to('.reflection-stats',           { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3')
    .to('.reflection-quote',           { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3')
    .to('.reflection-cta-group',       { opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.7)' }, '-=0.2');

  document.getElementById('restart-journey').addEventListener('click', () => {
    gsap.to('#screen-reflection', {
      opacity: 0, duration: 0.4, ease: 'power2.in',
      onComplete: () => onRestart?.()
    });
  });
}
