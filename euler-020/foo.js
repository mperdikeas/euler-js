'use strict';

console.log(`
TODO
`);

let Big = require('big.js');
let _   = require('underscore');

const N = 100;

let nums = _.range(1, N+1).map(x=>new Big(x));

let factorial = nums.reduce( (prevV, currEl) => prevV.mul(currEl), new Big(1));

let digits = factorial.toFixed().split('').map( (x, _)=>parseInt(x) );

let answer = digits.reduce ( (v,e)=>v+e, 0);

console.log(answer);

