const express = require("express");
const router = express.Router();
const viewController = require("../controllers/viewController");

router.get("/", viewController.homePage);
router.get("/statistics", viewController.statisticsPage);

module.exports = router;
