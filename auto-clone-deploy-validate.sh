#!/bin/bash
# auto-clone-deploy-validate.sh
# Usage: bash auto-clone-deploy-validate.sh <new-project-name>

NEW_PROJECT_NAME="$1"

if [ -z "$NEW_PROJECT_NAME" ]; then
  echo "Usage: bash $0 <new-project-name>"
  exit 1
fi

echo "🔍 Detecting latest working Firebase Studio project..."
LATEST_PROJECT_DIR="$(ls -td -- */ | head -1 | sed 's#/##')"

if [ -z "$LATEST_PROJECT_DIR" ]; then
  echo "❌ No Firebase Studio projects found in current directory."
  exit 1
fi

echo "✅ Latest project detected: $LATEST_PROJECT_DIR"

# Pre-deploy validation for 404 causes
echo "🔎 Pre-deploy validation for 404 issues..."

if [ ! -d "$LATEST_PROJECT_DIR/public" ]; then
  echo "❌ Warning: /public folder is missing in the source project."
fi

if [ -d "$LATEST_PROJECT_DIR/public/_next" ]; then
  echo "❌ Warning: public/_next exists - may cause 404 conflicts."
fi

if ! grep -q "source: '/**'" "$LATEST_PROJECT_DIR/apphosting.yaml" 2>/dev/null; then
  echo "❌ Warning: SSR wildcard rewrite missing in apphosting.yaml."
fi

echo "✅ Pre-deploy validation complete."

# Clone project
echo "📂 Cloning project to $NEW_PROJECT_NAME..."
cp -r "$LATEST_PROJECT_DIR" "$NEW_PROJECT_NAME"
cd "$NEW_PROJECT_NAME" || exit 1

# Update Firebase project ID
echo "🔧 Updating Firebase project ID..."
sed -i "s/autopulse-connect/$NEW_PROJECT_NAME/g" apphosting.yaml 2>/dev/null || echo "ℹ️ No project ID replacement needed in apphosting.yaml"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build project
echo "🏗 Building project..."
npm run build

# Deploy to Firebase
echo "🚀 Deploying to Firebase Hosting..."
firebase deploy --only apphosting

# Post-deploy verification
LIVE_URL="https://$NEW_PROJECT_NAME.web.app"
echo "🔗 Deployment complete! Checking live site at $LIVE_URL..."

HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$LIVE_URL")

if [ "$HTTP_STATUS" == "200" ]; then
  echo "✅ Live site is accessible: $LIVE_URL"
elif [ "$HTTP_STATUS" == "404" ]; then
  echo "❌ Live site returned 404. Check SSR rewrites and public/_next folder."
else
  echo "⚠️ Live site returned HTTP status $HTTP_STATUS. Manual check recommended."
fi
