import express from "express";
import Task from "../models/Task.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// CREATE
router.post("/", verifyToken, async (req, res) => {
  const task = await Task.create(req.body);
  res.json(task);
});

//READ
router.get("/", verifyToken, async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// DELETE
router.delete("/:id", verifyToken, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

// UPDATE TASK (edit title + description)
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: "Update failed" });
  }
});

export default router;