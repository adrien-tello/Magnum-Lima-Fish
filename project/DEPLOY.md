Deployment notes
================

This file documents how to deploy the project to Vercel and Netlify using GitHub Actions.

Required repository secrets

- VERCEL_TOKEN: Personal token from Vercel (Settings → Tokens)

- NETLIFY_AUTH_TOKEN: Personal token from Netlify (User settings → Applications)

- NETLIFY_SITE_ID: Your Netlify site id (Site settings → Site information)

Vercel (GitHub Actions)

- Workflow: `.github/workflows/ci-vercel-deploy.yml`

- What it does: installs deps, runs Vite build, and runs `vercel --prod` with `--cwd ./dist`.

- Setup:

  1. Create a Personal Token in Vercel (<https://vercel.com/account/tokens>).

  2. Add it to GitHub repo secrets as `VERCEL_TOKEN`.

  3. (Optional) If you prefer to use the Vercel Git integration, you can skip the action and let Vercel build from the repo.

Netlify (GitHub Actions)

- Workflow: `.github/workflows/deploy-netlify.yml`

- What it does: installs deps, runs Vite build, and runs `netlify deploy --dir=dist --prod --site=$NETLIFY_SITE_ID`.

- Setup:

  1. Create a Personal Access Token in Netlify (<https://app.netlify.com/user/applications>).

  2. Add `NETLIFY_AUTH_TOKEN` to GitHub repo secrets.

  3. Add `NETLIFY_SITE_ID` as a repository secret or environment variable.

Notes

- The project uses Vite and outputs static files to `dist/`. The workflows and `npm run deploy` target this folder.

- On some hosts the `node_modules/.bin` wrappers are not executable — workflows use `node ./node_modules/vite/bin/vite.js build` to avoid permission issues.
