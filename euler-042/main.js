'use strict';

console.log(`
The nth term of the sequence of triangle numbers is given by, tn = ½n(n+1); so the first ten triangle numbers are:

1, 3, 6, 10, 15, 21, 28, 36, 45, 55, ...

By converting each letter in a word to a number corresponding to its alphabetical position and adding these values we form a word value. For example, the word value for SKY is 19 + 11 + 25 = 55 = t10. If the word value is a triangle number then we shall call the word a triangle word.

Using words.txt (right click and 'Save Link/Target As...'), a 16K text file containing nearly two-thousand common English words, how many are triangle words?
`);

const assert = require('assert');
const      _ = require('lodash');
const     fs = require('fs');

const isWordTriangular = (function() {

    const wordValue = (function() {
        function wordValue(word) {
            const alphabet = 'abcdefghijklmnopqrstuvwxyz';
            return word.toLowerCase().split('').reduce ( (v,e) => {
                return v+(function(e) {
                    let v = alphabet.indexOf(e);
                    if (v===-1)
                        throw new Error(`Letter ${e} is not contained in alphabet ${alphabet}`);
                    return v+1;
                })(e);
            }, 0);
        }
        assert.equal(55, wordValue('SKY'));
        return wordValue;
    })();

    const isTriangular = (function() {
        function isTriangular(n) {
            // brute force, it can obviously be done by solving the triangular formula tn=1/2n(n+1) for n
            // and demanding that n be integer but we are not doing math here.
            for (let i = 1; ; i++) {
                let ti = i*(i+1)/2.;
                if (ti===n)
                    return true;
                else if (ti > n)
                    return false;
            }
            throw new Error('impossible');
        }
        const someTriangulars = [1, 3, 6, 10, 15, 21, 28, 36, 45, 55];
        assert.equal(true, _.every(someTriangulars, isTriangular));
        return isTriangular;
    })();

    function isWordTriangular(word) {
        return isTriangular(wordValue(word));
    }
    assert.equal(true, isWordTriangular('skY'));
    return isWordTriangular;
})();

const fname = 'p042_words.txt';
fs.readFile(fname, 'utf8', (err, data) => {
    if (err)
        throw err;
    else 
        process(data);
});

function process(wordsS) {
    const wordsNoQuotes = wordsS.replace(/["]/g, '');
    const words = wordsNoQuotes.split(',');
    const howManyAreTriangular = words.filter(isWordTriangular).length;
    console.log(`The answer is: ${howManyAreTriangular}`);
}
