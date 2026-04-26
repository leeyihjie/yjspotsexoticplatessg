const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  port: 2020, // Port Mapped
  user: "yjsepsgadmin",
  password: "1998Azazelsg@",
  database: "plates_db",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("MySQL Connected");
});

module.exports = db;
