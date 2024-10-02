// Размер поля 4x4
const size = 4;
let grid = [];
let score = 0;
let balance = 100;

// Инициализация игрового поля
function initGame() {
    grid = Array(size).fill().map(() => Array(size).fill(0)); // Пустая сетка 4x4
    score = 0;
    balance = 100;
    addRandomTile();
    addRandomTile();
    updateGrid();
    updateScore();
    updateBalance();
}

// Добавление новой плитки в случайное свободное место
function addRandomTile() {
    let emptyTiles = [];
    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            if (grid[r][c] === 0) emptyTiles.push([r, c]);
        }
    }
    if (emptyTiles.length > 0) {
        let [row, col] = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
        grid[row][col] = Math.random() > 0.9 ? 4 : 2;
    }
}

// Обновление сетки на странице
function updateGrid() {
    const container = document.getElementById('grid-container');
    container.innerHTML = ''; // Очистка перед обновлением

    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            tile.innerText = grid[r][c] === 0 ? '' : grid[r][c];
            container.appendChild(tile);
        }
    }
}

// Обновление счёта
function updateScore() {
    document.getElementById('score').innerText = score;
}

// Обновление баланса
function updateBalance() {
    document.getElementById('balance').innerText = balance;
}

// Начало новой игры
document.getElementById('restart').addEventListener('click', initGame);

// Сенсорное управление (swipe)
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', function(event) {
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
});

document.addEventListener('touchend', function(event) {
    const touchEndX = event.changedTouches[0].clientX;
    const touchEndY = event.changedTouches[0].clientY;
    handleSwipe(touchStartX, touchStartY, touchEndX, touchEndY);
});

function handleSwipe(startX, startY, endX, endY) {
    const deltaX = endX - startX;
    const deltaY = endY - startY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0) {
            moveRight();
        } else {
            moveLeft();
        }
    } else {
        if (deltaY > 0) {
            moveDown();
        } else {
            moveUp();
        }
    }
    updateGrid();
    checkGameOver();
}

// Логика движения (упрощённо)
function moveRight() {
    for (let r = 0; r < size; r++) {
        for (let c = size - 2; c >= 0; c--) {
            if (grid[r][c] !== 0 && grid[r][c + 1] === 0) {
                grid[r][c + 1] = grid[r][c];
                grid[r][c] = 0;
            }
        }
    }
}

// Аналогично для других направлений
function moveLeft() {
    // Логика для движения влево
}

function moveUp() {
    // Логика для движения вверх
}

function moveDown() {
    // Логика для движения вниз
}

// Проверка конца игры
function checkGameOver() {
    // Логика проверки, если нет доступных ходов
}

// Инициализация игры при загрузке страницы
initGame();
