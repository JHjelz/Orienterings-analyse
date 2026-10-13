## Frontend – kodekontroll

Kjør kommandoene fra `frontend/`-mappen før du pusher endringer til GitHub.

### Installer avhengigheter

```bash
npm ci
```

### Formatering med Prettier

Kontroller at koden følger formateringsreglene:

```bash
npm run format:check
```

Formater filene automatisk ved behov:

```bash
npx prettier . --write
```

### Linting med ESLint

Sjekk koden for potensielle feil og problemer:

```bash
npm run lint
```

### Test produksjonsbygging

Kontroller at React-appen kan bygges:

```bash
npm run build
```

### Sikkerhetssjekk

Kontroller produksjonsavhengigheter for kjente sårbarheter:

```bash
npm audit --omit=dev
```

### Kjør alle kontrollene

```bash
npm run format:check
npm run lint
npm run build
npm audit --omit=dev
```

### GitHub Actions

Workflowen `Frontend CI` kjører automatisk ved push til `main` og ved pull requests mot `main`. Den sjekker formatering, linting, bygging og produksjonsavhengigheter.

Workflowen `Deploy React to GitHub Pages` bygger og publiserer frontend ved push til `main`.

**Før du pusher:** Sørg for at formateringskontrollen, lintingen og byggingen fullfører uten feil.