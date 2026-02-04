from fastapi import APIRouter, Depends
import requests
from typing import List, Dict

router = APIRouter(prefix="/api/crypto", tags=["crypto"])

@router.get("/market")
async def get_crypto_market_data():
    # Using CoinGecko public API (no key needed for basic usage, but has rate limits)
    # Fetching: Bitcoin, Ethereum, Solana, Binance Coin, Ripple
    ids = "bitcoin,ethereum,solana,binancecoin,ripple"
    url = f"https://api.coingecko.com/api/v3/simple/price?ids={ids}&vs_currencies=usd&include_24hr_change=true"
    
    try:
        response = requests.get(url, timeout=5)
        response.raise_for_status()
        data = response.json()
        
        # Format for frontend
        formatted_data = []
        for coin_id, info in data.items():
            formatted_data.append({
                "id": coin_id,
                "name": coin_id.capitalize(),
                "price": info['usd'],
                "change_24h": info['usd_24h_change']
            })
            
        # Sort by price desc (just to have an order)
        formatted_data.sort(key=lambda x: x['price'], reverse=True)
        return formatted_data
    except Exception as e:
        # Fallback data if API fails
        return [
            {"id": "bitcoin", "name": "Bitcoin", "price": 65000.00, "change_24h": 2.5},
            {"id": "ethereum", "name": "Ethereum", "price": 3500.00, "change_24h": 1.2},
            {"id": "solana", "name": "Solana", "price": 145.00, "change_24h": -0.5},
        ]
