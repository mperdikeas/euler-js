'use strict';

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





