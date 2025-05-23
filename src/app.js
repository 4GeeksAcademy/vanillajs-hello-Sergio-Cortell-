import "bootstrap";
import "./style.css";

import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";

const cardValues = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const cardSuits = ['♦', '♥', '♠', '♣'];
const historialGame = document.getElementById("historial");
const playerWins = document.getElementById('playerWins');
const playerRates = document.getElementById('playerRate');
const computerWin = document.getElementById('computerWins');
const computerRate = document.getElementById('computerRate');
const tiesText = document.getElementById('empates');
const timetText = document.getElementById('timer');
const playerButton = document.getElementById('playerBtn');
let handsplayed = 0;
let playerPlayed = false;

let userWins = 0;
let computerWins = 0;
let ties = 0;

let gameTimer;
let inactivityTimer;
let timeLeft = 0;

const buttonStart = document.getElementById('startButton');
buttonStart.addEventListener('click', startGame);

const getRandomIndex = (length) => {
  return Math.floor(Math.random() * length);
}
//funcion que genera  carta aleatoria 
const generateRandomCard = () => {
  const suit = cardSuits[getRandomIndex(cardSuits.length)];
  const value = cardValues[getRandomIndex(cardValues.length)];
  return {
    suit,
    value
  }
}

function textUpdate() {
  let numFixed1 = 0;
  let numFixed2 = 0;
  let tiesFixed = 0;
  if (handsplayed != 0) {
    numFixed1 = (userWins / handsplayed) * 100;
    numFixed2 = (computerWins / handsplayed) * 100;
    tiesFixed = (ties / handsplayed) * 100;
  }
  playerWins.innerHTML = `Player Wins: ${userWins}`;
  playerRates.innerHTML = `Win rate: ${numFixed1.toFixed(2)}%`;
  computerWin.innerHTML = `Computer Wins: ${computerWins}`;
  computerRate.innerHTML = `Win rate: ${numFixed2.toFixed(2)}%`;
  tiesText.innerHTML = `Ties: ${ties} ties rate:${tiesFixed.toFixed(2)}%`
}
const generateWinner = (playerCard, computerCard) => {
  const userValue = cardValues.indexOf(playerCard);
  const computerValue = cardValues.indexOf(computerCard);
  console.log(`Usuario index: ${userValue}`)
  console.log(`Computer index: ${computerValue}`)
  handsplayed++;
  if (userValue > computerValue) {
    userWins += 1;
    let p = `El usuario Ha Ganado!`;
    addToHistorial(p);
  }
  else if (computerValue > userValue) {
    computerWins += 1
    let p = `La computadora Ha Ganado!`;
    addToHistorial(p);
  } else {
    let p = `Empate!`;
    ties += 1;
    addToHistorial(p);
  }
  textUpdate();
}

window.generateCard = function (player) {
  const card = generateRandomCard();
  const topIcon = document.querySelector(`.${player}-card-top-icon h1`);
  const centerValue = document.querySelector(`.${player}-card-number h1`);
  const bottomIcon = document.querySelector(`.${player}-card-footer-icon h1`);

  topIcon.textContent = card.suit;
  bottomIcon.textContent = card.suit;
  centerValue.textContent = card.value;

  if (card.suit === '♥') {
    topIcon.classList.add('heart');
    bottomIcon.classList.add('heart');
  } else {
    topIcon.classList.remove('heart');
    bottomIcon.classList.remove('heart');
  }
  return card;
}

window.play = function () {
  
  const playerCard = generateCard('player');
  const computerCard = generateCard('computer');
  playerPlayed = true;
  const winner = generateWinner(playerCard.value, computerCard.value);
  startInactivityTimer();
  console.log(winner);

}

window.onload = function () {
  generateCard('player');
  generateCard('computer');
  playerButton.disabled = true;
  setTimeout(() => {
    alert('Al darle Start Game empezara una partida de 30 segundos, si no le das en 5 segundos a seleccionar carta la pc gana automaticamente! Buena suerte.');

  }, 100)
}

function addToHistorial(winner) {
  const p = document.createElement('p');
  p.textContent = winner;
  historialGame.append(p);
}
function startGame() {

  playerButton.disabled = false;
  clear(historialGame);
  playerPlayed = false;
  timeLeft = 30;
  timetText.innerHTML = `${timeLeft}s`;
  buttonStart.disabled = true;
  alert('Empieza el juego!');
  startInactivityTimer();
  gameTimer = setInterval(() => {
    timeLeft--;
    timetText.innerHTML = `${timeLeft}s`;

    if (timeLeft <= 0) {
      timetText.innerHTML = `${timeLeft}s`;
      endGame();
    }
  }, 1000);

}

function startInactivityTimer() {
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(() => {
    generateCard('computer');
    computerWins++;
    handsplayed++;
    let p = 'el jugador no jugo carta, gana la pc!'
    addToHistorial(p);
    textUpdate();
    startInactivityTimer(); 
  }, 5000);
}
function clear(wheretoClear) {
  wheretoClear.querySelectorAll('p').forEach(element => element.remove());
  handsplayed = 0;
  userWins = 0;
  computerWins = 0;
  ties = 0;
  textUpdate();
}

function endGame() {
  clearInterval(gameTimer);
  clearTimeout(inactivityTimer);
  alert('¡Terminó el juego!');
  buttonStart.disabled = false;
}