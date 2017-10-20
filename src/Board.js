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
      // find current row with get(rowIndex)
      var currRow = this.get(rowIndex);
      //initialize var for count
      var count = 0;
      //loop through the current row to see if there is a piece
      for (var i = 0; i < currRow.length; i++) {
        //if piece exists
        if (currRow[i] === 1) {
          //increment count
          count++;
          //if piece is more than one return right away
          if (count > 1) {
            return true;
          }
        }
      } 
      //no conflict     
      return false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      //find number of rows created with 'n'
      var numOfRows = this.get('n');
      //initialize variable to count row conflicts
      var rowConflicts = 0;
      //iterate through rows
      for (var j = 0; j < numOfRows; j++) {
        //check for row conflict        
        if (this.hasRowConflictAt(j)) {
          //increment if conflict is true
          rowConflicts++;
        }
      }
      //return true if at least one row has a conflict
      return rowConflicts > 0;
    },

    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      //declare count for conflicts
      var colConflicts = 0;
      //get all rows using helper function with this 
      // var rows = this.rows();
      //iterate through static column by incrementing rows
      for (var i = 0; i < this.get('n'); i++) {
        //check if piece is at space
        if (this.get(i)[colIndex] === 1) {
          //increment count
          colConflicts++; 
          //check if conflicts exceed 1
          if (colConflicts > 1) {
            return true;
          }
        }
      }
      //no conflicts
      return false; 
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      //find number of cols created with 'n'
      var numOfCols = this.get('n');
      //initialize variable to count col conflicts
      var colConflicts = 0;
      //iterate through cols
      for (var j = 0; j < numOfCols; j++) {
        //check for col conflict        
        if (this.hasColConflictAt(j)) {
          //increment if conflict is true
          colConflicts++;
        }
      }
      //return true if at least one col has a conflict
      return colConflicts > 0;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      //counter for conflicts
      var majDiagCon = 0;
      //use input to find starting point
      // var numOfMax = this.get('n');
      //get rows
      // var rows = this.rows();
      //store majorDiagonalCol index
      var start = majorDiagonalColumnIndexAtFirstRow;
      //for rows maj diagonals are positive, then row index is always 0
      if (start >= 0) { 
        for (var i = 0; i < this.get('n'); i++) {
          //if piece exists
          if (this.get(i)[start] === 1) {
            //increment counter
            majDiagCon++;
            //if counter greater than 1
            if (majDiagCon > 1) {
            
              return true;
            }
          }
          //increment 
          start++;
        }
      } else {
        if (start < 0) {
          start = start * - 1;
          var columnInc = 0;
          for (var j = start; j < this.get('n'); j++) {
            if (this.get(j)[columnInc] === 1) {
              majDiagCon++;
              //if counter greater than 1
              if (majDiagCon > 1) {
                return true;
              }
            }
            columnInc++;
          }
        }
      }
           
    
      return false; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      //find number of cols created with 'n'
      var numOfDiags = this.get('n');
      var start = numOfDiags * - 1;
      //initialize variable to count col conflicts
      var diagConflicts = 0;
      
      for (var i = start; i < numOfDiags; i++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          diagConflicts++;
        }
      }
      return diagConflicts > 0; 
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      //declare count for conflicts
      var minConflicts = 0;
      //get all rows using helper function with this 
      // var rows = this.rows();
      // var rowDoub = rows * 2;
      var y = minorDiagonalColumnIndexAtFirstRow;
      //iterate through minor diagonals by incrementing rows 
      //and decrementing columns
      for (var x = 0; x < this.get('n'); x++) {
        //check if piece is at space
        if (this.get(x)[y] === 1) {
          //increment count
          minConflicts++; 
          //check if conflicts exceed 1
          if (minConflicts > 1) {
            return true;
          }
        }
        y--;
      }
      //no conflicts
      return false; 
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      //find number of cols created with 'n'
      var numOfDiags = this.get('n');
      var times = (numOfDiags - 1) * 2;
      var minConflicts = 0;

      for (var x = 0; x <= times; x++) {
        if (this.hasMinorDiagonalConflictAt(x)) {
          minConflicts++;
        }
      }

      return minConflicts > 0;
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
