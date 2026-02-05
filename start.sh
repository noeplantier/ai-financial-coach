#!/bin/bash

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Démarrage du Financial Coach AI${NC}"
echo ""

# Créer le dossier logs dès le début
mkdir -p logs

# Vérifier Python 3.11
if command -v /opt/homebrew/bin/python3.11 &> /dev/null; then
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
    
    # Démarrer MongoDB en arrière-plan (SANS --fork pour macOS)
    mongod --dbpath ~/data/db --logpath ~/data/db/mongod.log > /dev/null 2>&1 &
    MONGOD_PID=$!
    echo $MONGOD_PID > /tmp/mongod.pid
    
    # Attendre que MongoDB démarre
    sleep 3
    
    if pgrep -x "mongod" > /dev/null; then
        echo -e "${GREEN}✅ MongoDB démarré (PID: $MONGOD_PID)${NC}"
    else
        echo -e "${RED}❌ Échec du démarrage de MongoDB${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}✅ MongoDB est déjà en cours d'exécution${NC}"
fi
echo ""

# 2. Démarrer le Backend
echo "🔧 Démarrage du Backend..."
cd backend

# Vérifier si l'environnement virtuel existe
if [ ! -d "venv" ]; then
    echo "Création de l'environnement virtuel..."
    $PYTHON_CMD -m venv venv
fi

# Activer l'environnement virtuel
source venv/bin/activate

# Toujours installer/mettre à jour les dépendances
echo "Installation des dépendances..."
pip install --upgrade pip
pip install -r requirements.txt

# Démarrer le serveur backend
echo "Lancement du serveur backend..."
python server.py > ../logs/backend.log 2>&1 &
BACKEND_PID=$!
echo $BACKEND_PID > /tmp/backend.pid

sleep 3

if ps -p $BACKEND_PID > /dev/null; then
    echo -e "${GREEN}✅ Backend démarré (PID: $BACKEND_PID)${NC}"
else
    echo -e "${RED}❌ Échec du démarrage du backend${NC}"
    echo "Dernières lignes du log:"
    tail -20 ../logs/backend.log
    exit 1
fi

cd ..
echo ""

# 3. Démarrer le Frontend
echo "🎨 Démarrage du Frontend..."
cd frontend

# Vérifier si node_modules existe
if [ ! -d "node_modules" ]; then
    echo "Installation des dépendances npm..."
    npm install
fi

# Démarrer le frontend
echo "Lancement de l'application Expo..."
npm start > ../logs/frontend.log 2>&1 &
FRONTEND_PID=$!
echo $FRONTEND_PID > /tmp/frontend.pid

sleep 2

if ps -p $FRONTEND_PID > /dev/null; then
    echo -e "${GREEN}✅ Frontend démarré (PID: $FRONTEND_PID)${NC}"
else
    echo -e "${RED}❌ Échec du démarrage du frontend${NC}"
    cat ../logs/frontend.log
    exit 1
fi

cd ..
echo ""

# Afficher les informations
echo -e "${GREEN}✨ Tous les services sont démarrés !${NC}"
echo ""
echo "📍 URLs:"
echo "   Backend: http://localhost:5000"
echo "   Frontend: http://localhost:19006 (ou via l'app Expo Go)"
echo ""
echo "📝 Logs:"
echo "   Backend: tail -f logs/backend.log"
echo "   Frontend: tail -f logs/frontend.log"
echo "   MongoDB: tail -f ~/data/db/mongod.log"
echo ""
echo -e "${YELLOW}Pour arrêter les services, exécutez: ./stop.sh${NC}"