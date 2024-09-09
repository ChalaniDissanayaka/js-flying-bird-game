const score = document.querySelector(".score");
const startScreen = document.querySelector(".startScreen");
const gameArea = document.querySelector(".gameArea");
const gameMessage = document.querySelector(".gameMessage");

gameMessage.addEventListener("click", start);
startScreen.addEventListener("click", start);
document.addEventListener("keydown", pressOn);
document.addEventListener("keyup", pressOff);

let keys = {};
function start() {
    console.log("start");
    gameMessage.classList.add("hide");
    startScreen.classList.add("hide");
}

function pressOn(e) {
keys[e.code] = true;
    console.log(keys);
}

function pressOff(e) {
keys[e.code] = false;
    // console.log(e.code);
}