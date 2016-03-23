'use strict';
const colors = require('colors');
const      _ = require('lodash');
console.log(`
An irrational decimal fraction is created by concatenating the positive integers:

0.12345678910${'1'.red}112131415161718192021...

It can be seen that the 12th digit of the fractional part is 1.

If dn represents the nth digit of the fractional part, find the value of the following expression.

d1 × d10 × d100 × d1000 × d10000 × d100000 × d1000000
`);


const assert = require('assert');

// this can easilly be brute-forced.

// returns the first n digits as a string
const digitString = (function() {
    function digitString (n) {
        let rv = '';
        for (let i = 1; ; i++) {
            rv+=(i.toFixed());
            if (rv.length >=n)
                return rv;
        }
        throw new Error('impossible');
    }
    const testStrings = ['1', '12345678910', '123456789101112131415161718192021'];
    testStrings.forEach(s=> {
        assert.equal(s, digitString(s.length));

    });
    return digitString;
})();

var digitsMul = (function() {
    function digitsMul(indices) {
        const digits = digitString(indices[indices.length-1]); // we are assuming that the indices array is sorted, i.e. the greatest index is last
        return indices.reduce( (v,i) => {
            return v*parseInt(digits[i-1]);
        }, 1);
    }
    assert.equal( 1, digitsMul([12]));
    assert.equal( 8, digitsMul([8, 12])); 
    assert.equal(56, digitsMul([7, 8, 12]));
    return digitsMul;
})();

var power = (function() {
    function power(a, n) {
        return _.times(n, _.constant(a)).reduce( (v,e)=>v*e, 1);
    }
    assert.equal(1, power(10, 0));
    assert.equal(0, power(0, 10));
    assert.equal(8, power(2, 3));
    return power;
})();

const indices = _.range(0, 7).map(x=>power(10, x));

const answer = digitsMul(indices);

console.log(`The answer is: ${answer}`);
