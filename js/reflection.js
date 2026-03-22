export function initReflection(app, onRestart) {
  const html = `
    <div id="screen-reflection" class="screen active reflection-screen">
      <header>
        <h1>Reflection: Veiled Revelation</h1>
        <p>The first enigma is solved. A hidden bond has been glimpsed in the shadows of history.</p>
      </header>

      <div class="reflection-summary">
        <div class="stat-card"><div class="num">4/4</div><div class="label">Fragments aligned</div></div>
        <div class="stat-card"><div class="num">1</div><div class="label">Bond unveiled</div></div>
      </div>

      <div class="reflection-note">
        <h3>The Whisper</h3>
        <p>The restored sanctuary reveals a bond forged in secrecy: mutual aid that sustained the enclave through trials unseen. What other threads lie hidden in the next riddle?</p>
      </div>

      <button id="restart-journey" class="primary-btn">Back to Start</button>
    </div>
  `;

  app.innerHTML = html;
  document.getElementById('restart-journey').addEventListener('click', () => {
    onRestart?.();
  });
}
