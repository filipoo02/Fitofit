const express = require("express");
const router = express.Router();
const statisticsController = require("../controllers/statisticsController");

router.get("/weekly/:sortDay?", statisticsController.getWeeklyActivity);
router.get("/monthly", statisticsController.getMonthlyActivity);

module.exports = router;
