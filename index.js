/********************************
 *           Class Box          *
 ********************************/

class Box {

    constructor(id, box) {
        this.id = id;
        this.player = "";
        box.innerHTML = "";
    }

    setPlayer(player, box) {
        if(this.player === "") {
            this.player = player;
            box.innerHTML = player;
        }
    }

}


/***********************************
 *           Game program          *
 ***********************************/

const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
const currentPlayerDiv = document.getElementById("currentPlayer");
const clock = document.getElementById("clock");

let tabBox;
let currentPlayer = "X";
let round;
let player1Score = 0;
let player2Score = 0;
let countdownInit = 180;

player1.innerHTML =  "Player 1 (X) : " + player1Score;
player2.innerHTML =  "Player 2 (O) : " + player2Score;

// grid initialization
function initGame() {
    tabBox = [];
    round = 1;
    currentPlayerDiv.innerHTML = currentPlayer + ", c'est à vous de jouer";
    for(let i = 0; i < 9; i++) {
        const b = document.getElementById(i);
        let box = new Box(i, b);
        tabBox.push(box);
    }
}

// click on the box
function click() {
    for(let i = 0; i < 9; i++) {
        const box = document.getElementById(i);
        box.onclick = function () {
            const initvalue = tabBox[i].player;
            tabBox[i].setPlayer(currentPlayer, box);
            if(verifVictoryRound()) {
                if(currentPlayer === "X") {
                    player1Score += 1;
                    alert("Player 1 (X),  vous avez gagné cette manche. +1 point ");
                    player1.innerHTML =  "Player 1 (X) : " + player1Score;
                } else if(currentPlayer === "O") {
                    player2Score += 1;
                    alert("Player 2 (O),  vous avez gagné cette manche. +1 point ");
                    player2.innerHTML =  "Player 2 (O) : " + player2Score;
                }
                var resultRound = setInterval(function() {
                    initGame();
                    clearInterval(resultRound);
                }, 500);
            }
            if(initvalue === "") {
                changePlayer();
                round++;
            }
            if(round == 10) {
                alert("Egalité, manche suivante");
                initGame();
            }
        };
    }
}

// function for change player 
function changePlayer() {
    if(currentPlayer === "X") {
        currentPlayer = "O";
    } else if(currentPlayer === "O") {
        currentPlayer = "X";
    }
    currentPlayerDiv.innerHTML = currentPlayer + ", c'est à vous de jouer";
}

// function to check if a player to win
function verifVictoryRound() {
    return verifRow() || verifColumn() || verifDiagonal();
}

// function to check if a player to win a row
function verifRow() {
    for(const i of [0, 3, 6]) {
        if(tabBox[i].player === currentPlayer && tabBox[i + 1].player === currentPlayer && tabBox[i + 2].player === currentPlayer) {
            return true;
        }
    }
    return false;
}

// function to check if a player to win a column

function verifColumn() {
    for(const i of [0, 1, 2]) {
        if(tabBox[i].player === currentPlayer && tabBox[i + 3].player === currentPlayer && tabBox[i + 6].player === currentPlayer) {
            return true;
        }
    }
    return false;
}

// function to check if a player to win a diagonal

function verifDiagonal() {
    const diagonal1 = tabBox[0].player === currentPlayer && tabBox[4].player === currentPlayer && tabBox[8].player === currentPlayer;
    const diagonal2 = tabBox[2].player === currentPlayer && tabBox[4].player === currentPlayer && tabBox[6].player === currentPlayer;
    return diagonal1 || diagonal2;
}

// final score display

function victory() {
    if(player1Score > player2Score) {
        alert(`Player 1 (X), vous avez gagné ${ player1Score } à ${ player2Score }`);
    } else if(player1Score < player2Score) {
        alert(`Player 2 (O), vous avez gagné ${ player2Score } à ${ player1Score }`);
    } else {
        alert("Match nul !");
    }
    location.reload();
}

// countdown
var countdown = setInterval(function() {
    countdownInit--;
    var hour = Math.floor(countdownInit / 3600);
    var minutes = Math.floor((countdownInit - hour * 3600) / 60);
    var seconds = countdownInit - (hour * 3600 + minutes * 60);
    minutes = (minutes < 10) ? "0" +  minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    clock.innerHTML = `${ minutes }:${  seconds }`;
    if (countdownInit < 0) {
        clearInterval(countdown);
        victory();
    }
}, 1000);

initGame();
click();