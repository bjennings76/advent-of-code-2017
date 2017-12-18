"use strict";
// http://adventofcode.com/2017/day/8
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
exports.title = "Day 8";
exports.inputs = [
    `b inc 5 if a > 1
a inc 1 if b < 5
c dec -10 if a >= 1
c inc -20 if c == 10`,
    fs.readFileSync('Day08-input.txt', "utf8")
];
exports.solve = input => {
    var registers = {};
    var highestEver = 0;
    var getHighest = () => Object.keys(registers).map(k => registers[k]).reduce((h, v) => Math.max(h, v), 0);
    input.split('\n').map((i) => new Instruction(i, registers)).forEach((i) => {
        i.run();
        highestEver = Math.max(getHighest(), highestEver);
    });
    var highest = getHighest();
    console.log(`Part 1: Highest = ${highest}`);
    console.log(`Part 2: Highest Running = ${highestEver}`);
};
class Instruction {
    run() { if (this.check())
        this.registers[this.register] += this.mod; }
    check() {
        const a = this.registers[this.checkRegister];
        const b = this.checkValue;
        switch (this.checkTest) {
            case "<":
                return a < b;
            case "<=":
                return a <= b;
            case ">":
                return a > b;
            case ">=":
                return a >= b;
            case "==":
                return a == b;
            case "!=":
                return a != b;
            default:
                throw (`Don't recognize ${this.checkTest}`);
        }
    }
    constructor(input, registers) {
        this.registers = registers;
        const match = input.match(/^(\w+) (inc|dec) ([-0-9]+) if (\w+) ([^\s]+) ([-0-9]+)/);
        this.register = match[1];
        this.mod = match[2] == "dec" ? -Number(match[3]) : Number(match[3]);
        this.checkRegister = match[4];
        this.checkTest = match[5];
        this.checkValue = Number(match[6]);
        this.registers[this.register] = this.registers[this.register] || 0;
        this.registers[this.checkRegister] = this.registers[this.checkRegister] || 0;
    }
}
//# sourceMappingURL=Day08.js.map