enemyCarImage.src = './imagenes/carroE.png'; // Ruta de la imagen de enemigos

const maxEnemyCount = 6;
const enemySpacing = 100; // Espaciado mínimo entre enemigos para evitar solapamientos

// Límites para las posiciones aleatorias de los enemigos
const minX = 50;  // Mínima posición X donde puede aparecer un enemigo
const maxX = canvas.width - 100;  // Máxima posición X donde puede aparecer un enemigo

// Función para verificar si la posición ya está ocupada
function isPositionOccupied(x, y) {
    return enemies.some(enemy => Math.abs(enemy.x - x) < enemySpacing && Math.abs(enemy.y - y) < enemySpacing);
}

// Función para generar un nuevo enemigo
function generateEnemies() {
    // Solo generar nuevos enemigos si el número actual es menor al máximo
    if (enemies.length < maxEnemyCount) {
        let enemyX, enemyY;
        
        // Intenta generar una posición que no esté ocupada
        do {
            enemyX = Math.random() * (maxX - minX) + minX;  // Generar X aleatoria dentro de los límites
            enemyY = -100 - Math.random() * 400;  // Posición Y aleatoria sobre la parte superior de la pantalla
        } while (isPositionOccupied(enemyX, enemyY)); // Verifica que la posición no esté ocupada

        // Crear el nuevo enemigo con una posición válida
        const enemy = {
            x: enemyX,
            y: enemyY,
            width: 50,
            height: 100,
            speed: 0.5 + Math.random() * 1 // Velocidad lenta de los enemigos
        };

        enemies.push(enemy);
    }
}

// Genera un enemigo cada 2 segundos
setInterval(generateEnemies, 2000);

function drawEnemies() {
    for (let enemy of enemies) {
        ctx.drawImage(enemyCarImage, enemy.x, enemy.y, enemy.width, enemy.height);
    }
}

function moveEnemies(playerX) {
    for (let i = 0; i < enemies.length; i++) {
        const enemy = enemies[i];
        enemy.y += enemy.speed;

        // Hacer que el enemigo intente seguir al jugador
        if (enemy.x < playerX) {
            enemy.x += 1;
        } else if (enemy.x > playerX) {
            enemy.x -= 1;
        }

        // Si el enemigo sale de la pantalla, eliminarlo y generar uno nuevo
        if (enemy.y > canvas.height) {
            enemies.splice(i, 1); // Eliminar enemigo que sale de la pantalla
            generateEnemies(); // Generar nuevo enemigo
        }
    }
}

function getEnemies() {
    return enemies;
}
