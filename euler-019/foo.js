'use strict';
console.log(`
You are given the following information, but you may prefer to do some research for yourself.

1 Jan 1900 was a Monday.
Thirty days has September,
April, June and November.
All the rest have thirty-one,
Saving February alone,
Which has twenty-eight, rain or shine.
And on leap years, twenty-nine.
A leap year occurs on any year evenly divisible by 4, but not on a century unless it is divisible by 400.
How many Sundays fell on the first of the month during the twentieth century (1 Jan 1901 to 31 Dec 2000)?

`);


// solution using moment
(function() {
    let moment = require('moment');

    var count = (function() {
        var count = 0;
        for (let d = moment('1901-01-01');d.isSameOrBefore(moment('2000-12-31')) ;d.add('day', 1) ) {

            if ((d.isoWeekday()===7) && (d.date()===1)) {
                //                console.log(d.toString());            
                count++;
            }
        }
        return count;
    })();

    console.log('Solution using moment: '+count);
})();


// my own solution
(function() {
    let _ = require('underscore');
    function isLeapYear(y) {
        if (y % 4 === 0) {
            if (y % 100 != 0)
                return true;
            else {
                if ((y / 100) % 4 === 0)
                    return true;
                else
                    return false;
            }
        } else
            return false;
    }
    let daysInMonthNoLeap           = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let daysInMonthNoLeapCum = cum(daysInMonthNoLeap);
    function cum(arr) {
        let rv = [0];
        let cum = 0;
        for (var i = 0; i < arr.length ; i++) {
            cum+=arr[i];
            rv.push(cum);
        }
        return rv;
    }

    let daysInMonthLeap   = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let daysInMonthLeapCum = cum(daysInMonthLeap);
    //console.log('cumuls in non-leap years: '+daysInMonthNoLeapCum);
    //console.log('cumuls in leap years: '+daysInMonthLeapCum);

    let daysInNoLeapYear = daysInMonthNoLeap.reduce((v, e) => v+e, 0);
    let daysInLeapYear   = daysInMonthLeap  .reduce((v, e) => v+e, 0);
    function cumulativeDays(y) {
        if (isLeapYear(y))
            return daysInMonthLeapCum;
        else
            return daysInMonthNoLeapCum;
    };
    let d = 1;
    let dInStartOfCurrentYear = 0;
    let year = 1900;
    let count = 0;
    while (true) {
        let dInYear = d - dInStartOfCurrentYear;
        if ((dInYear > 360) && (year === 2000))
            break;
        let cumDays = cumulativeDays(year);
        if ((d%7===0) && _.some(cumDays, x=>dInYear===x+1)) {
            //        console.log(`day ${dInYear} of year ${year} (${d})`);
            if (year>=1901)
                count++;
        }
        if (dInYear===cumDays[cumDays.length-1]) {
            dInStartOfCurrentYear = d;
            year++;
            //        console.log(year);
        }
        d++;
    }
    console.log(`Solution using no external library: ${count}`);
})();
