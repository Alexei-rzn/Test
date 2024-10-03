const undoButton = document.getElementById("undo");
const deleteTileButton = document.getElementById("delete");
const shuffleButton = document.getElementById("shuffle");
const addFundsButton = document.getElementById("add-funds");
const restartButton = document.getElementById("restart");

let deleteMode = false;

// Ход назад
undoButton.addEventListener("click", () => {
    if (history.length > 0 && balance >= 25) {
        grid = history.pop();  // Восстанавливаем последнее состояние
        balance -= 25;  // Списываем 25 баллов
        updateGrid();
    }
});

// Удаление плитки
deleteTileButton.addEventListener("click", () => {
    grid.forEach((row, rowIndex) => {
        row.forEach((tile, tileIndex) => {
            if (tile > 0) { 
                grid[rowIndex][tileIndex] = 0; // Удаляем плитку
            }
        });
    });
    updateGrid();
});

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
