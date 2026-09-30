import React, { useMemo } from 'react';
import katex from 'katex';

interface MathViewProps {
  math: string;
  display?: boolean;
  className?: string;
}

export const MathView: React.FC<MathViewProps> = ({ math, display = false, className = '' }) => {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math, {
        displayMode: display,
        throwOnError: false,
        strict: false,
        trust: true,
      });
    } catch (e) {
      console.warn('KaTeX render error:', e);
      return `<span class="text-red-500 font-mono">${math}</span>`;
    }
  }, [math, display]);

  if (display) {
    return (
      <div 
        className={`katex-display my-4 text-center overflow-x-auto py-2 px-1 ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <span 
      className={`inline-block ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
