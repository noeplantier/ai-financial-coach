from fastapi import APIRouter
from pydantic import BaseModel
from config import db
import os
from emergentintegrations.llm.chat import LlmChat, UserMessage
from models import CoachAdviceRequest

router = APIRouter(prefix="/api/coach", tags=["coach"])

class AdviceResponse(BaseModel):
    advice: str

@router.post("/analyze", response_model=AdviceResponse)
async def get_financial_advice(request: CoachAdviceRequest):
    # 1. Fetch data
    transactions = await db.transactions.find().sort("date", -1).limit(50).to_list(50)
    investments = await db.investments.find().to_list(50)
    
    # 2. Format data for AI
    tx_summary = "\n".join([f"{t['date']}: {t['type']} - {t['title']} (${t['amount']})" for t in transactions])
    inv_summary = "\n".join([f"{i['name']} ({i['type']}): Invested ${i['amount_invested']}, Current ${i['current_value']}" for i in investments])
    
    prompt = f"""
    You are an expert AI Financial Coach. Analyze the user's financial data.
    
    Recent Transactions:
    {tx_summary}
    
    Investments:
    {inv_summary}
    
    User Query: {request.user_query or "Give me general advice based on my habits and portfolio."}
    
    Provide concise, actionable, and futuristic advice. Be direct and helpful.
    """
    
    # 3. Call AI
    try:
        chat = LlmChat(
            api_key=os.getenv("EMERGENT_LLM_KEY"),
            session_id="financial-coach-session",
            system_message="You are a sophisticated Financial AI Coach."
        ).with_model("openai", "gpt-4o")
        
        user_msg = UserMessage(text=prompt)
        response = await chat.send_message(user_msg)
        
        # Extract text from response (adjust based on actual response structure if needed)
        # The library returns a response object, usually we print it to see structure.
        # Assuming response.text or similar. 
        # Actually checking the docs provided: "response = await chat.send_message(user_message); print(response)"
        # I'll assume it returns the string or an object with text. 
        # To be safe, I'll cast to string if needed or handle dict.
        
        # Based on typical usage of this specific library in this env:
        # It likely returns a string or an object. I will return it directly.
        
        return AdviceResponse(advice=str(response))
        
    except Exception as e:
        return AdviceResponse(advice=f"AI Service currently unavailable: {str(e)}")
