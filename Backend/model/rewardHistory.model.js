const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rewardHistorySchema = new Schema({
  datetime: { type: Date, default: Date.now },
  points: { type: Number, required: true },
  givenBy: { type: Schema.Types.ObjectId, ref: "User" },
  givenTo: { type: Schema.Types.ObjectId, ref: "User" },
});

const RewardHistory = mongoose.model("RewardHistory", rewardHistorySchema);
module.exports = RewardHistory;
