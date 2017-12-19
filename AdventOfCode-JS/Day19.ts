// http://adventofcode.com/2017/day/19
// Started at 12/19 @ 8:15 pm.

var fs = require('fs');

export var title = "Day 19";

export var inputs = [
    `     |          
     |  +-+    
     A  | C    
 F---|---E|--+ 
     |  | |  D 
     +B-+ +--+ `,
    fs.readFileSync('Day19-input.txt', { 'encoding': 'utf8' })
];


export var solve = input => {
    solve1(input);
};


function solve1(input) {
    const go = {
        down: 0,
        up: 1,
        left: 2,
        right: 3,
        end: 4
    };

    const grid = input.split(/\r?\n/).map(line => line.split(""));
    let row = 0;
    let col = grid[0].indexOf('|');
    let seen = "";

    const found = (char) => {
        if (/^[A-Z]$/.test(char)) {
            seen += char;
            return true;
        }

        return false;
    };

    const getHere = () => grid[row][col];
    const getRight = (skip = false) => grid[row][col + (skip ? 2 : 1)];
    const getLeft = (skip = false) => grid[row][col - (skip ? 2 : 1)];
    const getUp = (skip = false) => grid[row - (skip ? 2 : 1)] && grid[row - (skip ? 2 : 1)][col];
    const getDown = (skip = false) => grid[row + (skip ? 2 : 1)] && grid[row + (skip ? 2 : 1)][col];

    const test = (getFunc, goChar, skipChar) => {
        const char = getFunc();
        if (!char) return false;
        if (new RegExp(`[${goChar}|+]`).test(char) || found(char)) return true;
        return char == skipChar && (getFunc(true) == goChar || /^[A-Z]$/.test(getFunc(true)));
    }

    const can = (d) => {
        switch (d) {
            case go.up: return test(getUp, '|', '-');
            case go.down: return test(getDown, '|', '-');
            case go.right: return test(getRight, '-', '|');
            case go.left: return test(getLeft, '-', '|');
        }
    }

    const goUp = () => {
        row--;
        if (getHere() == '+') {
            if (can(go.left)) return go.left;
            if (can(go.right)) return go.right;
        }
        if (can(go.up)) return go.up;
        return go.end;
    };

    const goDown = () => {
        row++;
        if (getHere() == '+') {
            if (can(go.left)) return go.left;
            if (can(go.right)) return go.right;
        }
        if (can(go.down)) return go.down;
        return go.end;
    };

    const goLeft = () => {
        col--;
        if (getHere() == '+') {
            if (can(go.up)) return go.up;
            if (can(go.down)) return go.down;
        }
        if (can(go.left)) return go.left;
        return go.end;
    };

    const goRight = () => {
        col++;
        if (getHere() == '+') {
            if (can(go.up)) return go.up;
            if (can(go.down)) return go.down;
        }
        if (can(go.right)) return go.right;
        return go.end;
    };

    let dir = go.down;
    let steps = 1;

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

    console.log(`Result 1: ${seen}`);
    console.log(`Result 2: in ${steps} steps`);
}