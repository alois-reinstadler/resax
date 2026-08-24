# Spec: Chore — fix vitest teardown race + self-maintaining registry checker

Status: ready. Small sequential task on `main` (no worktree). Do not commit.

## 1. Fix the vitest exit-code failure

`pnpm test` / `pnpm vitest run` currently reports all tests passing (21 files / 100 tests) but exits nonzero with 2 errors:

```
EnvironmentTeardownError: [vitest-worker]: Closing rpc while "onUserConsoleLog" was pending
```

Introduced with the calendar stream (see /tmp/codex-phase2e-report.md which documented `--disableConsoleIntercept` as a workaround). Diagnose properly: likely a test or component logging to console during environment teardown (find and silence/await it), or — if it's a vitest/browser-mode infrastructure race — set the appropriate vitest config option (e.g. `disableConsoleIntercept: true`) with a comment stating why. Prefer removing the offending late console output over global config if both are possible.

Acceptance: `pnpm test` exits 0 with all tests passing, twice in a row (rule out flakiness).

## 2. Make `scripts/check-registry.ts` self-maintaining

The checker hardcodes item counts, which (a) every stream edits, causing conflicts, and (b) auto-merges wrongly when two streams write the same number. Change it to derive truth from `registry.json`: read it, build the expected item-name set, and assert `static/r/` contains exactly index.json + one JSON per item (matching names), each with populated `name`/`type`/`files[].content`, and index.json summarizing exactly the registry's items. Remove all hardcoded counts. Also assert every `registryDependencies` entry that isn't `local:`-prefixed or a URL fails validation with a clear message (guards the plain-name footgun).

Acceptance: `pnpm registry:build && pnpm registry:check` passes; temporarily deleting one built JSON or adding a fake plain-name dep (revert after) makes it fail with a clear error — show both proofs in your report.

## Report

AGENTS.md format: root cause of the teardown error, what was changed, proofs.
