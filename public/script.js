// script.js

// DOM elements
const inputText   = document.getElementById('inputText');
const submitBtn   = document.getElementById('submit');
const locateBtn   = document.getElementById('locate');
const cityName    = document.getElementById('cityName');
const cloudPct    = document.getElementById('cloud_pct');
const temp        = document.getElementById('temp');
const humidity    = document.getElementById('humidity');
const weatherCard = document.querySelector('.weather-card');
const errorP      = document.getElementById('error');

// Hide card initially
weatherCard.style.display = 'none';

// Reset display fields
function resetData() {
  cityName.textContent = '--';
  temp.textContent      = '--';
  humidity.textContent  = '--';
  cloudPct.textContent  = '--';
  errorP.textContent    = '';
}

// Show error
function showError(msg) {
  errorP.textContent = msg;
  weatherCard.style.display = 'none';
}

// Core: fetch by city name (unchanged)
async function getWeather(city) {
  resetData();
  if (!city) { showError('Please enter a city name.'); return; }
  cityName.textContent = city.toUpperCase();

  try {
    // geocode
    const geo = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`);
    const geoData = await geo.json();
    if (!geoData.results?.length) throw new Error('City not found');
    const { latitude, longitude } = geoData.results[0];

    // forecast
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` +
      `&current_weather=true&hourly=relativehumidity_2m,cloudcover&timezone=auto`
    );
    const weatherData = await weatherRes.json();

    const cw = weatherData.current_weather;
    // match time robustly
    const ts  = new Date(cw.time).getTime();
    let idx    = weatherData.hourly.time.findIndex(t => new Date(t).getTime() === ts);
    if (idx < 0) idx = 0;

    temp.textContent     = cw.temperature;
    humidity.textContent = weatherData.hourly.relativehumidity_2m[idx] ?? '--';
    cloudPct.textContent = weatherData.hourly.cloudcover[idx] ?? '--';

    weatherCard.style.display = 'block';
  } catch (e) {
    showError(`Could not retrieve weather for "${city}". ${e.message}`);
  }
}

// New: fetch by GPS coords
async function getWeatherByCoords(lat, lon) {
  resetData();
  cityName.textContent = 'My Location';
  try {
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
      `&current_weather=true&hourly=relativehumidity_2m,cloudcover&timezone=auto`
    );
    const weatherData = await weatherRes.json();

    const cw = weatherData.current_weather;
    const ts  = new Date(cw.time).getTime();
    let idx    = weatherData.hourly.time.findIndex(t => new Date(t).getTime() === ts);
    if (idx < 0) idx = 0;

    temp.textContent     = cw.temperature;
    humidity.textContent = weatherData.hourly.relativehumidity_2m[idx] ?? '--';
    cloudPct.textContent = weatherData.hourly.cloudcover[idx] ?? '--';

    weatherCard.style.display = 'block';
  } catch (e) {
    showError(`Could not retrieve weather. ${e.message}`);
  }
}

// Event listeners
submitBtn.addEventListener('click', () => getWeather(inputText.value.trim()));
inputText.addEventListener('keypress', e => { if (e.key==='Enter') getWeather(inputText.value.trim()); });

locateBtn.addEventListener('click', () => {
  if (!navigator.geolocation) return showError('Geolocation not supported');
  navigator.geolocation.getCurrentPosition(
    pos => getWeatherByCoords(pos.coords.latitude, pos.coords.longitude),
    err => showError('Unable to retrieve your location: ' + err.message)
  );
});
