/** The ID of the board div element. */
const BOARD_ELEMENT_ID = "board";

/**
 * The game board, represented as 2D array, row first.
 * @type boolean[][]
 */
let board;
const size = { rows: 0, columns: 0 };

// eslint-disable-next-line no-unused-vars
function start() {
  board = initBoard(40, 40);
  render(board);

  setInterval(() => {
    board = updateBoard();
    render(board);
  }, 500);
}

/**
 * Initializes the game board.
 * @param {number} rows The number of rows.
 * @param {number} columns The number of columns.
 * @returns {boolean[][]} The 2D array representing the game board.
 */
function initBoard(rows, columns) {
  size.rows = rows;
  size.columns = columns;
  const board = [];

  for (let i = 0; i < rows; i++) {
    let row = [];

    for (let j = 0; j < columns; j++) {
      // Initialize with random values
      const value = Math.random() > 0.5;
      row.push(value);
    }

    board.push(row);
  }

  return board;
}

/**
 * Gets the value of a cell.
 * @param {number} row The row of the cell.
 * @param {number} column The column of the cell.
 * @returns {boolean} The value of the cell (true is alive, false is dead).
 */
function getCell(row, column) {
  if (row < 0 || column < 0 || row >= size.rows || column >= size.columns) {
    // Out-of-bound cells are dead
    return false;
  }

  return board[row][column];
}

/**
 * Sets the value of a cell.
 * @param {number} row The row of the cell.
 * @param {number} column The column of the cell.
 * @param {boolean} value The new value of the cell (true is alive, false is dead).
 */
function setCell(row, column, value) {
  board[row][column] = value;
}

/**
 * Toggles the value of a cell.
 * @param {number} row The row of the cell.
 * @param {number} column The column of the cell.
 * @returns {boolean} The new value of the cell.
 */
function toggleCell(row, column) {
  const newValue = !getCell(row, column);
  setCell(row, column, newValue);
  return newValue;
}

/**
 * Gets the neighbors of a cell.
 * @param {number} row The row of the cell.
 * @param {number} column The colum of the cell.
 * @returns {boolean[]} The neighbors of the cell.
 */
function getNeighbors(row, column) {
  const neighbors = [];

  for (let i = row - 1; i <= row + 1; i++) {
    for (let j = column - 1; j <= column + 1; j++) {
      if (i !== row || j !== column) {
        neighbors.push(getCell(i, j));
      }
    }
  }

  return neighbors;
}

/**
 * Gets the number of alive neighbors of a cell.
 * @param {number} row The row of the cell.
 * @param {number} column The column of the cell.
 */
function countAliveNeighbors(row, column) {
  return getNeighbors(row, column).filter((cell) => cell).length;
}

/**
 * Updates a cell according to the game rules.
 * @param {number} row The row of the cell.
 * @param {number} column The column of the cell.
 * @returns {boolean} The new value of the cell.
 */
function updateCell(row, column) {
  const aliveCount = countAliveNeighbors(row, column);

  // Check if the cell is alive
  if (getCell(row, column)) {
    // Any live cell with two or three live neighbours survives
    if (aliveCount === 2 || aliveCount === 3) {
      return true;
    } else {
      return false;
    }
  } else {
    // Any dead cell with three live neighbours becomes a live cell
    if (aliveCount === 3) {
      return true;
    } else {
      return false;
    }
  }
}

/**
 * Updates the board according to the rules.
 * @returns {boolean[][]} The new, updated game board.
 */
function updateBoard() {
  const newBoard = [];

  for (let i = 0; i < size.rows; i++) {
    let row = [];

    for (let j = 0; j < size.columns; j++) {
      row.push(updateCell(i, j));
    }

    newBoard.push(row);
  }

  return newBoard;
}

/**
 * Renders the given game board.
 * @param {boolean[][]} board - The game board to render.
 */
function render(board) {
  const boardDiv = document.getElementById(BOARD_ELEMENT_ID);

  const table = document.createElement("table");
  table.classList.add("gol-board");

  board.forEach((row) => {
    const tr = document.createElement("tr");
    tr.classList.add("gol-row");

    row.forEach((cell) => {
      const td = document.createElement("td");

      const status = cell ? "alive" : "dead";
      td.classList.add("gol-cell", status);

      tr.appendChild(td);
    });

    table.appendChild(tr);
  });

  boardDiv.innerHTML = "";
  boardDiv.appendChild(table);
}

// Start the simulation when the browser finished loading
document.addEventListener("DOMContentLoaded", () => {
  start();
});
