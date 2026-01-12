
import React, { useState } from 'react';
import { getArchitecturalAdvice } from '../services/geminiService';
import { Blueprint } from '../types';

const Architect: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [blueprint, setBlueprint] = useState<Blueprint | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getArchitecturalAdvice(`I want to build a dynamic website that: ${prompt}`);
      setBlueprint(data);
    } catch (err) {
      setError('Failed to generate blueprint. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-slate-900 p-8 rounded-xl border border-slate-700 shadow-2xl">
        <h2 className="text-3xl font-bold mb-2">AI Architectural Planner</h2>
        <p className="text-slate-400 mb-6">Describe your dynamic website idea, and Gemini will architect the full stack for you.</p>
        
        <div className="flex flex-col space-y-4">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., A real-time dashboard for crypto prices with user-specific alerts and history charts..."
            className="w-full h-32 bg-slate-800 border border-slate-600 rounded-lg p-4 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <button
            onClick={handleGenerate}
            disabled={loading || !prompt}
            className={`py-3 px-6 rounded-lg font-bold transition-all ${
              loading || !prompt 
                ? 'bg-slate-700 text-slate-500 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/40'
            }`}
          >
            {loading ? 'Consulting the Architect...' : 'Generate Technical Blueprint'}
          </button>
        </div>
        {error && <p className="mt-4 text-red-400 text-sm">{error}</p>}
      </div>

      {blueprint && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-slate-900 p-8 rounded-xl border border-slate-700">
              <h3 className="text-2xl font-bold text-blue-400 mb-4">{blueprint.title}</h3>
              <p className="text-slate-300 mb-6 leading-relaxed">{blueprint.description}</p>
              
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-slate-100 mb-3 border-b border-slate-700 pb-2">Technical Architecture</h4>
                <p className="text-slate-400 italic">{blueprint.architecture}</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-slate-100 mb-3 border-b border-slate-700 pb-2">Key Features</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {blueprint.keyFeatures.map((f, i) => (
                    <li key={i} className="flex items-center space-x-2 text-slate-300">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-slate-900 p-8 rounded-xl border border-slate-700">
              <h3 className="text-xl font-bold text-emerald-400 mb-4">Database Design (Schema)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {blueprint.databaseSchema.map((table, i) => (
                  <div key={i} className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                    <h5 className="font-mono text-emerald-300 font-bold mb-2">Table: {table.table}</h5>
                    <div className="flex flex-wrap gap-2">
                      {table.fields.map((f, fi) => (
                        <span key={fi} className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded font-mono">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-slate-900 p-6 rounded-xl border border-slate-700">
              <h4 className="text-lg font-bold text-amber-400 mb-4">Frontend Stack</h4>
              <div className="flex flex-wrap gap-2">
                {blueprint.frontendStack.map((s, i) => (
                  <span key={i} className="bg-amber-900/30 text-amber-300 border border-amber-800 px-3 py-1 rounded-full text-sm">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-slate-900 p-6 rounded-xl border border-slate-700">
              <h4 className="text-lg font-bold text-purple-400 mb-4">Backend Stack</h4>
              <div className="flex flex-wrap gap-2">
                {blueprint.backendStack.map((s, i) => (
                  <span key={i} className="bg-purple-900/30 text-purple-300 border border-purple-800 px-3 py-1 rounded-full text-sm">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Architect;
