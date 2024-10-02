let grid = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
let history = [];  // Храним только последние 10 состояний
let balance = 100;  // Пример начального баланса

// Ограничиваем историю до 10 ходов
function saveState() {
    if (history.length >= 10) {
        history.shift();  // Удаляем самое старое состояние
    }
    history.push(grid.map(row => [...row]));  // Копируем текущее состояние
}

function undoMove() {
    if (history.length > 0) {
        grid = history.pop();  // Восстанавливаем последнее состояние
        updateGrid();  // Обновляем визуализацию сетки
    }
}

function move(direction) {
    saveState();  // Сохраняем состояние перед любым движением
    // Логика движения плиток в зависимости от направления
    // Пример:
    switch (direction) {
        case "up":
            moveUp();
            break;
        case "down":
            moveDown();
            break;
        case "left":
            moveLeft();
            break;
        case "right":
            moveRight();
            break;
    }
    addNewTile();  // Добавляем новую плитку после хода
}

function addNewTile() {
    // Добавляем новую плитку на пустую клетку
    // Логика генерации новой плитки
}

function updateGrid() {
    // Обновляем визуальное отображение сетки на основе массива grid
    // Логика обновления HTML элементов, например через классы
}

function moveUp() {
    // Реализация движения плиток вверх
}

function moveDown() {
    // Реализация движения плиток вниз
}

function moveLeft() {
    // Реализация движения плиток влево
}

function moveRight() {
    // Реализация движения плиток вправо
}
