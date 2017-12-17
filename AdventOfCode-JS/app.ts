// http://adventofcode.com/2017/day/16

//import day01 = require("./Day01");
//import day02 = require("./Day02");
import day03 = require("./Day03");
//import day04 = require("./Day04");
//import day16 = require("./Day16");
//import day17 = require("./Day17");

//run(day01, true);
//run(day02, true);
//run(day03, true);
//run(day04, true);
//run(day16, true);
//run(day17, true);
pressAnyKey();

function run(day, last = false) {
    console.log();

    if (last) runInput(day.inputs[day.inputs.length - 1], 0);
    else day.inputs.forEach(runInput);

    function runInput(input, i) {
        if (input.length < 40 && !input.includes('\n'))
            console.log(`${day.title} Solution #${(i + 1)} for '${input}':`);
        else
            console.log(`${day.title} Solution ${(i + 1)}:`);
        var t0 = process.hrtime();
        day.solve(input);
        var t1 = process.hrtime(t0);
        var duration = t1[0] * 1000 + t1[1] / 1000000;
        console.log(`(${duration.toFixed(2)}ms)\n`);
    }
}

function pressAnyKey() {
    console.log('Press any key to exit...');
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on('data', process.exit.bind(process, 0));
}
