const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose
    .connect("mongodb://localhost:27017/smartdailyplanner")
    .then(() => console.log("✅ MongoDB connected successfully"))
    .catch((err) => console.error("❌ DB connection error:", err));
};

module.exports = connectDB;
