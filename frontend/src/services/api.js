import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export const generateQuiz = async (content, numQuestions = 5, difficulty = 'medium') => {
  const response = await axios.post(`${API_BASE_URL}/quiz/generate`, {
    content,
    num_questions: numQuestions,
    difficulty,
  });
  return response.data;
};