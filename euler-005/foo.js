console.log(`
2520 is the smallest number that can be divided by each of the numbers from 1 to 10 without any remainder.

What is the smallest positive number that is evenly divisible by all of the numbers from 1 to 20?
`);


var _ = require('underscore');

var oneToTwenty = _.range(1, 20+1);
var rv;

var useUnderscoreSolution = true;

if (useUnderscoreSolution) {
    console.log('using underscore');
    rv = (function() {
        for (var i = 1; ; i++) {
            if (_.every(oneToTwenty, function (n) {
                return ( i%n===0);
            })) {
                return i;
            }
        }
        throw new Error('impossible');
    })();
} else {
    console.log('using plain loops');
    rv = (function() {
        for (var i = 1; ; i++) {
            var all = true;
            for (var j = 1; j <= 20; j++) {
                if (i % j != 0) {
                    all = false;
                    break;
                }
            }
            if (all)
                return i;
        }
        throw new Error('impossible');
    })();
}
console.log('answer: '+rv);
