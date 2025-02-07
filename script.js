// Select DOM elements
const gameBoard = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');

// Game variables
let score = 0;
let timeLeft = 150; // 2 minutes 30 seconds
let moleInterval;

// Initialize the game board
function initGame() {
  for (let i = 0; i < 9; i++) {
    const hole = document.createElement('div');
    hole.classList.add('mole-hole');
    hole.addEventListener('click', handleMoleClick);
    gameBoard.appendChild(hole);
  }

  startGame();
}

// Start the game
function startGame() {
  score = 0;
  timeLeft = 150;
  scoreDisplay.textContent = `Score: ${String(score).padStart(4, '0')}`;
  timerDisplay.textContent = `Time: ${formatTime(timeLeft)}`;

  spawnMole();
  startTimer();
}

// Spawn a mole in a random hole
function spawnMole() {
  clearInterval(moleInterval); // Clear previous interval

  const holes = document.querySelectorAll('.mole-hole');
  const randomHole = holes[Math.floor(Math.random() * holes.length)];

  // Remove any existing mole
  holes.forEach(hole => hole.classList.remove('mole'));

  // Add the mole class to the random hole
  randomHole.classList.add('mole');

  // Randomly remove the mole after a short delay
  moleInterval = setTimeout(() => {
    randomHole.classList.remove('mole');
    if (timeLeft > 0) spawnMole(); // Continue spawning if time remains
  }, Math.random() * 1000 + 500); // Random delay between 500ms and 1500ms
}

// Handle mole click
function handleMoleClick(event) {
  if (event.target.classList.contains('mole')) {
    score++;
    scoreDisplay.textContent = `Score: ${String(score).padStart(4, '0')}`;
    event.target.classList.remove('mole'); // Remove the mole immediately
  }
}

// Start the timer
function startTimer() {
  const timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Time: ${formatTime(timeLeft)}`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      endGame();
    }
  }, 1000);
}

// Format time as MM:SS
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

// End the game
function endGame() {
  alert(`Game Over! Your final score is ${score}`);
  location.reload(); // Restart the game
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', initGame);
