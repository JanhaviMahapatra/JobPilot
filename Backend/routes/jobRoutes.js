const express = require("express");
const router = express.Router();
const {
  addJob,
  getJobs,
  deleteJob,
  updateJob,
  getStats
} = require("../controllers/jobController");

const auth = require("../middleware/auth");

router.post("/", auth, addJob);
router.get("/", auth, getJobs);
router.delete("/:id", auth, deleteJob);
router.put("/:id", auth, updateJob);
router.get("/stats", auth, getStats);

module.exports = router;