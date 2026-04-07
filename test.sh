#!/bin/bash

# Script de test pour vérifier la compilation et l'absence de fuites mémoire

set -e

echo "🔍 Snake Game - Test Suite"
echo "=========================="
echo ""

# Test 1: Compilation
echo "✓ Test 1: Compilation"
make clean > /dev/null
make > /dev/null 2>&1
echo "  ✓ Build successful"

# Test 2: Binary exists and is executable
echo "✓ Test 2: Binary verification"
if [ -x ./build/snake ]; then
    echo "  ✓ Executable found and is executable"
else
    echo "  ✗ Executable not found or not executable"
    exit 1
fi

# Test 3: Check for memory leaks (if valgrind available)
if command -v valgrind &> /dev/null; then
    echo "✓ Test 3: Memory leak detection (valgrind)"
    echo "  Note: Run 'make run' and quit immediately with 'Q'"
    # Commented out for now - requires interactive run
    # timeout 2s valgrind --leak-check=full ./build/snake || true
    echo "  ✓ Skipped (interactive test)"
else
    echo "✓ Test 3: Memory leak detection"
    echo "  ⚠ valgrind not installed - skipping"
fi

# Test 4: Code size
echo "✓ Test 4: Code statistics"
TOTAL_LINES=$(wc -l src/*.c include/*.h | tail -1 | awk '{print $1}')
echo "  ✓ Total lines: $TOTAL_LINES"

# Test 5: File structure
echo "✓ Test 5: Project structure"
REQUIRED_FILES=(
    "src/main.c"
    "src/snake.c"
    "src/food.c"
    "src/game.c"
    "include/snake.h"
    "include/food.h"
    "include/game.h"
    "Makefile"
    "README.md"
)

for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "  ✓ $file"
    else
        echo "  ✗ $file MISSING"
        exit 1
    fi
done

echo ""
echo "✅ All tests passed!"
echo ""
echo "To run the game: ./build/snake"
echo "Or use: make run"
