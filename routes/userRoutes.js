const userController = require("../controllers/userController");
const express = require("express");
const router = express.Router();

// router.get("/", userController.getAllUsers);
// router.get("/:id", userController.getUser);

router.post("/walk", userController.insertNewWalkFile);

module.exports = router;
