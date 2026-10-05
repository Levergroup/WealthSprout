# WealthSprout — Claude Code Instructions

## Git Workflow

- **Always work on `main` directly.** Do not create `claude/*` feature branches.
- At the start of every session, run `git checkout main && git pull origin main` before making any changes.
- Push with `git push origin main` (or `git push -u origin main` on first push).
- After every push, confirm the new commit hash is on `main` via `git rev-parse HEAD`.
- If a merge conflict arises with `main`, stop and ask before resolving.
- Do not open pull requests unless explicitly asked.

## Domain

- Canonical domain is always `https://www.wealthsproutkids.com` — never `wealthsprout.com` or the non-www version.
- OG/Twitter images use `/og-image.jpg` — never hotlink external images.

## Security

- `GETRESPONSE_API_KEY` lives in Vercel environment variables only — never commit it to any file.
- Do not expose API keys, secrets, or credentials in any committed file.

## Site Architecture

- Static HTML site deployed on Vercel. `cleanUrls: true` — no `.html` in URLs.
- Pushing to `main` triggers a production deployment automatically.
- Blog articles live in `/blog/`. Styles in `styles.css`. Scripts in `main.js`.
- All blog pages use `../styles.css` and `../main.js` (relative paths from `/blog/`).

## Blog Templates

- Nav: `<nav class="nav nav-minimal">` (not the full megadrop nav)
- Hero: `<header class="blog-post-hero">` (add `has-image` class only when a real hero image file exists)
- TOC: `<details class="toc-box" open>` with `<summary><strong>📋 Table of Contents</strong></summary>` — never bare `<details>`
- Author byline `<p class="author-byline">By Maya Hartwell</p>` belongs inside `<header>` only — never inside `<article>`
- Schema: include BlogPosting + FAQPage + BreadcrumbList JSON-LD blocks

## Sitemap

- All entries must use `https://www.wealthsproutkids.com/` (www, correct spelling).
- After adding new pages, add a corresponding `<url>` entry to `sitemap.xml`.
