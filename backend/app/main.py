# app/main.py (or app/services/gemini.py)
from dotenv import load_dotenv

# Load environment variables from .env file BEFORE importing services/routers
load_dotenv()

import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import quiz, notes

app = FastAPI(title="AI Study Buddy API")

# Allow local dev and production frontend
allowed_origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    os.getenv("FRONTEND_URL", "*") # Production frontend URL on Vercel
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register quiz router
app.include_router(quiz.router)

# Register Notes router
app.include_router(notes.router)


@app.get("/health")
def health_check():
    return {"status": "ok", "message": "AI Study Buddy backend is running"}