#!/bin/bash

# Release command - Prepare releases following Release Please conventions
# Usage: /release [type] [breaking]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Parse arguments
RELEASE_TYPE="${1:-}"
IS_BREAKING="${2:-}"

# Valid commit types
VALID_TYPES="feat fix docs chore refactor perf test build ci types"

# Function to print colored output
print_color() {
    local color=$1
    shift
    echo -e "${color}$*${NC}"
}

# Function to check if type is valid
is_valid_type() {
    echo "$VALID_TYPES" | grep -q "\b$1\b"
}

# Check git status
print_color "$BLUE" "📋 Checking repository status..."

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    print_color "$RED" "❌ Not in a git repository"
    exit 1
fi

# Check current branch
CURRENT_BRANCH=$(git branch --show-current)
if [[ "$CURRENT_BRANCH" != "main" && "$CURRENT_BRANCH" != "master" ]]; then
    print_color "$YELLOW" "⚠️  Not on main branch (current: $CURRENT_BRANCH)"
    read -p "Continue anyway? (y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Check for uncommitted changes
if ! git diff-index --quiet HEAD --; then
    print_color "$YELLOW" "📝 Uncommitted changes detected:"
    git status --short
    echo
fi

# Analyze changes if no type specified
if [ -z "$RELEASE_TYPE" ]; then
    print_color "$BLUE" "🔍 Analyzing changes to suggest release type..."
    
    # Check what files have been modified
    CHANGED_FILES=$(git diff --name-only HEAD^ HEAD 2>/dev/null || git diff --name-only --cached)
    
    if echo "$CHANGED_FILES" | grep -q "^src/generators/"; then
        SUGGESTED_TYPE="feat"
        print_color "$GREEN" "✨ Generator changes detected - suggesting 'feat'"
    elif echo "$CHANGED_FILES" | grep -q "^src/generated/"; then
        print_color "$YELLOW" "⚠️  Only generated files changed - did you run generation?"
        SUGGESTED_TYPE="chore"
    elif echo "$CHANGED_FILES" | grep -q "^\.github/"; then
        SUGGESTED_TYPE="ci"
        print_color "$GREEN" "🔧 CI changes detected - suggesting 'ci'"
    elif echo "$CHANGED_FILES" | grep -q "^docs/\|README\.md"; then
        SUGGESTED_TYPE="docs"
        print_color "$GREEN" "📚 Documentation changes detected - suggesting 'docs'"
    else
        SUGGESTED_TYPE="chore"
        print_color "$YELLOW" "🔧 General changes detected - suggesting 'chore'"
    fi
    
    echo
    print_color "$BLUE" "Available types:"
    echo "  feat     - New features (minor version bump)"
    echo "  fix      - Bug fixes (patch version bump)"
    echo "  docs     - Documentation only"
    echo "  chore    - Maintenance tasks"
    echo "  refactor - Code refactoring"
    echo "  perf     - Performance improvements"
    echo "  test     - Test updates"
    echo "  build    - Build system changes"
    echo "  ci       - CI/CD changes"
    echo "  types    - Type definition updates"
    echo
    
    read -p "Enter release type [$SUGGESTED_TYPE]: " USER_TYPE
    RELEASE_TYPE="${USER_TYPE:-$SUGGESTED_TYPE}"
fi

# Validate release type
if ! is_valid_type "$RELEASE_TYPE"; then
    print_color "$RED" "❌ Invalid release type: $RELEASE_TYPE"
    print_color "$YELLOW" "Valid types: $VALID_TYPES"
    exit 1
fi

# Check for breaking changes
if [ -z "$IS_BREAKING" ]; then
    print_color "$BLUE" "🔍 Checking for potential breaking changes..."
    
    # Look for removed or renamed exports, changed interfaces, etc.
    if git diff HEAD^ HEAD 2>/dev/null | grep -q "^-export\|renamed.*to\|BREAKING"; then
        print_color "$YELLOW" "⚠️  Potential breaking changes detected!"
        read -p "Is this a breaking change? (y/n): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            IS_BREAKING="breaking"
        fi
    fi
fi

# Build commit message
print_color "$BLUE" "📝 Building commit message..."

# Get a description for the commit
read -p "Enter a short description (e.g., 'update generators for game v1.2.0'): " DESCRIPTION

if [ -z "$DESCRIPTION" ]; then
    print_color "$RED" "❌ Description is required"
    exit 1
fi

# Build the commit message
COMMIT_MSG="$RELEASE_TYPE: $DESCRIPTION"

# Add body and breaking change if needed
if [ "$IS_BREAKING" == "breaking" ]; then
    print_color "$YELLOW" "⚠️  Breaking change - please describe what's breaking:"
    read -p "Breaking change description: " BREAKING_DESC
    
    if [ -n "$BREAKING_DESC" ]; then
        COMMIT_BODY="BREAKING CHANGE: $BREAKING_DESC"
    fi
fi

# Get additional details
print_color "$BLUE" "📋 Add details (optional - press Enter to skip each):"
echo "List changes (one per line, empty line to finish):"

DETAILS=""
while IFS= read -r line; do
    [ -z "$line" ] && break
    DETAILS="${DETAILS}- ${line}\n"
done

# Combine everything
FULL_COMMIT_MSG="$COMMIT_MSG"
if [ -n "$COMMIT_BODY" ] || [ -n "$DETAILS" ]; then
    FULL_COMMIT_MSG="$COMMIT_MSG\n"
    if [ -n "$COMMIT_BODY" ]; then
        FULL_COMMIT_MSG="${FULL_COMMIT_MSG}\n${COMMIT_BODY}\n"
    fi
    if [ -n "$DETAILS" ]; then
        FULL_COMMIT_MSG="${FULL_COMMIT_MSG}\n${DETAILS}"
    fi
fi

# Show the commit message
echo
print_color "$GREEN" "📄 Commit message preview:"
echo "---"
echo -e "$FULL_COMMIT_MSG"
echo "---"
echo

# Confirm and execute
read -p "Create this commit? (y/n): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    print_color "$YELLOW" "Cancelled"
    exit 0
fi

# Stage changes if needed
if ! git diff-index --quiet HEAD --; then
    print_color "$BLUE" "📦 Staging changes..."
    git add -A
fi

# Create the commit
print_color "$BLUE" "💾 Creating commit..."
if git diff --cached --quiet; then
    # No staged changes, create empty commit
    git commit --allow-empty -m "$(echo -e "$FULL_COMMIT_MSG")"
else
    git commit -m "$(echo -e "$FULL_COMMIT_MSG")"
fi

print_color "$GREEN" "✅ Commit created successfully!"

# Ask about pushing
echo
read -p "Push to origin/$CURRENT_BRANCH? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    print_color "$BLUE" "🚀 Pushing to origin/$CURRENT_BRANCH..."
    git push origin "$CURRENT_BRANCH"
    print_color "$GREEN" "✅ Pushed successfully!"
    echo
    print_color "$BLUE" "📋 Next steps:"
    echo "1. Check GitHub Actions for Release Please workflow"
    echo "2. Review the auto-generated Release PR when created"
    echo "3. Merge the Release PR to trigger NPM publish"
else
    print_color "$YELLOW" "📋 Remember to push when ready:"
    echo "  git push origin $CURRENT_BRANCH"
fi

print_color "$GREEN" "✨ Done!"