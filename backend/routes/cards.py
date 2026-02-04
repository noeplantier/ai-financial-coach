from fastapi import APIRouter, Depends
from typing import List
from models import CardModel
from config import db
from routes.auth import get_current_user

router = APIRouter(prefix="/api/cards", tags=["cards"])

@router.get("/", response_model=List[CardModel])
async def get_my_cards(current_user: dict = Depends(get_current_user)):
    cards = await db.cards.find({"user_id": str(current_user["_id"])}).to_list(100)
    
    # Seed if empty for demo
    if not cards:
        seed_cards = [
            CardModel(
                user_id=str(current_user["_id"]),
                card_number_last4="4242",
                card_holder=current_user.get("full_name", "User"),
                expiry_date="12/28",
                balance=15450.00,
                color_theme="gold",
                type="visa"
            ),
            CardModel(
                user_id=str(current_user["_id"]),
                card_number_last4="8899",
                card_holder=current_user.get("full_name", "User"),
                expiry_date="09/27",
                balance=2300.50,
                color_theme="black",
                type="mastercard"
            )
        ]
        for card in seed_cards:
            await db.cards.insert_one(card.model_dump(by_alias=True, exclude=["id"]))
        
        cards = await db.cards.find({"user_id": str(current_user["_id"])}).to_list(100)
        
    return cards
