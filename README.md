# Apex Capital — Frontend

This PR scaffolds a production-ready landing page for Apex Capital built with Next.js 16 + TypeScript.

Local dev:

corepack enable
corepack prepare pnpm@9.15.1 --activate
pnpm install --frozen-lockfile
pnpm dev

Build:
pnpm build

Security:
- Do not commit secrets. Set server-only environment variables (e.g., CF_WORKER_URL) in Vercel.
