const dino = document.getElementById('dino');
const obstacle = document.getElementById('obstacle');
const scoreEl = document.getElementById('score');

let isJumping = false;
let gravity = 0.9;
let position = 0;
let score = 0;

// Jump function
function jump() {
    if (isJumping) return;
    isJumping = true;

    let count = 0;
    let upInterval = setInterval(() => {
        if (count === 15) {
            clearInterval(upInterval);

            // Fall down
            let downInterval = setInterval(() => {
                if (count === 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                }
                position -= 5;
                count--;
                position *= gravity;
                dino.style.bottom = position + 'px';
            }, 20);
        }

        // Jump up
        position += 30;
        count++;
        position *= gravity;
        dino.style.bottom = position + 'px';
    }, 20);
}

// Listen for key press
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' || e.code === 'ArrowUp') {
        jump();
    }
});

// Obstacle movement
let obstacleSpeed = 10;
function createObstacle() {
    let obstaclePosition = 600;
    obstacle.style.right = '0px';

    let moveObstacle = setInterval(() => {
        obstaclePosition -= obstacleSpeed;
        obstacle.style.right = obstaclePosition + 'px';

        // Collision detection
        if (obstaclePosition < 50 && obstaclePosition > 0 && position < 50) {
            clearInterval(moveObstacle);
            alert('Game Over! Your score: ' + score);
            score = 0;
            scoreEl.textContent = score;
            obstaclePosition = 600;
            obstacle.style.right = obstaclePosition + 'px';
        }

        // Update score
        if (obstaclePosition === 0) {
            score++;
            scoreEl.textContent = score;
        }

    }, 20);
}

// Start game
setInterval(createObstacle, 2000);
