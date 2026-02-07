# Portfolio

Personal portfolio site and blog built with Jekyll.

## Tech Stack

- Jekyll `3.8.7`
- Ruby + Bundler
- SCSS partials in `_sass/`
- JavaScript in `assets/js/`
- Optional Node tooling (`vite`, `sass-embedded`)

## Prerequisites

- Ruby (recommended: 3.x)
- Bundler
- Node.js + npm (only needed for npm scripts/tooling)

## Local Development

1. Install Ruby dependencies:

```bash
bundle install
```

2. (Optional) Install Node dependencies:

```bash
npm install
```

3. Start the local site with live reload:

```bash
npm run dev
```

4. Open `http://127.0.0.1:4000`.

## Available Scripts

- `npm run dev` - serve site locally with livereload
- `npm run build` - build the site into `_site/`
- `npm run build:production` - production build with `JEKYLL_ENV=production`
- `npm run clean` - clean generated Jekyll output/cache
- `npm run preview` - serve with drafts and future-dated posts
- `npm run install:jekyll` - run `bundle install`

## Project Structure

- `_layouts/` - page templates
- `_includes/` - reusable partials
- `_posts/` - blog posts
- `_projects/` - project collection entries
- `_sass/` - SCSS partials and theme styles
- `assets/` - compiled/static CSS and JS assets
- `_site/` - generated output (do not edit directly)

## Content Editing

- Add blog posts in `_posts/` using `YYYY-MM-DD-title.md`.
- Add portfolio entries in `_projects/`.
- Update site-wide metadata in `_config.yml`.

## Deployment

Typical deploy flow:

1. Build site:

```bash
npm run build:production
```

2. Deploy the generated `_site/` directory via your hosting workflow (GitHub Pages, Netlify, etc.).
