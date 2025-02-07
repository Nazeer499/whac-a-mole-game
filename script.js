const gameBoard = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const pointDisplay = document.getElementById('point-display');
const hitSound = new Audio('hit_sound.mp3');

let score = 0;
let timeLeft = 150;
let moleTimeout = null;
let gameActive = true;
let useSecondImage = false; // Tracks which image to show next

function initGame() {
  // Create game board with holes
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
  useSecondImage = false; // Start with first image
  updateScore();
  startTimer();
  spawnMole();
}

function spawnMole() {
  if (!gameActive) return;

  // Hide all moles first
  document.querySelectorAll('.mole').forEach(mole => {
    mole.classList.remove('active');
    mole.style.backgroundImage = '';
  });

  // Select random hole
  const holes = document.querySelectorAll('.mole-hole');
  const randomHole = holes[Math.floor(Math.random() * holes.length)];
  const currentMole = randomHole.querySelector('.mole');

  // Set appropriate image
  currentMole.style.backgroundImage = `url(${
    useSecondImage ? 'nazeer2.png' : 'nazeer.png'
  })`;

  // Show the mole
  currentMole.classList.add('active');

  // Set timeout to automatically hide and respawn
  moleTimeout = setTimeout(() => {
    currentMole.classList.remove('active');
    if (gameActive) spawnMole();
  }, Math.random() * 1000 + 500);
}

function handleClick(e) {
  if (!gameActive) return;

  const mole = e.target.closest('.mole');
  if (mole && mole.classList.contains('active')) {
    // Update score and UI
    score++;
    updateScore();
    mole.classList.remove('active');
    hitSound.play();
    showPointDisplay(e.clientX, e.clientY);

    // Toggle image for next mole
    useSecondImage = !useSecondImage;

    // Clear current timeout and spawn new mole immediately
    clearTimeout(moleTimeout);
    if (gameActive) spawnMole();
  }
}

function updateScore() {
  scoreDisplay.textContent = `Score: ${score.toString().padStart(4, '0')}`;
}

function showPointDisplay(x, y) {
  pointDisplay.style.left = `${x}px`;
  pointDisplay.style.top = `${y}px`;
  pointDisplay.style.opacity = '1';
  pointDisplay.classList.remove('hidden');
  
  setTimeout(() => {
    pointDisplay.style.opacity = '0';
  }, 1000);
}

function startTimer() {
  const timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Time: ${formatTime(timeLeft)}`;

    if (timeLeft <= 0) {
      gameActive = false;
      clearInterval(timer);
      endGame();
    }
  }, 1000);
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}

function endGame() {
  alert(`Game Over! Your final score is: ${score}`);
  location.reload();
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', initGame);
