"use strict";
// http://advenofcode.com/2017/day/21
// Started at 12/21 @ 8:36 pm.
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
exports.title = "Day 21";
exports.inputs = [
    ["../.# => ##./#../...\n.#./..#/### => #..#/..../..../#..#", 2],
    ["../.. => ###/###/.##\n#./.. => ..#/###/##.\n##/.. => ..#/##./##.\n.#/#. => #../.#./.##\n##/#. => #.#/###/.#.\n##/## => ##./.../.#.\n.../.../... => ...#/.#../#.#./##.#\n#../.../... => .#.#/.#../####/###.\n.#./.../... => #.##/#.##/.###/##.#\n##./.../... => ..##/#.##/.##./..##\n#.#/.../... => .#.#/#.#./#..#/...#\n###/.../... => #.../.##./.#../.###\n.#./#../... => ##.#/...#/##.#/.##.\n##./#../... => #.#./###./...#/#.##\n..#/#../... => ..##/.###/..../.##.\n#.#/#../... => ...#/#..#/#.#./#.#.\n.##/#../... => ...#/#.##/..##/.###\n###/#../... => .##./..##/##../##.#\n.../.#./... => ####/.##./##.#/####\n#../.#./... => ..../.##./#..#/##.#\n.#./.#./... => ..../#.##/#.../..#.\n##./.#./... => .###/.#.#/...#/....\n#.#/.#./... => ..##/.#../.###/#.##\n###/.#./... => ..../..##/##.#/###.\n.#./##./... => .###/.#.#/#..#/#.#.\n##./##./... => #..#/#..#/#.##/.##.\n..#/##./... => #.##/...#/..#./.##.\n#.#/##./... => ..##/#.../..../...#\n.##/##./... => ##.#/...#/..##/#..#\n###/##./... => ..##/..#./.###/..##\n.../#.#/... => .###/..##/.#.#/..##\n#../#.#/... => ..##/...#/##../..#.\n.#./#.#/... => ..##/##.#/#..#/###.\n##./#.#/... => #.../####/..#./#...\n#.#/#.#/... => ..../##.#/.##./#..#\n###/#.#/... => ..##/#.#./.#.#/.#..\n.../###/... => ..##/.#../.#.#/#..#\n#../###/... => #.#./.#../.##./....\n.#./###/... => ##.#/...#/###./#.##\n##./###/... => ..../#.../.###/#.#.\n#.#/###/... => ####/..../...#/....\n###/###/... => ##.#/##../#.##/#...\n..#/.../#.. => ##.#/..#./#.##/..#.\n#.#/.../#.. => .#../...#/..#./.##.\n.##/.../#.. => ...#/#.../#..#/#..#\n###/.../#.. => .###/##../.##./.#..\n.##/#../#.. => ..##/#.##/.#.#/...#\n###/#../#.. => ...#/.###/..../#..#\n..#/.#./#.. => #..#/..../..#./..##\n#.#/.#./#.. => #..#/..../#.#./.###\n.##/.#./#.. => ..../.##./..##/.#.#\n###/.#./#.. => ##.#/###./##.#/..##\n.##/##./#.. => #.#./..../###./####\n###/##./#.. => #..#/#.##/#.##/#...\n#../..#/#.. => ##../#..#/#.../###.\n.#./..#/#.. => #.#./.#.#/..../.#.#\n##./..#/#.. => #.#./#.../#.#./#..#\n#.#/..#/#.. => ..##/.#.#/.#../.###\n.##/..#/#.. => ##.#/..##/..../.###\n###/..#/#.. => ..#./.##./...#/.#.#\n#../#.#/#.. => #.../.#../#.#./##..\n.#./#.#/#.. => ..../..../##../#...\n##./#.#/#.. => ..#./..../#.../..#.\n..#/#.#/#.. => #.#./.#.#/.#../#.##\n#.#/#.#/#.. => ...#/##.#/.##./#...\n.##/#.#/#.. => ..#./...#/.##./#...\n###/#.#/#.. => ..##/#..#/..../..##\n#../.##/#.. => ##.#/##.#/#.##/.#.#\n.#./.##/#.. => ..##/##../#.#./####\n##./.##/#.. => #.#./..../..##/#.##\n#.#/.##/#.. => ..#./###./##.#/##.#\n.##/.##/#.. => #..#/...#/..##/....\n###/.##/#.. => ..##/##../##.#/#.##\n#../###/#.. => ####/###./.###/....\n.#./###/#.. => ...#/.##./...#/#.##\n##./###/#.. => ...#/...#/##.#/.##.\n..#/###/#.. => ..##/.##./#.#./...#\n#.#/###/#.. => .###/.##./.###/.#.#\n.##/###/#.. => ##../.#../#.#./##.#\n###/###/#.. => ..../..../.###/##..\n.#./#.#/.#. => ##.#/##.#/..##/.##.\n##./#.#/.#. => .#../#.##/#.##/#.#.\n#.#/#.#/.#. => ..##/#.#./#.../..##\n###/#.#/.#. => ##.#/.#.#/##.#/.###\n.#./###/.#. => #.#./..#./..##/.##.\n##./###/.#. => ...#/#.##/###./#.##\n#.#/###/.#. => ...#/.###/#.#./#.#.\n###/###/.#. => .#.#/#..#/####/#...\n#.#/..#/##. => #.##/#.#./##../####\n###/..#/##. => ##.#/...#/..../####\n.##/#.#/##. => #.../#..#/..##/....\n###/#.#/##. => ##../###./...#/####\n#.#/.##/##. => ##.#/..##/..../#...\n###/.##/##. => ..#./####/..../#...\n.##/###/##. => ..##/#.##/..#./####\n###/###/##. => #.##/...#/..../..#.\n#.#/.../#.# => ..#./#.##/#..#/#.#.\n###/.../#.# => ..#./###./..##/#...\n###/#../#.# => .###/#..#/##../.#..\n#.#/.#./#.# => ###./##.#/.#../#..#\n###/.#./#.# => ##.#/###./#.../...#\n###/##./#.# => ####/##../#.../....\n#.#/#.#/#.# => ..#./..##/..#./...#\n###/#.#/#.# => ...#/##.#/##.#/#.##\n#.#/###/#.# => ..#./####/.#../##.#\n###/###/#.# => ..../.#.#/..../...#\n###/#.#/### => #.#./..##/##.#/....\n###/###/### => ..#./#.##/####/###.", 5]
];
// each line is a converter (pattern 1 => pattern 2)
// pattern lines are separated by slashes
// patterns can rotate & flip
// When patterns match a square, it is converted using that pattern.
// patterns divisible by 2x2 => each 2x2 square is 'enhanced' to a 3x3 square.
// patterns divisible by 3x3 => each 3x3 square is 'enhanced' to a 4x4 square.
var startSquare = ".#./..#/###";
exports.solve = function (input) {
    solve1(input);
    solve2(input);
};
var solve1 = function (input) {
    var text = input[0], loops = input[1];
    var pattern = new Pattern(startSquare);
    var converters = text.split('\n').map(function (l) { return new Converter(l); });
    //debugger;
    var loop = 0;
    printState(loop, pattern);
    while (loop < loops) {
        loop++;
        var subPatterns = pattern.split();
        subPatterns.forEach(function (p) { return p.convert(converters); });
        pattern.merge(subPatterns);
        printState(loop, pattern);
    }
};
var solve2 = function (input) {
};
function printState(loop, pattern) {
    console.log("Loop " + loop + " (" + pattern.grid.length + "x" + pattern.grid.length + "):");
    pattern.print();
    console.log("Pixels = " + (pattern.toString().match(/#/g) || []).length + "\n");
}
var Pattern = /** @class */ (function () {
    function Pattern(s, parentR, parentC, parentGrid) {
        if (typeof s === "string")
            this.grid = s.split('/').map(function (l) { return l.split(""); });
        else {
            this.grid = [];
            for (var r = 0; r < s; r++) {
                this.grid[r] = [];
                for (var c = 0; c < s; c++) {
                    this.grid[r][c] = parentGrid[parentR + r][parentC + c];
                }
            }
        }
    }
    Pattern.prototype.isMatch = function (p) {
        for (var i = 0; i < 2; i++) {
            for (var j = 0; j < 4; j++) {
                if (this.test(p.grid)) {
                    return true;
                }
                p.rotate();
            }
            p.flip();
        }
        return false;
    };
    ;
    Pattern.prototype.test = function (grid) {
        if (grid.length != this.grid.length)
            return false;
        for (var r = 0; r < grid.length; r++) {
            for (var c = 0; c < grid.length; c++) {
                if (this.grid[r][c] != grid[r][c])
                    return false;
            }
        }
        return true;
    };
    Pattern.prototype.rotate = function () {
        var maxR = this.grid.length;
        var maxC = this.grid[0].length;
        var grid = [];
        for (var c = 0; c < maxC; c++)
            grid[c] = [];
        for (var r = 0; r < maxR; r++) {
            for (var c = 0; c < maxC; c++) {
                grid[r][c] = this.grid[maxC - c - 1][r];
            }
        }
        this.grid = grid;
    };
    Pattern.prototype.flip = function () {
        this.grid = this.grid.map(function (r) { return r.reverse(); });
    };
    Pattern.prototype.print = function () { console.log(this.toString()); };
    Pattern.prototype.split = function () {
        var n = this.grid.length;
        var size = n % 2 == 0 ? 2 : 3;
        var patterns = [];
        for (var r = 0; r < n; r += size) {
            for (var c = 0; c < n; c += size) {
                patterns.push(new Pattern(size, r, c, this.grid));
            }
        }
        return patterns;
    };
    Pattern.prototype.merge = function (patterns) {
        var mergeSize = Math.sqrt(patterns.length) * patterns[0].grid.length;
        var pieceSize = patterns[0].grid.length;
        this.grid = [];
        for (var r = 0; r < mergeSize; r++) {
            this.grid[r] = [];
            for (var c = 0; c < mergeSize; c++) {
                var patternIndex = Math.floor(r / pieceSize) + Math.floor(c / pieceSize);
                var r2 = r % pieceSize;
                var c2 = c % pieceSize;
                this.grid[r][c] = patterns[patternIndex].grid[r2][c2];
            }
        }
    };
    Pattern.prototype.toString = function () {
        return this.grid.reduce(function (text, r) { return text += r.join('') + "\n"; }, "").trim();
    };
    Pattern.prototype.convert = function (converters) {
        for (var i = 0; i < converters.length; i++) {
            if (converters[i].try(this))
                return;
        }
        throw ("Unable to convert:\n" + this.toString());
    };
    return Pattern;
}());
var Converter = /** @class */ (function () {
    function Converter(line) {
        var patterns = line.split(' => ').map(function (s) { return new Pattern(s); });
        this.match = patterns[0], this.result = patterns[1];
    }
    Converter.prototype.isMatch = function (pattern) { return this.match.isMatch(pattern); };
    Converter.prototype.try = function (pattern) {
        if (this.isMatch(pattern)) {
            pattern.grid = this.result.grid.slice().map(function (r) { return r.slice(); });
            return true;
        }
        return false;
    };
    return Converter;
}());
//# sourceMappingURL=Day21.js.map