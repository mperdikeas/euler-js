console.log(`
A palindromic number reads the same both ways. The largest palindrome made from the product of two 2-digit numbers is 9009 = 91 × 99.

Find the largest palindrome made from the product of two 3-digit numbers.
`);

var _ = require('underscore');

var allProductsOf3Digits = [];
for (var i = 100; i < 999; i++)
    for (var j = 100; j < 999; j++)
        allProductsOf3Digits.push(i*j);

var allProductsOf3DigitsSorted = _.sortBy(allProductsOf3Digits, function (n) {
    return -n;
});


var reverse = function(s) {
    return s.split("").reverse().join("");
};

var isPalindrome = function(n) {
    var s1 = n.toString();
    return (reverse(s1)===s1);
};


var rv = (function() {
    for (var i = 0; i < allProductsOf3DigitsSorted.length; i++)
        if (isPalindrome(allProductsOf3DigitsSorted[i]))
            return allProductsOf3DigitsSorted[i]
    return null;
})();

console.log(rv);
