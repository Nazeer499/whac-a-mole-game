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
    hole.dataset.index = i;
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
  holes.forEach(hole => hole.innerHTML = ''); // Remove existing moles

  const randomHole = holes[Math.floor(Math.random() * holes.length)];

  // Create mole element
  const mole = document.createElement('div');
  mole.classList.add('mole');
  mole.style.backgroundImage = "url('nazeer.png')"; // Set mole image
  randomHole.appendChild(mole);

  // Remove mole after a short delay
  moleTimeout = setTimeout(() => {
    randomHole.innerHTML = '';
    if (timeLeft > 0) spawnMole();
  }, Math.random() * 1000 + 500); // Random delay between 500ms and 1500ms
}

// Handle mole click
function handleMoleClick(event) {
  if (event.target.classList.contains('mole')) {
    score++;
    updateScore();
    hitSound.play();
    
    // Remove mole after hit
    event.target.parentNode.innerHTML = '';

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

    if (time
