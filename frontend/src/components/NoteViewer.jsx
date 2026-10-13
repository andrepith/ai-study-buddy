import React from 'react';
import { BookOpen, Key, Lightbulb, ListChecks } from 'lucide-react';

export function SummaryViewer({ data }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200 space-y-6">
      <div className="border-b pb-4">
        <h2 className="text-2xl font-bold text-slate-800">{data.title}</h2>
        <p className="text-slate-600 mt-2 leading-relaxed">{data.overview}</p>
      </div>

      {data.key_concepts.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2 mb-3">
            <Key className="w-5 h-5 text-indigo-600" /> Key Terms & Definitions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {data.key_concepts.map((item, i) => (
              <div key={i} className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="font-bold text-indigo-900 block">{item.term}</span>
                <span className="text-sm text-slate-600">{item.definition}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2 mb-3">
          <ListChecks className="w-5 h-5 text-emerald-600" /> Core Takeaways
        </h3>
        <ul className="list-disc list-inside space-y-2 text-slate-700 text-sm">
          {data.bullet_takeaways.map((bullet, i) => (
            <li key={i} className="leading-relaxed">{bullet}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function ExplanationViewer({ data }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200 space-y-6">
      <div className="border-b pb-3">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Concept Explanation</span>
        <h2 className="text-2xl font-bold text-slate-800 capitalize">{data.concept}</h2>
      </div>

      <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-lg">
        <h3 className="font-semibold text-indigo-900 mb-1">In Simple Terms:</h3>
        <p className="text-slate-700 leading-relaxed text-sm">{data.simple_explanation}</p>
      </div>

      <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <h3 className="font-semibold text-amber-900 flex items-center gap-2 mb-1">
          <Lightbulb className="w-5 h-5 text-amber-600" /> Analogy:
        </h3>
        <p className="text-amber-950 italic text-sm">{data.analogy}</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-3">How it Works:</h3>
        <ol className="list-decimal list-inside space-y-2 text-slate-700 text-sm">
          {data.key_steps.map((step, i) => (
            <li key={i} className="leading-relaxed">{step}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}