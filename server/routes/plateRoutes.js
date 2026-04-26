const express = require("express");
const router = express.Router();
const plateController = require("../controllers/plateController");
const upload = require("../middleware/upload");

router.post("/upload", upload.single("image"), plateController.uploadPlate);
router.get("/plates", plateController.getAllPlates);
router.get("/search", plateController.searchPlates);

module.exports = router;
