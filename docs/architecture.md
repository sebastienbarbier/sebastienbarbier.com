# Architecture

```mermaid
flowchart LR
  F[Browser] -->|sebastienbarbier.com| A[GitHub Pages]
  A --> B[Static prerendered files]
```

The site is prerendered as static HTML on every push to `main`, then published to GitHub Pages.

The custom domain `sebastienbarbier.com` is set as the GitHub Pages CNAME in `.github/workflows/build.yml`.
