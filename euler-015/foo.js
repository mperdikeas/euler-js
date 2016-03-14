'use strict';
console.log(`
Starting in the top left corner of a 2×2 grid, and only being able to move to the right and down, there are exactly 6 routes to the bottom right corner.


How many such routes are there through a 20×20 grid?

`);

console.log('It seems that this problem takes a very long time when brute-forced');
let count = 0;
let DIM = 20;
function countWays(nRight, nDown) {
    if ((nRight>DIM)||(nDown>DIM))
        return;
    if (nRight+nDown === 2*DIM) {    
        if ((nRight === DIM) || (nDown === DIM))
            count++;
        else
            ;
    } else {
        countWays(nRight+1, nDown  , count);
        countWays(nRight  , nDown+1, count);        
    }
}
countWays(0, 0);
console.log(count);
