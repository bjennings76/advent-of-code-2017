// http://advenofcode.com/2017/day/21
// Started at 12/21 @ 8:36 pm.

var fs = require('fs');

export var title = "Day 21";

export var inputs = [
        [`../.# => ##./#../...
.#./..#/### => #..#/..../..../#..#`, 2],
        [`../.. => ###/###/.##
#./.. => ..#/###/##.
##/.. => ..#/##./##.
.#/#. => #../.#./.##
##/#. => #.#/###/.#.
##/## => ##./.../.#.
.../.../... => ...#/.#../#.#./##.#
#../.../... => .#.#/.#../####/###.
.#./.../... => #.##/#.##/.###/##.#
##./.../... => ..##/#.##/.##./..##
#.#/.../... => .#.#/#.#./#..#/...#
###/.../... => #.../.##./.#../.###
.#./#../... => ##.#/...#/##.#/.##.
##./#../... => #.#./###./...#/#.##
..#/#../... => ..##/.###/..../.##.
#.#/#../... => ...#/#..#/#.#./#.#.
.##/#../... => ...#/#.##/..##/.###
###/#../... => .##./..##/##../##.#
.../.#./... => ####/.##./##.#/####
#../.#./... => ..../.##./#..#/##.#
.#./.#./... => ..../#.##/#.../..#.
##./.#./... => .###/.#.#/...#/....
#.#/.#./... => ..##/.#../.###/#.##
###/.#./... => ..../..##/##.#/###.
.#./##./... => .###/.#.#/#..#/#.#.
##./##./... => #..#/#..#/#.##/.##.
..#/##./... => #.##/...#/..#./.##.
#.#/##./... => ..##/#.../..../...#
.##/##./... => ##.#/...#/..##/#..#
###/##./... => ..##/..#./.###/..##
.../#.#/... => .###/..##/.#.#/..##
#../#.#/... => ..##/...#/##../..#.
.#./#.#/... => ..##/##.#/#..#/###.
##./#.#/... => #.../####/..#./#...
#.#/#.#/... => ..../##.#/.##./#..#
###/#.#/... => ..##/#.#./.#.#/.#..
.../###/... => ..##/.#../.#.#/#..#
#../###/... => #.#./.#../.##./....
.#./###/... => ##.#/...#/###./#.##
##./###/... => ..../#.../.###/#.#.
#.#/###/... => ####/..../...#/....
###/###/... => ##.#/##../#.##/#...
..#/.../#.. => ##.#/..#./#.##/..#.
#.#/.../#.. => .#../...#/..#./.##.
.##/.../#.. => ...#/#.../#..#/#..#
###/.../#.. => .###/##../.##./.#..
.##/#../#.. => ..##/#.##/.#.#/...#
###/#../#.. => ...#/.###/..../#..#
..#/.#./#.. => #..#/..../..#./..##
#.#/.#./#.. => #..#/..../#.#./.###
.##/.#./#.. => ..../.##./..##/.#.#
###/.#./#.. => ##.#/###./##.#/..##
.##/##./#.. => #.#./..../###./####
###/##./#.. => #..#/#.##/#.##/#...
#../..#/#.. => ##../#..#/#.../###.
.#./..#/#.. => #.#./.#.#/..../.#.#
##./..#/#.. => #.#./#.../#.#./#..#
#.#/..#/#.. => ..##/.#.#/.#../.###
.##/..#/#.. => ##.#/..##/..../.###
###/..#/#.. => ..#./.##./...#/.#.#
#../#.#/#.. => #.../.#../#.#./##..
.#./#.#/#.. => ..../..../##../#...
##./#.#/#.. => ..#./..../#.../..#.
..#/#.#/#.. => #.#./.#.#/.#../#.##
#.#/#.#/#.. => ...#/##.#/.##./#...
.##/#.#/#.. => ..#./...#/.##./#...
###/#.#/#.. => ..##/#..#/..../..##
#../.##/#.. => ##.#/##.#/#.##/.#.#
.#./.##/#.. => ..##/##../#.#./####
##./.##/#.. => #.#./..../..##/#.##
#.#/.##/#.. => ..#./###./##.#/##.#
.##/.##/#.. => #..#/...#/..##/....
###/.##/#.. => ..##/##../##.#/#.##
#../###/#.. => ####/###./.###/....
.#./###/#.. => ...#/.##./...#/#.##
##./###/#.. => ...#/...#/##.#/.##.
..#/###/#.. => ..##/.##./#.#./...#
#.#/###/#.. => .###/.##./.###/.#.#
.##/###/#.. => ##../.#../#.#./##.#
###/###/#.. => ..../..../.###/##..
.#./#.#/.#. => ##.#/##.#/..##/.##.
##./#.#/.#. => .#../#.##/#.##/#.#.
#.#/#.#/.#. => ..##/#.#./#.../..##
###/#.#/.#. => ##.#/.#.#/##.#/.###
.#./###/.#. => #.#./..#./..##/.##.
##./###/.#. => ...#/#.##/###./#.##
#.#/###/.#. => ...#/.###/#.#./#.#.
###/###/.#. => .#.#/#..#/####/#...
#.#/..#/##. => #.##/#.#./##../####
###/..#/##. => ##.#/...#/..../####
.##/#.#/##. => #.../#..#/..##/....
###/#.#/##. => ##../###./...#/####
#.#/.##/##. => ##.#/..##/..../#...
###/.##/##. => ..#./####/..../#...
.##/###/##. => ..##/#.##/..#./####
###/###/##. => #.##/...#/..../..#.
#.#/.../#.# => ..#./#.##/#..#/#.#.
###/.../#.# => ..#./###./..##/#...
###/#../#.# => .###/#..#/##../.#..
#.#/.#./#.# => ###./##.#/.#../#..#
###/.#./#.# => ##.#/###./#.../...#
###/##./#.# => ####/##../#.../....
#.#/#.#/#.# => ..#./..##/..#./...#
###/#.#/#.# => ...#/##.#/##.#/#.##
#.#/###/#.# => ..#./####/.#../##.#
###/###/#.# => ..../.#.#/..../...#
###/#.#/### => #.#./..##/##.#/....
###/###/### => ..#./#.##/####/###.`, 5]
];

