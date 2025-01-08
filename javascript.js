// Gameboard Module
const gameBoard = (function(){
    let gameBoardArr = ["", "", "", "", "", "", "", "", ""];
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
const players = function(playerOne = "Player One", playerTwo = "Player Two") {
    const playerOneMarker = "X";
    const playerTwoMarker = "O";
    return { 
        "Player 1": {"name": playerOne, "marker": playerOneMarker}, 
        "Player 2": { "name": playerTwo, "marker": playerTwoMarker } 
    };
};

gameBoard.playRound(0, players()["Player 1"]["marker"]);
gameBoard.playRound(1, players()["Player 1"]["marker"]);
gameBoard.playRound(2, players()["Player 1"]["marker"]);
gameBoard.playRound(3, players()["Player 1"]["marker"]);
gameBoard.playRound(4, players()["Player 1"]["marker"]);
gameBoard.playRound(5, players()["Player 1"]["marker"]);
gameBoard.playRound(6, players()["Player 1"]["marker"]);
gameBoard.playRound(7, players()["Player 1"]["marker"]);
gameBoard.playRound(8, players()["Player 1"]["marker"]);