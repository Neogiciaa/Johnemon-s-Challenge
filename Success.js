import connection from "./dbConfig.js";

export default class Success {
  constructor() {
    this.id = 0;
    this.content = ""
    this.JohnemonMasterId = 0;
  }

  async save(content, JohnemonMasterId) {
    try {
      this.content = content ?? this.content;
      this.JohnemonMasterId = JohnemonMasterId ?? this.JohnemonMasterId;

      const [result] = await connection.query(`
        INSERT INTO Success (content, JohnemonMasterId) 
        VALUES (?, ?)
        `, [content, JohnemonMasterId]);
      this.id = result.insertId;
    } catch (error) {
      console.log(error);
    }
  }
}
