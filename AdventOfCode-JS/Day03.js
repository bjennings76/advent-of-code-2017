"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.title = "Day 3";
exports.solve = function (input) {
    solveA(input);
    solveB(input);
};
function solveA(input) {
    var grid = [];
    var row = 0;
    var col = 0;
    var cell = 1;
    while (cell < input) {
        cell++;
        // Initialize grid rows if missing.
        grid[row + 1] = grid[row + 1] || [];
        grid[row] = grid[row] || [];
        grid[row - 1] = grid[row - 1] || [];
        grid[row][col] = true;
        var up = grid[row - 1][col];
        var left = grid[row][col - 1];
        var down = grid[row + 1][col];
        var right = grid[row][col + 1];
        // Initial spot. Go right.
        if (!up && !down && !left && !right) {
            grid[row][col] = 1;
            col++;
        }
        else if (left && !up && !right)
            row--;
        else if (!left && !up && down)
            col--;
        else if (!down && right && !left)
            row++;
        else if (up && !right && !down)
            col++;
    }
    console.log("Part 1: Total Steps = [" + row + "," + col + "] = " + (Math.abs(row) + Math.abs(col)));
}
function solveB(input) {
    var grid = [];
    var row = 0;
    var col = 0;
    var total = 1;
    while (total < input) {
        // Initialize grid rows if missing.
        grid[row + 1] = grid[row + 1] || [];
        grid[row] = grid[row] || [];
        grid[row - 1] = grid[row - 1] || [];
        var up = grid[row - 1][col];
        var upleft = grid[row - 1][col - 1];
        var left = grid[row][col - 1];
        var downleft = grid[row + 1][col - 1];
        var down = grid[row + 1][col];
        var downright = grid[row + 1][col + 1];
        var right = grid[row][col + 1];
        var upright = grid[row - 1][col + 1];
        grid[row][col] = total = (up || 0) + (upleft || 0) + (left || 0) + (downleft || 0) + (down || 0) + (downright || 0) + (right || 0) + (upright || 0);
        // Initial spot. Go right.
        if (!up && !down && !left && !right) {
            grid[row][col] = 1;
            col++;
        }
        else if (left && !up && !right)
            row--;
        else if (!left && !up && down)
            col--;
        else if (!down && right && !left)
            row++;
        else if (up && !right && !down)
            col++;
    }
    console.log("Part 2: Next highest = " + total + " ");
}
exports.inputs = [1, 12, 23, 1024, 265149];
//# sourceMappingURL=Day03.js.map