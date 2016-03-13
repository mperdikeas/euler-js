'use strict';

console.log(`
By listing the first six prime numbers: 2, 3, 5, 7, 11, and 13, we can see that the 6th prime is 13.

    What is the 10 001st prime number?
`);

let _ = require('underscore');

let isPrime = function(n) {
    if (n===1)
        return false;
    var candidateFactors = _.range(2, Math.floor(Math.sqrt(n))+1);
    return !_.some(candidateFactors, f => n % f === 0);
};

let rv = (function() {
    let primesFound = 0;
    for (let i = 2; ; i++) {
        if (isPrime(i))
            primesFound++;
        if (primesFound===10001)
            return i;
    }
    throw new Error('impossible');
})();

console.log(rv);
