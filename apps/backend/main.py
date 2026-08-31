from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from apps.backend.api.router import api_router
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    print("KOVAE Backend starting up...")
    yield
    # Shutdown
    print("KOVAE Backend shutting down...")

app = FastAPI(
    title="KOVAE API",
    description="Backend API for KOVAE Mobile App",
    version="0.1.0",
    lifespan=lifespan
)

# CORS middleware for local dev
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api/v1")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("apps.backend.main:app", host="0.0.0.0", port=8000, reload=True)
