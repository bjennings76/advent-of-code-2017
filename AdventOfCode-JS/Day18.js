"use strict";
// http://adventofcode.com/2017/day/18
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
exports.title = "Day 18";
exports.inputs = [
    "snd 1\nsnd 2\nsnd p\nrcv a\nrcv b\nrcv c\nrcv d",
    //    `set a 1
    //add a 2
    //mul a a
    //mod a 5
    //snd a
    //set a 0
    //rcv a
    //jgz a -1
    //set a 1
    //jgz a -2`,
    "set i 31\nset a 1\nmul p 17\njgz p p\nmul a 2\nadd i -1\njgz i -2\nadd a -1\nset i 127\nset p 826\nmul p 8505\nmod p a\nmul p 129749\nadd p 12345\nmod p a\nset b p\nmod b 10000\nsnd b\nadd i -1\njgz i -9\njgz a 3\nrcv b\njgz b -1\nset f 0\nset i 126\nrcv a\nrcv b\nset p a\nmul p -1\nadd p b\njgz p 4\nsnd a\nset a b\njgz 1 3\nsnd b\nset f 1\nadd i -1\njgz i -11\nsnd a\njgz f -16\njgz a -19"
];
var Instruction = /** @class */ (function () {
    function Instruction(command) {
        var pieces = command.split(' ');
        this.txt = command;
        this.command = pieces[0];
        this.r = pieces[1];
        this.value = pieces[2];
    }
    return Instruction;
}());
exports.solve = function (input) {
    //console.log("Part 1: " + solve1);
    //console.log("Part 2: " + solve2(input));
    altSolve();
};
var solve1 = function (input) {
    var rs = {};
    var rSounds = {};
    var instructions = input.trim().split("\n").map(function (c) { return new Instruction(c); });
    var lastSound = 0;
    var iteration = 0;
    for (var p = 0; p < instructions.length; p++) {
        iteration++;
        var i = instructions[p];
        var r = i.r;
        var value = isNaN(i.value) ? Number(rs[i.value] || 0) : Number(i.value);
        switch (i.command) {
            case 'snd':
                rSounds[r] = lastSound = rs[r];
                break;
            case 'set':
                rs[r] = value;
                break;
            case 'add':
                rs[r] = rs[r] ? rs[r] + value : value;
                break;
            case 'mul':
                rs[r] = rs[r] ? rs[r] * value : 0;
                break;
            case 'mod':
                rs[r] = rs[r] ? rs[r] % value : 0 % value;
                break;
            case 'rcv':
                if (rs[r] > 0) {
                    console.log("Playing '" + r + "' at " + lastSound);
                    return;
                }
                break;
            case 'jgz':
                if (rs[r] > 0)
                    p = (p + value) - 1;
                break;
        }
        if (iteration < 100)
            console.log("Processing '" + i.txt + "' (" + JSON.stringify(rs) + ")");
    }
    console.log(rs);
};
var Program = /** @class */ (function () {
    function Program(id, instructions) {
        this.index = 0;
        this.rs = {};
        this.valueSent = 0;
        this.queue = [];
        this.instructions = instructions;
        this.id = id;
        this.rs['p'] = id;
    }
    Object.defineProperty(Program.prototype, "locked", {
        get: function () { return !this.instruction || this.instruction.command == "rcv" && this.queue.length == 0; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Program.prototype, "instruction", {
        get: function () { return this.instructions[this.index]; },
        enumerable: true,
        configurable: true
    });
    Program.prototype.enqueue = function (n) {
        this.queue.push(n);
    };
    Object.defineProperty(Program.prototype, "summary", {
        get: function () { return "P" + this.id + " " + (this.wasLocked ? "..." : "-->") + " " + this.lastInstruction.txt + " = i:" + this.lastIndex + " / r:" + JSON.stringify(this.rs) + " / q:" + this.queue + ")"; },
        enumerable: true,
        configurable: true
    });
    Program.prototype.run = function (iteration) {
        this.wasLocked = this.locked;
        this.lastInstruction = this.instruction;
        this.lastIndex = this.index;
        if (this.locked) {
            return;
        }
        var r = this.instruction.r;
        var value = isNaN(this.instruction.value) ? Number(this.rs[this.instruction.value] || 0) : Number(this.instruction.value);
        switch (this.instruction.command) {
            case 'snd':
                value = isNaN(r) ? this.rs[r] || 0 : Number(r);
                this.valueSent++;
                this.other.enqueue(value);
                //console.log("P" + this.id + " sending " + value);
                break;
            case 'set':
                this.rs[r] = value;
                break;
            case 'add':
                this.rs[r] = this.rs[r] ? this.rs[r] + value : value;
                break;
            case 'mul':
                this.rs[r] = this.rs[r] ? this.rs[r] * value : 0;
                break;
            case 'mod':
                this.rs[r] = this.rs[r] ? this.rs[r] % value : 0 % value;
                break;
            case 'rcv':
                if (this.queue.length > 0) {
                    this.rs[r] = this.queue.shift();
                    this.waiting = false;
                }
                else {
                    this.waiting = true;
                }
                break;
            case 'jgz':
                if (this.rs[r] > 0)
                    this.index = (this.index + value) - 1;
                break;
        }
        this.index++;
    };
    return Program;
}());
var solve2 = function (input) {
    var instructions = input.trim().split("\n").map(function (c) { return new Instruction(c); });
    var p0 = new Program(0, instructions);
    var p1 = new Program(1, instructions);
    p0.other = p1;
    p1.other = p0;
    var i = 0;
    while (!p0.locked || !p1.locked) {
        p0.run(i);
        p1.run(i);
        if (i % 1e6 == 0) {
            console.log(p0.queue.length + " ----- " + p1.queue.length);
        }
        //if (i < 1000) {
        //    console.log(p0.summary + " ----- " + p1.summary);
        //}
        i++;
    }
    console.log("Final p0: " + JSON.stringify(p0.rs));
    console.log("Final p1: " + JSON.stringify(p1.rs));
    return p1.valueSent;
};
function altSolve() {
    console.log('Day 18 part 2');
    var input = fs.readFileSync('Day18-input.txt', { 'encoding': 'utf8' });
    var instr = input.split('\n').map(function (l) { return l.split(' ').map(function (r) { return r.trim(); }); });
    var registersP0 = { p: 0 };
    var registersP1 = { p: 1 };
    var totalSendsP1 = 0;
    var rcvQueueP0 = [];
    var rcvQueueP1 = [];
    var pc0 = 0;
    var pc1 = 0;
    function step(pc, registers, rcvQueue, sendQueue) {
        function get(x) {
            var y = Number(x);
            return isNaN(y) ? (registers[x] || 0) : y;
        }
        var pieces = instr[pc];
        var sentValue = false;
        var waiting = false;
        switch (pieces[0]) {
            case 'set':
                registers[pieces[1]] = get(pieces[2]);
                break;
            case 'add':
                registers[pieces[1]] += get(pieces[2]);
                break;
            case 'mul':
                registers[pieces[1]] *= get(pieces[2]);
                break;
            case 'mod':
                registers[pieces[1]] %= get(pieces[2]);
                break;
            case 'snd':
                sendQueue.push(get(pieces[1]));
                sentValue = true;
                break;
            case 'rcv':
                if (rcvQueue.length != 0) {
                    registers[pieces[1]] = rcvQueue[0];
                    rcvQueue.splice(0, 1);
                }
                else {
                    pc--;
                    waiting = true;
                }
                break;
            case 'jgz':
                if (get(pieces[1]) > 0) {
                    pc += get(pieces[2]) - 1;
                }
                break;
            default:
                console.log('Invalid instruction: ' + pieces[0]);
                break;
        }
        return { pc: pc + 1, sentValue: sentValue, waiting: waiting };
    }
    while (true) {
        var state0 = pc0 < instr.length
            ? step(pc0, registersP0, rcvQueueP0, rcvQueueP1)
            : { waiting: true, pc: null, sentValue: null };
        var state1 = pc1 < instr.length
            ? step(pc1, registersP1, rcvQueueP1, rcvQueueP0)
            : { waiting: true, pc: null, sentValue: null };
        pc0 = state0.pc;
        pc1 = state1.pc;
        if (state1.sentValue) {
            totalSendsP1++;
        }
        if (state0.waiting && state1.waiting) {
            break;
        }
    }
    console.log('P1 sent a total of ' + totalSendsP1);
}
//# sourceMappingURL=Day18.js.map