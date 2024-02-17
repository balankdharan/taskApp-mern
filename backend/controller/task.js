const Task = require("../models/task");

exports.getTask = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.addTask = async (req, res) => {
  const { text } = req.body;
  const newTask = new Task({ text, completed: false });
  try {
    await newTask.save();
    res.json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.editTask = async (req, res) => {
  const { id } = req.params;
  const { text, completed } = req.body;
  console.log("check", text, completed);
  try {
    await Task.findByIdAndUpdate(id, { text, completed });
    res.json({ message: "Task updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await Task.findByIdAndDelete(id);
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
