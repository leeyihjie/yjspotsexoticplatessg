const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },

  filename: (req, file, cb) => {
    const plateNumber = req.body.plateNumber;

    if (!plateNumber) {
      return cb(
        new Error("Plate number is required before uploading an image."),
      );
    }

    const sanitizedPlate = plateNumber
      .toUpperCase()
      .trim()
      .replace(/[^A-Z0-9]/g, "");

    const extension = path.extname(file.originalname);

    const filename = `${sanitizedPlate}_${Date.now()}${extension}`;

    cb(null, filename);
  },
});

const upload = multer({ storage });

module.exports = upload;
