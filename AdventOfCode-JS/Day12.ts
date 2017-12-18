// http://adventofcode.com/2017/day/12

var fs = require('fs');

export var title = "Day 12";

export var inputs = [
    `0 <-> 2
1 <-> 1
2 <-> 0, 3, 4
3 <-> 2, 4
4 <-> 2, 3, 6
5 <-> 6
6 <-> 4, 5`,
    fs.readFileSync('Day12-input.txt', "utf8")
];

export var solve = input => {
    var items = input.trim().split("\n");
    var lookup = {};

    items.map(item => {
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
    connections.sort((n1, n2) => { return n1 - n2; });

    console.log(`Part 1: group count = ${Object.keys(groups).length}`);
    console.log(`Part 2: id '0' group size = ${connections.length}`);
};

function getCleanInput(data) {
    return data
        .split(/\r?\n/)
        .map(p => p.trimLeft().trimRight())
        .map(p => p.replace(/ /g, ""))
        .filter(p => !!p)
        .reduce((map, p) => {
            let parts = p.split("<->");
            map[parts[0]] = parts[1].split(",");
            return map;
        }, {});
}

function getConnections(rootId, lookup) {
    const queue: number[] = [rootId];
    const connections:number[] = [];

    while (queue.length > 0) {
        var id = queue.pop();
        if (connections.indexOf(id) >= 0) {
            connections.push(id);
            var list: number[] = getList(id, lookup);

            for (var i in list) {
                if (queue.indexOf(list[i]) >= 0) {
                    queue.push(list[i]);
                }
            }
        }
    }

    return connections;
}


function getList(id: number, lookup: {}) {
    return lookup[id] || (lookup[id] = []);
}