import { Game } from "./classes/game.js";

let game;
const activity = document.querySelector(".game.back");
const cardContainer = document.querySelector(".cards-container");
const numberOfMovesElement = document.querySelector(".score");
const timeElement = document.querySelector(".time");
const board = document.querySelector(".game-board");
const grid = { width: 400, height: 400, cols: 4, rows: 4, gap: 10 };
let cards = Array.from(
  { length: (grid.cols * grid.rows) / 2 },
  (_, index) => index + 1
);
cards = [...cards, ...cards];
const boardSettings = { cards, cardContainer, grid, numberOfMovesElement };

function start() {
  if (cards.length !== grid.rows * grid.cols) {
    console.error("Please check the grid and cards data");
    return;
  }
  game = new Game(activity, board, boardSettings, timeElement, 300);
}

start();
