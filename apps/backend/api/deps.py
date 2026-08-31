import os
from supabase import create_client, Client
from fastapi import Header, HTTPException, Depends

# In production, these should be loaded from env vars and validated
SUPABASE_URL = os.environ.get("SUPABASE_URL", "http://127.0.0.1:54321")
SUPABASE_KEY = os.environ.get("SUPABASE_ANON_KEY", "dummy_anon_key")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def get_supabase() -> Client:
    """Dependency to inject the Supabase client into routes."""
    return supabase

async def verify_auth(authorization: str = Header(None)) -> str:
    """
    Verify the JWT token and return the user ID.
    Phase 2: returns a mock user ID for local dev.
    """
    if not authorization or not authorization.startswith("Bearer "):
        # In a real app, we'd raise a 401
        # raise HTTPException(status_code=401, detail="Missing or invalid token")
        return "mock-user-id"
    
    token = authorization.split(" ")[1]
    # Here we would call supabase.auth.get_user(token)
    return "mock-user-id"
