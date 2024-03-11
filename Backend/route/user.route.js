const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller"); // Import your controller

router.get("/", userController.getAllUsers);
router.post("/", userController.createUser);
router.get("/:id", userController.getUser);
router.patch("/:id", userController.editUser);

module.exports = router;
