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
        "roundNumber": 1,
        "isRoundOver": false,
        "whoStarts": playersTTT.getPlayerOne(), // To allow Player 2 to start next round if user wants to play again. See function nextRound below
        "playerOneScore": 0,
        "playerTwoScore": 0,
        "isGameOver": false
    };
    const getGameState = () => gameState;

    const startGame = function() { // Start a new game with default values
        gameState.playerTurn = playersTTT.getPlayerOne();
        gameState.turnNumber = 1;
        gameState.roundNumber = 1;
        gameState.isRoundOver = false;
        gameState.whoStarts = playersTTT.getPlayerOne();
        gameState.playerOneScore = 0;
        gameState.playerTwoScore = 0;
        gameState.isGameOver = false;
        playersTTT.getPlayerOne().marker = "X";
        playersTTT.getPlayerTwo().marker = "O";
        gameBoard.resetBoard();
        console.log(`Game Starts! It is round ${gameState.roundNumber}, and ${playersTTT.getPlayerOne().name}'s turn. Score is ${playersTTT.getPlayerOne().name}: ${gameState.playerOneScore}, ${playersTTT.getPlayerTwo().name}: ${gameState.playerTwoScore}. Type gameControllerTTT.playRound() to place your marker.`);
        console.log(gameBoard.showConsoleBoard());
    };

    const playRound = function(position) {

        // Execute on all turns before the last turn (which is turn 9)
        if (gameState.turnNumber < 9 && !gameState.isRoundOver) { 
            gameBoard.markBoard(position, gameState.playerTurn.marker);
            ++gameState.turnNumber;
            console.log(`${gameState.playerTurn.name} marked box ${position}.`);
            console.log(gameBoard.showConsoleBoard());

            if (checkForWin()) {
                gameState.playerTurn === playersTTT.getPlayerOne() ? ++gameState.playerOneScore : ++gameState.playerTwoScore;
                roundOver();
                console.log(`${gameState.playerTurn.name} won the round! Score is ${playersTTT.getPlayerOne().name}: ${gameState.playerOneScore}, ${playersTTT.getPlayerTwo().name}: ${gameState.playerTwoScore}.`);
                checkGameOver();
            } else switchTurn();

        // Execute on the last turn
        } else if (gameState.turnNumber = 9) {
            gameBoard.markBoard(position, gameState.playerTurn.marker);
            console.log(`${gameState.playerTurn.name} marked box ${position}.`);
            console.log(gameBoard.showConsoleBoard());
            
            // Execute on draw, since there is no win in the last turn, it is a draw
            if (!checkForWin()) {
                roundOver();
                console.log(`It's a draw. Score is ${playersTTT.getPlayerOne().name}: ${gameState.playerOneScore}, ${playersTTT.getPlayerTwo().name}: ${gameState.playerTwoScore}.`);

            // Execute on win    
            } else if (checkForWin()) {
                gameState.playerTurn === playersTTT.getPlayerOne() ? ++gameState.playerOneScore : ++gameState.playerTwoScore;
                roundOver();
                console.log(`${gameState.playerTurn.name} won the round! Score is ${playersTTT.getPlayerOne().name}: ${gameState.playerOneScore}, ${playersTTT.getPlayerTwo().name}: ${gameState.playerTwoScore}.`);
                checkGameOver();
            };
        };
    };

    const switchTurn = function() {

        // Switch to player 2 after player 1 plays
        if (!gameState.isRoundOver && gameState.playerTurn === playersTTT.getPlayerOne()) { 
            gameState.playerTurn = playersTTT.getPlayerTwo();
            console.log(`It is ${playersTTT.getPlayerTwo().name}'s turn, type gameControllerTTT.playRound() to place your marker.`);
        
        // Switch to player 1 after player 2 plays
        } else if (!gameState.isRoundOver && gameState.playerTurn === playersTTT.getPlayerTwo()) { 
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

    const roundOver = () => (gameState.isRoundOver = true);

    const nextRound = function() {
        // Switch whoStarts
        gameState.whoStarts === playersTTT.getPlayerOne() 
        ? gameState.whoStarts = playersTTT.getPlayerTwo() 
        :  gameState.whoStarts = playersTTT.getPlayerOne();
        gameState.playerTurn = gameState.whoStarts;
        // Switch markers
        if (playersTTT.getPlayerOne().marker === "X") {
            playersTTT.getPlayerOne().marker = "O";
            playersTTT.getPlayerTwo().marker = "X";
        } else {
            playersTTT.getPlayerOne().marker = "X";
            playersTTT.getPlayerTwo().marker = "O";
        };
        ++gameState.roundNumber; // Increment round number
        // Reset game logic
        gameState.turnNumber = 1;
        gameState.isRoundOver = false;
        gameBoard.resetBoard();
        console.log(`Round ${gameState.roundNumber} starts! It is ${gameState.playerTurn.name}'s turn. Score is ${playersTTT.getPlayerOne().name}: ${gameState.playerOneScore}, ${playersTTT.getPlayerTwo().name}: ${gameState.playerTwoScore}. Type gameControllerTTT.playRound() to place your marker.`);
        console.log(gameBoard.showConsoleBoard());
    };

    const checkGameOver = function() {
        if (gameState.playerOneScore === 3 || gameState.playerTwoScore === 3) {
            gameState.isGameOver = true;
            console.log(`Game Over! ${gameState.playerTurn.name} has 3 points and won the game!`);
        };
    };

    return { startGame, getGameState, playRound, checkForWin, nextRound };
})();

