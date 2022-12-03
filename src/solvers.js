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
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(rooksArray));
  return rooksArray;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var solution = new Board({'n': n});

   /*
  var matrix = [

        0   1   2.  3

        [1, 0, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1], //2
        [0, 0, 0, 0]
      ];
  */

  var recursiveFunc = function (currentRow) {
    if (currentRow === n) {
      solutionCount++;
      return;
    }

    // base case -- what ends the recursive function
    for (var i = 0; i < n; i++) { // 2
      solution.togglePiece(currentRow, i);
      if (!solution.hasAnyRooksConflicts()) { // if it doesnt have any conflicts
        recursiveFunc(currentRow + 1); // then move on to next row
      }

      solution.togglePiece(currentRow, i);

    }
  };

  recursiveFunc(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};


// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = new Board({'n': n});
  var queensArray = solution.rows();
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

  var recursiveFunc = function (currentRow) {
    // base case -- what ends the recursive function
    if (currentRow === n) {
      conflictFlag = true;
      // when this returns, it means it has reached the end of the chessboard.
      return;
    }

    // for loop for the column
    for (var i = 0; i < n; i++) {
      // always adding chess pieces '1' on the board
      solution.togglePiece(currentRow, i);
      // checks if it has conflicts.
      if (!solution.hasAnyQueensConflicts()) { // if it doesnt have any conflicts
        var nextStep = currentRow + 1;
        recursiveFunc(nextStep); // then move on to next row
      }
      // will only return true if you have reached the end of the chessboard.
      if (conflictFlag) {
        // will leave the function if true
        return;
      } else {
        // if there is a conflict(previous if statement) and conflict flag is NOT true, delete the chess piece that was just added at row 89.
        solution.togglePiece(currentRow, i);
      }
    }
    return;
  };
  //Calling the recursive function with 0 because our input for our recursiveFunc is our 'rows' and our 'column' is the i in the for loop within the recursiveFunc
  recursiveFunc(0);


  console.log('Single solution for ' + n + ' queens:', JSON.stringify(queensArray));
  return queensArray;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var solution = new Board({'n': n});
 /*
  var matrix = [

        0   1   2.  3

        [1, 0, 0, 0],
        [0, 0, 1, 1],
        [0, 0, 0, 0], //2
        [0, 0, 0, 0]
      ];
  */

  if (n === 2 || n === 3) {
    return solutionCount;
  }

  var recursiveFunc = function (currentRow) {

    // base case -- what ends the recursive function
    // asssuming that each solution is correct, add one to the scoreboard
    if (currentRow === n) {
      solutionCount++;
      return;
    }


    for (var i = 0; i < n; i++) {
      //creating chess piece at every index on currentRow
      solution.togglePiece(currentRow, i);

      //IF THERE IS A CONFLICT
      if (solution.hasAnyQueensConflicts()) {
        //DELETE THE 'JUST-ADDED' CHESS PIECE ON LINE 157
        solution.togglePiece(currentRow, i);
      //IF THERE IS NO CONFLICT
      } else {
        //MOVE TO THE NEXT ROW
        recursiveFunc(currentRow + 1);
        //WHEN WE GO BACK TO EXECUTION CONTEXT, WE DELETE THE CHESS PIECE BECAUSE
        // 1. we either went back because we found our solution and want to find more (basecase activated)

        //2. we have no chess piece on a specific row, loop ended and it exits us out of our execution context bringing the 'interpreter' back to line 167 to continue the rest of the recursion.
        solution.togglePiece(currentRow, i);

      }



    }

  };

  recursiveFunc(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
