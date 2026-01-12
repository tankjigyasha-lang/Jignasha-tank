
import React, { useState } from 'react';

const LearnSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const concepts = [
    {
      title: "What is a Dynamic Website?",
      content: "Unlike static websites (HTML/CSS files), dynamic websites generate content in real-time. They use a combination of server-side logic and client-side scripting to pull data from a database and display it based on user interaction, time, or location.",
      icon: "⚡"
    },
    {
      title: "The Role of State",
      content: "Dynamic behavior in the browser is driven by 'State'. In React, state is a data structure that changes over time. When state updates, React automatically re-renders the relevant parts of the UI, giving the appearance of a 'dynamic' update without refreshing.",
      icon: "🧠"
    },
    {
      title: "APIs & JSON",
      content: "APIs (Application Programming Interfaces) are the bridge between your UI and your Data. Most dynamic sites use REST or GraphQL APIs to send and receive data in JSON format, which is easily parsed by JavaScript.",
      icon: "🔗"
    },
    {
      title: "Authentication",
      content: "Dynamic sites often need to know who the user is. This is handled via cookies or tokens (JWT). Auth allows for 'private' data—like your personal profile or a shopping cart—to be loaded dynamically for you alone.",
      icon: "🔐"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start animate-fadeIn">
      <div className="space-y-4">
        {concepts.map((c, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            className={`w-full text-left p-6 rounded-xl border transition-all duration-300 ${
              activeTab === i 
                ? 'bg-blue-600 border-blue-400 shadow-lg shadow-blue-900/40 translate-x-2' 
                : 'bg-slate-800 border-slate-700 hover:bg-slate-700'
            }`}
          >
            <div className="flex items-center space-x-4">
              <span className="text-3xl">{c.icon}</span>
              <div>
                <h4 className="font-bold text-lg">{c.title}</h4>
                <p className={`text-sm mt-1 ${activeTab === i ? 'text-blue-100' : 'text-slate-400'}`}>
                  Click to learn more
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="bg-slate-900 border border-slate-700 p-10 rounded-2xl sticky top-8">
        <h3 className="text-2xl font-bold mb-6 flex items-center space-x-3">
          <span className="text-4xl">{concepts[activeTab].icon}</span>
          <span>{concepts[activeTab].title}</span>
        </h3>
        <div className="prose prose-invert prose-blue max-w-none">
          <p className="text-lg text-slate-300 leading-relaxed italic">
            "{concepts[activeTab].content}"
          </p>
          <hr className="my-8 border-slate-700" />
          <h5 className="font-bold text-blue-400 mb-4 uppercase tracking-wider text-sm">Key Technologies</h5>
          <div className="flex flex-wrap gap-2">
            {activeTab === 0 && ['Serverless', 'Microservices', 'SSR'].map(t => <span key={t} className="px-3 py-1 bg-slate-800 rounded-md text-slate-300 text-sm">{t}</span>)}
            {activeTab === 1 && ['React Hooks', 'Redux', 'Zustand'].map(t => <span key={t} className="px-3 py-1 bg-slate-800 rounded-md text-slate-300 text-sm">{t}</span>)}
            {activeTab === 2 && ['REST', 'Axios', 'Fetch API'].map(t => <span key={t} className="px-3 py-1 bg-slate-800 rounded-md text-slate-300 text-sm">{t}</span>)}
            {activeTab === 3 && ['OAuth', 'Firebase', 'NextAuth'].map(t => <span key={t} className="px-3 py-1 bg-slate-800 rounded-md text-slate-300 text-sm">{t}</span>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnSection;
