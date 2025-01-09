// Gameboard Module
const gameBoard = (function() {
    let gameBoardArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
    let consoleBoard = function() {
        return `    ${gameBoardArr[0]} | ${gameBoardArr[1]} | ${gameBoardArr[2]}
    - - - - - 
    ${gameBoardArr[3]} | ${gameBoardArr[4]} | ${gameBoardArr[5]}
    - - - - - 
    ${gameBoardArr[6]} | ${gameBoardArr[7]} | ${gameBoardArr[8]}`};

    const markBoard = function(position, marker) {
        gameBoardArr[position] = marker;
        consoleBoard();
        // console.log(consoleBoard());
    };

    return { gameBoardArr, consoleBoard, markBoard };
})();

// Players Factory
const TTTPlayers = function(playerOne = "Player One", playerTwo = "Player Two") {
    const playerOneMarker = "X";
    const playerTwoMarker = "O";
    return { 
        "Player 1": {"name": playerOne, "marker": playerOneMarker}, 
        "Player 2": { "name": playerTwo, "marker": playerTwoMarker } 
    };
};

// Initialize Players
[TTTPlayerOne, TTTPlayerTwo] = [{ "Player 1": TTTPlayers()["Player 1"]} , { "Player 2":TTTPlayers()["Player 2"] }];

// Start Game Factory
const startTTTGame = function() {
    let turn = "playerOne";
    let gameOver = false;
    console.log("Game Starts!")
    function playTurn() {
        if (turn === "playerOne") {
            console.log("Player 1's turn.");
            console.log(gameBoard.consoleBoard());
            const playerMark = prompt("Player 1: please enter board number where you would like to place your turn");
            gameBoard.markBoard(playerMark, TTTPlayerOne["Player 1"]["marker"]);
            console.log(`Player 1 marked box ${playerMark}.`);
            turn = "playerTwo";
        } else if (turn === "playerTwo") {
            console.log("Player 2's turn.");
            console.log(gameBoard.consoleBoard());
            const playerMark = prompt("Player 2: please enter board number where you would like to place your turn");
            gameBoard.markBoard(playerMark, TTTPlayerTwo["Player 2"]["marker"]);
            console.log(`Player 2 marked box ${playerMark}.`);
            turn = "playerOne";
        };
    };
    playTurn();
    playTurn();
    playTurn();
};

startTTTGame();