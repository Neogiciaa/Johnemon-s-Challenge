import connection from "./dbConfig.js";

export default class JohnemonWorld {
  constructor() {
    this.id = 0;
    this.day = 1;
    this.JohnemonMasterId = 0;
  }

  oneDayPasses() {
    this.day += 1;
  }

  randomizeEvent() {

  }

  async save(day, JohnemonMasterId) {
    this.day = day ?? this.day;
    this.JohnemonMasterId = JohnemonMasterId ?? this.JohnemonMasterId;

    try {
      const [result] = await connection.query(`
          INSERT INTO World (day)
          VALUES (?, ?)`, [this.day]);
      this.id = result.insertId;
    } catch (error) {
      console.log(error);
    }
  }
}
