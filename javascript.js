// Gameboard Module
const gameBoard = (function(){
    const gameBoardArr = ["", "", "", "", "", "", "", "", ""];
    const consoleBoard = `    ${gameBoardArr[0]} | ${gameBoardArr[1]} | ${gameBoardArr[2]}
    - - - - - 
    ${gameBoardArr[3]} | ${gameBoardArr[4]} | ${gameBoardArr[5]}
    - - - - - 
    ${gameBoardArr[6]} | ${gameBoardArr[7]} | ${gameBoardArr[8]}`;

    return { gameBoardArr, consoleBoard };
})();

console.log(gameBoard.consoleBoard);

// Players Factory
const players = function(playerOne = "Player One", playerTwo = "Player Two") {
    const playerOneMarker = "X";
    const playerTwoMarker = "O";
    return { 
        "Player 1": {"name": playerOne, "marker": playerOneMarker}, 
        "Player 2": { "name": playerTwo, "marker": playerTwoMarker } 
    };
};

console.log(players());

// gameBoard.gameBoardArr[0] = players()