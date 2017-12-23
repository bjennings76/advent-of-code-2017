// http://advenofcode.com/2017/day/23
// Started at 12/23 @ 8:40 pm.

export var title = "Day 23";

export var inputs = [
    `set b 79
set c b
jnz a 2
jnz 1 5
mul b 100
sub b -100000
set c b
sub c -17000
set f 1
set d 2
set e 2
set g d
mul g e
sub g b
jnz g 2
set f 0
sub e -1
set g e
sub g b
jnz g -8
sub d -1
set g d
sub g b
jnz g -13
jnz f 2
sub h -1
set g b
sub g c
jnz g 2
jnz 1 3
sub b -17
jnz 1 -23`
];

export var solve = input => {
    solve1(input);

    // :(
    solve2Alt(input);
}

var solve1 = input => {
    const registers = "abcdefgh";
    const reg = registers.split('').reduce((r, c) => {
        r[c] = 0;
        return r;
    }, {});

    let pos = 0;

    const get = (r) => Number(r) ? Number(r) : Number(reg[r]);
    const set = (r, v) => reg[r] = get(v);
    const sub = (r, v) => reg[r] -= get(v);
    const mul = (r, v) => reg[r] *= get(v);
    const jnz = (r, v) => get(r) > 0 || get(r) < 0 ? pos += get(v) - 1 : pos;

    const getFunc = s => {
        switch (s) {
            case 'set': return set;
            case 'sub': return sub;
            case 'mul': return mul;
            case 'jnz': return jnz;
        }
    }

    const instructions = input.split("\n").map(s => s.match(/^(.{3}) (.) (.*)/).slice(1));
    let mulCount = 0;

    while (instructions[pos]) {        
        const i = instructions[pos];
        getFunc(i[0])(i[1], i[2]);
        if (i[0] == 'mul') mulCount++;
        pos++;
    }

    console.log("Part 1: " + mulCount);
};

var solve2Alt = n => {
    const r = {
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
        for (let d = r['d']; d * d < r['b']; ++d) {
            if (r['b'] % d === 0) {
                r['f'] = 0;
                break;
            }
        }
        if (r['f'] === 0) r['h']++;
        r['g'] = r['b'] - r['c'];
        r['b'] += 17;
    } while (r['g'] !== 0)

    console.log(`Part 2: register 'h' = ${r['h']}`);
}

var solve2 = input => {
    const registers = "abcdefgh";
    const reg = registers.split('').reduce((r, c) => {
        r[c] = 0;
        return r;
    }, {});

    reg['a'] = 1;

    let pos = 0;
    debugger;

    const get = (r) => isNaN(r) ? Number(reg[r]) : Number(r);
    const set = (r, v) => reg[r] = get(v);
    const sub = (r, v) => reg[r] -= get(v);
    const mul = (r, v) => reg[r] *= get(v);
    const jnz = (r, v) => get(r) > 0 || get(r) < 0 ? pos += get(v) - 1 : pos;

    const getFunc = s => {
        switch (s) {
            case 'set': return set;
            case 'sub': return sub;
            case 'mul': return mul;
            case 'jnz': return jnz;
        }
    }

    const instructions = input.split("\n").map(s => s.match(/^(.{3}) (.) (.*)/).slice(1));
    let count = 0;

    while (instructions[pos]) {
        const i = instructions[pos];
        const result = getFunc(i[0])(i[1], i[2]);
        if (isNaN(reg['f'])) debugger;
        if (count % 1000000 == 0) console.log(JSON.stringify(reg, null, 2));

        //console.log(i + " = " + result);
        pos++;
        count++;
    }

    console.log("Part 2: " + reg['h']);
};

class Vector {
    x: number;
    y: number;

    constructor(x: number, y: number) { this.set(x, y); }
    eq(vector: Vector): boolean { return this.x == vector.x && this.y == vector.y; }
    reverse() { this.set(this.x *= -1, this.y *= -1); }

