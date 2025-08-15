# Fanny Portfolio

Ein künstlerisches Portfolio mit Next.js und Netlify CMS.

## Features

- 🎨 Animierte Projektgalerie mit GSAP
- 📱 Responsive Design
- 🖼️ Bildverwaltung über Netlify CMS
- ✏️ Textbearbeitung ohne Code
- ⚡ Schnelle Performance

## CMS Setup

### Für Entwickler:

1. **Lokale Entwicklung:**
   ```bash
   npm run dev
   ```

2. **Netlify CMS Admin:**
   - Gehe zu: `http://localhost:3000/admin`
   - Verwende lokalen Backend-Modus

### Für Kunden:

1. **Content bearbeiten:**
   - Gehe zu: `https://deine-domain.com/admin`
   - Melde dich mit deinen Zugangsdaten an

2. **Was kann bearbeitet werden:**
   - ✅ Projekt-Titel ändern
   - ✅ Bilder hochladen/ändern
   - ✅ Linke und rechte Texte bearbeiten
   - ✅ Jahr anpassen
   - ✅ Reihenfolge der Projekte ändern

3. **Live Preview:**
   - Änderungen werden automatisch nach dem Speichern sichtbar
   - Keine Code-Kenntnisse erforderlich

## Projektstruktur

```
├── content/
│   ├── projekte/          # Projekt-Daten (CMS)
│   ├── pages/            # Statische Seiten
│   └── posts/            # Blog-Posts
├── public/
│   ├── admin/            # Netlify CMS Admin
│   └── img/              # Bilder
└── src/
    ├── components/       # React-Komponenten
    ├── lib/             # CMS-Hilfsfunktionen
    └── app/             # Next.js App Router
```

## Deployment

1. **Vercel (Empfohlen):**
   - Verbinde dein GitHub-Repository
   - Automatische Deployments

2. **Netlify:**
   - Git-basiertes Deployment
   - Netlify CMS Integration

## Technologien

- **Frontend:** Next.js 15, React 19, TypeScript
- **Animationen:** GSAP
- **CMS:** Netlify CMS
- **Styling:** CSS Modules
- **Deployment:** Vercel/Netlify
