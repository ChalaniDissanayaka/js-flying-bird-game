const score = document.querySelector(".score");
const startScreen = document.querySelector(".startScreen");
const gameArea = document.querySelector(".gameArea");
const gameMessage = document.querySelector(".gameMessage");

gameMessage.addEventListener("click", start);
startScreen.addEventListener("click", start);
document.addEventListener("keydown", pressOn);
document.addEventListener("keyup", pressOff);

let keys = {};
let player = {}; // create a globle object call player

function start() {
    console.log("start");

    // Set the player's movement speed to 2 units per frame
    player.speed = 2;

    gameMessage.classList.add("hide"); // Hide the game message element
    startScreen.classList.add("hide"); // Hide the start screen element

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

    // Update player's position to match the bird's current position on the screen
    player.x = bird.offsetLeft;
    player.y = bird.offsetTop;

    // Request the next animation frame to continuously call the playGame function
    window.requestAnimationFrame(playGame);
}

function playGame() {
console.log(player);
    // get the bird and wing element
    let bird = document.querySelector(".bird");
    let wing = document.querySelector(".wing");

    // Move the player left by decreasing the x position when the left arrow key is pressed
    if(keys.ArrowLeft){
        player.x -= player.speed;
    }
    if(keys.ArrowRight){
        player.x += player.speed;
    }
    if(keys.ArrowUp){
        player.y -= player.speed;
    }
    if(keys.ArrowDown){
        player.y += player.speed;
    }
    // Animation using Js 
    // Update bird's position on the screen by setting its top and left CSS properties
    bird.style.top = player.y + "px";
    bird.style.left = player.x + "px";

    // console.log("play");
    window.requestAnimationFrame(playGame);
}

function pressOn(e) {
    e.preventDefault();
    keys[e.code] = true;
    console.log(keys);
}

function pressOff(e) {
    e.preventDefault();
    keys[e.code] = false;
    // console.log(e.code);
}