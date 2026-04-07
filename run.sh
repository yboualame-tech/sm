#!/bin/bash

# Quick start script for Snake game

echo "🐍 Snake Game - Quick Start"
echo "============================"
echo ""

if [ ! -f "build/snake" ]; then
    echo "🔨 Building project..."
    make > /dev/null 2>&1
    if [ $? -eq 0 ]; then
        echo "✓ Build successful"
    else
        echo "✗ Build failed"
        exit 1
    fi
fi

echo ""
echo "📋 Instructions:"
echo "  ↑/W - Move up"
echo "  ↓/S - Move down"
echo "  ←/A - Move left"
echo "  →/D - Move right"
echo "  R - Restart after game over"
echo "  Q - Quit"
echo ""
echo "🎮 Starting game..."
echo ""

./build/snake
