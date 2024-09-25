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
  const saveFilePath = 'save.json';

  if (fs.existsSync(saveFilePath)) {
    const existingSave = JSON.parse(fs.readFileSync(saveFilePath, 'utf8'));

    mergeGameState(existingSave, currentGameState);
    existingSave.saved_on = Date.now();
    existingSave.logs.push(`Game saved on ${new Date(existingSave.saved_on).toLocaleString()}`);

    fs.writeFile(saveFilePath, JSON.stringify(existingSave, null, 2), function (error) {
      if (error) {
        console.error(error.message);
      } else {
        console.log("[System] Game updated successfully.");
        inGameMenu();
      }
    });
  } else {
    fs.writeFile(saveFilePath, JSON.stringify(currentGameState, null, 2), function (error) {
      if (error) {
        console.error(error.message);
      } else {
        console.log("[System] Game saved successfully.");
        inGameMenu();
      }
    });
  }
}

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

function easterEggAnswer(answer, tryLeft) {
  let parsedAnswer = parseInt(answer, 10);
  if (parsedAnswer === 2) {
    console.log("[Professor RaveChoux] Well done !");
    console.log("[System] Congratulations, you earned a new success: QuizMaster !");
    player.success.push(`QuizMaster" - Unlocked at ${new Date().toLocaleString()}`);
    console.log("Succes -> ", player.success);
    saveGameState();
    return;
  }

  if (tryLeft > 0) {
    console.log(`Nice try but no! ${tryLeft} more try left.`);
    askQuestion(tryLeft);
    return;
  }

  console.log("Oh dare you, come on! Nevermind, have a nice day.");
  saveGameState();
}

function easterEgg(tryLeft = 3) {
  if (tryLeft === 3) {
    setTimeout(() => {
      console.log("[Professor RaveChoux] As I told you earlier, I'm Professor RaveChoux !");
    }, 1000);

    setTimeout(() => {
      console.log("[Professor RaveChoux] Would you be able to find where it's inspired from?");
    }, 2500);

    setTimeout(() => {
      console.log("Here's three choices:");
      console.log("1: Lord of the Rings.\n2: Harry Potter\n3: Narnia");
    }, 3500);

    setTimeout(() => {
      console.log("[Professor RaveChoux] Any idea ? Press your choice to see if you're right and don't worry you have three chances, how kind am i right ?");
    }, 4500)

    setTimeout(() => {
      askQuestion(tryLeft);
    }, 5500);
  } else {
    askQuestion(tryLeft);
  }
}

function askQuestion(tryLeft) {
  rl.question("", (answer) => {
    let parsedAnswer = parseInt(answer, 10);
    tryLeft--;

    if (![1, 2, 3].includes(parsedAnswer)) {
      console.log("Please select a valid value (1 - 2 - 3).");
      askQuestion(tryLeft);
      return;
    }
    easterEggAnswer(parsedAnswer, tryLeft);
  });
}

function mainMenu() {
  rl.question('', (action) => {
    readline.moveCursor(process.stdout, 0, -1);
    readline.clearLine(process.stdout, 0);
    switch (action) {
      case '1':
        loadGame();
        break;
      case '2':
        newGame();
        break;
      case '3':
        rl.close();
        console.log('\n[System] See you later !');
        break;
      default:
        console.log('[System] Invalid option, please try again.');
        mainMenu();
        break;
    }
  });
}

function quitGame() {
  console.log('\n[System] See you later !');
  rl.close();
}

function showCollection(selectedIndex = null) {
  if (selectedIndex !== null) {
    const selectedJohnemon = player.johnemonCollection[selectedIndex];

    rl.question(`You selected ${selectedJohnemon.name}, what do you want to do then?\n1: Heal \n2: Revive \n3: Rename \n4: Release \n5: Return to menu\n`, (action) => {
      readline.moveCursor(process.stdout, 0, -1);
      readline.clearLine(process.stdout, 0);

      switch (action) {
        case '1':
          const healResult = player.healJohnemon(selectedJohnemon);
          console.log(healResult.message);
          setTimeout(() => {
            showCollection(selectedIndex);
          }, 1000);
          break;
        case '2':
          const reviveResult = player.reviveJohnemon(selectedJohnemon);
          console.log(reviveResult.message);
          if (reviveResult.success) {
            showCollection(selectedIndex);
          } else {
            showCollection();
          }
          break;
        case '3':
          rl.question('Enter the new name: ', (newName) => {
            player.renameJohnemon(selectedJohnemon, newName);
            showCollection(selectedIndex);
          });
          break;
        case '4':
          player.releaseJohnemon(selectedJohnemon);
          showCollection();
          break;
        case '5':
          inGameMenu();
          break;
        default:
          console.log('[System] Invalid option, returning to menu.');
          showCollection();
          break;
      }
    });
    return;
  }

  console.log("Here's your collection :");
  player.johnemonCollection.forEach((johnemon, index) => {
    console.log(`${index + 1}: Name: ${johnemon.name} - Level: ${johnemon.level} - Attack: ${johnemon.attackRange} - Defense: ${johnemon.defenseRange} - HP: ${johnemon.healthPool}`);
  });

  rl.question('Select a Johnemon to perform an action (enter the number): ', (answer) => {
    const index = parseInt(answer, 10) - 1;
    if (isNaN(index) || index < 0 || index >= player.johnemonCollection.length) {
      console.log('[System] Invalid selection, please try again.');
      return showCollection();
    }

    showCollection(index); // Appelle la fonction avec l'index sélectionné
  });
}


