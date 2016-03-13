var _ = require('underscore');

var isPrime = function(n) {
    if (n===1)
        return false;
    var candidateFactors = _.range(2, Math.floor(Math.sqrt(n))+1);
    return !_.some(candidateFactors, function(m) {
        return n%m===0;
    });
};


var primeFactorizationOf = function (n) {
    var candidateFactors = _.range(2, Math.floor(Math.sqrt(n))+1);
    for (var i = 0 ; i < candidateFactors.length ; i++) {
        var f = candidateFactors[i];
        if (n % f === 0) {
            if (isPrime(f)) {
                return [f].concat(primeFactorizationOf(n/f));
            } else {
                return currV.concat(primeFactorsOf(f),
                                    primeFactorsOf(n/f));
            }
        }
    }
    if (!isPrime(n))
        throw new Error('impossible: '+n);
    else
        return [n];
};

console.log(`
The prime factors of 13195 are 5, 7, 13 and 29.

What is the largest prime factor of the number 600851475143 ?

`);
console.log(_.max(primeFactorizationOf(600851475143)));


