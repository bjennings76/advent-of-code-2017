"use strict";
// http://adventofcode.com/2017/day/11
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
exports.title = "Day 11";
exports.inputs = [
    "ne,ne,ne",
    "ne,ne,sw,sw",
    "ne,ne,s,s",
    "se,sw,se,sw,sw",
    fs.readFileSync('Day11-input.txt', "utf8")
];
exports.solve = function (input) { return new Location(input).logSolution(); };
var Location = /** @class */ (function () {
    function Location(input) {
        var _this = this;
        this.coord = [0, 0, 0];
        var furthest = 0;
        var totalSteps = function () { return Math.abs(_this.coord[0]) + Math.abs(_this.coord[1]) + Math.abs(_this.coord[2]); };
        var normalize = function () {
            // normalize n <--> s
            if (_this.nw > 0 && _this.ne > 0)
                _this.nw--;
            _this.ne--;
            _this.n++;
            if (_this.se > 0 && _this.sw > 0)
                _this.se--;
            _this.sw--;
            _this.s++;
            // normalize nw <--> se
            if (_this.n > 0 && _this.sw > 0)
                _this.n--;
            _this.sw--;
            _this.nw++;
            if (_this.s > 0 && _this.ne > 0)
                _this.s--;
            _this.ne--;
            _this.se++;
            // normalize ne <--> sw
            if (_this.n > 0 && _this.se > 0)
                _this.n--;
            _this.se--;
            _this.ne++;
            if (_this.s > 0 && _this.nw > 0)
                _this.s--;
            _this.nw--;
            _this.sw++;
        };
        var step = function (direction) {
            _this[direction]++;
            normalize();
            furthest = Math.max(totalSteps(), furthest);
        };
        this.logSolution = function () {
            input.trim().split(",").forEach(function (s) { return step(s); });
            console.log("Part 1: total steps = " + totalSteps());
            console.log("Part 2: furthest = " + furthest);
        };
    }
    Object.defineProperty(Location.prototype, "ne", {
        get: function () { return this.coord[0]; },
        set: function (v) { this.coord[0] = v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Location.prototype, "sw", {
        get: function () { return -this.coord[0]; },
        set: function (v) { this.coord[0] = -v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Location.prototype, "n", {
        get: function () { return this.coord[1]; },
        set: function (v) { this.coord[1] = v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Location.prototype, "s", {
        get: function () { return -this.coord[1]; },
        set: function (v) { this.coord[1] = -v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Location.prototype, "nw", {
        get: function () { return this.coord[2]; },
        set: function (v) { this.coord[2] = v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Location.prototype, "se", {
        get: function () { return -this.coord[2]; },
        set: function (v) { this.coord[2] = -v; },
        enumerable: true,
        configurable: true
    });
    return Location;
}());
//# sourceMappingURL=Day11.js.map