// each line is a converter (pattern 1 => pattern 2)
// pattern lines are separated by slashes
// patterns can rotate & flip
// When patterns match a square, it is converted using that pattern.
// patterns divisible by 2x2 => each 2x2 square is 'enhanced' to a 3x3 square.
// patterns divisible by 3x3 => each 3x3 square is 'enhanced' to a 4x4 square.

var startSquare = `.#./..#/###`;

export var solve = input => {
    solve1(input);
    solve2(input);
}

var solve1 = input => {
    var [text, loops] = input;
    var pattern = new Pattern(startSquare);

    var converters: Converter[] = text.split('\n').map(l => new Converter(l));
    //debugger;
    let loop = 0;

    printState(loop, pattern);

    while (loop < loops) {
        loop++;
        const subPatterns = pattern.split();
        subPatterns.forEach(p => p.convert(converters));
        pattern.merge(subPatterns);
        printState(loop, pattern);
    }
};

var solve2 = input => {
};

function printState(loop: number, pattern: Pattern): void {
    console.log(`Loop ${loop} (${pattern.grid.length}x${pattern.grid.length}):`);
    pattern.print();
    console.log(`Pixels = ${(pattern.toString().match(/#/g) || []).length}\n`);
}

class Pattern {
    grid: string[][];

    constructor(s: string);
    constructor(size: number, r: number, c: number, grid: string[][]);
    constructor(s?, parentR?, parentC?, parentGrid?) {
        if (typeof s === "string") this.grid = s.split('/').map(l => l.split(""));
        else {
            this.grid = [];
            for (let r = 0; r < s; r++) {
                this.grid[r] = [];
                for (let c = 0; c < s; c++) {
                    this.grid[r][c] = parentGrid[parentR + r][parentC + c];
                }
            }
        }
    }

    isMatch(p: Pattern): boolean {
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 4; j++) {
                if (this.test(p.grid)) {
                    return true;
                }

                p.rotate();
            }

            p.flip();
        }

        return false;
    };

    private test(grid: string[][]): boolean {
        if (grid.length != this.grid.length) return false;

        for (let r = 0; r < grid.length; r++) {
            for (let c = 0; c < grid.length; c++) {
                if (this.grid[r][c] != grid[r][c]) return false;
            }
        }

        return true;
    }

    private rotate() {
        const maxR = this.grid.length;
        const maxC = this.grid[0].length;

        const grid = [];
        for (let c = 0; c < maxC; c++) grid[c] = [];

        for (let r = 0; r < maxR; r++) {
            for (let c = 0; c < maxC; c++) {
                grid[r][c] = this.grid[maxC - c - 1][r];
            }
        }

        this.grid = grid;
    }

    private flip(): void {
        this.grid = this.grid.map(r => r.reverse());
    }

    print(): void { console.log(this.toString()); }

    split(): Pattern[] {
        const n = this.grid.length;
        const size = n % 2 == 0 ? 2 : 3;
        const patterns: Pattern[] = [];

        for (let r = 0; r < n; r+=size) {
            for (let c = 0; c < n; c+=size) {
                patterns.push(new Pattern(size, r, c, this.grid));
            }
        }

        return patterns;
    }

    merge(patterns: Pattern[]): void {
        const mergeSize = Math.sqrt(patterns.length) * patterns[0].grid.length;
        const pieceSize = patterns[0].grid.length;

        this.grid = [];
        for (let r = 0; r < mergeSize; r++) {
            this.grid[r] = [];
            for (let c = 0; c < mergeSize; c++) {
                const patternIndex = Math.floor(r / pieceSize) + Math.floor(c / pieceSize);
                const r2 = r % pieceSize;
                const c2 = c % pieceSize;
                this.grid[r][c] = patterns[patternIndex].grid[r2][c2];
            }
        }
    }

    toString(): string {
        return this.grid.reduce((text, r) => text += r.join('') + "\n", "").trim();
    }

    convert(converters: Converter[]): void {
        for (let i = 0; i < converters.length; i++) {
            if (converters[i].try(this)) return;
        }

        throw (`Unable to convert:\n${this.toString()}`);
    }
}

class Converter {
    match: Pattern;
    result: Pattern;

    constructor(line) {
        const patterns = line.split(' => ').map(s => new Pattern(s));
        [this.match, this.result] = patterns;
    }

    isMatch(pattern: Pattern): boolean { return this.match.isMatch(pattern); }

    try(pattern: Pattern): boolean {
        if (this.isMatch(pattern)) {
            pattern.grid = this.result.grid.slice().map(r => r.slice());
            return true;
        }
        return false;
    }
}
