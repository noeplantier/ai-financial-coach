from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(
    title="Financial AI Coach API",
    description="API pour le coach financier AI",
    version="1.0.0"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB Connection
MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
client = AsyncIOMotorClient(MONGODB_URL)
db = client.financial_coach

# Models
class Transaction(BaseModel):
    id: Optional[str] = None
    userId: str
    amount: float
    category: str
    description: str
    date: Optional[datetime] = None
    type: str  # 'income' or 'expense'

class User(BaseModel):
    id: Optional[str] = None
    clerkId: str
    email: str
    name: Optional[str] = None
    createdAt: Optional[datetime] = None

class AIMessage(BaseModel):
    message: str
    userId: str

class AIResponse(BaseModel):
    message: str
    timestamp: str

# Startup event
@app.on_event("startup")
async def startup_db_client():
    print("🚀 Connexion à MongoDB...")
    try:
        await client.admin.command('ping')
        print("✅ MongoDB connecté avec succès")
    except Exception as e:
        print(f"❌ Erreur de connexion MongoDB: {e}")

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
    print("👋 Connexion MongoDB fermée")

# Routes
@app.get("/")
async def root():
    return {
        "message": "Financial AI Coach API",
        "status": "running",
        "version": "1.0.0"
    }

@app.get("/health")
async def health():
    try:
        await client.admin.command('ping')
        return {"status": "healthy", "database": "connected"}
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"Database error: {str(e)}")

# User Routes
@app.post("/api/users", response_model=User)
async def create_user(user: User):
    user_dict = user.dict(exclude={'id'})
    user_dict["createdAt"] = datetime.utcnow()
    
    # Vérifier si l'utilisateur existe déjà
    existing_user = await db.users.find_one({"clerkId": user.clerkId})
    if existing_user:
        existing_user["id"] = str(existing_user["_id"])
        return existing_user
    
    result = await db.users.insert_one(user_dict)
    user_dict["id"] = str(result.inserted_id)
    return user_dict

@app.get("/api/users/{clerk_id}", response_model=User)
async def get_user(clerk_id: str):
    user = await db.users.find_one({"clerkId": clerk_id})
    if user:
        user["id"] = str(user["_id"])
        return user
    raise HTTPException(status_code=404, detail="User not found")

# Transaction Routes
@app.post("/api/transactions", response_model=Transaction)
async def create_transaction(transaction: Transaction):
    transaction_dict = transaction.dict(exclude={'id'})
    transaction_dict["date"] = datetime.utcnow()
    result = await db.transactions.insert_one(transaction_dict)
    transaction_dict["id"] = str(result.inserted_id)
    return transaction_dict

@app.get("/api/transactions/{user_id}", response_model=List[Transaction])
async def get_transactions(user_id: str):
    transactions = []
    async for transaction in db.transactions.find({"userId": user_id}).sort("date", -1):
        transaction["id"] = str(transaction["_id"])
        del transaction["_id"]
        transactions.append(transaction)
    return transactions

@app.delete("/api/transactions/{transaction_id}")
async def delete_transaction(transaction_id: str):
    from bson import ObjectId
    result = await db.transactions.delete_one({"_id": ObjectId(transaction_id)})
    if result.deleted_count:
        return {"message": "Transaction deleted successfully"}
    raise HTTPException(status_code=404, detail="Transaction not found")

# AI Coach Route
@app.post("/api/ai/chat", response_model=AIResponse)
async def ai_chat(message: AIMessage):
    """
    Endpoint pour le chat avec l'AI Coach
    Pour l'instant, utilise des réponses prédéfinies
    TODO: Intégrer OpenAI ou autre LLM
    """
    responses = {
        "budget": "Pour optimiser votre budget, je recommande la règle 50/30/20 : 50% pour les besoins essentiels, 30% pour les envies, et 20% pour l'épargne et les investissements.",
        "économie": "Commencez par économiser 10% de vos revenus chaque mois. Automatisez vos virements vers un compte épargne pour créer une discipline financière.",
        "économiser": "Commencez par économiser 10% de vos revenus chaque mois. Automatisez vos virements vers un compte épargne pour créer une discipline financière.",
        "investir": "Diversifiez vos investissements entre actions (60%), obligations (30%) et liquidités (10%). Commencez petit avec des ETF et augmentez progressivement.",
        "investissement": "Diversifiez vos investissements entre actions (60%), obligations (30%) et liquidités (10%). Commencez petit avec des ETF et augmentez progressivement.",
        "dette": "Priorisez le remboursement des dettes à taux d'intérêt élevé (cartes de crédit). Utilisez la méthode 'avalanche' : remboursez d'abord les dettes avec les taux les plus élevés.",
        "dettes": "Priorisez le remboursement des dettes à taux d'intérêt élevé (cartes de crédit). Utilisez la méthode 'avalanche' : remboursez d'abord les dettes avec les taux les plus élevés.",
        "retraite": "Commencez à épargner pour la retraite le plus tôt possible. Profitez des avantages fiscaux des plans retraite (PER, assurance-vie) et visez 15% de vos revenus.",
    }
    
    user_message = message.message.lower()
    response_text = "Je suis votre coach financier AI. Je peux vous aider avec votre budget, vos économies, vos investissements, la gestion de vos dettes et la planification de votre retraite. Que souhaitez-vous savoir ?"
    
    # Chercher une correspondance dans les réponses prédéfinies
    for key, value in responses.items():
        if key in user_message:
            response_text = value
            break
    
    return AIResponse(
        message=response_text,
        timestamp=datetime.utcnow().isoformat()
    )

# Analytics Route
@app.get("/api/analytics/{user_id}")
async def get_analytics(user_id: str):
    transactions = []
    async for transaction in db.transactions.find({"userId": user_id}):
        transactions.append(transaction)
    
    total_income = sum(t["amount"] for t in transactions if t.get("type") == "income")
    total_expenses = sum(t["amount"] for t in transactions if t.get("type") == "expense")
    net_worth = total_income - total_expenses
    
    # Calcul des dépenses par catégorie
    expenses_by_category = {}
    for t in transactions:
        if t.get("type") == "expense":
            category = t.get("category", "Other")
            expenses_by_category[category] = expenses_by_category.get(category, 0) + t["amount"]
    
    return {
        "totalIncome": round(total_income, 2),
        "totalExpenses": round(total_expenses, 2),
        "netWorth": round(net_worth, 2),
        "transactionCount": len(transactions),
        "expensesByCategory": expenses_by_category
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001, reload=True)