from fastapi import APIRouter, HTTPException, status
from app.schemas import SummaryRequest, SummaryResponse, ExplainRequest, ExplainResponse
from app.services.gemini import gemini_service

router = APIRouter(prefix="/api/notes", tags=["Notes & Explanations"])


@router.post("/summarize", response_model=SummaryResponse)
async def summarize_notes(request: SummaryRequest):
    try:
        return await gemini_service.generate_summary(request)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to generate summary: {str(e)}"
        )


@router.post("/explain", response_model=ExplainResponse)
async def explain_concept(request: ExplainRequest):
    try:
        return await gemini_service.explain_concept(request)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to explain concept: {str(e)}"
        )