const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());

const ALERT_FILE = "./alerts.json";

// API to fetch alerts
app.get("/alerts", (req, res) => {
  fs.readFile(ALERT_FILE, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read alerts" });
    }
    res.json(JSON.parse(data));
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
