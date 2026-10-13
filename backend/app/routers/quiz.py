from fastapi import APIRouter, HTTPException, status
from app.schemas import QuizRequest, QuizResponse
from app.services.gemini import gemini_service

router = APIRouter(prefix="/api/quiz", tags=["Quiz"])


@router.post(
    "/generate", 
    response_model=QuizResponse, 
    status_code=status.HTTP_200_OK,
    summary="Generate a structured quiz from text"
)
async def generate_quiz(request: QuizRequest):
    try:
        quiz = await gemini_service.generate_quiz(request)
        return quiz
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to generate quiz: {str(e)}"
        )