require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

const Alert = require("./models/Alert");
const alertSchema = new mongoose.Schema({}, { strict: false });
const generateRandomAlert = require("./utils/generateAlert");

app.use(cors());
app.use(express.json());

// 🔹 CONNECT TO MONGODB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// 🔹 Flexible schema (since alerts have nested structure)
// const Alert = mongoose.model("Alert", alertSchema);

// 🔹 API to fetch alerts
app.get("/alerts", async (req, res) => {
  try {
    const alerts = await Alert.find().sort({ timestamp: -1 });
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch alerts" });
  }
});

app.post("/generate-alerts", async (req, res) => {
  try {
    const count = parseInt(req.body.count) || 1;
    const monthsBack = parseInt(req.body.monthsBack) || 0;

    const alerts = [];

    for (let i = 0; i < count; i++) {
      alerts.push(generateRandomAlert(monthsBack));
    }

    await Alert.insertMany(alerts);

    res.json({
      message: `${count} alerts generated within last ${monthsBack} month(s)`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate alerts" });
  }
});

// 🔹 Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
