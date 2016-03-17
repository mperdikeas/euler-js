'use strict';

console.log(`
A permutation is an ordered arrangement of objects. For example, 3124 is one possible permutation of the digits 1, 2, 3 and 4. If all of the permutations are listed numerically or alphabetically, we call it lexicographic order. The lexicographic permutations of 0, 1 and 2 are:

012   021   102   120   201   210

What is the millionth lexicographic permutation of the digits 0, 1, 2, 3, 4, 5, 6, 7, 8 and 9?
`);

let _ = require('underscore');


class Result {
    constructor(seq) {
        this.seq = seq;
    }
}

function returnAllPermutationsOrOnlyTheOneWeAreInterestedAt(symbols, n) {

    let perms = [];
    let permsDiscovered = 0;
    
    function discoverPerms(available, carry, n) {
        if (available.length===0) {
            perms.push(carry);
            permsDiscovered++;
            if (n===permsDiscovered)
                throw new Result(carry);
        }
        else {
            for (var i = 0 ; i < available.length ; i++) {
                let newAvailable = available.slice(0, i).concat(available.slice(i+1, available.length));
                discoverPerms(newAvailable, carry.concat([available[i]]), n);
            }
        }
    }
    try {
        discoverPerms(symbols, [], n);
        return perms;
    } catch (result) {
        return result.seq;
    }
}



(function () {
    let symbols = '012'.split('');
    let all012 = returnAllPermutationsOrOnlyTheOneWeAreInterestedAt(symbols);
    console.log(`all (${all012.length}) permutatios of the symbols: [${symbols}] are:`);
    console.log(all012);
})();

(function () {
    let symbols = '0123456789'.split('');
    const N = 1000000;
    let theOneWeAreInterested = returnAllPermutationsOrOnlyTheOneWeAreInterestedAt(symbols, N);
    console.log(`the permutation ${N} (1-indexed) of the symbols: [${symbols}] is:`);
    console.log(theOneWeAreInterested.join(''));
})();





