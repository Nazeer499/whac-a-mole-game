// Select DOM elements
const gameBoard = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');

// Load sound effect
const hitSound = new Audio('hit_sound.mp3'); // Replace with your actual sound file

// Game variables
let score = 0;
let timeLeft = 150; // 2 minutes 30 seconds
let gameInterval;
let moleTimeout;

// Initialize the game board
function initGame() {
  for (let i = 0; i < 9; i++) {
    const hole = document.createElement('div');
    hole.classList.add('mole-hole');
    
    // Create an empty mole div inside each hole
    const mole = document.createElement('div');
    mole.classList.add('mole');
    mole.style.display = "none"; // Initially hidden
    hole.appendChild(mole);
    
    hole.addEventListener('click', handleMoleClick);
    gameBoard.appendChild(hole);
  }

  startGame();
}

// Start the game
function startGame() {
  score = 0;
  timeLeft = 150;
  updateScore();
  updateTimer();

  spawnMole();
  startTimer();
}

// Spawn a mole in a random hole
function spawnMole() {
  clearTimeout(moleTimeout); // Clear previous timeout

  const holes = document.querySelectorAll('.mole-hole');
  holes.forEach(hole => hole.firstChild.style.display = 'none'); // Hide existing moles

  const randomHole = holes[Math.floor(Math.random() * holes.length)];
  const mole = randomHole.firstChild;

  // Set mole image
  mole.style.backgroundImage = "url('nazeer.png')";
  mole.style.backgroundSize = "contain";
  mole.style.backgroundPosition = "center";
  mole.style.backgroundRepeat = "no-repeat";
  mole.style.display = "block";

  // Remove mole after a short delay
  moleTimeout = setTimeout(() => {
    mole.style.display = "none";
    if (timeLeft > 0) spawnMole();
  }, Math.random() * 1000 + 500); // Random delay between 500ms and 1500ms
}

// Handle mole click
function handleMoleClick(event) {
  const mole = event.target.firstChild;
  
  if (mole && mole.style.display === "block") {
    score++;
    updateScore();
    hitSound.play();

    // Hide mole immediately
    mole.style.display = "none";

    // Spawn a new mole quickly after hitting one
    spawnMole();
  }
}

// Update score display
function updateScore() {
  scoreDisplay.textContent = `Score: ${String(score).padStart(4, '0')}`;
}

// Start the timer
function startTimer() {
  gameInterval = setInterval(() => {
    timeLeft--;
    updateTimer();

    if (timeLeft <= 0) {
      clearInterval(gameInterval);
      endGame();
    }
  }, 1000);
}

// Update timer display
function updateTimer() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent = `Time: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// End the game
function endGame() {
  alert(`Game Over! Your final score is ${score}`);
  location.reload(); // Restart the game
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', initGame);
