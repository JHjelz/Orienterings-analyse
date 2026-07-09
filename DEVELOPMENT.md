# 💻 Utviklingsflyt

Denne filen beskriver hvordan ny funksjonalitet utvikles.

Målet er:

✅ stabil `main`
🌿 én branch per funksjon
🚀 automatisk deploy

---

# 🌱 1. Opprett en branch

Eksempel

```
git switch -c 34-legg-til-kart
```

Forslag til navn

```
35-gpx-import
36-analyse-side
37-strava
38-kart
```

---

# 💻 2. Utvikle lokalt

## 🐍 Backend

```
cd backend
source venv/bin/activate
python manage.py runserver
```

## ⚛️ Frontend

```
cd frontend
npm run dev
```

Test underveis.

---

# 💾 3. Commit ofte

```
git add .
git commit -m "Legg til kartvisning"
```

💡 Små commits er enklere å forstå enn én stor.

---

# ☁️ 4. Push branchen

```
git push origin 34-legg-til-kart
```

Dette påvirker **ikke** produksjonssiden.

---

# 🔄 5. Lag Pull Request

På GitHub

```
Branch
     │
     ▼
Pull Request
```

🤖 GitHub Actions kjører automatisk tester.

---

# ✅ 6. Merge til main

Når alt fungerer:

Merge Pull Request.

Da skjer dette automatisk:

```
main
 │
 ▼
🤖 GitHub Actions
 │
 ├── 🧪 Tester
 ├── ⚛️ Bygger React
 ├── 🌍 GitHub Pages
 └── 🐍 Render
 │
 ▼
🚀 Live-side oppdatert
```

---

# 🌍 7. Kontroller produksjon

Åpne

https://jhjelz.github.io/Orienterings-analyse/

Sjekk:

✅ siden laster

✅ ingen Console-feil

✅ API fungerer

✅ ny funksjonalitet virker

---

# 🎉 8. Ferdig!

Begynn neste funksjon fra en ny branch.

Ikke jobb videre direkte på `main`.

---

# 💡 Filosofi

Én branch = én funksjon.

Eksempel

```
33-automatisk-deploy
34-kart
35-strava
36-gpx
37-analyse
```

Da blir Git-historikken enkel å lese.

---

# 📅 Typisk arbeidsdag

```
🌱 Lag branch

        │

💻 Kode

        │

🧪 Test

        │

💾 Commit

        │

☁️ Push

        │

🔄 Pull Request

        │

✅ Merge

        │

🤖 Automatisk deploy

        │

🌍 Live
```

Målet er at utviklingsprosessen skal være enkel, trygg og forutsigbar.