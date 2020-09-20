/** The ID of the board div element. */
const BOARD_ELEMENT_ID = 'board';

function init(rows, columns) {
    console.debug('Initializing.');
    const board = initBoard(rows, columns);
    render(board);
}

/**
 * Initializes the game board.
 * @param {number} rows The number of rows.
 * @param {number} columns The number of columns.
 * @returns {boolean[][]} The 2D array representing the game board.
 */
function initBoard(rows, columns) {
    console.debug('Initializing board.');
    const board = [];

    for (let i = 0; i < rows; i++) {
        let row = [];

        for (let j = 0; j < columns; j++) {
            row.push(false);
        }

        board.push(row);
    }

    return board;
}

/**
 * Renders the given game board.
 * @param {boolean[][]} board - The game board to render.
 */
function render(board) {
    const boardDiv = document.getElementById(BOARD_ELEMENT_ID);

    const table = document.createElement('table');
    table.classList.add('gol-board');

    board.forEach((row) => {
        const tr = document.createElement('tr');
        tr.classList.add('gol-row');

        row.forEach((cell) => {
            console.debug('Creating cell');
            const td = document.createElement('td');

            const status = cell ? 'alive' : 'dead';
            td.classList.add('gol-cell', status);

            tr.appendChild(td);
        });

        table.appendChild(tr);
    });

    boardDiv.innerHTML = '';
    boardDiv.appendChild(table);
}
