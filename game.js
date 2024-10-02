const gridContainer = document.getElementById("grid-container");
const scoreDisplay = document.getElementById("score");
const balanceDisplay = document.getElementById("balance");
const restartButton = document.getElementById("restart");
const gameOverDisplay = document.getElementById("game-over");
let grid = [];
let score = 0;
let balance = 100;
let history = [];

// Инициализация игры
function initGame() {
    grid = Array.from({ length: 4 }, () => Array(4).fill(0));
    score = 0;
    balance = 100;
    history = [];
    addNewTile();
    addNewTile();
    updateGrid();
}

// Добавление новой плитки
function addNewTile() {
    let emptyCells = [];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (grid[i][j] === 0) emptyCells.push({ i, j });
        }
    }
    if (emptyCells.length) {
        const { i, j } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        grid[i][j] = Math.random() < 0.8 ? 2 : 4; // 80% вероятность 2, 20% - 4
    }
}

// Обновление отображения плиток на экране
function updateGrid() {
    gridContainer.innerHTML = '';
    grid.forEach(row => {
        row.forEach(tile => {
            const tileElement = document.createElement("div");
            tileElement.classList.add("tile");
            if (tile > 0) {
                tileElement.classList.add(`tile-${tile}`);
                tileElement.innerText = tile;
            }
            gridContainer.appendChild(tileElement);
        });
    });
    scoreDisplay.innerText = score;
    balanceDisplay.innerText = balance;
    if (checkGameOver()) {
        gameOverDisplay.classList.remove("hidden");
    }
}

// Проверка на окончание игры
function checkGameOver() {
    return grid.flat().every(cell => cell !== 0) && !grid.some((row, i) =>
        row.some((cell, j) => 
            (j < 3 && cell === row[j + 1]) || (i < 3 && cell === grid[i + 1][j])
        )
    );
}

// Сохранение текущего состояния игры для кнопки "Ход назад"
function saveState() {
    history.push(grid.map(row => row.slice()));
    if (history.length > 10) history.shift(); // Храним последние 10 состояний
}

// Логика перемещения плиток
function move(direction) {
    let moved = false;
    let combined = false;

    saveState(); // Сохраняем состояние перед каждым ходом

    switch (direction) {
        case 'left':
            for (let i = 0; i < 4; i++) {
                const result = slideRow(grid[i], direction);
                if (result.moved) moved = true;
                if (result.combined) combined = true;
                grid[i] = result.newRow;
            }
            break;
        case 'right':
            for (let i = 0; i < 4; i++) {
                const result = slideRow(grid[i].slice().reverse(), 'left');
                if (result.moved) moved = true;
                if (result.combined) combined = true;
                grid[i] = result.newRow.reverse();
            }
            break;
        case 'up':
            for (let j = 0; j < 4; j++) {
                const column = [grid[0][j], grid[1][j], grid[2][j], grid[3][j]];
                const result = slideColumnUp(column);
                for (let i = 0; i < 4; i++) {
                    grid[i][j] = result.newColumn[i];
                }
                if (result.moved) moved = true;
                if (result.combined) combined = true;
            }
            break;
        case 'down':
            for (let j = 0; j < 4; j++) {
                const column = [grid[0][j], grid[1][j], grid[2][j], grid[3][j]];
                const result = slideColumnDown(column);
                for (let i = 0; i < 4; i++) {
                    grid[i][j] = result.newColumn[i];
                }
                if (result.moved) moved = true;
                if (result.combined) combined = true;
            }
            break;
    }

    if (moved || combined) {
        addNewTile();
        updateGrid();
    }
}

// Логика сдвига строк и колонок
function slideRow(row) {
    let moved = false;
    let combined = false;
    let newRow = row.filter(tile => tile > 0);
    for (let i = 0; i < newRow.length - 1; i++) {
        if (newRow[i] === newRow[i + 1]) {
            newRow[i] *= 2;
            newRow[i + 1] = 0;
            score += newRow[i];
            combined = true;
        }
    }
    newRow = newRow.filter(tile => tile > 0);
    while (newRow.length < 4) newRow.push(0);
    if (JSON.stringify(row) !== JSON.stringify(newRow)) moved = true;
    return { moved, combined, newRow };
}

// Логика для колонки
function slideColumnUp(column) {
    let moved = false;
    let combined = false;
    let newColumn = column.filter(tile => tile > 0);
    for (let i = 0; i < newColumn.length - 1; i++) {
        if (newColumn[i] === newColumn[i + 1]) {
            newColumn[i] *= 2;
            newColumn[i + 1] = 0;
            score += newColumn[i];
            combined = true;
        }
    }
    newColumn = newColumn.filter(tile => tile > 0);
    while (newColumn.length < 4) newColumn.push(0);
    if (JSON.stringify(column) !== JSON.stringify(newColumn)) moved = true;
    return { moved, combined, newColumn };
}

function slideColumnDown(column) {
    return slideColumnUp(column.slice().reverse());
}

// Функция для отмены хода
function undoMove() {
    if (history.length > 0) {
        grid = history.pop();
        updateGrid();
    }
}

// Логика удаления плитки
function deleteTile() {
    const emptyTiles = grid.flatMap((row, i) =>
        row.map((tile, j) => ({ tile, i, j })).filter(t => t.tile > 0)
    );
    if (emptyTiles.length > 0) {
        const { i, j } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
        grid[i][j] = 0;
        updateGrid();
    }
}

// Привязка событий кнопок
restartButton.addEventListener("click", initGame);
document.getElementById("undo").addEventListener("click", undoMove);
document.getElementById("delete").addEventListener("click", deleteTile);
    