function inGameMenu() {
  rl.question("[System] What would you like to do next ?\n1: Continue exploration \n2: Collection \n3: Sleep \n4: Save game \n5: Return to main menu\n", (action) => {
    readline.moveCursor(process.stdout, 0, -1);
    readline.clearLine(process.stdout, 0);
    switch (action) {
      case '1': // fight(); OneDayPass ??
        break;
      case '2':
        showCollection();
        break;
      case '3': // sleep();
        break;
      case '4':
        saveGameState();
        break;
      case '5':
        quitGame();
        break;
      default:
        console.log('[System] Invalid option, please try again.');
        inGameMenu();
        break;
    }
  });
}

function askForName() {
  rl.question('[Professor RaveChoux] How should I call our future new arena champion? ', (answer) => {
    player.name = answer;
    currentGameState.JohnemonMaster.name = answer;
    readline.moveCursor(process.stdout, 0, -1);
    console.log(`\n[Professor RaveChoux] Great welcome in Johnemon's world, ${answer}.`);

    setTimeout(() => {
      proposeFirstJohnemon();
    }, 2000);
  });
}

function proposeFirstJohnemon() {
  let firstJohnemon = johnemon.generateRandomName();
  let secondJohnemon = johnemon.generateRandomName();
  let thirdJohnemon = johnemon.generateRandomName();

  rl.question(`[Professor RaveChoux] Who will be your first lovely companion ?\n1: ${firstJohnemon}\n2: ${secondJohnemon}\n3: ${thirdJohnemon} `, (answer) => {
    readline.moveCursor(process.stdout, 0, -1);
    switch (answer) {
      case '1':
        answer = firstJohnemon;
        break;
      case '2':
        answer = secondJohnemon;
        break;
      case '3':
        answer = thirdJohnemon;
        break;
    }
    setTimeout(() => {
      console.log(`\n[Professor RaveChoux] Great choice, ${answer} is happy to be your new friend !`);
    }, 1000);

    player.johnemonCollection.push(answer);
    currentGameState.JohnemonMaster.johnemonCollection.push({
      "id": player.johnemonCollection.length + 1,
      "name": answer,
      "level": 1,
      "attackRange": johnemon.attackRange,
      "defenseRange": johnemon.defenseRange,
      "baseHealthPool": johnemon.baseHealthPool,
      "healthPool": johnemon.baseHealthPool,
      "catchPhrase": johnemon.catchPhrase
    });
    setTimeout(() => {
      rl.question("[Professor RaveChoux] Just before we let you begin your wonderful adventure, how about trying your hand at a little cultivation challenge ?\nThis is only for fun and won't impact pour progression. (Yes - No) ", (answer) => {
        readline.moveCursor(process.stdout, 0, -1);
        readline.clearLine(process.stdout, 0);
        if (answer === 'Yes' || answer === 'yes' || answer === 'y' || answer === 'Y') {
          console.log("[Professor RaveChoux] Yeah, i see that im facing a real gamer !");
          easterEgg();
        }

        if (answer === 'No' || answer === 'no' || answer === 'n' || answer === 'N') {
          setTimeout(() => {
            console.log(`[Professor RaveChoux] Alright, no problem ! Have a nice day ${player.name}`);
            setTimeout(() => {
              saveGameState();
            })
          }, 1000);
        }
      })
    }, 2000);
  });
}

function newGame() {
  console.log("[System] Creating new game . . .\n");
  console.log(`[System] Player ??? joined Pallet Town.`)

  setTimeout(() => {
    console.log("[Professor RaveChoux] Hello there! Glad to meet you !");
  }, 2000);

  setTimeout(() => {
    console.log("[Professor RaveChoux] Welcome to the world of Johnemon! My name is Professor RaveChoux.");
  }, 4000);

  setTimeout(() => {
    console.log("[Professor RaveChoux] This world is inhabited far and wide by creatures called Johnemon.");
  }, 6000);

  setTimeout(() => {
    console.log("[Professor RaveChoux] For some people, Johnemon are pets. Others use them for battles.");
  }, 8000);

  setTimeout(() => {
    console.log("[Professor RaveChoux] As for myself... I study Johnemon as a profession.");
  }, 10000);

  setTimeout(() => {
    console.log("[Professor RaveChoux] But enough about me, I'd like to know more about you.");
  }, 12000);

  setTimeout(() => {
    askForName();
  }, 14000);
}

function loadGame() {
  const saveFilePath = 'save.json';

  if (fs.existsSync(saveFilePath)) {
    console.log("[System] Loading existing game...");
    const savedGame = JSON.parse(fs.readFileSync(saveFilePath, 'utf8'));
    mergeGameState(currentGameState, savedGame);
    player.name = savedGame.JohnemonMaster.name;
    player.johnemonCollection = savedGame.JohnemonMaster.johnemonCollection;
    setTimeout(() => {
      console.log(`[System] Game loaded successfully. Welcome back, ${player.name} !`);
      console.log(`[System] Player ${player.name} joined Pallet Town.`) // @todo ref: world.currentMap
      inGameMenu();
    }, 2000);
  } else {
    console.log("[System] No previous game found, let's begin a new adventure !");
    setTimeout(() => {
      newGame();
    }, 2000);
  }
}

function main() {
  loadGame();
}

main();
