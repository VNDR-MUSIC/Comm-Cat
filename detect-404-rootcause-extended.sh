#!/bin/bash
echo "🧭 Starting extended 404 root-cause detection..."

echo "1️⃣ Checking build artifacts..."
if [ ! -d ".next" ]; then
  echo "❌ No .next directory found — build may have failed or not yet run."
fi

echo "2️⃣ Checking firebase.json for rewrites..."
if [ ! -f "firebase.json" ]; then
  echo "❌ Missing firebase.json — Firebase Hosting cannot route pages."
else
  cat firebase.json | grep -E '"source"|rewrites' || echo "⚠️ No rewrites configured."
fi

echo "3️⃣ Checking Next.js config..."
if [ -f "next.config.ts" ]; then
  grep -E "output|distDir|appDir" next.config.ts
else
  echo "❌ Missing next.config.ts"
fi

echo "4️⃣ Checking public directory..."
if [ ! -d "public" ]; then
  echo "❌ Missing /public directory."
else
  echo "✅ Public directory exists."
fi

echo "5️⃣ Checking dynamic route support..."
grep -R "getStaticPaths" app 2>/dev/null | wc -l | xargs echo "🧩 getStaticPaths count:"
grep -R "getServerSideProps" app 2>/dev/null | wc -l | xargs echo "🧩 getServerSideProps count:"

echo "6️⃣ Checking .next/server/pages existence..."
ls .next/server/pages 2>/dev/null || echo "❌ .next/server/pages missing — may be a static export."

echo "7️⃣ Checking Firebase deploy logs (last 15 lines)..."
tail -n 15 firebase-debug.log 2>/dev/null || echo "⚠️ No firebase-debug.log found."

echo "8️⃣ Scanning last 15 Git commits for changes to routing/config files..."
if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  git log -15 --pretty=format:"%h - %an, %ar : %s" -- next.config.ts firebase.json app routes.js 2>/dev/null
else
  echo "⚠️ Not a Git repository, skipping commit scan."
fi

echo "9️⃣ Checking for conflicting public/_next folders..."
if [ -d "public/_next" ]; then
  echo "⚠️ Detected public/_next — may cause 404 conflicts."
fi

echo "🔍 Extended 404 root-cause scan complete."
