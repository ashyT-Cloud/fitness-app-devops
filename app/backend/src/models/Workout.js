const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema(
  {
    workoutName: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    caloriesBurned: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Workout", workoutSchema);
