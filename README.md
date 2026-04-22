# Personal profile and CV website for Kaito Baba

This repository contains the source code for my personal website and CV.

The site is built as a static Next.js application and deployed to GitHub Pages.

## Tech Stack

- Next.js
- React
- TypeScript
- i18next
- tsParticles
- Handlebars
- LaTeX

## Features

- Profile, publications, awards, work experience, education, and skills are managed through i18n JSON files.
- A LaTeX CV is generated automatically from the i18n data.
- GitHub Actions builds the website and generates the PDF CV.
- GitHub repository star counts are fetched with the GitHub API.
- Google Scholar citation counts are fetched and stored as JSON data.
- GitHub stars and Scholar citations are displayed through dynamic badges.

## Development

```bash
npm install
npm run dev
```

## Scripts

```bash
npm run build          # Build the static website
npm run build:cv       # Generate cv.tex and public/cv.pdf
npm run update-data    # Update GitHub stars and Google Scholar citations
npm run lint           # Run ESLint
npm run format         # Run Prettier
```
