// http://advenofcode.com/2017/day/22
// Started at 12/22 @ 6:40 pm.

var fs = require('fs');

export var title = "Day 22";

export var inputs = [
    {
        text: `..#
#..
...`,
        counts: [1, 2, 6, 7, 70, 10000]
    },
    {
        text: `.....###..#....#.#..##...
......##.##...........##.
.#..#..#.#.##.##.........
...#..###..##.#.###.#.#.#
##....#.##.#..####.####..
#..##...#.##.##.....##..#
.#.#......#...####...#.##
###....#######...#####.#.
##..#.####...#.#.##......
##.....###....#.#..#.##.#
.#..##.....#########.##..
##...##.###..#.#..#.#...#
...####..#...#.##.#..####
.#..##......#####..#.###.
...#.#.#..##...#####.....
#..###.###.#.....#.#.###.
##.##.#.#.##.#..#..######
####.##..#.###.#...#..###
.........#####.##.###..##
..#.##.#..#..#...##..#...
###.###.#.#..##...###....
##..#.#.#.#.#.#.#...###..
#..#.#.....#..#..#..##...
........#######.#...#.#..
..##.###.#.##.#.#.###..##`,
        counts: [10000]
    }
];

export var solve = input => {
    solve1(input);
    solve2(input);
}

var solve1 = input => {
    const grid = new Grid(input.text);
    const virus = new Virus(grid);
    const max = input.counts[input.counts.length - 1];
    for (let i = 1; i <= max; i++) {        
        virus.burst();
        //if (input.counts.includes(i)) {
        //    console.log(`Part1: At ${i} bursts, there are ${cursor.infections} infections.`);
        //}
    }
    console.log(`Part1: At ${max} bursts, there are ${virus.infections} infections.`);
};

var solve2 = input => {
    const grid = new Grid(input.text);
    const virus = new Virus(grid);
    const max = 10000000;
    for (let i = 1; i <= max; i++) {
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
    console.log(`Part2: At ${max} bursts, there are ${virus.infections} infections.`);
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
