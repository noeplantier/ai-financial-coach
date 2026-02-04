#!/bin/bash
# filepath: diagnostic.sh

echo "🔍 Diagnostic du Projet Financial AI Coach"
echo "=========================================="
echo ""

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Vérifier Python 3.11
echo "🐍 Python 3.11:"
if command -v python3.11 &> /dev/null; then
    echo -e "${GREEN}✅ Version: $(python3.11 --version)${NC}"
elif [ -f "/opt/homebrew/bin/python3.11" ]; then
    echo -e "${GREEN}✅ Version: $(/opt/homebrew/bin/python3.11 --version)${NC}"
else
    echo -e "${RED}❌ Python 3.11 n'est pas installé${NC}"
    echo -e "${YELLOW}   Installer avec: brew install python@3.11${NC}"
fi
echo ""

# Vérifier Python 3.13 (à éviter)
if command -v python3.13 &> /dev/null; then
    echo -e "${YELLOW}⚠️  Python 3.13 détecté - peut causer des problèmes avec Pydantic${NC}"
    echo "   Utilisez Python 3.11 à la place"
    echo ""
fi

# Vérifier Node.js
echo "📦 Node.js:"
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -ge "18" ]; then
        echo -e "${GREEN}✅ Version: $(node --version)${NC}"
    else
        echo -e "${YELLOW}⚠️  Version: $(node --version) - Recommandé: v18+${NC}"
    fi
else
    echo -e "${RED}❌ Node.js n'est pas installé${NC}"
    echo -e "${YELLOW}   Installer avec: brew install node${NC}"
fi
echo ""

# Vérifier npm
echo "📦 npm:"
if command -v npm &> /dev/null; then
    echo -e "${GREEN}✅ Version: $(npm --version)${NC}"
else
    echo -e "${RED}❌ npm n'est pas installé${NC}"
fi
echo ""

# Vérifier MongoDB
echo "🗄️  MongoDB:"
if command -v mongod &> /dev/null; then
    echo -e "${GREEN}✅ Installé: $(mongod --version | head -n 1)${NC}"
    if pgrep -x "mongod" > /dev/null; then
        echo -e "${GREEN}✅ En cours d'exécution${NC}"
    else
        echo -e "${YELLOW}⚠️  Installé mais pas en cours d'exécution${NC}"
        echo "   Démarrer avec: brew services start mongodb-community"
    fi
else
    echo -e "${RED}❌ MongoDB n'est pas installé${NC}"
    echo -e "${YELLOW}   Installer avec:${NC}"
    echo "   brew tap mongodb/brew"
    echo "   brew install mongodb-community"
fi
echo ""

# Vérifier Rust (nécessaire pour Pydantic)
echo "🦀 Rust (pour Pydantic):"
if command -v rustc &> /dev/null; then
    echo -e "${GREEN}✅ Version: $(rustc --version)${NC}"
else
    echo -e "${YELLOW}⚠️  Rust n'est pas installé (peut causer des problèmes avec Pydantic)${NC}"
    echo -e "${YELLOW}   Installer avec: curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh${NC}"
fi
echo ""

# Vérifier les ports
echo "🔌 Ports:"
if lsof -ti:8001 > /dev/null 2>&1; then
    echo -e "${YELLOW}⚠️  Port 8001 est utilisé${NC}"
    echo "   Processus: $(lsof -ti:8001 | xargs ps -p | tail -n 1)"
else
    echo -e "${GREEN}✅ Port 8001 est libre${NC}"
fi

if lsof -ti:19000 > /dev/null 2>&1; then
    echo -e "${YELLOW}⚠️  Port 19000 est utilisé${NC}"
else
    echo -e "${GREEN}✅ Port 19000 est libre${NC}"
fi
echo ""

# Vérifier la structure des fichiers
echo "📁 Structure du projet:"
MISSING_FILES=0

check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✅ $1${NC}"
    else
        echo -e "${RED}❌ $1 manquant${NC}"
        MISSING_FILES=$((MISSING_FILES + 1))
    fi
}

check_file "backend/server.py"
check_file "backend/requirements.txt"
check_file "backend/.env"
check_file "frontend/package.json"
check_file "frontend/app/_layout.tsx"

echo ""
echo "=========================================="

if [ $MISSING_FILES -eq 0 ]; then
    echo -e "${GREEN}✅ Tous les fichiers essentiels sont présents${NC}"
else
    echo -e "${RED}❌ $MISSING_FILES fichier(s) manquant(s)${NC}"
fi

echo ""
echo "Diagnostic terminé!"