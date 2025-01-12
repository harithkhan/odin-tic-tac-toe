// Gameboard Module
const gameBoard = (function() {
    let gameBoardArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8"]; // Array with placeholder numbers for easy position reference
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

// Game Controller Module - only affects game logic, does not affect display
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

        // Execute on all turns before the last turn (which is turn 9)
        if (gameState.turnNumber < 9 && !gameState.isGameOver) { 
            gameBoard.markBoard(position, gameState.playerTurn.marker);
            ++gameState.turnNumber;
            console.log(`${gameState.playerTurn.name} marked box ${position}.`);
            console.log(gameBoard.showConsoleBoard());

            if (checkForWin()) {
                gameOver();
                console.log(`Game Over! ${gameState.playerTurn.name} has won!`);
            } else switchTurn();

        // Execute on the last turn
        } else if (gameState.turnNumber = 9) {
            gameBoard.markBoard(position, gameState.playerTurn.marker);
            console.log(`${gameState.playerTurn.name} marked box ${position}.`);
            console.log(gameBoard.showConsoleBoard());
            
            // Execute on draw, since there is no win in the last turn, it is a draw
            if (!checkForWin()) {
                gameOver();
                console.log("Game over! It's a draw. Type gameControllerTTT.startGame() to restart.")

            // Execute on win    
            } else if (checkForWin()) {
                gameOver();
                console.log(`Game Over! ${gameState.playerTurn.name} has won!`);
            };
        };
    };

    const switchTurn = function() {

        // Switch to player 2 after player 1 plays
        if (!gameState.isGameOver && gameState.playerTurn === playersTTT.getPlayerOne()) { 
            gameState.playerTurn = playersTTT.getPlayerTwo();
            console.log(`It is ${playersTTT.getPlayerTwo().name}'s turn, type gameControllerTTT.playRound() to place your marker.`);
        
        // Switch to player 1 after player 2 plays
        } else if (!gameState.isGameOver && gameState.playerTurn === playersTTT.getPlayerTwo()) { 
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
                return true;
            }; 
        };
        return false;
    };

    const gameOver = () => (gameState.isGameOver = true);
    return { startGame, getGameState, playRound, checkForWin };
})();

// Display Controller Module
const displayControllerTTT = (function() {
    
    // General html references and variables that are used throughout this module
    const gameForm = document.querySelector(".start-game-form");
    const gameStateDisplay = document.querySelector(".game-state-display");
    const playAgainButton = document.createElement("button");
    playAgainButton.className = "play-again-button";
    playAgainButton.textContent = "Play Again";
    const renamePlayersButton = document.createElement("button");
    renamePlayersButton.className = "rename-players-button";
    renamePlayersButton.textContent = "Rename Players";
    const endGameButtonContainer = document.querySelector(".end-game-button-container");
    const blue = "#13b4f2";
    const red = "#fe3f2f";

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
        // Add closing class to dialog
        const initialDialog = document.querySelector(".start-game-dialog");
        initialDialog.classList.add("closing");

        // Close the dialog after the animation ends
        initialDialog.addEventListener("animationend", () => {
            initialDialog.classList.remove("closing");
            initialDialog.close();
        }, { once: true });

        resetBoardDisplay();
        gameControllerTTT.startGame();
        gameStateDisplay.textContent = `${playersTTT.getPlayerOne().name}'s Turn`;
    };

    const handleMouseEnter = function(event) {
        const box = event.target;
        if (gameControllerTTT.getGameState().playerTurn === playersTTT.getPlayerOne()
            && box.dataset.marked === "false"
            && !gameControllerTTT.getGameState().isGameOver
        ) {
            box.style.backgroundColor = blue;
            box.textContent = gameControllerTTT.getGameState().playerTurn.marker;
        } else if (gameControllerTTT.getGameState().playerTurn === playersTTT.getPlayerTwo()
            && box.dataset.marked === "false"
            && !gameControllerTTT.getGameState().isGameOver
        ) {
            box.style.backgroundColor = red;
            box.textContent = gameControllerTTT.getGameState().playerTurn.marker;
        };
    };

    const handleMouseLeave = function(event) {
        const box = event.target;
        if (box.textContent !== "" && box.dataset.marked === "false" && !gameControllerTTT.getGameState().isGameOver) {
            box.style.backgroundColor = "white";
            box.textContent = "";
        };
    };

    const handleGameButtonClick = function(event) {
        const position = event.target.dataset.position; // Targets position data in HTML
        const marker = gameControllerTTT.getGameState().playerTurn.marker;
        const playerTurnName = gameControllerTTT.getGameState().playerTurn.name;
        const box = event.target;

        // Allow marking of position if it is unmarked
        if (box.dataset.marked === "false") { 
            gameControllerTTT.playRound(position);
            box.dataset.marked = "true";
            event.target.textContent = marker;

            // Display that it is next player's turn after position marked
            if (!gameControllerTTT.getGameState().isGameOver) {
                const nextPlayerName = gameControllerTTT.getGameState().playerTurn.name; // Get updated player name
                gameStateDisplay.textContent = `${nextPlayerName}'s Turn`;
            
            // Display game winner
            } else if (gameControllerTTT.getGameState().isGameOver && gameControllerTTT.checkForWin()) {
                gameStateDisplay.textContent = `Game Over! ${playerTurnName} Won!`;
                endGameButtonContainer.appendChild(playAgainButton);
                endGameButtonContainer.appendChild(renamePlayersButton);

            // Display game draw
            } else if (gameControllerTTT.getGameState().isGameOver && !gameControllerTTT.checkForWin()) {
                gameStateDisplay.textContent = `Game Over! It's a draw!`;
                endGameButtonContainer.appendChild(playAgainButton);
                endGameButtonContainer.appendChild(renamePlayersButton);
            };
        };
    };

    const handlePlayAgainClick = function() {
        resetBoardDisplay();
        gameControllerTTT.startGame();
        endGameButtonContainer.removeChild(playAgainButton);
        endGameButtonContainer.removeChild(renamePlayersButton);
        gameStateDisplay.textContent = `${playersTTT.getPlayerOne().name}'s Turn`
    };

    const handleRenamePlayersClick = function() {
        initialDialog.show();
        endGameButtonContainer.removeChild(playAgainButton);
        endGameButtonContainer.removeChild(renamePlayersButton);

    }

    const gameButton = document.querySelectorAll(".game-button");
    const resetBoardDisplay = function() {
        gameButton.forEach(node => node.style.backgroundColor = "white");
        gameButton.forEach(node => node.textContent = "");
        gameButton.forEach(node => node.dataset.marked = "false"); // Reset game button element's marked dataset
    }

    const initEventListeners = function() {
        gameForm.addEventListener("submit", handleStartClick);
        gameButton.forEach(node => node.addEventListener("mouseenter", handleMouseEnter));
        gameButton.forEach(node => node.addEventListener("mouseleave", handleMouseLeave));
        gameButton.forEach(node => node.addEventListener("click", handleGameButtonClick));
        playAgainButton.addEventListener("click", handlePlayAgainClick);
        renamePlayersButton.addEventListener("click", handleRenamePlayersClick);
    };

    return { handleStartClick, initEventListeners, handleGameButtonClick, handlePlayAgainClick, handleRenamePlayersClick };
})();

document.addEventListener("DOMContentLoaded", displayControllerTTT.initEventListeners);