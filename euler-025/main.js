'use strict';

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
