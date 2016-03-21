'use strict';
console.log(`
The number 3797 has an interesting property. Being prime itself, it is possible to continuously remove digits from left to right, and remain prime at each stage: 3797, 797, 97, and 7. Similarly we can work from right to left: 3797, 379, 37, and 3.

Find the sum of the only eleven primes that are both truncatable from left to right and right to left.

NOTE: 2, 3, 5, and 7 are not considered to be truncatable primes.
`);



const _       = require('lodash');
const assert  = require('assert');


/***********************************************************************
 *                                                                     *
 *    Utility functions common to both solutions                       *
 *                                                                     *
 ***********************************************************************/

var pow = (function() {
    function pow(a, n) {
        return _.times(n, _.constant(a)).reduce( (v,e)=>v*e, 1);
    }
    assert.equal(8, pow(2,3));
    assert.equal(9, pow(3,2));
    return pow;
})();


function digitsToNumber(digits) {
    let sum = 0;
    for (let i = 0; i < digits.length ; i++)
        sum += digits[i]*pow(10, digits.length-1-i);
    return sum;
}


// returns the truncations of a number
let truncations = (function() {

    function truncations(n) {
        let rv = [];
        function _push(v) {
            if (!_.some(rv, x=> _.isEqual(x, v)))
                rv.push(v);
        }
        let digits = n.toFixed().split('');
        for (let i = 0; i < digits.length ; i++) {
            _push(digits.slice(i));
            _push(digits.slice(0, digits.length-i));
        }
        return rv.map(digitsToNumber);
    };
    return truncations;
})();


function solutionWithSieveOfEratosthenes(EXPECTED_NUMBER) {

    var sieve = (function() {

        function sieve(from, upTo) {
            if (from<2)
                throw new Error(`[from] cannot be lower than 2 and was: ${from}`);
            let rv = _.range(from, upTo+1).map( (x)=>({v:x, present: true}) );
            for (let i = 2; i <= upTo/2 ; i++) {
                for (let j = 2; ; j++) {
                    if (i*j > upTo)
                        break;
                    if (i*j < from)
                        continue;
                    else {
                        let idx = i*j-from;
                        rv[idx].present = false;
                    }
                }
            }
            let rvv = rv.filter(x=>x.present).map(x=>x.v);
            return rvv;
        }
        
        return sieve;
    })();


    // assumes the array is sorted
    var binarySearch = (function() {
        function binarySearch(arr, n) {

            return binarySearchInternal(arr, 0, arr.length - 1, n);

            function binarySearchInternal(arr, i, j, n) {
                if (i>j)
                    return -1;
                let mid = Math.floor((j+i)/2);
                if (arr[mid]===n)
                    return mid;
                else if (arr[mid]<n) {
                    return binarySearchInternal(arr, mid+1, j, n);
                } else {
                    return binarySearchInternal(arr, i, mid-1, n);
                }
            }
            
        }
        var tests = [{arr: [], x: 2, v: -1},
                     {arr: [1], x: 2, v: -1},
                     {arr: [1], x: 1, v: 0},
                     {arr: [1,2,100], x: 1, v: 0},
                     {arr: [1,2,100], x: 2, v: 1},
                     {arr: [1,2,100], x:100, v: 2},
                     {arr: [1,2,100], x:0   , v: -1},
                     {arr: [1,2,100], x:1.2 , v: -1},
                     {arr: [1,2,100], x:3   , v: -1},
                     {arr: [1,2,100], x:101 , v: -1},
                     {arr: _.range(1, 1000), x: 999.5, v:-1}
                    ];
        tests.forEach( e => {
            assert.equal(e.v, binarySearch(e.arr, e.x));
        });
        return binarySearch;
    })();

    function isPrime(n, sieve) {
        let idx = binarySearch(sieve, n);
        let v = idx!=-1;
        return v;
    }



    let isTruncatablePrime = (function() {
        function isTruncatablePrime(n, sieve) {
            if (n<10)
                return false;
            return _.every(truncations(n), x=>isPrime(x, sieve));
        }
        assert.equal(true, isTruncatablePrime(3797, sieve(2, 5000)));
        return isTruncatablePrime;
    })();


    const FOUND_EM = {v: null};
    try {
        const SIEVE_INCREMENTS = 100000;
        let sieveV = [];
        let truncatablePrimes = [];
        for (let i = 0; ; i++) {
            let from = Math.max(     i*SIEVE_INCREMENTS+1, 2);
            let upTo =           (i+1)*SIEVE_INCREMENTS;
            let newSieve = sieve(from, upTo);
            sieveV = sieveV.concat(newSieve);
            newSieve.forEach( j => {
                if (isTruncatablePrime(j, sieveV)) {
                    truncatablePrimes.push(j);
                    if (truncatablePrimes.length===EXPECTED_NUMBER) {
                        FOUND_EM.v = truncatablePrimes;
                        throw FOUND_EM;
                    }
                }
            });
        }
        throw new Error('impossible');
    } catch (e) {
        if (e===FOUND_EM) {
            return e.v;
        } else {
            throw e;
        }
    }
}


function dumbSolution(EXPECTED_NUMBER) {

    function isPrime(n) {
        if (n===1)
            return false;
        const UP_TO = Math.floor(Math.sqrt(n));
        let v =  !_.range(2, UP_TO+1).some( x => n%x === 0 );
        return v;
    }

    var isTruncatablePrime = (function() {
        function isTruncatablePrime(n) {
            if (n<10)
                return false;
            return _.every(truncations(n), isPrime);
        }
        assert.equal(true, isTruncatablePrime(3797));
        return isTruncatablePrime;
    })();

    
    let n = 10;
    let v = [];
    while (true) {
        if (isTruncatablePrime(n++)) {
            v.push(n-1);
        }
        if (v.length === EXPECTED_NUMBER) {
            return v;
        }
    }
}

// Idea: I don't get it why only eleven (11) of them exist but since I am told that this is so,
// I'll simply continue till I find those eleven and then sum them up.

const EXPECTED_NUMBER = 11;
(function() {
    let start = new Date().getTime();
    let truncatablePrimes = solutionWithSieveOfEratosthenes(EXPECTED_NUMBER);
    let end = new Date().getTime();
    let answer = truncatablePrimes.reduce ( (v,e)=>v+e, 0);
    console.log(`Answer with sieve method is: ${answer} (computed in ${end-start} milliseconds)`);
})();

(function() {
    let start = new Date().getTime();
    let truncatablePrimes = dumbSolution(EXPECTED_NUMBER);
    let end = new Date().getTime();
    let answer = truncatablePrimes.reduce ( (v,e)=>v+e, 0);
    console.log(`Answer with dumb method is: ${answer} (computed in ${end-start} milliseconds)`);
})();
