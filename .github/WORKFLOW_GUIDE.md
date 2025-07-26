# GitHub Actions Workflow Guide

## 🚀 Quick Start

### Required Setup (User Action Needed)

1. **Create NPM Token**

   ```
   1. Go to https://www.npmjs.com → Profile → Access Tokens
   2. Generate new token (type: Automation)
   3. Copy the token
   ```

2. **Add to GitHub Secrets**
   ```
   1. Go to your repo → Settings → Secrets → Actions
   2. New repository secret
   3. Name: NPM_TOKEN
   4. Value: [paste your token]
   ```

That's it! Everything else is automated.

## 📊 Workflow Overview

| Workflow           | Trigger             | Purpose                                |
| ------------------ | ------------------- | -------------------------------------- |
| **CI**             | Every PR/push       | Run tests, type checks, security scans |
| **Generate Types** | Source file changes | Auto-update TypeScript types           |
| **Publish**        | Version tags (v\*)  | Publish to NPM                         |
| **Release Please** | Merges to main      | Manage releases, update changelog      |

## 🎯 Common Tasks

### Manual Type Generation

```bash
# Go to Actions tab → Generate Types → Run workflow
```

### Manual NPM Publish

```bash
# Go to Actions tab → Publish to NPM → Run workflow
# Enter version and tag
```

### Create a Release

```bash
# Just push to main with conventional commits:
git commit -m "feat: add new feature"
git commit -m "fix: resolve bug"
git commit -m "feat!: breaking change"

# Release Please will create a PR automatically
```

## 🔍 Monitoring

- **Actions Tab**: See all workflow runs
- **Pull Requests**: Check status checks
- **Releases**: View published versions
- **NPM**: https://www.npmjs.com/package/@c3d.gg/mwi-types

## ⚡ Tips

1. **Conventional Commits** trigger correct version bumps:

   - `fix:` → patch (0.0.X)
   - `feat:` → minor (0.X.0)
   - `feat!:` or `BREAKING CHANGE:` → major (X.0.0)

2. **Check CI Status** before merging PRs

3. **Release Process** is fully automated - just merge the Release PR

4. **Type Generation** happens automatically - no manual updates needed
