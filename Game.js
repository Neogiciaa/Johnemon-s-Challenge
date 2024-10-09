import readline from "node:readline";
import connection from "./dbConfig.js";
import JohnemonWorld from "./JohnemonWorld.js";
import JohnemonMaster from "./JohnemonMaster.js";
import Johnemon from "./Johnemon.js";
import JohnemonArena from "./JohnemonArena.js";
import Success from "./Success.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let player = new JohnemonMaster();
let success = new Success();

async function checkExistingSaves() {
  const [result] = await connection.query(`SELECT * FROM World`);

  if (result.length === 0) {
    console.log("No previous game found, creating new one . . .");
    await createGame();
  }

  result.forEach(game => { console.log(game) });
  rl.question('Which save would you load ? ', async (selectedSave) => {
    await loadSelectedGame(selectedSave);
  })
}

async function createGame() {
  const world = new JohnemonWorld();
  await world.save();
  await askForName();
}

async function loadGame(game) {
  console.log(`Je charge cette game broooooooo ! ${game}`)
}

async function askForName() {
  rl.question('[Professor RaveChoux] How should I call our future new arena champion? ', async (name) => {
    if (!name.trim()) {
      console.log("[System] Invalid name. Please enter a valid name.");
      return askForName();
    }
    await player.save(name);

    readline.moveCursor(process.stdout, 0, -1);
    console.log(`\n[Professor RaveChoux] Great welcome in Johnemon's world, ${name}.`);
    await proposeFirstJohnemon();
  });
}

async function proposeFirstJohnemon() {
  const firstJohnemon = new Johnemon();
  const secondJohnemon = new Johnemon();
  const thirdJohnemon = new Johnemon();

  rl.question(`[Professor RaveChoux] Who will be your first lovely companion?\n1: ${firstJohnemon.name}\n2: ${secondJohnemon.name}\n3: ${thirdJohnemon.name}\n`, async (answer) => {
    readline.moveCursor(process.stdout, 0, -1);
    readline.clearLine(process.stdout, 0);
    readline.moveCursor(process.stdout, 0, 0);

    let chosenJohnemon;
    switch (answer) {
      case '1':
        chosenJohnemon = firstJohnemon;
        break;
      case '2':
        chosenJohnemon = secondJohnemon;
        break;
      case '3':
        chosenJohnemon = thirdJohnemon;
        break;
      default:
        console.log("[System] Invalid option.");
        return proposeFirstJohnemon();
    }

    setTimeout(() => {
      console.log(`\n[Professor RaveChoux] Great choice, ${chosenJohnemon.name} is happy to be your new friend !`);
    }, 1000);

    await chosenJohnemon.save(undefined, undefined, undefined, undefined, undefined, undefined, undefined,undefined, player.id);
    await player.addJohnemonToCollection(chosenJohnemon.id);

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
              inGameMenu();
            }, 1000);
          }, 1000);
        }
      });
    }, 2000);
  });
}

function quitGame() {
  console.log('\n[System] See you later !');
  rl.close();
  connection.end();

}

async function easterEggAnswer(answer, tryLeft) {
  let parsedAnswer = parseInt(answer, 10);
  if (parsedAnswer === 2) {
    console.log("[Professor RaveChoux] Well done !");
    console.log("[System] Congratulations, you earned a new success: QuizMaster !");

    await success.save("Quiz Master", player.id);
    await inGameMenu();
  }

  if (tryLeft > 0) {
    console.log(`Nice try but no! ${tryLeft} more try left.`);
    askQuestion(tryLeft);
    return;
  }

  console.log("Oh dare you, come on! Nevermind, have a nice day.");
  await inGameMenu();
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

// function showCollection(selectedIndex = null) {
//   if (player.johnemonCollection.length === 0) {
//     console.log("[System] Your collection is empty, catch new Johnemons to see and manage them.")
//     setTimeout(() => {
//       inGameMenu();
//     },1000);
//   }
//   if (selectedIndex !== null) {
//     const selectedJohnemon = player.johnemonCollection[selectedIndex];
//
//     rl.question(`You selected ${selectedJohnemon.name}, what do you want to do then?\n1: Heal \n2: Revive \n3: Rename \n4: Release \n5: Return to menu\n`, (action) => {
//       readline.moveCursor(process.stdout, 0, -1);
//       readline.clearLine(process.stdout, 0);
//
//       switch (action) {
//         case '1':
//           const healResult = player.healJohnemon(selectedJohnemon);
//           console.log(healResult.message);
//           setTimeout(() => {
//             showCollection(selectedIndex);
//           }, 1000);
//           break;
//         case '2':
//           const reviveResult = player.reviveJohnemon(selectedJohnemon);
//           console.log(reviveResult.message);
//           setTimeout(() => {
//             showCollection(selectedIndex);
//           }, 1000);
//           break;
//         case '3':
//           rl.question('Enter the new name: ', (newName) => {
//             player.renameJohnemon(selectedJohnemon, newName);
//             setTimeout(() => {
//               showCollection(selectedIndex);
//             }, 1000);
//           });
//           break;
//         case '4':
//           let release = player.releaseJohnemon(selectedJohnemon);
//           console.log(release.message);
//           setTimeout(() => {
//             if (player.johnemonCollection.length === 0) {
//               inGameMenu();
//             } else showCollection();
//           },1000);
//           break;
//         case '5':
//           inGameMenu();
//           break;
//         default:
//           console.log('[System] Invalid option, returning to menu.');
//           setTimeout(() => {
//             showCollection();
//           },1000);
//           break;
//       }
//     });
//     return;
//   }
//
//   console.log("Here's your collection :");
//   player.johnemonCollection.forEach((johnemon, index) => {
//     console.log(`${index + 1}: Name: ${johnemon.name} - Level: ${johnemon.level} - Attack: ${johnemon.attackRange} - Defense: ${johnemon.defenseRange} - HP: ${johnemon.healthPool}`);
//   });
//
//   rl.question('Select a Johnemon to perform an action (enter the number): ', (answer) => {
//     const index = parseInt(answer, 10) - 1;
//     if (isNaN(index) || index < 0 || index >= player.johnemonCollection.length) {
//       console.log('[System] Invalid selection, please try again.');
//       return showCollection();
//     }
//
//     showCollection(index);
//   });
// }

async function saveGameState() {
  // TODO !!
}

function mainMenu() {
  console.log("Welcome to Johnemon's world !");
  rl.question('1: Load a game \n2: Create new game \n3: Quit game\n', async (action) => {
    readline.moveCursor(process.stdout, 0, -1);
    readline.clearLine(process.stdout, 0);
    readline.moveCursor(process.stdout, 0, 0);
    switch (action) {
      case '1':
        await loadGame();
        break;
      case '2':
        await createGame();
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

async function inGameMenu() {
    rl.question("[System] What would you like to do next ?\n1: Continue exploration \n2: Collection \n3: Sleep \n4: Save game \n5: Return to main menu\n", async (action) => {
      readline.moveCursor(process.stdout, 0, -1);
      readline.clearLine(process.stdout, 0);
      switch (action) {
        case '1':
          // Replace with -> continueExploration();
          break;
        case '2':
          // showCollection();
          break;
        case '3': // sleep();
          break;
        case '4':
          await saveGameState();
          break;
        case '5':
          mainMenu();
          break;
        default:
          console.log('[System] Invalid option, please try again.');
          await inGameMenu();
          break;
      }
    });
  }

async function main() {
  await checkExistingSaves();
}

await main();
