const Workout = require("../models/Workout");

// Create
exports.createWorkout = async (req, res) => {
    try {
        const workout = await Workout.create(req.body);
        res.status(201).json(workout);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Read All
exports.getWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find();
        res.json(workouts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Read One
exports.getWorkout = async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id);

        if (!workout) {
            return res.status(404).json({ message: "Workout not found" });
        }

        res.json(workout);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update
exports.updateWorkout = async (req, res) => {
    try {
        const workout = await Workout.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!workout) {
            return res.status(404).json({ message: "Workout not found" });
        }

        res.json(workout);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete
exports.deleteWorkout = async (req, res) => {
    try {
        const workout = await Workout.findByIdAndDelete(req.params.id);

        if (!workout) {
            return res.status(404).json({ message: "Workout not found" });
        }

        res.json({ message: "Workout deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
