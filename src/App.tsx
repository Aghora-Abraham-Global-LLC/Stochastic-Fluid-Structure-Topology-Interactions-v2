import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Activity, FileCode, Sun, Moon, 
  ExternalLink, Award, Copy, Check, Printer, Terminal, ChevronDown
} from 'lucide-react';
import { PaperViewer } from './components/PaperViewer';
import { InteractiveSimulation } from './components/InteractiveSimulation';
import { SourceExplorer } from './components/SourceExplorer';

type TabType = 'paper' | 'simulation' | 'source';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('paper');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [copiedPaperBibtex, setCopiedPaperBibtex] = useState<boolean>(false);
  const [copiedSoftwareBibtex, setCopiedSoftwareBibtex] = useState<boolean>(false);
  const [isCiteMenuOpen, setIsCiteMenuOpen] = useState<boolean>(false);

  const paperBibtexEntry = `@article{Ananda2026_SPDE_V2,
  title={Stochastic Fluid-Structure-Topology Interactions: Rigorous Homogenization and Lasry-Lions Optimal Control of Fractional SPDEs via Kunita Flows},
  author={Ghulam-e-Shah-e-Unmani (Arya Arunachala Ananda)},
  organization={Aghora Abraham Global LLC},
  address={Albuquerque, New Mexico, USA},
  year={2026},
  month={September},
  version={2.0},
  doi={10.5281/zenodo.23040167},
  url={https://doi.org/10.5281/zenodo.23040167}
}`;

  const softwareBibtexEntry = `@software{Ananda2026_SPDE_Software,
  title={Stochastic Fluid-Structure-Topology Interactions: Fractional SPDE & Lasry-Lions Numerical Solver Suite},
  author={Ghulam-e-Shah-e-Unmani (Arya Arunachala Ananda)},
  organization={Aghora Abraham Global LLC},
  address={Albuquerque, New Mexico, USA},
  year={2026},
  month={September},
  version={2.0.0},
  doi={10.5281/zenodo.23055112},
  url={https://doi.org/10.5281/zenodo.23055112}
}`;

  const copyPaperBibtex = () => {
    navigator.clipboard.writeText(paperBibtexEntry);
    setCopiedPaperBibtex(true);
    setTimeout(() => setCopiedPaperBibtex(false), 2200);
  };

  const copySoftwareBibtex = () => {
    navigator.clipboard.writeText(softwareBibtexEntry);
    setCopiedSoftwareBibtex(true);
    setTimeout(() => setCopiedSoftwareBibtex(false), 2200);
  };

  // Sync dark mode class with root html
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Close cite menu when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('#cite-dropdown-container')) {
        setIsCiteMenuOpen(false);
      }
    };
    if (isCiteMenuOpen) {
      document.addEventListener('click', handleOutsideClick);
    }
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [isCiteMenuOpen]);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 flex flex-col font-sans transition-colors">
      {/* Top Academic Journal Header */}
      <header className="no-print sticky top-0 z-40 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 transition-colors shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Institution & Title Identity */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-serif text-xl font-bold shadow-md shadow-indigo-500/20 shrink-0">
              ∯
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-black font-academic text-neutral-900 dark:text-neutral-100 tracking-tight truncate">
                  Stochastic Fluid-Structure-Topology Interactions
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-indigo-100 text-indigo-800 dark:bg-indigo-900/60 dark:text-indigo-300 rounded-full font-mono shrink-0">
                  v2.0
                </span>
              </div>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate">
                Ghulam-e-Shah-e-Unmani • Aghora Abraham Global LLC
              </p>
            </div>
          </div>

          {/* Center Navigation Tabs */}
          <nav className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 p-1 rounded-xl shrink-0">
            <button
              onClick={() => setActiveTab('paper')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'paper'
                  ? 'bg-white dark:bg-neutral-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Manuscript</span>
            </button>

            <button
              onClick={() => setActiveTab('simulation')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'simulation'
                  ? 'bg-white dark:bg-neutral-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
              }`}
            >
              <Activity className="w-3.5 h-3.5 text-cyan-500" />
              <span>Interactive Lab</span>
            </button>

            <button
              onClick={() => setActiveTab('source')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'source'
                  ? 'bg-white dark:bg-neutral-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>LaTeX &amp; CUDA</span>
            </button>
          </nav>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Cite Dropdown (Paper vs Software) */}
            <div id="cite-dropdown-container" className="relative">
              <button
                onClick={() => setIsCiteMenuOpen(!isCiteMenuOpen)}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200/80 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-lg text-xs font-medium transition-colors"
                title="Citation Options"
              >
                <Copy className="w-3.5 h-3.5 text-neutral-500" />
                <span>Cite</span>
                <ChevronDown className="w-3 h-3 text-neutral-400" />
              </button>

              {isCiteMenuOpen && (
                <div className="absolute right-0 mt-1 w-64 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-xl p-2 z-50 text-xs">
                  <div className="text-[10px] uppercase font-bold text-neutral-400 px-2 py-1">
                    BibTeX Citations
                  </div>
                  <button
                    onClick={() => {
                      copyPaperBibtex();
                      setIsCiteMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-left"
                  >
                    <div>
                      <div className="font-semibold text-neutral-800 dark:text-neutral-200">Cite Manuscript</div>
                      <div className="text-[10px] text-blue-600 dark:text-blue-400 font-mono">DOI: 10.5281/zenodo.23040167</div>
                    </div>
                    {copiedPaperBibtex ? <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> : <Copy className="w-3.5 h-3.5 text-neutral-400 shrink-0" />}
                  </button>

                  <button
                    onClick={() => {
                      copySoftwareBibtex();
                      setIsCiteMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-left"
                  >
                    <div>
                      <div className="font-semibold text-neutral-800 dark:text-neutral-200">Cite Software Suite</div>
                      <div className="text-[10px] text-indigo-600 dark:text-indigo-400 font-mono">DOI: 10.5281/zenodo.23055112</div>
                    </div>
                    {copiedSoftwareBibtex ? <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> : <Terminal className="w-3.5 h-3.5 text-neutral-400 shrink-0" />}
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => window.print()}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200/80 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-lg text-xs font-medium transition-colors"
              title="Print or export paper as PDF"
            >
              <Printer className="w-3.5 h-3.5 text-neutral-500" />
              <span>Print / PDF</span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Render Active View */}
        {activeTab === 'paper' && (
          <div>
            {/* Dual Registered DOI Metadata Banner */}
            <div className="no-print mb-8 p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-start sm:items-center gap-3">
                <Award className="w-6 h-6 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5 sm:mt-0" />
                <div className="text-xs space-y-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="font-bold text-neutral-800 dark:text-neutral-200">Registered DOIs:</span>
                    <span>
                      <span className="text-neutral-500">Manuscript:</span>{' '}
                      <a
                        href="https://doi.org/10.5281/zenodo.23040167"
                        target="_blank"
                        rel="noreferrer"
                        className="font-mono text-blue-600 dark:text-blue-400 font-bold hover:underline"
                      >
                        10.5281/zenodo.23040167
                      </a>
                    </span>
                    <span className="text-neutral-300 dark:text-neutral-700">•</span>
                    <span>
                      <span className="text-neutral-500">Software Suite:</span>{' '}
                      <a
                        href="https://doi.org/10.5281/zenodo.23055112"
                        target="_blank"
                        rel="noreferrer"
                        className="font-mono text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
                      >
                        10.5281/zenodo.23055112
                      </a>
                    </span>
                  </div>
                  <p className="text-neutral-500 dark:text-neutral-400 text-[11px]">
                    Pure &amp; Applied Mathematics Archive • Computational Physics Solver Engine
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setActiveTab('simulation')}
                  className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <Activity className="w-3.5 h-3.5" />
                  Launch Live IMEX Simulator
                </button>
              </div>
            </div>

            <PaperViewer />
          </div>
        )}

        {activeTab === 'simulation' && (
          <div>
            <InteractiveSimulation />
            
            <div className="mt-8">
              <h4 className="text-base font-bold text-neutral-800 dark:text-neutral-200 mb-2 font-academic">
                Mathematical Context from Section 6 &amp; 7:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                <div className="p-4 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800">
                  <strong className="text-neutral-900 dark:text-neutral-100 block mb-1">
                    Kunita Stochastic Flow Pullback
                  </strong>
                  The simulation resolves the generalized Itô-Wentzell pullback with solenoidal incompressible drift <code className="font-mono text-indigo-600 dark:text-indigo-400">div(u)=0</code> and Stratonovich cross-variation Lie derivatives. The mean-zero property <code className="font-mono text-indigo-600 dark:text-indigo-400">∫ ρ dV = 0</code> is invariant across all steps.
                </div>
                <div className="p-4 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800">
                  <strong className="text-neutral-900 dark:text-neutral-100 block mb-1">
                    Lasry-Lions Regularized Fréchet Gradient
                  </strong>
                  When enabled, the non-convex topological persistence landscape is smoothed via the double envelope <code className="font-mono text-indigo-600 dark:text-indigo-400">F_(λ,μ)</code>, yielding an explicit algebraic C¹¹ monotone tracking field <code className="font-mono text-indigo-600 dark:text-indigo-400">u_TDA = (1/μ)(ρ - prox_μ(ρ))</code> that attracts the fluid to the target topology without chattering.
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'source' && (
          <div>
            <SourceExplorer />
          </div>
        )}
      </main>

      {/* Academic Paper Footer */}
      <footer className="no-print mt-auto border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 py-8 px-4 sm:px-6 lg:px-8 text-xs text-neutral-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-bold text-neutral-800 dark:text-neutral-200 font-academic">
              Stochastic Fluid-Structure-Topology Interactions (Version 2.0)
            </span>
            <p className="mt-0.5">
              © 2026 Ghulam-e-Shah-e-Unmani • Aghora Abraham Global LLC, Albuquerque, New Mexico, USA.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <a
              href="https://doi.org/10.5281/zenodo.23040167"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-mono"
            >
              <span>Manuscript DOI: 10.5281/zenodo.23040167</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span>•</span>
            <a
              href="https://doi.org/10.5281/zenodo.23055112"
              target="_blank"
              rel="noreferrer"
              className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 font-mono font-semibold"
            >
              <span>Software DOI: 10.5281/zenodo.23055112</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span>•</span>
            <a
              href="https://doi.org/10.5281/zenodo.22806453"
              target="_blank"
              rel="noreferrer"
              className="text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-300 hover:underline flex items-center gap-1"
            >
              <span>Version 1.0</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
