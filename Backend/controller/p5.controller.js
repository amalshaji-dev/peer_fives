const mongoose = require("mongoose");
const RewardHistory = require("../model/rewardHistory.model");
const User = require("../model/user.model");

exports.createP5Transaction = async (req, res) => {
  try {
    const { giverId, receiverId, point } = req.body;

    if (!giverId || !receiverId || !point) {
      throw new Error("Missing required fields: giverId, receiverId, point");
    }
    if (
      !mongoose.Types.ObjectId.isValid(giverId) ||
      !mongoose.Types.ObjectId.isValid(receiverId)
    ) {
      throw new Error("Ids passed are not valid mongoose ids");
    }

    if (Number(point) <= 0 || Number(point) > 100) {
      throw new Error("Invalid point: Must be between 1 and 100");
    }

    const giver = await User.findById(giverId);
    if (!giver) throw new Error("Giver user not found");

    const receiver = await User.findById(receiverId);
    if (!receiver) throw new Error("Receiver user not found");

    if (giver.p5Balance < Number(point)) {
      throw new Error("Insufficient P5 balance");
    }

    giver.p5Balance -= Number(point);
    receiver.rewardBalance += Number(point);

    const p5Transaction = await RewardHistory.create({
      givenBy: giverId,
      givenTo: receiverId,
      points: Number(point),
    });
    await p5Transaction.save();

    await giver.save();
    await receiver.save();

    res.status(201).json({ message: "Transaction succesull", p5Transaction });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllP5Transactions = async (req, res) => {
  try {
    const { userId } = req.params;
    const p5Transactions = await RewardHistory.find({
      givenBy: userId,
    }).populate({ path: "givenTo", select: "name" });
    res.json({ message: "P5 Transactions fetched", p5Transactions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const { rewardId } = req.params;
    const transaction = await RewardHistory.findById(rewardId);
    if (!transaction) throw new Error("Transaction not found");

    const giver = await User.findById(transaction.givenBy);
    const receiver = await User.findById(transaction.givenTo);

    giver.p5Balance += Number(transaction.points);
    receiver.rewardBalance -= Number(transaction.points);

    await giver.save();
    await receiver.save();

    await RewardHistory.findByIdAndDelete(rewardId);
    res.json({ message: "P5 Transactions deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllRewardTransactions = async (req, res) => {
  try {
    const { userId } = req.params;
    const rewardTransactions = await RewardHistory.find({
      givenTo: userId,
    }).populate({ path: "givenBy", select: "name" });
    res.json({ message: "Rewards fetched", rewardTransactions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.calculateRewardPoints = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    res.json({
      message: "Reward balance fetched",
      reward: user.rewardBalance,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.calculateP5Points = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    res.json({
      message: "P5 balance fetched",
      p5Points: user.p5Balance,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
