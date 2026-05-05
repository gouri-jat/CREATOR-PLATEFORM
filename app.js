const express = require("express");
const app = express();
const connectDB = require("./db");
connectDB();

const authRoutes = require("./routes/authRoutes"); 
const blogRoutes = require("./routes/blogRoutes");
const creatorRoutes = require("./routes/creatorRoutes");

app.use(express.json());
app.use("/api/auth",authRoutes);
app.use("/api/blog",blogRoutes);
app.use("/api/creator",creatorRoutes);


module.exports = app;   