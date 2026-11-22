# Naonao Zhong's homepage

A static academic website built with [Eleventy](https://www.11ty.dev/), Markdown, Nunjucks, and plain CSS. [中文使用说明](docs/README-zh.md).

## Local preview

Use Node.js 22 or newer. `.nvmrc` selects Node 22 when using nvm. Install dependencies once after cloning, and again when the lockfile changes:

```bash
npm ci
```

For everyday editing, start the site with one command:

```bash
npm run dev
```

Open **http://localhost:4000**. Saving content, layouts, site data, CSS, or static assets updates the local preview automatically. Stop with `Ctrl+C`.

```bash
npm run build
npm run check
```

`build` recreates `dist/` so removed pages cannot leave stale files in a deployment. In this local workspace, `check` also validates HTML, shared layouts, internal links, anchors, redirects, and asset paths. The `tests/` directory is local only and ignored by Git, so a fresh clone uses `npm run build`; `npm run check` requires the local test file. Dependencies, generated files, test reports, and `Summary/` are also ignored.

## Editing

| Location | Purpose |
| --- | --- |
| `_pages/about.md` | Homepage content, available at `/` |
| `_pages/research.md` | Research content, available at `/research/` |
| `_data/site.json` | Author information and site metadata |
| `_data/navigation.json` | Shared navigation links |
| `_includes/base.njk` | HTML document and shared page layout |
| `_includes/navigation.njk`, `_includes/profile.njk` | Navigation and author profile |
| `assets/css/site.css` | Responsive styles for all pages |
| `images/`, `files/` | Images, favicons, and downloadable CV |
| `eleventy.config.js` | Build configuration and legacy redirect collection |

To add a page, create a Markdown file in `_pages/` with a `title` and `permalink` in its YAML front matter. The shared layout applies automatically. Add its link to `_data/navigation.json` if it should appear in the navigation. Use site-root paths such as `/images/example.png` so assets also work on nested pages.

The homepage's `redirect_from` field preserves `/about/` and `/about.html`. No site content needs to be duplicated to support those URLs. The original Markdown files, images, and PDF were preserved during migration. The homepage's unused Liquid citation URL assignments remain compatible; citation fetching is not part of the website build.

## GitHub Pages

In the repository's **Settings → Pages → Build and deployment**, select **GitHub Actions** as the source. This is a one-time setting required by [GitHub's custom workflow setup](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

Keep **Deploy from a branch** disabled: it starts GitHub's legacy Jekyll workflow, which can publish this README over the Eleventy website even when both workflows succeed. The deployment job checks the publishing source and stops with a settings link if it is incorrect. After changing the source, run **Build and deploy website → Run workflow** from the repository's Actions tab to republish the website.

The workflow at `.github/workflows/pages.yml` installs locked dependencies, runs `npm run build`, uploads `dist/`, and deploys pushes to `main`. Pull requests run the build without deploying. Local tests are not uploaded or run in GitHub Actions. The site stays at **https://naonaozhong.github.io**.

The old Jekyll/GitHub Pages gem bundle, Sass vendors, jQuery plugins, and scheduled Scholar workflow have been removed. `google_scholar_crawler/` remains an independent optional Python utility; it is not installed, run, or published by the website workflow.

## Credits

The original site was based on [AcadHomepage](https://github.com/RayeRen/acad-homepage.github.io), with influences from [Minimal Mistakes](https://github.com/mmistakes/minimal-mistakes) and [Academic Pages](https://github.com/academicpages/academicpages.github.io). See `LICENSE`.
