'use strict';

console.log(`
If the numbers 1 to 5 are written out in words: one, two, three, four, five, then there are 3 + 3 + 5 + 4 + 4 = 19 letters used in total.

If all the numbers from 1 to 1000 (one thousand) inclusive were written out in words, how many letters would be used?

NOTE: Do not count spaces or hyphens. For example, 342 (three hundred and forty-two) contains 23 letters and 115 (one hundred and fifteen) contains 20 letters.

The use of "and" when writing out numbers is in compliance with British usage.

`);

var _ = require('underscore');

function numberToEnglish(n) {
    const LIMIT = 1000;
    if (n>LIMIT)
        throw new Error(`Doesn\'t work for numbers more than ${LIMIT} and was given: ${n}`);

    if (n===LIMIT)
        return "one thousand";
    
    const UNITS    = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    const TEENS    = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    const UNITS_AND_TEENS = UNITS.concat(TEENS);
    const TENS     = [null, 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    const HUNDRED  = 'hundred';
    const THOUSAND = 'thousand';

    let digitsReversed = n.toFixed().split('').reverse().map( (x, _) => parseInt(x) );
    let rv = [];

    let firstTwoTensDigits = twoDigitsGroup(digitsReversed[0], digitsReversed[1], digitsReversed.length>2);
    if (firstTwoTensDigits!=null)
        rv.push(firstTwoTensDigits);
    if (digitsReversed.length>=3) {
        let firstTwoHundredDigits = twoDigitsGroup(digitsReversed[2], digitsReversed[3], digitsReversed.length>4);
        if (firstTwoHundredDigits!=null) {
            if (rv.length > 0)
                rv.push("and");
            rv.push('hundred');
            rv.push(firstTwoHundredDigits);
        }
    }


    return rv.reverse().join(" ");
    
    function twoDigitsGroup(d0, d1, moreDigits) {
        if (typeof d1 === typeof undefined)
            d1 = 0;
        let rv = [];
        if ((d0==0) && (d1==0)) {
            if (!moreDigits)
                return 'zero';
            else
                return null;
        }
        if ((d0!=0) && (d1==0)) {
            return UNITS[d0];
        }
        if (d1==1) {
            return UNITS_AND_TEENS[10+d0];
        }
        if ((d0!=0) && (d1>1)) {
            return TENS[d1]+'-'+UNITS[d0];
        }
        if ((d0===0) && (d1>1)) {
            return TENS[d1];
        }
            
        throw new Error(`undhandled case: [${d0}], [${d1}]`);
    }


}

_.range(1,1001).forEach(function (x) {
    if (false)
        console.log(`${x} --> ${numberToEnglish(x)}`);
});

let s = _.range(1,1001).map((x,_) => numberToEnglish(x));

console.log(s.join(' ').replace(/-/g, ' ').replace(/ /g, '').split('').length);

