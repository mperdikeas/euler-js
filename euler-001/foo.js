var _ = require('underscore');

var a = _.range(1, 1000);
var mul3or5 = function(n) {
    return (n % 3 === 0) || (n % 5 === 0);
};
var b = a.filter(mul3or5);
var c = b.reduce( function(prevValue, el) {
    return prevValue+el;
}, 0);


console.log(`
If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23.

Find the sum of all the multiples of 3 or 5 below 1000.
`);
console.log(c);

