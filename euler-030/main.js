'use strict';

console.log(`

Surprisingly there are only three numbers that can be written as the sum of fourth powers of their digits:

1634 = 1^4 + 6^4 + 3^4 + 4^4
8208 = 8^4 + 2^4 + 0^4 + 8^4
9474 = 9^4 + 4^4 + 7^4 + 4^4
As 1 = 14 is not a sum it is not included.

The sum of these numbers is 1634 + 8208 + 9474 = 19316.

Find the sum of all the numbers that can be written as the sum of fifth powers of their digits.
`);


let _ = require('underscore');

let assert = require('assert');

const DEBUG = false;

function solution(POWER) {

    function power(n, b) {
        return  _.times(b, _=>n).reduce( (v, e)=>v*e, 1);
    }

    assert.equal(power(2,3), 8);
    assert.equal(power(3,2), 9);
    assert.equal(power(1,0), 1);
    assert.equal(power(0,1), 0);
    assert.equal(power(9,5), 59049);

    function sumOfPowerOfItsDigits(n, POWER) {
        return n.toFixed().split('').map( (d)=>power(d, POWER)).reduce( (v,e)=>v+e, 0);
    }

    assert.equal(sumOfPowerOfItsDigits(1021, 5), 1+32+1);


    // Intuition:
    // let n be the number of digits
    // let maxS5(n) be the maximum sum of fifth powers of a number with n digits
    // let minN(n) be the lowest number having n digits
    // maxS5 is a linear function whereas minN is exponential
    // therefore the moment minN crosses over the plot of maxS5 it will never match it
    // or fall below it ever again. As such, if n is that number (i.e. the number for which
    // minN surpasses maxS5), then we need to look only for numbers with less than n digits.

    function maxNumberOfDigitsToConsider() {

        function minN(n) {
            if (n===1)
                return 0; // edge case
            return power(10, n-1);
        }

        function maxSPower(n) {
            let v1 =  _.times(n, _=>9).map( (x,_)=>power(x, POWER) ).reduce( (v,e)=>v+e, 0);
            // alternative way piggy-backing on sumOfFifthPowerOfItsDigits
            let v2 = sumOfPowerOfItsDigits(parseInt(_.times(n, _=>'9').join('')), POWER);
            assert.equal(v2, v1);
            return v2;
        }

        for (let i = 1; ; i++) {
            let minNvalue  = minN (i);
            let maxSPowerValue = maxSPower (i);
            if (DEBUG)
                console.log(`the minimum number with ${i} digits is ${minNvalue}, the maximum sum of the ${POWER}-th power of its digits is: ${maxSPowerValue}`);
            if (minNvalue > maxSPowerValue)
                return i-1;
        }
        throw new Error('impossible');
    }

    let maxNumOfDigits = maxNumberOfDigitsToConsider();

    if (DEBUG)
        console.log(`Maximum number of digits to consider is: ${maxNumOfDigits}`);


    let matches = [];
    for (let i = 10 ; i < power(10, maxNumOfDigits); i++) { // we start at 10 since number needs to have two digits to be considered a sum
        if (i===sumOfPowerOfItsDigits(i, POWER))
            matches.push(i);
    }

    return matches.reduce( (v,e)=>v+e, 0);

}

assert.equal( solution(4), 19316);

console.log(`\n\n\nThe answer is: ${solution(5)}`);
