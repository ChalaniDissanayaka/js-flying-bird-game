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
    // Set the player score as 0
    player.score = 0;

    gameMessage.classList.add("hide"); // Hide the game message element
    startScreen.classList.add("hide"); // Hide the start screen element

    // Create a new div element to represent the bird and assign it a class of "bird"
    let bird = document.createElement("div");
    bird.setAttribute("class", "bird");

    // Add styles for the bird
    // Create a new span element to represent the bird's wing, assign it a class of "wing", and append it to the bird element
    let wing = document.createElement("span");
    wing.setAttribute("class", "wing");
    // setting the defult wing object and set data value
    wing.pos = 15;
    wing.style.top = wing.pos + "px";  // style the wing
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
    let move = false;

    // Check if the left arrow key is pressed and the player is within the game area's left boundary
    if (keys.ArrowLeft && player.x > 0) {
        player.x -= player.speed;
        move = true;
    }
    // Check if the right arrow key is pressed and the player is within the game area's right boundary
    if (keys.ArrowRight && player.x < (gameArea.offsetWidth - 50)) {
        player.x += player.speed;
        move = true;
    }
    // Check if the up arrow key is pressed and the player is within the game area's top boundary
    if ((keys.ArrowUp || keys.Space) && player.y > 0) {
        player.y -= (player.speed*5);
        move = true;
    }
    // Check if the down arrow key is pressed and the player is within the game area's bottom boundary
    if (keys.ArrowDown && player.y > (gameArea.offsetHeight - 50)) {
        player.y += player.speed;
        move = true;
    }
    if (move) {
        wing.pos = (wing.pos == 15) ? 25 : 15;
        wing.style.top = wing.pos + "px";
    }    
    // Adding automatic gravity
    player.y += (player.speed*2);
    if(bird.offsetTop > gameArea.offsetHeight) {
        console.log("game over");
    }
    // Animation using Js 
    // Update bird's position on the screen by setting its top and left CSS properties
    bird.style.top = player.y + "px";
    bird.style.left = player.x + "px";
    // console.log("play");
    window.requestAnimationFrame(playGame);
    // Adding the score
    player.score++;
    score.innerText = "Score:"+player.score;
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