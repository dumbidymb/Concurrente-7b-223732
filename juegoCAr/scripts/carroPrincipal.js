const playerCarImage = new Image();
playerCarImage.src = './imagenes/carroP.png'; // Ruta de la imagen del carro

let playerCar = {
    x: canvas.width / 2 - 25, // Comienza en el centro del canvas
    y: canvas.height - 100,
    width: 50,
    height: 100,
    speed: 2.5 // Velocidad de movimiento reducida para un desplazamiento más lento
};

let keys = {};

// Escucha eventos de tecla
document.addEventListener('keydown', (event) => {
    keys[event.key] = true;
});

document.addEventListener('keyup', (event) => {
    keys[event.key] = false;
});

function movePlayer() {
    // Mueve el coche basado en las teclas presionadas
    if (keys['ArrowLeft'] && playerCar.x > 0) {
        playerCar.x -= playerCar.speed; // Mueve a la izquierda
    }
    if (keys['ArrowRight'] && playerCar.x + playerCar.width < canvas.width) {
        playerCar.x += playerCar.speed; // Mueve a la derecha
    }
}

function drawPlayer() {
    ctx.drawImage(playerCarImage, playerCar.x, playerCar.y, playerCar.width, playerCar.height);
}

function getPlayerPosition() {
    return { x: playerCar.x, y: playerCar.y, width: playerCar.width, height: playerCar.height };
}
