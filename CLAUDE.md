# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a bilingual (Chinese/English) informational website about Hungary's Golden Visa program, built with Astro 5 and Tailwind CSS 4. The site is deployed to GitHub Pages and uses a base path configuration for deployment.

## Commands

All commands use `pnpm`:

- `pnpm install` - Install dependencies
- `pnpm dev` - Start dev server at localhost:4321
- `pnpm build` - Build production site to ./dist/
- `pnpm preview` - Preview production build locally
- `pnpm astro ...` - Run Astro CLI commands (e.g., `pnpm astro check`)

## Architecture

### Deployment Configuration

**Critical**: This site deploys to GitHub Pages with a base path of `/golden_visa_hungary/`. All URLs and asset references must be base-aware:

- Site URL: `https://andris811.github.io/golden_visa_hungary`
- Base path is configured in `astro.config.mjs` as `/golden_visa_hungary/`
- The `BASE` constant is computed in multiple files from `import.meta.env.BASE_URL`
- Always normalize BASE to ensure trailing slash: `RAW_BASE.endsWith('/') ? RAW_BASE : RAW_BASE + '/'`

### Internationalization Pattern

The site implements a **manual i18n approach** with language-specific routes:

- **URL structure**: `/{lang}/page/` where lang is `en` or `zh`
- **No root index**: The root `/` redirects; all content lives under `/en/` or `/zh/`
- **Parallel page structure**: Each page exists in both languages at identical paths:
  - `/en/index.astro` and `/zh/index.astro`
  - `/en/contact.astro` and `/zh/contact.astro`
  - etc.

#### Header Component Pattern

The `Header.astro` component demonstrates the i18n implementation:

1. **Accept currentLang prop** (`'zh' | 'en'`)
2. **Define translation object** `t` with keys for both languages
3. **Compute otherLang** for language switcher
4. **Base-aware link helper**: `L = (p: string) => BASE + p.replace(/^\/+/, '')`
5. **Navigation links**: Always include language prefix, e.g., `L(`${currentLang}/program/`)`

When creating new pages or components, follow this pattern.

### Layout System

**BaseLayout.astro** is the root layout:

- Accepts props: `title`, `description`, `lang` (defaults to "zh")
- Imports `global.css` which contains single Tailwind import: `@import "tailwindcss";`
- Computes BASE from `import.meta.env.BASE_URL` and normalizes trailing slash
- Uses BASE for favicon and font references: `` `${BASE}favicon.ico` ``
- Defines language-specific font stacks via CSS custom properties (`--font-cn`, `--font-en`)
- Provides three slots: `header`, default (main content), `footer`

Pages use BaseLayout with named slots:
```astro
<BaseLayout lang="en" title="...">
  <Fragment slot="header"><Header currentLang="en" /></Fragment>
  <!-- main content here -->
  <Fragment slot="footer"><Footer currentLang="en" /></Fragment>
</BaseLayout>
```

### Styling

- **Tailwind v4** configured via Vite plugin in `astro.config.mjs`
- No separate `tailwind.config.js` file; v4 uses Vite-based configuration
- Global styles in `src/styles/global.css` (single `@import "tailwindcss";` line)
- Font preloading for Chinese font: `NotoSansSC-Regular.woff2` in BaseLayout
- Utility-first Tailwind classes throughout components

### Sitemap

The `@astrojs/sitemap` integration is configured with the full GitHub Pages URL. It automatically generates a sitemap on build.

## File Structure Notes

- **Components**: `src/components/` - Header, Footer, SEO, LanguageSwitcher, etc.
- **Layouts**: `src/layouts/BaseLayout.astro` - Single root layout
- **Pages**: `src/pages/{lang}/` - All pages organized by language
- **Styles**: `src/styles/global.css` - Single CSS import file
- **Public assets**: `public/` - Static assets; reference with BASE prefix
- **Fonts**: `public/fonts/` - Custom font files

## GitHub Actions Deployment

`.github/workflows/deploy.yml` handles automatic deployment:
- Triggers on push to `main` branch
- Uses pnpm 9 and Node 20
- Runs `pnpm install --frozen-lockfile` and `pnpm run build`
- Deploys `dist/` to GitHub Pages
