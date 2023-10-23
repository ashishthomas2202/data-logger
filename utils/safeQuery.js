const DatabaseHelper = require("/databaseHelper");
const db = new DatabaseHelper("../data/log.db");

async function safeQuery(sql, params = [], retries = 3) {
  while (retries) {
    try {
      const result = await db.query(sql, params);
      return result;
    } catch (err) {
      if (err.message.includes("SQLITE_BUSY")) {
        console.warn("Database is busy, retrying...");
        retries--;
        await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for 100ms before retrying
      } else {
        throw err;
      }
    }
  }
  throw new Error("Failed to query the database after multiple retries.");
}

// Example Usage:
safeQuery("INSERT INTO tablename (column1, column2) VALUES (?, ?)", [
  "value1",
  "value2",
])
  .then((result) => console.log("Insert successful with ID:", result))
  .catch((err) => console.error("Failed to insert:", err));
