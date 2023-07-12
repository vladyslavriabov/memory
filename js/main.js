import { Board } from "./classes/board.js";

let game;
const activity = document.querySelector(".game.back");
const cardContainer = document.querySelector(".cards-container");
const $numberOfMoves = document.querySelector(".score");
const $time = document.querySelector(".time");
const board = document.querySelector(".game-board");
const grid = { width: 400, height: 400, cols: 4, rows: 4, gap: 10 };
let cards = Array.from(
  { length: (grid.cols * grid.rows) / 2 },
  (_, index) => index + 1
);
cards = [...cards, ...cards];

let timerInterval;
const timeLimit = 300;
let time = timeLimit;

function startTimer() {
  timerInterval = setInterval(() => {
    time--;
    $time.textContent = `${time} seconds`;
    checkTime();
  }, 1000);
}

function checkTime() {
  if (time > 0) return;
  pauseTimer();
  game.gameover();
}

function pauseTimer() {
  clearInterval(timerInterval);
}

function rorateBoard() {
  anime({
    targets: board,
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

function start() {
  if (cards.length !== grid.rows * grid.cols) {
    console.error("Please check the grid and cards data");
    return;
  }
  $time.textContent = `${time} seconds`;
  game = new Board(cards, cardContainer, grid, $numberOfMoves);
  activity.addEventListener("mouseenter", startTimer);
  activity.addEventListener("mouseleave", pauseTimer);
  rorateBoard();
}

board.addEventListener("click", (e) => {
  if (e.target.classList.contains("start")) {
    start();
    return;
  }
  if (e.target.classList.contains("restart")) {
    restart();
    return;
  }
  if (e.target.classList.contains("try-again")) {
    restart();
    rorateBoard();
    return;
  }
});

function restart() {
  if (!game) return;
  game.reset();
  game.clearSelectedCards();
  game.shuffle();
  time = timeLimit;
  $time.textContent = `${time} seconds`;
  game.generateCards();
}
