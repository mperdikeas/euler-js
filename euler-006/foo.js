'use strict';
console.log(`
The sum of the squares of the first ten natural numbers is,

12 + 22 + ... + 102 = 385
The square of the sum of the first ten natural numbers is,

(1 + 2 + ... + 10)2 = 552 = 3025
Hence the difference between the sum of the squares of the first ten natural numbers and the square of the sum is 3025 − 385 = 2640.

Find the difference between the sum of the squares of the first one hundred natural numbers and the square of the sum.
`);

var _ = require('underscore');

let oneToTen = _.range(1, 100+1);

let sumOfSquares = oneToTen.map( x=>x*x).reduce( (a,b)=>a+b
                                                 , 0);

let square = x => x*x;

let squareOfSums = square(oneToTen.reduce( (a,b)=>a+b
                                           , 0));

console.log(squareOfSums - sumOfSquares);
