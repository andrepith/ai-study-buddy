import axios from 'axios';

// Dynamically picks production backend URL or falls back to localhost for dev
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'

export const generateQuiz = async (content, numQuestions = 5, difficulty = 'medium') => {
  const response = await axios.post(`${API_BASE_URL}/quiz/generate`, {
    content,
    num_questions: numQuestions,
    difficulty,
  });
  return response.data;
};

export const generateSummary = async (content, formatStyle = 'bullet_points') => {
  const response = await axios.post(`${API_BASE_URL}/notes/summarize`, {
    content,
    format_style: formatStyle,
  });
  return response.data;
};

export const explainConcept = async (concept, targetAudience = 'beginner') => {
  const response = await axios.post(`${API_BASE_URL}/notes/explain`, {
    concept,
    target_audience: targetAudience,
  });
  return response.data;
};