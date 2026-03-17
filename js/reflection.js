export function initReflection(app, onRestart) {
  const html = `
    <div id="screen-reflection" class="screen active reflection-screen">
      <header>
        <h1>Reflection: Temple Rebuilt</h1>
        <p>You restored the 1886 Union Lodge Temple and unearthed the first hidden bond in the Kimberley story.</p>
      </header>

      <div class="reflection-summary">
        <div class="stat-card"><div class="num">4/4</div><div class="label">Correct moves</div></div>
        <div class="stat-card"><div class="num">1</div><div class="label">Bond revealed</div></div>
      </div>

      <div class="reflection-note">
        <h3>What this reveals</h3>
        <p>The restored Union Temple and shared resources reveal the first hidden bond: cooperation across immigrant and local lodge networks. Continue to the next puzzle to unlock the second bond.</p>
      </div>

      <button id="restart-journey" class="primary-btn">Back to Start</button>
    </div>
  `;

  app.innerHTML = html;
  document.getElementById('restart-journey').addEventListener('click', () => {
    onRestart?.();
  });
}