// Display Controller Module
const displayControllerTTT = (function() {
    
    // General html references and variables that are used throughout this module
    const initialDialog = document.querySelector(".start-game-dialog");
    const gameForm = document.querySelector(".start-game-form");
    const gameStateDisplay = document.querySelector(".game-state-display");
    const playerOneIcon = document.querySelector(".player-one-icon");
    const playerTwoIcon = document.querySelector(".player-two-icon");
    const playerOneInfo = document.querySelector(".player-one-score");
    const playerTwoInfo = document.querySelector(".player-two-score");
    const nextRoundButton = document.createElement("button");
    nextRoundButton.className = "next-round-button";
    nextRoundButton.textContent = "Next Round";
    const restartButton = document.createElement("button");
    restartButton.className = "restart-button";
    restartButton.textContent = "Restart Game";
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
        // Only rename Player 2 if Player 2 input field is filled and Player 1 input field is left empty
        } else if (formObject["Player 2"] !== "" && formObject["Player 1"] === "") {
            playersTTT.renamePlayerTwo(formObject["Player 2"]);
        };
        // Add closing class to dialog to assist stylesheet selectors for closing animation of dialog when game starts
        initialDialog.classList.add("closing");
        // Close the dialog after the animation ends and remove "closing" class
        initialDialog.addEventListener("animationend", () => {
            initialDialog.classList.remove("closing");
            initialDialog.close();
        }, { once: true });
        resetBoardDisplay();
        gameControllerTTT.startGame();
        gameStateDisplay.textContent = `Round ${gameControllerTTT.getGameState().roundNumber}, ${playersTTT.getPlayerOne().name} Starts`;
        // Update names, score and icons in player info
        playerOneInfo.textContent = `${playersTTT.getPlayerOne().name}'s Score: ${gameControllerTTT.getGameState().playerOneScore}`;
        playerTwoInfo.textContent = `${playersTTT.getPlayerTwo().name}'s Score: ${gameControllerTTT.getGameState().playerTwoScore}`;
        playerOneIcon.textContent = "X";
        playerTwoIcon.textContent = "O";
    };

    const handleMouseEnter = function(event) { // To mark and add bg color to game button when mouse enters button
        const box = event.target;
        if (gameControllerTTT.getGameState().playerTurn === playersTTT.getPlayerOne() // To add player one's marker upon mouse enter
            && box.dataset.marked === "false"
            && !gameControllerTTT.getGameState().isRoundOver
        ) {
            box.style.backgroundColor = blue;
            box.textContent = gameControllerTTT.getGameState().playerTurn.marker;
        } else if (gameControllerTTT.getGameState().playerTurn === playersTTT.getPlayerTwo() // To add player two's marker upon mouse enter
            && box.dataset.marked === "false"
            && !gameControllerTTT.getGameState().isRoundOver
        ) {
            box.style.backgroundColor = red;
            box.textContent = gameControllerTTT.getGameState().playerTurn.marker;
        };
    };

    const handleMouseLeave = function(event) { // To remove marker and bg color from game button when mouse leaves button
        const box = event.target;
        if (box.textContent !== "" && box.dataset.marked === "false" && !gameControllerTTT.getGameState().isRoundOver) {
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

            // Display that it is next player's turn after position marked if round is not over
            if (!gameControllerTTT.getGameState().isRoundOver) {
                const nextPlayerName = gameControllerTTT.getGameState().playerTurn.name; // Get updated player name
                gameStateDisplay.textContent = `${nextPlayerName}'s Turn`;
            
            // Display roundwinner and update score displays if round is over but there is no game winner, and append buttons for new round or game
            } else if (gameControllerTTT.getGameState().isRoundOver && gameControllerTTT.checkForWin() && !gameControllerTTT.getGameState().isGameOver) {
                gameStateDisplay.textContent = `Round Over! ${playerTurnName} Won!`;
                displayControllerTTT.updateScoreDisplay(gameControllerTTT.getGameState().playerOneScore, gameControllerTTT.getGameState().playerTwoScore); // See updateScoreDisplay below
                endGameButtonContainer.appendChild(restartButton);
                endGameButtonContainer.appendChild(nextRoundButton);
            
            // Display game winner and update score displays if game is over, and append restart game button
            } else if (gameControllerTTT.getGameState().isGameOver) {
                gameStateDisplay.textContent = `Game Over! ${gameControllerTTT.getGameState().playerTurn.name} has 3 points and won the game`;
                displayControllerTTT.updateScoreDisplay(gameControllerTTT.getGameState().playerOneScore, gameControllerTTT.getGameState().playerTwoScore); // See updateScoreDisplay below
                endGameButtonContainer.appendChild(restartButton);

            // Display draw if round is over and there is no winner, and append buttons for new round or game
            } else if (gameControllerTTT.getGameState().isRoundOver && !gameControllerTTT.checkForWin()) {
                gameStateDisplay.textContent = `Round Over! It's a draw!`;
                endGameButtonContainer.appendChild(restartButton);
                endGameButtonContainer.appendChild(nextRoundButton);
            };
        };
    };

    // Function to update and animate score
    const updateScoreDisplay = (playerOneScore, playerTwoScore) => {
        if (gameControllerTTT.getGameState().playerTurn === playersTTT.getPlayerOne()) {
            playerOneInfo.textContent = `${playersTTT.getPlayerOne().name}'s Score: ${playerOneScore}`; // Update score display
            playerOneInfo.classList.add("player-score-update"); // Add animation class
            setTimeout(() => {
                playerOneInfo.classList.remove("player-score-update");
                }, 300); // Matches the CSS transition duration
        } else {
            playerTwoInfo.textContent = `${playersTTT.getPlayerTwo().name}'s Score: ${playerTwoScore}`;
            playerTwoInfo.classList.add("player-score-update");
            setTimeout(() => {
                playerTwoInfo.classList.remove("player-score-update");
                }, 300); 
        };
    };
    
    // Function to update and animate player marker icons
    const updatePlayerIcon = function() {
        if (playersTTT.getPlayerOne().marker === "X") {
            playerOneIcon.textContent = "O"
            playerTwoIcon.textContent = "X";
        } else {
            playerOneIcon.textContent = "X";
            playerTwoIcon.textContent = "O";
        };
        playerOneIcon.classList.add("player-icon-update");
        playerTwoIcon.classList.add("player-icon-update");
        setTimeout(() => {
            playerOneIcon.classList.remove("player-icon-update");
            playerTwoIcon.classList.remove("player-icon-update");
        }, 300);
    };

    const handleNextRoundClick = function() {
        endGameButtonContainer.removeChild(nextRoundButton);
        endGameButtonContainer.removeChild(restartButton);
        updatePlayerIcon();
        resetBoardDisplay();
        gameControllerTTT.nextRound();
        gameStateDisplay.textContent = `Round ${gameControllerTTT.getGameState().roundNumber}, ${gameControllerTTT.getGameState().whoStarts.name} Starts`;
    };

    const handleRestartClick = function() {
        const gameFormHeader = document.querySelector(".start-game-form-header");
        gameFormHeader.textContent = "Rename Players or Start Game";
        // Clear form inputs and reset player names to default (player can rename by submitting form)
        const inputFields = document.querySelectorAll(".player-input-field");
        inputFields.forEach(input => {
            input.value = "";
        });
        playersTTT.getPlayerOne().name = "Player 1";
        playersTTT.getPlayerTwo().name = "Player 2";

        if (!gameControllerTTT.getGameState().isGameOver) {
            endGameButtonContainer.removeChild(nextRoundButton);
            endGameButtonContainer.removeChild(restartButton);
            initialDialog.show();
        } else {
            endGameButtonContainer.removeChild(restartButton);
            initialDialog.show();
        };
    };

    const gameButton = document.querySelectorAll(".game-button");
    const resetBoardDisplay = function() {
        gameButton.forEach(node => node.style.backgroundColor = "white");
        gameButton.forEach(node => node.textContent = "");
        gameButton.forEach(node => node.dataset.marked = "false"); // Reset game button element's marked dataset
    };

    const initEventListeners = function() {
        gameForm.addEventListener("submit", handleStartClick);
        gameButton.forEach(node => node.addEventListener("mouseenter", handleMouseEnter));
        gameButton.forEach(node => node.addEventListener("mouseleave", handleMouseLeave));
        gameButton.forEach(node => node.addEventListener("click", handleGameButtonClick));
        nextRoundButton.addEventListener("click", handleNextRoundClick);
        restartButton.addEventListener("click", handleRestartClick);
    };

    return { handleStartClick, initEventListeners, handleGameButtonClick, updateScoreDisplay, updatePlayerIcon, handleNextRoundClick, handleRestartClick };
})();

document.addEventListener("DOMContentLoaded", displayControllerTTT.initEventListeners);