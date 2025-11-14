#!/bin/bash

# Redux Demo Script for Professor
# This script will help you demonstrate Redux implementation

echo "🎮 Redux Implementation Demo - Pixel UI Component Library"
echo "=========================================================="
echo ""

echo "📁 Step 1: Show Redux Store Structure"
echo "--------------------------------------"
echo "Redux files are organized in /src/store/"
ls -la src/store/
echo ""
ls -la src/store/slices/
echo ""

echo "📊 Step 2: Show Redux Configuration"
echo "------------------------------------"
echo "File: src/store/store.ts"
cat src/store/store.ts
echo ""
echo ""

echo "🎯 Step 3: Show Active Redux Slices"
echo "------------------------------------"
echo ""
echo "→ User Preferences Slice (src/store/slices/userPreferencesSlice.ts)"
head -n 30 src/store/slices/userPreferencesSlice.ts
echo "... (file continues)"
echo ""
echo ""

echo "→ Shopping Cart Slice (src/store/slices/shoppingCartSlice.ts)"
head -n 30 src/store/slices/shoppingCartSlice.ts
echo "... (file continues)"
echo ""
echo ""

echo "🔌 Step 4: Show Redux Provider Integration"
echo "-------------------------------------------"
echo "File: src/app/layout.tsx (Lines with StoreProvider)"
grep -A 10 "StoreProvider" src/app/layout.tsx
echo ""
echo ""

echo "💻 Step 5: Show Redux Usage in Components"
echo "------------------------------------------"
echo ""
echo "→ Examples Page (src/app/examples/page.tsx)"
echo "Redux imports:"
grep -n "useApp" src/app/examples/page.tsx | head -5
echo ""
echo "Redux hooks usage:"
grep -n "dispatch\|useAppSelector" src/app/examples/page.tsx | head -5
echo ""
echo ""

echo "→ Shop Page (src/app/shop/page.tsx)"
echo "Redux imports:"
grep -n "useApp" src/app/shop/page.tsx | head -5
echo ""
echo "Redux actions:"
grep -n "dispatch(" src/app/shop/page.tsx | head -10
echo ""
echo ""

echo "✅ Step 6: Verify Installation"
echo "-------------------------------"
echo "Redux packages in package.json:"
grep -A 2 "redux" package.json
echo ""
echo ""

echo "🎉 Demo Complete!"
echo "================="
echo ""
echo "To show this to your professor:"
echo "1. Run: bash demo-redux.sh | less"
echo "2. Open browser and visit: http://localhost:3000/examples"
echo "3. Open Redux DevTools in browser"
echo "4. Show code in VS Code side-by-side"
echo ""
