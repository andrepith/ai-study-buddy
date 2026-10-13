import React, { useState } from 'react';
import { BookOpen, HelpCircle, FileText, Lightbulb, Sparkles } from 'lucide-react';
import { generateQuiz, generateSummary, explainConcept } from './services/api';
import QuizPlayer from './components/QuizPlayer';
import { SummaryViewer, ExplanationViewer } from './components/NoteViewer';

export default function App() {
  const [activeTab, setActiveTab] = useState('quiz'); // 'quiz' | 'summary' | 'explain'

  // Quiz state
  const [quizContent, setQuizContent] = useState('');
  const [numQuestions, setNumQuestions] = useState(5);
  const [quizDifficulty, setQuizDifficulty] = useState('medium');
  const [quizData, setQuizData] = useState(null);

  // Summary state
  const [summaryContent, setSummaryContent] = useState('');
  const [formatStyle, setFormatStyle] = useState('bullet_points');
  const [summaryData, setSummaryData] = useState(null);

  // Concept Explain state
  const [concept, setConcept] = useState('');
  const [audience, setAudience] = useState('beginner');
  const [explainData, setExplainData] = useState(null);

  // Shared UI states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handlers
  const handleGenerateQuiz = async () => {
    if (quizContent.length < 50) {
      setError('Please provide at least 50 characters of study material.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const data = await generateQuiz(quizContent, numQuestions, quizDifficulty);
      setQuizData(data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to generate quiz.');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateSummary = async () => {
    if (summaryContent.length < 50) {
      setError('Please provide at least 50 characters of notes.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const data = await generateSummary(summaryContent, formatStyle);
      setSummaryData(data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to generate summary.');
    } finally {
      setLoading(false);
    }
  };

  const handleExplainConcept = async () => {
    if (!concept.trim()) {
      setError('Please enter a concept or topic name.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const data = await explainConcept(concept, audience);
      setExplainData(data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to explain concept.');
    } finally {
      setLoading(false);
    }
  };

  const navTabs = [
    { id: 'quiz', label: 'Quiz Generator', icon: HelpCircle },
    { id: 'summary', label: 'Note Summarizer', icon: FileText },
    { id: 'explain', label: 'Concept Explainer', icon: Lightbulb },
  ];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 p-6">
      {/* Header */}
      <header className="max-w-4xl mx-auto mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-4 gap-4">
        <div className="flex items-center space-x-3">
          <BookOpen className="w-8 h-8 text-indigo-600" />
          <h1 className="text-2xl font-bold tracking-tight">AI Study Buddy</h1>
        </div>

        {/* Tab Switcher */}
        <nav className="flex space-x-1 bg-slate-200 p-1 rounded-xl">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setError('');
                }}
                className={`flex items-center space-x-2 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all ${
                  isActive
                    ? 'bg-white text-indigo-600 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-300/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto">
        {error && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* TAB 1: QUIZ GENERATOR */}
        {activeTab === 'quiz' && (
          <div>
            {!quizData ? (
              <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200 space-y-4">
                <h2 className="text-xl font-semibold text-slate-800">Generate Practice Quiz</h2>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Paste your study material:
                  </label>
                  <textarea
                    rows={8}
                    value={quizContent}
                    onChange={(e) => setQuizContent(e.target.value)}
                    placeholder="Paste text here..."
                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Questions:</label>
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
                      value={quizDifficulty}
                      onChange={(e) => setQuizDifficulty(e.target.value)}
                      className="w-full p-2 border border-slate-300 rounded-lg text-sm bg-white"
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>
                </div>
                <button
                  onClick={handleGenerateQuiz}
                  disabled={loading}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg flex items-center justify-center space-x-2 transition-all disabled:opacity-50"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>{loading ? 'Generating Quiz...' : 'Generate Quiz'}</span>
                </button>
              </div>
            ) : (
              <QuizPlayer quiz={quizData} onReset={() => setQuizData(null)} />
            )}
          </div>
        )}

        {/* TAB 2: NOTE SUMMARIZER */}
        {activeTab === 'summary' && (
          <div>
            {!summaryData ? (
              <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200 space-y-4">
                <h2 className="text-xl font-semibold text-slate-800">Summarize & Structure Notes</h2>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Paste raw lecture text or article:
                  </label>
                  <textarea
                    rows={8}
                    value={summaryContent}
                    onChange={(e) => setSummaryContent(e.target.value)}
                    placeholder="Paste lecture notes or article here..."
                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Summary Format:</label>
                  <select
                    value={formatStyle}
                    onChange={(e) => setFormatStyle(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded-lg text-sm bg-white"
                  >
                    <option value="bullet_points">Key Bullet Points & Definitions</option>
                    <option value="detailed_guide">Detailed Study Guide</option>
                    <option value="executive_summary">Executive Summary</option>
                  </select>
                </div>
                <button
                  onClick={handleGenerateSummary}
                  disabled={loading}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg flex items-center justify-center space-x-2 transition-all disabled:opacity-50"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>{loading ? 'Summarizing...' : 'Summarize Notes'}</span>
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <button
                  onClick={() => setSummaryData(null)}
                  className="text-sm font-medium text-indigo-600 hover:underline"
                >
                  ← Summarize another text
                </button>
                <SummaryViewer data={summaryData} />
              </div>
            )}
          </div>
        )}

        {/* TAB 3: CONCEPT EXPLAINER */}
        {activeTab === 'explain' && (
          <div>
            {!explainData ? (
              <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200 space-y-4">
                <h2 className="text-xl font-semibold text-slate-800">Explain Complex Concepts</h2>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    What concept do you want explained?
                  </label>
                  <input
                    type="text"
                    value={concept}
                    onChange={(e) => setConcept(e.target.value)}
                    placeholder="e.g., Recursion, Photosynthesis, Quantum Entanglement..."
                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Target Audience:</label>
                  <select
                    value={audience}
                    onChange={(e) => setAudience(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded-lg text-sm bg-white"
                  >
                    <option value="child">Child (ELI5 / Super Simple)</option>
                    <option value="beginner">Beginner High Schooler</option>
                    <option value="undergrad">Undergraduate Student</option>
                  </select>
                </div>
                <button
                  onClick={handleExplainConcept}
                  disabled={loading}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg flex items-center justify-center space-x-2 transition-all disabled:opacity-50"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>{loading ? 'Explaining...' : 'Explain Concept'}</span>
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <button
                  onClick={() => setExplainData(null)}
                  className="text-sm font-medium text-indigo-600 hover:underline"
                >
                  ← Ask another concept
                </button>
                <ExplanationViewer data={explainData} />
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}