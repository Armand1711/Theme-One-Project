import { initLanding } from './landing.js';
import { initPuzzleMenu } from './puzzleMenu.js';
import { initPuzzle1 } from './puzzle1.js';
import { initPuzzle2 } from './puzzle2.js';
import { initPuzzle3 } from './puzzle3.js';
import { initReflection } from './reflection.js';

const app = document.getElementById('app');
let completedPuzzles = 0;

function renderMenu() {
  initPuzzleMenu(app,
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
  if (step === 1) {
    initPuzzle1(app,
      () => {
        completedPuzzles = 1;
        startPuzzle(2);
      },
      () => {
        completedPuzzles = 1;
        startPuzzle(2);
      }
    );
  } else if (step === 2) {
    initPuzzle2(app,
      () => {
        completedPuzzles = completedPuzzles < 2 ? 2 : completedPuzzles;
        startPuzzle(3);
      },
      () => {
        completedPuzzles = completedPuzzles < 2 ? 2 : completedPuzzles;
        startPuzzle(3);
      }
    );
  } else if (step === 3) {
    initPuzzle3(app,
      () => {
        completedPuzzles = completedPuzzles < 3 ? 3 : completedPuzzles;
        initReflection(app, () => {
          completedPuzzles = 0;
          initLanding(app, () => renderMenu());
        });
      },
      () => {
        completedPuzzles = completedPuzzles < 3 ? 3 : completedPuzzles;
        initReflection(app, () => {
          completedPuzzles = 0;
          initLanding(app, () => renderMenu());
        });
      }
    );
  }
}

