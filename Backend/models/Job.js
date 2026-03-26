const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  link: String,
  status: {
    type: String,
    enum: ["Applied", "Interview", "Offer", "Rejected"],
    default: "Applied"
  },
  notes: String,
  deadline: Date,
  
  user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User"
},
isImportant: {
  type: Boolean,
  default: false
},
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Job", jobSchema);