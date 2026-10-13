import React, { useState } from "react";
import { CheckCircle2, XCircle, RotateCcw, Award } from "lucide-react";

export default function QuizPlayer({ quiz, onReset }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelectOption = (questionId, optionId) => {
    if (submitted) return; // Lock choices after submit
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const calculateScore = () => {
    let score = 0;
    quiz.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correct_option_id) {
        score += 1;
      }
    });
    return score;
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md border border-slate-200">
      <div className="border-b pb-4 mb-6">
        <h2 className="text-2xl font-bold text-slate-800">{quiz.title}</h2>
        <p className="text-slate-600 mt-1">{quiz.summary}</p>
      </div>

      <div className="space-y-8">
        {quiz.questions.map((q, idx) => {
          const userChoice = selectedAnswers[q.id];
          const isCorrect = userChoice === q.correct_option_id;

          return (
            <div
              key={q.id}
              className="p-4 rounded-lg bg-slate-50 border border-slate-200"
            >
              <h3 className="font-semibold text-slate-800 text-lg mb-3">
                {idx + 1}. {q.question}
              </h3>

              <div className="space-y-2">
                {q.options.map((opt) => {
                  let buttonStyle =
                    "border-slate-300 hover:bg-slate-100 text-slate-700";

                  if (submitted) {
                    if (opt.id === q.correct_option_id) {
                      buttonStyle =
                        "bg-emerald-100 border-emerald-500 text-emerald-900 font-medium";
                    } else if (userChoice === opt.id) {
                      buttonStyle = "bg-rose-100 border-rose-500 text-rose-900";
                    }
                  } else if (userChoice === opt.id) {
                    buttonStyle =
                      "bg-indigo-50 border-indigo-500 text-indigo-700 font-medium";
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectOption(q.id, opt.id)}
                      className={`w-full text-left p-3 rounded-md border text-sm transition-all flex items-center justify-between ${buttonStyle}`}
                    >
                      <span>
                        <strong className="mr-2">{opt.id}.</strong> {opt.text}
                      </span>
                      {submitted && opt.id === q.correct_option_id && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      )}
                      {submitted &&
                        userChoice === opt.id &&
                        opt.id !== q.correct_option_id && (
                          <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                        )}
                    </button>
                  );
                })}
              </div>

              {submitted && (
                <div className="mt-3 p-3 text-xs rounded bg-blue-50 border border-blue-200 text-blue-900">
                  <strong>Explanation:</strong> {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 pt-4 border-t flex items-center justify-between">
        {!submitted ? (
          <button
            onClick={() => setSubmitted(true)}
            disabled={
              Object.keys(selectedAnswers).length < quiz.questions.length
            }
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg disabled:opacity-50 transition-all"
          >
            Submit Quiz
          </button>
        ) : (
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-2 text-indigo-900 font-bold text-lg">
              <Award className="w-6 h-6 text-indigo-600" />
              <span>
                Score: {calculateScore()} / {quiz.questions.length}
              </span>
            </div>
            <button
              onClick={onReset}
              className="flex items-center space-x-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-100 text-slate-700 text-sm font-medium"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Create Another Quiz</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
