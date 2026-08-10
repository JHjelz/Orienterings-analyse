# 🚀 DEPLOY.md
# Fra tom mappe til en live React + Django-applikasjon

Velkommen! 👋

Denne filen er skrevet som en steg-for-steg-oppskrift på hvordan prosjektet **Orienterings-analyse** er bygget opp og deployet.

Målet er at både jeg (om seks måneder 😄) og andre skal kunne følge denne guiden fra start til slutt uten å måtte lete rundt på internett.

Dokumentasjonen forklarer ikke bare **hva** som skal gjøres, men også **hvorfor**.

---

# 🎯 Målet

Vi ønsker å ende opp med en nettside som alle kan besøke.

Brukeren skal **ikke** måtte:

- åpne terminaler
- starte React
- starte Django
- installere noe

Brukeren skal bare skrive inn en nettadresse.

Eksempel:

```
https://jhjelz.github.io/Orienterings-analyse/
```

Når siden åpnes skal dette skje:

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

            Python-kode

                 │

                 ▼

             JSON-data
```

React viser brukergrensesnittet.

Django gjør beregninger og sender data tilbake.

---

# 🤔 Hvorfor dele frontend og backend?

Dette er en veldig vanlig arkitektur.

React er ekstremt god på:

- flotte nettsider
- knapper
- menyer
- kart
- grafer
- interaktivitet

Django er ekstremt god på:

- Python
- API-er
- databaser
- autentisering
- tunge beregninger

Ved å la hver teknologi gjøre det den er best på får vi et ryddig prosjekt.

---

# 📁 Prosjektstruktur

Prosjektet ser slik ut:

```
Orienterings-analyse/

│

├── frontend/
│      React + Vite
│
├── backend/
│      Django
│
├── python/
│      Analysekode
│
├── .github/
│      GitHub Actions
│
└── README.md
```

## 📂 frontend/

Her ligger alt som brukeren ser.

Eksempler:

- knapper
- menyer
- kart
- tabeller
- React-komponenter

Denne delen kjøres i nettleseren.

---

## 📂 backend/

Her ligger Django.

Backend har ansvar for:

- API
- Python-kode
- database
- autentisering
- kommunikasjon med React

Backend kjøres på Render.

---

## 📂 python/

Her ligger analysekoden.

Tanken er at Django etter hvert skal bruke denne mappen til å utføre beregninger.

Det gjør at selve analysekoden blir uavhengig av nettsiden.

---

## 📂 .github/

Denne mappen inneholder GitHub Actions.

GitHub Actions er små programmer som GitHub kjører automatisk.

Eksempel:

```
Push til main

↓

Kjør tester

↓

Bygg React

↓

Publiser nettsiden
```

Dette gjør at vi slipper å deploye manuelt.

---

# ⚛️ Del 1 – Opprette React

## 🤔 Hva er React?

React er et JavaScript-bibliotek utviklet av Meta.

React gjør det enkelt å bygge moderne nettsider.

I stedet for å skrive én stor HTML-side deles siden opp i små komponenter.

Eksempel:

```
Nettside

│

├── Meny
├── Kart
├── Resultatliste
├── Graf
└── Footer
```

Hver del kan utvikles uavhengig.

Det gjør store prosjekter mye enklere.

---

## ⚡ Hvorfor Vite?

Tidligere brukte nesten alle Create React App.

I dag brukes som regel Vite.

Fordeler:

✅ rask oppstart

✅ rask bygging

✅ moderne

✅ veldig populært

---

## 💻 Installer Node.js

React trenger Node.js.

Kontroller at Node er installert:

```
node -v
```

Kontroller npm:

```
npm -v
```

Hvis begge kommandoene gir et versjonsnummer er alt klart.

---

## 📁 Opprett frontend

Fra prosjektmappen:

```
npm create vite@latest frontend -- --template react
```

Her skjer flere ting:

```
npm create
```

starter et nytt prosjekt.

```
vite
```

er verktøyet som bygger React-prosjektet.

```
frontend
```

blir navnet på mappen.

```
react
```

forteller at vi ønsker React som rammeverk.

---

## 📦 Installer pakkene

Gå inn i prosjektet:

```
cd frontend
```

Installer alle nødvendige pakker:

```
npm install
```

Dette oppretter blant annet:

```
node_modules/
```

Denne mappen inneholder alle bibliotekene React trenger.

💡 Den kan bli veldig stor, og skal aldri pushes til Git.

---

## ▶️ Start React

Start utviklingsserveren:

```
npm run dev
```

Du vil se noe lignende:

```
Local:

