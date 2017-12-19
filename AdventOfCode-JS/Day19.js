"use strict";
// http://adventofcode.com/2017/day/19
// Started at 12/19 @ 8:15 pm.
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
exports.title = "Day 19";
exports.inputs = [
    "     |          \n     |  +-+    \n     A  | C    \n F---|---E|--+ \n     |  | |  D \n     +B-+ +--+ ",
    fs.readFileSync('Day19-input.txt', { 'encoding': 'utf8' })
];
exports.solve = function (input) {
    solve1(input);
};
function solve1(input) {
    var go = {
        down: 0,
        up: 1,
        left: 2,
        right: 3,
        end: 4
    };
    var grid = input.split(/\r?\n/).map(function (line) { return line.split(""); });
    var row = 0;
    var col = grid[0].indexOf('|');
    var seen = "";
    var found = function (char) {
        if (/^[A-Z]$/.test(char)) {
            seen += char;
            return true;
        }
        return false;
    };
    var getHere = function () { return grid[row][col]; };
    var getRight = function (skip) {
        if (skip === void 0) { skip = false; }
        return grid[row][col + (skip ? 2 : 1)];
    };
    var getLeft = function (skip) {
        if (skip === void 0) { skip = false; }
        return grid[row][col - (skip ? 2 : 1)];
    };
    var getUp = function (skip) {
        if (skip === void 0) { skip = false; }
        return grid[row - (skip ? 2 : 1)] && grid[row - (skip ? 2 : 1)][col];
    };
    var getDown = function (skip) {
        if (skip === void 0) { skip = false; }
        return grid[row + (skip ? 2 : 1)] && grid[row + (skip ? 2 : 1)][col];
    };
    var test = function (getFunc, goChar, skipChar) {
        var char = getFunc();
        if (!char)
            return false;
        if (new RegExp("[" + goChar + "|+]").test(char) || found(char))
            return true;
        return char == skipChar && (getFunc(true) == goChar || /^[A-Z]$/.test(getFunc(true)));
    };
    var can = function (d) {
        switch (d) {
            case go.up: return test(getUp, '|', '-');
            case go.down: return test(getDown, '|', '-');
            case go.right: return test(getRight, '-', '|');
            case go.left: return test(getLeft, '-', '|');
        }
    };
    var goUp = function () {
        row--;
        if (getHere() == '+') {
            if (can(go.left))
                return go.left;
            if (can(go.right))
                return go.right;
        }
        if (can(go.up))
            return go.up;
        return go.end;
    };
    var goDown = function () {
        row++;
        if (getHere() == '+') {
            if (can(go.left))
                return go.left;
            if (can(go.right))
                return go.right;
        }
        if (can(go.down))
            return go.down;
        return go.end;
    };
    var goLeft = function () {
        col--;
        if (getHere() == '+') {
            if (can(go.up))
                return go.up;
            if (can(go.down))
                return go.down;
        }
        if (can(go.left))
            return go.left;
        return go.end;
    };
    var goRight = function () {
        col++;
        if (getHere() == '+') {
            if (can(go.up))
                return go.up;
            if (can(go.down))
                return go.down;
        }
        if (can(go.right))
            return go.right;
        return go.end;
    };
    var dir = go.down;
    var steps = 1;
    while (dir != go.end) {
        switch (dir) {
            case go.down:
                dir = goDown();
                break;
            case go.up:
                dir = goUp();
                break;
            case go.right:
                dir = goRight();
                break;
            case go.left:
                dir = goLeft();
                break;
            default:
                throw ("Can't handle " + dir);
        }
        //console.log(`[${row},${col}] = ${grid[row][col]}`);
        steps++;
    }
    console.log("Result 1: " + seen);
    console.log("Result 2: in " + steps + " steps");
}
//# sourceMappingURL=Day19.js.map