
const weatherApi = "https://api.weather.gov/alerts/active?area=";

const stateInput = document.getElementById("state-input");
const fetchButton = document.getElementById("fetch-alerts");
const alertsDisplay = document.getElementById("alerts-display");
const errorMessage = document.getElementById("error-message");

async function fetchWeatherData(state) {
  const stateCode = state.trim().toUpperCase();

  if (!/^[A-Z]{2}$/.test(stateCode)) {
    displayError("Please enter a valid two-letter state abbreviation.");
    return;
  }

  try {
    const response = await fetch(
      `https://api.weather.gov/alerts/active?area=${stateCode}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch weather alerts.");
    }

    const data = await response.json();

    console.log(data);
    displayWeather(data);
  } catch (error) {
    displayError(error.message);
  }
}

function displayWeather(data) {
  alertsDisplay.innerHTML = "";

  errorMessage.textContent = "";
  errorMessage.classList.add("hidden");

  const alerts = data.features || [];

  const summary = document.createElement("p");
  summary.textContent = `${data.title || "Weather Alerts"}: ${alerts.length}`;

  alertsDisplay.appendChild(summary);

  alerts.forEach((alert) => {
    const headline = document.createElement("p");

    headline.textContent =
      alert.properties?.headline || "No headline available";

    alertsDisplay.appendChild(headline);
  });
}

function displayError(message) {
  alertsDisplay.innerHTML = "";

  errorMessage.textContent = message;
  errorMessage.classList.remove("hidden");
}

fetchButton.addEventListener("click", async () => {
  const state = stateInput.value;

  stateInput.value = "";

  alertsDisplay.innerHTML = "";
  errorMessage.textContent = "";
  errorMessage.classList.add("hidden");

  await fetchWeatherData(state);
});
