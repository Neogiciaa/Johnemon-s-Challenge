import connection from "./dbConfig.js";

class JohnemonWorld {
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

  async save() {
    const [result] = await connection.query(`
    INSERT INTO World (day)
    VALUES (?, ?)`, [this.day, this.JohnemonMasterId]);
    this.id = result.insertId ;
    console.log("World datas successfully saved.");
  }
}

export default JohnemonWorld;
