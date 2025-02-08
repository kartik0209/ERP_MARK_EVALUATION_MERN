const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const facultyRoutes = require("./router/facultyRoutes");
const adminRoutes = require("./router/adminRoutes");
const studentRoutes = require("./router/studentRoutes");
const authRoutes = require("./router/authRoutes");

const cors = require("cors"); // Import middleware

dotenv.config();
connectDB();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend's origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // If you need to handle cookies or authentication
  })
);

// Use express middleware directly
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/faculty", facultyRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/student", studentRoutes);
app.use("/api/v1/auth", authRoutes);

module.exports = app;
