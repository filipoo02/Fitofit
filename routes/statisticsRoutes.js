const express = require("express");
const router = express.Router();
const statisticsController = require("../controllers/statisticsController");

router.get("/:type/:sum?/:byday?", statisticsController.getActivityFile);

module.exports = router;
