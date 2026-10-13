import React, { useState } from 'react';
import { Sparkles, BookOpen } from 'lucide-react';
import { generateQuiz } from './services/api';
import QuizPlayer from './components/QuizPlayer';

export default function App() {
  const [content, setContent] = useState('');
  const [numQuestions, setNumQuestions] = useState(5);
  const [difficulty, setDifficulty] = useState('medium');
  const [loading, setLoading] = useState(false);
  const [quiz, setQuiz] = useState(null);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (content.length < 50) {
      setError('Please provide at least 50 characters of study material.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const result = await generateQuiz(content, numQuestions, difficulty);
      setQuiz(result);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to generate quiz. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 p-6">
      <header className="max-w-4xl mx-auto mb-8 flex items-center justify-between border-b border-slate-200 pb-4">
        <div className="flex items-center space-x-3">
          <BookOpen className="w-8 h-8 text-indigo-600" />
          <h1 className="text-2xl font-bold tracking-tight">AI Study Buddy</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto">
        {!quiz ? (
          <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200 space-y-4">
            <h2 className="text-xl font-semibold text-slate-800">Generate a Quiz from Study Material</h2>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Paste your notes, lecture transcript, or textbook summary:</label>
              <textarea
                rows={8}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Paste text here (e.g. key concepts, biology notes, history chapter)..."
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Number of Questions:</label>
                <select
                  value={numQuestions}
                  onChange={(e) => setNumQuestions(Number(e.target.value))}
                  className="w-full p-2 border border-slate-300 rounded-lg text-sm bg-white"
                >
                  <option value={3}>3 Questions</option>
                  <option value={5}>5 Questions</option>
                  <option value={10}>10 Questions</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Difficulty:</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-lg text-sm bg-white"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
            </div>

            {error && <p className="text-rose-600 text-sm">{error}</p>}

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg flex items-center justify-center space-x-2 transition-all disabled:opacity-50"
            >
              <Sparkles className="w-5 h-5" />
              <span>{loading ? 'Generating Quiz with Gemini...' : 'Generate Quiz'}</span>
            </button>
          </div>
        ) : (
          <QuizPlayer quiz={quiz} onReset={() => setQuiz(null)} />
        )}
      </main>
    </div>
  );
}