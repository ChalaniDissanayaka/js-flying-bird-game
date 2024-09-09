// Select elements from the DOM
const score = document.querySelector(".score"); // Element to display the score
const startScreen = document.querySelector(".startScreen"); // Element for the start screen
const gameArea = document.querySelector(".gameArea"); // Game area where the bird will fly
const gameMessage = document.querySelector(".gameMessage"); // Message displayed during the game

// Add event listeners for clicks on the gameMessage and startScreen elements to start the game
gameMessage.addEventListener("click", start);
startScreen.addEventListener("click", start);

// Add event listeners to track key presses for controlling the bird
document.addEventListener("keydown", pressOn);
document.addEventListener("keyup", pressOff);

let keys = {}; // Object to store the pressed keys
let player = {}; // Object to store player properties

// Function to start the game
function start() {
    console.log("start");
    player.speed = 2; // Set the speed of the bird
    player.score = 0; // Initialize the score to 0
    player.inplay = true; // Set the player as active (in-play)
    gameArea.innerHTML = ""; // Clear the game area
    gameMessage.classList.add("hide"); // Hide the game message
    startScreen.classList.add("hide"); // Hide the start screen

    // Create the bird element and set its class
    let bird = document.createElement("div");
    bird.setAttribute("class", "bird");

    // Create the wing element, set its class, and position
    let wing = document.createElement("span");
    wing.setAttribute("class", "wing");
    wing.pos = 15; // Initial wing position
    wing.style.top = wing.pos + "px"; // Set initial top position of the wing
    bird.appendChild(wing); // Append the wing to the bird

    gameArea.appendChild(bird); // Append the bird to the game area

    // Set the initial position of the bird
    player.x = bird.offsetLeft;
    player.y = bird.offsetTop;

    // Start the game animation loop
    window.requestAnimationFrame(playGame);
}

// Function to handle the game loop and update the bird's position
function playGame() {
    console.log(player);

    // Check if the player is still in play
    if (player.inplay) {
        let bird = document.querySelector(".bird"); // Get the bird element
        let wing = document.querySelector(".wing"); // Get the wing element
        let move = false; // Variable to track if the bird is moving

        // Handle left arrow key press and move the bird left if within bounds
        if (keys.ArrowLeft && player.x > 0) {
            player.x -= player.speed;
            move = true;
        }

        // Handle right arrow key press and move the bird right if within bounds
        if (keys.ArrowRight && player.x < (gameArea.offsetWidth - 50)) {
            player.x += player.speed;
            move = true;
        }

        // Handle up arrow or spacebar press and move the bird up if within bounds
        if ((keys.ArrowUp || keys.Space) && player.y > 0) {
            player.y -= (player.speed * 5);
            move = true;
        }

        // Handle down arrow key press and move the bird down if within bounds
        if (keys.ArrowDown && player.y < (gameArea.offsetHeight - 50)) {
            player.y += player.speed;
            move = true;
        }

        // Animate the bird's wing movement when the bird moves
        if (move) {
            wing.pos = (wing.pos == 15) ? 25 : 15; // Toggle wing position
            wing.style.top = wing.pos + "px"; // Update wing's top position
        }

        // Gravity effect, causing the bird to fall
        player.y += (player.speed * 2);

        // Check if the bird falls out of the game area (game over condition)
        if (player.y > gameArea.offsetHeight) {
            console.log("game over");
            playGameOver(bird); // Trigger game over if bird goes out of bounds
        }

        // Update the bird's position on the screen
        bird.style.top = player.y + "px";
        bird.style.left = player.x + "px";

        // Continue the game loop
        window.requestAnimationFrame(playGame);

        // Increment and display the score
        player.score++;
        score.innerText = "Score: " + player.score;
    }
}

// Function to handle game over scenario
function playGameOver(bird) {
    player.inplay = false; // Set the player as not in-play (game over)
    gameMessage.classList.remove("hide"); // Show the game over message
    bird.setAttribute("style", "transform:rotate(180deg)"); // Rotate the bird upside down (falling animation)
    gameMessage.innerHTML = "Game Over<br>You scored " + player.score + "<br>Click here to start again"; // Display final score and restart message
}

// Function to handle key press down event
function pressOn(e) {
    e.preventDefault(); // Prevent default browser actions for keypress
    keys[e.code] = true; // Set the corresponding key as pressed in the keys object
    console.log(keys); // Log the pressed keys
}

// Function to handle key press up event
function pressOff(e) {
    e.preventDefault(); // Prevent default browser actions for keypress
    keys[e.code] = false; // Set the corresponding key as released in the keys object
}