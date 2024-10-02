let grid = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];

let history = [];  // Храним последние 10 состояний
let balance = 100;  // Для примера добавлен баланс

// Функция сохранения текущего состояния
function saveState() {
    if (history.length >= 10) {
        history.shift();  // Если история больше 10, удаляем самое старое состояние
    }
    history.push(grid.map(row => [...row]));  // Копируем текущее состояние плиток
}

// Функция отмены хода
function undoMove() {
    if (history.length > 0) {
        grid = history.pop();  // Восстанавливаем последнее состояние из истории
        updateGrid();  // Обновляем визуализацию сетки
    }
}

// Функция обновления сетки после любых изменений
function updateGrid() {
    const gridContainer = document.getElementById("grid-container");
    gridContainer.innerHTML = ''; // Очистка предыдущих плиток

    for (let row of grid) {
        for (let cell of row) {
            const tile = document.createElement("div");
            tile.classList.add("tile");
            tile.textContent = cell !== 0 ? cell : ''; // Отображение значения плитки
            gridContainer.appendChild(tile);
        }
    }
}

// Пример функции перемещения плиток (перед движением сохраняется состояние)
function moveTiles(direction) {
    saveState();  // Сохраняем текущее состояние перед каждым движением
    // Логика движения плиток в зависимости от направления (сохраняется твоя логика)
    switch(direction) {
        case "up":
            // Логика для движения вверх
            break;
        case "down":
            // Логика для движения вниз
            break;
        case "left":
            // Логика для движения влево
            break;
        case "right":
            // Логика для движения вправо
            break;
    }
    updateGrid();  // Обновляем сетку после движения
}

// Остальной код игры, например, генерация новой плитки, логика выигрыша и т.д.
