import { initLanding }        from './landing.js';
import { initPuzzleMenu }     from './puzzleMenu.js';
import { initPuzzle1 }        from './puzzle1.js';
import { initPuzzle2 }        from './puzzle2.js';
import { initPuzzle3 }        from './puzzle3.js';
import { initReflection }     from './reflection.js';
import { initSecretArchives } from './secret_archives.js';
import './immersion.js';

const app = document.getElementById('app');
let completedPuzzles = 0;
let puzzle1Clue = null;
let puzzle2Clue = null;
const puzzleUnlocked = { 1: false, 2: false, 3: false };

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
    })
  );
}

// Open archives in "discover" mode — user reads context before starting a puzzle
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

// Open archives from inside a puzzle — "Return to Puzzle" button takes them back
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

// Wire the Secret Archives link (called by puzzleMenu via window.__openArchives)
window.__openArchives = () => {
  initSecretArchives(app, renderMenu);
};

document.addEventListener('DOMContentLoaded', () => {
  initLanding(app, () => {
    completedPuzzles = 0;
    renderMenu();
  });
});

function startPuzzle(step) {
  try {
    if (step === 1) {
      initPuzzle1(
        app,
        () => renderMenu(),
        (clue) => {
          puzzle1Clue = clue;
          completedPuzzles = Math.max(completedPuzzles, 1);
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
          puzzle2Clue = clue;
          completedPuzzles = Math.max(completedPuzzles, 2);
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
          initReflection(app, () => {
            completedPuzzles = 0;
            puzzle1Clue = null;
            puzzle2Clue = null;
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
