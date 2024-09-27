class JohnemonWorld {
  constructor() {
    this.maps = [{
      "id": 1,
      "name": "Pallet Town",
      "wildEnnemies": [
        {
          "id": 1,
          "name": "Patata",
          "level": 1,
          "maxLevel": 100,
          "attackRange": 2,
          "defenseRange": 1,
          "baseHealthPool": 12,
          "healthPool": 12,
          "isAlive": true,
        },
        {
          "id": 2,
          "name": "Noreon",
          "level": 2,
          "maxLevel": 100,
          "attackRange": 3,
          "defenseRange": 2,
          "baseHealthPool": 14,
          "healthPool": 14,
          "isAlive": false,
        },
        {
          "id": 3,
          "name": "Ramouss",
          "level": 3,
          "maxLevel": 100,
          "attackRange": 4,
          "defenseRange": 3,
          "baseHealthPool": 15,
          "healthPool": 15,
          "isAlive": false,
        }
      ],
      "arenaMaster": {
        "name": "MaxLeBro",
        "johnemonCollection": [{
          "id": 1,
          "name": "Patata",
          "level": 1,
          "maxLevel": 100,
          "attackRange": 2,
          "defenseRange": 1,
          "baseHealthPool": 12,
          "healthPool": 12,
          "isAlive": true,
        }],
      }
    }];
    this.day = 1;
    this.logs = [];
  }

  oneDayPasses(johnemon) {

  }

  randomizeEvent() {

  }

  addLog(player, newLog) {
    this.logs.push(`[${player}] ${newLog}`);
  }

  allEnemiesDefeated() {
    return this.maps[0].wildEnnemies.some(johnemon => !johnemon.isAlive);
  }

  findAliveEnemy() {
    return this.maps[0].wildEnnemies.filter(johnemon => johnemon.alive === true);
  }

  getCurrentMapName() {
    return this.maps[0].name;
  }
}

module.exports = JohnemonWorld;
