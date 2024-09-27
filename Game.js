const readline = require('readline');
const JohnemonMaster = require('./JohnemonMaster');
const Johnemon = require('./Johnemon');
const JohnemonWorld = require('./JohnemonWorld');
const JohnemonArena = require('./JohnemonArena');
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
  "world": {
    "maps": [],
    "day": 1,
  },
  "JohnemonMaster": {
    "name": "",
    "currentMap": "",
    "johnemonCollection": [],
    "healingItems": 0,
    "reviveItems": 0,
    "JOHNEBALLS": 0
  }
}

const mergeGameState = (existingSave, newState) => {
  return {
    ...existingSave,
    ...newState,
    world: {...existingSave.world, ...newState.world},
    JohnemonMaster: {...existingSave.JohnemonMaster, ...newState.JohnemonMaster}
  };
};

function saveGameState() {
  const saveFilePath = 'save.json';

  if (fs.existsSync(saveFilePath)) {
    const existingSave = JSON.parse(fs.readFileSync(saveFilePath, 'utf8'));

    const mergedSave = mergeGameState(existingSave, currentGameState);
    mergedSave.saved_on = Date.now();
    // mergedSave.world.logs.push(`Game saved on ${new Date(mergedSave.saved_on).toLocaleString()}`); Borken to fix

    fs.writeFile(saveFilePath, JSON.stringify(mergedSave, null, 2), function (error) {
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

function quitGame() {
  console.log('\n[System] See you later !');
  rl.close();
}

function easterEggAnswer(answer, tryLeft) {
  let parsedAnswer = parseInt(answer, 10);
  if (parsedAnswer === 2) {
    console.log("[Professor RaveChoux] Well done !");
    console.log("[System] Congratulations, you earned a new success: QuizMaster !");
    player.success.push(`QuizMaster" - Unlocked at ${new Date().toLocaleString()}`);
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
      console.log("1: Lord of the Rings\n2: Harry Potter\n3: Narnia");
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

function showCollection(selectedIndex = null) {
  if (player.johnemonCollection.length === 0) {
    console.log("[System] Your collection is empty, catch new Johnemons to see and manage them.")
    setTimeout(() => {
      inGameMenu();
    },1000);
  }
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
          setTimeout(() => {
            showCollection(selectedIndex);
          }, 1000);
          break;
        case '3':
          rl.question('Enter the new name: ', (newName) => {
            player.renameJohnemon(selectedJohnemon, newName);
            setTimeout(() => {
              showCollection(selectedIndex);
            }, 1000);
          });
          break;
        case '4':
          let release = player.releaseJohnemon(selectedJohnemon);
          console.log(release.message);
          setTimeout(() => {
            if (player.johnemonCollection.length === 0) {
              inGameMenu();
            } else showCollection();
          },1000);
          break;
        case '5':
          inGameMenu();
          break;
        default:
          console.log('[System] Invalid option, returning to menu.');
          setTimeout(() => {
            showCollection();
          },1000);
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

    showCollection(index);
  });
}

function proposeFirstJohnemon() {
  const firstJohnemon = johnemon.generateRandomName();
  const secondJohnemon = johnemon.generateRandomName();
  const thirdJohnemon = johnemon.generateRandomName();

  rl.question(`[Professor RaveChoux] Who will be your first lovely companion?\n1: ${firstJohnemon}\n2: ${secondJohnemon}\n3: ${thirdJohnemon}\n`, (answer) => {
    readline.moveCursor(process.stdout, 0, -1);
    readline.clearLine(process.stdout, 0);
    readline.moveCursor(process.stdout, 0, 0);

    let chosenJohnemon;
    switch (answer) {
      case '1':
        chosenJohnemon = new Johnemon(firstJohnemon, 1, 100, 10, 5, 30); // Crée un objet Johnemon avec des stats par défaut ou des stats personnalisées
        break;
      case '2':
        chosenJohnemon = new Johnemon(secondJohnemon, 1, 100, 10, 5, 30);
        break;
      case '3':
        chosenJohnemon = new Johnemon(thirdJohnemon, 1, 100, 10, 5, 30);
        break;
      default:
        console.log("[System] Invalid option.");
        return proposeFirstJohnemon();
    }

    setTimeout(() => {
      console.log(`\n[Professor RaveChoux] Great choice, ${chosenJohnemon.name} is happy to be your new friend !`);
    }, 1000);

    player.johnemonCollection.push(chosenJohnemon);
    currentGameState.JohnemonMaster.johnemonCollection.push({
      id: player.johnemonCollection.length, // Utilise l'index actuel + 1 comme identifiant
      name: chosenJohnemon.name,
      level: chosenJohnemon.level,
      maxLevel: chosenJohnemon.maxLevel,
      attackRange: chosenJohnemon.attackRange,
      defenseRange: chosenJohnemon.defenseRange,
      baseHealthPool: chosenJohnemon.baseHealthPool,
      healthPool: chosenJohnemon.healthPool,
      catchPhrase: chosenJohnemon.catchPhrase
    });

    currentGameState.JohnemonMaster.currentMap = world.maps[0];

    setTimeout(() => {
      rl.question("[Professor RaveChoux] Just before we let you begin your wonderful adventure, how about trying your hand at a little cultivation challenge ?\nThis is only for fun and won't impact your progression. (Yes - No) ", (answer) => {
        readline.moveCursor(process.stdout, 0, -1);
        readline.clearLine(process.stdout, 0);
        if (answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y') {
          console.log("[Professor RaveChoux] Yeah, I see that I'm facing a real gamer !");
          easterEgg();
        } else {
          setTimeout(() => {
            console.log(`[Professor RaveChoux] Alright, no problem! Have a nice day ${player.name}`);
            setTimeout(() => {
              saveGameState();
            }, 1000);
          }, 1000);
        }
      });
    }, 2000);
  });
}

function askForName() {
  rl.question('[Professor RaveChoux] How should I call our future new arena champion? ', (answer) => {
    if (!answer.trim()) {
      console.log("[System] Invalid name. Please enter a valid name.");
      return askForName(); // Demander à nouveau le nom
    }
    player.name = answer;
    currentGameState.JohnemonMaster.name = answer;
    readline.moveCursor(process.stdout, 0, -1);
    console.log(`\n[Professor RaveChoux] Great welcome in Johnemon's world, ${answer}.`);
    proposeFirstJohnemon();
  });
}

function newGame() {
  console.log("[System] Creating new game . . .\n");
  console.log(`[System] Player ??? joined ${world.getCurrentMapName()} - Day ${world.day}.`);

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
      console.log(`[System] Player ${player.name} joined ${player.currentMap} - Day: ${world.day}`);
      inGameMenu();
    }, 2000);
  } else {
    console.log("[System] No previous game found, let's begin a new adventure !");
    setTimeout(() => {
      newGame();
    }, 2000);
  }
}

function mainMenu() {
  rl.question('1: Load a game \n2: Create new game \n3: Quit game\n', (action) => {
    readline.moveCursor(process.stdout, 0, -1);
    readline.clearLine(process.stdout, 0);
    readline.moveCursor(process.stdout, 0, 0);
    switch (action) {
      case '1':
        loadGame();
        break;
      case '2':
        newGame();
        break;
      case '3':
        quitGame();
        break;
      default:
        console.log('[System] Invalid option, please try again.');
        mainMenu();
        break;
    }
  });
}

// Not done yet !
// function continueExploration() {
//   const alivePlayerJohnemons = player.johnemonCollection.filter(johnemon => johnemon.isAlive());
//   const aliveEnemyJohnemon = world.findAliveEnemy();
//
//   console.log("Ennemi trouvé en vie : ", aliveEnemyJohnemon);
//
//   if (alivePlayerJohnemons.length === 0) {
//     console.log("[System] No more alive johnemons, revive one or sleep to fight again.");
//     inGameMenu();
//     return;
//   }
//
//   if (!aliveEnemyJohnemon) {
//     console.log(`[System] All enemies in ${player.currentMap} are down, congratulations !\nMooving to next map ${world.maps[1].name}`); // Créer 2 ième map
//     player.moveToNextMap();
//     return;
//   }
//
//   if (alivePlayerJohnemons.length === 1) {
//     const selectedJohnemon = alivePlayerJohnemons[0];
//     let arena = new JohnemonArena(selectedJohnemon, aliveEnemyJohnemon);
//     arena.startBattle();
//     return;
//   }
//
//   console.log("[System] Here's your available johnemons:");
//   alivePlayerJohnemons.forEach((johnemon, index) => {
//     console.log(`${index + 1}: ${johnemon.name} (HP: ${johnemon.healthPool})`);
//   });
//
//   rl.question(`Which one do you want to use: `, (selectedIndex) => {
//     const selectedIndexNumber = parseInt(selectedIndex, 10) - 1;
//
//     if (selectedIndexNumber >= 0 && selectedIndexNumber < alivePlayerJohnemons.length) {
//       const selectedJohnemon = alivePlayerJohnemons[selectedIndexNumber];
//       console.log(`[System] You choose ${selectedJohnemon.name} to fight.`);
//       let arena = new JohnemonArena(selectedJohnemon, aliveEnemyJohnemon);
//       arena.startBattle();
//     } else {
//       console.log("[System] Invalid selection, please try again.");
//       continueExploration();
//     }
//   });
// }

  function inGameMenu() {
    rl.question("[System] What would you like to do next ?\n1: Continue exploration \n2: Collection \n3: Sleep \n4: Save game \n5: Return to main menu\n", (action) => {
      readline.moveCursor(process.stdout, 0, -1);
      readline.clearLine(process.stdout, 0);
      switch (action) {
        case '1':
          inGameMenu(); // Replace with -> continueExploration();
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
          mainMenu();
          break;
        default:
          console.log('[System] Invalid option, please try again.');
          inGameMenu();
          break;
      }
    });
  }

  function main() {
    loadGame();
  }

  main();
