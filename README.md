# Apex Capital — Public

Public frontend for Apex Capital (ApexInvest portfolio / product landing).

Live demo
https://personal-portfolio-site-e206d7.netlify.app

Overview
A production-focused static frontend built for the ApexInvest project. This repo is intended to be used inside a JavaScript/TypeScript monorepo and is optimized for fast CI/CD, Windows-first developer workflows, and Netlify-based hosting.

Table of contents
- Architecture & Hosting (Netlify + Cloudflare)
- Quick start
- Directory layout (key paths)
- One-click launchers (Windows + POSIX)
- Testing & CI
- Deployment & Netlify configuration
- Security & secrets
- What I changed / next steps


Architecture & Hosting

Recommended ApexInvest architecture

- Netlify Edge Network
  - React/Vite frontend, static assets, HTTPS, deploy previews.
- Cloudflare Worker API
  - Backend API (authentication/authorization, validation, rate-limits, trading rules).
- Cloudflare D1 + KV
  - Persistent records, fee configuration, and lightweight state with strict access controls.

Recommendation: separate frontend hosting (Netlify) from financial backend (Cloudflare). Netlify gives excellent global CDN, atomic deploys, and Git-driven previews. Cloudflare Workers provide a highly-controllable, auditable backend surface that should remain authoritative for all financial actions.

What Netlify gives you

| Capability                       | Benefit for ApexInvest                                      |
| -------------------------------- | ----------------------------------------------------------- |
| Global CDN and edge delivery     | Faster delivery of frontend assets                          |
| Atomic deployments and rollbacks | Easier recovery from a bad frontend release                 |
| Git-integrated CI/CD             | Automated builds and preview deployments                    |
| HTTPS and managed certificates   | Encrypted browser-to-site communication                     |
| Edge Functions                   | Useful for selected edge logic, routing, or personalization |

Caution: Netlify's benefits do not automatically secure financial transactions or make a backend compliant. Implement authentication, transaction integrity, authorization, and auditability in the backend and validate them with tests and audits.

Quick start (Windows-first, pnpm recommended)

Prerequisites
- Node.js 18+ (LTS)
- pnpm (recommended) or npm/yarn
- Git
- Optional: Netlify CLI for local deploy previews

Install dependencies

# From repository root
pnpm install

Run dev server (hot reload)

pnpm dev

Run tests (Vitest)

pnpm test

Build production assets

pnpm build

Directory layout (key paths)
- /             — frontend source root
- /public       — static assets served by the site
- /src          — React/Vue/Svelte source (adjust to your framework)
- /scripts      — helper scripts (launchers, local-deploy)
- /tests        — unit & integration tests (Vitest)
- .github/workflows/ci.yml — CI pipeline for install/test/build/deploy

One-click local launcher (cross-platform)

Scripts included: ./scripts/launch.ps1 (PowerShell) and ./scripts/launch.sh (Bash).

PowerShell (Windows) — ./scripts/launch.ps1

```powershell
# name=./scripts/launch.ps1
# One-click launcher for Windows PowerShell (use in repo root)
param(
  [switch]$Install,
  [switch]$Test,
  [switch]$Build
)

if ($Install) {
  pnpm install
}

if ($Test) {
  pnpm test
}

if ($Build) {
  pnpm build
}

# default: run dev
if (-not ($Install -or $Test -or $Build)) {
  pnpm dev
}
```

Bash (POSIX) — ./scripts/launch.sh

```bash
# name=./scripts/launch.sh
# One-click POSIX launcher
set -euo pipefail

case "${1:-dev}" in
  install) pnpm install ;;
  test) pnpm test ;;
  build) pnpm build ;;
  dev|*) pnpm dev ;;
esac
```

Testing
- Vitest for unit tests and lightweight integration tests. Use jsdom for DOM tests when needed.
- Example: pnpm test --run

Suggested package.json scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest",
    "lint": "eslint . --ext .js,.ts,.jsx,.tsx",
    "typecheck": "tsc --noEmit",
    "format": "prettier --write ."
  }
}
```

CI (GitHub Actions) — .github/workflows/ci.yml (suggested)

```yaml
# name=.github/workflows/ci.yml
name: CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18.x]
    steps:
      - uses: actions/checkout@v4
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'pnpm'
      - name: Install pnpm
        run: npm i -g pnpm
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      - name: Run typecheck
        run: pnpm typecheck
      - name: Run lint
        run: pnpm lint
      - name: Run tests
        run: pnpm test --reporter=dot
      - name: Build
        run: pnpm build
      # Optional: Deploy to Netlify (requires NETLIFY_AUTH_TOKEN and NETLIFY_SITE_ID secrets)
      - name: Deploy to Netlify (optional)
        if: github.ref == 'refs/heads/main' && secrets.NETLIFY_AUTH_TOKEN != ''
        uses: nwtgck/actions-netlify@v1
        with:
          publish-dir: ./dist
          production-deploy: true
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
```

Deployment & Netlify configuration

- Connect this repository to Netlify and configure build settings:
  - Build command: pnpm build
  - Publish directory: dist (or the actual output dir for your framework)
  - Base directory: repository root unless this project is a subpackage

- Branch deploys & previews:
  - Enable deploy previews for pull requests.
  - Configure preview environment variable ALLOWED_ORIGIN to allow your preview domain(s) if the Cloudflare Worker requires it.

- Netlify Edge Functions (optional): keep logic that must run at the edge in Netlify, but prefer Cloudflare Workers for sensitive financial logic.

Netlify publish example (netlify.toml)

```toml
[build]
  command = "pnpm build"
  publish = "dist"

[context.production.environment]
  NODE_ENV = "production"

[context.deploy-preview.environment]
  NODE_ENV = "development"
```

Security & secrets

- Do NOT put secrets in the frontend code or in Netlify environment variables that are accessible to client-side code. Store secrets in the backend (Cloudflare Worker secrets, D1, KV) and only expose safe tokens to the frontend.

- Cross-origin security: configure Cloudflare Worker to only accept requests from allowed origins. Prefer exact origin match (e.g., https://personal-portfolio-site-e206d7.netlify.app) and set separate allowed origins for preview deploys.

- Secrets & environment variables:
  - Backend-only: JWT_SECRET, DB credentials, API keys — store these in Cloudflare Worker secrets (or a secret manager).
  - CI secrets: NETLIFY_AUTH_TOKEN, NETLIFY_SITE_ID — store these as GitHub Secrets and reference in CI only.

Release gates

Before merging to production, enforce:
- Typechecking (tsc --noEmit)
- Unit & integration tests
- Dependency vulnerability scans (e.g., npm audit, Snyk)
- DB schema or migration checks (where applicable)

Operational cautions

- Verify Netlify enterprise claims (locations, SLA, traffic) against current plan/contract before writing them in procurement or marketing material.
- Keep the Cloudflare Worker as the authoritative backend for all transaction-related logic and audit events. The frontend must always call the backend for actions that affect account state or funds.

What I changed / next steps

- Incorporated Netlify + Cloudflare architecture guidance, deployment plan, and security guidance into README.md.
- Included explicit Netlify build and publish settings, Netlify CLI suggestion, and ALLOWED_ORIGIN guidance for the Cloudflare Worker.

Next steps I can take now:
1) Commit this README.md into elonmusk28053-design/apex-capital-public on the repository default branch (I will create/update README.md).  
2) Add the example files: ./scripts/launch.ps1, ./scripts/launch.sh, .github/workflows/ci.yml, and netlify.toml in a single commit if you want them created.  

Tell me which of the next steps to run (commit README only, or commit README + files listed).