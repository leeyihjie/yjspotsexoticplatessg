const mysql = require("mysql2");

// const db = mysql.createConnection({
//   host: "localhost",
//   port: 2020, // Port Mapped
//   user: "yjsepsgadmin",
//   password: "1998Azazelsg@",
//   database: "plates_db",
// });

const db = mysql.createPool({
  host: "localhost",
  user: "yjsepsgadmin",
  password: "1998Azazelsg@",
  port: 2020,
  database: "plates_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// db.connect((err) => {
//   if (err) {
//     console.error("Database connection failed:", err);
//     return;
//   }
//   console.log("MySQL Connected");
// });

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
