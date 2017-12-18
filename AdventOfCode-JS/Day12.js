"use strict";
// http://adventofcode.com/2017/day/12
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
exports.title = "Day 12";
exports.inputs = [
    "0 <-> 2\n1 <-> 1\n2 <-> 0, 3, 4\n3 <-> 2, 4\n4 <-> 2, 3, 6\n5 <-> 6\n6 <-> 4, 5",
    fs.readFileSync('Day12-input.txt', "utf8")
];
exports.solve = function (input) {
    var items = input.trim().split("\n");
    var lookup = {};
    items.map(function (item) {
        var pieces = item.split(" <-> ");
        var id = Number(pieces[0]);
        var links = pieces[1].split(", ");
        var list = getList(id, lookup);
        for (var i in links) {
            var id2 = Number(links[i]);
            if (!list.includes(id2)) {
                list.push(id2);
            }
        }
    });
    var groups = {};
    for (var id in lookup) {
        var found = false;
        for (var groupId in groups) {
            if (groups[groupId] && groups[groupId].includes(Number(id))) {
                found = true;
                break;
            }
        }
        if (!found) {
            groups[id] = getConnections(id, lookup);
        }
    }
    console.log(groups);
    var connections = getConnections(0, lookup);
    connections.sort(function (n1, n2) { return n1 - n2; });
    console.log("Part 1: group count = " + Object.keys(groups).length);
    console.log("Part 2: id '0' group size = " + connections.length);
};
function getCleanInput(data) {
    return data
        .split(/\r?\n/)
        .map(function (p) { return p.trimLeft().trimRight(); })
        .map(function (p) { return p.replace(/ /g, ""); })
        .filter(function (p) { return !!p; })
        .reduce(function (map, p) {
        var parts = p.split("<->");
        map[parts[0]] = parts[1].split(",");
        return map;
    }, {});
}
function getConnections(rootId, lookup) {
    var queue = [rootId];
    var connections = [];
    while (queue.length > 0) {
        var id = queue.pop();
        if (connections.indexOf(id) >= 0) {
            connections.push(id);
            var list = getList(id, lookup);
            for (var i in list) {
                if (queue.indexOf(list[i]) >= 0) {
                    queue.push(list[i]);
                }
            }
        }
    }
    return connections;
}
function getList(id, lookup) {
    return lookup[id] || (lookup[id] = []);
}
//# sourceMappingURL=Day12.js.map