const db = require("../config/db");

// Upload plate image
exports.uploadPlate = (req, res) => {
  const plateNumber = req.body.plateNumber?.toUpperCase().trim();
  const takenAt = req.body.takenAt || new Date();
  const userId = req.body.userId || null;

  if (!plateNumber) {
    return res.status(400).json({
      message: "Plate number is required.",
    });
  }

  if (!req.file) {
    return res.status(400).json({
      message: "Image of car with plate is required.",
    });
  }

  const image = req.file.filename;

  // Check if other images of plate already exists
  const checkExistingPlatesQuery =
    "SELECT id FROM plates WHERE plate_number = ?";
  const platesSql = "INSERT INTO plates (plate_number) VALUES (?)";

  db.query(checkExistingPlatesQuery, [plateNumber], (err, result) => {
    if (err) {
      console.error("uploadPlate Error: ", err);
      return res.status(500).json(err);
    }

    if (result.length > 0) {
      const plateId = results[0].id;

      insertImage(plateId);
    } else {
      // Create record in plates table
      db.query(platesSql, [plateNumber], (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json(err);
        }

        insertImage(result.insertId);
      });
    }
    res.json({ message: "Upload successful" });
  });

  // Helper function
  function insertImage(plateId) {
    db.query(
      `
            INSERT INTO plate_images
            (
                plate_id,
                user_id,
                image_path,
                taken_at
            )
            VALUES
            (?, ?, ?, ?)
            `,
      [plateId, userId, image, takenAt],
      (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json(err);
        }

        res.json({
          message: "Upload successful.",
        });
      },
    );
  }
};

// Get all plates
exports.getAllPlates = (req, res) => {
  const sql = `
        SELECT
            p.id,
            p.plate_number,
            COUNT(pi.id) AS image_count
        FROM plates p
        LEFT JOIN plate_images pi
            ON p.id = pi.plate_id
        GROUP BY p.id
        ORDER BY p.plate_number
    `;
  db.query(sql, (err, result) => {
    if (err) {
      console.error("getAllPlates error: ", err);
      return res.status(500).json(err);
    }
    res.json(result);
  });
};

// Get all images for one plate
exports.getPlateImages = (req, res) => {
  const plateNumber = req.params.plateNumber.toUpperCase();

  const sql = `
        SELECT
            pi.id,
            pi.image_path,
            pi.taken_at,
            pi.created_at,
            u.username
        FROM plates p
        INNER JOIN plate_images pi
            ON p.id = pi.plate_id
        LEFT JOIN users u
            ON pi.user_id = u.id
        WHERE p.plate_number = ?
        ORDER BY pi.taken_at DESC
    `;

  db.query(sql, [plateNumber], (err, results) => {
    if (err) {
      console.error("getPlateImages error: ", err);
      return res.status(500).json(err);
    }

    res.json(results);
  });
};

// Search plates
exports.searchPlates = (req, res) => {
  const plate = req.query.plate.toUpperCase();

  const sql = `
        SELECT
            id,
            plate_number
        FROM plates
        WHERE plate_number LIKE ?
        ORDER BY plate_number
        LIMIT 50
    `;

  db.query(sql, [`%${plate}%`], (err, result) => {
    if (err) {
      console.error("searchPlates error: ", err);
      return res.status(500).json(err);
    }
    res.json(result);
  });
};
