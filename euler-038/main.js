'use strict';
console.log(`
Take the number 192 and multiply it by each of 1, 2, and 3:

192 × 1 = 192
192 × 2 = 384
192 × 3 = 576
By concatenating each product we get the 1 to 9 pandigital, 192384576. We will call 192384576 the concatenated product of 192 and (1,2,3)

The same can be achieved by starting with 9 and multiplying by 1, 2, 3, 4, and 5, giving the pandigital, 918273645, which is the concatenated product of 9 and (1,2,3,4,5).

What is the largest 1 to 9 pandigital 9-digit number that can be formed as the concatenated product of an integer with (1,2, ... , n) where n > 1?
`);


const _      = require('lodash');
const assert = require('assert');

function numOfDigits(n) {
    return n.toFixed().split('').length;
}

const is1to9Pandigital = (function() {
    function is1to9Pandigital(n) {
        const ns = n.toFixed().split('');
        const diff =  _.difference(_.range(1, 9+1).map(x=>x.toFixed())
                                   , ns);
        return (ns.length===9) && (diff.length===0);
    }
    assert.equal( true, is1to9Pandigital( 192384576));
    assert.equal(false, is1to9Pandigital(1923845761));
    assert.equal(false, is1to9Pandigital( 192384571));
    return is1to9Pandigital;
})();

const concatenatedProduct = (function() {

    function concatenatedProduct(i, n) {
        const multipliers = _.range(1, n+1);
        const components = multipliers.map(x=>i*x);
        return parseInt(components.map(x=>x.toFixed()).join(''));
    }

    assert.equal(192384576, concatenatedProduct(192, 3));
    assert.equal(918273645, concatenatedProduct(  9, 5));
    return concatenatedProduct;
})();

let maxPandigitalFound = {v: -1,
                          config: null};

let i = 1;
loopouter:
while (true) {
    if (numOfDigits(i)>4) // a number with more than 4 digits cannot yield a concatenated product with (1,2, ..n) where n > 1, with the product having 9 digits
        break loopouter;
    for (let n = 2; ; n++) {
        const product = concatenatedProduct(i, n);
        if (is1to9Pandigital(product)) {
            if (product > maxPandigitalFound.v) {
                maxPandigitalFound.v = product;
                maxPandigitalFound.config = {i: i, n: n};
                if (false)
                    console.log(`found new max pandigital: ${maxPandigitalFound} (${i} - ${n})`);
            }
        }
        if (numOfDigits(product)>9) {
            break; // no need to try subsequent n values for this particular i
        }
    }
    i++;
}
console.log(`Answer is: ${maxPandigitalFound.v} ~ concatenated product of ${maxPandigitalFound.config.i} with (1,2,..n) for n=${maxPandigitalFound.config.n}.`);
