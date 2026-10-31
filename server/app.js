const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const eventRoutes = require("./routes/events");
const feedbackRoutes = require("./routes/feedback");

const app = express();

// ========================
// SECURITY MIDDLEWARE
// ========================

// Helmet — sets secure HTTP headers (CSP, X-Frame-Options, etc.)
app.use(helmet());

// Prevent NoSQL injection — strips $ and . from req.body/query/params
app.use(mongoSanitize());

// Parse cookies (needed for secure token cookies)
app.use(cookieParser());

// Parse JSON bodies
app.use(express.json());

// CORS — allow frontend origin
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);

// ========================
// DATABASE CONNECTION
// ========================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ========================
// ROUTES
// ========================
app.get("/", (req, res) => {
  res.status(200).json({ msg: "TechFest 2026 API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/feedback", feedbackRoutes);

// Export app for testing (don't call .listen here)
module.exports = app;
