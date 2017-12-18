// http://adventofcode.com/2017/day/18

var fs = require('fs');

export var title = "Day 18";

export var inputs = [
    `snd 1
snd 2
snd p
rcv a
rcv b
rcv c
rcv d`,
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
    `set i 31
set a 1
mul p 17
jgz p p
mul a 2
add i -1
jgz i -2
add a -1
set i 127
set p 826
mul p 8505
mod p a
mul p 129749
add p 12345
mod p a
set b p
mod b 10000
snd b
add i -1
jgz i -9
jgz a 3
rcv b
jgz b -1
set f 0
set i 126
rcv a
rcv b
set p a
mul p -1
add p b
jgz p 4
snd a
set a b
jgz 1 3
snd b
set f 1
add i -1
jgz i -11
snd a
jgz f -16
jgz a -19`
];

class Instruction {
    txt;
    command;
    r;
    value;

    constructor(command) {
        const pieces = command.split(' ');
        this.txt = command;
        this.command = pieces[0];
        this.r = pieces[1];
        this.value = pieces[2];
    }
}

export var solve = input => {
    //console.log("Part 1: " + solve1);
    //console.log("Part 2: " + solve2(input));
    altSolve();
};

var solve1 = input => {
    var rs = {};
    var rSounds = {};
    var instructions = input.trim().split("\n").map(c => new Instruction(c));
    var lastSound = 0;
    var iteration = 0;

    for (let p = 0; p < instructions.length; p++) {
        iteration++;
        const i = instructions[p];
        const r: string = i.r;
        const value = isNaN(i.value) ? Number(rs[i.value] || 0) : Number(i.value);

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
                rs[r] = rs[r] ? rs[r] % value : 0%value;
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
            console.log(`Processing '${i.txt}' (${JSON.stringify(rs)})`);
    }

    console.log(rs);
};

class Program {
    index: number = 0;
    rs: {} = {};
    id: number;
    instructions: Instruction[];
    other: Program;
    waiting: boolean;
    valueSent: number = 0;
    queue: number[] = [];
    lastInstruction: Instruction;
    lastIndex: number;
    wasLocked: boolean;

    get locked() { return !this.instruction || this.instruction.command == "rcv" && this.queue.length == 0; }
    get instruction() { return this.instructions[this.index]; }

    enqueue(n: number) {
        this.queue.push(n);
    }

    get summary() { return `P${this.id} ${this.wasLocked ? "..." : "-->"} ${this.lastInstruction.txt} = i:${this.lastIndex} / r:${JSON.stringify(this.rs)} / q:${this.queue})`; }

    run(iteration) {
        this.wasLocked = this.locked;
        this.lastInstruction = this.instruction;
        this.lastIndex = this.index;

        if (this.locked) {
            return;
        }

        const r = this.instruction.r;
        let value = isNaN(this.instruction.value) ? Number(this.rs[this.instruction.value] || 0) : Number(this.instruction.value);

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
                if (this.rs[r] > 0) this.index = (this.index + value) - 1;
                break;
        }
        this.index++;
    }

    constructor(id: number, instructions: Instruction[]) {
        this.instructions = instructions;
        this.id = id;
        this.rs['p'] = id;
    }
}

var solve2 = input => {
    const instructions: Instruction[] = input.trim().split("\n").map(c => new Instruction(c));

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
    var instr = input.split('\n').map(l => l.split(' ').map(r => r.trim()));

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