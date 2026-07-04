// middleware/validatePlate.js
module.exports = (req, res, next) => {
  const { plateNumber } = req.body;

  if (!plateNumber || !plateNumber.trim()) {
    return res.status(400).json({
      message: "Plate number is required.",
    });
  }

  next();
};
