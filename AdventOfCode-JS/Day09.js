"use strict";
// http://adventofcode.com/2017/day/9
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
exports.title = "Day 9";
exports.inputs = [fs.readFileSync('Day09-input.txt', "utf8")];
exports.solve = input => {
    var data = new Data(input);
    console.log(`Part 1: totalScore = ${data.totalScore}`);
    console.log(`Part 2: garbageCount = ${data.garbageCount}`);
};
function Data(input) {
    var i = 0;
    this.input = input;
    this.groupCount = 0;
    this.totalScore = 0;
    this.garbageCount = 0;
    this.current = function () { return this.input[i]; };
    this.last = function () { return this.input[i - 1]; };
    this.hasMore = function () { return i < this.input.length; };
    this.ignore = function () { return this.input[i - 2] == "!"; };
    this.pop = function () { return this.input[i++]; };
    this.rootGroup = new Group(this, 0);
}
function Group(data, depth) {
    this.content = "";
    this.score = depth;
    this.groups = [];
    this.garbages = [];
    data.totalScore += depth;
    this.parse = function () {
        while (data.hasMore()) {
            const c = data.pop();
            switch (c) {
                case "{":
                    const group = new Group(data, depth + 1);
                    data.groupCount += 1;
                    this.groups.push(group);
                    this.content += "{}";
                    break;
                case "<":
                    this.garbages.push(new Garbage(data));
                    this.content += "<>";
                    break;
                case "!":
                    this.content += c;
                    this.content += data.pop();
                    break;
                case "}":
                    if (depth != 0)
                        return;
                default:
                    this.content += c;
            }
        }
    };
    this.parse();
}
class Garbage {
    constructor(data) {
        this.content = "";
        while (data.hasMore() && (c != ">")) {
            var c = data.pop();
            switch (c) {
                case "!":
                    this.content += c;
                    this.content += data.pop();
                    break;
                case ">":
                    return;
                default:
                    data.garbageCount++;
                    this.content += c;
            }
        }
    }
}
//# sourceMappingURL=Day09.js.map