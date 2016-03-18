'use strict';

console.log(`
We shall say that an n-digit number is pandigital if it makes use of all the digits 1 to n exactly once; for example, the 5-digit number, 15234, is 1 through 5 pandigital.

The product 7254 is unusual, as the identity, 39 × 186 = 7254, containing multiplicand, multiplier, and product is 1 through 9 pandigital.

Find the sum of all products whose multiplicand/multiplier/product identity can be written as a 1 through 9 pandigital.

HINT: Some products can be obtained in more than one way so be sure to only include it once in your sum.
`);

let _      = require('underscore');
let assert = require('assert');

function isPandigital(n) {

    class NotExactlyOneFound {
        constructor(d, n) {
            this.d = d;
            this.n = n;
        }
        toString() {
            return `For digit ${d} ${n} occurences were found`;
        }
    }
    
    const digits = n.toFixed().split('').map( (x,_)=>parseInt(x) );
    let digitsToCheck = '123456789'.split('').map( (x,_)=>parseInt(x) ).slice(0, digits.length);
    if (digitsToCheck.some(x=>!_.contains(digits, x)))
        return false;
    let rv = true;
    let x = _.countBy(digits, a=>a);
    try {
        Object.keys(x).forEach(p=>{
            if (x[p]!=1)
                throw new NotExactlyOneFound(parseInt(p), x[p]);
        });
        return true;
    } catch (e) {
        return false;
    }
}

function isPandigital3(n1, n2, n3) {
    let all = n1.toFixed()+n2.toFixed()+n3.toFixed();
    return isPandigital(parseInt(all));
}



function allTwoFactors(n) {
    const LIM = Math.ceil(Math.sqrt(n));
    let rv = [];
    _.range(1, LIM+1).forEach(x=>{
        if (n % x === 0) {
            rv.push([x, n/x]);
        }
    });
    return rv;
}

function isProductUnusual(n) {
    let allTwoFactorsV = allTwoFactors(n);
    return _.some(allTwoFactorsV, x=>{
        let numD1 = x[0].toFixed().length;
        let numD2 = x[1].toFixed().length;
        let numDN =    n.toFixed().length;
        return (numD1+numD2+numDN===9) // it is an implied requirement that this be a pandigital of 9 digits
            && (isPandigital3(x[0], x[1], n));
    });
}

test();


// Insight: if a number has n digits then no pair of its two factors
// can have less than n-1 digits in total
// so, since n + (n-1) = 9, n can be at most 5
const MAX_NUMBER_OF_DIGITS = 5;
let maxProduct = power(10, MAX_NUMBER_OF_DIGITS) -1;
assert.equal(MAX_NUMBER_OF_DIGITS, maxProduct.toFixed().length);

let allUnusualProducts = _.range(1, maxProduct).filter(isProductUnusual);
console.log('\n\nAll unusual products are: '+allUnusualProducts);
let sumOfAllUnusualProducts = allUnusualProducts.reduce ( (v,e)=>v+e, 0);



console.log(`\n\n\nAnswer is: ${sumOfAllUnusualProducts}`);





function test() {
    assert.equal( true, isPandigital( 15234));
    assert.equal(false, isPandigital(105234));
    assert.equal(false, isPandigital( 12343));

    assert.equal(true, isPandigital3(1,2,3));
    assert.equal(true, isPandigital3(1,2,34));
    assert.equal(true, isPandigital3(14,23,56,7));
    assert.equal(false, isPandigital3(14,23,6));

    assert.equal(true, isProductUnusual(7254));
    assert.equal(false, isProductUnusual(72541));

    assert.equal(9, power(3, 2));
    assert.equal(8, power(2, 3));
    assert.equal(0, power(0, 1));
    assert.equal(1, power(1, 0));
}

function power(a, n) {
    return _.times(n, _=>a).reduce( (v,e)=>v*e
                                    , 1);
}

