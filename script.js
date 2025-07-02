const cardsBase = [
  'Libras 🧏‍♀️', 'Libras 🧏‍♀️',
  'Autismo 🧩', 'Autismo 🧩',
  'Irmãos especiais também são incríveis 🧡', 'Irmãos especiais também são incríveis 🧡',
  'Rampas de Acesso 🛗', 'Rampas de Acesso 🛗',
  'Empatia ❤️', 'Empatia ❤️',
  'Audiodescrição 🎧', 'Audiodescrição 🎧',
  'Diversidade 🌍', 'Diversidade 🌍',
  'Respeito 🤝', 'Respeito 🤝'
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedCount = 0;

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function createBoard() {
  const board = document.getElementById('board');
  board.innerHTML = '';
  matchedCount = 0;

  const shuffledCards = shuffle([...cardsBase]);

  shuffledCards.forEach(text => {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.text = text;
    card.innerText = '';
    card.addEventListener('click', flipCard);
    board.appendChild(card);
  });
}

function flipCard() {
  if (lockBoard || this.classList.contains('matched') || this === firstCard) return;

  this.classList.add('revealed');
  this.innerText = this.dataset.text;

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  lockBoard = true;

  if (firstCard.dataset.text === secondCard.dataset.text) {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    matchedCount += 2;

    resetCards();

    if (matchedCount === cardsBase.length) {
      setTimeout(() => {
        alert('🎉 Parabéns! Você completou o jogo!');
        createBoard(); // reinicia o jogo
      }, 500);
    }
  } else {
    setTimeout(() => {
      firstCard.classList.remove('revealed');
      secondCard.classList.remove('revealed');
      firstCard.innerText = '';
      secondCard.innerText = '';
      resetCards();
    }, 1000);
  }
}

function resetCards() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

function mostrarTelaFinal() {
  document.getElementById("final-screen").style.display = "block";
  // Aqui você pode ocultar o jogo ou quiz:
  document.getElementById("jogo").style.display = "none"; // substitua "jogo" pelo ID da sua área do jogo
}

function reiniciarJogo() {
  location.reload(); // recarrega a página para começar de novo
}

createBoard();

function mostrarTelaFinal() {
  document.getElementById("final-screen").style.display = "block";

  const areaJogo = document.getElementById("jogo");
  if (areaJogo) {
    areaJogo.style.display = "none";
  }
}

function reiniciarJogo() {
  location.reload();
}

// TESTE: Mostra a tela final após 3 segundos
setTimeout(() => {
  mostrarTelaFinal();
}, 3000);
