'use strict';
console.log(`

The fraction 49/98 is a curious fraction, as an inexperienced mathematician in attempting to simplify it may incorrectly believe that 49/98 = 4/8, which is correct, is obtained by cancelling the 9s.

We shall consider fractions like, 30/50 = 3/5, to be trivial examples.

There are exactly four non-trivial examples of this type of fraction, less than one in value, and containing two digits in the numerator and denominator.

If the product of these four fractions is given in its lowest common terms, find the value of the denominator.

`);

const assert = require('assert');
const _      = require('underscore');
const DEBUG  = false;

function divisors(n) {
    let rv = [];
    const LIM = Math.floor(Math.sqrt(n));
    _.range(1, LIM+1).forEach(x=> {
        if (n%x===0) {
            rv.push(x);
            if (n/x != x)
                rv.push(n/x);
        }
    });
    let rvGroupBy = _.countBy(rv, x=>x);
    assert.equal(false, Object.keys(rvGroupBy).some(x=> rvGroupBy[x]!=1));
    return rv;
}


function gcd(a, b) { // brute-force, the official algorithm is non-intuitive to me
    let divsOfA = divisors(a);
    let divsOfB = divisors(b);
    let commonDivs = _.filter(divsOfA, x=>_.contains(divsOfB, x));
    return _.max(commonDivs);
}


function simplify(fraction) {
    let gcdV = gcd(fraction.a, fraction.b);
    return {a: fraction.a/gcdV
            , b: fraction.b/gcdV};
}

function commonDigits(a, b) {
    let aDigs = a.toFixed().split('');
    let bDigs = b.toFixed().split('');
    let rv = [];
    aDigs.forEach(x=> {
        if (_.contains(bDigs, x))
            rv.push(parseInt(x));
    });
    return rv;
}

function wipeDigitsOff(n, digitsToWipe) {
    assert.equal(typeof 0 , typeof            n);
    assert.equal(typeof [], typeof digitsToWipe);
    let nDigs = n.toFixed().split('').map( (x,_)=>parseInt(x));
    return parseInt(nDigs.filter(x=>!_.contains(digitsToWipe, x)).map(x=>x.toFixed()).join(''));
}

assert.equal(1003, wipeDigitsOff(2221489003882, [2, 4, 8, 9]));

function equalFractions(a,b,c,d) {
    return a*d === b*c;
}

function naivelySimplifyCommonDigits(a,b) {
    assert.equal(true, numbersHaveCommonDigits(a,b));
    let aDigs = a.toFixed().split('');
    let bDigs = b.toFixed().split('');
}


let curiousFractions = [];
_.range(10, 99).forEach(a=> {
    _.range(a+1, 99).forEach(b=>{ // since we know that we are looking for values less than 1, b has to be greater than a
        if ((a%10!=0) && (b%10!=0)) {
            if (commonDigits(a,b).length>0) {
                let commonDigitsV = commonDigits(a,b);
                let a2 = wipeDigitsOff(a, commonDigitsV);
                let b2 = wipeDigitsOff(b, commonDigitsV);
                if (!_.some([a2,b2], isNaN)) {
                    if (equalFractions(a,b,a2,b2)) {
                        if (DEBUG)
                            console.log(`found fraction ${a}/${b} === ${a2}/${b2}`);
                        curiousFractions.push({a: a, b: b});
                    }
                }
            }
        }
    });
});


let product = curiousFractions.reduce( (v,e) => {
    return {a: v.a*e.a, b: v.b*e.b};
}
                                       , {a:1, b:1});

let productSimplified = simplify(product);

console.log(`\n\n\n\nAnswer is: ${productSimplified.b}`);
