const express = require("express");
const router = express.Router();
const distanceController = require("../controllers/distanceController");

router.post(
  "/insert",
  distanceController.getCoords,
  distanceController.getDistance,
  distanceController.insertNewWalk
);

module.exports = router;
