const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const roadImage = new Image();
roadImage.src = './imagenes/carretera.png';

let roadY1 = 0;
let roadY2 = -canvas.height;
let score = 0;
let scoreCounter = 0;
const scoreElement = document.getElementById('score');
const scoreboard = document.getElementById('scoreboard');

let isPaused = false; // Variable para el estado de pausa
let animationId; // Variable para almacenar el ID de la animación

canvas.style.display = 'none';
scoreboard.style.display = 'none';

const startButton = document.getElementById('startButton'); 
const menu = document.getElementById('menu');

startButton.addEventListener('click', () => {
    menu.style.display = 'none';
    canvas.style.display = 'block';
    scoreboard.style.display = 'block';
    generateEnemies(); // Llama para generar enemigos al iniciar el juego
    iniciarJuego();
});

function drawRoad() {
    ctx.drawImage(roadImage, 0, roadY1, canvas.width, canvas.height);
    ctx.drawImage(roadImage, 0, roadY2, canvas.width, canvas.height);
}

function updateScore() {
    score += 1;
    scoreElement.textContent = score;
}

function updateRoad() {
    roadY1 += 5;
    roadY2 += 5;

    if (roadY1 >= canvas.height) {
        roadY1 = -canvas.height;
    }
    if (roadY2 >= canvas.height) {
        roadY2 = -canvas.height;
    }
}

function iniciarJuego() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    updateRoad();
    drawRoad();

    if (!isPaused) {
        movePlayer();
        drawPlayer();
        drawExplosion(); // Dibuja la explosión si es necesario
        moveEnemies();
        drawEnemies();
        detectCollision();

        scoreCounter++;
        if (scoreCounter % 60 === 0) {
            updateScore();
        }

        animationId = requestAnimationFrame(iniciarJuego);
    }
}

// Funciones para mostrar/ocultar la ventana modal de pausa
function showPauseModal() {
    isPaused = true;
    document.getElementById('pauseModal').style.display = 'block';
    cancelAnimationFrame(animationId);
}

function hidePauseModal() {
    isPaused = false;
    document.getElementById('pauseModal').style.display = 'none';
    iniciarJuego();
}

// Eventos de teclado
window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        if (!isPaused) {
            showPauseModal();
        }
    }
});

// Evento para el botón de continuar en la ventana modal de pausa
document.getElementById('continueButton').addEventListener('click', hidePauseModal);

// Generación y manejo de enemigos
const enemyCarImage = new Image();
enemyCarImage.src = './imagenes/carroE.png';

const positions = [100, 250, 400, 550];
let enemies = [];

function generateEnemies() {
    const enemyCount = 6; // Número de enemigos
    enemies = []; // Reiniciar el array de enemigos
    for (let i = 0; i < enemyCount; i++) {
        const positionIndex = Math.floor(Math.random() * positions.length);
        const enemy = {
            x: positions[positionIndex],
            y: -100 - Math.random() * 400,
            width: 50,
            height: 100,
            speed: 1 + Math.random() * 2
        };
        enemies.push(enemy);
    }
}

// Generar enemigos continuamente
setInterval(generateEnemies, 2000);

function drawEnemies() {
    for (let enemy of enemies) {
        ctx.drawImage(enemyCarImage, enemy.x, enemy.y, enemy.width, enemy.height);
    }
}

function moveEnemies(playerX) {
    for (let enemy of enemies) {
        enemy.y += enemy.speed;

        // Hacer que el enemigo intente seguir al jugador
        if (enemy.x < playerX) {
            enemy.x += 1;
        } else if (enemy.x > playerX) {
            enemy.x -= 1;
        }

        // Si el enemigo sale de la pantalla, vuelve a aparecer en la parte superior
        if (enemy.y > canvas.height) {
            enemy.y = -100 - Math.random() * 400;
            const positionIndex = Math.floor(Math.random() * positions.length);
            enemy.x = positions[positionIndex];
        }
    }
}

function getEnemies() {
    return enemies;
}

// Explosion
const explosionImage = new Image();
explosionImage.src = './imagenes/explo.gif'; // Ruta del GIF de explosión
let explosionVisible = false; // Controla si la explosión debe mostrarse

function detectCollision() {
    const player = getPlayerPosition();
    const enemies = getEnemies();

    for (let enemy of enemies) {
        if (player.x < enemy.x + enemy.width &&
            player.x + player.width > enemy.x &&
            player.y < enemy.y + enemy.height &&
            player.height + player.y > enemy.y) {
            // Colisión detectada
            explosionVisible = true; // Muestra la explosión
            setTimeout(() => {
                document.location.reload(); // Recarga después de un tiempo
            }, 1000); // Espera 1 segundo para mostrar la explosión
        }
    }
}

function drawExplosion() {
    if (explosionVisible) {
        ctx.drawImage(explosionImage, playerCar.x, playerCar.y, playerCar.width, playerCar.height);
    }
}

// Asegúrate de que estas funciones existan y se llamen correctamente
function getPlayerPosition() {
    return { x: playerCar.x, y: playerCar.y, width: playerCar.width, height: playerCar.height };
}

function drawPlayer() {
    ctx.drawImage(playerCarImage, playerCar.x, playerCar.y, playerCar.width, playerCar.height);
}
