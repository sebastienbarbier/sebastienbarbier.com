## Context

Staff-level reviews are less about syntax and more about whether the change survives contact with production. This sample walks through that narrative shape.

### What I look for first

- **Scope**: one logical change per pull request when possible.
- **Tests**: behavior that would hurt users if it regressed.
- **Observability**: logs or metrics when the feature touches money or auth.

### Example feedback block

When a button regresses visually, I describe what changed, what the target state is, and where to compare:

```scss
a.btn.small {
  font-size: 0.9375rem;
  padding: 4px 10px;
}
```

## Pull quote

> If the reviewer needs a screenshot to understand the bug, the pull request description is not done yet.

## Closing list

Ship when:

1. The diff matches the design tokens on `develop`.
2. Lighthouse performance stays at or above 90 on mobile.
3. The author can explain the rollback plan in one sentence.

Delete this draft after the blog launch checklist is complete.
