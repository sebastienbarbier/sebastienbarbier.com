## Why this sample exists

This draft post is here so the blog list and article page can be reviewed before real publishing. It uses the same markdown pipeline as production posts.

## A short checklist

Before merging a UI tweak on a portfolio site, I usually confirm:

1. Light and dark mode both look intentional.
2. Focus rings and contrast still pass WCAG AA for body text.
3. Font loading does not swap headings to the wrong family.

## Code snippet

A tiny helper for formatting dates in templates:

```typescript
export function formatPostDate(iso: string): string {
  const [year, month, day] = iso.split('-');
  return `${year}-${month}-${day}`;
}
```

## Quote

> Good design is as little design as possible, but never less clarity than the reader needs.

## Figure

![Portrait placeholder used for blog layout review](/assets/images/ressources/sebastienbarbier_profile_1024.jpg)

Remove this sample when real posts cover the same layout cases.
