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

    const players = {
        "playerOne": createTTTPlayer("Player 1", "X"),
        "playerTwo": createTTTPlayer("Player 2", "O")
    };

    const gameState = {
        "playerTurn": players.playerOne,
        "turnNumber": 1,
        "isGameOver": false
    };

    const startGame = function() {
        gameState.playerTurn = players.playerOne;
        gameState.turnNumber = 1;
        gameState.isGameOver = false;
        gameBoard.resetBoard();
        console.log(`Game Starts! It is ${players.playerOne.name}'s turn, type gameControllerTTT.playRound() to place your marker.`);
        console.log(gameBoard.showConsoleBoard());
    };

    const playRound = function(position) {

        // Execute if player one's turn 
        if (gameState.playerTurn === players.playerOne && gameState.turnNumber < 9 && gameState.isGameOver === false) { 
            gameBoard.markBoard(position, players.playerOne.marker);
            ++gameState.turnNumber;
            console.log(`${players.playerOne.name} marked box ${position}.`);
            console.log(gameBoard.showConsoleBoard());
            checkForWin();
            switchTurn();
        
        // Execute if player two's turn
        } else if (gameState.playerTurn === players.playerTwo && gameState.turnNumber < 9 && gameState.isGameOver === false) {
            gameBoard.markBoard(position, players.playerTwo.marker);
            ++gameState.turnNumber;
            console.log(`${players.playerTwo.name} marked box ${position}.`);
            console.log(gameBoard.showConsoleBoard());
            checkForWin();
            switchTurn();

        // Execute if draw   
        } else if (gameState.turnNumber >= 9) {
            gameOver();
            console.log(gameBoard.showConsoleBoard());
            console.log("Game over! It's a draw. type gameControllerTTT.startGame() to restart.");
        };
    };

    const switchTurn = function() {

        // Switch to player 2 after player 1 plays
        if (gameState.isGameOver === false && gameState.playerTurn === players.playerOne) { 
            gameState.playerTurn = players.playerTwo;
            console.log(`It is ${players.playerTwo.name}'s turn, type gameControllerTTT.playRound() to place your marker.`);
        
        // Switch to player 1 after player 2 plays
        } else if (gameState.isGameOver === false && gameState.playerTurn === players.playerTwo) { 
            gameState.playerTurn = players.playerOne;
            console.log(`It is ${players.playerOne.name}'s turn, type gameControllerTTT.playRound() to place your marker.`);
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

    return { players, startGame, playRound };
})();