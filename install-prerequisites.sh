#!/bin/bash
# filepath: install-prerequisites.sh

echo "🔧 Installation des Prérequis pour Financial AI Coach"
echo "======================================================"
echo ""

# Vérifier Homebrew
if ! command -v brew &> /dev/null; then
    echo "📦 Installation de Homebrew..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
else
    echo "✅ Homebrew déjà installé"
fi

# Installer Python 3.11
echo ""
echo "🐍 Installation de Python 3.11..."
brew install python@3.11

# Installer Node.js
echo ""
echo "📦 Installation de Node.js..."
brew install node

# Installer MongoDB
echo ""
echo "🗄️  Installation de MongoDB..."
brew tap mongodb/brew
brew install mongodb-community

# Créer le dossier de données MongoDB
echo ""
echo "📁 Création du dossier de données MongoDB..."
mkdir -p ~/data/db

# Installer Rust (optionnel mais recommandé pour Pydantic)
echo ""
echo "🦀 Installation de Rust (pour optimiser Pydantic)..."
if ! command -v rustc &> /dev/null; then
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
    source "$HOME/.cargo/env"
else
    echo "✅ Rust déjà installé"
fi

echo ""
echo "======================================================"
echo "✅ Installation des prérequis terminée!"
echo ""
echo "Prochaines étapes:"
echo "1. Exécutez: ./diagnostic.sh"
echo "2. Si tout est OK, exécutez: ./start.sh"