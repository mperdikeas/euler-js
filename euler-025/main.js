'use strict';

console.log(`
The Fibonacci sequence is defined by the recurrence relation:

Fn = Fn−1 + Fn−2, where F1 = 1 and F2 = 1.
Hence the first 12 terms will be:

F1 = 1
F2 = 1
F3 = 2
F4 = 3
F5 = 5
F6 = 8
F7 = 13
F8 = 21
F9 = 34
F10 = 55
F11 = 89
F12 = 144
The 12th term, F12, is the first term to contain three digits.

What is the index of the first term in the Fibonacci sequence to contain 1000 digits?
`);

let _ = require('underscore');

let Big = require('big.js');

// we can do it in a loop but memoize while overriding the function with its memoized version so that it uses
// the cached values within the *same* recursive computation is more beutiful

function fib(n) {
    if (n.toFixed()==1)
        return new Big(1);
    if (n.toFixed()==2)
        return new Big(1);
    return fib(n-1).plus(fib(n-2));
}

let fibm = _.memoize(fib);
fib = fibm; // important

let rv = (function() {
    const N = 1000;
    for (let i = 1; ; i++) {
        let v = fibm(i).toFixed();
        let numOfDigits = v.split('').length;
        if (numOfDigits >= N)
            return i;
    }
    throw new Error('impossible');
})();

console.log(rv);
