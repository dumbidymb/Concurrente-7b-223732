

// Elementos de música
const menuMusic = document.getElementById('menuMusic');
const gameMusic = document.getElementById('gameMusic');
const modal = document.getElementById('modal');
const howToPlayButton = document.getElementById('howToPlayButton');
const closeModal = document.getElementById('closeModal');

// Mute button (SVG)
const muteButton = document.getElementById('muteButton');

// Estado de mute
let isMuted = false;

howToPlayButton.addEventListener('click', () => {
    modal.style.display = 'block';
});

// Cerrar modal al hacer clic en la "X"
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Cerrar modal si el usuario hace clic fuera del contenido
window.addEventListener('click', (event) => {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
});

// Evento para comenzar la música después de que el usuario interactúa
window.addEventListener('click', () => {
    if (!isMuted) {
        menuMusic.play(); // Comienza la música del menú después del clic
    }
}, { once: true }); // Solo se ejecuta una vez al cargar la página


// Iniciar el juego cuando el botón se clickea
startButton.addEventListener('click', () => {
    menu.style.display = 'none';
    canvas.style.display = 'block';
    menuMusic.pause(); // Detener música del menú
    gameMusic.volume = 0.2; // Volumen bajo en el juego
    if (!isMuted) { // Reproducir música del juego solo si no está en mute
        gameMusic.play(); 
    }
    iniciarJuego();
});

// Silenciar/activar música
muteButton.addEventListener('click', () => {
    isMuted = !isMuted;
    menuMusic.muted = isMuted;
    gameMusic.muted = isMuted;

    // Cambiar el icono según el estado de silencio
    muteButton.innerHTML = isMuted
        ? '<path d="M3 6v12h4l8 8V2L7 6H3z" fill="#000"/><path d="M15 9h4v6h-4z" fill="#000"/>'
        : '<path d="M12 3v3H9v4H5v3h4v4h3v3h3v-3h4v-3h-4v-4h-3V3z" fill="#000"/>';
    
    // Si está silenciado, pausar la música; si no, reproducirla
    if (isMuted) {
        menuMusic.pause();
        gameMusic.pause();
    } else {
        if (menu.style.display !== 'none') {
            menuMusic.play(); // Reproduce la música del menú si estamos en el menú
        } else {
            gameMusic.play(); // Reproduce la música del juego si estamos en la partida
        }
    }
});
