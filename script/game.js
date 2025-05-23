const blue = document.getElementById("blue");
const red = document.getElementById("red");
const yellow = document.getElementById("yellow");
const green = document.getElementById("green");
const interacao = document.getElementById("interacoes");
const startButton = document.getElementById("startButton");
const soundSuccess = new Audio("../sounds/sucesso.mp3");
const soundError = new Audio("../sounds/erro.mp3");
let inputEnabled = true;

startButton.addEventListener("click", geniusGame);

function playSound(sound) {
    sound.play();
}


let sequence = [];
let playerSequence = [];
const colors = ["red", "blue", "yellow", "green"];

function geniusGame() {
    sequence = [];
    playerSequence = [];

    interacao.innerHTML = `<div class="loader"></div> `;
    setTimeout(nextColor, 1000);
}

function nextColor() {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    sequence.push(randomColor);
    playerSequence = [];
    interacao.innerHTML = `<p>Rodada: ${sequence.length}</p>`;
    showSequence();
}

function showSequence() {
    let i = 0;
    const interval = setInterval(() => {
        highlightColor(sequence[i]);
        i++;
        if (i >= sequence.length) {
            clearInterval(interval);
        }
    }, 800);
}

function highlightColor(color) {
    const element = document.getElementById(color);
    element.classList.add("active");
    setTimeout(() => {
        element.classList.remove("active");
    }, 200);
}

function handlePlayerInput(color) {
    if (!inputEnabled) return; 

    playerSequence.push(color);
    highlightColor(color);
    const currentIndex = playerSequence.length - 1;

    if (playerSequence[currentIndex] !== sequence[currentIndex]) {
        soundError.play();

        inputEnabled = false;

        interacao.innerHTML = `<i class="fa-solid fa-x"></i>`;
        let countdown = 5;
        interacao.innerHTML = `<p>Começando novamente em ${countdown} segundos</p>`;

        const countdownInterval = setInterval(() => {
            countdown--;
            if (countdown > 0) {
                interacao.innerHTML = `<p>Começando novamente em ${countdown} segundos</p>`;
            } else {
                clearInterval(countdownInterval);
                resetGame();
            }
        }, 1000);

        return;
    }

    if (playerSequence.length === sequence.length) {
        soundSuccess.currentTime = 0;
        soundSuccess.play();

        interacao.innerHTML = `<i class="fa-solid fa-thumbs-up"></i>`;
        setTimeout(nextColor, 1000);
    }
}


blue.addEventListener("click", () => handlePlayerInput("blue"));
red.addEventListener("click", () => handlePlayerInput("red"));
yellow.addEventListener("click", () => handlePlayerInput("yellow"));
green.addEventListener("click", () => handlePlayerInput("green"));

function resetGame() {
    sequence = [];
    playerSequence = [];

    setTimeout(() => {
        interacao.textContent = "Nova tentativa!";
        inputEnabled = true; // 🔓 permite clicar de novo
        nextColor();
    }, 1500);
}


function setButtonsDisabled(disabled) {
    blue.disabled = disabled;
    red.disabled = disabled;
    yellow.disabled = disabled;
    green.disabled = disabled;

    // opcional: adiciona/remover uma classe visual (ex: "desativado")
    const buttons = [blue, red, yellow, green];
    buttons.forEach(btn => {
        btn.classList.toggle("disabled", disabled);
    });
}
