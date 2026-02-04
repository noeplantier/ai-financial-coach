from fastapi import APIRouter, HTTPException
from typing import List
from models import InvestmentModel
from config import db

router = APIRouter(prefix="/api/investments", tags=["investments"])

@router.post("/", response_model=InvestmentModel)
async def create_investment(investment: InvestmentModel):
    new_inv = investment.model_dump(by_alias=True, exclude=["id"])
    result = await db.investments.insert_one(new_inv)
    created = await db.investments.find_one({"_id": result.inserted_id})
    return created

@router.get("/", response_model=List[InvestmentModel])
async def get_investments():
    investments = await db.investments.find().to_list(1000)
    return investments