    set(x, y): void {
        this.x = x;
        this.y = y;
    }

    add(vector: Vector) {
        this.x += vector.x;
        this.y += vector.y;
    }

    static get zero()  { return new Vector( 0,  0); }
    static get up()    { return new Vector( 0, -1); }
    static get down()  { return new Vector( 0,  1); }
    static get left()  { return new Vector(-1,  0); }
    static get right() { return new Vector( 1,  0); }
}

class Virus {
    pos: Vector;
    dir: Vector;
    grid: Grid;

    infections = 0;

    constructor(grid: Grid) {
        this.grid = grid;
        this.dir = Vector.up;
        this.pos = new Vector((this.grid.map.length - 1) / 2, (this.grid.map[0].length - 1) / 2);
    }

    isInfected(): boolean { return this.grid.get(this.pos) == "#"; }
    isWeak(): boolean { return this.grid.get(this.pos) == "W"; }
    isFlagged(): boolean { return this.grid.get(this.pos) == "F"; }
    isClean(): boolean { return this.grid.get(this.pos) == "." || this.grid.get(this.pos) == undefined; }

    weaken(): void { this.grid.set(this.pos, "W"); }
    flag(): void { this.grid.set(this.pos, "F"); }
    clean(): void { this.grid.set(this.pos, "."); }
    move(): void { this.pos.add(this.dir); }

    infect(): void {
        this.grid.set(this.pos, "#");
        this.infections++;
    }

    turnRight(): void {
        if (this.dir.eq(Vector.down)) this.dir = Vector.left;
        else if (this.dir.eq(Vector.up)) this.dir = Vector.right;
        else if (this.dir.eq(Vector.right)) this.dir = Vector.down;
        else if (this.dir.eq(Vector.left)) this.dir = Vector.up;
        else throw(`Can't figure out initial direction of ${this.dir}`);
    }

    turnLeft(): void {
        if (this.dir.eq(Vector.up)) this.dir = Vector.left;
        else if (this.dir.eq(Vector.down)) this.dir = Vector.right;
        else if (this.dir.eq(Vector.left)) this.dir = Vector.down;
        else if (this.dir.eq(Vector.right)) this.dir = Vector.up;
        else throw(`Can't figure out direction of ${this.dir}`);
    }

    burst(): void {
        if (this.isInfected()) {
            this.turnRight();
            this.clean();
        }
        else {
            this.turnLeft();
            this.infect();
        }
        this.move();
    }

    burst2(): void {
        if (this.isClean()) {
            this.weaken();
            this.turnLeft();
        } else if (this.isWeak()) {
            this.infect();
        } else if (this.isInfected()) {
            this.flag();
            this.turnRight();
        } else if (this.isFlagged()) {
            this.clean();
            this.dir.reverse();
        }

        this.move();
    }
}

class Grid {
    map: string[][] = [];
    top = 0;
    bottom = 0;
    left = 0;
    right = 0;

    constructor(text: string) {
        this.map = text.split("\n").map(l => l.split(''));
        this.bottom = this.map.length;
        this.right = this.map[0].length;
    }

    get(vector: Vector): string {
        const row = this.map[vector.y] ? this.map[vector.y] : (this.map[vector.y] = []);
        return row[vector.x] ? row[vector.x] : ".";
    }

    set(vector: Vector, value: string): void {
        const row = this.map[vector.y] ? this.map[vector.y] : (this.map[vector.y] = []);
        row[vector.x] = value;

        this.top = Math.min(vector.y, this.top);
        this.bottom = Math.max(vector.y, this.bottom);
        this.left = Math.min(vector.x, this.left);
        this.right = Math.max(vector.x, this.right);
    }

    print(): void {
        let result = "";
        for (let r = this.top; r < this.bottom; r++) {
            const row = this.map[r] ? this.map[r] : [];
            for (let c = this.left; c < this.right; c++) {
                result += row[c] ? row[c] : '.';
            }
            result += "\n";
        }
        console.log(result.trim());
    }
}
