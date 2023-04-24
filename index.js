//Add EventListener on the window object to listen for the DOMContentLoaded event
window.addEventListener('DOMContentLoaded', () => {
    const boxs = Array.from(document.querySelectorAll('.box'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');

    //Array with 9 empty strings, acts as a board
    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;

    //End game state
    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';

    //All winning combinations 
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function set(index, player) {
        if (game) {
            if (board[index] == 0) {
                if (computer) {
                    if (player == human) {
                        var sign = document.getElementById(humVal + index);
                        drawingWithDelay(sign, 0.3, 0.3);
                        board[index] = humVal;
                        console.log(board);
                        updateScore(board, player);
                        ai();
                    } else {
                        board[index] = comVal;
                        var sign = document.getElementById(comVal + index);
                        setTimeout(function () {
                            drawingWithDelay(sign, 0.3, 0.3);
                        }, 500);
                        updateScore(board, player);
                    }
                }
            }
        }
        console.log(board);
    }


    //Validates to see if there is a match of 3 characters 
    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            isGameActive = false;
            return;
        }

        if (!board.includes(''))
            announce(TIE);
    }

    //Helper function, announce winner or end game state to the user
    const announce = (type) => {
        switch (type) {
            case PLAYERO_WON:
                announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
                break;
            case PLAYERX_WON:
                announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
                break;
            case TIE:
                announcer.innerText = 'Tie';
        }
        announcer.classList.remove('hide');
    };

    //Function checks if tile has a value already, if it has it returns false, otherwise it returns true
    //Makes sure users only play empty tiles
    const isValidAction = (box) => {
        if (box.innerText === 'X' || box.innerText === 'O') {
            return false;
        }

        return true;
    };

    //It sets the value of the element into board array at the given postion to be equal to the value current player
    const updateBoard = (index) => {
        board[index] = currentPlayer;
    }

    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }

    //Function is called when a user clicks on a tile
    const userAction = (box, index) => {
        if (isValidAction(box) && isGameActive) {
            box.innerText = currentPlayer;
            box.classList.add(`player${currentPlayer}`);
            updateBoard(index); //Check to see if there is a winner or not
            handleResultValidation();
            changePlayer();
        }
    }

    //Used to rest the game state and the board
    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        announcer.classList.add('hide');

        if (currentPlayer === 'O') {
            changePlayer();
        }

        boxs.forEach(box => {
            box.innerText = '';
            box.classList.remove('playerX');
            box.classList.remove('playerO');
        });
    }

    boxs.forEach((box, index) => {
        box.addEventListener('click', () => userAction(box, index));
    });

    //Added click handler to the rest button 
    resetButton.addEventListener('click', resetBoard);
});    
