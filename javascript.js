// Gameboard Module
const gameBoard = (function() {
    let gameBoardArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8"]; // Array with placeholder numbers for easy testing in console
    const getGameBoardArr = () => gameBoardArr;
    const showConsoleBoard = function() { // Function to display the board in the console 
        console.log(`    ${gameBoardArr[0]} | ${gameBoardArr[1]} | ${gameBoardArr[2]}
    - - - - - 
    ${gameBoardArr[3]} | ${gameBoardArr[4]} | ${gameBoardArr[5]}
    - - - - - 
    ${gameBoardArr[6]} | ${gameBoardArr[7]} | ${gameBoardArr[8]}`
        );
    };    
    const markBoard = function(position, marker) {
        gameBoardArr[position] = marker;
    };
    const resetBoard = () => gameBoardArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
    return { getGameBoardArr, showConsoleBoard, markBoard, resetBoard };
})();

// Players Module
const playersTTT = (function() {
    const playerOne = { "name": "Player 1", "marker": "X" }; // Initialize Player 1
    const playerTwo = { "name": "Player 2", "marker": "O" }; // Initialize Player 2
    const getPlayerOne = () => playerOne;
    const getPlayerTwo = () => playerTwo;
    const renamePlayerOne = (newName) => playerOne.name = newName;
    const renamePlayerTwo = (newName) => playerTwo.name = newName;
    return { getPlayerOne, getPlayerTwo, renamePlayerOne, renamePlayerTwo};
})();

// Game Controller Module
const gameControllerTTT = (function() {

    const gameState = {
        "playerTurn": playersTTT.getPlayerOne(),
        "turnNumber": 1,
        "isGameOver": false
    };

    const getGameState = () => gameState;

    const startGame = function() {
        gameState.playerTurn = playersTTT.getPlayerOne();
        gameState.turnNumber = 1;
        gameState.isGameOver = false;
        gameBoard.resetBoard();
        console.log(`Game Starts! It is ${playersTTT.getPlayerOne().name}'s turn, type gameControllerTTT.playRound() to place your marker.`);
        console.log(gameBoard.showConsoleBoard());
    };

    const playRound = function(position) {

        // Execute if player one's turn 
        if (gameState.playerTurn === playersTTT.getPlayerOne() && gameState.turnNumber < 9 && gameState.isGameOver === false) { 
            gameBoard.markBoard(position, playersTTT.getPlayerOne().marker);
            ++gameState.turnNumber;
            console.log(`${playersTTT.getPlayerOne().name} marked box ${position}.`);
            console.log(gameBoard.showConsoleBoard());
            checkForWin();
            switchTurn();
        
        // Execute if player two's turn
        } else if (gameState.playerTurn === playersTTT.getPlayerTwo() && gameState.turnNumber < 9 && gameState.isGameOver === false) {
            gameBoard.markBoard(position, playersTTT.getPlayerTwo().marker);
            ++gameState.turnNumber;
            console.log(`${playersTTT.getPlayerTwo().name} marked box ${position}.`);
            console.log(gameBoard.showConsoleBoard());
            checkForWin();
            switchTurn();

        // Execute if draw   
        } else if (gameState.turnNumber >= 9) {
            gameOver();
            console.log(gameBoard.showConsoleBoard());
            console.log("Game over! It's a draw. Type gameControllerTTT.startGame() to restart.");
        };
    };

    const switchTurn = function() {

        // Switch to player 2 after player 1 plays
        if (gameState.isGameOver === false && gameState.playerTurn === playersTTT.getPlayerOne()) { 
            gameState.playerTurn = playersTTT.getPlayerTwo();
            console.log(`It is ${playersTTT.getPlayerTwo().name}'s turn, type gameControllerTTT.playRound() to place your marker.`);
        
        // Switch to player 1 after player 2 plays
        } else if (gameState.isGameOver === false && gameState.playerTurn === playersTTT.getPlayerTwo()) { 
            gameState.playerTurn = playersTTT.getPlayerOne();
            console.log(`It is ${playersTTT.getPlayerOne().name}'s turn, type gameControllerTTT.playRound() to place your marker.`);
        };
    };

    const winConditions = {
        1: [0, 1, 2], // Top row
        2: [3, 4, 5], // Middle row
        3: [6, 7, 8], // Bottom row
        4: [0, 3, 6], // Left column
        5: [1, 4, 7], // Middle column
        6: [2, 5, 8], // Right column
        7: [0, 4, 8], // Diagonal top-left to bottom-right
        8: [2, 4, 6] // Diagonal top-right to bottom-left
    };
    
    const checkForWin = function() {
        for (let winCondition of Object.values(winConditions)) {
            const [a, b, c] = winCondition;
            if (
                gameBoard.getGameBoardArr()[a] === gameState.playerTurn.marker &&
                gameBoard.getGameBoardArr()[b] === gameState.playerTurn.marker &&
                gameBoard.getGameBoardArr()[c] === gameState.playerTurn.marker
            ) {
                gameOver();
                console.log(`Game Over! ${gameState.playerTurn.name} has won!`);
            };
        };
    };

    const gameOver = function() {
        gameState.isGameOver = true;
        gameBoard.resetBoard();
    };

    return { startGame, getGameState, playRound };
})();

