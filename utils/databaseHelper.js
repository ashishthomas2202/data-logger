const sqlite3 = require("sqlite3").verbose();

class DatabaseHelper {
  constructor(dbFilePath) {
    this.db = new sqlite3.Database(dbFilePath);
  }

  query(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      });
    });
  }

  close() {
    return new Promise((resolve, reject) => {
      this.db.close((err) => {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
  }
}

module.exports = DatabaseHelper;
