
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
    const analysis = await getAIExplanation(
      activeConcept.title, 
      activeConcept.description,
      activeConcept.tradingMethod,
      activeConcept.tradingMethodEn
    );
    setAiAnalysis(analysis || '');
    setIsLoadingAi(false);
  };

  useEffect(() => {
    handleAiRefresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeConceptId]);

  const getIcon = (id: ConceptId) => {
    switch (id) {
      case ConceptId.FVG: return 'fa-square-full';
      case ConceptId.OB: return 'fa-box-open';
      case ConceptId.BREAKER: return 'fa-bolt';
      case ConceptId.AMD: return 'fa-layer-group';
      case ConceptId.OTE: return 'fa-percent';
      case ConceptId.KILL_ZONES: return 'fa-clock';
      case ConceptId.LIQUIDITY: return 'fa-droplet';
      case ConceptId.BOS_CHOCH: return 'fa-code-branch';
      case ConceptId.DOM_FILTER: return 'fa-filter';
      default: return 'fa-chart-pie';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <nav className="w-full md:w-80 bg-slate-900 border-b md:border-b-0 md:border-r border-slate-800 p-6 flex flex-col h-screen sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
            <i className="fas fa-chart-line text-xl text-white"></i>
          </div>
          <h1 className="text-xl font-bold tracking-tight">SMC Master <span className="text-indigo-500">Pro</span></h1>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar space-y-1">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4 px-2">Core Concepts</p>
          {CONCEPTS.map(concept => (
            <button
              key={concept.id}
              onClick={() => setActiveConceptId(concept.id)}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center gap-3 group ${
                activeConceptId === concept.id 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20' 
                : 'hover:bg-slate-800 text-slate-400'
              }`}
            >
              <div className={`w-5 text-center transition-transform duration-300 ${activeConceptId === concept.id ? 'scale-110' : 'group-hover:scale-110'}`}>
                <i className={`fas ${getIcon(concept.id)}`}></i>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{concept.title}</span>
                <span className="text-[10px] opacity-60 uppercase">{concept.titleEn}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-auto pt-6 border-t border-slate-800">
          <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
            <p className="text-xs text-slate-400 mb-2 font-medium">AI Intelligence</p>
            <div className="flex items-center gap-2">
              <i className="fas fa-wand-magic-sparkles text-indigo-400 animate-pulse"></i>
              <span className="text-sm font-semibold text-slate-200">Gemini 3 Flash</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-8 pb-20">
          
          {/* Header Info */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-indigo-400 text-sm font-bold uppercase tracking-widest">
              <span className="h-px w-8 bg-indigo-400"></span>
              The Institutional Playbook
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">{activeConcept.title}</h2>
            <div className="bg-slate-900/50 border-l-4 border-indigo-600 p-4 rounded-r-xl">
               <p className="text-lg text-slate-300 leading-relaxed italic">"{activeConcept.description}"</p>
            </div>
            <p className="text-sm text-slate-500 font-medium uppercase tracking-wide">{activeConcept.descriptionEn}</p>
          </section>

          {/* Interactive Visualizer */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-500 uppercase flex items-center gap-2">
                <i className="fas fa-layer-group"></i> Dynamic Visualization
              </h3>
              <div className="flex gap-2">
                <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="text-[10px] font-bold text-emerald-500">BULLISH</span>
                </div>
                <div className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500"></span>
                  <span className="text-[10px] font-bold text-red-500">BEARISH</span>
                </div>
              </div>
            </div>
            <CandlestickChart candles={activeConcept.candles} zones={activeConcept.zones} />
          </section>

          {/* Detailed Guide */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Trading Strategy */}
            <section className="bg-slate-900 rounded-2xl p-8 border border-slate-800 shadow-2xl relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-red-500/5 rounded-full blur-2xl group-hover:bg-red-500/10 transition-colors"></div>
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center">
                   <i className="fas fa-bullseye text-red-500 text-sm"></i>
                </div>
                實戰應用策略
              </h3>
              <p className="text-slate-300 leading-relaxed mb-6 text-base">{activeConcept.tradingMethod}</p>
              <div className="p-5 bg-slate-950/50 rounded-xl border border-slate-800 shadow-inner">
                <div className="text-[10px] font-bold text-slate-500 uppercase mb-2 tracking-widest">Strategy Blueprint</div>
                <p className="text-sm text-slate-400 italic font-medium leading-relaxed">"{activeConcept.tradingMethodEn}"</p>
              </div>
            </section>

            {/* AI Insight */}
            <section className="bg-slate-900 rounded-2xl p-8 border border-slate-800 shadow-2xl relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-colors"></div>
              <div className="absolute top-0 right-0 p-4">
                <button 
                  onClick={handleAiRefresh}
                  disabled={isLoadingAi}
                  className="w-10 h-10 bg-indigo-600/10 text-indigo-400 rounded-xl hover:bg-indigo-600 hover:text-white transition-all duration-300 flex items-center justify-center shadow-lg"
                  title="Refresh AI Analysis"
                >
                  <i className={`fas fa-sync-alt ${isLoadingAi ? 'animate-spin' : ''}`}></i>
                </button>
              </div>
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                   <i className="fas fa-brain text-indigo-500 text-sm"></i>
                </div>
                AI 盤面邏輯診斷
              </h3>
              <div className="min-h-[140px] flex flex-col justify-center">
                {isLoadingAi ? (
                  <div className="space-y-4">
                    <div className="h-4 bg-slate-800 rounded-full animate-pulse w-full"></div>
                    <div className="h-4 bg-slate-800 rounded-full animate-pulse w-11/12"></div>
                    <div className="h-4 bg-slate-800 rounded-full animate-pulse w-9/12"></div>
                    <div className="h-4 bg-slate-800 rounded-full animate-pulse w-10/12"></div>
                  </div>
                ) : (
                  <div className="relative">
                    <i className="fas fa-quote-left text-slate-800 text-4xl absolute -top-4 -left-2 z-0"></i>
                    <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap relative z-10 pl-2">
                      {aiAnalysis || "正在生成深度分析..."}
                    </p>
                  </div>
                )}
              </div>
              <div className="mt-8 pt-4 border-t border-slate-800/50 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                  <i className="fas fa-shield-halved"></i>
                  Institutional Data Feed
                </div>
                <div className="text-[10px] text-indigo-500/70 font-mono">MD-2.5-FLASH-SYS</div>
              </div>
            </section>
          </div>

          <footer className="pt-12 border-t border-slate-800">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
               <div className="space-y-3">
                 <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Mastering Market Geometry</h4>
                 <p className="text-xs text-slate-500 leading-relaxed max-w-md">
                   SMC (Smart Money Concepts) 核心在於識別銀行與大機構留下的蹤跡。記住：**流動性**是燃料，**結構**是地圖，**時間**是觸發器。永遠不要在零售區間與機構博弈。
                 </p>
               </div>
               <div className="flex flex-wrap gap-4 justify-start md:justify-end">
                  {[
                    { label: 'Trend', color: 'bg-emerald-500' },
                    { label: 'Volume', color: 'bg-blue-500' },
                    { label: 'Liquidity', color: 'bg-red-500' },
                    { label: 'Bias', color: 'bg-indigo-500' }
                  ].map(badge => (
                    <div key={badge.label} className="flex items-center gap-2 bg-slate-900/80 px-4 py-2 rounded-full border border-slate-800 shadow-lg">
                      <div className={`w-2 h-2 ${badge.color} rounded-full animate-pulse`}></div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{badge.label}</span>
                    </div>
                  ))}
               </div>
             </div>
             <div className="mt-12 text-center">
               <p className="text-[10px] text-slate-700 font-medium">© 2025 SMC INTERACTIVE GUIDE • EDUCATIONAL PURPOSES ONLY • TRADING INVOLVES RISK</p>
             </div>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default App;
