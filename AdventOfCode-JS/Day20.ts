// http://advenofcode.com/2017/day/20
// Started at 12/20 @ 9:12 pm.

var fs = require('fs');
var util = require('util');

export var title = "Day 20";

export var inputs = [
//    `p=< 3,0,0>, v=< 2,0,0>, a=<-1,0,0>
//p=< 4,0,0>, v=< 0,0,0>, a=<-2,0,0>`,
    `p=<-6,0,0>, v=< 3,0,0>, a=< 0,0,0>    
p=<-4,0,0>, v=< 2,0,0>, a=< 0,0,0>
p=<-2,0,0>, v=< 1,0,0>, a=< 0,0,0>
p=< 3,0,0>, v=<-1,0,0>, a=< 0,0,0>`,
    fs.readFileSync('Day20-input.txt', { 'encoding': 'utf8' })
];

class Particle {
    i: number;
    p: Vector;
    v: Vector;
    a: Vector;

    update() {
        this.v.add(this.a);
        this.p.add(this.v);
    }

    dist() { return this.p.dist(); }

    constructor(input, i) {
        this.i = i;
        const matches = input.split('>, ');
        this.p = new Vector(matches[0]);
        this.v = new Vector(matches[1]);
        this.a = new Vector(matches[2]);
    }
}

class Vector {
    x = 0;
    y = 0;
    z = 0;

    constructor(input: string) {
        const matches = input.match(/(-?[0-9]+),(-?[0-9]+),(-?[0-9]+)/);
        this.x = Number(matches[1]);
        this.y = Number(matches[2]);
        this.z = Number(matches[3]);
    }

    dist() { return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z); }

    add(v: Vector) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
    }

    toString() { return `[${this.x},${this.y},${this.z}]`; }
}

export var solve = input => {
    solve1(input);
    solve2(input);
}

var solve1 = input => {
    var particles = input.split('\n').map((p, i) => new Particle(p, i));
    var i = 1000;
    while (i > 0) {
        particles.forEach(p => p.update());
        i--;
    }
    var log = "";
    particles.sort((a, b) => a.dist() - b.dist());
    //particles.forEach(p => log += p.i + " = " + p.dist() + "\n");
    console.log("Part 1: " + particles[0].i + " stays the closest.");
};

var solve2 = input => {
    var particles: Particle[] = input.split('\n').map((p, i) => new Particle(p, i));
    var i = 1000;
    while (i > 0) {
        const used = {};
        const colliders: Particle[] = [];
        particles.forEach(p => {
            p.update();
            const pos = p.p.toString();
            if (used[pos]) {
                colliders.push(p);
                colliders.push(used[pos]);
            }
            else {
                used[pos] = p;
            }
        });

        particles = particles.filter((p) => colliders.indexOf(p) < 0);

        i--;
    }
    particles.sort((a, b) => a.dist() - b.dist());
    console.log("Part 2: " + particles.length + " particles remain.");
}