// script.js
const board = document.getElementById('board');
const message = document.getElementById('message');
const restartBtn = document.getElementById('restart');
let currentPlayer = 'X';
let gameActive = true;
const boardState = Array(9).fill(null);

// Create cells dynamically
function createBoard() {
  board.innerHTML = '';
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('data-index', i);
    cell.addEventListener('click', handleCellClick);
    board.appendChild(cell);
  }
}

// Handle cell clicks
function handleCellClick(event) {
  const cell = event.target;
  const index = cell.getAttribute('data-index');

  if (!gameActive || boardState[index]) return;

  // Player move
  boardState[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add('taken');

  // Check for win or draw
  if (checkWin()) {
    message.textContent = `Player ${currentPlayer} wins! 🎉`;
    gameActive = false;
    return;
  }

  if (boardState.every(cell => cell !== null)) {
    message.textContent = 'It\'s a draw! 🤝';
    gameActive = false;
    return;
  }

  // Switch to AI or next player
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  message.textContent = `Player ${currentPlayer}'s turn`;

  if (currentPlayer === 'O') {
    setTimeout(aiMove, 500); // Delay for AI move
  }
}
