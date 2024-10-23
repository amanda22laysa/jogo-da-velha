const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset');
let currentPlayer = 'X';
let board = ["", "", "", "", "", "", "", "", ""];
let isGameActive = true;

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

const handleCellClick = (event) => {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (board[index] !== "" || !isGameActive) {
        return;
    }

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWinner()) {
        statusText.textContent = `Jogador ${currentPlayer} venceu!`;
        isGameActive = false;
        return;
    }

    if (!board.includes("")) {
        statusText.textContent = 'Empate!';
        isGameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Vez do jogador ${currentPlayer}`;
};

const checkWinner = () => {
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
};

const resetGame = () => {
    currentPlayer = 'X';
    board = ["", "", "", "", "", "", "", "", ""];
    isGameActive = true;
    statusText.textContent = `Vez do jogador ${currentPlayer}`;
    cells.forEach(cell => {
        cell.textContent = "";
    });
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
