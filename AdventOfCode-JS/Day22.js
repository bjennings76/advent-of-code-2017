"use strict";
// http://advenofcode.com/2017/day/22
// Started at 12/22 @ 6:40 pm.
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
exports.title = "Day 22";
exports.inputs = [
    {
        text: "..#\n#..\n...",
        counts: [1, 2, 6, 7, 70, 10000]
    },
    {
        text: ".....###..#....#.#..##...\n......##.##...........##.\n.#..#..#.#.##.##.........\n...#..###..##.#.###.#.#.#\n##....#.##.#..####.####..\n#..##...#.##.##.....##..#\n.#.#......#...####...#.##\n###....#######...#####.#.\n##..#.####...#.#.##......\n##.....###....#.#..#.##.#\n.#..##.....#########.##..\n##...##.###..#.#..#.#...#\n...####..#...#.##.#..####\n.#..##......#####..#.###.\n...#.#.#..##...#####.....\n#..###.###.#.....#.#.###.\n##.##.#.#.##.#..#..######\n####.##..#.###.#...#..###\n.........#####.##.###..##\n..#.##.#..#..#...##..#...\n###.###.#.#..##...###....\n##..#.#.#.#.#.#.#...###..\n#..#.#.....#..#..#..##...\n........#######.#...#.#..\n..##.###.#.##.#.#.###..##",
        counts: [10000]
    }
];
exports.solve = function (input) {
    solve1(input);
    solve2(input);
};
var solve1 = function (input) {
    var grid = new Grid(input.text);
    var virus = new Virus(grid);
    var max = input.counts[input.counts.length - 1];
    for (var i = 1; i <= max; i++) {
        virus.burst();
        //if (input.counts.includes(i)) {
        //    console.log(`Part1: At ${i} bursts, there are ${cursor.infections} infections.`);
        //}
    }
    console.log("Part1: At " + max + " bursts, there are " + virus.infections + " infections.");
};
var solve2 = function (input) {
    var grid = new Grid(input.text);
    var virus = new Virus(grid);
    var max = 10000000;
    for (var i = 1; i <= max; i++) {
        virus.burst2();
        //if (i <= 5) {
        //    console.log("Burst " + i);
        //    virus.grid.print();
        //}
        //if (i == 100) {
        //    console.log(`Part2: At ${i} bursts, there are ${max - inverted} infections.`);
        //}
        //if (i % 1e6 == 1) {
        //    console.log(`Part2: At ${i} bursts, there are ${max - inverted} infections.`);
        //}
    }
    console.log("Part2: At " + max + " bursts, there are " + virus.infections + " infections.");
};
var Vector = /** @class */ (function () {
    function Vector(x, y) {
        this.set(x, y);
    }
    Vector.prototype.eq = function (vector) { return this.x == vector.x && this.y == vector.y; };
    Vector.prototype.reverse = function () { this.set(this.x *= -1, this.y *= -1); };
    Vector.prototype.set = function (x, y) {
        this.x = x;
        this.y = y;
    };
    Vector.prototype.add = function (vector) {
        this.x += vector.x;
        this.y += vector.y;
    };
    Object.defineProperty(Vector, "zero", {
        get: function () { return new Vector(0, 0); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector, "up", {
        get: function () { return new Vector(0, -1); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector, "down", {
        get: function () { return new Vector(0, 1); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector, "left", {
        get: function () { return new Vector(-1, 0); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector, "right", {
        get: function () { return new Vector(1, 0); },
        enumerable: true,
        configurable: true
    });
    return Vector;
}());
var Virus = /** @class */ (function () {
    function Virus(grid) {
        this.infections = 0;
        this.grid = grid;
        this.dir = Vector.up;
        this.pos = new Vector((this.grid.map.length - 1) / 2, (this.grid.map[0].length - 1) / 2);
    }
    Virus.prototype.isInfected = function () { return this.grid.get(this.pos) == "#"; };
    Virus.prototype.isWeak = function () { return this.grid.get(this.pos) == "W"; };
    Virus.prototype.isFlagged = function () { return this.grid.get(this.pos) == "F"; };
    Virus.prototype.isClean = function () { return this.grid.get(this.pos) == "." || this.grid.get(this.pos) == undefined; };
    Virus.prototype.weaken = function () { this.grid.set(this.pos, "W"); };
    Virus.prototype.flag = function () { this.grid.set(this.pos, "F"); };
    Virus.prototype.clean = function () { this.grid.set(this.pos, "."); };
    Virus.prototype.move = function () { this.pos.add(this.dir); };
    Virus.prototype.infect = function () {
        this.grid.set(this.pos, "#");
        this.infections++;
    };
    Virus.prototype.turnRight = function () {
        if (this.dir.eq(Vector.down))
            this.dir = Vector.left;
        else if (this.dir.eq(Vector.up))
            this.dir = Vector.right;
        else if (this.dir.eq(Vector.right))
            this.dir = Vector.down;
        else if (this.dir.eq(Vector.left))
            this.dir = Vector.up;
        else
            throw ("Can't figure out initial direction of " + this.dir);
    };
    Virus.prototype.turnLeft = function () {
        if (this.dir.eq(Vector.up))
            this.dir = Vector.left;
        else if (this.dir.eq(Vector.down))
            this.dir = Vector.right;
        else if (this.dir.eq(Vector.left))
            this.dir = Vector.down;
        else if (this.dir.eq(Vector.right))
            this.dir = Vector.up;
        else
            throw ("Can't figure out direction of " + this.dir);
    };
    Virus.prototype.burst = function () {
        if (this.isInfected()) {
            this.turnRight();
            this.clean();
        }
        else {
            this.turnLeft();
            this.infect();
        }
        this.move();
    };
    Virus.prototype.burst2 = function () {
        if (this.isClean()) {
            this.weaken();
            this.turnLeft();
        }
        else if (this.isWeak()) {
            this.infect();
        }
        else if (this.isInfected()) {
            this.flag();
            this.turnRight();
        }
        else if (this.isFlagged()) {
            this.clean();
            this.dir.reverse();
        }
        this.move();
    };
    return Virus;
}());
var Grid = /** @class */ (function () {
    function Grid(text) {
        this.map = [];
        this.top = 0;
        this.bottom = 0;
        this.left = 0;
        this.right = 0;
        this.map = text.split("\n").map(function (l) { return l.split(''); });
        this.bottom = this.map.length;
        this.right = this.map[0].length;
    }
    Grid.prototype.get = function (vector) {
        var row = this.map[vector.y] ? this.map[vector.y] : (this.map[vector.y] = []);
        return row[vector.x] ? row[vector.x] : ".";
    };
    Grid.prototype.set = function (vector, value) {
        var row = this.map[vector.y] ? this.map[vector.y] : (this.map[vector.y] = []);
        row[vector.x] = value;
        this.top = Math.min(vector.y, this.top);
        this.bottom = Math.max(vector.y, this.bottom);
        this.left = Math.min(vector.x, this.left);
        this.right = Math.max(vector.x, this.right);
    };
    Grid.prototype.print = function () {
        var result = "";
        for (var r = this.top; r < this.bottom; r++) {
            var row = this.map[r] ? this.map[r] : [];
            for (var c = this.left; c < this.right; c++) {
                result += row[c] ? row[c] : '.';
            }
            result += "\n";
        }
        console.log(result.trim());
    };
    return Grid;
}());
//# sourceMappingURL=Day22.js.map