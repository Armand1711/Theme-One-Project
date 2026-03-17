import { initLanding } from './landing.js';
import { initPuzzleMenu } from './puzzleMenu.js';
import { initPuzzle1 } from './puzzle1.js';
import { initReflection } from './reflection.js';

const app = document.getElementById('app');

document.addEventListener('DOMContentLoaded', () => {
  initLanding(app, () => {
    initPuzzleMenu(app, () => {
      initPuzzle1(app, () => {
        initReflection(app, () => initLanding(app, startMenu));
      }, () => initLanding(app, startMenu));
    }, () => alert('Puzzle 2 coming soon!'), () => alert('Puzzle 3 coming soon!'));
  });
});

function startMenu() {
  initPuzzleMenu(app, () => {
    initPuzzle1(app, () => {
      initReflection(app, () => initLanding(app, startMenu));
    }, () => initLanding(app, startMenu));
  }, () => alert('Puzzle 2 coming soon!'), () => alert('Puzzle 3 coming soon!'));
}
