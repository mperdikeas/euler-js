'use strict';

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
