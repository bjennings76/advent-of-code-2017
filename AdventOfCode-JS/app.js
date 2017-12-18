"use strict";
//import day01 = require("./Day01");
//import day02 = require("./Day02");
//import day03 = require("./Day03");
//import day04 = require("./Day04");
//import day05 = require("./Day05");
//import day06 = require("./Day06");
//import day07 = require("./Day07");
//import day08 = require("./Day08");
//import day09 = require("./Day09");
//import day10 = require("./Day10");
Object.defineProperty(exports, "__esModule", { value: true });
var day11 = require("./Day11");
//import day12 = require("./Day12");
//import day13 = require("./Day13");
//import day14 = require("./Day14");
//import day15 = require("./Day15");
//import day16 = require("./Day16");
//import day17 = require("./Day17");
var lastOnly = false;
//run(day01);
//run(day02);
//run(day03);
//run(day04);
//run(day05);
//run(day06);
//run(day07);
//run(day08);
//run(day09);
//run(day10);
run(day11);
//run(day12);
//run(day13);
//run(day14);
//run(day15);
//run(day16);
//run(day17);
pressAnyKey();
function run(day) {
    console.log();
    if (lastOnly)
        runInput(day.inputs[day.inputs.length - 1], 0);
    else
        day.inputs.forEach(runInput);
    function runInput(input, i) {
        var title = lastOnly ? day.title + " Solution" : day.title + " Solution #" + (i + 1);
        if (input.length >= 40 || input.includes('\n'))
            console.log(title + ":");
        else
            console.log(title + " for '" + input.replace(/\s+/g, ' ') + "':");
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