const express = require("express");
const cors = require("cors");
const courseRoutes = require("./routes/courseRoutes");
const authRoutes = require("./routes/authRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes");
const videoRoutes = require("./routes/videoRoutes");
const progressRoutes = require("./routes/progressRoutes");
const paymentRoutes = require("./routes/paymentRoutes"); // 1. Yahan add karo
require("dotenv").config();

const app = express();

// CORS configuration
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));

app.use(express.json());

// Routes
app.use("/api", authRoutes);
app.use("/api", courseRoutes);
app.use("/api", enrollmentRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api", paymentRoutes); // 2. Yahan payment routes add karo

app.get("/api/test", (req, res) => {
  res.json({ message: "Backend working fine 🚀" });
});

app.get("/", (req, res) => {
  res.send("Backend Working");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Started on Port ${PORT}`);
});