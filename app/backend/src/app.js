const express = require("express");

const workoutRoutes = require("./routes/workoutRoutes");

const app = express();

app.use(express.json());

app.use("/api/workouts", workoutRoutes);
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    service: "FitTrack Backend",
    timestamp: new Date().toISOString(),
  });
});

module.exports = app;
