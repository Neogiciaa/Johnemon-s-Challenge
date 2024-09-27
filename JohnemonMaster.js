class JohnemonMaster {
  constructor(name) {
    this.name = name;
    this.johnemonCollection = [];
    this.healingItems = 5;
    this.reviveItems = 3;
    this.JOHNEBALLS = 10;
    this.success = [];
    this.currentMap = "";
  }

  renameJohnemon(johnemon, newName) {
    let previousName = johnemon.name;
    johnemon.name = newName;
    return { success: true, message: `[System] ${previousName} has been renamed to ${newName}.` };
  }

  healJohnemon(johnemon) {
    if (this.healingItems <= 0) {
      return { success: false, message: '[System] No healing items left.' };
    }

    if (johnemon.healthPool === johnemon.baseHealthPool) {
      return { success: false, message: `[System] ${johnemon.name} is already at full health.` };
    }

    johnemon.healthPool = Math.min(johnemon.healthPool + 20, johnemon.baseHealthPool);
    this.healingItems--;
    return { success: true, message: `[System] ${johnemon.name} has been healed. HP: ${johnemon.healthPool}/${johnemon.baseHealthPool}. Remaining healing items: ${ this.healingItems }` };
  }

  reviveJohnemon(johnemon) {
    if (this.reviveItems > 0) {
      if (johnemon.healthPool <= 0) {
        johnemon.healthPool = johnemon.baseHealthPool;
        this.reviveItems--;
        return { "success": true, "message": `[System] ${johnemon.name} has been revived with ${johnemon.healthPool} HP. Remaining revive items: ${ this.reviveItems }`}
      } else {
        return { "success": false, "message": `[System] ${johnemon.name} is still alive !`}
      }
    } else {
      return { success: false, message: "[System] No more revive item left. Buy some to the store or drop some with fights or sleep to revive all of your johnemon's"}
    }
  }

  releaseJohnemon(johnemon) {
    const index = this.johnemonCollection.indexOf(johnemon);
    if (index !== -1) {
      this.johnemonCollection.splice(index, 1);
      return { success: true, message: `[System] ${johnemon.name} has been released from your collection. `};
    } else {
      return { success: false, message: "[System] Johnemon not found in your collection." };
    }
  }

  moveToNextMap(world) {
    const currentMapIndex = world.maps.findIndex(map => map.id === this.currentMap.id);
    if (currentMapIndex + 1 < world.maps.length) {
      this.currentMap = world.maps[currentMapIndex + 1];
      console.log(`[System] You've moved to the next map: ${this.currentMap.name}`);
    } else {
      console.log('[System] You have completed all available maps!');
    }
  }

}

module.exports = JohnemonMaster;
