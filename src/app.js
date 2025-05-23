import "bootstrap";
import "./style.css";

import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";

const cardValues = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const cardSuits = ['♦', '♥', '♠', '♣'];

let userWins=0;
let computerWins=0;

const getRandomIndex = (length) => {
  return Math.floor(Math.random() * length);
}

const generateRandomCard = () => {
  const suit = cardSuits[getRandomIndex(cardSuits.length)];
  const value = cardValues[getRandomIndex(cardValues.length)];
  return {
    suit,
    value
  }
}

const generateWinner = (playerCard, computerCard) => {
  const userValue = cardValues.indexOf(playerCard);
  const computerValue = cardValues.indexOf(computerCard);
  console.log(`Usuario index: ${userValue}`)
  console.log(`Computer index: ${computerValue}`)

  if (userValue > computerValue) {
    userWins+=1;
    alert('El usuario Ha ganado');
    document.getElementById('playerWins').innerHTML = `Player Wins: ${userWins}`
  } else if (computerValue > userValue) {
    computerWins+=1
    document.getElementById('computerWins').innerHTML = `Computer Wins: ${computerWins}`
    alert('La computadora Ha ganado');
  } else {
    alert('Hay un Empate')
  }
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

window.adjustCardSize = function () {
  const width = document.getElementById("cardWidth").value;
  const height = document.getElementById("cardHeight").value;
  const cardElement = document.querySelector(".card");

  if (width) cardElement.style.width = `${width}px`;
  if (height) cardElement.style.height = `${height}px`;
}

window.play = function () {
  const playerCard = generateCard('player');
  const computerCard = generateCard('computer');
  setTimeout(() => {
    const winner = generateWinner(playerCard.value, computerCard.value);
    console.log(winner);
  }, 5000);
}

window.onload = function () {
  play();
}