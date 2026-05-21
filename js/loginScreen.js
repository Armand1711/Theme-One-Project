import { signUp, signIn, saveUserProfile, getUserProfile } from './firebase.js';

export function initLoginScreen(app, onAuthenticated) {
  app.innerHTML = `
    <div class="auth-screen" id="auth-screen">
      <div class="auth-bg-veil"></div>
      <div class="auth-card" id="auth-card">

        <div class="auth-ornament">
          <span class="auth-diamond">◆</span>
          <div class="auth-ornament-line"></div>
          <span class="auth-diamond">◆</span>
        </div>

        <h1 class="auth-title">The Investigator's Registry</h1>
        <p class="auth-sub">Identify yourself to access the classified archives</p>

        <div class="auth-divider"></div>

        <form class="auth-form" id="auth-form" novalidate>

          <div class="auth-field" id="auth-name-wrap">
            <label class="auth-label" for="auth-name">Investigator Name</label>
            <input class="auth-input" type="text" id="auth-name"
              placeholder="Your full name" autocomplete="name" />
          </div>

          <div class="auth-field">
            <label class="auth-label" for="auth-email">Contact Address</label>
            <input class="auth-input" type="email" id="auth-email"
              placeholder="email@domain.com" autocomplete="email" />
          </div>

          <div class="auth-field">
            <label class="auth-label" for="auth-password">Secret Passphrase</label>
            <input class="auth-input" type="password" id="auth-password"
              placeholder="6+ characters" autocomplete="current-password" />
          </div>

          <p class="auth-error" id="auth-error"></p>

          <button class="auth-submit" type="submit" id="auth-submit">
            Enter the Archive
          </button>

        </form>

        <button class="auth-toggle" id="auth-toggle">
          Already initiated? Sign in
        </button>

      </div>
    </div>
  `;

  let isRegister = true;

  const nameWrap  = document.getElementById('auth-name-wrap');
  const errorEl   = document.getElementById('auth-error');
  const submitBtn = document.getElementById('auth-submit');
  const toggleBtn = document.getElementById('auth-toggle');
  const form      = document.getElementById('auth-form');

  function setMode(register) {
    isRegister            = register;
    nameWrap.style.display = register ? 'flex' : 'none';
    submitBtn.textContent  = register ? 'Enter the Archive' : 'Return to the Archive';
    toggleBtn.textContent  = register
      ? 'Already initiated? Sign in'
      : 'New investigator? Register';
    errorEl.textContent = '';
  }

  toggleBtn.addEventListener('click', () => setMode(!isRegister));

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorEl.textContent = '';

    const email    = document.getElementById('auth-email').value.trim();
    const password = document.getElementById('auth-password').value;
    const name     = document.getElementById('auth-name').value.trim();

    if (!email || !password) {
      errorEl.textContent = 'Please fill in all fields.';
      return;
    }
    if (isRegister && !name) {
      errorEl.textContent = 'Enter your investigator name.';
      return;
    }

    submitBtn.disabled    = true;
    submitBtn.textContent = 'Verifying…';

    try {
      if (isRegister) {
        const cred = await signUp(email, password);
        await saveUserProfile(cred.user.uid, { name, email });
        onAuthenticated({ uid: cred.user.uid, name, completedPuzzles: 0 });
      } else {
        const cred    = await signIn(email, password);
        const profile = await getUserProfile(cred.user.uid);
        onAuthenticated({
          uid:              cred.user.uid,
          name:             profile?.name             ?? 'Investigator',
          completedPuzzles: profile?.completedPuzzles ?? 0
        });
      }
    } catch (err) {
      errorEl.textContent   = friendlyError(err.code);
      submitBtn.disabled    = false;
      submitBtn.textContent = isRegister ? 'Enter the Archive' : 'Return to the Archive';
    }
  });

  try {
    gsap.fromTo('#auth-card',
      { opacity: 0, y: 40, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'back.out(1.4)' }
    );
  } catch (_) {}
}

function friendlyError(code) {
  const map = {
    'auth/email-already-in-use': 'This address is already registered. Sign in instead.',
    'auth/invalid-email':        'Invalid email address.',
    'auth/weak-password':        'Passphrase must be at least 6 characters.',
    'auth/user-not-found':       'No investigator found with that address.',
    'auth/wrong-password':       'Incorrect passphrase.',
    'auth/invalid-credential':   'Incorrect email or passphrase.',
    'auth/too-many-requests':    'Too many attempts — please wait and try again.',
  };
  return map[code] ?? 'Authentication failed. Please try again.';
}
