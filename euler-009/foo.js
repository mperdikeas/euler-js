'use strict';
console.log(`
A Pythagorean triplet is a set of three natural numbers, a < b < c, for which,

a^2 + b^2 = c^2
For example, 3^2 + 4^2 = 9 + 16 = 25 = 5^2.

There exists exactly one Pythagorean triplet for which a + b + c = 1000.
Find the product abc.
`);

let _ = require('underscore');
let triplets = [];

let square = (x)=>x*x;

class Triplet {
    constructor(a,b,c) {
        if (square(a)+square(b)!=square(c))
            throw new Error();
        if (a+b+c!=N)
            throw new Error();        
        this.a = a;
        this.b = b;
        this.c = c;
    }
}

const N = 1000;
for (let c = 0; c <= N ; c++) {
    for (let a = 0; a <= Math.min(N-c, c-1) ; a++) {
        let b = N - c - a;
        if ((a-b)*(a-c)*(b-c)===0)
            continue;
        if (square(a)+square(b)===square(c)) {
            let triplet = new Triplet(a,b,c);
            if (!_.some(triplets, function (x) {
                if ((x.a===triplet.b) && (x.b===triplet.a))
                    return true;
                else
                    return false;
            })) {
                triplets.push(triplet);
            }
        }
    }
}


if ((triplets.length===0) || (triplets.length > 1))
    throw new Error('failed');
else
    console.log(triplets[0].a*triplets[0].b*triplets[0].c);

