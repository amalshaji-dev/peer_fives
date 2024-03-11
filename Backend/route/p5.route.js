const express = require("express");
const router = express.Router();
const P5Controller = require("../controller/p5.controller");

router.post("/", P5Controller.createP5Transaction);

router.get("/:userId", P5Controller.getAllP5Transactions);
router.get("/reward/:userId", P5Controller.getAllRewardTransactions);

router.get("/:userId/balance", P5Controller.calculateP5Points);
router.get("/:userId/reward/balance", P5Controller.calculateRewardPoints);

module.exports = router;
