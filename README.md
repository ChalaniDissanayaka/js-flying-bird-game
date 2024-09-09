# Flying Bird Game

## Description:

The Flying Bird Game is an interactive, browser-based game built using JavaScript, CSS, and HTML. Players control a bird that continuously moves forward, navigating through obstacles (pipes) by pressing keys to make the bird fly. The goal is to avoid colliding with the pipes or falling out of the game area while accumulating points over time. The game features smooth animations, responsive controls, and collision detection, offering an engaging and fun challenge. The colorful design, created with CSS, adds to the visually appealing environment, while HTML provides the structural framework of the game interface.

### Functionality:

1.  `Start and Restart:` The game begins when the player clicks on the start screen, and restarts after a game-over message.
2.  `Bird Movement:` The bird is controlled using the arrow keys or spacebar for movement, with gravity continuously pulling the bird downward.
3.  `Pipes:` Pipes are randomly generated and move from right to left. The player must avoid them to survive.
4.  `Collision Detection:` The game detects collisions between the bird and pipes, or if the bird falls out of bounds, triggering game over.

### Features:

1.  `Dynamic Pipe Generation:`
    - Pipes are randomly generated with different heights and gaps.
    - Random pipe colors add visual variety.
2.  `Score Display:`
    - The score increases over time and is displayed on the screen.
3.  `Gravity and Physics:`
    - The bird is subject to gravity, requiring constant movement to stay airborne.
4.  `Game Over and Restart:`
    - The game ends when the bird hits a pipe or falls out of the game area.
    - After a game over, the final score is displayed, and the player can click to restart.
5.  `Smooth Animation:`
    - The game uses requestAnimationFrame for smooth movement of both the bird and pipes.
6.  `Bird Wing Movement:`
    - The bird's wings animate when it moves, adding a lively visual effect.

#### Helpful Links :-

- [requestAnimationFrame() method](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame)
