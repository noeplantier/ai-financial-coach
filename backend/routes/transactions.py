from fastapi import APIRouter, HTTPException, Body
from typing import List
from models import TransactionModel
from config import db
from datetime import datetime

router = APIRouter(prefix="/api/transactions", tags=["transactions"])

@router.post("/", response_model=TransactionModel)
async def create_transaction(transaction: TransactionModel):
    new_transaction = transaction.model_dump(by_alias=True, exclude=["id"])
    result = await db.transactions.insert_one(new_transaction)
    created_transaction = await db.transactions.find_one({"_id": result.inserted_id})
    return created_transaction

@router.get("/", response_model=List[TransactionModel])
async def get_transactions():
    transactions = await db.transactions.find().sort("date", -1).to_list(1000)
    return transactions

@router.delete("/{id}")
async def delete_transaction(id: str):
    # In a real app, use ObjectId(id)
    # For now assuming string or handling it in simple way
    # MongoDB needs ObjectId usually.
    from bson import ObjectId
    try:
        oid = ObjectId(id)
    except:
        raise HTTPException(status_code=400, detail="Invalid ID")
        
    result = await db.transactions.delete_one({"_id": oid})
    if result.deleted_count == 1:
        return {"message": "Deleted"}
    raise HTTPException(status_code=404, detail="Not found")
