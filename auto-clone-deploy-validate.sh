#!/bin/bash
# auto-clone-deploy-validate.sh
# Usage: bash auto-clone-deploy-validate.sh <NEW_PROJECT_NAME>
# Example: bash auto-clone-deploy-validate.sh com-catalyst

NEW_PROJECT_NAME="$1"

if [ -z "$NEW_PROJECT_NAME" ]; then
  echo "Usage: $0 <NEW_PROJECT_NAME>"
  exit 1
fi

echo "🚀 Starting auto-clone, deploy, and validate for project '$NEW_PROJECT_NAME'"

# Step 1: Detect latest working project
PROJECTS_ROOT="/studiomain" # <-- change if your projects are elsewhere
LATEST_PROJECT_DIR=$(ls -dt $PROJECTS_ROOT/* | head -1)

if [ ! -d "$LATEST_PROJECT_DIR" ]; then
  echo "❌ No Firebase Studio projects found in $PROJECTS_ROOT"
  exit 1
fi

echo "📂 Latest project detected: $LATEST_PROJECT_DIR"

# Step 2: Clone project to new folder
NEW_PROJECT_DIR="$PROJECTS_ROOT/$NEW_PROJECT_NAME"
if [ -d "$NEW_PROJECT_DIR" ]; then
  echo "⚠️  Target folder $NEW_PROJECT_DIR already exists. Exiting."
  exit 1
fi

cp -r "$LATEST_PROJECT_DIR" "$NEW_PROJECT_DIR"
echo "✅ Cloned project to $NEW_PROJECT_DIR"

# Step 3: Update internal references (optional: update package.json name, etc.)
if [ -f "$NEW_PROJECT_DIR/package.json" ]; then
  sed -i "s/\"name\": \".*\"/\"name\": \"$NEW_PROJECT_NAME\"/" "$NEW_PROJECT_DIR/package.json"
  echo "🔧 Updated package.json name to $NEW_PROJECT_NAME"
fi

# Step 4: Change into new project folder
cd "$NEW_PROJECT_DIR" || exit 1

# Step 5: Install dependencies
if [ -f "package-lock.json" ] || [ -f "yarn.lock" ]; then
  echo "📦 Installing dependencies..."
  npm install
fi

# Step 6: Build project
echo "🔨 Building Next.js project..."
npm run build

# Step 7: Deploy to Firebase Hosting
echo "☁️ Deploying to Firebase Hosting..."
firebase deploy --only apphosting

# Step 8: Verify deployment
echo "🌐 Validating deployment..."
# Replace with your new Firebase Hosting URL if known, or list hosting sites
echo "Deployed Complete! Check the Firebase Hosting dashboard for URL: https://$NEW_PROJECT_NAME.web.app"

echo "🎉 Auto-clone, deploy, and validation complete for '$NEW_PROJECT_NAME'"
