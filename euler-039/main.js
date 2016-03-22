'use strict';

console.log(`
If p is the perimeter of a right angle triangle with integral length sides, {a,b,c}, there are exactly three solutions for p = 120.

{20,48,52}, {24,45,51}, {30,40,50}

For which value of p ≤ 1000, is the number of solutions maximised?
`);

const assert = require('assert'); 

function isPythagorean (a,b,c) {
    function sq(x) {return x*x;}
    return sq(a)+sq(b)===sq(c);
}

function findPythagoreanWithPerimeter(p) {
    let triplets = [];
    for (let a = 1; a <= p-2 ; a++)
        for (let b = a; a+b <= p-1 ; b++) {
            if (isPythagorean(a,b,p-a-b))
                triplets.push({a: a, b: b, c:p-a-b});
        }
    return triplets;
}


assert.equal(3, findPythagoreanWithPerimeter(120).length);


let maximizingPerimeter = {p: -1,
                           solutions: []};

for (let p = 0 ;  p <= 1000; p++) {
    let solutions = findPythagoreanWithPerimeter(p);
    if (solutions.length > maximizingPerimeter.solutions.length) {
        maximizingPerimeter = {p: p
                               , solutions: solutions};
    }
}

console.log(`\n\n\n\nThe answer is: ${maximizingPerimeter.p} with the following solutions: \n${maximizingPerimeter.solutions.map(x=>JSON.stringify(x)).join('\n')}`);
