#!/bin/bash
# filepath: start.sh

set -e

echo "🚀 Démarrage du Financial AI Coach..."
echo ""

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Fonction pour nettoyer à la sortie
cleanup() {
    echo ""
    echo "🛑 Arrêt des services..."
    if [ ! -z "$BACKEND_PID" ]; then
        kill $BACKEND_PID 2>/dev/null || true
    fi
    pkill -f "expo" 2>/dev/null || true
    
    # Arrêter MongoDB
    if [ ! -z "$MONGOD_PID" ]; then
        kill $MONGOD_PID 2>/dev/null || true
    fi
    pkill -f "mongod" 2>/dev/null || true
    
    echo "✅ Services arrêtés"
}

trap cleanup EXIT INT TERM

# Vérifier Python 3.11
echo "🐍 Vérification de Python..."
if command -v python3.11 &> /dev/null; then
    PYTHON_CMD="python3.11"
    echo -e "${GREEN}✅ Python 3.11 trouvé: $(python3.11 --version)${NC}"
elif [ -f "/opt/homebrew/bin/python3.11" ]; then
    PYTHON_CMD="/opt/homebrew/bin/python3.11"
    echo -e "${GREEN}✅ Python 3.11 trouvé: $($PYTHON_CMD --version)${NC}"
else
    echo -e "${RED}❌ Python 3.11 n'est pas installé${NC}"
    echo -e "${YELLOW}Installez-le avec: brew install python@3.11${NC}"
    exit 1
fi
echo ""

# 1. Vérifier et démarrer MongoDB
echo "📦 Vérification de MongoDB..."
if ! pgrep -x "mongod" > /dev/null; then
    echo "Démarrage de MongoDB..."
    
    # Créer le dossier de données s'il n'existe pas
    mkdir -p ~/data/db
    
    # Donner les permissions
    chmod -R 755 ~/data/db
    
    # Démarrer MongoDB en arrière-plan
    mongod --dbpath ~/data/db --fork --logpath ~/data/db/mongod.log
    MONGOD_PID=$!
    
    # Attendre que MongoDB démarre
    sleep 3
    
    if pgrep -x "mongod" > /dev/null; then
        echo -e "${GREEN}✅ MongoDB démarré avec succès${NC}"
    else
        echo -e "${RED}❌ Erreur lors du démarrage de MongoDB${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}✅ MongoDB déjà en cours d'exécution${NC}"
fi
echo ""

# 2. Configuration du Backend
echo "🔧 Configuration du Backend..."
cd backend

# Supprimer l'ancien environnement virtuel s'il existe
if [ -d "venv" ]; then
    echo "Suppression de l'ancien environnement virtuel..."
    rm -rf venv
fi

echo "Création de l'environnement virtuel avec Python 3.11..."
$PYTHON_CMD -m venv venv

source venv/bin/activate

echo "Mise à jour de pip..."
pip install --upgrade pip setuptools wheel --quiet

echo "Installation des dépendances Python..."
pip install -r requirements.txt --quiet

echo -e "${GREEN}✅ Dépendances Python installées${NC}"
echo ""

echo "Démarrage du serveur backend sur http://localhost:8001..."
python -m uvicorn server:app --reload --host 0.0.0.0 --port 8001 &
BACKEND_PID=$!

echo "Attente du démarrage du backend..."
for i in {1..10}; do
    if curl -s http://localhost:8001/health > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Backend démarré avec succès${NC}"
        echo "📡 API: http://localhost:8001"
        echo "📚 Docs: http://localhost:8001/docs"
        break
    fi
    if [ $i -eq 10 ]; then
        echo -e "${RED}❌ Erreur : Le backend n'a pas démarré${NC}"
        exit 1
    fi
    sleep 1
done
echo ""

# 3. Configuration du Frontend
echo "📱 Configuration du Frontend..."
cd ../frontend

# Créer les assets s'ils n'existent pas
if [ ! -f "assets/images/icon.png" ]; then
    echo "🎨 Création des assets..."
    mkdir -p assets/images
    
    # Créer un PNG minimal valide
    printf '\x89\x50\x4e\x47\x0d\x0a\x1a\x0a\x00\x00\x00\x0d\x49\x48\x44\x52\x00\x00\x00\x01\x00\x00\x00\x01\x08\x06\x00\x00\x00\x1f\x15\xc4\x89\x00\x00\x00\x0a\x49\x44\x41\x54\x78\x9c\x63\x00\x01\x00\x00\x05\x00\x01\x0d\x0a\x2d\xb4\x00\x00\x00\x00\x49\x45\x4e\x44\xae\x42\x60\x82' > assets/images/icon.png
    cp assets/images/icon.png assets/images/splash.png
    cp assets/images/icon.png assets/images/adaptive-icon.png
    cp assets/images/icon.png assets/images/favicon.png
    echo -e "${GREEN}✅ Assets créés${NC}"
fi

# Nettoyer les anciennes installations si nécessaire
if [ ! -d "node_modules" ]; then
    echo "Installation des dépendances npm (3-5 minutes)..."
    npm install --legacy-peer-deps --loglevel=error
    echo -e "${GREEN}✅ Dépendances npm installées${NC}"
else
    echo -e "${GREEN}✅ node_modules existe déjà${NC}"
fi
echo ""

# Démarrer Expo
echo -e "${GREEN}🎉 Démarrage de l'application Expo...${NC}"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${YELLOW}📱 Testez sur votre téléphone avec Expo Go${NC}"
echo -e "${YELLOW}💻 Ou appuyez sur 'w' pour le navigateur${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

npx expo start --clear