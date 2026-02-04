from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from config import client
from routes import transactions, investments, ai_coach, auth, crypto, cards
import logging

# App init
app = FastAPI(title="AI Financial Coach API")

# Middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(auth.router)
app.include_router(transactions.router)
app.include_router(investments.router)
app.include_router(cards.router)
app.include_router(crypto.router)
app.include_router(ai_coach.router)

@app.get("/api/health")
async def health_check():
    return {"status": "ok"}

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
