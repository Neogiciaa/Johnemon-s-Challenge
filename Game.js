const readline = require('readline');
const JohnemonMaster = require('./JohnemonMaster');
const Johnemon = require('./Johnemon');
const JohnemonWorld = require('./JohnemonWorld');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let johnemon = new Johnemon();
let player = new JohnemonMaster();
let world = new JohnemonWorld();

let currentGameState = {
  "saved_on": Date.now(),
  "JohnemonMaster": {
    "name": "",
    "johnemonCollection": [],
    "healingItems": 0,
    "reviveItems": 0,
    "JOHNEBALLS": 0
  },
  "day": 1,
  "logs": []
}

function saveGameState() {
  const saveFilePath = 'save_game.json';

  if (fs.existsSync(saveFilePath)) {
    const existingSave = JSON.parse(fs.readFileSync(saveFilePath, 'utf8'));

    mergeGameState(existingSave, currentGameState);
    existingSave.saved_on = Date.now();
    existingSave.logs.push(`Game saved on ${new Date(existingSave.saved_on).toLocaleString()}`);

    fs.writeFile(saveFilePath, JSON.stringify(existingSave, null, 2), function (error) {
      if (error) {
        console.error(error.message);
      } else {
        console.log("Game updated successfully.");
        menu();
      }
    });
  } else {
    fs.writeFile(saveFilePath, JSON.stringify(currentGameState, null, 2), function (error) {
      if (error) {
        console.error(error.message);
      } else {
        console.log("Game saved successfully.");
        menu();
      }
    });
  }
}

// To be honest thanks GPT for this one ! I had logic but can't wrote it myself without brainfuck sad moment.
function mergeGameState(existingSave, newState) {
  existingSave.JohnemonMaster.name = newState.JohnemonMaster.name || existingSave.JohnemonMaster.name;
  existingSave.JohnemonMaster.johnemonCollection = newState.JohnemonMaster.johnemonCollection.length > 0
    ? newState.JohnemonMaster.johnemonCollection
    : existingSave.JohnemonMaster.johnemonCollection;
  existingSave.JohnemonMaster.healingItems = newState.JohnemonMaster.healingItems || existingSave.JohnemonMaster.healingItems;
  existingSave.JohnemonMaster.reviveItems = newState.JohnemonMaster.reviveItems || existingSave.JohnemonMaster.reviveItems;
  existingSave.JohnemonMaster.JOHNEBALLS = newState.JohnemonMaster.JOHNEBALLS || existingSave.JohnemonMaster.JOHNEBALLS;
  existingSave.day = newState.day || existingSave.day;
  existingSave.logs = newState.logs.length > 0 ? newState.logs : existingSave.logs;
}

function menu() {
  rl.question('What would you like to do next?\n1: Load Game\n2: Start New Game\n3: Exit\n', (action) => {
    switch (action) {
      case '1':
        loadGame();
        break;
      case '2':
        newGame();
        break;
      case '3':
        rl.close();
        console.log('See you later !');
        break;
      default:
        console.log('Invalid option, please try again.');
        menu();
        break;
    }
  });
}

function askForName() {
  rl.question('How should I call our future new arena champion?\n', (answer) => {
    player.name = answer;
    currentGameState.JohnemonMaster.name = answer;
    console.log(`Great welcome in Johnemon's world, ${answer}.`);
    proposeFirstJohnemon();
  });
}

function proposeFirstJohnemon() {
  let firstJohnemon = johnemon.generateRandomName();
  let secondJohnemon = johnemon.generateRandomName();
  let thirdJohnemon = johnemon.generateRandomName();

  rl.question(`Who will be your first lovely companion (${firstJohnemon} - ${secondJohnemon} - ${thirdJohnemon})?\n`, (answer) => {
    console.log(`\nGreat choice, ${answer} is happy to be your new friend! Let's begin a new adventure!\n\nSaving in progress . . .`);
    player.johnemonCollection.push(answer);
    currentGameState.JohnemonMaster.johnemonCollection.push({
      "name": answer,
      "level": 1,
      "attackRange": johnemon.attackRange,
      "defenseRange": johnemon.defenseRange,
      "healthPool": johnemon.healthPool,
      "catchPhrase": johnemon.catchPhrase
    });
    saveGameState();
  });
}

function newGame() {
  console.log("Blabla de bienvenue !");
  askForName();
}

function loadGame() {
  const saveFilePath = 'save_game.json';

  if (fs.existsSync(saveFilePath)) {
    console.log("Loading existing game...");
    const savedGame = JSON.parse(fs.readFileSync(saveFilePath, 'utf8'));
    mergeGameState(currentGameState, savedGame);
    player.name = savedGame.JohnemonMaster.name;
    player.johnemonCollection = savedGame.JohnemonMaster.johnemonCollection;
    setTimeout(() => {
      console.log(`Game loaded successfully. Welcome back, ${player.name}!`);
      menu();
    }, 2000);
  } else {
    console.log("No previous game found, let's begin a new adventure !");
    newGame();
  }
}

function main() {
  loadGame();
}

main();
