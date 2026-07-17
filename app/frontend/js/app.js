const API = "/api/workouts";

async function loadWorkouts() {
    const res = await fetch(API);
    const workouts = await res.json();

    const list = document.getElementById("workoutList");

    list.innerHTML = "";

    workouts.forEach(workout => {

        list.innerHTML += `
            <div class="card">
                <h3>${workout.workoutName}</h3>

                <p>Duration: ${workout.duration} min</p>

                <p>Calories: ${workout.caloriesBurned}</p>

                <button onclick="deleteWorkout('${workout._id}')">
                    Delete
                </button>
            </div>
        `;
    });
}

async function addWorkout() {

    const workoutName =
        document.getElementById("workoutName").value;

    const duration =
        Number(document.getElementById("duration").value);

    const caloriesBurned =
        Number(document.getElementById("calories").value);

    await fetch(API, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            workoutName,
            duration,
            caloriesBurned
        })
    });

    loadWorkouts();
}

async function deleteWorkout(id) {

    await fetch(`${API}/${id}`, {

        method: "DELETE"
    });

    loadWorkouts();
}

document
    .getElementById("addBtn")
    .addEventListener("click", addWorkout);

loadWorkouts();
