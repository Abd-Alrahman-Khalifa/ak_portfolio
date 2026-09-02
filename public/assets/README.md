# Assets

- `profile.jpg`, `cv.pdf` — added, real files, wired into the site.
- `projects/emart-home.png`, `projects/emart-search.png` — real eMart screenshots (featured Laravel project).
- `projects/bravo-home.png`, `projects/bravo-admin.png` — real Bravo storefront/admin screenshots (also from your Laravel work, available if you want to swap them in).
- `projects/zshope.png` — real Zshope live-site screenshot.
- `projects/shopz.png` — real shopZ live-site screenshot.

**Still pending:** php_project, Template Four, Template Two, and App PDF don't have confirmed screenshots yet. Add real screenshots into this folder (as many as you like per project — the gallery viewer supports multiple images with next/prev/zoom) and update the `images` array in `src/data/projects.ts`. Until then those cards show an "IMAGE PENDING" placeholder instead of a wrong image.

To add more images to a project that already has some (e.g. the featured Laravel project), just add more filenames to that project's `images: []` array — the gallery arrows and dot indicators adapt automatically.
