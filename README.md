# 🏃‍♂️ Orienterings-analyse 🏃‍♀️

Dette prosjektet er en webapplikasjon for å hente inn, analysere og visualisere data fra orienteringsløp.

Applikasjonen er bygget med **React** i frontend og **Django** i backend, og kan blant annet hente resultater fra [WinSplits](https://obasen.orientering.se/winsplits/online/en/default.asp?ct=true) og koble seg til [Strava sitt API](https://developers.strava.com/) for å hente trenings- og aktivitetsdata.

Prosjektet er fortsatt under utvikling, men inneholder allerede fungerende funksjonalitet for å hente og analysere WinSplits-data. Strava-integrasjonen er under videre utvikling, og vil etter hvert brukes til mer detaljert analyse av aktiviteter, GPS-data og orienteringsløp.

---

## 📑 Innhold

* [✨ Funksjoner](#-funksjoner)
* [⚙️ Teknologi](#️-teknologi)
* [📋 Krav](#-krav)
* [🔧 Oppsett](#-oppsett)
* [🔑 Strava-autentisering](#-strava-autentisering)
* [▶️ Bruk](#️-bruk)
* [📊 WinSplits-analyse](#-winsplits-analyse)
* [🏃 Strava-analyse](#-strava-analyse)
* [📁 Struktur](#-struktur)
* [🚧 Videre utvikling](#-videre-utvikling)

---

## ✨ Funksjoner

* 💻 Webbasert grensesnitt for analyse av orienteringsdata.
* 🏃‍♂️ Henter og analyserer resultater fra **WinSplits**.
* 📊 Viser strekktider for løpere i et orienteringsløp.
* ⏱️ Beregner og viser akkumulert tid gjennom løpet.
* 🔗 Kobler frontend og backend gjennom et REST API.
* 🔐 Støtter autentisering mot **Strava API** gjennom OAuth.
* 🔄 Håndterer Strava access- og refresh-tokens gjennom backend.
* 📈 Tilrettelagt for videre analyse av Strava-aktiviteter og GPS-data.
* 🧩 Modulær oppbygning som gjør det mulig å legge til flere analyser og datakilder.

---

## ⚙️ Teknologi

Prosjektet består av en frontend og en backend.

### Frontend

Frontend er bygget med:

* ⚛️ **React**
* ⚡ **Vite**
* 🧭 **React Router**
* 📄 JavaScript / JSX
* 🎨 CSS

Frontend er publisert gjennom **GitHub Pages**:

[Orienterings-analyse](https://jhjelz.github.io/Orienterings-analyse/)

### Backend

Backend er bygget med:

* 🐍 **Python**
* 🌐 **Django**
* 🔌 **Django REST Framework**
* 🌍 **Requests**
* 🧹 **BeautifulSoup**

Backend fungerer som mellomledd mellom frontend og eksterne tjenester som Strava og WinSplits.

---

## 📋 Krav

For utvikling og lokal kjøring trenger du blant annet:

* 🐍 Python 3.8+
* 🟢 Node.js / npm
* 📦 Python-avhengighetene i `requirements.txt`
* 📦 Frontend-avhengighetene i `frontend/package.json`

Python-avhengigheter installeres med:

```bash
pip install -r backend/requirements.txt
```

Frontend-avhengigheter installeres med:

```bash
cd frontend
npm install
```

---

## 🔧 Oppsett

Prosjektet består av en React-frontend og en Django-backend.

### 1. 📥 Klon prosjektet

```bash
git clone https://github.com/JHjelz/Orienterings-analyse.git
cd Orienterings-analyse
```

### 2. 🐍 Sett opp backend

Gå til backend-mappen:

```bash
cd backend
```

Installer avhengigheter:

```bash
pip install -r requirements.txt
```

Start Django-serveren:

```bash
python manage.py runserver
```

Backend kjører da normalt på:

```text
http://127.0.0.1:8000/
```

### 3. ⚛️ Sett opp frontend

Gå til frontend-mappen:

```bash
cd frontend
```

Installer avhengigheter:

```bash
npm install
```

Start utviklingsserveren:

```bash
npm run dev
```

Frontend kjører da normalt på en lokal Vite-adresse, for eksempel:

```text
http://localhost:5173/
```

---

## 🔑 Strava-autentisering

Strava-integrasjonen bruker **OAuth** for å koble brukerens Strava-konto til applikasjonen.

For å bruke Strava-integrasjonen trenger du et eget API-oppsett hos Strava.

Gå til:

[Strava API Settings](https://www.strava.com/settings/api)

Her finner du blant annet:

* `Client ID`
* `Client Secret`

Du må også konfigurere riktig **Authorization Callback Domain** hos Strava.

### 🔐 Hvordan autentiseringen fungerer

Når brukeren velger **Koble til Strava** i applikasjonen:

1. 🌐 Frontend sender brukeren til backend sitt Strava-endepunkt.
2. 🔀 Backend oppretter en OAuth-lenke til Strava.
3. 🔓 Brukeren logger inn på Strava og godkjenner tilgangen.
4. ↩️ Strava sender brukeren tilbake til applikasjonens callback-endepunkt.
5. 🔑 Backend bruker authorization code til å hente:

   * `access_token`
   * `refresh_token`
   * `expires_at`
6. 💾 Token-informasjonen lagres i Django-sessionen.
7. 🔄 Backend kan fornye access token når det er nødvendig.

Applikasjonen trenger dermed ikke at brukeren manuelt kopierer authorization codes eller tokens inn i prosjektet.

⚠️ **Viktig:** `Client Secret` skal aldri legges inn i frontend-koden eller pushes til GitHub. Hemmelige verdier bør håndteres gjennom miljøvariabler på backend.

---

## ▶️ Bruk

Når applikasjonen er startet, åpnes frontend i nettleseren.

Forsiden gir tilgang til tre hovedområder:

### 🏃‍♂️ WinSplits

Her kan du lime inn en lenke til et WinSplits-resultat.

Eksempelvis kan du bruke en resultatlenke fra:

[WinSplits](https://obasen.orientering.se/winsplits/online/en/default.asp?ct=true)

Når du trykker **Hent data**, skjer følgende:

```text
WinSplits-lenke
      │
      ▼
React-frontend
      │
      ▼
Django API
      │
      ▼
WinSplits / O-Base
      │
      ▼
HTML-tabell
      │
      ▼
Parsing med BeautifulSoup
      │
      ▼
JSON
      │
      ▼
React
      │
      ▼
Analyse
```

### 🔐 Strava

Velg **Strava** fra menyen for å koble til Strava-kontoen din.

Når kontoen er koblet til, kan backend kommunisere med Strava API på vegne av brukeren.

Strava-delen er fortsatt under utvikling, og flere funksjoner vil bli bygget ut etter hvert.

### 🧮 Løpskalkulator

Løpskalkulatoren er foreløpig under utvikling og vil etter hvert inneholde beregninger relatert til orienteringsløp.

---

## 📊 WinSplits-analyse

WinSplits-modulen er per nå den mest komplette delen av applikasjonen.

Når en WinSplits-side hentes inn, leses resultatlisten og strekktidene blir behandlet og gjort om til sekunder.

Dataene organiseres omtrent slik:

```json
{
    "Løper": {
        "club": "Klubb",
        "splits": [
            92,
            145,
            81
        ]
    }
}
```

Strekktidene kan deretter brukes til videre analyse.

Applikasjonen viser blant annet:

* 👤 Løper
* 🏁 Strekktider
* ⏱️ Akkumulert tid
* 🏆 Plassering i datasettet

Eksempel:

```text
             Strekk 1     Strekk 2     Strekk 3
Løper A         1:32         2:25         1:21
Totalt          1:32         3:57         5:18
```

Analysemodulen er bygget slik at det senere kan legges til flere typer analyser.

Mulige analyser kan for eksempel være:

* 📉 Tap per strekk
* 🥇 Beste strekktid
* 📊 Sammenligning mellom løpere
* ⏱️ Akkumulert tidsutvikling
* 📈 Utvikling gjennom løpet

---

## 🏃 Strava-analyse

Strava-integrasjonen er under utvikling.

Det er allerede implementert støtte for:

* 🔑 OAuth-autentisering
* 🔐 Håndtering av access token
* 🔄 Fornyelse av access token
* 👤 Henting av utøverinformasjon fra Strava API

Det videre målet er å bruke Strava-data til blant annet:

* 🏃 Hente aktiviteter
* 🗺️ Analysere GPS-spor
* 📍 Se på ruter
* 📊 Analysere treningsdata
* ⏱️ Koble aktivitet og tidsdata mot orienteringsresultater

På sikt er målet å kunne kombinere data fra Strava og WinSplits for å få en mer detaljert analyse av orienteringsløp.

---

## 📁 Struktur

Prosjektet er organisert med frontend og backend som separate deler:

```text
ORIENTeRINGS-ANALYSE/
│
├── backend/
│   ├── api/
│   │   ├── strava/
│   │   │   ├── client.py          # 🏃 Strava API-klient
│   │   │   ├── views.py           # 🔗 Strava API-endepunkter
│   │   │   └── ...
│   │   │
│   │   ├── winsplits/
│   │   │   ├── views.py           # 📊 WinSplits API-endepunkt
│   │   │   ├── functionality/
│   │   │   │   └── winsplits_urls.py # 🔗 Henting/parsing av WinSplits
│   │   │   └── ...
│   │   │
│   │   └── ...
│   │
│   ├── config/
│   │   └── settings.py            # ⚙️ Django-konfigurasjon
│   │
│   ├── manage.py                   # ▶️ Django-startpunkt
│   └── requirements.txt            # 📦 Python-avhengigheter
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Strava/             # 🏃 Strava-komponenter
│   │   │   ├── WinSplits/          # 📊 WinSplits-komponenter
│   │   │   └── ...
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx            # 🏠 Forside
│   │   │   ├── StravaPage.jsx      # 🏃 Strava
│   │   │   ├── WinSplitsPage.jsx   # 📊 WinSplits
│   │   │   └── CalculatorPage.jsx  # 🧮 Løpskalkulator
│   │   │
│   │   ├── App.jsx                 # 🧭 Routing
│   │   └── main.jsx                # ▶️ React-startpunkt
│   │
│   ├── package.json                # 📦 Frontend-avhengigheter
│   └── ...
│
├── .gitignore
├── README.md                       # 📑 Dokumentasjon
└── ...
```

---

## 🚧 Videre utvikling

Prosjektet er fortsatt under utvikling, og planen er å bygge videre på de eksisterende modulene.

Noen av områdene som er aktuelle videre er:

* 🏃‍♂️ Fullføre Strava-integrasjonen
* 📊 Hente og vise Strava-aktiviteter
* 🗺️ Analysere GPS-spor
* 📈 Utvide WinSplits-analysene
* 🔄 Kombinere Strava- og WinSplits-data
* 🧮 Utvikle løpskalkulatoren
* 📊 Lage mer avanserte visualiseringer
* 🧩 Gjøre det enklere å legge til nye analysemoduler

Målet er å utvikle **Orienterings-analyse** til et verktøy som kan gi bedre innsikt i både resultatene og selve gjennomføringen av orienteringsløp.

---

## 🔗 Lenker

* 🌐 [Orienterings-analyse](https://jhjelz.github.io/Orienterings-analyse/)
* 💻 [GitHub Repository](https://github.com/JHjelz/Orienterings-analyse)
* 🏃 [Strava API](https://developers.strava.com/)
* ⚙️ [Strava API Settings](https://www.strava.com/settings/api)
* 🗺️ [WinSplits](https://obasen.orientering.se/winsplits/online/en/default.asp?ct=true)
