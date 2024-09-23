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
  'via',
  'ra',
  'na',
  'hab',
  'ne',
  'stien',
  'elle',
  'id',
  'ien',
  'ias',
  'amin',
  'teo',
  'da',
  'tien',
  'aud',
  'ine',
  'anne',
  'hen',
  'med',
  'kim',
  'rre',
  'go',
  'éo',
  'me',
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

  }

  gainExperience(opponentLevel) {

  }

  evolve() {

  }

  sayCatchPhrase() {

  }
}

module.exports = Johnemon;
