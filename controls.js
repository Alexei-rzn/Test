// Подключаем кнопки к функциям управления

// Кнопка отмены хода
const undoButton = document.getElementById("undoButton");
undoButton.addEventListener("click", undoMove);

// Кнопка удаления плиток
const deleteTileButton = document.getElementById("deleteTileButton");
deleteTileButton.addEventListener("click", deleteTileFromGrid);

function deleteTileFromGrid(event) {
    const tileElement = event.target;  // Получаем элемент плитки, на который нажали
    const gridContainer = document.getElementById("grid-container");

    if (tileElement.classList.contains("tile") && balance >= 10) {
        const index = Array.from(gridContainer.children).indexOf(tileElement);
        const row = Math.floor(index / 4);  // Вычисляем строку на основе индекса
        const col = index % 4;  // Вычисляем колонку на основе индекса
        grid[row][col] = 0;  // Удаляем плитку, присваивая ей значение 0
        balance -= 10;  // Уменьшаем баланс на 10

        updateGrid();  // Обновляем сетку после удаления плитки
    }
}

// Кнопки движения (связываем с перемещениями плиток)
const upButton = document.getElementById("upButton");
const downButton = document.getElementById("downButton");
const leftButton = document.getElementById("leftButton");
const rightButton = document.getElementById("rightButton");

upButton.addEventListener("click", () => moveTiles("up"));
downButton.addEventListener("click", () => moveTiles("down"));
leftButton.addEventListener("click", () => moveTiles("left"));
rightButton.addEventListener("click", () => moveTiles("right"));

// Остальные кнопки и взаимодействия, которые есть в твоём проекте
