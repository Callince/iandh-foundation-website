# Content admin

Staff edit the site's content — events, stories, testimonials, partners, impact
numbers and the gallery — through Decap CMS at `/admin/`. Everything else (page
copy, the legal pages, layout) stays in code.

Content lives in `content/*.json`. The CMS edits those files; the site imports
them at build time.

---

## Editing locally (works today, no accounts needed)

1. Uncomment `local_backend: true` in `public/admin/config.yml`
2. Two terminals:
   ```bash
   pnpm dev
   ```
   ```bash
   npx decap-server
   ```
3. Open **http://localhost:5500/admin/index.html** and click **Login**

Saves write straight to `content/*.json` on this machine and the site hot-reloads.
Nothing is published — commit and push when you are happy with the changes.

> In Vite's dev server `/admin/` on its own falls through to the home page.
> Use `/admin/index.html`. On a real host `/admin/` works.

---

## Editing on the live site — remaining setup

The repo is connected: `Callince/iandh-foundation-website`, branch `main`.

Decap talks to GitHub directly from the browser, so it needs an **OAuth provider**
to complete the login. Until one exists, the login button fails with
`Error: Not Found`. Two ways to finish it:

### Option A — Netlify (simplest)

1. Deploy the repo on Netlify. Build command `pnpm build`, publish directory `dist`.
2. In the Netlify site: **Site configuration → Access control → OAuth →
   Install provider → GitHub**, using a GitHub OAuth app whose callback is
   `https://api.netlify.com/auth/done`.
3. Done — `/admin/` on the deployed site logs in with GitHub.

### Option B — Cloudflare Pages, or any other host

Cloudflare has no built-in OAuth for Decap, so run a small proxy:

1. Deploy the repo on Cloudflare Pages. Build `pnpm build`, output `dist`.
2. Create a GitHub OAuth app (Settings → Developer settings → OAuth Apps) with
   the callback pointing at your proxy's `/callback`.
3. Deploy an OAuth proxy — e.g. `sveltia/sveltia-cms-auth` as a Cloudflare
   Worker — and set its `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET`.
4. Add the proxy to `public/admin/config.yml`:
   ```yaml
   backend:
     name: github
     repo: Callince/iandh-foundation-website
     branch: main
     base_url: https://your-proxy.workers.dev
   ```

### Who can edit

Anyone with **write access to the GitHub repo**. Add editors as repo
collaborators; remove access there and they lose the CMS too.

---

## How a save reaches the site

```
editor saves in /admin  →  commit to main  →  host rebuilds  →  live
```

Roughly a minute or two. There is no preview step, so what an editor saves goes
live on the next build — worth knowing before handing out access.

---

## Adding a new editable section

1. Put the data in a new `content/<name>.json` as `{ "items": [ ... ] }`
2. Import it where it is used: `import data from '../content/<name>.json'`
3. Add a matching `files:` collection in `public/admin/config.yml`

Keep the JSON shape and the CMS `fields:` in step — the CMS overwrites the whole
file on save, so a field missing from the config is dropped from the JSON.
