export var title = "Day 3";

export var solve = input => {
    solveA(input);
    solveB(input);
};

function solveA(input) {
    const grid = [];
    let row = 0;
    let col = 0;
    let cell = 1;

    while (cell < input) {
        cell++;

        // Initialize grid rows if missing.
        grid[row + 1] = grid[row + 1] || [];
        grid[row] = grid[row] || [];
        grid[row - 1] = grid[row - 1] || [];
        grid[row][col] = true;

        const up = grid[row - 1][col];
        const left = grid[row][col - 1];
        const down = grid[row + 1][col];
        const right = grid[row][col + 1];

        // Initial spot. Go right.
        if (!up && !down && !left && !right) { grid[row][col] = 1; col++; }
        else if (left && !up && !right) row--;
        else if (!left && !up && down) col--;
        else if (!down && right && !left) row++;
        else if (up && !right && !down) col++;
    }
    console.log(`Part 1: Total Steps = [${row},${col}] = ${Math.abs(row) + Math.abs(col)}`);
}

function solveB(input) {
    const grid = [];
    let row = 0;
    let col = 0;
    let total = 1;

    while (total < input) {
        // Initialize grid rows if missing.
        grid[row + 1] = grid[row + 1] || [];
        grid[row] = grid[row] || [];
        grid[row - 1] = grid[row - 1] || [];
        const up = grid[row - 1][col];
        const upleft = grid[row - 1][col - 1];
        const left = grid[row][col - 1];
        const downleft = grid[row + 1][col - 1];
        const down = grid[row + 1][col];
        const downright = grid[row + 1][col + 1];
        const right = grid[row][col + 1];
        const upright = grid[row - 1][col + 1];
        grid[row][col] = total = (up || 0) + (upleft || 0) + (left || 0) + (downleft || 0) + (down || 0) + (downright || 0) + (right || 0) + (upright || 0);

        // Initial spot. Go right.
        if (!up && !down && !left && !right) { grid[row][col] = 1; col++; }
        else if (left && !up && !right) row--;
        else if (!left && !up && down) col--;
        else if (!down && right && !left) row++;
        else if (up && !right && !down) col++;
    }
    console.log(`Part 2: Next highest = ${total} `);
}

export var inputs = [1, 12, 23, 1024, 265149];