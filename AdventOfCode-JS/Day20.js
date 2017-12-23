"use strict";
// http://advenofcode.com/2017/day/20
// Started at 12/20 @ 9:12 pm.
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
var util = require('util');
exports.title = "Day 20";
exports.inputs = [
    //    `p=< 3,0,0>, v=< 2,0,0>, a=<-1,0,0>
    //p=< 4,0,0>, v=< 0,0,0>, a=<-2,0,0>`,
    "p=<-6,0,0>, v=< 3,0,0>, a=< 0,0,0>    \np=<-4,0,0>, v=< 2,0,0>, a=< 0,0,0>\np=<-2,0,0>, v=< 1,0,0>, a=< 0,0,0>\np=< 3,0,0>, v=<-1,0,0>, a=< 0,0,0>",
    fs.readFileSync('Day20-input.txt', { 'encoding': 'utf8' })
];
var Particle = /** @class */ (function () {
    function Particle(input, i) {
        this.i = i;
        var matches = input.split('>, ');
        this.p = new Vector(matches[0]);
        this.v = new Vector(matches[1]);
        this.a = new Vector(matches[2]);
    }
    Particle.prototype.update = function () {
        this.v.add(this.a);
        this.p.add(this.v);
    };
    Particle.prototype.dist = function () { return this.p.dist(); };
    return Particle;
}());
var Vector = /** @class */ (function () {
    function Vector(input) {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        var matches = input.match(/(-?[0-9]+),(-?[0-9]+),(-?[0-9]+)/);
        this.x = Number(matches[1]);
        this.y = Number(matches[2]);
        this.z = Number(matches[3]);
    }
    Vector.prototype.dist = function () { return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z); };
    Vector.prototype.add = function (v) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
    };
    Vector.prototype.toString = function () { return "[" + this.x + "," + this.y + "," + this.z + "]"; };
    return Vector;
}());
exports.solve = function (input) {
    solve1(input);
    solve2(input);
};
var solve1 = function (input) {
    var particles = input.split('\n').map(function (p, i) { return new Particle(p, i); });
    var i = 1000;
    while (i > 0) {
        particles.forEach(function (p) { return p.update(); });
        i--;
    }
    var log = "";
    particles.sort(function (a, b) { return a.dist() - b.dist(); });
    //particles.forEach(p => log += p.i + " = " + p.dist() + "\n");
    console.log("Part 1: " + particles[0].i + " stays the closest.");
};
var solve2 = function (input) {
    var particles = input.split('\n').map(function (p, i) { return new Particle(p, i); });
    var i = 1000;
    var _loop_1 = function () {
        var used = {};
        var colliders = [];
        particles.forEach(function (p) {
            p.update();
            var pos = p.p.toString();
            if (used[pos]) {
                colliders.push(p);
                colliders.push(used[pos]);
            }
            else {
                used[pos] = p;
            }
        });
        particles = particles.filter(function (p) { return colliders.indexOf(p) < 0; });
        i--;
    };
    while (i > 0) {
        _loop_1();
    }
    particles.sort(function (a, b) { return a.dist() - b.dist(); });
    console.log("Part 2: " + particles.length + " particles remain.");
};
//# sourceMappingURL=Day20.js.map