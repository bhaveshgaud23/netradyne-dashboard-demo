const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({}, { strict: false });

module.exports = mongoose.model("Alert", alertSchema, "alerts");
