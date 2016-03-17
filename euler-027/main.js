'use strict';

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
