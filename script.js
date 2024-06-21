const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const messageElement = document.getElementById('message');
const restartButton = document.getElementById('restartButton');
const X_CLASS = 'x';
const O_CLASS = 'o';
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let currentPlayer;
startGame();

function startGame() {
    currentPlayer = X_CLASS;
    cells.forEach(cell => {
        cell.classList.remove(X_CLASS, O_CLASS);
        cell.textContent = '';
        cell.addEventListener('click', handleClick, { once: true });
    });
    messageElement.classList.add('hidden');
    restartButton.classList.add('hidden');
}

function handleClick(e) {
    const cell = e.target;
    placeMark(cell, currentPlayer);
    if (checkWin(currentPlayer)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
    }
}

function endGame(draw) {
    if (draw) {
        messageElement.textContent = 'Draw!';
    } else {
        if (currentPlayer === O_CLASS) {
            messageElement.textContent = 'O Wins!';
        } else {
            messageElement.textContent = 'X Wins!';
        }
    }
    messageElement.classList.remove('hidden');
    restartButton.classList.remove('hidden');
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
    });
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
    cell.textContent = currentClass.toUpperCase();
}

function swapTurns() {
    if (currentPlayer === X_CLASS) {
        currentPlayer = O_CLASS;
    } else {
        currentPlayer = X_CLASS;
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
}
