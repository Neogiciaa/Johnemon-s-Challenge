
class JohnemonMaster {
  constructor(name) {
    this.name = name;
    this.johnemonCollection = [];
    this.healingItems = 5;
    this.reviveItems = 3;
    this.JOHNEBALLS = 10;
    this.success = [];
  }

  renameJohnemon(johnemon, newName) {
    console.log("RENAME")
  }

  healJohnemon(previousHealthPool) {
    console.log("HEAL")
  }

  reviveJohnemon(player, johnemon) {
    //  johnemon.healthPool = Pv de base ??
      player.reviveHealingItems -= 1;
  }

  releaseJohnemon(johnemon) {
    console.log("RELEASE")
  }

  showCollection() {

  }
}

module.exports = JohnemonMaster;
