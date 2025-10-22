#!/bin/bash

# 🔹 One-Time Build & Push Next.js Script
set -e

# CONFIGURATION
REPO_URL="https://github.com/VNDR-MUSIC/Comm-Cat.git"
DEPLOY_BRANCH="build"

# Step 1: Ensure dependencies
echo "⏳ Installing dependencies..."
npm install

# Step 2: Build Next.js project
echo "⏳ Running Next.js build..."
if npm run build; then
    if [ -d ".next" ]; then
        echo "✅ Build successful. Pushing .next folder..."

        # Temporary repo for deploy branch
        TEMP_DIR=$(mktemp -d)
        cp -r .next "$TEMP_DIR"
        cd "$TEMP_DIR"

        git init
        git remote add origin "$REPO_URL"
        git checkout -b "$DEPLOY_BRANCH"

        git add .next
        COMMIT_MSG="One-time deploy build $(date '+%Y-%m-%d %H:%M:%S')"
        git commit -m "$COMMIT_MSG"
        git push -f origin "$DEPLOY_BRANCH"

        cd -
        rm -rf "$TEMP_DIR"
        echo "🚀 .next pushed successfully to '$DEPLOY_BRANCH'."
    else
        echo "❌ Build did not produce .next folder. Nothing pushed."
    fi
else
    echo "❌ Build failed. Nothing pushed."
fi