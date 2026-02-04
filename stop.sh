#!/bin/bash

# filepath: stop.sh
echo "🛑 Arrêt du Financial AI Coach..."

# Tuer tous les processus liés
echo "Arrêt du backend..."
pkill -f "uvicorn" 2>/dev/null || true
pkill -f "server:app" 2>/dev/null || true

echo "Arrêt du frontend..."
pkill -f "expo" 2>/dev/null || true
pkill -f "metro" 2>/dev/null || true

# Arrêter MongoDB (optionnel)
if command -v brew &> /dev/null; then
    echo "Arrêt de MongoDB..."
    brew services stop mongodb-community 2>/dev/null || true
fi

# Libérer le port 8001 si nécessaire
if lsof -ti:8001 > /dev/null 2>&1; then
    echo "Libération du port 8001..."
    lsof -ti:8001 | xargs kill -9 2>/dev/null || true
fi

echo "✅ Tous les services sont arrêtés"