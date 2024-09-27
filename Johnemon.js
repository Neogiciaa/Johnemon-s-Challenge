const firstStudentsPart = [
  'Oli',
  'No',
  'Dia',
  'Mo',
  'Ly',
  'Séba',
  'Crist',
  'Far',
  'Jul',
  'Jos',
  'Benj',
  'Mat',
  'Re',
  'Dona',
  'Ren',
  'Anto',
  'Vinci',
  'Stép',
  'Moha',
  'Ha',
  'Pie',
  'Hu',
  'Th',
  'Maxi',
]

const secondStudentsPart = [
  'viaon',
  'raon',
  'naon',
  'habon',
  'neon',
  'stienon',
  'elleon',
  'idon',
  'ienon',
  'iason',
  'aminon',
  'teoon',
  'daon',
  'tienon',
  'audon',
  'ineon',
  'anneon',
  'henon',
  'medon',
  'kimon',
  'rreon',
  'goon',
  'éoon',
  'meon',
]

class Johnemon {
  constructor() {
    this.id = 0;
    this.name = this.generateRandomName();
    this.level = 1;
    this.maxLevel = 100;
    this.experienceMeter = 0;
    this.attackRange = this.getRandomNumber(1, 8);
    this.defenseRange = this.getRandomNumber(1, 3);
    this.baseHealthPool = this.getRandomNumber(10, 30);
    this.healthPool = this.baseHealthPool;
    this.catchPhrase = this.generateCatchPhrase();
    this.alive = true;
  }

  generateRandomName() {
    const firstStudentPart = firstStudentsPart[Math.floor(Math.random() * firstStudentsPart.length)];
    const secondStudentPart = secondStudentsPart[Math.floor(Math.random() * secondStudentsPart.length)];
    return `${firstStudentPart}${secondStudentPart}`;
  }

  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  generateCatchPhrase() {
    const catchPhrases = ["Let's fight together !", "Johnemon go !", "Time to fight !"];
    return catchPhrases[Math.floor(Math.random() * catchPhrases.length)];
  }

  attack(defender) {
    const damage = this.getRandomNumber(this.attackRange * this.level, this.attackRange) - defender.defenseRange;
    defender.healthPool -= damage;
    console.log(`${this.name} attacked ${defender.name} and dealt ${damage} damage!`);

    if (defender.healthPool <= 0) {
      defender.alive = false;
      console.log(`${defender.name} is KO!`);
    }
  }

  isAlive() {
    return this.healthPool > 0;
  }

  gainExperience(exp) {
    this.experienceMeter += exp;
    if (this.experienceMeter >= this.level * 10) {
      this.experienceMeter -= this.level * 10;
      this.level++;
      console.log(`${this.name} has leveled up! It is now level ${this.level}.`);
    }
  }
}

module.exports = Johnemon;
