"use strict";
// http://adventofcode.com/2017/day/10
Object.defineProperty(exports, "__esModule", { value: true });
exports.title = "Day 10";
exports.inputs = ["3,4,1,5", "", "AoC 2017", "1,2,3", "1,2,4", "76,1,88,148,166,217,130,0,128,254,16,2,130,71,255,229"];
exports.solve = function (input) {
    var knotted = twist(input, 1);
    if (!knotted)
        console.log("Part 1: '" + input + "' is not a valid array of numbers.");
    else
        console.log("Part 1: knot check = " + knotted[0] * knotted[1]);
    console.log("Part 2: hash = " + knotHash(input));
};
function knotHash(str) {
    var max = 256;
    var pos = 0;
    var skip = 0;
    var lengths = [];
    for (var i = 0; i < str.length; i++) {
        lengths.push(str.charCodeAt(i));
    }
    var line = twist(lengths.concat([17, 31, 73, 47, 23]));
    var hex = "";
    for (var i = 0; i < 16; i++) {
        var xor = null;
        for (var j = 0; j < 16; j++) {
            if (xor == null)
                xor = line[i * 16 + j];
            else
                xor = xor ^ line[i * 16 + j];
        }
        var s = xor.toString(16);
        hex += s.length == 1 ? "0" + s : s;
    }
    return hex;
}
exports.knotHash = knotHash;
function twist(input, twists, max) {
    if (twists === void 0) { twists = 64; }
    if (max === void 0) { max = 256; }
    var lengths = Array.isArray(input) ? input : input.split(',').map(Number);
    if (lengths.some(isNaN)) {
        return null;
    }
    var pos = 0;
    var skip = 0;
    var list = new Array(256);
    for (var i = 0; i < list.length; i++)
        list[i] = i;
    for (var i = 0; i < twists; i++) {
        for (var j = 0; j < lengths.length; j++) {
            var count = lengths[j];
            var swap1 = pos;
            var swap2 = pos + count - 1;
            while (swap1 < swap2) {
                var temp = list[swap1 % max];
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