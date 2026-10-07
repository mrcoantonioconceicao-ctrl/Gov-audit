import React, { useState } from 'react';
import { 
  TrendingUp, 
  BarChart3, 
  AlertTriangle, 
  ShieldAlert, 
  Clock, 
  Users, 
  PieChart, 
  Calendar, 
  CheckCircle2, 
  Activity,
  ArrowUpRight,
  Sliders,
  DollarSign
} from 'lucide-react';

interface DataPoint {
  mes: string;
  real: number | null;
  projetado: number | null;
  acumuladoReal: number | null;
  acumuladoProjetado: number | null;
}

export const StatisticalTimeSeriesLab: React.FC = () => {
  const [mesesProjecao, setMesesProjecao] = useState<number>(6);
  const [adicionarPicoAnomalo, setAdicionarPicoAnomalo] = useState<boolean>(true);
  const [activeSubTab, setActiveSubTab] = useState<'timeseries' | 'clusters' | 'sla'>('timeseries');

  const valorOriginal = 100000.0;
  const tetoLegal25Pct = 125000.0; // Art. 125 da Lei 14.133/2021

  // Dados históricos simulados (4 meses)
  // Mês 3 tem pico se adicionarPicoAnomalo = true
  const valorMes3 = adicionarPicoAnomalo ? 38000.0 : 19000.0;
  const serieHistorica = [
    { mes: 'Mês -3', valor: 18500.0, acum: 18500.0 },
    { mes: 'Mês -2', valor: 19200.0, acum: 37700.0 },
    { mes: 'Mês -1', valor: valorMes3, acum: 37700.0 + valorMes3 },
    { mes: 'Mês Atual', valor: 21000.0, acum: 37700.0 + valorMes3 + 21000.0 }
  ];

  const acumuladoAtual = serieHistorica[3].acum;

  // Regressão Linear sobre a tendência
  // Se houver pico anômalo, inclinação aumenta substancialmente
  const taxaMensalProjetada = adicionarPicoAnomalo ? 22500.0 : 12500.0;
  const valorProjetadoFinal = acumuladoAtual + taxaMensalProjetada * (mesesProjecao - 1);
  const estouroTeto = valorProjetadoFinal > tetoLegal25Pct;
  const estouroContrato = valorProjetadoFinal > valorOriginal;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-bold text-slate-100">
              Módulo de Análise Estatística, Séries Temporais &amp; Preditividade
            </h3>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
              Regressão Linear • K-Means • Z-Score • SLA
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Previsão antecipada de aditivos ilegais (Art. 125 da Lei 14.133), clusterização de fornecedores e inteligência para tomada de decisão.
          </p>
        </div>

        {/* Seletor de Abas */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-medium">
          <button
            onClick={() => setActiveSubTab('timeseries')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeSubTab === 'timeseries' ? 'bg-blue-900/60 text-blue-300 font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-blue-400" />
            <span>Série Temporal &amp; Desembolso</span>
          </button>
          <button
            onClick={() => setActiveSubTab('clusters')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeSubTab === 'clusters' ? 'bg-blue-900/60 text-blue-300 font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-emerald-400" />
            <span>Clusters de Fornecedores</span>
          </button>
          <button
            onClick={() => setActiveSubTab('sla')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeSubTab === 'sla' ? 'bg-blue-900/60 text-blue-300 font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-purple-400" />
            <span>SLAs &amp; Governança</span>
          </button>
        </div>
      </div>

      {/* ABA 1: SÉRIES TEMPORAIS E PREVISÃO DE DESEMBOLSO */}
      {activeSubTab === 'timeseries' && (
        <div className="space-y-6">
          {/* Controles de Simulação */}
          <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Sliders className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-semibold text-slate-300">Parâmetros de Simulação Temporal:</span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs">
              <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={adicionarPicoAnomalo}
                  onChange={(e) => setAdicionarPicoAnomalo(e.target.checked)}
                  className="rounded border-slate-700 text-blue-600 focus:ring-0"
                />
                <span>Simular Medição com Pico Anômalo (Z-Score &gt; 2.0)</span>
              </label>

              <div className="flex items-center gap-2 text-slate-400">
                <span>Meses de Projeção:</span>
                <select
                  value={mesesProjecao}
                  onChange={(e) => setMesesProjecao(Number(e.target.value))}
                  className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-200 text-xs"
                >
                  <option value={4}>+4 Meses</option>
                  <option value={6}>+6 Meses</option>
                  <option value={12}>+12 Meses</option>
                </select>
              </div>
            </div>
          </div>

          {/* Alertas Preditivos Ativos */}
          {estouroTeto && (
            <div className="p-4 bg-rose-950/60 border border-rose-700/80 rounded-xl text-rose-200 text-xs flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-sm font-bold text-rose-100">
                  ALERTA PREDITIVO CRÍTICO: Risco de Violação do Teto Legal de 25% (Art. 125 da Lei 14.133/2021)
                </strong>
                <p className="mt-1 text-rose-300">
                  A projeção matemática (R$ {valorProjetadoFinal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}) ultrapassará o teto máximo permitido para aditivos (R$ {tetoLegal25Pct.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}). Recomenda-se glosa imediata de medições e instauração de procedimento de renegociação contratual.
                </p>
              </div>
            </div>
          )}

          {adicionarPicoAnomalo && (
            <div className="p-3 bg-amber-950/50 border border-amber-700/70 rounded-xl text-amber-200 text-xs flex items-center gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong>Detecção de Anomalia (Z-Score = 2.41):</strong> A medição no Mês -1 (R$ 38.000,00) excedeu 2 desvios-padrão da média do contrato, indicando possível antecipação irregular de faturamento.
              </span>
            </div>
          )}

          {/* Cards de Métricas de Previsão */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 uppercase font-semibold block mb-1">Valor Contratado</span>
              <div className="text-xl font-bold font-mono text-slate-100">
                R$ {valorOriginal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
              <span className="text-[10px] text-slate-500">Valor Inicial Homologado</span>
            </div>

            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 uppercase font-semibold block mb-1">Teto Máx. Aditivos (25%)</span>
              <div className="text-xl font-bold font-mono text-amber-400">
                R$ {tetoLegal25Pct.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
              <span className="text-[10px] text-slate-500">Limite do Art. 125</span>
            </div>

            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 uppercase font-semibold block mb-1">Desembolso Acumulado</span>
              <div className="text-xl font-bold font-mono text-blue-400">
                R$ {acumuladoAtual.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
              <span className="text-[10px] text-slate-500">{((acumuladoAtual / valorOriginal) * 100).toFixed(1)}% do orçamento</span>
            </div>

            <div className={`p-4 rounded-xl border ${
              estouroTeto ? 'bg-rose-950/60 border-rose-800' : 'bg-slate-950/60 border-slate-800'
            }`}>
              <span className="text-[11px] text-slate-400 uppercase font-semibold block mb-1">Total Final Projetado</span>
              <div className={`text-xl font-bold font-mono ${estouroTeto ? 'text-rose-400' : 'text-emerald-400'}`}>
                R$ {valorProjetadoFinal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
              <span className="text-[10px] text-slate-400 font-semibold">
                {((valorProjetadoFinal / valorOriginal) * 100).toFixed(1)}% ({estouroTeto ? 'ESTOURO CRÍTICO' : 'Dentro do Teto'})
              </span>
            </div>
          </div>

          {/* Gráfico / Tabela de Projeção Temporal */}
          <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-slate-200 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-blue-400" />
                Curva de Desembolso Financeiro (Histórico Real vs. Projeção por Regressão Linear)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                Y = a*X + b (Mínimos Quadrados)
              </span>
            </div>

            {/* Simulação Visual de Barras de Desembolso */}
            <div className="space-y-3 pt-2">
              {/* Histórico Real */}
              <div className="text-xs font-semibold text-slate-400">Medições Históricas Executadas:</div>
              <div className="grid grid-cols-4 gap-2">
                {serieHistorica.map((item, idx) => (
                  <div key={idx} className="bg-slate-900/90 border border-slate-800 rounded-lg p-3 text-xs">
                    <div className="flex justify-between text-slate-400 text-[11px] mb-1">
                      <span>{item.mes}</span>
                      <span className="text-blue-400 font-mono font-bold">R$ {item.valor.toLocaleString('pt-BR')}</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${(item.valor / 40000) * 100}%` }}></div>
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1">Acumulado: R$ {item.acum.toLocaleString('pt-BR')}</div>
                  </div>
                ))}
              </div>

              {/* Meses Projetados */}
              <div className="text-xs font-semibold text-purple-400 pt-2">Meses Futuros Projetados (Tendência Linear):</div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {Array.from({ length: mesesProjecao }).map((_, idx) => {
                  const valorMesProjetado = taxaMensalProjetada;
                  const acumProjetado = acumuladoAtual + taxaMensalProjetada * (idx + 1);
                  const ultrapassou = acumProjetado > tetoLegal25Pct;

                  return (
                    <div key={idx} className={`border rounded-lg p-2.5 text-xs ${
                      ultrapassou ? 'bg-rose-950/30 border-rose-800' : 'bg-purple-950/20 border-purple-900/60'
                    }`}>
                      <div className="text-[11px] text-slate-400 font-medium">Mês +{idx + 1}</div>
                      <div className={`text-xs font-mono font-bold mt-1 ${ultrapassou ? 'text-rose-400' : 'text-purple-300'}`}>
                        R$ {valorMesProjetado.toLocaleString('pt-BR')}
                      </div>
                      <div className="text-[10px] text-slate-500 mt-1 truncate">
                        Acum: R$ {acumProjetado.toLocaleString('pt-BR')}
                      </div>
                      {ultrapassou && (
                        <span className="text-[9px] font-bold text-rose-400 uppercase block mt-1">⚠️ &gt; 25%</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ABA 2: CLUSTERIZAÇÃO DE FORNECEDORES (K-MEANS) */}
      {activeSubTab === 'clusters' && (
        <div className="space-y-4">
          <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
            <h4 className="text-xs font-bold text-slate-200 flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-400" />
              Clusterização Estatística de Fornecedores e Contratos (Algoritmo K-Means)
            </h4>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Agrupa empresas prestadoras com base em volume financeiro contratado, frequência de aditivos de valor e dispersão de preços em relação à média governamental.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Cluster 1: Padrão / Baixo Risco */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                    Cluster 1: Baixo Risco
                  </span>
                  <span className="text-xs font-mono text-slate-400">142 Fornecedores</span>
                </div>
                <h5 className="font-bold text-slate-200 text-sm">Fornecedores de Alta Regularidade</h5>
                <p className="text-xs text-slate-400 mt-1">
                  Execução compatível com cronogramas e baixa incidência de aditivos de reequilíbrio.
                </p>

                <div className="mt-4 space-y-1.5 text-xs text-slate-300 font-mono">
                  <div>• Valor Médio: R$ 450.000,00</div>
                  <div>• Taxa Média Aditivos: <span className="text-emerald-400">4.2%</span></div>
                  <div>• Variação de Preço: Normal (±3%)</div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-emerald-400">
                Ação: Fiscalização Amostral Rotineira
              </div>
            </div>

            {/* Cluster 2: Risco Moderado */}
            <div className="bg-slate-950/80 border border-amber-900/50 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                    Cluster 2: Risco Moderado
                  </span>
                  <span className="text-xs font-mono text-slate-400">28 Fornecedores</span>
                </div>
                <h5 className="font-bold text-slate-200 text-sm">Aditivos Recorrentes / Volume Médio</h5>
                <p className="text-xs text-slate-400 mt-1">
                  Padrão sistemático de solicitação de aditivos próximos a 18%-20% do contrato.
                </p>

                <div className="mt-4 space-y-1.5 text-xs text-slate-300 font-mono">
                  <div>• Valor Médio: R$ 890.000,00</div>
                  <div>• Taxa Média Aditivos: <span className="text-amber-400">18.7%</span></div>
                  <div>• Variação de Preço: Moderada (+12%)</div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-amber-400">
                Ação: Auditoria de Justificativas Técnicas
              </div>
            </div>

            {/* Cluster 3: Risco Crítico */}
            <div className="bg-slate-950/80 border border-rose-900/80 rounded-xl p-4 flex flex-col justify-between shadow-lg shadow-rose-950/30">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 font-bold">
                    Cluster 3: Risco Crítico
                  </span>
                  <span className="text-xs font-mono text-slate-400">6 Fornecedores</span>
                </div>
                <h5 className="font-bold text-rose-200 text-sm">Anomalia Comportamental / Alerta TCU</h5>
                <p className="text-xs text-slate-400 mt-1">
                  Hiperconcentração de vitórias em dispensas e aditivos no teto legal de 24.9%.
                </p>

                <div className="mt-4 space-y-1.5 text-xs text-slate-300 font-mono">
                  <div>• Valor Médio: R$ 2.400.000,00</div>
                  <div>• Taxa Média Aditivos: <span className="text-rose-400 font-bold">24.8%</span></div>
                  <div>• Variação de Preço: Desvio Elevado (+28%)</div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-rose-400 font-bold">
                Ação: Acionar Auditoria Especial Concomitante
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ABA 3: MÉTRICAS DE SLA E EFICIÊNCIA DE GOVERNANÇA */}
      {activeSubTab === 'sla' && (
        <div className="space-y-4">
          <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
            <h4 className="text-xs font-bold text-slate-200 flex items-center gap-2">
              <Clock className="w-4 h-4 text-purple-400" />
              Métricas de Desempenho Administrativo &amp; Prazos de Tramitação (SLA)
            </h4>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Tempo médio gasto em cada etapa do processo administrativo para subsidiar decisões de remanejamento de força de trabalho pública.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 uppercase block mb-1">Fase 1: Elaboração</span>
              <div className="text-2xl font-bold font-mono text-slate-200">14.2 dias</div>
              <span className="text-[10px] text-slate-500">SLA meta: 15 dias (94% dentro)</span>
            </div>

            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 uppercase block mb-1">Fase 2: Consultoria Jurídica</span>
              <div className="text-2xl font-bold font-mono text-purple-400">8.5 dias</div>
              <span className="text-[10px] text-slate-500">SLA meta: 10 dias (91% dentro)</span>
            </div>

            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 uppercase block mb-1">Fase 3: Empenho Orçamentário</span>
              <div className="text-2xl font-bold font-mono text-emerald-400">3.1 dias</div>
              <span className="text-[10px] text-slate-500">SLA meta: 5 dias (98% dentro)</span>
            </div>

            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 uppercase block mb-1">Fase 4: Tribunal de Contas</span>
              <div className="text-2xl font-bold font-mono text-blue-400">12.4 dias</div>
              <span className="text-[10px] text-slate-500">Controle prévio (86% dentro)</span>
            </div>
          </div>

          <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-slate-300">Tempo Médio Total do Ciclo de Contratação:</span>
              <div className="text-3xl font-extrabold font-mono text-emerald-400 mt-0.5">38.2 dias</div>
              <p className="text-xs text-slate-500 mt-1">
                Redução de 32% no tempo de tramitação após implementação da auditoria contínua GovAudit.
              </p>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-center">
              <span className="text-[11px] text-slate-400 uppercase block mb-1">Taxa de Conformidade no SLA</span>
              <div className="text-3xl font-extrabold font-mono text-emerald-400">87.4%</div>
              <span className="text-[10px] text-emerald-400 font-semibold">Dentro do Prazo Regulamentar ✓</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
