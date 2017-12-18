"use strict";
// http://adventofcode.com/2017/day/10
Object.defineProperty(exports, "__esModule", { value: true });
exports.title = "Day 10";
exports.inputs = ["3,4,1,5", "", "AoC 2017", "1,2,3", "1,2,4", "76,1,88,148,166,217,130,0,128,254,16,2,130,71,255,229"];
exports.solve = input => {
    var knotted = twist(input, 1);
    if (!knotted)
        console.log(`Part 1: '${input}' is not a valid array of numbers.`);
    else
        console.log(`Part 1: knot check = ${knotted[0] * knotted[1]}`);
    console.log(`Part 2: hash = ${knotHash(input)}`);
};
function knotHash(str) {
    const max = 256;
    let pos = 0;
    let skip = 0;
    const lengths = [];
    for (let i = 0; i < str.length; i++) {
        lengths.push(str.charCodeAt(i));
    }
    const line = twist(lengths.concat([17, 31, 73, 47, 23]));
    let hex = "";
    for (let i = 0; i < 16; i++) {
        let xor = null;
        for (let j = 0; j < 16; j++) {
            if (xor == null)
                xor = line[i * 16 + j];
            else
                xor = xor ^ line[i * 16 + j];
        }
        const s = xor.toString(16);
        hex += s.length == 1 ? `0${s}` : s;
    }
    return hex;
}
exports.knotHash = knotHash;
function twist(input, twists = 64, max = 256) {
    let lengths = Array.isArray(input) ? input : input.split(',').map(Number);
    if (lengths.some(isNaN)) {
        return null;
    }
    let pos = 0;
    let skip = 0;
    const list = new Array(256);
    for (let i = 0; i < list.length; i++)
        list[i] = i;
    for (let i = 0; i < twists; i++) {
        for (let j = 0; j < lengths.length; j++) {
            const count = lengths[j];
            let swap1 = pos;
            let swap2 = pos + count - 1;
            while (swap1 < swap2) {
                const temp = list[swap1 % max];
                list[swap1 % max] = list[swap2 % max];
                list[swap2 % max] = temp;
                swap1++;
                swap2--;
            }
            pos = (pos + count + skip) % max;
            skip++;
        }
    }
    return list;
}
//# sourceMappingURL=Day10.js.map