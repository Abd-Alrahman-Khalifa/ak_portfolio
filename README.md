# AbdAlrahman Khalifa — Developer Portfolio

A cinematic, interactive developer portfolio built with **React + Vite + TypeScript**. 100% frontend — no backend, no server, no database.

## Stack

- React 19 + Vite + TypeScript
- Tailwind CSS v4
- GSAP + Framer Motion (animation)
- Lenis (smooth scroll)
- EmailJS (contact form — no backend required)
- lucide-react (icons)

## Getting started

```bash
npm install
cp .env.example .env   # then fill in your EmailJS keys
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Setting up the contact form (EmailJS)

The contact form sends messages straight to `abdelrahman09.k@gmail.com` without opening the visitor's email client, using [EmailJS](https://www.emailjs.com):

1. Create a free EmailJS account and connect an email service (e.g. Gmail).
2. Create an email template with these variables: `from_name`, `from_email`, `subject`, `message`, `company`, `project_type`.
3. Copy `.env.example` to `.env` and fill in:
   ```
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```
4. Never commit `.env` — it's already gitignored. Public keys are safe to expose in frontend code by design (that's how EmailJS works), but service/template IDs still shouldn't be hardcoded elsewhere.

Until these are set, the form shows a "FAILED TO SEND" state with a clear explanation instead of silently failing.

## Adding your real assets

Drop these into `public/assets/` (see `public/assets/README.md`):
- `profile.jpg` — your photo
- `cv.pdf` — your CV
- `projects/*.png` — project screenshots referenced in `src/data/projects.ts`

Missing images never break the layout — they fall back to an "IMAGE PENDING" placeholder.

## Editing content

All portfolio content lives in `src/data/` — no need to touch components to update text:

- `profile.ts` — name, title, bio, counters
- `projects.ts` — project list, links, features, categories
- `stack.ts` — technology constellation + engineering pipeline + DB schema
- `experience.ts` — timeline + education
- `socials.ts` — social links
- `nav.ts` — navigation items + keyboard shortcuts

## Publishing to GitHub + live deploy

This repo is ready to push and auto-deploy to **GitHub Pages** — a workflow is already included at `.github/workflows/deploy.yml`.

1. Create a new empty repository on GitHub (don't initialize it with a README).
2. From this folder:
   ```bash
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git add -A
   git commit -m "Initial commit"
   git branch -M main
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Build and deployment → Source → GitHub Actions**. The included workflow will build and deploy automatically on every push to `main`.
4. If you're using the EmailJS contact form, add your three keys as **repository secrets** (Settings → Secrets and variables → Actions): `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`. The workflow already reads them.
5. Your live site will be at `https://<your-username>.github.io/<repo-name>/` a minute or two after the first successful run (check the **Actions** tab for progress).
6. Once you know your final URL, update the placeholder `https://abdalrahmankhalifa.dev/` in `index.html` (canonical, OG, Twitter, JSON-LD tags) and in `public/sitemap.xml` / `public/robots.txt` to match it.

Prefer **Vercel** or **Netlify** instead? Both auto-detect Vite — just import the GitHub repo on either platform, add the same three env vars in their dashboard, and it deploys with zero config (and gives you a nicer default domain than GitHub Pages).



```
src/
├── components/   shared UI (cursor, nav, command palette, magnetic buttons, etc.)
├── sections/     one file per page section (Hero, About, Projects, Contact, ...)
├── hooks/        Lenis, theme, keyboard nav, media queries
├── data/         all portfolio content, separated from UI
├── utils/        EmailJS wrapper
└── styles/       design tokens (global.css)
```

## Notes

- Custom cursor, magnetic buttons, and heavy mouse-driven effects are automatically disabled on touch devices.
- Respects `prefers-reduced-motion` throughout (intro loader, transitions).
- GitHub section fetches live repo data client-side and gracefully falls back to a static link if the API call fails or rate-limits.
- Command palette: `Ctrl/Cmd + K`. Keyboard shortcuts `H A S W E G C` jump between sections (disabled while typing in a field).
