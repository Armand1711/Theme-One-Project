export function initReflection(app, onRestart) {
  const html = `
    <div id="screen-reflection">
      <div class="reflection-vignette"></div>
      <div class="reflection-inner">

        <span class="reflection-eye material-symbols-outlined">visibility</span>

        <h1>You have seen what was hidden</h1>

        <div class="reflection-ritual-divider">
          <div class="rrd-line"></div>
          <span class="rrd-diamond">◆</span>
          <div class="rrd-line"></div>
        </div>

        <div class="bonds-stack">

          <div class="bond-card">
            <span class="bc-star material-symbols-outlined">star</span>
            <div class="bond-card-icon-badge material-symbols-outlined">architecture</div>
            <div class="bc-body">
              <span class="bond-card-label">CONNECTION ESTABLISHED</span>
              <span class="bond-num">Bond I</span>
              <div class="bond-title">The Silent Pact</div>
              <div class="bond-desc">Seven lodges from three rival national constitutions &mdash; English, Scottish, and Dutch &mdash; set aside their differences to raise one shared temple. Their debenture subscriptions funded every stone. This silent covenant of mutual aid sustained the enclave through hardship and wealth alike.</div>
            </div>
          </div>

          <div class="bond-card">
            <span class="bc-star material-symbols-outlined">star</span>
            <div class="bond-card-icon-badge material-symbols-outlined">menu_book</div>
            <div class="bc-body">
              <span class="bond-card-label">CHRONICLE UNLOCKED</span>
              <span class="bond-num">Bond II</span>
              <div class="bond-title">Symbolic Alliances</div>
              <div class="bond-desc">The compass, the square, the arch, and the clasped hand &mdash; Masonic emblems became a shared language that transcended the babel of accents in the 1886 diamond rush. These symbols forged trust between strangers who arrived speaking different tongues but left as brothers under one roof.</div>
            </div>
          </div>

          <div class="bond-card">
            <span class="bc-star material-symbols-outlined">star</span>
            <div class="bond-card-icon-badge material-symbols-outlined">account_balance</div>
            <div class="bc-body">
              <span class="bond-card-label">SANCTUM ACCESS</span>
              <span class="bond-num">Bond III</span>
              <div class="bond-title">The Web of Trust</div>
              <div class="bond-desc">Cecil Rhodes donated its stained glass window. Diamond traders opposite the synagogue funded its debentures. Dutch Brethren and Scottish Chapter shared its floors with English craftsmen. This invisible web sustained the enclave through every trial &mdash; and the Siege of Kimberley itself.</div>
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

  gsap.set('.reflection-eye',             { opacity: 0, scale: 0.7 });
  gsap.set('#screen-reflection h1',       { opacity: 0, y: 30, scale: 0.95 });
  gsap.set('.reflection-ritual-divider',  { opacity: 0, y: 12 });
  gsap.set('.bond-card',                  { opacity: 0, y: 40, scale: 0.93 });
  gsap.set('.reflection-ghost-btn',       { opacity: 0, y: 16 });

  const tl = gsap.timeline({ delay: 0.3 });
  tl.to('.reflection-eye',            { opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.7)' })
    .to('#screen-reflection h1',      { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out' }, '-=0.3')
    .to('.reflection-ritual-divider', { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.4')
    .to('.bond-card',                  { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.15, ease: 'back.out(1.7)' }, '-=0.2')
    .to('.reflection-ghost-btn',       { opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.7)' }, '-=0.2');

  document.getElementById('restart-journey').addEventListener('click', () => {
    gsap.to('#screen-reflection', {
      opacity: 0, duration: 0.4, ease: 'power2.in',
      onComplete: () => onRestart?.()
    });
  });
}
