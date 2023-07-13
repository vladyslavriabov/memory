# Memory Game
This is a simple memory game implemented using JavaScript classes. The game consists of a grid of cards that the player needs to flip over and match pairs.

## Installation and launch

<b>Live Server is required to run the application locally</b> </br> 


## Features

- Grid-based memory game
- Flipping cards to reveal their values
- Matching pairs of cards
- Score tracking
- Timer for gameplay duration
- Restarting the game
- Board animated using the [Anime.js](https://animejs.com/) library.

## Installation

1. Clone or download the project repository.
2. Open the project files in a text editor or IDE of your choice.

## Usage

<b>Live Server is required to run the application locally</b> </br> 
1. Run the application through the Live Server and open http://localhost:3000 to view it in a browser.
2. Click the "Start Game" button
3. The game board will be displayed with all the cards face down.
4. Click on any card to flip it over and reveal its value.
5. Try to find the matching pairs by flipping cards and remembering their positions.
6. If two flipped cards have the same value, they will remain face up and considered a match.
7. If two flipped cards have different values, they will be flipped back face down.
8. Continue flipping cards and matching pairs until all cards are matched.
9. The game ends when all cards are matched, and a congratulatory message will be displayed with the number of moves made.
10. To restart the game, click the "Restart" or "Try again" buttons.

# Game Class Documentation

The `Game` class handles the game logic and user interactions. It interacts with the `Board` class to manage the game board and its functionality.

## Constructor

### Parameters

- `activity` (HTMLElement): The activity element that contains the game board and controls.
- `board` (HTMLElement): The board element where the cards are displayed.
- `boardSettings` (object): The settings object for the game board.
- `timeElement` (HTMLElement): The element to display the remaining time.
- `timeLimit` (number, optional): The time limit for the game in seconds. Defaults to 300 seconds (5 minutes).

### Description

The constructor initializes the game by creating a new instance of the `Board` class and setting up the necessary properties and event listeners. It also sets the initial time limit and updates the time element with the remaining time.

## Methods

### `setTimeToHTML()`

Updates the time element in the HTML with the remaining time.

### `setListeners()`

Adds event listeners to the activity element and board element to handle user interactions. It listens for mouseenter and mouseleave events on the activity element to start and pause the timer, and click events on the board element to handle game controls such as starting the game or restarting.

### `startGame()`

Starts the game by animating the board rotation and hiding the game start element.

### `startTimer()`

Starts the timer by setting up an interval that decreases the remaining time every second. It updates the time element and checks for game over conditions.

### `checkTime()`

Checks if the remaining time has reached zero. If so, it pauses the timer and triggers the game over condition.

### `pauseTimer()`

Pauses the timer by clearing the interval that updates the time.

### `gameOver()`

Handles the game over condition. It calls the `gameOver` method of the `Board` class to handle any necessary actions or UI updates.

### `restart()`

Restarts the game by resetting the game board and its state, shuffling the cards, resetting the time, and regenerating the cards. It also updates the time element with the initial time limit.

# Board Class Documentation

The `Board` class is responsible for managing the cards, their interactions, and the game logic.

## Constructor

### Parameters

- `cards` (array): An array of values representing the cards.
- `cardContainer` (HTMLElement): The container element that holds the cards.
- `grid` (object): The settings object for the grid layout of the cards. It contains properties for `width`, `height`, `cols`, `rows`, and `gap`.
- `numberOfMovesElement` (HTMLElement): The element to display the number of moves made by the player.

### Description

The constructor initializes the game board by setting up the properties, shuffling the cards, generating the card elements, and setting up the necessary event listener for card flipping.

## Methods

### `shuffle()`

Shuffles the cards array using the Fisher-Yates shuffle algorithm to randomize the card order.

### `generateCards()`

Generates the card elements based on the provided grid settings. It creates instances of the `Card` class for each card value and appends them to the card container element. It also updates the CSS grid properties for proper layout.

### `flipCard(card)`

Flips the provided card by calling its `flip()` method. It handles the game logic for checking if it is the first or second card flipped, incrementing the number of moves, and checking for a match.

### `getNumberOfMoves()`

Returns the current number of moves made by the player.

### `checkForCardsMatch()`

Checks if the first and second flipped cards are a match by comparing their `matchId` properties. If they match, it calls the `disableMatchedCards()` method. Otherwise, it calls the `flipBackward()` method.

### `disableMatchedCards()`

Disables the matched cards by calling their `match()` methods. It also clears the selected cards and checks if the game is over.

### `flipBackward()`

Flips the first and second cards back to their original state after a delay of 1 second. It calls their `flip()` methods and then clears the selected cards.

### `clearSelectedCards()`

Clears the `firstCard` and `secondCard` properties and resets the `lockBoardActions` flag.

### `gameOver()`

Handles the game over condition. It animates the board rotation using the `anime.js` library and displays the number of moves made by the player in the result score element.

### `checkGameOver()`

Checks if all cards have been matched by comparing the number of flipped cards with the total number of cards. If all cards are flipped, it triggers the game over condition.

### `reset()`

Resets the game board by clearing the selected cards, resetting the number of moves, and removing all card elements from the card container.

# Card Class Documentation

The `Card` class handles the card's state, rendering, and interactions.

## Constructor

### Parameters

- `id` (any): The unique identifier for the card.
- `matchId` (any): The identifier used to match pairs of cards.
- `parentComponent` (HTMLElement): The parent component where the card will be appended.
- `style` (object): The style object for the card's dimensions. It contains properties for `cardWidth` and `cardHeight`.

### Description

The constructor initializes the card by setting up its properties and rendering the card element.

## Methods

### `flip()`

Flips the card by toggling the `flipped` class on the card element. It updates the `isFlipped` property accordingly.

### `match()`

Marks the card as matched by adding the `matched` class to the card element. It updates the `isMatched` property accordingly.

### `render()`

Renders the card by creating a new card element and appending it to the parent component. It sets the necessary data attributes and HTML content based on the card's properties and style.

## Frequently Asked Questions

**Q: How many cards are there in the game?**</br> 
A: The game is currently configured with a 4x4 grid, resulting in a total of 16 cards. However, you can change the grid configuration inside the code to make a different grid. </br>
Pay attention the table must consist of an even number of characters, if the number is not even you will get an error in the console and the application will not work.

**Q: How does the scoring work?**</br> 
A: The game tracks the number of moves made by the player. The fewer moves, the higher the score.

**Q: Can I use my own images for the cards?**</br> 
A: Currently, the game uses text values for the cards. However, you can modify the code to use images if desired.

## Credits

The memory game project was created by [Vladyslav Riabov](https://www.linkedin.com/in/riabov-vladyslav/)
