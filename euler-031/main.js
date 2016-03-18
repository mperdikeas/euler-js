'use strict';

console.log(`
In England the currency is made up of pound, £, and pence, p, and there are eight coins in general circulation:

1p, 2p, 5p, 10p, 20p, 50p, £1 (100p) and £2 (200p).
It is possible to make £2 in the following way:

1×£1 + 1×50p + 2×20p + 1×5p + 1×2p + 3×1p
How many different ways can £2 be made using any number of coins?
`);

const _      = require('underscore');
const assert = require('assert');

const coins = [1, 2, 5, 10, 20, 50, 100, 200];
const TARGET = 200;

let maximumRepetitions = _.max(coins.map( (x,_)=>TARGET/x )); 

console.log(maximumRepetitions);



function value(arr) {
    let sum = 0;
    arr.forEach(x=>{
        sum += coins[x];
    });
    return sum;
}


assert.equal(3, value([0,0,0]));       // three pence
assert.equal(5, value([0,0,0,1])); // three pence and one two-pence


let solutions = [];

function findSolutions(idx, carry) {
    let valueSoFar = value(carry);
    if (valueSoFar === TARGET) {
        solutions.push(carry);
        return;
    }
    if (valueSoFar > TARGET) {
        return;
    }
    let remainingValue = TARGET - valueSoFar;
    let maxAdditionalCoinsInThisDenomination = remainingValue / coins[idx];
    for (let i = 0 ; i <= maxAdditionalCoinsInThisDenomination; i++) {
        let newCarry = carry.concat(_.times(i, _=>idx));
        findSolutions(idx+1, newCarry);
    }
 }

findSolutions(0, []);
console.log(`The answer is: ${solutions.length}`);
