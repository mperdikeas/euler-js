'use strict';
console.log(`
The number, 197, is called a circular prime because all rotations of the digits: 197, 971, and 719, are themselves prime.

There are thirteen such primes below 100: 2, 3, 5, 7, 11, 13, 17, 31, 37, 71, 73, 79, and 97.

How many circular primes are there below one million?
`);

const _ = require('underscore');
const assert = require('assert');



var power = (function() {
    function power(a, n) {
        return _.times(n, _=>a).reduce ( (v,e)=>v*e, 1);
    }
    var powerTest = [{a:2, n: 3, v: 8}, {a:3, n: 2, v: 9}, {a:1, n: 0, v: 1}, {a:0, n: 1, v: 0}];
    powerTest.forEach(x=>{
        assert.equal(x.v, power(x.a, x.n));
    });

    return power;
})();


const N = power(10, 6)-1;

var primesUnder1M = (function(N) {
    // returns the prime numbers in the range [2..n]
    function sieve(n) {
        let rv = _.range(0, n+1).map(x=>{ // we start with 0 to make index handling easier
            return {v:x, present: true};
        });
        for (let i = 2; i<n/2+1; i++) {
            for (let j = 2; ; j++) {
                if (i*j>n)
                    break;
                else {
                    rv[i*j].present = false;
                }
            }
        }
        return _.without(_.filter(rv, x=>x.present).map(x=>x.v), 0, 1); // and now we can remove 0 and 1 (they have served their purpose in making index handling easier)
    }

    return sieve(N);
})(N);

console.log(`Sieve ready with ${primesUnder1M.length} elements...`);


function isPrime(n) {
    if (n>N)
        throw new Error(`Only works in range [1..${N}]`);
    return _.contains(primesUnder1M, n);
}

function allDigits(n) {
    return n.toFixed().split('').map( (x,_)=>parseInt(x) );
}

var numberFromDigits = (function() {
    function numberFromDigits(digits) {
        let rv = 0;
        for (let i = 0 ; i < digits.length ; i++)
            rv += digits[i]*power(10, digits.length-i-1);
        return rv;
    }
    assert.equal(numberFromDigits([1,8,0,3,0]), 18030);
    return numberFromDigits;
})();



function allRotations(arr) {
    let rv = [];

    for (let start = 0; start < arr.length ; start++) {
        let rotation = [];
        for (let i = 0; i < arr.length ; i++) {
            rotation.push(arr[effectiveIndex(start, i, arr.length)]);
        }
        rv.push(rotation);
    }

    return rv;

    function effectiveIndex(start, i, length) {
        return (start+i) % length;
    }
}

function numberOfDigits(n) {
    return n.toFixed().split('').length;
}

function allRotationsOfNumber(n) {
    const numOfDigits = numberOfDigits(n); 
    let v = allRotations(allDigits(n)).map(numberFromDigits);
    // Only keep those permutation with the same number of digits
    // I.e. effectively drop permutations with leading zeros.
    return v.filter(x=>numberOfDigits(x)===numOfDigits); 
}


var isCircularPrime = (function() {
    function isCircularPrime(n) {
        return _.every(allRotationsOfNumber(n), isPrime); // insight every rotation of a number in the range [2..10^6-1] belongs in the same range
    }
    assert.equal(true, isCircularPrime(197));
    return isCircularPrime;
})();


let countOfCircularPrimes = (function() {
    let rv = 0;
    primesUnder1M.forEach(x=>{
        if (isCircularPrime(x)) {
            rv++;
        }
    });
    return rv;
})();


console.log(`The answer is ${countOfCircularPrimes}`);

