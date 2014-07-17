
/**
 * A function for adding a disc to our Connect Four board.
 *
 * @param string color The color of the current player.
 * @param int x_pos The x-position of the location chosen.
 * @param int y_pos The y-position of the location chosen.
 */
function addDiscToBoard(color, x_pos, y_pos) {
    board[y_pos][x_pos] = color;
}


function printBoard() {

    // Loop through the board, and add classes to each cell for the
    // appropriate colors.
    var column, row;
    for (y = 0; y <= 5; y++) {
        for (x = 0; x <= 6; x++) {
            if (board[y][x] !== 0) {
                cell = $("tr:eq(" + y + ")").find('td').eq(x);
                cell.children('button').css("background-color", board[y][x]);
            }
        }
    }
}

/**
 * A function for changing players at the end of a turn.
 */
function changePlayer() {
    var nextPlayerName;
    // Change the value of our player variable.
    if (currentPlayer === 'black') {
        currentPlayer = 'red';
    } else {
        currentPlayer = 'black';
    }

    // Update the UI.
    $('.player').css("color", currentPlayer).text(playerName[currentPlayer]);
}

/**
 * Test to ensure the chosen location is at the bottom of the column.
 * @param int x_pos The x-position of the location chosen.
 * @param int y_pos The y-position of the location chosen.
 * @return bool returns true or false for the question "Is this at the bottom?".
 */
function bottomTest(x_pos, y_pos) {
    var fail;

    // Start at the bottom of the column, and step up, checking to make sure
    // each position has been filled. Go until you reach the chosen position.
    for (y = 5; y > y_pos; y--) {
        if (board[y][x_pos] === 0) {
            fail = true;
        }
    }

    return fail === true ? false : true;
}


/**
 * Test to ensure the chosen location isn't taken.
 * @param int x_pos The x-position of the location chosen.
 * @param int y_pos The y-position of the location chosen.
 * @return bool returns true or false for the question "Is this spot taken?".
 */
function takenTest(x_pos, y_pos) {
    var value = board[y_pos][x_pos];

    return value === 0 ? false : true;
}

/**
 * Determine if the game is a draw (all peices on the board are filled).
 * @return bool Returns true or false for the question "Is this a draw?".
 */
function gameIsDraw() {
    for (y = 0; y <= 5; y++) {
        for (x = 0; x <= 6; x++) {
            if (board[y][x] === 0) {
                return false;
            }
        }
    }

    // No locations were empty. Return true to indicate that the game is a draw.
    return true;
}

/**
 * Test to see if somebody got four consecutive horizontal pieces.
 * @return bool Returns true if a win was found, and otherwise false.
 */
function horizontalWin() {
    var currentValue,
        previousValue = 0,
        tally = 0;

    // Scan each row in series, tallying the length of each series. If a series
    // ever reaches four, return true for a win.
    for (y = 0; y <= 5; y++) {
        for (x = 0; x <= 6; x++) {
            currentValue = board[y][x];
            if (currentValue === previousValue && currentValue !== 0) {
                tally += 1;
            } else {
                // Reset the tally if you find a gap.
                tally = 0;
            }
            if (tally === 3) {
                return true;
            }
            previousValue = currentValue;
        }

        // After each row, reset the tally and previous value.
        tally = 0;
        previousValue = 0;
    }

    // No horizontal win was found.
    return false;
}

/**
 * Test to see if somebody got four consecutive horizontal pieces.
 * @return bool Returns true if a win was found, and otherwise false.
 */
function verticalWin() {
    var currentValue,
        previousValue = 0,
        tally = 0;

    // Scan each column in series, tallying the length of each series. If a
    // series ever reaches four, return true for a win.
    for (x = 0; x <= 6; x++) {
        for (y = 0; y <= 5; y++) {
            currentValue = board[y][x];
            if (currentValue === previousValue && currentValue !== 0) {
                tally += 1;
            } else {
                // Reset the tally if you find a gap.
                tally = 0;
            }
            if (tally === 3) {
                return true;
            }
            previousValue = currentValue;
        }

        // After each column, reset the tally and previous value.
        tally = 0;
        previousValue = 0;
    }

    // No vertical win was found.
    return false;
}

/**
 * Test to see if somebody got four consecutive horizontal pieces.
 * @todo: refactor this to make it more DRY.
 * @return bool Returns true if a win was found, and otherwise false.
 */
function diagonalWin() {
    var xtemp,
        ytemp,
        currentValue,
        previousValue = 0,
        tally = 0;

    // Test for down-right diagonals across the top.
    for (x = 0; x <= 6; x++) {
        xtemp = x;
        ytemp = 0;

        while (xtemp <= 6 && ytemp <= 5) {
            currentValue = board[ytemp][xtemp];
            if (currentValue === previousValue && currentValue !== 0) {
                tally += 1;
            } else {
                // Reset the tally if you find a gap.
                tally = 0;
            }
            if (tally === 3) {
                return true;
            }
            previousValue = currentValue;

            // Shift down-right one diagonal index.
            xtemp++;
            ytemp++;
        }
        tally = 0;
        previousValue = 0;
    }

    // Test for down-left diagonals across the top.
    for (x = 0; x <= 6; x++) {
        xtemp = x;
        ytemp = 0;

        while (0 <= xtemp && ytemp <= 5) {
            currentValue = board[ytemp][xtemp];
            if (currentValue === previousValue && currentValue !== 0) {
                tally += 1;
            } else {
                // Reset the tally if you find a gap.
                tally = 0;
            }
            if (tally === 3) {
                return true;
            }
            previousValue = currentValue;

            // Shift down-left one diagonal index.
            xtemp--;
            ytemp++;
        }
        tally = 0;
        previousValue = 0;
    }

    // Test for down-right diagonals down the left side.
    for (y = 0; y <= 5; y++) {
        xtemp = 0;
        ytemp = y;

        while (xtemp <= 6 && ytemp <= 5) {
            currentValue = board[ytemp][xtemp];
            if (currentValue === previousValue && currentValue !== 0) {
                tally += 1;
            } else {
                // Reset the tally if you find a gap.
                tally = 0;
            }
            if (tally === 3) {
                return true;
            }
            previousValue = currentValue;

            // Shift down-right one diagonal index.
            xtemp++;
            ytemp++;
        }
        tally = 0;
        previousValue = 0;
    }

    // Test for down-left diagonals down the right side.
    for (y = 0; y <= 5; y++) {
        xtemp = 6;
        ytemp = y;

        while (0 <= xtemp && ytemp <= 5) {
            currentValue = board[ytemp][xtemp];
            if (currentValue === previousValue && currentValue !== 0) {
                tally += 1;
            } else {
                // Reset the tally if you find a gap.
                tally = 0;
            }
            if (tally === 3) {
                return true;
            }
            previousValue = currentValue;

            // Shift down-left one diagonal index.
            xtemp--;
            ytemp++;
        }
        tally = 0;
        previousValue = 0;
    }

    // No diagonal wins found. Return false.
    return false;
}

