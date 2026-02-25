require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const { verifyToken, authorizeRoles } = require("./utils/roleMiddleware.js");

const app = express();
const PORT = process.env.PORT || 5000;

const Alert = require("./models/Alert");
const alertSchema = new mongoose.Schema({}, { strict: false });
const generateRandomAlert = require("./utils/generateAlert");

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));


app.use("/api/auth", authRoutes);
// app.use(verifyToken);

app.get(
  "/api/authority",
  verifyToken,
  authorizeRoles("AUTHORITY", "SUPER_ADMIN"),
  (req, res) => {
    res.json({ message: "Authority Access Granted" });
  }
);

app.get(
  "/api/superadmin",
  verifyToken,
  authorizeRoles("SUPER_ADMIN"),
  (req, res) => {
    res.json({ message: "Welcome Super Admin" });
  }
);

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
    const severity = req.body.severity || null;

    const alerts = [];

    for (let i = 0; i < count; i++) {
      alerts.push(generateRandomAlert(monthsBack, severity));
    }

    await Alert.insertMany(alerts);

    res.json({
      message: `${count} alerts generated`,
      monthsBack,
      severityFilter: severity || "NONE",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate alerts" });
  }
});

app.delete("/delete-all-alerts", async (req, res) => {
  try {
    const result = await Alert.deleteMany({});

    res.json({
      message: "All alerts deleted successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete alerts" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});