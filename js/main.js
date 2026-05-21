import { initLanding }        from './landing.js';
import { initPuzzleMenu }     from './puzzleMenu.js';
import { initPuzzle1 }        from './puzzle1.js';
import { initPuzzle2 }        from './puzzle2.js';
import { initPuzzle3 }        from './puzzle3.js';
import { initReflection }     from './reflection.js';
import { initSecretArchives } from './secret_archives.js';
import { initLoginScreen }    from './loginScreen.js';
import { onAuthChange, signOut, getUserProfile, syncProgress } from './firebase.js';
import './immersion.js';

const app = document.getElementById('app');

let completedPuzzles = 0;
let puzzle1Clue      = null;
let puzzle2Clue      = null;
let currentUser      = null;
const puzzleUnlocked = { 1: false, 2: false, 3: false };

// ── Auth state ─────────────────────────────────────────────────────────────
// First call: page load. Subsequent null calls: sign-out.
let authInitialized = false;

onAuthChange(async (firebaseUser) => {
  if (!authInitialized) {
    authInitialized = true;
    if (firebaseUser) {
      const profile = await getUserProfile(firebaseUser.uid);
      currentUser = {
        uid:              firebaseUser.uid,
        name:             profile?.name             ?? 'Investigator',
        completedPuzzles: profile?.completedPuzzles ?? 0
      };
      completedPuzzles = currentUser.completedPuzzles;
      initLanding(app, () => renderMenu());
    } else {
      showLoginScreen();
    }
  } else if (!firebaseUser) {
    currentUser      = null;
    completedPuzzles = 0;
    puzzle1Clue      = null;
    puzzle2Clue      = null;
    Object.keys(puzzleUnlocked).forEach(k => { puzzleUnlocked[k] = false; });
    showLoginScreen();
  }
});

function showLoginScreen() {
  initLoginScreen(app, (userData) => {
    currentUser      = userData;
    completedPuzzles = userData.completedPuzzles;
    initLanding(app, () => renderMenu());
  });
}

// ── Menu ───────────────────────────────────────────────────────────────────
function renderMenu() {
  initPuzzleMenu(
    app,
    () => startPuzzle(1),
    () => startPuzzle(2),
    () => startPuzzle(3),
    completedPuzzles,
    () => initLanding(app, () => {
      completedPuzzles = 0;
      renderMenu();
    }),
    currentUser?.name ?? null,
    async () => { await signOut(); }
  );
}

// ── Archives ───────────────────────────────────────────────────────────────
function openArchivesForPuzzle(step) {
  const romans = ['I', 'II', 'III'];
  initSecretArchives(app, renderMenu, {
    step,
    roman: romans[step - 1],
    label: `Begin Enigma ${romans[step - 1]}`,
    onStart: (allRevealed) => {
      if (allRevealed) puzzleUnlocked[step] = true;
      startPuzzle(step);
    }
  });
}

function openArchivesFromPuzzle(step) {
  const romans = ['I', 'II', 'III'];
  initSecretArchives(app, renderMenu, {
    step,
    roman: romans[step - 1],
    label: `Return to Enigma ${romans[step - 1]}`,
    onStart: (allRevealed) => {
      if (allRevealed) puzzleUnlocked[step] = true;
      startPuzzle(step);
    }
  });
}

window.__openArchives = () => { initSecretArchives(app, renderMenu); };

// ── Puzzles ────────────────────────────────────────────────────────────────
function startPuzzle(step) {
  try {
    if (step === 1) {
      initPuzzle1(
        app,
        () => renderMenu(),
        (clue) => {
          puzzle1Clue      = clue;
          completedPuzzles = Math.max(completedPuzzles, 1);
          if (currentUser) syncProgress(currentUser.uid, completedPuzzles).catch(console.error);
          renderMenu();
        },
        () => openArchivesFromPuzzle(step),
        puzzleUnlocked[step]
      );
    } else if (step === 2) {
      initPuzzle2(
        app,
        puzzle1Clue,
        () => renderMenu(),
        (clue) => {
          puzzle2Clue      = clue;
          completedPuzzles = Math.max(completedPuzzles, 2);
          if (currentUser) syncProgress(currentUser.uid, completedPuzzles).catch(console.error);
          renderMenu();
        },
        () => openArchivesFromPuzzle(step),
        puzzleUnlocked[step]
      );
    } else if (step === 3) {
      initPuzzle3(
        app,
        puzzle2Clue,
        () => renderMenu(),
        () => {
          completedPuzzles = Math.max(completedPuzzles, 3);
          if (currentUser) syncProgress(currentUser.uid, completedPuzzles).catch(console.error);
          initReflection(app, () => {
            completedPuzzles = 0;
            puzzle1Clue      = null;
            puzzle2Clue      = null;
            initLanding(app, () => renderMenu());
          });
        },
        () => openArchivesFromPuzzle(step),
        puzzleUnlocked[step]
      );
    }
  } catch (err) {
    console.error('Error starting puzzle ' + step + ':', err);
  }
}
