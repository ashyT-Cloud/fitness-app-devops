const button = document.getElementById("checkBtn");
const output = document.getElementById("output");

button.addEventListener("click", async () => {
    output.textContent = "Checking backend...";

    try {
        const response = await fetch("http://localhost:3000/health");
        const data = await response.json();

        output.textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        output.textContent = "Error connecting to backend.\n\n" + error;
    }
});
