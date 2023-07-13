import { Board } from "./board.js";

export class Game {
  constructor(activity, board, boardSettings, timeElement, timeLimit = 300) {
    this.gameBoard = new Board(boardSettings);
    this.board = board;
    this.activity = activity;
    this.time = timeLimit;
    this.timeLimit = timeLimit;
    this.timerInterval = null;
    this.timeElement = timeElement;

    this.setTimeToHTML();
    this.setListeners();
  }

  setTimeToHTML() {
    this.timeElement.textContent = `${this.time} seconds`;
  }

  setListeners() {
    this.activity.addEventListener("mouseenter", () => this.startTimer());
    this.activity.addEventListener("mouseleave", () => this.pauseTimer());

    this.board.addEventListener("click", (e) => {
      const classList = e.target.classList;
      if (classList.contains("start")) {
        this.startGame();
        return;
      }
      if (classList.contains("restart")) {
        this.restart();
        return;
      }
      if (classList.contains("try-again")) {
        this.restart();
        this.startGame();
        return;
      }
    });
  }

  startGame() {
    anime({
      targets: this.board,
      rotateY: {
        value: "+=180",
        easing: "easeInOutSine",
      },
      duration: 500,
      complete: () => {
        document.querySelector(".game-start").style.display = "none";
        document.querySelector(".game-over").classList.remove("disable");
      },
    });
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      this.time--;
      this.setTimeToHTML();
      this.checkTime();
    }, 1000);
  }

  checkTime() {
    if (this.time > 0) return;
    this.pauseTimer();
    this.gameOver();
  }

  pauseTimer() {
    clearInterval(this.timerInterval);
  }

  gameOver() {
    this.gameBoard.gameOver();
  }

  restart() {
    if (!this.gameBoard) return;
    this.gameBoard.reset();
    this.gameBoard.clearSelectedCards();
    this.gameBoard.shuffle();
    this.time = this.timeLimit;
    this.setTimeToHTML();
    this.gameBoard.generateCards();
  }
}
