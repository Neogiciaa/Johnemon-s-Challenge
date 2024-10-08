class JohnemonArena {
  constructor(playerJohnemon, enemyJohnemon) {
    this.playerJohnemon = playerJohnemon;
    this.enemyJohnemon = enemyJohnemon;
  }

  startBattle() {
    console.log(`Battle starting between ${this.playerJohnemon.name} vs ${this.enemyJohnemon.name} !`);
    this.startRound(this.playerJohnemon, this.enemyJohnemon);
  }


  startRound(playerJohnemon, enemyJohnemon, action) {
    console.log()
    switch(action) {
      case '1': this.attack(playerJohnemon, enemyJohnemon);
    }

  }

  playerAction(selectedJohnemon) {

  }

  // attack(selectedJohnemon, enemyJohnemon) {
  //   const damageDealtToEnnemy = this.calculateDamage(selectedJohnemon);
  //   const damageDealtToMe = this.calculateDamage(enemyJohnemon);
  //   return ``
  // }

  tryToCatch(opponent) {
    // Viens la  !
  }

  calculateDamage(attackRange, defenseRange) {

  }

  wildJohnemonAction() {

  }

  checkBattleStatus() {

  }

  startNewRound() {

  }

  endBattle() {
    // Remove le poke vaincu de la liste de worldEnnemies OU passer le mien en alive false !
  }
}

export default JohnemonArena;
