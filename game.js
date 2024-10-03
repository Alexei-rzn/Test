const gridContainer = document.getElementById("grid-container");
const scoreDisplay = document.getElementById("score");
const balanceDisplay = document.getElementById("balance");
const gameOverDisplay = document.getElementById("game-over");

let grid = [];
let score = 0;
let balance = 100;

// Инициализация игры
function initGame() {
    grid = Array.from({ length: 4 }, () => Array(4).fill(0));
    score = 0;
    balance = 100;
    history = []; // Обнуляем историю
    addNewTile();
    addNewTile();
    updateGameState();
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
    return grid.flat().every(cell => cell !== 0) &&
        !grid.some((row, i) => row.some((cell, j) => 
            (j < 3 && cell === row[j + 1]) || (i < 3 && cell === grid[i + 1][j])
        ));
}

// Логика сдвига плиток
function move(direction) {
    let moved = false;
    let combined = false;

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
                const result = slideColumn(column, 'up');
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
                const result = slideColumn(column, 'down');
                for (let i = 0; i < 4; i++) {
                    grid[i][j] = result.newColumn[i];
                }
                if (result.moved) moved = true;
                if (result.combined) combined = true;
            }
            break;
    }

    if (moved || combined) {
        setTimeout(() => {
            addNewTile();
            updateGrid();
        }, 200);
    }
}

// Логика сдвига плиток в строке
function slideRow(row, direction) {
    let newRow = row.filter(value => value);
    const emptySpaces = 4 - newRow.length;
    let moved = false;
    let combined = false;

    newRow = direction === 'left' 
        ? [...newRow, ...Array(emptySpaces).fill(0)] 
        : [...Array(emptySpaces).fill(0), ...newRow];

    for (let i = 0; i < 3; i++) {
        if (newRow[i] !== 0 && newRow[i] === newRow[i + 1]) {
            newRow[i] *= 2;
            score += newRow[i];
            newRow[i + 1] = 0;
            combined = true;
        }
    }

    if (JSON.stringify(newRow) !== JSON.stringify(row)) {
        moved = true;
    }

    newRow = newRow.filter(value => value);
    while (newRow.length < 4) newRow.push(0);

    return { newRow, moved, combined };
}

// Логика сдвига плиток в колонне
function slideColumn(column, direction) {
    let newColumn = column.filter(value => value);
    let moved = false;
    let combined = false;

    while (newColumn.length < 4) {
        direction === 'up' ? newColumn.push(0) : newColumn.unshift(0);
    }

    if (direction === 'up') {
        for (let i = 0; i < 3; i++) {
            if (newColumn[i] !== 0 && newColumn[i] === newColumn[i + 1]) {
                newColumn[i] *= 2;
                score += newColumn[i];
                newColumn[i + 1] = 0;
                combined = true;
            }
        }
    } else { // down
        for (let i = 3; i > 0; i--) {
            if (newColumn[i] !== 0 && newColumn[i] === newColumn[i - 1]) {
                newColumn[i] *= 2;
                score += newColumn[i];
                newColumn[i - 1] = 0;
                combined = true;
            }
        }
    }

    if (JSON.stringify(newColumn) !== JSON.stringify(column)) {
        moved = true;
    }

    newColumn = newColumn.filter(value => value);
    while (newColumn.length < 4) {
        direction === 'up' ? newColumn.push(0) : newColumn.unshift(0);
    }

    return { newColumn, moved, combined };
}

// Сенсорное управление
let touchStartX = 0;
let touchStartY = 0;

gridContainer.addEventListener('touchstart', (event) => {
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
});

gridContainer.addEventListener('touchmove', (event) => {
    event.preventDefault(); // предотвращаем прокрутку страницы
});

gridContainer.addEventListener('touchend', (event) => {
    const touchEndX = event.changedTouches[0].clientX;
    const touchEndY = event.changedTouches[0].clientY;

    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;

    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    if (absDeltaX > absDeltaY && absDeltaX > 30) {
        if (deltaX > 0) {
            move('right');
        } else {
            move('left');
        }
    } else if (absDeltaY > absDeltaX && absDeltaY > 30) {
        if (deltaY > 0) {
            move('down');
        } else {
            move('up');
        }
    }
});

initGame(); // Начало игры
