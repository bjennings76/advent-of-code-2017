// http://adventofcode.com/2017/day/16

import day = require("./Day17");
//import day = require("./Day16");

run(day.inputs, day.solve);

function run(inputs, solve) {
    console.log();

    inputs.forEach((input, i) => {
        console.log(`Solution ${(i + 1)}:`);
        var t0 = process.hrtime();
        solve(input);
        var t1 = process.hrtime(t0);
        var duration = t1[0] * 1000 + t1[1] / 1000000;
        console.log(`(${duration.toFixed(2)}ms)\n`);
    });

    console.log('Press any key to exit...');
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on('data', process.exit.bind(process, 0));
}
