# /release - Prepare and execute releases following Release Please conventions

## Purpose

This command helps prepare releases by:

1. Analyzing uncommitted changes
2. Creating conventional commits
3. Ensuring Release Please compatibility
4. Managing version bumps properly

## Usage

```
./scripts/release.sh [type] [breaking]
```

### Parameters:

- `type` (optional): The type of release
  - `feat` - New features (minor version bump)
  - `fix` - Bug fixes (patch version bump)
  - `docs` - Documentation only
  - `chore` - Maintenance tasks
  - `refactor` - Code refactoring
  - `perf` - Performance improvements
  - `test` - Test updates
  - `build` - Build system changes
  - `ci` - CI/CD changes
  - `types` - Type definition updates
- `breaking` (optional): Add "breaking" to indicate breaking changes (major version bump)

### Examples:

```
./scripts/release feat          # Feature release (0.1.0 -> 0.2.0)
./scripts/release fix           # Patch release (0.1.0 -> 0.1.1)
./scripts/release feat breaking # Breaking change (0.1.0 -> 1.0.0)
```

## What it does:

### 1. Pre-flight Checks

- Verifies git status and uncommitted changes
- Checks if on main/master branch
- Ensures working directory is clean or stages changes
- Validates Release Please configuration

### 2. Analyze Changes

- Reviews modified files to determine change scope
- Suggests appropriate commit type if not specified
- Identifies potential breaking changes
- Checks for generator updates vs generated file changes

### 3. Create Conventional Commit

- Formats commit message following Conventional Commits spec
- Includes BREAKING CHANGE footer if needed
- Adds detailed change descriptions
- References related issues/PRs if applicable

### 4. Release Please Integration

- Ensures commits will be recognized by Release Please
- Validates against release-please-config.json
- Checks that commit types match configured sections

### 5. Documentation Updates

- Does NOT manually update CHANGELOG.md (Release Please handles this)
- Does NOT manually bump version in package.json (Release Please handles this)
- Does NOT update .release-please-manifest.json (Release Please handles this)
- Can update README.md badges if needed

## Release Please Workflow

### Automatic Process (handled by Release Please):

1. **On push to main**: Release Please analyzes commits
2. **Creates/Updates PR**:
   - Bumps version in package.json
   - Updates CHANGELOG.md with commit messages
   - Updates .release-please-manifest.json
3. **On PR merge**:
   - Creates GitHub release
   - Tags the commit
   - Triggers NPM publish workflow

### Manual Process (what this command helps with):

1. **Stage changes**: `git add -A`
2. **Create conventional commit**: Following the format
3. **Push to main**: Triggers Release Please

## Commit Message Format

### Standard format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Examples:

#### Feature with breaking change:

```
feat: update generators for game v1.20250819.0

BREAKING CHANGE: Power skill renamed to Melee throughout all types

- Add support for new combat monster fields
- Add difficulty tier system replacing elite tiers
- Update all skill references
```

#### Bug fix:

```
fix: correct type generation for optional fields

- Make elite combat details optional
- Fix dropRatePerDifficultyTier in actions
```

#### Chore:

```
chore: update dependencies

- Bump TypeScript to 5.5.0
- Update Zod to latest version
```

## Best Practices

### DO:

- ✅ Use conventional commit format
- ✅ Include detailed descriptions in commit body
- ✅ Mark breaking changes clearly
- ✅ Let Release Please handle version bumps
- ✅ Let Release Please update CHANGELOG
- ✅ Push directly to main (if allowed) or create PR

### DON'T:

- ❌ Manually edit version in package.json
- ❌ Manually update CHANGELOG.md
- ❌ Edit .release-please-manifest.json
- ❌ Create tags manually
- ❌ Mix multiple change types in one commit

## Common Scenarios

### Scenario 1: Game Data Update

```bash
# After updating generators for new game data
./scripts/release feat breaking
# Creates: "feat: update generators for game vX.X.X"
# With BREAKING CHANGE note about any renamed/removed fields
```

### Scenario 2: Bug Fix

```bash
# After fixing a generator issue
./scripts/release fix
# Creates: "fix: correct [specific issue]"
```

### Scenario 3: Multiple Changes

```bash
# Best practice: separate commits for each logical change
git add src/generators/game-logic/items.ts
git commit -m "fix: correct item stat generation"

git add src/generators/game-logic/monsters.ts
git commit -m "feat: add new monster fields"

# Then push all at once
git push origin main
```

## Troubleshooting

### Release Please not recognizing commits:

- Check commit format matches Conventional Commits spec
- Verify commit type is in release-please-config.json
- Ensure no extra spaces in commit type

### Version not bumping correctly:

- Breaking changes need "BREAKING CHANGE:" in footer
- feat = minor bump, fix = patch bump
- Check bump-minor-pre-major setting

### Changelog not updating:

- Release Please only updates on PR creation/merge
- Check Actions tab for workflow status
- Verify PAT/token has correct permissions

## Related Commands

- `/status` - Check git and release status
- `/commit` - Create standard commits
- `/changelog` - View current changelog

## Configuration Files

- `.github/workflows/release-please.yml` - Workflow configuration
- `release-please-config.json` - Release Please settings
- `.release-please-manifest.json` - Current versions (DO NOT EDIT)
- `package.json` - Version field (DO NOT EDIT manually)
