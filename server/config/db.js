const mysql = require("mysql2");

const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 2020),
  user: process.env.DB_USER || "yjsepsgadmin",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || "plates_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Testing connection
db.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }

  console.log("MySQL Connected");
  connection.release();
});

module.exports = db;
