#!/bin/bash
echo "🧪 Starting Firebase Hosting verification..."

# 1️⃣ Check /public folder
if [ -d "public" ]; then
  echo "✅ /public exists."
else
  echo "❌ /public is missing."
fi

# 2️⃣ Check for conflicting public/_next folder
if [ -d "public/_next" ]; then
  echo "⚠️ public/_next exists — remove it to avoid 404s."
else
  echo "✅ No conflicting public/_next folder."
fi

# 3️⃣ Check apphosting.yaml for SSR wildcard rewrite
if [ -f "apphosting.yaml" ]; then
  if grep -q "source: '/**'" apphosting.yaml; then
    echo "✅ SSR wildcard rewrite present in apphosting.yaml."
  else
    echo "❌ SSR wildcard rewrite missing in apphosting.yaml."
  fi
else
  echo "❌ apphosting.yaml not found."
fi

# 4️⃣ Check dynamic page builds
if [ -d ".next/server/pages" ]; then
  echo "✅ .next/server/pages exists with the following dynamic pages:"
  ls -1 .next/server/pages | grep -v static
else
  echo "❌ .next/server/pages missing — SSR build may be broken."
fi

# 5️⃣ Summary
echo "📝 Verification complete. Fix any ❌ issues before Publish."
