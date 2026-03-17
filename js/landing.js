export function initLanding(app, startMenu) {
  const html = `
    <div id="screen-landing" class="screen active">
      <header>
        <h1>CONNECT THE HIDDEN BONDS</h1>
        <p class="subtitle">1886, Kimberley: a small Masonic Temple becomes a hidden symbol of immigrant cooperation.</p>
      </header>

      <div class="hero-image"></div>

      <div class="stats">
        <div><strong>1886</strong><br>Union Lodge foundation</div>
        <div><strong>7 min</strong><br>Interactive learning</div>
        <div><strong>4 puzzles</strong><br>Heritage arc</div>
      </div>

      <div class="landing-copy">
        <p>Follow a linear hidden-bonds journey: restore the Temple, decode artifacts, connect symbols, and map networks to reveal how community ties sustained the lodge.</p>
      </div>

      <button id="start-discovery">
        <span class="btn-text">START DISCOVERY</span>
      </button>
    </div>
  `;

  app.innerHTML = html;

  // Animate elements in sequence
  gsap.set('#screen-landing header h1', { opacity: 0, y: 30 });
  gsap.set('.hero-image', { opacity: 0, scale: 0.9 });
  gsap.set('.stats', { opacity: 0, y: 20 });
  gsap.set('#start-discovery', { opacity: 0, y: 20 });

  const tl = gsap.timeline();
  tl.to('#screen-landing header h1', { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' })
    .to('.hero-image', { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' }, '-=0.4')
    .to('.stats', { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }, '-=0.3')
    .to('#start-discovery', { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2');

  document.getElementById('start-discovery').addEventListener('click', () => {
    startMenu();
  });
}
