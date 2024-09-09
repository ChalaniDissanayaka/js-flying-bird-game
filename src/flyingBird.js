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

    // Create a new div element to represent the bird and assign it a class of "bird"
    let bird = document.createElement("div");
    bird.setAttribute("class", "bird");

    // Add styles for the bird
    // Create a new span element to represent the bird's wing, assign it a class of "wing", and append it to the bird element
    let wing = document.createElement("span");
    wing.setAttribute("class", "wing");
    bird.appendChild(wing);

    // Append the bird to the visible game area
    gameArea.appendChild(bird);

}

function pressOn(e) {
    e.preventDefalt();
    keys[e.code] = true;
        console.log(keys);
}

function pressOff(e) {
    e.preventDefalt();
    keys[e.code] = false;
        // console.log(e.code);
}