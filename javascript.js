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

    // Win Logic
    const win = function () {
        return {
            1: (gameBoard.gameBoardArr[0] === "X" && gameBoard.gameBoardArr[1] === "X" && gameBoard.gameBoardArr[2] === "X"),
            2: (gameBoard.gameBoardArr[3] === "X" && gameBoard.gameBoardArr[4] === "X" && gameBoard.gameBoardArr[5] === "X"),
            3: (gameBoard.gameBoardArr[6] === "X" && gameBoard.gameBoardArr[7] === "X" && gameBoard.gameBoardArr[8] === "X"),
            4: (gameBoard.gameBoardArr[0] === "X" && gameBoard.gameBoardArr[3] === "X" && gameBoard.gameBoardArr[6] === "X"),
            5: (gameBoard.gameBoardArr[1] === "X" && gameBoard.gameBoardArr[4] === "X" && gameBoard.gameBoardArr[7] === "X"),
            6: (gameBoard.gameBoardArr[2] === "X" && gameBoard.gameBoardArr[5] === "X" && gameBoard.gameBoardArr[8] === "X"),
            7: (gameBoard.gameBoardArr[0] === "X" && gameBoard.gameBoardArr[4] === "X" && gameBoard.gameBoardArr[8] === "X"),
            8: (gameBoard.gameBoardArr[2] === "X" && gameBoard.gameBoardArr[4] === "X" && gameBoard.gameBoardArr[6] === "X"),
            9: (gameBoard.gameBoardArr[0] === "X" && gameBoard.gameBoardArr[1] === "X" && gameBoard.gameBoardArr[2] === "X"),
            10: (gameBoard.gameBoardArr[3] === "O" && gameBoard.gameBoardArr[4] === "O" && gameBoard.gameBoardArr[5] === "O"),
            11: (gameBoard.gameBoardArr[6] === "O" && gameBoard.gameBoardArr[7] === "O" && gameBoard.gameBoardArr[8] === "O"),
            12: (gameBoard.gameBoardArr[0] === "O" && gameBoard.gameBoardArr[3] === "O" && gameBoard.gameBoardArr[6] === "O"),
            13: (gameBoard.gameBoardArr[1] === "O" && gameBoard.gameBoardArr[4] === "O" && gameBoard.gameBoardArr[7] === "O"),
            14: (gameBoard.gameBoardArr[2] === "O" && gameBoard.gameBoardArr[5] === "O" && gameBoard.gameBoardArr[8] === "O"),
            15: (gameBoard.gameBoardArr[0] === "O" && gameBoard.gameBoardArr[4] === "O" && gameBoard.gameBoardArr[8] === "O"),
            16: (gameBoard.gameBoardArr[2] === "O" && gameBoard.gameBoardArr[4] === "O" && gameBoard.gameBoardArr[6] === "O")
        };
    };

    // Initialize turn and gameOver status
    let turn = "playerOne";
    let gameOver = false;
    console.log("Game Starts!");

    function playTurn() {
        if (turn === "playerOne") {
            console.log("Player 1's turn.");
            console.log(gameBoard.consoleBoard());
            const playerMark = prompt("Player 1: please enter board number where you would like to place your turn");
            gameBoard.markBoard(playerMark, TTTPlayerOne["Player 1"]["marker"]);
            console.log(`Player 1 marked box ${playerMark}.`);
            for (let winCondition of Object.values(win())) {
                if (winCondition) {
                    gameOver = true;
                    console.log(gameBoard.consoleBoard());
                    console.log("Player 1 has won!");
                };
            };
            turn = "playerTwo";
        } else if (turn === "playerTwo") {
            console.log("Player 2's turn.");
            console.log(gameBoard.consoleBoard());
            const playerMark = prompt("Player 2: please enter board number where you would like to place your turn");
            gameBoard.markBoard(playerMark, TTTPlayerTwo["Player 2"]["marker"]);
            console.log(`Player 2 marked box ${playerMark}.`);
            for (let winCondition of Object.values(win())) {
                if (winCondition) {
                    gameOver = true;
                    console.log(gameBoard.consoleBoard());
                    console.log("Player 2 has won!");
                };
            };
            turn = "playerOne";
        };
    };
    while (!gameOver) {
        playTurn();
    };
};

startTTTGame(); // Initialize game