http://localhost:5173/
```

Åpne denne adressen i nettleseren.

Hvis du ser React-logoen:

🎉 Gratulerer!

Frontend fungerer.

---

# 🐍 Del 2 – Opprette Django

Nå som frontend er på plass, er det på tide å bygge prosjektets backend.

Mens React har ansvar for alt brukeren ser, skal Django ha ansvar for alt som skjer "bak kulissene".

Eksempler:

* beregninger
* database
* brukerinnlogging
* API
* kommunikasjon med React

Django blir derfor prosjektets "motor".

---

# 🤔 Hva er Django?

Django er et rammeverk skrevet i Python.

Et rammeverk (framework) kan sees på som et ferdig skjelett som hjelper oss å bygge en applikasjon.

I stedet for å skrive alt fra bunnen av får vi blant annet:

✅ URL-håndtering

✅ database

✅ administrasjonspanel

✅ sikkerhet

✅ innlogging

✅ API-støtte

Dermed kan vi bruke tiden på å lage funksjonaliteten vi faktisk ønsker.

**Eksempel:**

Brukeren klikker:

```
Vis analysen
```

React sender en forespørsel til Django.

Django gjør beregningen.

Resultatet sendes tilbake som JSON.

React viser resultatet.

Dette kalles et API.

```
React

↓

HTTP

↓

Django

↓

Python

↓

JSON

↓

React
```

---

# 📁 Opprett backend-mappen

Fra prosjektets rotmappe opprettes en egen mappe til backend.

Eksempel:

```text
Orienterings-analyse/

├── frontend/
├── backend/
└── python/
```

Gå inn i backend:

```bash
cd backend
```

Alt som har med Django å gjøre skal ligge her.

---

# 🧪 Virtuelle miljøer

## 🤔 Hvorfor trenger vi et virtuelt miljø?

Python-programmer bruker ofte forskjellige versjoner av de samme bibliotekene.

Prosjekt A kan bruke:

```
Django 4
```

mens prosjekt B bruker:

```
Django 5
```

Hvis begge installeres globalt på maskinen, kan de begynne å krangle med hverandre.

Løsningen er et **virtuelt miljø**.

Et virtuelt miljø er en egen liten Python-installasjon som bare dette prosjektet bruker.

Da påvirker ikke prosjektene hverandre.

---

## 📦 Opprett et virtuelt miljø

Kjør:

```bash
python3 -m venv venv
```

Etterpå ser prosjektet omtrent slik ut:

```text
backend/

├── venv/
```

Mappen `venv` inneholder en lokal kopi av Python og alle bibliotekene prosjektet trenger.

💡 Denne mappen skal **ikke** pushes til GitHub.

---

## ▶️ Aktiver miljøet

### Linux / macOS

```bash
source venv/bin/activate
```

### Windows

```powershell
venv\Scripts\activate
```

Når miljøet er aktivt vil terminalen som regel vise:

```text
(venv)
```

foran kommandolinjen.

Eksempel:

```text
(venv) jakobhjelseth@penguin:~/Orienterings-analyse/backend$
```

Dette betyr at alle Python-kommandoer nå kjøres inne i prosjektets virtuelle miljø.

---

# 📥 Installer Django

Når det virtuelle miljøet er aktivt installeres Django.

```bash
pip install django
```

Kontroller gjerne installasjonen:

```bash
python -m django --version
```

Du bør få skrevet ut versjonsnummeret.

---

# 🏗️ Opprett Django-prosjektet

Vi trenger nå selve Django-prosjektet.

Kjør:

```bash
django-admin startproject config .
```

Legg merke til punktumet (`.`) på slutten.

Det gjør at prosjektet opprettes i den mappen vi allerede står i.

Etterpå ser prosjektet omtrent slik ut:

```text
backend/

├── config/
│
├── manage.py
│
└── venv/
```

---

# 📂 Hva er disse filene?

## manage.py

Dette er kontrollsenteret til Django.

Nesten alle kommandoer kjøres gjennom denne filen.

Eksempler:

```bash
python manage.py runserver
```

Starter utviklingsserveren.

```bash
python manage.py migrate
```

Oppretter databasen.

```bash
python manage.py createsuperuser
```

Oppretter administrator.

---

## config/

Denne mappen inneholder selve prosjektets innstillinger.

De viktigste filene er:

```
settings.py
```

Prosjektets konfigurasjon.

Her finner vi blant annet:

* installerte apper
* database
* språk
* tidsone
* sikkerhet

---

```
urls.py
```

Prosjektets URL-er.

Denne filen bestemmer hva som skal skje når noen besøker ulike adresser.

Eksempel:

```
/admin/

