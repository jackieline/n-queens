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
  //make a board of n rows and columns
  var solutionBoard = new Board({'n': n});
  // for (var x = 0; x < rows.length; x++) {
  //   for (var y = 0; y < rows[x].length; y++) {
  //     if (!solutionBoard.hasRowConflictAt(x)) {
  //       solutionBoard.togglePiece(x, y);
  //     }
  //   }
  // }  
  // console.log(JSON.stringify(solutionBoard.rows()));
  //declare your solution
  var solution;
  //recursive function with parameter row set to 0
  var findSolution = function(row = 0) {
    //base case - if row equals to n
    if (row === n) {
      //save the board rows to solution
      solution = solutionBoard.rows();
      //break out of loop cause you have your solution
      return;  
    }
    //loop through the columns
    for (var y = 0; y < n; y++) {
      //set a piece on the board
      solutionBoard.togglePiece(row, y);
      //condition for if there is a conflict 
      if (solutionBoard.hasAnyRooksConflicts()) {
        //take off the piece
        solutionBoard.togglePiece(row, y);
      //else
      } else {
        //recurse into the next row
        findSolution(row + 1);
      }
    }
  };
  //call the recursion closure
  findSolution();

  // var solution = solutionBoard.rows();

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  //return the first solution  
  return solution;
};


// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionBoard = new Board({'n': n});
  var solutionCount = 0; //fixme
  var findSolution = function(row = 0) {
    //base case
    if (row === n) {
      solutionCount++;
      return;  
    }
    for (var y = 0; y < n; y++) {
      solutionBoard.togglePiece(row, y);
      if (!solutionBoard.hasAnyRooksConflicts()) {
        findSolution(row + 1);
      }
      solutionBoard.togglePiece(row, y);
    }
  };

  findSolution();

  var solution = solutionBoard.rows();

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solutionBoard = new Board({'n': n});
  var solution; //fixme

  var findSolution = function(row = 0) {
    // if (n === 4) {
    //   var fourBoard = new Board({'4': 4});
    //   fourBoard.togglePiece(0, 1);
    //   fourBoard.togglePiece(1, 3);
    //   fourBoard.togglePiece(2, 0);
    //   fourBoard.togglePiece(3, 2);
    //   return fourBoard;
    // }
    // base case
    if (row === n) {
      solution = solutionBoard.rows();
      return;
    }
    for (var y = 0; y < n; y++) {
      solutionBoard.togglePiece(row, y);
      if (solutionBoard.hasAnyQueensConflicts()) {
        solutionBoard.togglePiece(row, y);
      }
      findSolution(row + 1);
    }
  };

  findSolution();
  
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; //fixme
  var solutionBoard = new Board({'n': n});
  
  var findSolution = function(row = 0) {
    // base case
    if (row === n) {
      solutionCount++;
      return;
    }
    for (var y = 0; y < n; y++) {
      solutionBoard.togglePiece(row, y);
      if (!solutionBoard.hasAnyQueensConflicts()) {
        findSolution(row + 1);
      }
      solutionBoard.togglePiece(row, y);
    }
  };

  findSolution();
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
