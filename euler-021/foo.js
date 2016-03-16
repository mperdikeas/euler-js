'use strict';

console.log(`
TODO
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

function isAmicable(n) {
    let s = sumOfProperDivs(n);
    return n === sumOfProperDivs(s);
}

var rv = (function() {
    const N = 1000;

    let nums = _.range(1, N+1);


    var sum = nums.filter(isAmicable).reduce( (v,e)=>v+e, 0);
    return sum; 
})();

console.log(`the answer is ${rv}`);
