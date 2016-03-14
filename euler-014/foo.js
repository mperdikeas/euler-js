'use strict';

console.log(`
The following iterative sequence is defined for the set of positive integers:

n → n/2 (n is even)
n → 3n + 1 (n is odd)

Using the rule above and starting with 13, we generate the following sequence:

13 → 40 → 20 → 10 → 5 → 16 → 8 → 4 → 2 → 1
It can be seen that this sequence (starting at 13 and finishing at 1) contains 10 terms. Although it has not been proved yet (Collatz Problem), it is thought that all starting numbers finish at 1.

Which starting number, under one million, produces the longest chain?

NOTE: Once the chain starts the terms are allowed to go above one million.

`);

let _ = require('underscore');


let collatz = function(n) {
    if (n===1)
        return [1];
    if (n%2 === 0)
        return [n].concat(collatz(n/2));
    else
        return [n].concat(collatz(3*n+1));
};

console.log(collatz(13));

let N = 1000*1000;

let allSequences = _.range(1, N);
let rv = (function(){
    return allSequences.reduce(function(currVal, currEl) {
        let currLength = collatz(currEl).length;
        if (currLength > currVal.len) {
            return {i: currEl,
                    len: currLength
                   };
        } else
            return currVal;
    }, {i: null, len: -1});
})();

console.log(rv.i);
