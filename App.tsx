
import React, { useState, useEffect } from 'react';
import { CONCEPTS } from './constants';
import { ConceptId } from './types';
import CandlestickChart from './components/CandlestickChart';
import { getAIExplanation } from './services/geminiService';

const App: React.FC = () => {
  const [activeConceptId, setActiveConceptId] = useState<ConceptId>(ConceptId.FVG);
  const [aiAnalysis, setAiAnalysis] = useState<string>('');
  const [isLoadingAi, setIsLoadingAi] = useState<boolean>(false);

  const activeConcept = CONCEPTS.find(c => c.id === activeConceptId) || CONCEPTS[0];

  const handleAiRefresh = async () => {
    setIsLoadingAi(true);
    const analysis = await getAIExplanation(activeConcept.title, activeConcept.description);
    setAiAnalysis(analysis || '');
    setIsLoadingAi(false);
  };

  useEffect(() => {
    handleAiRefresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeConceptId]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <nav className="w-full md:w-80 bg-slate-900 border-b md:border-b-0 md:border-r border-slate-800 p-6 flex flex-col h-screen sticky top-0">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
            <i className="fas fa-chart-line text-xl"></i>
          </div>
          <h1 className="text-xl font-bold tracking-tight">SMC Master <span className="text-indigo-500">Pro</span></h1>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">Core Concepts</p>
          {CONCEPTS.map(concept => (
            <button
              key={concept.id}
              onClick={() => setActiveConceptId(concept.id)}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center gap-3 ${
                activeConceptId === concept.id 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20' 
                : 'hover:bg-slate-800 text-slate-400'
              }`}
            >
              <i className={`fas ${
                concept.id === ConceptId.FVG ? 'fa-square' :
                concept.id === ConceptId.OB ? 'fa-box' :
                concept.id === ConceptId.BOS_CHOCH ? 'fa-arrows-split-up-and-left' :
                'fa-water'
              }`}></i>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{concept.title}</span>
                <span className="text-[10px] opacity-60 uppercase">{concept.titleEn}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-auto pt-6 border-t border-slate-800">
          <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
            <p className="text-xs text-slate-400 mb-2">Powered by</p>
            <div className="flex items-center gap-2">
              <i className="fas fa-sparkles text-indigo-400"></i>
              <span className="text-sm font-semibold">Gemini 3 Flash</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Header Info */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-indigo-400 text-sm font-bold uppercase tracking-widest">
              <span className="h-px w-8 bg-indigo-400"></span>
              Interactive Learning
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">{activeConcept.title}</h2>
            <p className="text-lg text-slate-400 leading-relaxed max-w-2xl">{activeConcept.description}</p>
            <p className="text-sm italic text-slate-500">{activeConcept.descriptionEn}</p>
          </section>

          {/* Interactive Visualizer */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-500 uppercase flex items-center gap-2">
                <i className="fas fa-eye"></i> Visual Representation
              </h3>
              <div className="flex gap-2">
                <span className="flex items-center gap-1 text-[10px] bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Bullish
                </span>
                <span className="flex items-center gap-1 text-[10px] bg-red-500/10 text-red-500 px-2 py-1 rounded border border-red-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> Bearish
                </span>
              </div>
            </div>
            <CandlestickChart candles={activeConcept.candles} zones={activeConcept.zones} />
          </section>

          {/* Detailed Guide */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Trading Strategy */}
            <section className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <i className="fas fa-bullseye text-red-500"></i> 交易方式
              </h3>
              <p className="text-slate-300 leading-relaxed mb-4">{activeConcept.tradingMethod}</p>
              <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
                <p className="text-sm text-slate-400 italic">" {activeConcept.tradingMethodEn} "</p>
              </div>
            </section>

            {/* AI Insight */}
            <section className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-3">
                <button 
                  onClick={handleAiRefresh}
                  disabled={isLoadingAi}
                  className="p-2 bg-indigo-600/20 text-indigo-400 rounded-lg hover:bg-indigo-600/40 transition-colors"
                >
                  <i className={`fas fa-sync-alt ${isLoadingAi ? 'animate-spin' : ''}`}></i>
                </button>
              </div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <i className="fas fa-brain text-indigo-500"></i> AI 實戰解析
              </h3>
              <div className="min-h-[100px] flex flex-col justify-center">
                {isLoadingAi ? (
                  <div className="space-y-3">
                    <div className="h-4 bg-slate-800 rounded animate-pulse w-full"></div>
                    <div className="h-4 bg-slate-800 rounded animate-pulse w-5/6"></div>
                    <div className="h-4 bg-slate-800 rounded animate-pulse w-4/6"></div>
                  </div>
                ) : (
                  <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{aiAnalysis}</p>
                )}
              </div>
              <div className="mt-4 flex items-center gap-2 text-[10px] text-slate-500">
                <i className="fas fa-info-circle"></i>
                <span>Generated by Gemini AI based on SMC methodology</span>
              </div>
            </section>
          </div>

          {/* Glossary Legend (Footer Component) */}
          <footer className="pt-10 border-t border-slate-800">
             <h4 className="text-sm font-bold text-slate-500 uppercase mb-6">Chart Legend 圖例說明</h4>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-8 bg-emerald-500 rounded-sm"></div>
                  <span className="text-xs text-slate-400">看漲K棒 Bullish</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-8 border border-red-500 rounded-sm"></div>
                  <span className="text-xs text-slate-400">看跌K棒 Bearish</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-4 border border-dashed border-indigo-500"></div>
                  <span className="text-xs text-slate-400">區域/區塊 Zone/Block</span>
                </div>
                <div className="flex items-center gap-3">
                  <i className="fas fa-long-arrow-alt-up text-slate-400"></i>
                  <span className="text-xs text-slate-400">價格方向 Price Dir</span>
                </div>
             </div>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default App;
