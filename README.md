# Portfolio — Francis Musau

Modern personal portfolio built with **Next.js** (static export), **Tailwind CSS**, **Framer Motion**, and **next-themes** (light default, full dark mode).

Live site (GitHub Pages): [muthamafrancs.github.io/portfolio](https://muthamafrancs.github.io/portfolio/)

## Architecture (static hosting)

This app is built for **static hosting only** (no Node.js on the server):

| Requirement | How it is met |
|-------------|----------------|
| Static export | `output: "export"` in `next.config.ts` → build output in `out/` |
| Images on Pages | `images.unoptimized: true` so assets work without an image optimizer |
| Jekyll bypass | `public/.nojekyll` is copied into `out/` so `_next/` is not ignored |
| Subpath deploy | `NEXT_PUBLIC_BASE_PATH` + matching `assetPrefix` for `/<repo>/` |
| No server APIs | No `app/api` routes; contact form is UI-only until you add an external backend |

Do **not** add Route Handlers, `getServerSideProps`, or `dynamic = "force-dynamic"` if you need GitHub Pages — use a separate backend or serverless provider instead.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production build

```bash
npm run build
```

Output: **`out/`** (upload this folder to any static host, or let GitHub Actions deploy it).

### Local build matching GitHub Pages (`/<repository-name>/`)

```bash
export NEXT_PUBLIC_BASE_PATH=/portfolio
export NEXT_PUBLIC_SITE_URL=https://muthamafrancs.github.io/portfolio/
npm run build
```

Preview the export (serves `out/` at http://localhost:3000):

```bash
npx --yes serve@14 out -l 3000
```

Replace `/portfolio` and the site URL if your repository name differs.

## Deploy with GitHub Actions → GitHub Pages

1. Push this repo to GitHub (default branch `main` or `master`).
2. **Settings → Pages → Build and deployment**: set **Source** to **GitHub Actions**.
3. The workflow [`.github/workflows/deploy-github-pages.yml`](.github/workflows/deploy-github-pages.yml) will:
   - run `npm ci` and `npm run build` with  
     `NEXT_PUBLIC_BASE_PATH=/<repository-name>` and  
     `NEXT_PUBLIC_SITE_URL=https://<owner>.github.io/<repository-name>/`
   - upload `out/` and publish via **Deploy GitHub Pages**.

If your default branch is not `main` or `master`, edit the `on.push.branches` list in the workflow file.

### User/organization site (`username.github.io` with no subpath)

Use an **empty** `NEXT_PUBLIC_BASE_PATH` for that repository and adjust the workflow env (or use a separate workflow) so the build does not set a base path.

## Environment variables

Copy `.env.example` to `.env.local` for local development.

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_BASE_PATH` | e.g. `/portfolio` for project pages |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for Open Graph (`metadataBase`) |
| `NEXT_PUBLIC_CV_URL` | Google Drive (or similar) for the **Professional CV** button |
| `NEXT_PUBLIC_INSTAGRAM_URL` | Full Instagram profile URL |

## Content

Editable copy and links: `src/lib/data/site.ts`. Profile photo: `public/profile.jpeg`.

Legacy static files: `_legacy/`.
