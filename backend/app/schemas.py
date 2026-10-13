from enum import Enum
from typing import List
from pydantic import BaseModel, Field


class DifficultyLevel(str, Enum):
    EASY = "easy"
    MEDIUM = "medium"
    HARD = "hard"


# --- Request Models ---
class QuizRequest(BaseModel):
    content: str = Field(
        ..., 
        description="The study text, notes, or article content to generate questions from.",
        min_length=50
    )
    num_questions: int = Field(
        default=5, 
        ge=1, 
        le=20, 
        description="Number of questions to generate (1-20)."
    )
    difficulty: DifficultyLevel = Field(
        default=DifficultyLevel.MEDIUM, 
        description="Target difficulty level."
    )


# --- Response Models (Passed as Gemini's output schema) ---
class QuizOption(BaseModel):
    id: str = Field(..., description="Option label, e.g., 'A', 'B', 'C', 'D'")
    text: str = Field(..., description="The option text")


class Question(BaseModel):
    id: int = Field(..., description="Sequential question number starting at 1")
    question: str = Field(..., description="The question prompt")
    options: List[QuizOption] = Field(..., description="List of 4 multiple-choice options")
    correct_option_id: str = Field(..., description="The id of the correct option (e.g. 'A')")
    explanation: str = Field(..., description="Clear explanation of why the correct answer is right.")


class QuizResponse(BaseModel):
    title: str = Field(..., description="A concise title for this quiz based on the content")
    summary: str = Field(..., description="A short 1-2 sentence overview of what this quiz covers")
    questions: List[Question] = Field(..., description="The generated list of quiz questions")

# --- Note Summarizer Models ---
class SummaryRequest(BaseModel):
    content: str = Field(..., min_length=50, description="Raw study notes or transcript")
    format_style: str = Field(
        default="bullet_points", 
        description="Format: 'bullet_points', 'detailed_guide', or 'executive_summary'"
    )

class KeyConcept(BaseModel):
    term: str = Field(..., description="The key term or concept")
    definition: str = Field(..., description="Concise definition or explanation")

class SummaryResponse(BaseModel):
    title: str = Field(..., description="Main topic or title")
    overview: str = Field(..., description="2-3 sentence high-level summary")
    key_concepts: List[KeyConcept] = Field(..., description="Essential terms and definitions")
    bullet_takeaways: List[str] = Field(..., description="Main study takeaways")

# --- Concept Explainer Models ---
class ExplainRequest(BaseModel):
    concept: str = Field(..., min_length=3, description="Concept or question to explain (e.g. 'Recursion', 'Photosynthesis')")
    target_audience: str = Field(
        default="beginner", 
        description="Audience level: 'child' (ELI5), 'beginner', or 'undergrad'"
    )

class ExplainResponse(BaseModel):
    concept: str = Field(..., description="The concept being explained")
    simple_explanation: str = Field(..., description="Clear explanation matched to target audience")
    analogy: str = Field(..., description="A relatable real-world analogy")
    key_steps: List[str] = Field(..., description="Step-by-step logical breakdown")