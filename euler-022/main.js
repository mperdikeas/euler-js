'use strict';

console.log(`
Using names.txt (right click and 'Save Link/Target As...'), a 46K text file containing over five-thousand first names, begin by sorting it into alphabetical order. Then working out the alphabetical value for each name, multiply this value by its alphabetical position in the list to obtain a name score.

For example, when the list is sorted into alphabetical order, COLIN, which is worth 3 + 15 + 12 + 9 + 14 = 53, is the 938th name in the list. So, COLIN would obtain a score of 938 × 53 = 49714.

What is the total of all the name scores in the file?

`);


const fname = 'p022_names.txt';

const fs     = require('fs');
const assert = require('assert');
const _      = require('underscore');

fs.readFile(fname, 'utf8', (err, dataS) => {
    if (err)
        throw err;
    else {
        let answer = process(dataS);
        console.log(`\n\n\nThe answer is: ${answer}`);
    }
});


function value(_s) {
    return  _s.split('').map(valueOfChar).reduce( (v,e)=>v+e, 0);

    function valueOfChar(_s) {
        let s = _s.toLowerCase();
        if (s.length != 1)
            throw new Error(_s.length);
        const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'.split('');
        if (_.contains(ALPHABET, s))
            return ALPHABET.indexOf(s)+1;
        else
            throw new Error(_s);
    }

}


function process (dataS) {

    let names = dataS.replace(/"/g, '').split(',');
    assert.equal(5163, names.length);
    let namesSorted = _.sortBy(names);
    let scoreForEachName = [];
    namesSorted.forEach( (x,i) => {
        let pos = i+1;
        let score = value(x)*pos;
        const DEBUG = false;
        if (DEBUG)
            console.log(`Score for string "${x}" in position #${pos} is: ${score}`);
        scoreForEachName.push(value(x)*i);
    });
    return scoreForEachName.reduce( (v,e)=>v+e, 0);
}

assert.equal(6, value('aBc'));
