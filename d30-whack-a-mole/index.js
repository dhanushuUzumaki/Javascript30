const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let lastHole;
let timeout = false;
let score = 0;

const randomTime = (min, max) => Math.round(Math.random() * (max - min) + min);

const randomHole = holes => {
  const index = Math.floor(Math.random() * holes.length);
  const hole = holes[index];
  if (hole === lastHole) {
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
};

const peep = () => {
  const time = randomTime(200, 1000);
  const hole = randomHole(holes);
  hole.classList.add('up');
  setTimeout(() => {
    hole.classList.remove('up');
    if (!timeout) peep();
  }, time);
};

const startGame = () => {
  scoreBoard.textContent = '0';
  timeout = false;
  score = 0;
  peep();
  setTimeout(() => timeout = true, 10000);
};

const bonk = function (e) {
  if (!e.isTrusted) return;
  score++;
  this.classList.remove('up');
  scoreBoard.textContent = score;
};

moles.forEach(mole => mole.addEventListener('click', bonk));