var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var input = document.getElementById("cityInput");
var ghost = document.getElementById("ghostInput");
var gomb = document.getElementById("getWeather");
var kijelzo = document.getElementById("weatherResult");
var varosok = ["Budapest", "Miskolc", "Debrecen", "Szeged", "Berlin", "London", "Párizs", "New York", "Tokió", "Bécs", "Barcelona", "Madrid", "Róma"];
// 1. Szellemszöveg kezelése gépeléskor
input.addEventListener("input", function () {
    var ertek = input.value;
    if (ertek.length > 0) {
        // Megkeressük az első várost, ami így kezdődik
        var talalat = varosok.find(function (v) { return v.toLowerCase().startsWith(ertek.toLowerCase()); });
        if (talalat) {
            // A ghost inputba beírjuk a gépelt szöveget + a maradékot a listából
            ghost.value = ertek + talalat.slice(ertek.length);
        }
        else {
            ghost.value = "";
        }
    }
    else {
        ghost.value = "";
    }
});
// 2. Billentyűzet kezelése (Enter, Esc, Tab, Nyíl)
input.addEventListener("keydown", function (e) {
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
        }
        else {
            idojarasLekeres();
        }
    }
});
// 3. Az időjárás lekérése
function idojarasLekeres() {
    return __awaiter(this, void 0, void 0, function () {
        var varosNev, geoUrl, geoRes, geoData, _a, latitude, longitude, name_1, country, wUrl, wRes, wData, temp, wind, e_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    varosNev = input.value.trim();
                    if (!varosNev)
                        return [2 /*return*/];
                    kijelzo.innerHTML = "Betöltés...";
                    ghost.value = ""; // Lekéréskor ne zavarjon a javaslat
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 8, , 9]);
                    geoUrl = "https://geocoding-api.open-meteo.com/v1/search?name=".concat(varosNev, "&count=1&language=hu&format=json");
                    return [4 /*yield*/, fetch(geoUrl)];
                case 2:
                    geoRes = _b.sent();
                    return [4 /*yield*/, geoRes.json()];
                case 3:
                    geoData = _b.sent();
                    if (!(geoData.results && geoData.results.length > 0)) return [3 /*break*/, 6];
                    _a = geoData.results[0], latitude = _a.latitude, longitude = _a.longitude, name_1 = _a.name, country = _a.country;
                    wUrl = "https://api.open-meteo.com/v1/forecast?latitude=".concat(latitude, "&longitude=").concat(longitude, "&current_weather=true");
                    return [4 /*yield*/, fetch(wUrl)];
                case 4:
                    wRes = _b.sent();
                    return [4 /*yield*/, wRes.json()];
                case 5:
                    wData = _b.sent();
                    temp = wData.current_weather.temperature;
                    wind = wData.current_weather.windspeed;
                    kijelzo.innerHTML = "\n                <h3>".concat(name_1, ", ").concat(country, "</h3>\n                <div style=\"font-size: 2.5rem; margin: 10px 0;\">").concat(temp, "\u00B0C</div>\n                <p>Sz\u00E9lsebess\u00E9g: ").concat(wind, " km/h</p>\n            ");
                    return [3 /*break*/, 7];
                case 6:
                    kijelzo.innerHTML = "A várost nem találom!";
                    _b.label = 7;
                case 7: return [3 /*break*/, 9];
                case 8:
                    e_1 = _b.sent();
                    kijelzo.innerHTML = "Hiba történt a hálózatban!";
                    console.error(e_1);
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    });
}
// Gombnyomásra is működjön
gomb.addEventListener("click", idojarasLekeres);
