#!/bin/bash

# 🔹 Auto-Build & Push Next.js Script
set -e

# CONFIGURATION
REPO_URL="https://github.com/VNDR-MUSIC/Comm-Cat.git"
DEPLOY_BRANCH="build"
WATCH_INTERVAL=5

# Ensure dependencies
echo "⏳ Installing dependencies..."
npm install

# Continuous build watcher
while true; do
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
            COMMIT_MSG="Auto-deploy build $(date '+%Y-%m-%d %H:%M:%S')"
            git commit -m "$COMMIT_MSG"
            git push -f origin "$DEPLOY_BRANCH"

            cd -
            rm -rf "$TEMP_DIR"
            echo "🚀 .next pushed successfully to '$DEPLOY_BRANCH'."
        else
            echo "❌ Build did not produce .next folder. Skipping push."
        fi
    else
        echo "❌ Build failed. Will retry after $WATCH_INTERVAL seconds."
    fi

    echo "⏱ Waiting $WATCH_INTERVAL seconds before next build..."
    sleep "$WATCH_INTERVAL"
done
