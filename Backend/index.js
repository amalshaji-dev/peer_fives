const express = require("express");
const mongoose = require("mongoose");
const dotEnv = require("dotenv");
const cors = require("cors");

const userRoutes = require("./route/user.route");
const p5Routes = require("./route/p5.route");

dotEnv.config();

const app = express();
app.use(cors());
// hardcoded values for convenience, env example added for values
const PORT = process.env.PORT || 5000;
const MONGO_DB_URI =
  process.env.MONGO_DB_URI ||
  "mongodb+srv://amalshaji:amal2001@cluster0.el5wg2w.mongodb.net/peer_fives";

mongoose
  .connect(MONGO_DB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

app.use(express.json());

app.use("/v1/user", userRoutes);
app.use("/v1/p5", p5Routes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
