const express = require("express");
const router = express.Router();
const calcDistanceController = require("../controllers/calcDistanceController");

router.post(
  "/",
  calcDistanceController.getCoords,
  calcDistanceController.getDistance
);

module.exports = router;
