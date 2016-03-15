'use strict';

let colors = require('colors');
let _ = require('underscore');
console.log(`
By starting at the top of the triangle below and moving to adjacent numbers on the row below, the maximum total from top to bottom is 23.

    ${'3'.red}
   ${'7'.red} 4
  2 ${'4'.red} 6
 8 5 ${'9'.red} 3

That is, 3 + 7 + 4 + 9 = 23.

Find the maximum total from top to bottom of the triangle below:

              75
             95 64
            17 47 82
           18 35 87 10
          20 04 82 47 65
         19 01 23 75 03 34
        88 02 77 73 07 63 67
       99 65 04 28 06 16 70 92
      41 41 26 56 83 40 80 70 33
     41 48 72 33 47 32 37 16 94 29
    53 71 44 65 25 43 91 52 97 51 14
   70 11 33 28 77 73 17 78 39 68 17 57
  91 71 52 38 17 14 91 43 58 50 27 29 48
 63 66 04 68 89 53 67 30 73 16 69 87 40 31
04 62 98 27 23 09 70 98 73 93 38 53 60 04 23

NOTE: As there are only 16384 routes, it is possible to solve this problem by trying every route. However, Problem 67, is the same challenge with a triangle containing one-hundred rows; it cannot be solved by brute force, and requires a clever method! ;o)

`);

let fs = require('fs');
fs.readFile('INPUT', 'utf8', (err, dataS) => {
    if (err)
        throw new Error(err);
    let data = format(dataS);
    process(data);
});

function format(dataS) {
    var dataPre = dataS.split('\n');
    return dataPre.map(x=>x.split(' ').map( (x,_)=>{return parseInt(x);}));
}

function process(data) {
    let values = [];
    function traverse(i, j, carry) {
        if ((j<0) && (j>i))
            throw new Error(`${i}-${j}`);
        if (i===data.length-1) {
            values.push(carry+data[i][j]);
            return;
        }
        traverse(i+1, j  , carry+data[i][j]);
        traverse(i+1, j+1, carry+data[i][j]);
    }
    traverse(0, 0, 0);
    console.log(_.max(values, x=>x));
}
