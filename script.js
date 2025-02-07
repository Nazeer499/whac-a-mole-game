const gameBoard = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const pointDisplay = document.getElementById('point-display');
const hitSound = new Audio('hit_sound.mp3');

let score = 0;
let timeLeft = 150;
let moleTimeout = null;
let gameActive = true;

function initGame() {
  // Create game board
  for (let i = 0; i < 9; i++) {
    const hole = document.createElement('div');
    hole.className = 'mole-hole';
    const mole = document.createElement('div');
    mole.className = 'mole';
    hole.appendChild(mole);
    hole.addEventListener('click', handleClick);
    gameBoard.appendChild(hole);
  }

  startGame();
}

function startGame() {
  score = 0;
  timeLeft = 150;
  gameActive = true;
  updateScore();
  startTimer();
  spawnMole();
}

function spawnMole() {
  if (!gameActive) return;

  const holes = document.querySelectorAll('.mole-hole');
  holes.forEach(hole => hole.querySelector('.mole').classList.remove('active'));

  const randomHole = holes[Math.floor(Math.random() * holes.length)];
  const currentMole = randomHole.querySelector('.mole');
  currentMole.classList.add('active');

  // Set timeout to automatically hide mole
  moleTimeout = setTimeout(() => {
    currentMole.classList.remove('active');
    if (gameActive) spawnMole();
  }, Math.random() * 1000 + 500); // Random time between 500-1500ms
}

function handleClick(e) {
  if (!gameActive) return;
  
  const mole = e.target.closest('.mole');
  if (mole && mole.classList.contains('active')) {
    score++;
    updateScore();
    mole.classList.remove('active');
    hitSound.play();
    showPointDisplay(e.clientX, e.clientY);
    
    // Clear the current timeout and spawn new mole immediately
    clearTimeout(moleTimeout);
    if (gameActive) spawnMole();
  }
}

// ... rest of the code remains the same (updateScore, showPointDisplay, startTimer, etc.)
