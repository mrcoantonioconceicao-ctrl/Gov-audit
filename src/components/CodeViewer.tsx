import React, { useState } from 'react';
import { Copy, Check, Download, FileCode, ExternalLink } from 'lucide-react';

interface CodeViewerProps {
  filename: string;
  language: string;
  code: string;
  path: string;
  description?: string;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({
  filename,
  language,
  code,
  path,
  description
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const lines = code.split('\n');

  return (
    <div className="rounded-xl border border-slate-700/80 bg-slate-900/90 shadow-2xl overflow-hidden flex flex-col font-mono text-sm">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between px-4 py-3 bg-slate-950/80 border-b border-slate-800 gap-2">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 mr-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <FileCode className="w-4 h-4 text-emerald-400" />
          <span className="text-slate-200 font-semibold tracking-tight">{filename}</span>
          <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
            {path}
          </span>
          <span className="text-xs px-2 py-0.5 rounded bg-blue-950/80 text-blue-300 border border-blue-800 uppercase font-bold">
            {language}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-sans font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors shadow-sm"
            title="Copiar código para a área de transferência"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-semibold">Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-300" />
                <span>Copiar</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-sans font-medium rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white transition-colors shadow-sm"
            title="Baixar arquivo individual"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Baixar</span>
          </button>
        </div>
      </div>

      {description && (
        <div className="px-4 py-2 bg-slate-900/60 border-b border-slate-800/80 text-xs font-sans text-slate-300">
          💡 <span className="text-slate-400 font-medium">Nota de Engenharia:</span> {description}
        </div>
      )}

      {/* Code body with line numbers */}
      <div className="overflow-x-auto max-h-[600px] overflow-y-auto p-4 text-xs leading-relaxed select-text">
        <pre className="flex">
          {/* Line numbers */}
          <span className="select-none text-slate-600 text-right pr-4 border-r border-slate-800/80 mr-4 font-mono w-10 shrink-0">
            {lines.map((_, i) => (
              <span key={i} className="block leading-5">
                {i + 1}
              </span>
            ))}
          </span>

          {/* Actual Code */}
          <code className="text-slate-200 flex-1 whitespace-pre leading-5">
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
};
