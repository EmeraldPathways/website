# Emerald Pathways

Emerald Pathways' public website, built with React and deployed to GitHub Pages from the `main` branch.

## GitHub Pages

The Actions workflow builds and prerenders all six pages for GitHub Pages at the `/website` path, then deploys them to <https://emeraldpathways.github.io/website/>. Pushes to `main` start a deployment; the workflow can also be run manually from the Actions tab.

The website is a static portfolio. The contact form opens the visitor's email application with the enquiry filled in; it does not store or send submissions on a server.

## Local development

- Node.js `>=22.13.0`
- `npm ci`
- `npm run dev`

Run `npm run pages:build` to create the static Pages version locally. The site source keeps its original page and image files; the Pages build adds static HTML for every route and prefixes local links and assets for this repository URL.
