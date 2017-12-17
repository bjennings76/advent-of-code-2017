export var title = "Day 6";

export var solve = input => {
    var list = input.trim().split(/\s+/).map(n => parseInt(n));
    var iterations = 0;
    var seen = [];
    var matchIndex = -1;

    while (matchIndex < 0) {
        matchIndex = anyIsMatch(seen, list);
        seen.push(list.slice(0));
        redistribute(list);
        iterations++;
    }

    console.log(`Part 1: ${iterations - 1}`);
    console.log(`Part 2: ${iterations - (matchIndex + 1)}`);
}

function anyIsMatch(lists, list) {
    for (let i = 0; i < lists.length; i++) {
        if (isMatch(list, lists[i])) {
            return i;
        }
    }

    return -1;
}

function isMatch(list1, list2) {
    if (list1.length != list2.length) return false;

    for (let i = 0; i < list1.length; i++) {
        if (list1[i] != list2[i]) {
            return false;
        }
    }

    return true;
}

function redistribute(list) {
    let highest = Math.max(...list);
    let i = list.indexOf(highest);
    list[i] = 0;

    while (highest > 0) {
        i++;
        i = i >= list.length ? 0 : i;
        list[i]++;
        highest--;
    }
}

export var inputs = [
    `0	2	7	0`,
    `11	11	13	7	0	15	5	5	4	4	1	1	7	1	15	11`
];