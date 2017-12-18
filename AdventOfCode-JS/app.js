"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import day01 = require("./Day01");
//import day02 = require("./Day02");
//import day03 = require("./Day03");
//import day04 = require("./Day04");
//import day05 = require("./Day05");
//import day06 = require("./Day06");
//import day07 = require("./Day07");
var day08 = require("./Day08");
//import day09 = require("./Day09");
//import day10 = require("./Day10");
//import day11 = require("./Day11");
//import day12 = require("./Day12");
//import day13 = require("./Day13");
//import day14 = require("./Day14");
//import day15 = require("./Day15");
//import day16 = require("./Day16");
//import day17 = require("./Day17");
//run(day01, true);
//run(day02, true);
//run(day03, true);
//run(day04, true);
//run(day05, true);
//run(day06, true);
//run(day07, true);
run(day08, true);
//run(day09);
//run(day10);
//run(day11);
//run(day12);
//run(day13);
//run(day14);
//run(day15);
//run(day16, true);
//run(day17, true);
pressAnyKey();
function run(day, last) {
    if (last === void 0) { last = false; }
    console.log();
    if (last)
        runInput(day.inputs[day.inputs.length - 1], 0);
    else
        day.inputs.forEach(runInput);
    function runInput(input, i) {
        if (input.length < 40 && !input.includes('\n')) {
            console.log(day.title + " Solution #" + (i + 1) + " for '" + input.replace(/\s+/g, ' ') + "':");
        }
        else
            console.log(day.title + " Solution " + (i + 1) + ":");
        var t0 = process.hrtime();
        day.solve(input);
        var t1 = process.hrtime(t0);
        var duration = t1[0] * 1000 + t1[1] / 1000000;
        console.log("(" + duration.toFixed(2) + "ms)\n");
    }
}
function pressAnyKey() {
    console.log('Press any key to exit...');
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on('data', process.exit.bind(process, 0));
}
//# sourceMappingURL=app.js.map