const undoButton = document.getElementById("undoButton");
const deleteTileButton = document.getElementById("deleteTileButton");

undoButton.addEventListener("click", undoMove);

deleteTileButton.addEventListener("click", deleteTileFromGrid);

function deleteTileFromGrid(event) {
    const tileElement = event.target;
    if (tileElement.classList.contains("tile") && balance >= 10) {
        const index = Array.from(gridContainer.children).indexOf(tileElement);
        const row = Math.floor(index / 4);
        const col = index % 4;
        grid[row][col] = 0;  // Удаляем плитку
        balance -= 10;  // Списываем 10 баллов

        updateGrid();  // Обновляем сетку визуально
    }
}
