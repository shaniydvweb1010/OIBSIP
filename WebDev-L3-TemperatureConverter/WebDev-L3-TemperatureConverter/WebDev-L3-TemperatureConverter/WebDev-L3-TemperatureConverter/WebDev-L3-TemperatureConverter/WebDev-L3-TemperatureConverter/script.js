const temperatureInput = document.getElementById("temperature");
const unitSelect = document.getElementById("unit");
const convertBtn = document.getElementById("convertBtn");

const celsiusResult = document.getElementById("celsiusResult");
const fahrenheitResult = document.getElementById("fahrenheitResult");
const kelvinResult = document.getElementById("kelvinResult");

const errorMessage = document.getElementById("errorMessage");


convertBtn.addEventListener("click", function () {

    const value = parseFloat(temperatureInput.value);
    const unit = unitSelect.value;

    // Check empty or invalid input
    if (temperatureInput.value === "" || isNaN(value)) {
        errorMessage.textContent = "Please enter a valid number.";
        resetResults();
        return;
    }

    let celsius;
    let fahrenheit;
    let kelvin;


    // Convert input into Celsius first
    if (unit === "celsius") {

        celsius = value;

    } else if (unit === "fahrenheit") {

        celsius = (value - 32) * 5 / 9;

    } else if (unit === "kelvin") {

        celsius = value - 273.15;
    }


    // Absolute zero validation
    if (celsius < -273.15) {

        errorMessage.textContent =
            "Temperature cannot be below absolute zero (-273.15°C).";

        resetResults();
        return;
    }


    // Convert Celsius into all units
    fahrenheit = (celsius * 9 / 5) + 32;
    kelvin = celsius + 273.15;


    // Display results
    errorMessage.textContent = "";

    celsiusResult.textContent = celsius.toFixed(2) + " °C";
    fahrenheitResult.textContent = fahrenheit.toFixed(2) + " °F";
    kelvinResult.textContent = kelvin.toFixed(2) + " K";
});


function resetResults() {

    celsiusResult.textContent = "--";
    fahrenheitResult.textContent = "--";
    kelvinResult.textContent = "--";
}