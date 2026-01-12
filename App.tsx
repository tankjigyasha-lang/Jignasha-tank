
import React, { useState } from 'react';
import LearnSection from './components/LearnSection';
import Architect from './components/Architect';
import Visualizer from './components/Visualizer';
import { ViewMode } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<ViewMode>('learn');

  const navItems: { id: ViewMode; label: string; icon: string }[] = [
    { id: 'learn', label: 'Core Concepts', icon: '📖' },
    { id: 'architect', label: 'AI Architect', icon: '🤖' },
    { id: 'visualize', label: 'Data Flow', icon: '📊' },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-lg border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-emerald-400 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <span className="text-white font-bold text-xl">D</span>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">DynamicWeb</h1>
              <p className="text-[10px] uppercase tracking-[0.2em] text-blue-400 font-semibold">Architect & Blueprint</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  view === item.id 
                    ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' 
                    : 'text-slate-400 hover:text-slate-100'
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <a 
              href="https://ai.google.dev/gemini-api/docs" 
              target="_blank" 
              className="text-xs text-slate-500 hover:text-blue-400 border border-slate-700 px-3 py-1.5 rounded-full transition-colors"
            >
              API Docs
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section (Only on Learn view) */}
      {view === 'learn' && (
        <section className="py-20 px-4 bg-gradient-to-b from-slate-900 to-slate-950 text-center relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[128px]"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-[128px]"></div>
          </div>
          
          <div className="max-w-4xl mx-auto relative z-10">
            <h2 className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-slate-400 tracking-tight">
              Build Websites That <br /> <span className="text-blue-500">Think and React.</span>
            </h2>
            <p className="text-xl text-slate-400 mb-10 leading-relaxed max-w-2xl mx-auto">
              Dynamic websites are more than just pages; they are living applications. Learn the architecture, plan your stack, and visualize the magic behind modern web apps.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button 
                onClick={() => setView('architect')}
                className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-xl shadow-blue-600/20"
              >
                Architect My Project
              </button>
              <button 
                onClick={() => setView('visualize')}
                className="w-full sm:w-auto px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-all border border-slate-700"
              >
                Watch Data Flow
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl mx-auto px-4 py-12 w-full">
        <div className="min-h-[600px]">
          {view === 'learn' && <LearnSection />}
          {view === 'architect' && <Architect />}
          {view === 'visualize' && <Visualizer />}
        </div>
      </main>

      {/* Mobile Nav */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur-xl border border-slate-700 p-2 rounded-2xl flex space-x-1 z-50 shadow-2xl">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`p-3 rounded-xl transition-all ${
              view === item.id 
                ? 'bg-blue-600 text-white' 
                : 'text-slate-400 hover:text-slate-100'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
          </button>
        ))}
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-12 px-4 mt-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">D</span>
              </div>
              <span className="text-xl font-bold">DynamicWeb</span>
            </div>
            <p className="text-slate-500 text-sm max-w-sm">
              An educational platform powered by Gemini AI, designed to help developers master the art of full-stack dynamic web development.
            </p>
          </div>
          <div>
            <h5 className="font-bold mb-4 text-slate-100">Learning Paths</h5>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><button onClick={() => setView('learn')} className="hover:text-blue-400 transition-colors">Client State</button></li>
              <li><button onClick={() => setView('learn')} className="hover:text-blue-400 transition-colors">Serverless APIs</button></li>
              <li><button onClick={() => setView('learn')} className="hover:text-blue-400 transition-colors">Auth Patterns</button></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-4 text-slate-100">AI Services</h5>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><button onClick={() => setView('architect')} className="hover:text-blue-400 transition-colors">Project Blueprints</button></li>
              <li><button onClick={() => setView('visualize')} className="hover:text-blue-400 transition-colors">Diagram Generation</button></li>
              <li><a href="https://gemini.google.com" target="_blank" className="hover:text-blue-400 transition-colors">Google Gemini</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-600">
          <p>© 2025 DynamicWeb Architect. Built for the modern web.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <span className="hover:text-blue-400 cursor-pointer">Privacy</span>
            <span className="hover:text-blue-400 cursor-pointer">Terms</span>
            <span className="hover:text-blue-400 cursor-pointer">GitHub</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
