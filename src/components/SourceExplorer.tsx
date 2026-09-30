import React, { useState, useMemo } from 'react';
import { Copy, Check, Download, Search, FileCode, Hash, BookOpen } from 'lucide-react';
import { LATEX_SOURCE } from '../data/latexSource';

export const SourceExplorer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const lines = useMemo(() => LATEX_SOURCE.split('\n'), []);

  const filteredLineIndices = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const query = searchQuery.toLowerCase();
    const indices: number[] = [];
    lines.forEach((line, idx) => {
      if (line.toLowerCase().includes(query)) {
        indices.push(idx);
      }
    });
    return indices;
  }, [searchQuery, lines]);

  const handleCopy = () => {
    navigator.clipboard.writeText(LATEX_SOURCE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([LATEX_SOURCE], { type: 'text/x-tex;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'SPDE_production_v2_final.tex';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-5xl mx-auto bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xl overflow-hidden mb-12">
      {/* Top action toolbar */}
      <div className="p-4 sm:p-6 bg-neutral-100 dark:bg-neutral-800/70 border-b border-neutral-200 dark:border-neutral-700 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <FileCode className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-neutral-900 dark:text-neutral-100 text-base">
              SPDE_production_v2_final.tex
            </h3>
            <p className="text-xs text-neutral-500 font-mono">
              385 lines • 25.5 KB • LaTeX Article (XeLaTeX / LuaLaTeX / pdflatex)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* Search box */}
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search LaTeX source..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-600 text-neutral-700 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-600 text-xs font-medium transition-colors shadow-xs shrink-0"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-neutral-500" />}
            {copied ? 'Copied' : 'Copy .tex'}
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors shadow-xs shrink-0"
          >
            <Download className="w-4 h-4" />
            Download .tex
          </button>
        </div>
      </div>

      {/* Quick stats pills */}
      <div className="px-6 py-2.5 bg-neutral-50 dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 text-[11px] font-mono text-neutral-500 dark:text-neutral-400 flex flex-wrap items-center gap-4">
        <span>Equations: 12 numbered</span>
        <span>•</span>
        <span>Theorems &amp; Lemmas: 5</span>
        <span>•</span>
        <span>CUDA Listings: 1</span>
        <span>•</span>
        <span>Citations: 23 BibTeX entries</span>
        {filteredLineIndices && (
          <span className="text-indigo-600 dark:text-indigo-400 font-bold ml-auto">
            {filteredLineIndices.length} matches found
          </span>
        )}
      </div>

      {/* Code viewport with line numbers */}
      <div className="bg-neutral-950 text-neutral-200 font-mono text-xs overflow-x-auto max-h-[600px] select-text">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, idx) => {
              const lineNum = idx + 1;
              const isMatch = filteredLineIndices ? filteredLineIndices.includes(idx) : false;
              
              return (
                <tr
                  key={idx}
                  className={`hover:bg-neutral-900 transition-colors ${
                    isMatch ? 'bg-indigo-950/60 text-indigo-200' : ''
                  }`}
                >
                  <td className="w-12 py-0.5 px-3 text-right text-neutral-600 select-none border-r border-neutral-800 text-[11px]">
                    {lineNum}
                  </td>
                  <td className="py-0.5 px-4 whitespace-pre">
                    {/* Basic syntax coloring for common LaTeX keywords */}
                    {line.startsWith('\\section') || line.startsWith('\\subsection') ? (
                      <span className="text-purple-400 font-bold">{line}</span>
                    ) : line.startsWith('\\begin{theorem}') || line.startsWith('\\end{theorem}') || line.startsWith('\\begin{proposition}') ? (
                      <span className="text-amber-400 font-semibold">{line}</span>
                    ) : line.startsWith('%') ? (
                      <span className="text-neutral-500 italic">{line}</span>
                    ) : line.includes('\\begin{equation}') || line.includes('\\end{equation}') ? (
                      <span className="text-cyan-400">{line}</span>
                    ) : (
                      <span>{line}</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
