import { initLanding }    from './landing.js';
import { initPuzzleMenu } from './puzzleMenu.js';
import { initPuzzle1 }    from './puzzle1.js';
import { initPuzzle2 }    from './puzzle2.js';
import { initPuzzle3 }    from './puzzle3.js';
import { initReflection } from './reflection.js';

const app = document.getElementById('app');
let completedPuzzles = 0;
let puzzle1Clue = null;
let puzzle2Clue = null;

function renderMenu() {
  initPuzzleMenu(
    app,
    () => startPuzzle(1),
    () => startPuzzle(2),
    () => startPuzzle(3),
    completedPuzzles
  );
}

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
          startPuzzle(2);
        }
      );
    } else if (step === 2) {
      initPuzzle2(
        app,
        puzzle1Clue,
        () => renderMenu(),
        (clue) => {
          puzzle2Clue = clue;
          completedPuzzles = Math.max(completedPuzzles, 2);
          startPuzzle(3);
        }
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
        }
      );
    }
  } catch (err) {
    console.error('Error starting puzzle ' + step + ':', err);
  }
}
