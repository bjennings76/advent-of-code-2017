"use strict";
// http://advenofcode.com/2017/day/23
// Started at 12/23 @ 8:40 pm.
Object.defineProperty(exports, "__esModule", { value: true });
exports.title = "Day 23";
exports.inputs = [
    "set b 79\nset c b\njnz a 2\njnz 1 5\nmul b 100\nsub b -100000\nset c b\nsub c -17000\nset f 1\nset d 2\nset e 2\nset g d\nmul g e\nsub g b\njnz g 2\nset f 0\nsub e -1\nset g e\nsub g b\njnz g -8\nsub d -1\nset g d\nsub g b\njnz g -13\njnz f 2\nsub h -1\nset g b\nsub g c\njnz g 2\njnz 1 3\nsub b -17\njnz 1 -23"
];
exports.solve = function (input) {
    solve1(input);
    // :(
    solve2Alt(input);
};
var solve1 = function (input) {
    var registers = "abcdefgh";
    var reg = registers.split('').reduce(function (r, c) {
        r[c] = 0;
        return r;
    }, {});
    var pos = 0;
    var get = function (r) { return Number(r) ? Number(r) : Number(reg[r]); };
    var set = function (r, v) { return reg[r] = get(v); };
    var sub = function (r, v) { return reg[r] -= get(v); };
    var mul = function (r, v) { return reg[r] *= get(v); };
    var jnz = function (r, v) { return get(r) > 0 || get(r) < 0 ? pos += get(v) - 1 : pos; };
    var getFunc = function (s) {
        switch (s) {
            case 'set': return set;
            case 'sub': return sub;
            case 'mul': return mul;
            case 'jnz': return jnz;
        }
    };
    var instructions = input.split("\n").map(function (s) { return s.match(/^(.{3}) (.) (.*)/).slice(1); });
    var mulCount = 0;
    while (instructions[pos]) {
        var i = instructions[pos];
        getFunc(i[0])(i[1], i[2]);
        if (i[0] == 'mul')
            mulCount++;
        pos++;
    }
    console.log("Part 1: " + mulCount);
};
var solve2Alt = function (n) {
    var r = {
        b: 107900,
        c: 124900,
        d: 0,
        f: 0,
        g: 0,
        h: 0
    };
    do {
        r['f'] = 1;
        r['d'] = 2;
        for (var d = r['d']; d * d < r['b']; ++d) {
            if (r['b'] % d === 0) {
                r['f'] = 0;
                break;
            }
        }
        if (r['f'] === 0)
            r['h']++;
        r['g'] = r['b'] - r['c'];
        r['b'] += 17;
    } while (r['g'] !== 0);
    console.log("Part 2: register 'h' = " + r['h']);
};
var solve2 = function (input) {
    var registers = "abcdefgh";
    var reg = registers.split('').reduce(function (r, c) {
        r[c] = 0;
        return r;
    }, {});
    reg['a'] = 1;
    var pos = 0;
    debugger;
    var get = function (r) { return isNaN(r) ? Number(reg[r]) : Number(r); };
    var set = function (r, v) { return reg[r] = get(v); };
    var sub = function (r, v) { return reg[r] -= get(v); };
    var mul = function (r, v) { return reg[r] *= get(v); };
    var jnz = function (r, v) { return get(r) > 0 || get(r) < 0 ? pos += get(v) - 1 : pos; };
    var getFunc = function (s) {
        switch (s) {
            case 'set': return set;
            case 'sub': return sub;
            case 'mul': return mul;
            case 'jnz': return jnz;
        }
    };
    var instructions = input.split("\n").map(function (s) { return s.match(/^(.{3}) (.) (.*)/).slice(1); });
    var count = 0;
    while (instructions[pos]) {
        var i = instructions[pos];
        var result = getFunc(i[0])(i[1], i[2]);
        if (isNaN(reg['f']))
            debugger;
        if (count % 1000000 == 0)
            console.log(JSON.stringify(reg, null, 2));
        //console.log(i + " = " + result);
        pos++;
        count++;
    }
    console.log("Part 2: " + reg['h']);
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
//# sourceMappingURL=Day23.js.map