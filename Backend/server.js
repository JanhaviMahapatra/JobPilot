const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

//middleware
app.use(cors());
app.use(express.json());

//connecting mongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

//routes
const jobRoutes = require("./routes/jobRoutes");
const authRoutes = require("./routes/authRoutes");


app.use("/api/jobs", jobRoutes);
app.use("/api/auth", authRoutes);

app.listen(5000, () => {
console.log("Server running on port 5000");
});