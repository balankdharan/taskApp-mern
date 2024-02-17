// server.js
const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require("morgan");
const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "./.env") });
const PORT = process.env.PORT || 5000;
const taskRoutes = require("./routes/task");

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// Connect to MongoDB
require("./db");

// API endpoints
app.use("/api/v1/task", taskRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
