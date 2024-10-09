import connection from "./dbConfig.js";

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
    this.johnemonMasterId = 0;
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

  async save(name, level, maxLevel, experienceMeter, attackRange, defenseRange, baseHealthPool,
             healthPool, johnemonMasterId, catchPhrase, alive) {
    try {
      this.name = name ?? this.name;
      this.level = level ?? this.level;
      this.maxLevel = maxLevel ?? this.maxLevel;
      this.experienceMeter = experienceMeter ?? this.experienceMeter;
      this.attackRange = attackRange ?? this.attackRange;
      this.defenseRange = defenseRange ?? this.defenseRange;
      this.baseHealthPool = baseHealthPool ?? this.baseHealthPool;
      this.healthPool = healthPool ?? this.healthPool;
      this.johnemonMasterId = johnemonMasterId ?? this.johnemonMasterId;
      this.catchPhrase = catchPhrase ?? this.catchPhrase;
      this.alive = alive ?? this.alive;

      const [result] = await connection.query(`
        INSERT INTO Johnemon (name, level, maxLevel, experienceMeter, attackRange, defenseRange, baseHealthPool,
                              healthPool, johnemonMasterId, catchPhrase, alive)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [this.name, this.level, this.maxLevel, this.experienceMeter, this.attackRange, this.defenseRange, this.baseHealthPool, this.healthPool, this.johnemonMasterId, this.catchPhrase, this.alive]);
      this.id = result.insertId ;
    } catch (error) {
      console.log(error)
    }
  }
}

export default Johnemon;
