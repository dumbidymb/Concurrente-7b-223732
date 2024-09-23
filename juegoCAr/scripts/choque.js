const explosionImage = new Image();
explosionImage.src = './imagenes/explo.gif'; // Ruta del GIF de explosión
let explosionVisible = false; // Controla si la explosión debe mostrarse
let collisionDetected = false; // Para evitar múltiples colisiones

// Detecta la colisión
function detectCollision() {
    const player = getPlayerPosition();
    const enemies = getEnemies();

    for (let enemy of enemies) {
        if (player.x < enemy.x + enemy.width &&
            player.x + player.width > enemy.x &&
            player.y < enemy.y + enemy.height &&
            player.height + player.y > enemy.y && !collisionDetected) {
            
            // Colisión detectada
            explosionVisible = true; // Muestra la explosión
            collisionDetected = true; // Evita detectar múltiples colisiones

            // Tiempo de duración de la explosión (en milisegundos)
            const explosionDuration = 1000; // Duración de 1 segundo, ajustable según la duración de tu GIF

            // Mostrar la explosión y luego mostrar el mensaje de colisión
            setTimeout(() => {
                alert("¡Has chocado!");
                document.location.reload(); // Recarga después de que se muestra el mensaje
            }, explosionDuration); // Espera a que termine la animación
        }
    }
}

// Dibuja la explosión en la posición del jugador
const explosionImage = new Image();
explosionImage.src = './imagenes/explo.gif'; // Ruta del GIF de explosión
let explosionVisible = false; // Controla si la explosión debe mostrarse
let collisionDetected = false; // Para evitar múltiples colisiones
let explosionPosition = { x: 0, y: 0 }; // Posición donde ocurre la explosión

let roadStopped = false; // Variable para detener el movimiento de la carretera

// Elementos del modal
const gameOverModal = document.getElementById('gameOverModal');
const finalScoreElement = document.getElementById('finalScore');
const retryButton = document.getElementById('retryButton');
const menuButton = document.getElementById('menuButton');

// Detecta la colisión
function detectCollision() {
    const player = getPlayerPosition();
    const enemies = getEnemies();

    for (let enemy of enemies) {
        if (player.x < enemy.x + enemy.width &&
            player.x + player.width > enemy.x &&
            player.y < enemy.y + enemy.height &&
            player.height + player.y > enemy.y && !collisionDetected) {

            // Colisión detectada
            collisionDetected = true;
            explosionVisible = true;

            // Guardar la posición exacta donde ocurrió la colisión
            explosionPosition = { x: player.x, y: player.y };

            // Detener el movimiento del juego
            stopGameMovement();

            // Tiempo de duración de la explosión (en milisegundos)
            const explosionDuration = 1000; // Ajusta según la duración del GIF

            // Mostrar la explosión y luego mostrar el modal de "Has perdido"
            setTimeout(() => {
                showGameOverModal();
            }, explosionDuration); // Espera a que termine la animación de la explosión
        }
    }
}

// Función para detener el movimiento del coche, enemigos y carretera
function stopGameMovement() {
    // Detener el movimiento del jugador
    playerCar.speed = 0;
    
    // Detener el movimiento de todos los enemigos
    for (let enemy of enemies) {
        enemy.speed = 0;
    }
    
    // Detener el movimiento de la carretera
    roadStopped = true;
}

// Dibuja la explosión en la posición de la colisión
function drawExplosion() {
    if (explosionVisible) {
        ctx.drawImage(explosionImage, explosionPosition.x, explosionPosition.y, playerCar.width, playerCar.height);
    }
}

// Actualiza el fondo de la carretera
function updateRoad() {
    if (!roadStopped) { // Solo actualiza la carretera si no ha ocurrido una colisión
        roadY1 += 5;
        roadY2 += 5;

        if (roadY1 >= canvas.height) {
            roadY1 = -canvas.height;
        }
        if (roadY2 >= canvas.height) {
            roadY2 = -canvas.height;
        }
    }
}

// Función para mostrar el modal de "Has perdido" con el puntaje final
function showGameOverModal() {
    // Muestra el puntaje final
    finalScoreElement.textContent = `Puntaje: ${score}`;
    
    // Muestra el modal
    gameOverModal.style.display = 'block';
}

// Eventos de los botones del modal
retryButton.addEventListener('click', () => {
    // Reinicia variables del juego sin recargar la página
    explosionVisible = false;
    collisionDetected = false;
    roadStopped = false;
    score = 0;

    // Ocultar modal
    gameOverModal.style.display = 'none';

    // Reiniciar el estado del juego
    generateEnemies();  // Regenera enemigos
    iniciarJuego();     // Reinicia la animación
});

menuButton.addEventListener('click', () => {
    // Lógica para volver al menú principal
    gameOverModal.style.display = 'none';
    canvas.style.display = 'none';
    scoreboard.style.display = 'none';
    menu.style.display = 'block';
});
