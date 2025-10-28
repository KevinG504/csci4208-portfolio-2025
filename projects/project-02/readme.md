# WeatherTrends Dashboard

**Live URL:** https://KevinG504.github.io/Project2/ 
**External Repo:** https://github.com/KevinG504/Project2  

**How to Demo:**  
Open the live URL above.  
Enter city into text box.  
Hit enter or click 'Get Weather'.

---

**Summary:** A lightweight browser dashboard showing current and next-day temperatures for any city, with visual trend bars and persistent recent searches.

---

## Features

- Enter any city to view **current and next-day temperatures**  
- **Visual trend bars** indicate temperature changes between today and tomorrow  
- **Recent searches** tracked locally and rendered as clickable buttons  
- **Local-first persistence:** cloud-first load from JSONBin, fallback to localStorage  
- **Cloud sync (JSONBin):** saves recent cities across devices  
- Background refresh updates the last searched city every 5 minutes  

---

## Screenshots / Demo

![Dashboard Screenshot](docs/media/WeatherTrendsSS.png)  

---

## Live Demo / Install & Run

- **GitHub Pages:** https://KevinG504.github.io/weathertrends-dashboard/  
- **Local fallback:**  

```bash
git clone git@github.com:KevinG504/Project2.git
cd weathertrends-dashboard
npx http-server
```

**Requirements:** Designed for laptop ≥1280×720 and tablet ≥768px; fully keyboard & mouse accessible.

---

## How It Works

* **Rendering Stack:** Vanilla JS DOM + trend bar visualization for simplicity and responsiveness
* **Architecture Overview:**

  * `WeatherService.js` → fetches weather data from Open-Meteo and geocodes city via Nominatim
  * `UIManager.js` → renders input, trend bars, weather info, and recent search buttons
  * `StorageManager.js` → loads recent cities from JSONBin first, falls back to localStorage, saves locally and to cloud
  * `TrendVisualizer.js` → renders horizontal bars comparing today vs tomorrow temperatures
  * `app.js` → main entry point coordinating modules and background refresh
* **Local-First Behavior:** Recent cities persist across sessions. On load, the app first tries to fetch cities from JSONBin (cloud); if unavailable, it falls back to localStorage. New searches are saved locally and updated in the cloud asynchronously.

---

## Data & Networking (High-Level)

* **Public GET (Open-Meteo API):** current weather + tomorrow’s max temperature

  * **Reference:** `WeatherService.fetchWeather(city)` calls:

```js
const weatherRes = await fetch(METEO_URL(lat, lon));
const weatherData = await weatherRes.json();
```

```json
{
  "temp": 23,
  "wind": 10,
  "condition": "Clear",
  "tomorrowTemp": 25
}
```

* **Public GET (Nominatim / OpenStreetMap):** geocoding city to coordinates

  * **Reference:** `WeatherService.fetchWeather(city)` calls:

```js
const geoRes = await fetch(NOMINATIM_URL(city));
const geoData = await geoRes.json();
const { lat, lon } = geoData[0];
```

```json
[
  {
    "lat": "30.2672",
    "lon": "-97.7431",
    "display_name": "Austin, Texas, USA"
  }
]
```

* **Cloud write (JSONBin PUT):** stores last 3 searched cities

  * **Reference:** `StorageManager.saveCloud(city)` sends:

```json
{
  "timestamp": 1698412000000,
  "recentCities": ["Austin", "Dallas", "Houston"]
}
```

* **Cache & TTL:** Weather GET requests cached 5 minutes in `WeatherService.cache`; cloud writes overwrite previous record (last-write-wins).

---

## Configuration

N/A — no configurable options currently.

---

## License / Credits

* Open-Meteo API (for weather forecasts)
* OpenStreetMap / Nominatim (for geocoding)
* JSONBin.io (for cloud storage of recent cities)

---

## Developer Docs (Links)

All documentation is included in the `docs/` folder:

* `docs/pitch.md` → Project pitch and summary
* `docs/roadmap.md` → Roadmap and planned features
* `docs/architecture_sketch.md` → Architecture and module overview
* `docs/dod-sprint1.md` → Definition of Done for Sprint 1
* `docs/dod-sprint2.md` → Definition of Done for Sprint 2
* `docs/dod-sprint3.md` → Definition of Done for Sprint 3

---

### Modules & Classes Overview

**Modules:**

* `src/app.js` → main orchestrator, initializes UI and StorageManager
* `src/WeatherService.js` → fetches weather from Open-Meteo and geocodes via Nominatim
* `src/StorageManager.js` → manages localStorage and JSONBin cloud persistence
* `src/UIManager.js` → handles DOM rendering and user interaction
* `src/TrendVisualizer.js` → renders temperature trend bars
* `src/config.js` → contains API URLs and constants

