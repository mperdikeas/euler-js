'use strict';
console.log(`
The sum of the primes below 10 is 2 + 3 + 5 + 7 = 17.

Find the sum of all the primes below two million.

`);

let _ = require('underscore');

let isPrime = function(n) {
    var candidateFactors = _.range(2, Math.floor(Math.sqrt(n))+1);
    return !_.some(candidateFactors, x=>n%x===0);
};

const N = 2000000;
let allPrimes = _.range(2, N).filter(isPrime);

console.log(allPrimes.reduce( (a,b)=>a+b, 0));

