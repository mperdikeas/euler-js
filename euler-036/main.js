'use strict';
console.log(`
The decimal number, 585(10) = 1001001001(2) (in binary), is palindromic in both bases.

Find the sum of all numbers, less than one million, which are palindromic in base 10 and base 2.

(Please note that the palindromic number, in either base, may not include leading zeros.)
`);

const _      = require('lodash');
const assert = require('assert');

var isPallindromic = (function() {
    function isPallindromic(arr) {
        let copy = arr.slice();
        copy.reverse();
        return _.isEqual(arr, copy);
    }
    assert.equal(true, isPallindromic([1,2,3,2,1]));
    assert.equal(true, isPallindromic('abcddcba'.split('')));
    assert.equal(false, isPallindromic([1,2,3,2,1,3]));
    return isPallindromic;
})();


var pow = (function() {
    function pow(a, n) {
        return _.times(n, _.constant(a)).reduce ( (v,e)=>v*e, 1);
    }
    assert.equal(8, pow(2, 3));
    assert.equal(9, pow(3, 2));
    assert.equal(0, pow(0, 1));
    assert.equal(1, pow(1, 0));
    return pow;
})();

var digits2Number = (function() {
    function digits2Number(digits) {
        let sum = 0;
        for (let i = 0 ; i < digits.length; i++) {
            sum += digits[digits.length-1-i]*pow(10, i);
        }
        return sum;
    }
    for (let i = 0 ; i < 1000 ; i++)
        assert.equal(i, digits2Number(i.toFixed().split('')));
    return digits2Number;
})();

function digitsBinary(digitsDecimal) {
    let n = digits2Number(digitsDecimal);
    return n.toString(2).split('');
}

var isPalindromicInBase10andBase2 = (function() {
    function isPalindromicInBase10andBase2(n){
        return isPallindromic(n.toFixed().split(''))
            && isPallindromic(digitsBinary(n.toFixed().split('')));
    }
    assert.equal(true, isPalindromicInBase10andBase2(585));
    return isPalindromicInBase10andBase2;
})();

let answer = _.range(1, pow(10, 6)-1).filter(isPalindromicInBase10andBase2).reduce( (v,e)=>v+e, 0);
console.log(`The answer is: ${answer}`);
