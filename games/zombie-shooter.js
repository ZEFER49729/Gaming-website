// Zombie Shooter Game

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game variables
let player; 
let zombies = []; 
let score = 0; 

// Initialize game
function init() {
    player = { x: canvas.width / 2, y: canvas.height / 2, size: 20 }; 
    document.addEventListener('keydown', handleKeydown);
    spawnZombies();
    gameLoop();
}

// Handle player movement
function handleKeydown(e) {
    switch (e.code) {
        case 'ArrowUp': player.y -= 10; break;
        case 'ArrowDown': player.y += 10; break;
        case 'ArrowLeft': player.x -= 10; break;
        case 'ArrowRight': player.x += 10; break;
    }
}

// Spawn zombies
function spawnZombies() {
    for (let i = 0; i < 5; i++) {
        zombies.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: 15
        });
    }
}

// Game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    updateZombies();
    drawZombies();
    requestAnimationFrame(gameLoop);
}

// Draw player
function drawPlayer() {
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.size, 0, Math.PI * 2);
    ctx.fill();
}

// Update and draw zombies
function updateZombies() {
    zombies.forEach((zombie, index) => {
        // Move zombie towards player
        if (zombie.x < player.x) zombie.x += 1;
        if (zombie.x > player.x) zombie.x -= 1;
        if (zombie.y < player.y) zombie.y += 1;
        if (zombie.y > player.y) zombie.y -= 1;

        // Check for collision
        if (Math.hypot(zombie.x - player.x, zombie.y - player.y) < zombie.size + player.size) {
            alert('You are caught by a zombie! Game Over!');
            document.location.reload();
        }
    });
}

// Draw zombies
function drawZombies() {
    ctx.fillStyle = 'green';
    zombies.forEach(zombie => {
        ctx.beginPath();
        ctx.arc(zombie.x, zombie.y, zombie.size, 0, Math.PI * 2);
        ctx.fill();
    });
}

// Start the game
init();
