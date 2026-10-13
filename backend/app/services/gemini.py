import os
from google import genai
from google.genai import types
from app.schemas import QuizRequest, QuizResponse


class GeminiService:
    def __init__(self):
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("GEMINI_API_KEY environment variable is missing.")
        
        self.client = genai.Client(api_key=api_key)
        
        # Updated to the active fast model
        self.model_name = "gemini-3.8-flash"
        
    async def generate_quiz(self, request: QuizRequest) -> QuizResponse:
        prompt = f"""
        You are an expert AI Study Buddy.
        Create a {request.difficulty.value}-level multiple-choice quiz with exactly {request.num_questions} questions 
        based solely on the following study material.

        Study Material:
        \"\"\"
        {request.content}
        \"\"\"
        """

        # Force Gemini to return strictly matching JSON for QuizResponse
        response = self.client.models.generate_content(
            model=self.model_name,
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=QuizResponse,
                temperature=0.3,  # Lower temperature for accurate educational content
            ),
        )

        # Gemini returns a structured JSON string adhering to QuizResponse schema
        return QuizResponse.model_validate_json(response.text)


# Singleton instance
gemini_service = GeminiService()