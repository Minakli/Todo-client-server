const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  task: String,
  isChecked: Boolean,
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
