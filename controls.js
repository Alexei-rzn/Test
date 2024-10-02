document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowLeft':
            move('left');
            break;
        case 'ArrowRight':
            move('right');
            break;
        case 'ArrowUp':
            move('up');
            break;
        case 'ArrowDown':
            move('down');
            break;
    }
});

document.getElementById('add-funds').addEventListener('click', () => {
    balance += 50;
    updateGrid();
});

document.getElementById('shuffle').addEventListener('click', () => {
    grid = shuffleGrid(grid);
    updateGrid();
});

function shuffleGrid(grid) {
    const flatTiles = grid.flat();
    flatTiles.sort(() => Math.random() - 0.5); // Перемешивание плиток
    return [
        flatTiles.slice(0, 4),
        flatTiles.slice(4, 8),
        flatTiles.slice(8, 12),
        flatTiles.slice(12, 16),
    ];
}
