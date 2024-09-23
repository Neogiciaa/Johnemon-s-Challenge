const readline = require('readline');
const JohnemonMaster = require('./JohnemonMaster');
const Johnemon = require('./Johnemon');
const JohnemonWorld = require ('./JohnemonWorld');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let johnemon = new Johnemon();
let player = new JohnemonMaster();
let world = new JohnemonWorld();

function saveGameState() {

}

function askForName() {
  rl.question('How should i call our future new arena champion ?\n', (answer) => {
    console.log(`Great welcome in Johnemon's world ${ answer }.`);
    player.name = answer;
    proposeFirstJohnemon();
  })
}

function proposeFirstJohnemon() {
  let firstJonhemon = johnemon.generateRandomName();
  let secondJonhemon = johnemon.generateRandomName();
  let thirdJonhemon = johnemon.generateRandomName();

  rl.question(`Who will be you first lovely companion (${firstJonhemon} - ${secondJonhemon} - ${thirdJonhemon})  ?\n`, (answer) => {
    console.log(`\nGreat choice, ${answer} is happy to be your new friend !\nLet's begin a new adventure !\n\nLoading in progress . . .`);
    player.johnemonCollection.push(answer);
    setTimeout(() => {
      rl.close();
    }, 2000);
  });
}

function loadGame(game) {
  if (!game) {
    console.log("No previous game found, creating new one . . .\n")
    setTimeout(() => {
      newGame();
    },2000);
  } else console.log("Loading old game . . .");
}

function newGame() {
  askForName();
}

function startGame() {
  loadGame();
}

startGame();










































