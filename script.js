// Basic setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let score = 0;
let blocksCollected = 0;

// Basic game elements
const Steve = {
    x: 50,
    y: canvas.height / 2,
    width: 50,
    height: 50,
    color: 'blue',
    speed: 5,
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
};

const Zombies = [];

function createZombie() {
    const zombie = {
        x: canvas.width,
        y: Math.random() * (canvas.height - 50),
        width: 50,
        height: 50,
        color: 'green',
        speed: 3,
        draw() {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        },
        update() {
            this.x -= this.speed;
            if (this.x < -this.width) {
                this.x = canvas.width;
                this.y = Math.random() * (canvas.height - 50);
            }
        }
    };
    Zombies.push(zombie);
}

// Basic game loop
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    Steve.draw();

    Zombies.forEach(zombie => {
        zombie.update();
        zombie.draw();
    });

    // Check for collisions
    Zombies.forEach(zombie => {
        if (Steve.x < zombie.x + zombie.width &&
            Steve.x + Steve.width > zombie.x &&
            Steve.y < zombie.y + zombie.height &&
            Steve.y + Steve.height > zombie.y) {
            alert('Game Over!');
            resetGame();
        }
    });

    // Update score and HUD
    score += 0.1;
    document.getElementById('score').innerText = `Score: ${Math.floor(score)}`;
    document.getElementById('blocks-collected').innerText = `Blocks: ${blocksCollected}`;
    
    requestAnimationFrame(update);
}

function resetGame() {
    score = 0;
    blocksCollected = 0;
    Steve.x = 50;
    Steve.y = canvas.height / 2;
    Zombies.length = 0; // Clear zombies
    for (let i = 0; i < 5; i++) {
        createZombie();
    }
}

// Handle user input
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
        Steve.y -= Steve.speed;
    } else if (e.key === 'ArrowDown') {
        Steve.y += Steve.speed;
    }
});

createZombie(); // Initialize some zombies
update(); // Start the game loop
