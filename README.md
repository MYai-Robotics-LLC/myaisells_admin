## Getting Started

### Install

This project depends on the private `@myairobotics/ui` package from GitHub Packages, so a plain `pnpm install` will fail without credentials. Instead:

1. In `.env.local`, set `NODE_AUTH_TOKEN` to a GitHub PAT with `read:packages` scope.
2. Run:

```bash
pnpm run bootstrap
```

This reads the token from `.env.local`, exports it for the duration of the install, and runs `pnpm install`. It's scoped to this project only — nothing is written to a global config.

### Run

```bash
pnpm dev
```
