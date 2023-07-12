import { Card } from "./card.js";

export class Board {
  constructor(
    cards,
    cardContainer,
    grid = { width: 400, height: 400, cols: 4, rows: 4, gap: 10 },
    numberOfMovesElement
  ) {
    this.cards = cards;
    this.generatedCards = [];
    this.cardContainer = cardContainer;
    this.numberOfMovesElement = numberOfMovesElement;
    this.grid = grid;
    this.firstCard = null;
    this.secondCard = null;
    this.lockBoardActions = false;
    this.numberOfMoves = 0;

    this.shuffle();
    this.generateCards();

    this.cardContainer.addEventListener("click", (e) => {
      if (!e.target.parentElement.classList.contains("card")) return;
      this.flipCard(this.generatedCards[e.target.parentElement.dataset.id]);
    });
  }

  shuffle() {
    let currentIndex = this.cards.length,
      randomIndex,
      tmp;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      tmp = this.cards[currentIndex];
      this.cards[currentIndex] = this.cards[randomIndex];
      this.cards[randomIndex] = tmp;
    }
  }

  generateCards() {
    const { rows, cols, width, height, gap } = this.grid;
    this.cardContainer.style.width = `${width}px`;
    this.cardContainer.style.height = `${height}px`;
    const cardWidth = width / cols - gap;
    const cardHeight = height / rows - gap;
    let counter = 0;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const card = new Card(
          counter,
          this.cards[counter],
          this.cardContainer,
          {
            cardWidth,
            cardHeight,
          }
        );
        this.generatedCards.push(card);
        counter++;
      }
    }
  }

  flipCard(card) {
    if (this.lockBoardActions) return;
    if (card === this.firstCard) return;
    card.flip();
    if (!this.firstCard) {
      this.firstCard = card;
      return;
    }
    this.secondCard = card;
    this.numberOfMoves++;
    this.numberOfMovesElement.textContent = this.numberOfMoves;
    this.lockBoardActions = true;
    this.checkForCardsMatch();
  }

  getNumberOfMoves() {
    return this.numberOfMoves;
  }

  checkForCardsMatch() {
    const match = this.firstCard.matchId === this.secondCard.matchId;
    match ? this.disableMatchedCards() : this.flipBackward();
  }

  disableMatchedCards() {
    this.firstCard.match();
    this.secondCard.match();
    this.clearSelectedCards();
    this.checkGameOver();
  }

  flipBackward() {
    setTimeout(() => {
      this.firstCard.flip();
      this.secondCard.flip();
      this.clearSelectedCards();
    }, 1000);
  }

  clearSelectedCards() {
    this.firstCard = this.secondCard = null;
    this.lockBoardActions = false;
  }

  gameover() {
    anime({
      targets: document.querySelector(".game-board"),
      rotateY: {
        value: "-=180",
        easing: "easeInOutSine",
      },
      duration: 400,
    });
    document.querySelector(
      ".result-score"
    ).textContent = `you took ${this.getNumberOfMoves()} steps`;
  }

  checkGameOver() {
    let flipped = document.querySelectorAll(".flipped");
    let gameover = flipped.length === this.cardContainer.children.length;
    if (gameover) {
      this.gameover();
    }
  }

  reset() {
    this.clearSelectedCards();
    this.generatedCards = [];
    this.numberOfMoves = 0;
    this.numberOfMovesElement.textContent = this.numberOfMoves;
    this.cardContainer.innerHTML = "";
  }
}
