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
    this.name = this.generateRandomName();
    this.level = 1;
    this.experienceMeter = 0;
    this.attackRange = this.getRandomNumber(1, 8);
    this.defenseRange = this.getRandomNumber(1, 3);
    this.healthPool = this.getRandomNumber(10, 30);
    this.catchPhrase = this.generateCatchPhrase();
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
  }

  gainExperience(opponentLevel) {
    const experienceGain = this.getRandomNumber(1, 5) * opponentLevel;
    this.experienceMeter += experienceGain;
    console.log(`${this.name} gained ${experienceGain} experience points!`);
    if (this.experienceMeter >= this.level * 100) {
      this.evolve();
    }
  }

  evolve() {
    this.level += 1;
    const attackIncrease = this.getRandomNumber(1, 5);
    const defenseIncrease = this.getRandomNumber(1, 5);
    const healthIncrease = this.getRandomNumber(1, 5);
    this.attackRange += attackIncrease;
    this.defenseRange += defenseIncrease;
    this.healthPool += healthIncrease;
    console.log(`${this.name} evolved into a higher level! New stats: Level ${this.level}, Attack Range ${this.attackRange}, Defense Range ${this.defenseRange}, Health Pool ${this.healthPool}`);
  }

  sayCatchPhrase() {
    console.log(`${this.name} says: "${this.catchPhrase}"`);
  }
}

module.exports = Johnemon
