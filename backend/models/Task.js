import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: { type: String, default: "Pending" },
  assignedTo: String,
  dueDate: Date
});

export default mongoose.model("Task", taskSchema);