// http://adventofcode.com/2017/day/11

var fs = require('fs');

export var title = "Day 11";

export var inputs = [
    "ne,ne,ne",
    "ne,ne,sw,sw",
    "ne,ne,s,s",
    "se,sw,se,sw,sw",
    fs.readFileSync('Day11-input.txt', "utf8")
];

export var solve = input => new Location(input).logSolution();

class Location {
    logSolution;
    coord;

    get ne()  { return  this.coord[0]; }
    set ne(v) { this.coord[0] =  v; }

    get sw()  { return -this.coord[0]; }
    set sw(v) { this.coord[0] = -v; }

    get n()   { return  this.coord[1]; }
    set n(v)  { this.coord[1] =  v; }

    get s()   { return -this.coord[1]; }
    set s(v)  { this.coord[1] = -v; }

    get nw()  { return  this.coord[2]; }
    set nw(v) { this.coord[2] =  v; }

    get se()  { return -this.coord[2]; }
    set se(v) { this.coord[2] = -v; }

    constructor(input) {
        this.coord = [0, 0, 0];
        var furthest = 0;

        const totalSteps = () => Math.abs(this.coord[0]) + Math.abs(this.coord[1]) + Math.abs(this.coord[2]);

        const normalize = () => {
            // normalize n <--> s
            if (this.nw > 0 && this.ne > 0) this.nw--; this.ne--; this.n++;
            if (this.se > 0 && this.sw > 0) this.se--; this.sw--; this.s++;

            // normalize nw <--> se
            if (this.n > 0 && this.sw > 0) this.n--; this.sw--; this.nw++;
            if (this.s > 0 && this.ne > 0) this.s--; this.ne--; this.se++; 

            // normalize ne <--> sw
            if (this.n > 0 && this.se > 0) this.n--; this.se--; this.ne++;
            if (this.s > 0 && this.nw > 0) this.s--; this.nw--; this.sw++;
        }

        const step = (direction) => {
            this[direction]++;
            normalize();
            furthest = Math.max(totalSteps(), furthest);
        }

        this.logSolution = () => {
            input.trim().split(",").forEach((s) => step(s));
            console.log(`Part 1: total steps = ${totalSteps()}`);
            console.log(`Part 2: furthest = ${furthest}`);
        }
    }
}