/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  for (let y = 0; y < HEIGHT; y++) { //creating the rows
    board.push(Array.from({ length: WIDTH })); //create an array from the length of width/7, creating columns
  }
}
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array


/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
const board = document.getElementById('board');
  // make column tops (clickable area for adding a piece to that column)
  let top = document.createElement("tr");//create a row table element and assign it to top
  top.setAttribute("id", "column-top");//give top element the attribute name of id and value of column-top
  top.addEventListener("click", handleClick); //when top is clicked call the handleClick function

  for (let x = 0; x < WIDTH; x++) { //while x is smaller than 7, iterate x
    let headCell = document.createElement("td"); //create a table data cell and call it headCell
    headCell.setAttribute("id", x); //give it an id of x
    top.append(headCell); //append headCell to top
  }
  board.append(top); //append top to the HTML board

  // make main part of board
  for (let y = 0; y < HEIGHT; y++) {//while y is smaller that 6
    const row = document.createElement("tr"); //create a row and call it row
    for (let x = 0; x < WIDTH; x++) { //while x is smaller that 7
      const cell = document.createElement("td"); //create a data cell and call it cell
      cell.setAttribute("id", `${y}-${x}`); //give it the attribute of y - x
      row.append(cell); //append cell to row
    }
    board.append(row); //append row to html board
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
    for (let y = HEIGHT - 1; y >= 0; y--) {
      if (!board[y][x]) {
        return y;
      }
    }
    return null;
  }

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  let piece = document.createElement("div"); //
  piece.classList.add("piece");
  piece.classList.add(`p${currPlayer}`);
  piece.style.top = -50 * (y*2); //set top position to -50 * (y + 2)

  const place = document.getElementById(`${y}-${x}`) //insert into correct table cell
  place.append(piece);
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id; //?what does this mean?
  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  board[y][x]=currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  if (board.every(row => row.every(cell => cell)))
  return endGame('Tie!');

  // switch players
  currPlayer = currPlayer === 1 ? 2 : 1;
}


/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every( //will iterate, run callback on every value in array
    //will return false if any of the following conditions are not met:
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) { // iterate, checking each vertically on y axis
    for (let x = 0; x < WIDTH; x++) {//nested loop, check horizontally 
    //  get "check list" of 4 cells (starting here) for each of the different
      // ways to win
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
//find winner by going through each of the options. 
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) { //if any of these conditions are met
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
