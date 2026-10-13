# app/main.py (or app/services/gemini.py)
from dotenv import load_dotenv

# Load environment variables from .env file BEFORE importing services/routers
load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import quiz, notes

app = FastAPI(title="AI Study Buddy API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite frontend
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