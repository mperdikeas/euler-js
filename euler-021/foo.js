'use strict';

console.log(`
Let d(n) be defined as the sum of proper divisors of n (numbers less than n which divide evenly into n).
If d(a) = b and d(b) = a, where a ≠ b, then a and b are an amicable pair and each of a and b are called amicable numbers.

For example, the proper divisors of 220 are 1, 2, 4, 5, 10, 11, 20, 22, 44, 55 and 110; therefore d(220) = 284. The proper divisors of 284 are 1, 2, 4, 71 and 142; so d(284) = 220.

Evaluate the sum of all the amicable numbers under 10000.
`);

let _ = require('underscore');
function properDivs(n) {
    let _push = function (arr, p) {
        if (p!=n)
            arr.push(p);
    };
    
    const LIM = Math.floor(Math.sqrt(n));
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

function isAmicable(n) {
    let s = sumOfProperDivs(n);
    return (s!=n)&&(n === sumOfProperDivs(s));
}

let rv = (function() {
    const N = 10000;

    let nums = _.range(1, N+1);

    let amicable = nums.filter(isAmicable);

    let sum = amicable.reduce( (v,e)=>v+e, 0);
    return sum; 
})();

console.log(`the answer is: ${rv}`);
