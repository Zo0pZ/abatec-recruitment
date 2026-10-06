# Abatec Digital Transformation — Static Prototype

A static, high-fidelity prototype of the new Abatec recruitment platform, built from the project brief: *"The Architecture of Talent"*. This covers the full proposed sitemap with realistic content and a working job-search UI, so the design and UX can be reviewed before committing to a production CMS.

**Stack:** [Eleventy (11ty)](https://www.11ty.dev/) + Nunjucks templates + hand-written CSS (no framework) + vanilla JS. Output is plain, dependency-free HTML/CSS/JS — nothing here depends on a Node runtime once built.

## Why static-first

This is step one of a two-step plan agreed for the project: **validate the design and sitemap as a static site, then migrate into WordPress** as the long-term CMS (per the brief's requirement for a non-technical content team). Building it this way first means:

- Design and copy can be reviewed and signed off quickly, with no CMS setup overhead.
- The HTML/CSS translates directly into a WordPress theme's templates later — Nunjucks includes map cleanly onto `header.php` / `footer.php` / template parts, and the component-based CSS can be lifted largely as-is.
- Content currently in `src/_data/*.json` (jobs, sectors, case studies, team, accreditations) is already shaped like the custom post types / ACF fields that migration would need.

## Getting started

```bash
npm install
npm start      # local dev server with live reload at http://localhost:8080
npm run build   # outputs static site to _site/
```

## What's implemented

- **Full sitemap** from the brief: Home, For Clients (Services, Sector Expertise, Case Studies), For Candidates (Job Search, Candidate Support, Register CV), About Us (Our Story, Meet the Team, Awards), Careers at Abatec, Acquisitions, Contact.
- **Job search engine** (`/for-candidates/jobs/`) — client-side filtering by keyword, sector, location and contract type over mock JSON data, structured so it can be swapped for a real ATS/job feed later.
- **Lead-capture forms** for client consultation requests, CV registration and confidential acquisition enquiries (currently client-side demo submissions — no backend wired up yet).
- **Visual direction**: deep navy / slate / amber "safety accent" palette, Manrope display type over Inter body type, architectural grid motifs — matching the brief's "Architecture of Talent" concept.
- **Responsive, accessible layout**: mobile nav, skip link, visible focus states, semantic landmarks, form labels throughout.
- **SEO baseline**: per-page meta descriptions, canonical URLs, Open Graph tags, `EmploymentAgency` JSON-LD, `sitemap.xml` and `robots.txt`.

## What's intentionally not here yet

These are production-platform features from the brief that depend on decisions/contracts outside a prototype (ATS vendor, CMS platform, portal auth), so they're not built here:

- Real ATS integration (Bullhorn/Vincere) — the job board currently reads static JSON shaped like a future feed.
- Client/candidate portals with authentication.
- A real CMS backend — this is the "static for now" step before the WordPress migration.
- Real imagery — hero/case-study visuals are CSS-driven placeholders in the brand palette, pending photography.

## Project structure

```
src/
  _data/            # site-wide content: jobs, sectors, case studies, team, accreditations
  _includes/
    layouts/base.njk       # shared HTML shell
    partials/header.njk    # nav
    partials/footer.njk    # footer
  css/styles.css     # design system (tokens, components)
  js/main.js         # nav toggle, job filters, demo form handling
  for-clients/, for-candidates/, about/   # section pages
  index.njk, careers.njk, acquisitions.njk, contact.njk
```
