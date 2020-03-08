function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(prim) {

    if (prim.match(/\)|\(/g) !== null) {
        if (prim.match(/\(/g) !== null && prim.match(/\)/g) == null || prim.match(/\(/g) == null && prim.match(/\)/g) !== null || prim.match(/\(/g).length !== prim.match(/\)/g).length) {
            throw new Error('ExpressionError: Brackets must be paired')
        }
    }
    if (prim.includes(" ")) {
        prim = prim.split(' ').filter(a => a !== '')
    }
    else {
        prim = prim.split('')
    }

    function operator() {
        switch (second[second.length - 1]) {
            case "+": a = +first[first.length - 2] + +first[first.length - 1]; break;
            case "-": a = +first[first.length - 2] - +first[first.length - 1]; break;
            case "*": a = +first[first.length - 2] * +first[first.length - 1]; break;
            case "/": a = +first[first.length - 2] / +first[first.length - 1]; break;
        }
        first.pop();
        first.pop()
        first.push(a);
        second.pop()
    }

    let prio = {
        "+": 1,
        "-": 1,
        "*": 2,
        "/": 2,
    }

    let first = [];
    let second = [];

    for (let i = 0; i < prim.length; i++) {

        if (isFinite(prim[i])) {
            first.push(prim[i]);
        }
        else if (second.length == 0) {
            second.push(prim[i]);
        }
        else if (prio[prim[i]] > prio[second[second.length - 1]] || prim[i] == "(" || second[second.length - 1] == "(") {
            second.push(prim[i]);
        }
        else if (prim[i] == ")") {
            while (second[second.length - 1] !== "(") {
                operator()
            }
            second.pop()
        }
        else if (prio[prim[i]] < prio[second[second.length - 1]] || prio[prim[i]] == prio[second[second.length - 1]]) {
            operator();
            if (prio[prim[i]] == prio[second[second.length - 1]]) {
                operator()
            }
            second.push(prim[i])
        }

    }
    if (first.includes(Infinity)) {
        throw new Error('TypeError: Division by zero.')
    }
    while (second.length > 0) {
        operator();
    }
    if (first.includes(Infinity)) {
        throw new Error('TypeError: Division by zero.')
    }
    return first[0]

}

module.exports = {
    expressionCalculator
}