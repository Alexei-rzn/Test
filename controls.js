const undoButton = document.getElementById("undo");
const deleteTileButton = document.getElementById("delete");
const shuffleButton = document.getElementById("shuffle");
const addFundsButton = document.getElementById("add-funds");
const restartButton = document.getElementById("restart");

let deleteMode = false;
let history = [];

// Функция для сохранения состояния игры в истории
function saveState() {
    if (history.length >= 10) {
        history.shift(); // Удаляем самый старый элемент, если их стало больше 10
    }
    history.push(JSON.parse(JSON.stringify(grid))); // Сохраняем текущее состояние игры
}

// Ход назад
undoButton.addEventListener("click", () => {
    if (history.length > 0 && balance >= 30) {
        grid = history.pop();  // Восстанавливаем последнее состояние
        balance -= 30;  // Списываем 30 баллов
        updateGrid();
    }
});

// Удаление плитки
function deleteTile() {
    if (balance >= 50) {
        const tiles = document.querySelectorAll(".tile");
        tiles.forEach(tile => {
            tile.addEventListener("click", () => {
                const tileValue = parseInt(tile.innerText);
                if (tileValue > 0) {
                    const [rowIndex, colIndex] = getTileIndex(tile);
                    grid[rowIndex][colIndex] = 0; // Обновляем игровое состояние
                    tile.innerText = ''; // Удаляем плитку
                    balance -= 50; // Списываем 50
                    updateGrid();
                }
            });
        });
    }
}

// Показать и скрыть режим удаления плиток
deleteTileButton.addEventListener("mousedown", () => {
    deleteTileButton.classList.add("active");
    deleteMode = true;
    deleteTile();
});

deleteTileButton.addEventListener("mouseup", () => {
    deleteTileButton.classList.remove("active");
    deleteMode = false;
});

// Логика получения индекса плитки
function getTileIndex(tile) {
    const index = Array.from(tile.parentNode.children).indexOf(tile);
    const rowIndex = Math.floor(index / 4);
    const colIndex = index % 4;
    return [rowIndex, colIndex];
}

// Перемешивание плиток
shuffleButton.addEventListener("click", () => {
    if (balance >= 20) {
        shuffleTiles();
        balance -= 20;
        updateGrid();
    }
});

// Логика перемешивания плиток
function shuffleTiles() {
    const flattenedGrid = grid.flat();
    flattenedGrid.sort(() => Math.random() - 0.5); // Перемешиваем массив
    for (let i = 0; i < 4; i++) {
        grid[i] = flattenedGrid.slice(i * 4, (i + 1) * 4);
    }
}

// Пополнение баланса
addFundsButton.addEventListener("click", () => {
    balance += 50;
    updateGrid();
});

// Перезапуск игры
restartButton.addEventListener("click", () => {
    gameOverDisplay.classList.add("hidden");
    initGame();
});

// Вызываем saveState после каждого изменения состояния
function updateGameState() {
    saveState(); // Сохранение состояния перед обновлением
    updateGrid();
}

// Обновляем состояние игры, когда происходит изменение
function initGame() {
    grid = Array.from({ length: 4 }, () => Array(4).fill(0));
    score = 0;
    balance = 100;
    history = []; // Обнуляем историю
    addNewTile();
    addNewTile();
    updateGameState(); // Обновляем состояние и отображение
}

function move(direction) {
    // Допишите сюда вашу логику движения, добавив вызов updateGameState() в конце.
    // Например:
  
    // Если были изменения в игре:
    if (moved || combined) {
        updateGameState(); // Обновление состояния игры
    }
}

// Убедитесь, что функции, которые изменяют игру, также вызывают updateGameState()
