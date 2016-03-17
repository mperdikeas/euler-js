'use strict';

console.log(`
n! means n × (n − 1) × ... × 3 × 2 × 1

For example, 10! = 10 × 9 × ... × 3 × 2 × 1 = 3628800,
and the sum of the digits in the number 10! is 3 + 6 + 2 + 8 + 8 + 0 + 0 = 27.

Find the sum of the digits in the number 100!
`);

let Big = require('big.js');
let _   = require('underscore');

const N = 100;

let nums = _.range(1, N+1).map(x=>new Big(x));

let factorial = nums.reduce( (prevV, currEl) => prevV.mul(currEl), new Big(1));

let digits = factorial.toFixed().split('').map( (x, _)=>parseInt(x) );

let answer = digits.reduce ( (v,e)=>v+e, 0);

console.log(answer);

