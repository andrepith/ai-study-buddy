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