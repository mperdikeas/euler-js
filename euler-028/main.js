'use strict';


function solution1(DIM) {

    function numbersOnDiagonals(n) {

        let idx = []; // will store indexes of elements on diagonals

        let baseLineForThisStep= 1;
        let stepSize = 2;

        idx.push(1);

        for (let i = 2; ; i++) {
            let diff = i - baseLineForThisStep;
            if (diff % stepSize === 0) {
                idx.push(i);
            }
            if (i===baseLineForThisStep+4*stepSize) {
                stepSize += 2;
                baseLineForThisStep = i;
                if (false)
                    console.log(`baseline is now: ${baseLineForThisStep} - have completed a ${Math.sqrt(baseLineForThisStep)}x${Math.sqrt(baseLineForThisStep)} square - sum of diagonals is ${sum(idx)}`);
                let dim = Math.sqrt(baseLineForThisStep);
                if (dim===n)
                    return idx;
            }
        }
        throw new Error('impossible');

    }

    return sum(numbersOnDiagonals(DIM));

    function sum(arr) {
        return arr.reduce((v,e)=>v+e, 0);
    }

}

function solution2(DIM) {
    let _ = require('underscore');
    let __ = require('underscore.string');

    class Grid {
        constructor(dim) {
            if (dim % 2 != 1)
                throw new Error(`only works for odd size of dimension, was given: ${dim}`);
            this.arr = [];
            for (let i = 0; i < dim ; i++) {
                let row = [];
                for (let j = 0; j < dim; j++) {
                    row.push('.');
                }
                this.arr.push(row);
            }
            let maxNumber = dim*dim;
            let numOfDigitsOfMaxNumber = maxNumber.toFixed().split('').length;
            this.cellSz = numOfDigitsOfMaxNumber;
        }
        
        toString() {
            return this.arr.map(row=>{
                var s = row.map(x=>{
                    return __.lpad(x.toString(), this.cellSz, ' ');
                });
                return `[${s.join('][')}]`;
            }).join('\n');
        }
        s(i,j,v) {
            this.arr[i][j] = v;
        }
        v(i, j) { 
            return this.arr[i][j];
        }
    }

    class Heading {
        constructor(northSouth, eastWest) {
            this.northSouth = northSouth;
            this.eastWest = eastWest;
            assert();
        }
        assert() {
            if (!isOneOf(this.northSouth, -1, 0, 1))
                throw new Error();
            if (!isOneOf(this.eastWest, -1, 0, 1))
                throw new Error();
            if (this.northSouth*this.eastWest!=0)
                throw new Error();            
        }
        toString() {
            return `(${this.northSouth} * ${this.eastWest})`;
        }
        rotateClockWise() {
            if (this.northSouth===0)
                return new Heading(this.eastWest, 0);
            if (this.eastWest===0)
                return new Heading(0, -this.northSouth);
            else
                throw new Error(`Unhandled case: ${this.northSouth}-${this.eastWest}`);
        }
        
    }
    Heading.NORTH = new Heading(-1, 0);
    Heading.EAST  = new Heading( 0, 1);
    Heading.SOUTH = new Heading( 1, 0);
    Heading.WEST  = new Heading( 0,-1);

    class Mole {
        constructor(grid, i,j,heading, ageWhenIllChangeDirection) {
            this.age = 1;
            this.grid = grid;
            this.i = i;
            this.j = j;
            this.heading = heading;
            this.ageWhenIllChangeDirection = ageWhenIllChangeDirection;
        }
        live() {
            this.poop();
            if (_.contains(this.ageWhenIllChangeDirection, this.age)) {
                let prevDirection = this.heading.toString();
                this.heading = this.heading.rotateClockWise();
                let newDirection = this.heading.toString();
            }
            this.age++;
            this.i += this.heading.northSouth;
            this.j += this.heading.eastWest;
        }
        poop() {
            this.grid.s(this.i,this.j,this.age);
        }
    }

    function isOneOf(v) {
        return _.contains(arguments.slice(1, arguments.length), v);
    }

    function agesWhenTheMoleWillChangeDirection(dim) {
        let rv = [];
        let currentStep = 2;
        let startOfCurrentSpiralArc = 2;
        let numberOfTurns = 0;
        rv.push(1);
        rv.push(2);
        for (let i = 3 ; i <= dim*dim; i++) {
            let diff = i - startOfCurrentSpiralArc;
            let turn = (function() {
                // insight: first segment is one less than step size, succeessive two are exactly step size, final segment is one more
                if ((numberOfTurns===0) && (diff === currentStep-1))
                    return true;
                if ((numberOfTurns===1) && (diff === 2*currentStep-1))
                    return true;
                if ((numberOfTurns===2) && (diff === 3*currentStep-1))
                    return true;
                if ((numberOfTurns===3) && (diff === 4*currentStep))
                    return true;
                return false;
            })();
            if (turn) {
                rv.push(i);
                numberOfTurns++;
                if (numberOfTurns===4) {
                    currentStep+=2;
                    startOfCurrentSpiralArc = i;
                    numberOfTurns = 0;
                }
            }
        }
        return rv;
    }

    let grid = new Grid(DIM);

    let mole = new Mole(grid, (DIM-1)/2, (DIM-1)/2, Heading.NORTH, agesWhenTheMoleWillChangeDirection(DIM));

    for (let i = 0 ; i < DIM*DIM; i++) {
        mole.live();
        const DO_NICE_GRAPHICS = false;
        if (DO_NICE_GRAPHICS) {
            console.log('------------------------');            
            console.log(grid.toString());
        }
    }


    // at this point the grid is filled with the mole's poop.
    // all we have to do is sum the diagonals
    let sum = (function() {
        let sum = 0;
        for (let i = 0 ; i < DIM ; i++) {
            sum += grid.v(i, i);
            let j = DIM-1-i;
            if (j != i )
                sum += grid.v(i, j);
        }
        return sum;
    })();

    return sum;
}


(function test() {
    let knownAnswers = [ {dim: 3, answer: 25}
                         , {dim: 5, answer: 101}];

    let solutions = [solution1, solution2];

    knownAnswers.forEach(answer=>{
        solutions.forEach(solution=>{
            assert(answer.answer, solution(answer.dim));
        });
    });

})();

const DIM = 1001;
console.log(`value according to solution #1: ${solution1(DIM)}`);
console.log(`value according to solution #2: ${solution2(DIM)}`);


// utility functions common to both solutions, not related to the problem
function assert(nExpected, nActual) {
    if (nExpected!=nActual)
        throw new Error(`expected value to be: ${nExpected}, yet it was: ${nActual}`);
}
