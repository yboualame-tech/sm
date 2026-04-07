#!/bin/bash

# Script d'installation et configuration du portfolio
# Usage: ./setup.sh

echo "🚀 Installation du Portfolio Astro"
echo "=================================="

# Vérifier Node.js
echo ""
echo "📋 Vérification des prérequis..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé"
    echo "Installez Node.js depuis https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js: $(node --version)"
echo "✅ npm: $(npm --version)"

# Installer les dépendances
echo ""
echo "📦 Installation des dépendances..."
npm install

# Build du projet
echo ""
echo "🔨 Build du projet..."
npm run build

# Résumé
echo ""
echo "=================================="
echo "✅ Installation terminée!"
echo "=================================="
echo ""
echo "📝 Prochaines étapes:"
echo "1. Modifiez 'src/data/portfolio.ts' avec vos informations"
echo "2. Lancez le serveur de développement: npm run dev"
echo "3. Ouvrez http://localhost:3000 dans votre navigateur"
echo "4. Déployez sur Vercel: suivez DEPLOYMENT_GUIDE.md"
echo ""
echo "📚 Documentation:"
echo "  - README.md - Guide complet"
echo "  - DEPLOYMENT_GUIDE.md - Guide Vercel"
echo ""
