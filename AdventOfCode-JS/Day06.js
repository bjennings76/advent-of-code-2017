"use strict";
// http://adventofcode.com/2017/day/6
Object.defineProperty(exports, "__esModule", { value: true });
exports.title = "Day 6";
exports.solve = function (input) {
    var list = input.trim().split(/\s+/).map(function (n) { return parseInt(n); });
    var iterations = 0;
    var seen = [];
    var matchIndex = -1;
    while (matchIndex < 0) {
        matchIndex = anyIsMatch(seen, list);
        seen.push(list.slice(0));
        redistribute(list);
        iterations++;
    }
    console.log("Part 1: " + (iterations - 1));
    console.log("Part 2: " + (iterations - (matchIndex + 1)));
};
function anyIsMatch(lists, list) {
    for (var i = 0; i < lists.length; i++) {
        if (isMatch(list, lists[i])) {
            return i;
        }
    }
    return -1;
}
function isMatch(list1, list2) {
    if (list1.length != list2.length)
        return false;
    for (var i = 0; i < list1.length; i++) {
        if (list1[i] != list2[i]) {
            return false;
        }
    }
    return true;
}
function redistribute(list) {
    var highest = Math.max.apply(Math, list);
    var i = list.indexOf(highest);
    list[i] = 0;
    while (highest > 0) {
        i++;
        i = i >= list.length ? 0 : i;
        list[i]++;
        highest--;
    }
}
exports.inputs = [
    "0\t2\t7\t0",
    "11\t11\t13\t7\t0\t15\t5\t5\t4\t4\t1\t1\t7\t1\t15\t11"
];
//# sourceMappingURL=Day06.js.map