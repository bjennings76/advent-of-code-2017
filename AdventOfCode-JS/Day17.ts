// http://adventofcode.com/2017/day/16

export function solve(input) {
    solve17A(input);
    solve17B(input);
}

function solve17A(input) {
    let pos = 0;
    const buffer = [0];
    for (let i = 1; i <= 2017; i++) {
        pos += input;
        pos = pos % buffer.length;
        pos++;
        buffer.splice(pos, 0, i);
    }
    console.log(`Value after 2017: ${buffer[pos + 1]}`);
}

function solve17B(input) {
    let pos = 0;
    let length = 1;
    let targetValue = 0;

    for (let i = 1; i <= 5e7; i++) {
        pos += input;
        pos = pos % length;
        pos++;
        length++;
        if (pos == 1) {
            targetValue = i;
        }
        //if (i % 1e6 == 0) console.log(`${i / 1e6} million...`);
    }

    console.log(`Value after 5,000,000: ${targetValue}`);
}

export var inputs = [3, 394];