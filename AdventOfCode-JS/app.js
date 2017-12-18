"use strict";
// http://adventofcode.com/2017/
Object.defineProperty(exports, "__esModule", { value: true });
//import day01 = require("./Day01"); run(day01);
//import day02 = require("./Day02"); run(day02);
//import day03 = require("./Day03"); run(day03);
//import day04 = require("./Day04"); run(day04);
//import day05 = require("./Day05"); run(day05);
//import day06 = require("./Day06"); run(day06);
//import day07 = require("./Day07"); run(day07);
//import day08 = require("./Day08"); run(day08);
//import day09 = require("./Day09"); run(day09);
//import day10 = require("./Day10"); run(day10);
//import day11 = require("./Day11"); run(day11);
const day12 = require("./Day12");
run(day12);
//import day13 = require("./Day13"); run(day13);
//import day14 = require("./Day14"); run(day14);
//import day15 = require("./Day15"); run(day15);
//import day16 = require("./Day16"); run(day16);
//import day17 = require("./Day17"); run(day17);
var lastOnly = false;
pressAnyKey();
function run(day) {
    console.log();
    if (lastOnly)
        runInput(day.inputs[day.inputs.length - 1], 0);
    else
        day.inputs.forEach(runInput);
    function runInput(input, i) {
        const title = lastOnly ? `${day.title} Solution` : `${day.title} Solution #${(i + 1)}`;
        if (input.length >= 40 || input.includes('\n'))
            console.log(`${title}:`);
        else
            console.log(`${title} for '${input.replace(/\s+/g, ' ')}':`);
        const t0 = process.hrtime();
        day.solve(input);
        const t1 = process.hrtime(t0);
        const duration = t1[0] * 1000 + t1[1] / 1000000;
        console.log(`(${duration.toFixed(2)}ms)\n`);
    }
}
function pressAnyKey() {
    console.log('Press any key to exit...');
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on('data', process.exit.bind(process, 0));
}
//# sourceMappingURL=app.js.map