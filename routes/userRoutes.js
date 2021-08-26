const userController = require("../controllers/userController");
const express = require("express");
const router = express.Router();

// router.get("/all", userController.getAllUsers);
// router.get("/all/:id", userController.getUser);

router.post("/walk", userController.insertNewWalkFile);

module.exports = router;