// Display Controller Module
const displayControllerTTT = (function() {
    
    // General Elements Access
    const initialDialog = document.querySelector(".start-game-dialog");
    const gameForm = document.querySelector(".start-game-form");
    const gameStateDisplayContainer = document.querySelector(".game-state-display-container");
    const gameStateDisplay = document.querySelector(".game-state-display");
    const gameButton = document.querySelectorAll(".game-button");
    const playAgainButton = document.createElement("button");
    playAgainButton.className = "play-again-button";
    playAgainButton.textContent = "Play Again";

    const handleStartClick = function(event) {
        event.preventDefault();
        const formData = new FormData(gameForm);
        const formObject = Object.fromEntries(formData.entries());
        // Rename both players if both fields filled
        if (formObject["Player 1"] !== "" && formObject["Player 2"] !== "") {
            playersTTT.renamePlayerOne(formObject["Player 1"]);
            playersTTT.renamePlayerTwo(formObject["Player 2"]);
        // Only rename Player 1 if Player 1 input field is filled and Player 2 input field is left empty
        } else if (formObject["Player 1"] !== "" && formObject["Player 2"] === "") {
            playersTTT.renamePlayerOne(formObject["Player 1"]);
        // Only rename Player 2 if Player 2 input field is filled and Player 2 input field is left empty
        } else if (formObject["Player 2"] !== "" && formObject["Player 1"] === "") {
            playersTTT.renamePlayerTwo(formObject["Player 2"]);
        };
        gameControllerTTT.startGame();
        gameStateDisplay.textContent = `${playersTTT.getPlayerOne().name}'s Turn`
        initialDialog.close();
    };

    const handleGameButtonClick = function(event) {
        const position = event.target.dataset.position; // Targets position data in HTML
        const marker = gameControllerTTT.getGameState().playerTurn.marker;
        if (event.target.textContent === "") { // Prevents use from using an already marked position in the game
            gameControllerTTT.playRound(position);
            event.target.textContent = marker;
            const playerTurnName = gameControllerTTT.getGameState().playerTurn.name;
            if (gameControllerTTT.getGameState().isGameOver === false) {
                gameStateDisplay.textContent = `${playerTurnName}'s Turn`; // Display that it is next player's turn after click
            } else if (gameControllerTTT.getGameState().isGameOver === true) {
                gameStateDisplay.textContent = `Game Over! ${playerTurnName} Won!`;
                gameStateDisplayContainer.appendChild(playAgainButton);
            };
        };
    };

    const handlePlayAgainClick = function() {
        gameControllerTTT.startGame();
        gameButton.forEach(node => node.textContent = "");
    }

    const initEventListeners = function() {
        gameForm.addEventListener("submit", handleStartClick);
        gameButton.forEach(node => node.addEventListener("click", handleGameButtonClick));
        playAgainButton.addEventListener("click", handlePlayAgainClick);
    };

    return { handleStartClick, initEventListeners, handleGameButtonClick, handlePlayAgainClick };
})();

document.addEventListener("DOMContentLoaded", displayControllerTTT.initEventListeners)