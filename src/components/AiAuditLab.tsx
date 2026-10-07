import React, { useState } from 'react';
import { 
  Bot, 
  GitBranch, 
  Share2, 
  FileText, 
  Database, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldAlert, 
  Download, 
  Terminal, 
  Play, 
  Layers, 
  Search,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

interface DesvioAstVisual {
  codigo: string;
  descricao: string;
  severidade: 'CRITICO' | 'ALTO' | 'MEDIO';
  linha: number;
}

const MINUTA_EXEMPLO_PADRAO = `MINUTA DE CONTRATO ADMINISTRATIVO Nº 04/2026
PROCESSO: SEI-23000.001928/2026-44

CLÁUSULA PRIMEIRA - DO OBJETO
O presente instrumento tem por objeto a contratação de serviços técnicos especializados em infraestrutura de nuvem soberana e governança de dados públicos.

CLÁUSULA SEGUNDA - DA VIGÊNCIA
O prazo de vigência deste contrato é de 24 (vinte e quatro) meses contínuos, com eficácia a contar da publicação no Portal Nacional de Contratações Públicas (PNCP).

CLÁUSULA TERCEIRA - DO PAGAMENTO E ADIANTAMENTO
O pagamento do valor total referente à implantação será realizado antecipadamente em parcela única de 30% em até 10 dias após a assinatura, sem necessidade de prestação de garantia prévia ou caução fidejussória.

CLÁUSULA QUARTA - DO PREÇO E VALOR GLOBAL
O valor global estimado do contrato é de R$ 98.400,00 (noventa e oito mil e quatrocentos reais).

CLÁUSULA QUINTA - DAS PENALIDADES E SANÇÕES
Em caso de inexecução parcial ou total das obrigações, a CONTRATADA sujeitar-se-á às sanções previstas na Lei Federal nº 14.133/2021.`;

export const AiAuditLab: React.FC = () => {
  const [minutaTexto, setMinutaTexto] = useState(MINUTA_EXEMPLO_PADRAO);
  const [activeSubTab, setActiveSubTab] = useState<'audit' | 'ast' | 'graphrag' | 'mcp' | 'finetuning'>('audit');
  const [executando, setExecutando] = useState(false);
  const [auditado, setAuditado] = useState(true);

  // Resultados simulados da AST
  const [desviosAst, setDesviosAst] = useState<DesvioAstVisual[]>([
    {
      codigo: 'PAGAMENTO_ANTECIPADO_IRREGULAR',
      descricao: 'Cláusula Terceira estipula adiantamento de 30% sem exigência de garantia ou caução prévia (Vício insanável: Art. 145 da Lei 14.133/2021).',
      severidade: 'CRITICO',
      linha: 10
    },
    {
      codigo: 'OMISSAO_CLAUSULA_REAJUSTE',
      descricao: 'Contrato com vigência de 24 meses sem estipulação de índice oficial de reajuste de preços (Art. 92, V da Lei 14.133/2021 e Acórdão TCU 1.823/2022).',
      severidade: 'ALTO',
      linha: 7
    },
    {
      codigo: 'AVISO_MATRIZ_RISCOS',
      descricao: 'Recomendação de inclusão expressa de cláusula de alocação de riscos para prevenção de desequilíbrio econômico-financeiro.',
      severidade: 'MEDIO',
      linha: 0
    }
  ]);

  const scoreConformidade = 45.0; // Desfavorável devido a adiantamento irregular

  const handleExecutarAuditoria = () => {
    setExecutando(true);
    setTimeout(() => {
      setExecutando(false);
      setAuditado(true);
    }, 600);
  };

  const handleBaixarJsonl = () => {
    const jsonlContent = `{"messages": [{"role": "system", "content": "Você é o auditor sênior do sistema GovAudit, especializado na Lei 14.133/2021 e jurisprudência do TCU."}, {"role": "user", "content": "Analise a cláusula: O pagamento será antecipado sem necessidade de caução."}, {"role": "assistant", "content": "PARECER TÉCNICO: CLÁUSULA NULA POR VÍCIO LEGAL. O Artigo 145 da Lei nº 14.133/2021 veda expressamente o pagamento antecipado sem garantia prévia idônea."}]}
{"messages": [{"role": "system", "content": "Você é o auditor sênior do sistema GovAudit, especializado na Lei 14.133/2021 e jurisprudência do TCU."}, {"role": "user", "content": "O termo de referência estipula prazo de vigência de 24 meses sem prever índice de reajuste."}, {"role": "assistant", "content": "PARECER TÉCNICO: IRREGULARIDADE FORMAL. Conforme Artigo 92, inciso V da Lei nº 14.133/2021 e Acórdão TCU 1.823/2022-Plenário, contratos com vigência igual ou superior a 12 meses exigem índice oficial de reajuste."}]}
{"messages": [{"role": "system", "content": "Você é o auditor sênior do sistema GovAudit, especializado na Lei 14.133/2021 e jurisprudência do TCU."}, {"role": "user", "content": "Contratação direta por dispensa de licitação de obras de reforma predial no valor de R$ 135.000,00."}, {"role": "assistant", "content": "PARECER TÉCNICO: VIOLAÇÃO DE TETO LEGAL. O valor ultrapassa o teto do Art. 75, I da Lei 14.133/2021. Exige licitação formal."}]}`;

    const blob = new Blob([jsonlContent], { type: 'application/x-jsonlines;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'govaudit_fine_tuning_dataset.jsonl';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      {/* Header do Módulo */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-bold text-slate-100">
              Módulo de IA Avançada &amp; Auditoria Automatizada
            </h3>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
              GraphRAG • AST • MCP • Fine-Tuning
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Inspeção sintática profunda de minutas, cruzamento de grafos de sanções (CEIS/TCU) e despacho para agentes de IA via Model Context Protocol.
          </p>
        </div>

        <button
          onClick={handleExecutarAuditoria}
          disabled={executando}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-emerald-600 hover:from-purple-500 hover:to-emerald-500 text-white font-medium text-xs rounded-xl transition-all shadow-lg shadow-purple-950/40 w-fit"
        >
          <Play className="w-3.5 h-3.5" />
          <span>{executando ? 'Processando com IA...' : 'Disparar Auditoria Inteligente'}</span>
        </button>
      </div>

      {/* Subnavegação de Conceitos */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-800/80 pb-2 text-xs font-medium">
        <button
          onClick={() => setActiveSubTab('audit')}
          className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
            activeSubTab === 'audit' ? 'bg-purple-950 text-purple-300 border border-purple-800 font-semibold' : 'text-slate-400 hover:bg-slate-800'
          }`}
        >
          <Bot className="w-3.5 h-3.5 text-purple-400" />
          <span>Parecer &amp; Score da IA</span>
        </button>

        <button
          onClick={() => setActiveSubTab('ast')}
          className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
            activeSubTab === 'ast' ? 'bg-purple-950 text-purple-300 border border-purple-800 font-semibold' : 'text-slate-400 hover:bg-slate-800'
          }`}
        >
          <GitBranch className="w-3.5 h-3.5 text-blue-400" />
          <span>Análise Sintática AST ({desviosAst.length} desvios)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('graphrag')}
          className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
            activeSubTab === 'graphrag' ? 'bg-purple-950 text-purple-300 border border-purple-800 font-semibold' : 'text-slate-400 hover:bg-slate-800'
          }`}
        >
          <Share2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>Grafo de Conhecimento (GraphRAG)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('mcp')}
          className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
            activeSubTab === 'mcp' ? 'bg-purple-950 text-purple-300 border border-purple-800 font-semibold' : 'text-slate-400 hover:bg-slate-800'
          }`}
        >
          <Terminal className="w-3.5 h-3.5 text-amber-400" />
          <span>Protocolo MCP (Context Payload)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('finetuning')}
          className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
            activeSubTab === 'finetuning' ? 'bg-purple-950 text-purple-300 border border-purple-800 font-semibold' : 'text-slate-400 hover:bg-slate-800'
          }`}
        >
          <Database className="w-3.5 h-3.5 text-rose-400" />
          <span>Pipeline de Fine-Tuning (JSONL)</span>
        </button>
      </div>

      {/* Conteúdo da Aba 1: PARECER DA IA & SCORE */}
      {activeSubTab === 'audit' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-2">
              <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
                <span>Minuta Contratual em Análise (Texto Submetido)</span>
                <span className="text-[10px] text-slate-500 font-mono">5 Cláusulas detectadas</span>
              </label>
              <textarea
                value={minutaTexto}
                onChange={(e) => setMinutaTexto(e.target.value)}
                rows={9}
                className="w-full text-xs font-mono bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-200 focus:outline-none focus:border-purple-500 leading-relaxed"
              />
            </div>

            {/* Parecer Emitido pela IA */}
            <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                  <Bot className="w-4 h-4 text-purple-400" />
                  Parecer Técnico Emitido pelo Agente GovAudit-LLM
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-400 border border-rose-800 font-bold">
                  DESFAVORÁVEL (VÍCIOS DETECTADOS)
                </span>
              </div>

              <div className="text-xs text-slate-300 leading-relaxed space-y-2">
                <p>
                  <strong>1. DO ADIANTAMENTO IRREGULAR (Art. 145 da Lei 14.133/2021):</strong> A Cláusula Terceira estabelece pagamento antecipado de 30% em parcela única sem exigir prévia garantia ou caução fidejussória. Trata-se de vício material que enseja nulidade contratual e responsabilização do ordenador de despesas.
                </p>
                <p>
                  <strong>2. DA AUSÊNCIA DE ÍNDICE DE REAJUSTE (Art. 92, V):</strong> O contrato possui vigência de 24 meses. A ausência de índice econômico oficial (IPCA/INPC) afronta o Art. 92, V da Lei 14.133 e a jurisprudência pacífica do TCU (Acórdão 1.823/2022-Plenário).
                </p>
                <p className="text-emerald-400 font-medium pt-1">
                  💡 <strong>Recomendação da IA:</strong> Devolver a minuta à Assessoria Jurídica e ao Setor de Compras para supressão do adiantamento ou fixação de apólice de seguro-garantia de 100% do valor antecipado, com inclusão de cláusula de reajustamento com base no IPCA/IBGE.
                </p>
              </div>
            </div>
          </div>

          {/* Lado Direito: Score e Riscos */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 space-y-4 text-center">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                Índice Geral de Conformidade Regulatória
              </span>
              <div className="flex items-center justify-center gap-3">
                <div className="text-4xl font-extrabold font-mono text-rose-400">
                  {scoreConformidade}
                  <span className="text-lg text-slate-500 font-normal"> / 100</span>
                </div>
              </div>

              <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                <div className="bg-rose-500 h-2.5 rounded-full" style={{ width: `${scoreConformidade}%` }}></div>
              </div>

              <p className="text-xs text-rose-300/80">
                ⚠️ Risco Elevado de Apontamento por Órgãos de Controle (TCU / CGU).
              </p>
            </div>

            {/* Sumário das Violações Detectadas */}
            <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-slate-300 block mb-2">
                Resumo dos Apontamentos (AST &amp; GraphRAG)
              </span>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded bg-rose-950/40 border border-rose-800/80 text-rose-300 flex items-start gap-2">
                  <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-200">Violação Crítica: Pagamento Antecipado</strong>
                    <span>Art. 145 da Lei 14.133 • Falta de caução prévia</span>
                  </div>
                </div>

                <div className="p-2.5 rounded bg-amber-950/40 border border-amber-800/80 text-amber-300 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-200">Violação Alta: Índice de Reajuste Omitido</strong>
                    <span>Art. 92, V da Lei 14.133 • Vigência superior a 1 ano</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Conteúdo da Aba 2: ÁRVORE SINTÁTICA ABSTRATA (AST) */}
      {activeSubTab === 'ast' && (
        <div className="space-y-4">
          <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-slate-200 flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-blue-400" />
                Estrutura Hierárquica da Árvore Sintática (AST Parser)
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                O analisador léxico e sintático decompõe a minuta jurídica em nós AST para validação estática das cláusulas essenciais do Art. 92.
              </p>
            </div>
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-blue-950 text-blue-300 border border-blue-800">
              5 Cláusulas Mapeadas
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Visualização dos Nós da AST */}
            <div className="bg-slate-950/90 p-4 rounded-xl border border-slate-800 font-mono text-xs space-y-2 text-slate-300">
              <div className="text-blue-400 font-bold">DocumentoAstNode: MinutaContratual</div>
              <div className="pl-4 border-l border-slate-800 space-y-2">
                <div>
                  <span className="text-emerald-400">├── ClausulaAstNode[CLÁUSULA PRIMEIRA]</span>
                  <div className="text-slate-500 pl-6 text-[11px]">Tipo: Objeto • Status: VÁLIDO</div>
                </div>
                <div>
                  <span className="text-amber-400">├── ClausulaAstNode[CLÁUSULA SEGUNDA]</span>
                  <div className="text-slate-500 pl-6 text-[11px]">Tipo: Vigência • Vigência: 24 meses</div>
                </div>
                <div>
                  <span className="text-rose-400 font-bold">├── ClausulaAstNode[CLÁUSULA TERCEIRA] ⚠️</span>
                  <div className="text-rose-300 pl-6 text-[11px]">Vício: Pagamento Antecipado sem Caução</div>
                </div>
                <div>
                  <span className="text-emerald-400">├── ClausulaAstNode[CLÁUSULA QUARTA]</span>
                  <div className="text-slate-500 pl-6 text-[11px]">Tipo: Preço Global • Valor: R$ 98.400,00</div>
                </div>
                <div>
                  <span className="text-emerald-400">└── ClausulaAstNode[CLÁUSULA QUINTA]</span>
                  <div className="text-slate-500 pl-6 text-[11px]">Tipo: Penalidades • Regime: Lei 14.133</div>
                </div>
              </div>
            </div>

            {/* Desvios Detectados pela Análise Estática */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-300 block">
                Desvios Sintáticos &amp; Regulatórios Detectados na AST:
              </span>
              {desviosAst.map((desvio, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg border text-xs ${
                    desvio.severidade === 'CRITICO' ? 'bg-rose-950/50 border-rose-800 text-rose-200' :
                    desvio.severidade === 'ALTO' ? 'bg-amber-950/50 border-amber-800 text-amber-200' :
                    'bg-slate-900 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold mb-1">
                    <span className="font-mono text-[11px]">{desvio.codigo}</span>
                    <span className="text-[10px] uppercase px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800">
                      Severidade: {desvio.severidade}
                    </span>
                  </div>
                  <p className="leading-relaxed text-[11px]">{desvio.descricao}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Conteúdo da Aba 3: GRAPHRAG (GRAFO DE CONHECIMENTO) */}
      {activeSubTab === 'graphrag' && (
        <div className="space-y-4">
          <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
            <h4 className="text-xs font-bold text-slate-200 flex items-center gap-2">
              <Share2 className="w-4 h-4 text-emerald-400" />
              Recuperação Aumentada por Grafo (GraphRAG Knowledge Graph)
            </h4>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Diferente do RAG vetorial comum, o GraphRAG mapeia e navega relações explícitas entre empresas, quadros societários, sanções públicas (CEIS/CNEP) e acórdãos do TCU.
            </p>
          </div>

          <div className="bg-slate-950/90 p-5 rounded-xl border border-slate-800 font-mono text-xs space-y-4">
            <div className="text-emerald-400 font-semibold border-b border-slate-800 pb-2">
              Grafo de Auditoria Navegado para o Contrato:
            </div>

            <div className="space-y-3 text-slate-300">
              <div className="flex items-center gap-2 text-xs">
                <span className="px-2 py-1 rounded bg-blue-950 text-blue-300 border border-blue-800">Node[Contrato: 04/2026]</span>
                <span className="text-slate-500 font-mono">{'──[:REGULADO_POR]──▶'}</span>
                <span className="px-2 py-1 rounded bg-purple-950 text-purple-300 border border-purple-800">Node[Lei 14.133/2021]</span>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="px-2 py-1 rounded bg-blue-950 text-blue-300 border border-blue-800">Node[Contrato: 04/2026]</span>
                <span className="text-slate-500 font-mono">{'──[:CONTRATADA]──▶'}</span>
                <span className="px-2 py-1 rounded bg-amber-950 text-amber-300 border border-amber-800">Node[Empresa: 00.394.460/0058-87]</span>
                <span className="text-slate-500 font-mono">{'──[:SITUACAO]──▶'}</span>
                <span className="px-2 py-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">Ativa (Receita Federal)</span>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="px-2 py-1 rounded bg-purple-950 text-purple-300 border border-purple-800">Node[Lei 14.133: Art. 145]</span>
                <span className="text-slate-500 font-mono">{'──[:INTERPRETADO_POR]──▶'}</span>
                <span className="px-2 py-1 rounded bg-rose-950 text-rose-300 border border-rose-800">Acórdão TCU 1.823/2022-Plenário</span>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="px-2 py-1 rounded bg-purple-950 text-purple-300 border border-purple-800">Node[Dispensa de Licitação]</span>
                <span className="text-slate-500 font-mono">{'──[:SUMULA_APLICAVEL]──▶'}</span>
                <span className="px-2 py-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">Súmula TCU nº 222 (Pesquisa de Preços)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Conteúdo da Aba 4: MODEL CONTEXT PROTOCOL (MCP) */}
      {activeSubTab === 'mcp' && (
        <div className="space-y-4">
          <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
            <h4 className="text-xs font-bold text-slate-200 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-amber-400" />
              Model Context Protocol (MCP) - Especificação do Contexto
            </h4>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Padronização do protocolo de contexto entre o ecossistema Spring Boot e os agentes de IA, incluindo recursos, ferramentas (tools) e metadados fiscais.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto max-h-[420px] leading-relaxed">
            <pre>{JSON.stringify({
              protocol: "mcp/1.0",
              sessionId: "sess-99b2401-govaudit-2026",
              context: {
                processo: "SEI-23000.001928/2026-44",
                orgao: "Ministério da Gestão e Inovação",
                cnpj: "00.394.460/0058-87",
                valorGlobal: 98400.00,
                normasRegulamentares: ["Lei 14.133/2021", "Decreto 93.872/1986"],
                astFindings: [
                  { code: "PAGAMENTO_ANTECIPADO_IRREGULAR", severity: "CRITICAL", rule: "Art. 145" },
                  { code: "OMISSAO_CLAUSULA_REAJUSTE", severity: "HIGH", rule: "Art. 92, V" }
                ],
                graphRagLineage: [
                  "Acordao-TCU-1823/2022",
                  "Sumula-TCU-222"
                ]
              },
              tools: [
                { name: "consultar_tcu_jurisprudencia", description: "Busca vetorial e de grafo na base de acórdãos" },
                { name: "verificar_cadin_receita", description: "Validação de regularidade fiscal do CNPJ" }
              ],
              resources: [
                { uri: "uri://gov/leis/14133-2021/art-92", mimeType: "text/plain" },
                { uri: "uri://gov/leis/14133-2021/art-145", mimeType: "text/plain" }
              ]
            }, null, 2)}</pre>
          </div>
        </div>
      )}

      {/* Conteúdo da Aba 5: PIPELINE DE FINE-TUNING */}
      {activeSubTab === 'finetuning' && (
        <div className="space-y-4">
          <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-slate-200 flex items-center gap-2">
                <Database className="w-4 h-4 text-rose-400" />
                Pipeline de Dados para Fine-Tuning de LLMs (JSONL)
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Dataset curado de pares de instrução e resposta baseados em decisões históricas do TCU e na Lei 14.133/2021 para especialização do modelo.
              </p>
            </div>

            <button
              onClick={handleBaixarJsonl}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-700 hover:bg-rose-600 text-white rounded-lg text-xs font-medium transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Baixar Dataset (.jsonl)</span>
            </button>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 space-y-3 overflow-x-auto max-h-[400px]">
            <div className="p-3 bg-slate-900 rounded border border-slate-800">
              <span className="text-rose-400 font-bold block mb-1">Amostra 1 (Supervised Fine-Tuning - SFT):</span>
              <pre className="whitespace-pre-wrap text-[11px] text-slate-300">
{`{"messages": [
  {"role": "system", "content": "Você é o auditor sênior do sistema GovAudit, especializado na Lei 14.133/2021..."},
  {"role": "user", "content": "Analise a cláusula: O pagamento será antecipado em 30 dias sem necessidade de caução."},
  {"role": "assistant", "content": "PARECER TÉCNICO: CLÁUSULA NULA POR VÍCIO LEGAL. O Artigo 145 da Lei nº 14.133/2021 veda expressamente o pagamento antecipado sem garantia idônea."}
]}`}
              </pre>
            </div>

            <div className="p-3 bg-slate-900 rounded border border-slate-800">
              <span className="text-rose-400 font-bold block mb-1">Amostra 2 (Reajuste e Índice Econômico):</span>
              <pre className="whitespace-pre-wrap text-[11px] text-slate-300">
{`{"messages": [
  {"role": "system", "content": "Você é o auditor sênior do sistema GovAudit, especializado na Lei 14.133/2021..."},
  {"role": "user", "content": "Termo de referência estipula prazo de 24 meses contínuos sem prever índice de reajuste."},
  {"role": "assistant", "content": "PARECER TÉCNICO: IRREGULARIDADE FORMAL. Conforme Artigo 92, inciso V da Lei nº 14.133/2021 e Acórdão TCU 1.823/2022-Plenário, contratos >= 12 meses exigem obrigatoriamente índice oficial (ex: IPCA)."}
]}`}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
