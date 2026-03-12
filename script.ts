const input = document.getElementById("cityInput") as HTMLInputElement;
const ghost = document.getElementById("ghostInput") as HTMLInputElement;
const gomb = document.getElementById("getWeather") as HTMLButtonElement;
const kijelzo = document.getElementById("weatherResult") as HTMLDivElement;

const varosok = ["Budapest", "Miskolc", "Debrecen", "Szeged", "Berlin", "London", "Párizs", "New York", "Tokió", "Bécs", "Barcelona", "Madrid", "Róma"];

// 1. Szellemszöveg kezelése gépeléskor
input.addEventListener("input", () => {
    const ertek = input.value;
    if (ertek.length > 0) {
        // Megkeressük az első várost, ami így kezdődik
        const talalat = varosok.find(v => v.toLowerCase().startsWith(ertek.toLowerCase()));
        
        if (talalat) {
            // A ghost inputba beírjuk a gépelt szöveget + a maradékot a listából
            ghost.value = ertek + talalat.slice(ertek.length);
        } else {
            ghost.value = "";
        }
    } else {
        ghost.value = "";
    }
});

// 2. Billentyűzet kezelése (Enter, Esc, Tab, Nyíl)
input.addEventListener("keydown", (e) => {
    // ESC: Törli a halvány javaslatot
    if (e.key === "Escape") {
        ghost.value = "";
    }

    // TAB vagy JOBBRA NYÍL: Elfogadja a javaslatot
    if ((e.key === "ArrowRight" || e.key === "Tab") && ghost.value !== "") {
        e.preventDefault(); // Megakadályozzuk, hogy a Tab elugorjon a mezőről
        input.value = ghost.value;
        ghost.value = "";
    }

    // ENTER: Ha van javaslat, kitölti. Ha nincs (vagy már kitöltötte), lekérdez.
    if (e.key === "Enter") {
        if (ghost.value !== "" && input.value !== ghost.value) {
            input.value = ghost.value;
            ghost.value = "";
        } else {
            idojarasLekeres();
        }
    }
});

// 3. Az időjárás lekérése
async function idojarasLekeres() {
    const varosNev = input.value.trim();
    if (!varosNev) return;

    kijelzo.innerHTML = "Betöltés...";
    ghost.value = ""; // Lekéréskor ne zavarjon a javaslat

    try {
        // Koordináták lekérése a városnév alapján
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${varosNev}&count=1&language=hu&format=json`;
        const geoRes = await fetch(geoUrl);
        const geoData = await geoRes.json();

        if (geoData.results && geoData.results.length > 0) {
            const { latitude, longitude, name, country } = geoData.results[0];
            
            // Időjárás lekérése a koordináták alapján
            const wUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
            const wRes = await fetch(wUrl);
            const wData = await wRes.json();

            const temp = wData.current_weather.temperature;
            const wind = wData.current_weather.windspeed;

            kijelzo.innerHTML = `
                <h3>${name}, ${country}</h3>
                <div style="font-size: 2.5rem; margin: 10px 0;">${temp}°C</div>
                <p>Szélsebesség: ${wind} km/h</p>
            `;
        } else {
            kijelzo.innerHTML = "A várost nem találom!";
        }
    } catch (e) {
        kijelzo.innerHTML = "Hiba történt a hálózatban!";
        console.error(e);
    }
}

// Gombnyomásra is működjön
gomb.addEventListener("click", idojarasLekeres);