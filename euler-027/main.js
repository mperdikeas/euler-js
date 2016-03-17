'use strict';

console.log(`
Euler discovered the remarkable quadratic formula:

n² + n + 41

It turns out that the formula will produce 40 primes for the consecutive values n = 0 to 39. However, when n = 40, 402 + 40 + 41 = 40(40 + 1) + 41 is divisible by 41, and certainly when n = 41, 41² + 41 + 41 is clearly divisible by 41.

The incredible formula  n² − 79n + 1601 was discovered, which produces 80 primes for the consecutive values n = 0 to 79. The product of the coefficients, −79 and 1601, is −126479.

Considering quadratics of the form:

n² + an + b, where |a| < 1000 and |b| < 1000

where |n| is the modulus/absolute value of n
e.g. |11| = 11 and |−4| = 4
Find the product of the coefficients, a and b, for the quadratic expression that produces the maximum number of primes for consecutive values of n, starting with n = 0.

`);

let _ = require('underscore');

function isPrime(n) {
    if (n<2)
        return false;
    const UP_TO = Math.floor(Math.sqrt(n));
    let candidateDivisors = _.range(2, UP_TO+1);
    return !candidateDivisors.some(x=>n%x===0);
}

function createQuadratic(a,b) {

    return function(n) {
        return n*n+a*n+b;
    };
}

function lengthOfPrimeRuns(f) {
    for (let n = 0; ; n++)
        if (!isPrime(f(n)))
            return n;
    throw new Error('impossible');
}



assert(40, lengthOfPrimeRuns(createQuadratic(  1,   41)));
assert(80, lengthOfPrimeRuns(createQuadratic(-79, 1601)));

var rv = (function() {
    let rv;
    let maxLength = -1;
    for (let a = -999; a<1000; a++) {
        for (let b = -999; b<1000; b++) {
            let l = lengthOfPrimeRuns(createQuadratic(a,b));
            if (l > maxLength) {
                maxLength = l;
                rv = a*b;
            }
        }
    }
    return rv;
})();

console.log(rv);


function assert(nexpected, nactual) {
    if (nexpected !== nactual)
        throw new Error(`expected number to be ${nexpected}, yet it was: ${nactual}`);
}