/api/

/login/
```

---

```
wsgi.py
```

Brukes når prosjektet kjøres i produksjon.

Denne trenger vi sjelden å endre.

---

```
asgi.py
```

Brukes dersom prosjektet senere skal støtte moderne asynkrone funksjoner.

Den lar vi også være i fred.

---

# ▶️ Start Django

Nå er vi klare til å starte serveren.

Kjør:

```bash
python manage.py runserver
```

Hvis alt fungerer vil du se noe lignende:

```text
Starting development server at

http://127.0.0.1:8000/
```

Åpne denne adressen i nettleseren.

Hvis du ser Django sin velkomstside:

🎉 Gratulerer!

Backend fungerer.

---

# 🧪 Vanlige feil

## ❌ No module named django

Eksempel:

```text
ModuleNotFoundError:
No module named 'django'
```

Dette betyr nesten alltid at det virtuelle miljøet ikke er aktivert.

Løsning:

```bash
source venv/bin/activate
```

Installer deretter Django på nytt hvis nødvendig.

---

## ❌ python: command not found

Prøv:

```bash
python3
```

i stedet.

På mange Linux-distribusjoner peker `python` ikke automatisk til Python 3.

---

## ❌ Port 8000 er allerede i bruk

Hvis du allerede har en Django-server kjørende får du en feilmelding.

Du kan enten stoppe den gamle serveren (`Ctrl+C`) eller starte på en annen port:

```bash
python manage.py runserver 8001
```

---

# 🎉 Oppsummering

Vi har nå:

✅ opprettet en backend-mappe

✅ laget et virtuelt miljø

✅ installert Django

✅ opprettet prosjektet

✅ startet utviklingsserveren

Foreløpig gjør Django egentlig ingenting.

I neste kapittel skal vi bygge vårt første API slik at React kan hente data fra Django.

---

# 🔌 Del 3 – Koble React og Django

Nå har vi to programmer som fungerer hver for seg.

React kjører på:

```
http://localhost:5173
```

Django kjører på:

```
http://127.0.0.1:8000
```

Problemet er at de **ikke kjenner til hverandre**.

I dette kapittelet skal vi koble dem sammen slik at React kan hente data fra Django.

---

# 🎯 Målet

Når React åpnes i nettleseren ønsker vi at dette skal skje:

```
            React

               │

        fetch("/api/hello/")

               │

               ▼

            Django

               │

        Lager et svar

               │

               ▼

        JSON sendes tilbake

               │

               ▼

     React viser meldingen
```

Når alt fungerer skal nettsiden vise:

```
React + Django

Hei fra Django!
```

---

# 🤔 Hvordan snakker React med Django?

React og Django kommuniserer ved hjelp av HTTP.

React sender en forespørsel.

Eksempel:

```
GET /api/hello/
```

Django mottar forespørselen.

Django lager et svar.

Eksempel:

```json
{
    "message": "Hei fra Django!"
}
```

React mottar JSON-dataene og viser dem på skjermen.

Denne måten å kommunisere på kalles et **API**.

---

# 🌐 Hva er et API?

API står for:

**Application Programming Interface**

Et API kan sees på som en servitør på en restaurant.

```
       Kunde

         │

         ▼

     Servitør (API)

         │

         ▼

      Kjøkken
