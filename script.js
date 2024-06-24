// Select elements
const gameScreen = document.getElementById('game-screen');
const congratulationsScreen = document.getElementById('congratulations-screen');
const resetGameButton = document.getElementById('reset-game');
const playAgainButton = document.getElementById('play-again');
const gameBoard = document.getElementById('game-board');

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
let cards = [...letters, ...letters]; // Create pairs of each letter
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchesFound = 0;

// Shuffle function
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Create game board
function createBoard() {
  shuffle(cards);
  gameBoard.innerHTML = '';
  cards.forEach(letter => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.letter = letter;
    card.innerText = letter;
    card.style.color = 'transparent';
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
  });
  matchesFound = 0;
}

// Flip card
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.style.color = 'white';
  this.classList.add('flip');

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

// Check for match
function checkForMatch() {
  let isMatch = firstCard.dataset.letter === secondCard.dataset.letter;
  isMatch ? disableCards() : unflipCards();
}

// Disable matched cards
function disableCards() {
  firstCard.classList.add('matched');
  secondCard.classList.add('matched');
  matchesFound++;
  if (matchesFound === letters.length) {
    setTimeout(() => {
      gameScreen.classList.remove('active');
      congratulationsScreen.classList.add('active');
    }, 1000);
  }
  resetBoard();
}

// Unflip unmatched cards
function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.style.color = 'transparent';
    secondCard.style.color = 'transparent';
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1000);
}

// Reset board state
function resetBoard() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

// Handle reset game button click
resetGameButton.addEventListener('click', createBoard);

// Handle play again button click
playAgainButton.addEventListener('click', () => {
  congratulationsScreen.classList.remove('active');
  gameScreen.classList.add('active');
  createBoard();
});

// Initialize game by showing the game screen
gameScreen.classList.add('active');
createBoard();
