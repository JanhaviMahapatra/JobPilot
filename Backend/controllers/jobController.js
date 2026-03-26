const Job = require("../models/Job");
const mongoose = require("mongoose");

// Add Job
exports.addJob = async (req, res) => {
  try {
    const userId = req.user.id;
    const job = new Job({ ...req.body, user: userId });
    const savedJob = await job.save();
    res.status(201).json(savedJob);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Jobs
exports.getJobs = async (req, res) => {
  try {
    const userId = req.user.id;
    const jobs = await Job.find({ user: userId });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Job
exports.deleteJob = async (req, res) => {
  try {
    const userId = req.user.id;
    await Job.findOneAndDelete({ _id: req.params.id, user: userId });
    res.json({ message: "Job deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Status
exports.updateJob = async (req, res) => {
  try {
    const userId = req.user.id;
    const updated = await Job.findOneAndUpdate(
  { _id: req.params.id, user: userId },
  req.body,
  { returnDocument: "after"  }
);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get Stats
exports.getStats = async (req, res) => {
  try {
    const stats = await Job.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