```

Kunden går ikke inn på kjøkkenet.

I stedet sier kunden:

> "Jeg vil ha pizza."

Servitøren henter maten og kommer tilbake.

På samme måte spør React:

```
Gi meg analysen.
```

Django gjør jobben og sender resultatet tilbake.

---

# 📦 Installer Django REST Framework

Vanlig Django lager nettsider.

Vi ønsker derimot å lage et API.

Da bruker vi **Django REST Framework**.

Installer:

```bash
pip install djangorestframework
```

---

# ⚙️ Aktiver REST Framework

Åpne:

```
backend/config/settings.py
```

Finn:

```python
INSTALLED_APPS = [
```

Legg til:

```python
INSTALLED_APPS = [

    ...

    "rest_framework",

]
```

Da vet Django at prosjektet skal kunne lage API-er.

---

# 📁 Lag en egen API-app

Et Django-prosjekt består ofte av flere apper.

Vi lager en app som heter:

```
api
```

Kjør:

```bash
python manage.py startapp api
```

Prosjektet ser nå omtrent slik ut:

```
backend/

├── api/
│
├── config/
│
└── manage.py
```

---

# ⚙️ Registrer appen

Åpne:

```
settings.py
```

Legg til:

```python
INSTALLED_APPS = [

    ...

    "api",

]
```

Nå vet Django at denne appen finnes.

---

# ✏️ Lag den første view-en

Åpne:

```
api/views.py
```

Slett innholdet.

Skriv:

```python
from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(["GET"])
def hello(request):

    return Response({
        "message": "Hei fra Django!"
    })
```

---

# 🤔 Hva skjer her?

Først importerer vi:

```python
Response
```

Denne lager et JSON-svar.

Deretter:

```python
@api_view(["GET"])
```

forteller Django at funksjonen skal svare på HTTP GET.

Selve funksjonen:

```python
def hello(request):
```

kjøres når noen besøker API-et.

Til slutt:

```python
return Response(...)
```

sender JSON tilbake.

---

# 📁 Lag api/urls.py

Lag filen:

```
api/urls.py
```

Skriv:

```python
from django.urls import path
from .views import hello

urlpatterns = [

    path("hello/", hello),

]
```

Denne filen bestemmer hvilke URL-er appen skal ha.

---

# 🔗 Koble appen til prosjektet

Åpne:

```
config/urls.py
```

Importer:

```python
from django.urls import include, path
```

Deretter:

```python
urlpatterns = [

    path("admin/", admin.site.urls),

    path("api/", include("api.urls")),

]
```

Nå vet Django at alle adresser som begynner med:

```
/api/
```

skal sendes videre til appen vår.

---

# 🧪 Test API-et

Start Django:

```bash
python manage.py runserver
```

Besøk:

```
http://127.0.0.1:8000/api/hello/
```

Hvis alt fungerer ser du:

```json
{
    "message": "Hei fra Django!"
}
```

🎉 Gratulerer!

Du har laget ditt første API.

---

# ⚛️ React henter data

Nå kan React hente data.

I `App.jsx` bruker vi:

```javascript
fetch("http://127.0.0.1:8000/api/hello/")
```

Når denne linjen kjøres:

```
React

↓

HTTP

↓

Django

↓

JSON

↓

React
```

---

# 🤔 Hva gjør fetch()?

`fetch()` sender en HTTP-forespørsel.

Eksempel:

```javascript
fetch("/api/hello/")
```

Når Django svarer får React et Response-objekt.

Vi gjør dette om til JSON:

```javascript
response.json()
```

Til slutt lagrer vi resultatet.

```javascript
setMessage(data.message)
```

Da oppdateres nettsiden automatisk.

---

# ⚛️ useEffect()

I React brukes:

```javascript
useEffect()
```

til å kjøre kode når komponenten vises.

Eksempel:

```javascript
useEffect(() => {

    fetch(...)

}, [])
```

De tomme hakeparentesene:

```javascript
[]
```

betyr:

"Kjør bare én gang."

---

# ⚛️ useState()

Vi trenger et sted å lagre meldingen.

```javascript
const [message, setMessage] = useState("")
```

Før API-et svarer:

```
message = ""
```

Etter at Django svarer:

```
message = "Hei fra Django!"
```

React oppdager endringen og oppdaterer skjermen automatisk.

---

# 🚨 Men... hvorfor fungerer det ikke?

Hvis du prøver dette nå får du sannsynligvis en feil.

Eksempel:

```
Access to fetch has been blocked by CORS policy
```

Dette skjer fordi React og Django kjører på **to forskjellige adresser**.

```
React

http://localhost:5173
```

og

```
Django

http://127.0.0.1:8000
```

Nettleseren stopper derfor forespørselen av sikkerhetsgrunner.

Dette er helt normalt.

---

# 🌍 Hva er CORS?

CORS står for:

**Cross-Origin Resource Sharing**

En "origin" består av:

* protokoll
* domene
* port

Dermed er disse to forskjellige:

```
http://localhost:5173
```

og

```
http://127.0.0.1:8000
```

Selv om begge peker mot din egen maskin.

Nettleseren antar derfor at React prøver å hente data fra en annen nettside.

For å beskytte brukeren blokkeres forespørselen.

---

# 🧩 Løsningen

Vi installerer pakken:

```bash
pip install django-cors-headers
```

Deretter registreres den i:

```
INSTALLED_APPS
```

og

```
MIDDLEWARE
```

Til slutt forteller vi Django hvilke adresser som får lov til å hente data.

Eksempel under utvikling:

```python
CORS_ALLOWED_ORIGINS = [

    "http://localhost:5173",

]
```

Når dette er gjort får React lov til å kommunisere med Django.

---

# 🎉 Oppsummering

Vi har nå:

✅ installert Django REST Framework

✅ laget en egen API-app

✅ opprettet vårt første API

✅ koblet URL-er

✅ hentet data med `fetch()`

✅ forstått hvorfor CORS oppstår

I neste kapittel skal vi konfigurere CORS riktig og gjøre kommunikasjonen mellom React og Django robust både lokalt og etter deploy.

---

# ☁️ Del 4 – Deploy

Nå har vi en fungerende applikasjon lokalt.

Vi kan:

✅ starte Django

✅ starte React

✅ hente data fra API-et

✅ se resultatet i nettleseren

Men foreløpig fungerer dette bare på vår egen maskin.

Målet nå er å gjøre applikasjonen tilgjengelig på internett.

---

# 🎯 Hva betyr deploy?

Deploy betyr å publisere en applikasjon slik at andre kan bruke den.

Lokalt har vi:

```
Min datamaskin

├── React
│      localhost:5173
│
└── Django
       localhost:8000
```

Ingen andre kan besøke dette.

Etter deploy får vi:

```
🌍 Internett

       Bruker

          │

          ▼

GitHub Pages
(React)

          │

          ▼

Render
(Django API)
```

---

# 🏗️ Hvorfor deployerer vi frontend og backend separat?

React og Django har forskjellige roller.

## ⚛️ Frontend

React består av:

* HTML
* CSS
* JavaScript

Når React bygges blir det vanlige statiske filer:

```
dist/

├── index.html
├── assets/
│
└── javascript-filer
```

Disse filene kan serveres direkte.

Derfor passer GitHub Pages veldig godt.

---

## 🐍 Backend

Django er en aktiv server.

Den må:

* kjøre Python
* håndtere forespørsler
* utføre beregninger
* kommunisere med database

Derfor trenger Django en server som Render.

---

# 🐍 Del 4.1 – Deploy Django til Render

## 🎯 Målet

Vi ønsker at denne adressen skal fungere:

```
https://orienterings-analyse.onrender.com/api/hello/
```

Når noen besøker den skal Django svare.

---

# 📦 Før deploy trenger Django noen filer

Lokalt har vi:

```
backend/

├── manage.py
├── config/
├── api/
└── venv/
```

Render trenger ikke:

```
venv/
```

Dette er bare vårt lokale miljø.

Render lager sitt eget.

---

# 📄 requirements.txt

Render må vite hvilke Python-pakker som skal installeres.

Lag filen:

```
backend/requirements.txt
```

Kommando:

```bash
pip freeze > requirements.txt
```

Eksempel:

```
Django==5.2
djangorestframework==3.17
django-cors-headers==4.9
```

Når Render starter kjører den:

```
pip install -r requirements.txt
```

---

# 🔐 Miljøvariabler

Noen verdier skal ikke ligge direkte i koden.

Eksempler:

* passord
* API-nøkler
* hemmelige nøkler
* databaseinformasjon

Dette kalles miljøvariabler.

---

## ❌ Dårlig løsning

Eksempel:

```python
SECRET_KEY = "hemmelig-nøkkel"
```

Problemet:

Hvis GitHub-repoet er offentlig ligger nøkkelen der.

---

## ✅ Bedre løsning

Vi lagrer verdien hos Render.

Eksempel:

Render:

```
SECRET_KEY=xxxxxx
```

Django:

```python
import os

SECRET_KEY = os.environ.get(
    "SECRET_KEY"
)
```

Da hentes verdien når serveren starter.

---

# ⚙️ Produksjonsinnstillinger

Lokalt:

```python
DEBUG = True
```

betyr:

* detaljerte feilmeldinger
* enklere utvikling

Produksjon:

```python
DEBUG = False
```

fordi vi ikke ønsker å vise interne detaljer.

---

# 🌍 ALLOWED_HOSTS

Django må vite hvilke domener som får kontakte serveren.

Eksempel:

```python
ALLOWED_HOSTS = [
    "orienterings-analyse.onrender.com"
]
```

Hvis domenet mangler får du:

```
DisallowedHost
```

---

# 🚀 Opprette Render-service

På Render:

1. Velg:

```
New Web Service
```

2. Koble GitHub-repoet

3. Velg prosjektet

---

# ⚙️ Build command

Render må installere avhengigheter:

```
pip install -r backend/requirements.txt
```

---

# ▶️ Start command

Django trenger en produksjonsserver.

Eksempel:

```
cd backend && gunicorn config.wsgi
```

---

# 🧪 Test backend

Når Render er ferdig:

Åpne:

```
https://orienterings-analyse.onrender.com/api/hello/
```

Du skal se:

```json
{
    "message": "Hei fra Django!"
}
```

🎉 Django er live!

---

# ⚛️ Del 4.2 – Deploy React til GitHub Pages

Nå skal frontend publiseres.

---

# 🏗️ Bygge React

Lokalt:

```bash
npm run build
```

Vite lager:

```
frontend/

└── dist/

    ├── index.html
    └── assets/
```

Dette er den ferdige nettsiden.

---

# ⚙️ Vite base path

GitHub Pages bruker prosjektets navn i URL-en.

Eksempel:

```
https://jhjelz.github.io/Orienterings-analyse/
```

Derfor må:

```
vite.config.js
```

inneholde:

```javascript
export default defineConfig({

    base:
    "/Orienterings-analyse/",

})
```

---

# 🔗 React må vite hvor Django ligger

Lokalt:

```javascript
http://127.0.0.1:8000
```

Produksjon:

```
https://orienterings-analyse.onrender.com
```

Vi ønsker ikke å endre kode manuelt.

Derfor bruker vi miljøvariabler.

---

# ⚙️ VITE_API_URL

I React:

```javascript
const API_URL =
import.meta.env.VITE_API_URL;
```

Lokalt kan vi ha:

```
.env.local
```

med:

```
VITE_API_URL=http://127.0.0.1:8000
```

Produksjon:

GitHub Actions bruker:

```
VITE_API_URL=https://orienterings-analyse.onrender.com
```

---

# 🤖 Del 4.3 – Automatisk deploy med GitHub Actions

Målet:

Vi skal aldri gjøre:

```
npm run deploy
```

manuelt.

I stedet:

```
git push main

        │

        ▼

GitHub Actions

        │

        ▼

Bygger React

        │

        ▼

Publiserer GitHub Pages
```

---

# 📁 Workflow-filer

GitHub Actions ligger her:

```
.github/workflows/
```

Eksempel:

```
.github/

└── workflows/

    ├── ci.yml

    └── deploy-frontend.yml
```

---

# 🧪 CI vs CD

To viktige begreper:

## CI

Continuous Integration

Betyr:

"Test at koden fortsatt fungerer."

Eksempel:

```
Push

↓

Kjør tester

↓

Godkjent
```

---

## CD

Continuous Deployment

Betyr:

"Publiser automatisk."

Eksempel:

```
Merge

↓

Bygg

↓

Deploy

↓

Live
```

---

# 🔄 Den komplette flyten

Når utviklingen er ferdig:

```
🌱 Ny branch

        │

💻 Kode

        │

🧪 Test lokalt

        │

☁️ Push

        │

🔄 Pull Request

        │

✅ Merge main

        │

🤖 GitHub Actions

        │

        ├── ⚛️ React → GitHub Pages

        │

        └── 🐍 Django → Render

        │

        ▼

🌍 Ny versjon live
```

---

# 🚨 Vanlige deploy-feil

## ❌ React viser gammel versjon

Mulige årsaker:

* nettleser-cache
* GitHub Pages bruker gammel build

Prøv:

```
Ctrl + F5
```

---

## ❌ React får ikke kontakt med Django

Sjekk:

* CORS
* VITE_API_URL
* Render-status

---

## ❌ Django gir 500-feil

Sjekk Render logs.

Vanlige årsaker:

* manglende miljøvariabel
* feil requirements.txt
* feil startkommando

---

## ❌ Django sier DisallowedHost

Legg til domenet i:

```python
ALLOWED_HOSTS
```

---

# 🎉 Oppsummering

Vi har nå gått fra:

```
💻 Lokal utvikling
```

til:

```
🌍 Produksjonsapplikasjon
```

med:

✅ React på GitHub Pages

✅ Django på Render

✅ API-kommunikasjon

✅ Miljøvariabler

✅ Automatisk deploy

Neste steg er å lage en god utviklingsflyt med branches, Pull Requests og trygg videreutvikling.
