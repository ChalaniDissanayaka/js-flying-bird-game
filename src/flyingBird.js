// Selecting DOM elements
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

// Global variables to track key presses and player state
let keys = {};
let player = {};

// Function to start the game
function start() {
    console.log("start");
    // Initialize player speed, score, and game state
    player.speed = 2;
    player.score = 0;
    player.inplay = true; // Set the player as active (in-play)

    // Clear the game area and hide start and game over messages
    gameArea.innerHTML = "";
    gameMessage.classList.add("hide");
    startScreen.classList.add("hide");

    // Create the bird element and set its class
    let bird = document.createElement("div");
    bird.setAttribute("class", "bird");

    // Create the wing element, set its class, and position
    let wing = document.createElement("span");
    wing.setAttribute("class", "wing");
    wing.pos = 15; // Initial position of the wing
    wing.style.top = wing.pos + "px"; // Set initial top position of the wing
    bird.appendChild(wing); // Append the wing to the bird

    // Add the bird to the game area
    gameArea.appendChild(bird);

    // Set player's initial position
    player.x = bird.offsetLeft;
    player.y = bird.offsetTop;
    player.pipe = 0; // Initialize the pipe counter to 0

    // Set the spacing between pipes
    let spacing = 300;
    // Calculate how many pipes can fit within the game area width
    let howMany = Math.floor(gameArea.offsetWidth / spacing);
    console.log(howMany);
    // Loop through and create pipes based on the available width
    for (let x = 0; x < howMany; x++) {
        // Call the buildPipes function to create pipes, positioned at multiples of the spacing
        buildPipes(player.pipe * spacing);
    }

    // Start the game animation loop
    window.requestAnimationFrame(playGame);
}

// Function to build pipes at specified positions
function buildPipes(startPos) {
    // Get the total height and width of the game area
    let totalHeight = gameArea.offsetHeight;
    let totalWidth = gameArea.offsetWidth;
    player.pipe++; // Increment pipe count

    let pipeColor = clr(); // Random pipe color

    // Create the upper pipe
    let pipe1 = document.createElement("div");
    pipe1.start = startPos + totalWidth;
    pipe1.classList.add("pipe");
    pipe1.innerHTML = "<br>" + player.pipe;
    pipe1.height = Math.floor(Math.random() * 400); // Random height for the upper pipe
    pipe1.style.height = pipe1.height + "px";
    pipe1.style.left = pipe1.start + "px";
    pipe1.style.top = "0px";
    pipe1.x = pipe1.start;
    pipe1.id = player.pipe;
    pipe1.style.backgroundColor = pipeColor;
    gameArea.appendChild(pipe1);

    // Create the lower pipe
    let pipeSpace = Math.floor(Math.random() * 250) + 150; // Space between pipes
    let pipe2 = document.createElement("div");
    pipe2.start = pipe1.start;
    pipe2.classList.add("pipe");
    pipe2.innerHTML = "<br>" + player.pipe;
    pipe2.style.height = totalHeight - pipe1.height - pipeSpace + "px";
    pipe2.style.left = pipe1.start + "px";
    pipe2.style.bottom = "0px";
    pipe2.x = pipe1.start;
    pipe2.id = player.pipe;
    pipe2.style.backgroundColor = pipeColor;
    gameArea.appendChild(pipe2);
}

// Function to generate a random color
function clr() {
    return "#" + Math.random().toString(16).substr(-6); // Generate random hex color
}

// Function to move the pipes and check for collisions
function movePipes(bird) {
    let lines = document.querySelectorAll(".pipe");
    let counter = 0;

    // Move each pipe to the left
    lines.forEach(function (item) {
        item.x -= player.speed;
        item.style.left = item.x + "px";

        // Remove pipes that move out of the screen
        if (item.x < 0) {
            item.parentElement.removeChild(item);
            counter++;
        }

        // Check for collisions between the bird and pipes
        if (isCollide(item, bird)) {
            playGameOver(bird); // End game on collision
        }
    });

    // Rebuild pipes after some are removed
    counter = counter / 2;
    for (let x = 0; x < counter; x++) {
        buildPipes(0);
    }
}

// Function to check if the bird has collided with a pipe
function isCollide(a, b) {
    let aRect = a.getBoundingClientRect();
    let bRect = b.getBoundingClientRect();

    // Return true if there is an overlap between the bird and pipe
    return !(
        aRect.bottom < bRect.top ||
        aRect.top > bRect.bottom ||
        aRect.right < bRect.left ||
        aRect.left > bRect.right
    );
}

// Function to handle the game loop and update the bird's position
function playGame() {
    if (player.inplay) {
        let bird = document.querySelector(".bird");
        let wing = document.querySelector(".wing");

        movePipes(bird); // Move pipes

        let move = false; // Track if the bird is moving

        // Handle left arrow key press and move the bird left if within bounds
        if (keys.ArrowLeft && player.x > 0) {
            player.x -= player.speed;
            move = true;
        }
        // Handle right arrow key press and move the bird right if within bounds
        if (keys.ArrowRight && player.x < gameArea.offsetWidth - 50) {
            player.x += player.speed;
            move = true;
        }
        // Handle up arrow or spacebar press and move the bird up if within bounds
        if ((keys.ArrowUp || keys.Space) && player.y > 0) {
            player.y -= player.speed * 5;
            move = true;
        }
        // Handle down arrow key press and move the bird down if within bounds
        if (keys.ArrowDown && player.y < gameArea.offsetHeight - 50) {
            player.y += player.speed;
            move = true;
        }

        // Animate the bird's wing movement when the bird moves
        if (move) {
            wing.pos = wing.pos == 15 ? 25 : 15; // Toggle wing position
            wing.style.top = wing.pos + "px"; // Update wing's top position
        }

        // Gravity effect, causing the bird to fall
        player.y += player.speed * 2;

        // Check if the bird falls out of the game area (game over condition)
        if (player.y > gameArea.offsetHeight) {
            console.log("game over");
            playGameOver(bird); // Trigger game over if bird goes out of bounds
        }

        // Update bird's position
        bird.style.top = player.y + "px";
        bird.style.left = player.x + "px";

        // Continue the game loop
        window.requestAnimationFrame(playGame);

        // Update the score
        player.score++;
        score.innerText = "Score: " + player.score;
    }
}

// Function to handle game over state
function playGameOver(bird) {
    player.inplay = false; // Set the player as not in-play (game over)
    gameMessage.classList.remove("hide"); // Show game over message
    bird.setAttribute("style", "transform:rotate(180deg)"); // Rotate the bird upside down (falling animation)
    gameMessage.innerHTML =
        "Game Over<br>You scored " + player.score + "<br>Click here to start again"; // Display final score and restart message
}

// Event handler for key press down (movement)
function pressOn(e) {
    e.preventDefault(); // Prevent default browser actions for keypress
    keys[e.code] = true; // Set the corresponding key as pressed in the keys object
    console.log(keys); // Log the pressed keys
}

// Event handler for key release
function pressOff(e) {
    e.preventDefault(); // Prevent default browser actions for keypress
    keys[e.code] = false; // Set the corresponding key as released in the keys object
}