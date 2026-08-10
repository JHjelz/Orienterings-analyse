# 🚀 Deploy av Orienterings-analyse

Denne filen beskriver hvordan prosjektet deployes og hvilke tjenester som brukes.

---

# 🏗️ Arkitektur

Prosjektet består av to deler:

```
               🌍 Bruker
                    │
                    ▼
          GitHub Pages (React)
                    │
          fetch("/api/...")
                    │
                    ▼
          Render (Django API)
                    │
                    ▼
                JSON-data
```

Frontend og backend deployes hver for seg.

---

# ⚛️ Frontend

📁 Plassering

```
frontend/
```

Bygget med

- React
- Vite

Publiseres til

✅ GitHub Pages

---

# 🐍 Backend

📁 Plassering

```
backend/
```

Bygget med

- Django
- Django REST Framework

Publiseres til

✅ Render

---

# ⚙️ Miljøvariabler

Frontend bruker

```
VITE_API_URL
```

Eksempel

```
VITE_API_URL=https://orienterings-analyse.onrender.com
```

Denne brukes av React når den kommuniserer med Django.

---

# 🚀 Første gangs deploy

## 🐍 Backend

1️⃣ Opprett en Web Service på Render

2️⃣ Koble den til GitHub-repoet

3️⃣ Installer avhengigheter

```
pip install -r backend/requirements.txt
```

4️⃣ Start Django

```
cd backend && gunicorn config.wsgi
```

---

## ⚛️ Frontend

React bygges med

```
npm run build
```

Resultatet havner i

```
frontend/dist
```

GitHub Actions publiserer deretter denne automatisk til GitHub Pages.

---

# 🤖 Automatisk deploy

Når det pushes til `main`

```
git push
      │
      ▼
GitHub
      │
      ├── 🧪 Kjører CI
      ├── ⚛️ Bygger React
      ├── 🌍 Oppdaterer GitHub Pages
      └── 🐍 Render deployer Django
```

Ingen manuelle deploy-kommandoer skal være nødvendig.

---

# 🌍 Produksjonslenker

Frontend

https://jhjelz.github.io/Orienterings-analyse/

Backend

https://orienterings-analyse.onrender.com/

API-test

https://orienterings-analyse.onrender.com/api/hello/

---

# 💻 Lokal utvikling

## 🐍 Backend

```
cd backend
source venv/bin/activate
python manage.py runserver
```

## ⚛️ Frontend

```
cd frontend
npm install
npm run dev
```

Frontend

```
http://localhost:5173
```

Backend

```
http://127.0.0.1:8000
```

---

# ✅ Oppsummering

Deploy skal fungere slik:

```
git push main
        │
        ▼
🤖 GitHub Actions
        │
        ├── bygger React
        ├── publiserer GitHub Pages
        └── Render deployer backend
        │
        ▼
🌍 Live-side oppdatert
```