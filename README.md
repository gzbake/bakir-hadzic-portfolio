# Bakir Hadžić — Portfolio

Premium personal portfolio website built with Astro, TypeScript, and modern CSS.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

## Build

```bash
npm run build
npm run preview
```

## Deploy

Deploy the `dist/` folder to Vercel, Netlify, or Cloudflare Pages. No special configuration required.

## Project Structure

```
src/
  components/     # Reusable Astro components
  data/           # Portfolio content (projects, experience, skills)
  layouts/        # Page layouts
  pages/          # Routes
  styles/         # Global CSS
public/
  cv/             # Downloadable CV
  images/         # Project images and assets
```

## Adding Projects

Edit `src/data/portfolio.ts` and add a new entry to the `projects` array. Create a case study page at `src/pages/work/[slug].astro` or duplicate an existing case study template.

## Tech Stack

- Astro 5
- TypeScript
- Modern CSS (no framework)
- Minimal client-side JavaScript
