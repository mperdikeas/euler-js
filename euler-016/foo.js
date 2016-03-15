'use strict'
console.log(`
2^15 = 32768 and the sum of its digits is 3 + 2 + 7 + 6 + 8 = 26.

What is the sum of the digits of the number 2^1000?
`);

var Big = require('big.js');

var _ = require('underscore');

const N = 1000;
let twos = _.times(N, ()=>new Big(2));
let rv = (function() {
    let result = 
            twos.reduce(function(currV, currEl) {
                return currV.mul(currEl);
            }, new Big(1));
    let digits = result.toFixed().split('');
    console.log(digits);
    return digits.reduce(function(currV, currEl) {
        return currV+parseInt(currEl);
    }, 0);
})();
console.log(rv);
