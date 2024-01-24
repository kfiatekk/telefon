function openApp(app) {
    var screen = document.querySelector('.screen');
    screen.innerHTML = '';
 
    switch (app) {
      case 'notepad':
          createNotepad(screen);
          break;
      case 'clock':
          createClockApp(screen);
          break;
      case 'ticTacToe':
          createTicTacToeApp(screen);
          break;
  }
}
 
function createNotepad(screen) {
  const notepad = document.createElement('div');
  notepad.id = 'notepad';
 
  const textarea = document.createElement('textarea');
  textarea.id = 'notepad-textarea';
  notepad.appendChild(textarea);
  textarea.placeholder="Notatnik"
  textarea.style.background="lightgray";
  textarea.style.width = width = '210px';
  textarea.style.height = height = '240px';
  textarea.style.resize = 'none';
  textarea.style.borderRadius = '10px';
  textarea.style.border = "2px solid black"
  screen.appendChild(notepad);
}

const home = () =>{
    const screen = document.querySelector('.screen');
    const icons = document.getElementById('ikony');
    icons.style.visibility="visible";
    const wysz = document.getElementById('wyszukajj');
    wysz.style.visibility="visible";
    screen.innerHTML = '';
   
}

function createTicTacToeApp(screen) {
  const icons = document.getElementById('ikony');
  icons.style.visibility="hidden";
  const wysz = document.getElementById('wyszukajj');
  wysz.style.visibility="hidden";
  const ticTacToeApp = document.createElement('div');
  ticTacToeApp.id = 'ticTacToeApp';
   

  const gameBoard = document.createElement('div');
  gameBoard.classList.add('game-board');

  for (let i = 0; i < 9; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.addEventListener('click', function () {
          makeMove(cell);
      });
      gameBoard.appendChild(cell);
  }

  ticTacToeApp.appendChild(gameBoard);
  screen.appendChild(ticTacToeApp);
}

let currentPlayer = 'X';
let gameBoard = Array(9).fill('');

function makeMove(cell) {
    const index = Array.from(cell.parentNode.children).indexOf(cell);
    if (!gameBoard[index] && !isGameFinished()) {
        gameBoard[index] = currentPlayer;
        cell.textContent = currentPlayer;
        if (checkWinner()) {
            alert(`Gracz ${currentPlayer} wygrywa!`);
            resetGame();
        } else if (isBoardFull()) {
            alert('Remis! Plansza jest pełna.');
            resetGame();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function checkWinner() {
    const winningCombinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    return winningCombinations.some(combination => combination.every(index => gameBoard[index] === currentPlayer));
}

function isBoardFull() {
    return gameBoard.every(cell => cell !== '');
}

function isGameFinished() {
    return checkWinner() || isBoardFull();
}

function resetGame() {
    currentPlayer = 'X';
    gameBoard = Array(9).fill('');
    document.querySelectorAll('.cell').forEach(cell => (cell.textContent = ''));
}
