from pydantic import BaseModel, Field, EmailStr, BeforeValidator
from typing import Optional, List, Annotated
from datetime import datetime

PyObjectId = Annotated[str, BeforeValidator(str)]

# --- User Models ---
class UserCreate(BaseModel):
    email: EmailStr
    password: str
    full_name: str

class UserInDB(UserCreate):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    hashed_password: str

class Token(BaseModel):
    access_token: str
    token_type: str

# --- Transaction Models ---
class TransactionModel(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    user_id: Optional[str] = None # Link to user (optional for now to support legacy data)
    title: str
    amount: float
    type: str  # "expense" or "income"
    category: str
    date: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True

# --- Investment Models ---
class InvestmentModel(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    user_id: Optional[str] = None
    name: str
    amount_invested: float
    current_value: float
    type: str  # "stock", "crypto", "etf", "real_estate"
    date_added: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True

# --- Card Models ---
class CardModel(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    user_id: str
    card_number_last4: str
    card_holder: str
    expiry_date: str
    balance: float
    color_theme: str # "gold", "black", "blue"
    type: str # "visa", "mastercard"

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True

class CoachAdviceRequest(BaseModel):
    user_query: Optional[str] = None
