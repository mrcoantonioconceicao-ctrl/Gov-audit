import React, { useState } from 'react';
import { 
  Activity, 
  Eye, 
  Cpu, 
  Layers, 
  Clock, 
  BarChart2, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  Play, 
  Sliders, 
  Share2,
  Zap,
  Radio
} from 'lucide-react';

interface OpenTelemetrySpan {
  id: string;
  name: string;
  kind: 'SERVER' | 'INTERNAL' | 'CLIENT';
  duracaoMs: number;
  offsetMs: number;
  status: 'OK' | 'ERROR';
  atributos: Record<string, string | number>;
}

export const ObservabilityLab: React.FC = () => {
  const [executando, setExecutando] = useState(false);
  const [traceId, setTraceId] = useState('4bf92f3577b34da6a3ce929d0e0e4736');
  const [selectedSpanId, setSelectedSpanId] = useState<string>('span-raiz');

  // Spans simulados do OpenTelemetry
  const spans: OpenTelemetrySpan[] = [
    {
      id: 'span-raiz',
      name: 'govaudit.auditoria.processamento',
      kind: 'SERVER',
      duracaoMs: 1432,
      offsetMs: 0,
      status: 'OK',
      atributos: {
        'govaudit.contrato.id': 'c8a245d1-1200-4bfa-879e-71109028a411',
        'govaudit.contrato.processo': 'SEI-23000.001928/2026-44',
        'govaudit.contrato.cnpj': '00.394.460/0058-87',
        'govaudit.contrato.valor': 98400.00,
        'service.name': 'gov-audit-core',
        'telemetry.sdk.language': 'java'
      }
    },
    {
      id: 'span-ast',
      name: 'govaudit.ai.ast_parsing',
      kind: 'INTERNAL',
      duracaoMs: 42,
      offsetMs: 18,
      status: 'OK',
      atributos: {
        'ast.clausulas.total': 5,
        'ast.desvios.detectados': 2,
        'ast.desvios.criticos': 1,
        'regra.lei': 'Art. 92 e 145 Lei 14.133'
      }
    },
    {
      id: 'span-graphrag',
      name: 'govaudit.ai.graphrag_retrieval',
      kind: 'INTERNAL',
      duracaoMs: 215,
      offsetMs: 65,
      status: 'OK',
      atributos: {
        'graph.nos.relacionados': 6,
        'graph.acordaos.tcu': 2,
        'graph.sancoes.ceis': 0,
        'graph.tempo_travessia_ms': 198
      }
    },
    {
      id: 'span-mcp',
      name: 'govaudit.ai.mcp_execution',
      kind: 'CLIENT',
      duracaoMs: 1140,
      offsetMs: 285,
      status: 'OK',
      atributos: {
        'gen_ai.system': 'gov-audit-mcp',
        'gen_ai.request.model': 'gov-audit-fine-tuned-v1',
        'gen_ai.usage.prompt_tokens': 1842,
        'gen_ai.usage.completion_tokens': 412,
        'gen_ai.response.score': 45.0,
        'mcp.tools_invoked': 2
      }
    }
  ];

  const selectedSpan = spans.find(s => s.id === selectedSpanId) || spans[0];

  const handleSimularTrace = () => {
    setExecutando(true);
    setTimeout(() => {
      setTraceId(Math.random().toString(16).substring(2, 18) + Math.random().toString(16).substring(2, 18));
      setExecutando(false);
    }, 450);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-emerald-400" />
            <h3 className="text-lg font-bold text-slate-100">
              Observabilidade Corporativa &amp; Telemetria de IA
            </h3>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
              Micrometer • OpenTelemetry (OTel) • OTLP Exporter
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Monitoramento de latência em percentis (p50/p95/p99), rastreamento distribuído (Spans) e métricas de consumo de tokens do pipeline de auditoria.
          </p>
        </div>

        <button
          onClick={handleSimularTrace}
          disabled={executando}
          className="flex items-center gap-2 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs rounded-xl transition-all shadow-md shadow-emerald-950/40 w-fit"
        >
          <Play className="w-3.5 h-3.5" />
          <span>{executando ? 'Coletando Spans...' : 'Gerar Novo Trace de Auditoria'}</span>
        </button>
      </div>

      {/* Grid de Métricas do Micrometer (Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {/* Métrica 1: Latência Total */}
        <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] text-slate-400 font-semibold uppercase">Latência IA (p95)</span>
            <Clock className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-blue-400">1.43 s</div>
          <div className="text-[10px] text-slate-500 mt-1">p50: 890ms • p99: 1.95s</div>
        </div>

        {/* Métrica 2: Tokens Consumidos */}
        <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] text-slate-400 font-semibold uppercase">Tokens por Auditoria</span>
            <Zap className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-amber-300">2.254</div>
          <div className="text-[10px] text-slate-500 mt-1">Prompt: 1.842 • Saída: 412</div>
        </div>

        {/* Métrica 3: AST Parsing */}
        <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] text-slate-400 font-semibold uppercase">AST Parse Time</span>
            <Cpu className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-400">42 ms</div>
          <div className="text-[10px] text-slate-500 mt-1">5 cláusulas inspecionadas</div>
        </div>

        {/* Métrica 4: GraphRAG Travessia */}
        <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] text-slate-400 font-semibold uppercase">GraphRAG Retrieval</span>
            <Share2 className="w-3.5 h-3.5 text-purple-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-purple-400">215 ms</div>
          <div className="text-[10px] text-slate-500 mt-1">2 acórdãos TCU correlacionados</div>
        </div>
      </div>

      {/* Rastreamento Distribuído (OpenTelemetry Trace Flamegraph) */}
      <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-3 gap-2">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold text-slate-200">
              Rastreamento Distribuído OpenTelemetry (Trace Waterfall)
            </span>
          </div>
          <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
            <span className="text-slate-500">Trace ID:</span>
            <span className="text-emerald-400 font-bold bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
              {traceId}
            </span>
          </div>
        </div>

        {/* Linha do tempo dos Spans */}
        <div className="space-y-2.5 pt-2">
          {spans.map((span) => {
            const isSelected = span.id === selectedSpanId;
            const totalWidth = 1450;
            const leftPct = (span.offsetMs / totalWidth) * 100;
            const widthPct = Math.max(4, (span.duracaoMs / totalWidth) * 100);

            return (
              <div
                key={span.id}
                onClick={() => setSelectedSpanId(span.id)}
                className={`p-2.5 rounded-lg border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 border-emerald-500 ring-1 ring-emerald-500/40 shadow-sm'
                    : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-900 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded font-mono ${
                      span.kind === 'SERVER' ? 'bg-blue-950 text-blue-300 border border-blue-800' :
                      span.kind === 'CLIENT' ? 'bg-purple-950 text-purple-300 border border-purple-800' :
                      'bg-slate-800 text-slate-300'
                    }`}>
                      {span.kind}
                    </span>
                    <span className="font-mono text-slate-200 font-semibold">{span.name}</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <span className="text-emerald-400 font-bold">{span.duracaoMs} ms</span>
                    <span className="text-[10px] text-slate-600">({span.offsetMs}ms offset)</span>
                  </div>
                </div>

                {/* Barra horizontal proporcional */}
                <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden relative">
                  <div
                    className={`h-2 rounded-full absolute ${
                      span.id === 'span-raiz' ? 'bg-blue-500' :
                      span.id === 'span-ast' ? 'bg-emerald-500' :
                      span.id === 'span-graphrag' ? 'bg-purple-500' :
                      'bg-amber-500'
                    }`}
                    style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Detalhes do Span Selecionado (Atributos Semânticos OTel) */}
        <div className="mt-4 pt-4 border-t border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 font-mono flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-blue-400" />
              Atributos Semânticos do Span: <span className="text-emerald-400">{selectedSpan.name}</span>
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
              StatusCode: {selectedSpan.status}
            </span>
          </div>

          <div className="bg-slate-900/90 rounded-lg p-3 border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {Object.entries(selectedSpan.atributos).map(([chave, valor]) => (
                <div key={chave} className="flex items-center justify-between p-1.5 rounded bg-slate-950/70 border border-slate-800/80">
                  <span className="text-slate-500 truncate mr-2">{chave}:</span>
                  <span className="text-slate-200 font-semibold truncate">{String(valor)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
