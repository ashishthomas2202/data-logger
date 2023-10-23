const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("path_to_your_shared_sqlite_file.db");

function tableExists(tableName) {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT name FROM sqlite_master WHERE type='table' AND name=?`,
      [tableName],
      (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(!!row); // Converts row to a boolean; if row exists, it returns true, otherwise false.
        }
      }
    );
  });
}

// Usage:
// tableExists("yourTableName")
//   .then((exists) => {
//     if (exists) {
//       console.log("Table exists.");
//     } else {
//       console.log("Table does not exist. Setting up the database...");
//       // Here, you can run your schema setup or data seeding scripts.
//     }
//   })
//   .catch((err) => {
//     console.error("Failed to check table existence:", err);
//   });
