'use strict';

console.log(`
A perfect number is a number for which the sum of its proper divisors is exactly equal to the number. For example, the sum of the proper divisors of 28 would be 1 + 2 + 4 + 7 + 14 = 28, which means that 28 is a perfect number.

A number n is called deficient if the sum of its proper divisors is less than n and it is called abundant if this sum exceeds n.

As 12 is the smallest abundant number, 1 + 2 + 3 + 4 + 6 = 16, the smallest number that can be written as the sum of two abundant numbers is 24. By mathematical analysis, it can be shown that all integers greater than 28123 can be written as the sum of two abundant numbers. However, this upper limit cannot be reduced any further by analysis even though it is known that the greatest number that cannot be expressed as the sum of two abundant numbers is less than this limit.

Find the sum of all the positive integers which cannot be written as the sum of two abundant numbers.
`);

let _ = require('underscore');

function properDivs(n) {
    var _push = function (arr, p) {
        if (p!=n)
            arr.push(p);
    };
    
    const LIM = Math.floor(Math.sqrt(n));
    if (LIM===1)
        return [];
    let candidate = _.range(1, LIM+1);
    let divisors = candidate.reduce( (v,e)=> {
        if (n % e === 0) {
            let div1 = e;
            let div2 = n / e;
            _push(v, div1);
            if (div2!=div1)
                _push(v, div2);
        }
        return v;
    }, []);
    return divisors;
}

function sumOfProperDivs(n) {
    return properDivs(n).reduce( (v,e) => v+e, 0);
}

// -1 if deficient, 0 if perfect, 1 if abundant
function perfectStatus(n) {
    let s = sumOfProperDivs(n);
    if (s<n)
        return -1;
    else if (s===n)
        return 0;
    else
        return 1;
}

function isAbundant(n) {
    return perfectStatus(n)===1;
}


const N = 28123;


let abundant = _.range(1, N+1).filter(isAbundant);
let allSumsOf2AbundantsThatWeCareAbout = (function() {

    let allSums = [];
    for (let i = 0; i < abundant.length ; i++)
        for (let j = i; j < abundant.length ; j++) {
            let sum = abundant[i]+abundant[j];
            if ((sum<=N) && (!_.contains(allSums, sum))) {
                allSums.push(sum);
            }
        }
    return allSums;
})();

let cannotBeExpressed = _.range(1, N+1).filter( x=> {
    return !_.some(allSumsOf2AbundantsThatWeCareAbout, y=>x===y);
});

let answer = cannotBeExpressed.reduce ( (el, v) => el+v, 0);

console.log(answer);
