# Notion Clone 

> Editor di note e pagine ispirato a Notion, costruito con 
> Next.js 14 App Router, Prisma e BetterAuth.

## Demo
🔗 [link-vercel-del-clone]

## Tech Stack
**Framework:** Next.js 14 (App Router), TypeScript  
**Styling:** Tailwind CSS  
**Database:** PostgreSQL (Neon.tech), Prisma ORM  
**Auth:** BetterAuth  
**Editor:** @uiw/react-md-editor  
**Deploy:** Vercel  

## Funzionalità
- ✅ Autenticazione email/password
- ✅ Creazione e gestione pagine
- ✅ Editor Markdown con salvataggio automatico (debounce)
- ✅ Sidebar navigabile
- ✅ Titolo editabile in tempo reale
- ✅ Dark mode
- ✅ Header di sicurezza (XSS, CSRF protection)

## Differenze architetturali rispetto a FocusFlow
| Aspetto | FocusFlow | Notion Clone |
|---------|-----------|--------------|
| Framework | React + Vite | Next.js 14 |
| Backend | Fastify separato | Next.js Route Handlers |
| Rendering | Client-side (SPA) | Server + Client Components |
| API | REST su porta 3001 | Route Handlers integrati |

## Setup locale
```bash
git clone [url-repo]
cd notion-clone
pnpm install
cp .env.example .env   # compila DATABASE_URL, BETTER_AUTH_SECRET, ecc.
npx prisma migrate dev
pnpm dev
```

## Scelte architetturali
- **Next.js App Router** per sfruttare Server Components 
  e ridurre il JavaScript inviato al browser
- **Debounce save** (500ms) per salvare il contenuto 
  senza sovraccaricare il database ad ogni tasto
- **Route Handlers integrati** invece di un backend separato 
  per semplicità — adatto per app monolitiche piccole
