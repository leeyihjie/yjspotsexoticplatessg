const db = require("../config/db");

// Upload plate image
exports.uploadPlate = (req, res) => {
  const plateNumber = req.body.plateNumber;
  const image = req.file.filename;

  const sql = "INSERT INTO plates (plate_number, image) VALUES (?, ?)";

  db.query(sql, [plateNumber, image], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ message: "Upload successful" });
  });
};

// Get all plates
exports.getAllPlates = (req, res) => {
  const sql = "SELECT * FROM plates ORDER BY id DESC";

  db.query(sql, (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
};

// Search plates
exports.searchPlates = (req, res) => {
  const plate = req.query.plate;

  const sql = `
    SELECT * FROM plates 
    WHERE plate_number LIKE ?
    ORDER BY plate_number
  `;

  db.query(sql, [`%${plate}%`], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
};
