# 🌤️ Weather App (Node.js + Express + Open-Meteo API)

This is a full-stack weather application that allows users to:
- Search weather by city name
- Fetch weather using their current GPS location
- View temperature, humidity, and cloud cover

It uses the **Open-Meteo API** (no API key needed) and is built with:
- **HTML, CSS, JavaScript** (frontend)
- **Node.js + Express** (backend)

---

## 🚀 Features

- Search any city and get real-time weather
- Auto-fetch weather using browser location
- Clean, responsive UI (dark themed)
- Error handling for invalid city or GPS denial

---

## 🗂️ Project Structure

```
weather-app/
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── server.js
├── package.json
├── README.md
```

---

## 🔧 Setup (Local)

1. **Clone the repository**
```bash
https://github.com/your-username/weather-app.git
cd weather-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the server**
```bash
npm start
```

4. **Visit in browser**
```
http://localhost:3000
```

---

## 🌐 Deploying Online

### ✅ Option 1: Deploy to [Render](https://render.com)
1. Push your project to GitHub
2. Go to Render > New Web Service
3. Connect your repo, choose Node.js
4. Set build command: `npm install`
5. Set start command: `node server.js`


---

## 📦 Dependencies

- express

---

## 📡 API Used

- [Open-Meteo](https://open-meteo.com/) – free weather API
  - `/v1/search` for city → coords
  - `/v1/forecast` for weather data

---

## 🙌 Author

Made with ❤️ by SHOUNOK DATTA

---

## 📃 License

This project is licensed under the MIT License.
