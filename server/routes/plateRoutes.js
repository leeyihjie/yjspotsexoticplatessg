const express = require("express");
const router = express.Router();
const plateController = require("../controllers/plateController");
const upload = require("../middleware/upload");
const validatePlate = require("../middleware/validatePlate");

router.post(
  "/upload",
  validatePlate,
  upload.single("image"),
  plateController.uploadPlate,
);
router.get("/plates", plateController.getAllPlates);
router.get("/plates/:plateNumber", plateController.getPlateImages);
router.get("/search", plateController.searchPlates);

module.exports = router;
