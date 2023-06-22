// Initial Data
let frame = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: '',
};

let playerTurn = '';
let winsX = 0;
let winsO = 0;
let warning = '';
let playing = true;

reset();

// Events
document.querySelector('.reset').addEventListener('click', reset);
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', itemClick);
});

// Functions
function itemClick(event) {
    let item = event.target.getAttribute('data-item');
    
    if (frame[item] === '' && playing) {
        if (playerTurn === 'X') {
            event.target.classList.add('active');
        }

        frame[item] = playerTurn;
        renderFrame();
        togglePlayer();
    }
}

function reset() {
    warning = '';

    let random = Math.floor(Math.random() * 2);

    playerTurn = (random === 0) ? 'X' : 'O';

    clearActiveClass();

    if (playerTurn === 'X') {
        document.querySelector('.score--x').classList.add('active');
    } else {
        document.querySelector('.score--o').classList.add('active');
    }

    for(let i in frame) {
        frame[i] = '';
    }

    playing = true;

    renderFrame();
    renderInfo();
}

function renderFrame() {
    for (let i in frame) {
        let item = document.querySelector(`div[data-item=${i}]`);        
        item.innerHTML = frame[i];
    }

    checkGame();
}

function renderInfo() {
    let info = document.querySelector('.info');

    info.innerHTML = playing ? `Vez de ${playerTurn}` : warning;
}

function checkGame() {
    if (checkWinnerFor('X')) {
        warning = 'Vencedor => X';
        playing = false;
    } else if (checkWinnerFor('O')) {
        warning = 'Vencedor => O';
        playing = false;
    } else if (isFull()) {
        warning = 'Empatou!'
        playing = false;
    }
}

function togglePlayer() {
    if (playerTurn === 'X') {
        playerTurn = 'O';
    } else {
        playerTurn = 'X';
    }

    document.querySelector('.score--x').classList.toggle('active');
    document.querySelector('.score--o').classList.toggle('active');

    renderInfo();
}

function checkWinnerFor(player) {
    let positions = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1',
    ];

    for (let position in positions) {
        let positionArray = positions[position].split(',');
        let hasWon = positionArray.every(option => frame[option] === player);

        if (hasWon) {
            document.querySelectorAll('.area-line div').forEach((item) => {
                (player === 'X') ? item.classList.add('purple') : item.classList.remove('purple');

                document.querySelector('.area-line').style = 'display: inline-block';
                if (item.classList.contains(`line${position}`)) {
                    item.classList.add('active');
                }
            });

            if (player === 'X') {
                winsX++;
                document.querySelector('.score--x .victories').innerHTML = winsX;
            } else if (player === 'O') {
                winsO++;
                document.querySelector('.score--o .victories').innerHTML = winsO;
            }
            return true;
        }
    }

    return false;
}

function isFull() {
    for (let i in frame) {
        if (frame[i] === '') {
            return false;
        }
    }

    return true;
}

function clearActiveClass() {
    document.querySelector('.score--x').classList.remove('active');
    document.querySelector('.score--o').classList.remove('active');

    document.querySelectorAll('.item').forEach(item => {
        item.classList.remove('active');
    });

    document.querySelectorAll('.area-line div').forEach((item) => {
        document.querySelector('.area-line').style = 'display: none';
        item.classList.remove('active');
    });
}