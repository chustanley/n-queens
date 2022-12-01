// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var currentArr = this.rows;
      var counter = 0;
      for (var i = 0; i < currentArr[rowIndex].length; i++) {
        if (currentArr[rowIndex][i] === 1) {
          counter++;
        }
      }

      if (counter === 2) {
        return true;
      } else {
        return false;
      }
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var currentArr = this.rows();
      var counter = 0;
      var conflictFlag = false;


      for (var i = 0; i < currentArr.length; i++) { // which row?
        for (var j = 0; j < currentArr[i].length; j++) { // your in the specific row now
          if (currentArr[i][j] === 1) {
            counter++;
          }
        }
        if (counter === 2) {
          conflictFlag = true;
          break;
        } else {
          counter = 0;
        }
      }
      return conflictFlag;
    },


/*

var matches = [3,1,1]

var resultObject = {
  3: 1
  1: 2
}


 var matrix = [

      0   1   2.  3

      [0, 0, 0, 1],
      [1, 1, 0, 1],
      [0, 1, 0, 0],
      [0, 0, 0, 0]
    ];
*/

    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      return false; // fixme

    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var currentArr = this.rows();
      var counter = [];
      var resultObject = {};
      var conflictFlag = false;

      for (var i = 0; i < currentArr.length; i++) { // which row?
        for (var j = 0; j < currentArr[i].length; j++) {
          if (currentArr[i][j] === 1) {
            counter.push(j);
          }
        }
      }

      for (var p = 0; p < counter.length; p++) {
        if (resultObject[counter[p]] === undefined) {
          resultObject[counter[p]] = 1;
        } else {
          resultObject[counter[p]]++;
        }
      }

      for (var key in resultObject) {
        if (resultObject[key] > 1) {
          conflictFlag = true;
          break;
        }
      }

      return conflictFlag;
    },

    //     var matrix = [

    //       0   1   2.  3

    //       [1, 0, 0, 0],
    //       [0, 1, 0, 0],
    //       [0, 0, 0, 0],
    //       [0, 0, 0, 0]
    //     ];
    //

    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var currentArr = this.rows();
      var counter = [];
      var resultObject = {};
      var conflictFlag = false;
      var firstRowIndex = majorDiagonalColumnIndexAtFirstRow; // 0

      for (var i = 1; i < currentArr.length; i++) {

        if (currentArr[i][firstRowIndex + 1] === 1) {
          conflictFlag = true;
          break;
        }


      }


    },
    // testing
    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var currentArr = this.rows();
      var counter = []; // 3, 5, 2
      var resultObject = {};
      var conflictFlag = false;


      for (var i = 0; i < currentArr.length; i++) {
        // if we have previously found 1's in the matrix.
        if (counter.length !== 0) {
          for (var p = 0; p < counter.length; p++) {
            counter[p]++;
          }
        }
        // this goes into each value in the row (column)
        for (var j = 0; j < currentArr[i].length; j++) {
          // if we found a 1 in the current row, and we have previous found a 1 in the incremented list.
          if (currentArr[i][j] === 1 && counter.indexOf(j) !== -1) {
            conflictFlag = true;
            break;
          }

          if (currentArr[i][j] === 1) {
            counter.push(j);
          }
        }

      }
      return conflictFlag;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var currentArr = this.rows();
      var counter = []; // 3, 5, 2
      var resultObject = {};
      var conflictFlag = false;


      for (var i = 0; i < currentArr.length; i++) {
        // if we have previously found 1's in the matrix.
        if (counter.length !== 0) {
          for (var p = 0; p < counter.length; p++) {
            counter[p]--;
          }
        }
        // this goes into each value in the row (column)
        for (var j = 0; j < currentArr[i].length; j++) {
          // if we found a 1 in the current row, and we have previous found a 1 in the incremented list.
          if (currentArr[i][j] === 1 && counter.indexOf(j) !== -1) {
            conflictFlag = true;
            break;
          }

          if (currentArr[i][j] === 1) {
            counter.push(j);
          }
        }

      }
      return conflictFlag;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
