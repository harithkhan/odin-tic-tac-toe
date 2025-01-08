// Gameboard Module
const gameBoard = (function(){
    let gameBoardArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
    let consoleBoard = function() {
        return `    ${gameBoardArr[0]} | ${gameBoardArr[1]} | ${gameBoardArr[2]}
    - - - - - 
    ${gameBoardArr[3]} | ${gameBoardArr[4]} | ${gameBoardArr[5]}
    - - - - - 
    ${gameBoardArr[6]} | ${gameBoardArr[7]} | ${gameBoardArr[8]}`};

    const playRound = function(position, marker) {
        gameBoardArr[position] = marker;
        consoleBoard();
        console.log(consoleBoard());
    };

    return { gameBoardArr, consoleBoard, playRound };
})();

console.log(gameBoard.consoleBoard());

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

console.log(TTTPlayerOne);
