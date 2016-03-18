'use strict';

console.log(`
145 is a curious number, as 1! + 4! + 5! = 1 + 24 + 120 = 145.

Find the sum of all numbers which are equal to the sum of the factorial of their digits.

Note: as 1! = 1 and 2! = 2 are not sums they are not included.
`);

const _      = require('underscore');
const assert = require('assert');

function fact(n) {
    if (n===0)
        return 1;
    return n*fact(n-1);
}

function power(a, n) {
    if (n===0)
        return 1;
    else
        return a*power(a, n-1);
}

function isCurious(n) {
    return n===n.toFixed().split('').map( (x,_)=>parseInt(x)).map(fact).reduce( (v,e)=>v+e, 0);
}

assert.equal(true, isCurious(145));


// Insight: let n be the number of digits we are considering
// let minN(n) be the lowest number that has n digits
// let maxF(n) be the maximum sum of the factorial of the digits of an n-digit number
// It can be seen that maxF is linear whereas minN is exponential
// Further, for n=1, we have maxF(1) = 9! whereas minN(1)=0
// So minN starts "below" maxF
// At the moment the plot of minN crosses over the plot of maxF then it will never touch
// it again or fall below it.

const MAX_DIGITS = (function() {
    function minN(n) {
        if (n===1)
            return 0; // edge case
        else
            return power(10, n-1);
    }

    function maxF(n) {
        return (power(10,2)-1).toFixed().split('').map( (x,_)=>parseInt(x)).map(factorial).reduce( (v,e)=>v+e, 0);
    }

    for (let i = 1; ; i++) {
        let minNV = minN(i);
        let maxFV = maxF(i);
        I am left here

    }


})();
