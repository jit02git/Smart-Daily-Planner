const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: String, required: true }, 
  dueTime: { type: String },
  repeat: { type: Boolean, default: false },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Medium",
  },
  category: { type: String },
  reminder: { type: String },
  status: { type: Boolean, default: false },
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;