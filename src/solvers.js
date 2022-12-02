/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var solution = new Board({'n': n});
  var rooksArray = solution.rows();

  for (var i = 0; i < rooksArray.length; i++) {
    for (var j = 0; j < rooksArray[i].length; j++) {
      solution.togglePiece(i, j);

      if (solution.hasRowConflictAt(i) || solution.hasColConflictAt(j)) {
        solution.togglePiece(i, j);
      }

    }

  }

  /*
  for every index, toggle.
  check to see if it has any row or column conflicts.
  if it does, change the toggled index back to 0, and move on
  */

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(rooksArray));
  return rooksArray;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = new Board({'n': n});
  var rooksArray = solution.rows();
  var conflictFlag = false;
  /*
  var matrix = [

        0   1   2.  3

        [0, 1, 0, 0],
        [0, 0, 0, 1],
        [1, 0, 0, 0], //2
        [0, 0, 1, 0]
      ];
  */

  //n = 4
  //currentRow = 4

  var recursiveFunc = function (currentRow) {

    if (currentRow === n) {
      conflictFlag = true;
      return;
    }

    // base case -- what ends the recursive function
    for (var i = 0; i < n; i++) { // 2
      solution.togglePiece(currentRow, i); // adds 1 into [[1]]

      // if it doesnt have any conflicts
      if (!solution.hasAnyQueensConflicts()) {
        // then move on to next row
        recursiveFunc(currentRow + 1);
        //entering 2nd row
        //entering 3rd row
        //entering 4th row
      }

      if (conflictFlag) {
        return;
      } else {
        solution.togglePiece(currentRow, i);
      }


    }
    return; // done with loop on 3rd row so returns and goes back to the 2nd row
  };

  recursiveFunc(0);


  console.log('Single solution for ' + n + ' queens:', JSON.stringify(rooksArray));
  return rooksArray;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
