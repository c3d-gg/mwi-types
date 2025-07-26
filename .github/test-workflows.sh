#!/bin/bash
# Test GitHub Actions workflows locally (requires act or similar)

echo "🧪 Testing GitHub Actions Workflows"
echo "=================================="

# Check if workflows are valid YAML
echo "📋 Validating YAML syntax..."
for file in .github/workflows/*.yml; do
    echo -n "  Checking $(basename $file)... "
    if python3 -c "import yaml; yaml.safe_load(open('$file'))" 2>/dev/null; then
        echo "✅"
    else
        echo "❌"
        exit 1
    fi
done

echo ""
echo "🔍 Checking for common issues..."

# Check for hardcoded secrets
if grep -r "npm_" .github/workflows/ | grep -v "secrets.NPM_TOKEN" | grep -v "npm install" | grep -v "npm publish"; then
    echo "❌ Found potential hardcoded NPM token!"
    exit 1
else
    echo "✅ No hardcoded secrets found"
fi

# Check for deprecated actions
if grep -r "actions/checkout@v[123]" .github/workflows/; then
    echo "⚠️ Found older checkout action versions (consider updating to v4)"
fi

# Check for missing permissions
for file in .github/workflows/*.yml; do
    if grep -q "GITHUB_TOKEN" "$file" && ! grep -q "permissions:" "$file"; then
        echo "⚠️ $(basename $file) uses GITHUB_TOKEN but doesn't declare permissions"
    fi
done

echo ""
echo "✅ Workflow validation complete!"
echo ""
echo "📝 To test workflows locally, you can use:"
echo "  - act (https://github.com/nektos/act)"
echo "  - GitHub CLI: gh workflow run <workflow-name>"
echo ""
echo "🚀 To trigger workflows on GitHub:"
echo "  - CI: Push any code change"
echo "  - Generate Types: Change source files or manual trigger"
echo "  - Publish: Create a version tag (git tag v1.0.0 && git push --tags)"
echo "  - Release Please: Push to main with conventional commits"