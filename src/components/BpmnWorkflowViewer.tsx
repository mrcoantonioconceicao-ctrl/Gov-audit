import React, { useState } from 'react';
import { 
  GitCommit, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Scale, 
  FileCheck, 
  Building, 
  Globe, 
  FileText,
  RotateCcw,
  ShieldCheck,
  Clock
} from 'lucide-react';

export type StatusCicloVida = 
  | 'EM_ELABORACAO' 
  | 'ANALISE_JURIDICA' 
  | 'EMPENHADO' 
  | 'APROVADO_TRIBUNAL' 
  | 'VIGENTE';

interface BpmnStep {
  id: StatusCicloVida;
  titulo: string;
  subtitulo: string;
  orgaoResponsavel: string;
  artigoLegal: string;
  icon: React.ElementType;
}

const BPMN_STEPS: BpmnStep[] = [
  {
    id: 'EM_ELABORACAO',
    titulo: '1. Elaboração do Contrato',
    subtitulo: 'Minuta contratual e planilha orçamentária',
    orgaoResponsavel: 'Setor Requisitante / Compras',
    artigoLegal: 'Art. 18 da Lei 14.133/2021',
    icon: FileText
  },
  {
    id: 'ANALISE_JURIDICA',
    titulo: '2. Análise Jurídica Prévia',
    subtitulo: 'Exame de legalidade e emissão de parecer',
    orgaoResponsavel: 'Advocacia Pública / AGU / Procuradoria',
    artigoLegal: 'Art. 53 da Lei 14.133/2021',
    icon: Scale
  },
  {
    id: 'EMPENHADO',
    titulo: '3. Empenho Orçamentário',
    subtitulo: 'Vinculação da Nota de Empenho (SIAFI)',
    orgaoResponsavel: 'Secretaria de Orçamento / Finanças',
    artigoLegal: 'Art. 60 da Lei 4.320/1964',
    icon: Building
  },
  {
    id: 'APROVADO_TRIBUNAL',
    titulo: '4. Aprovado pelo Tribunal',
    subtitulo: 'Chancela prévia de conformidade e controle',
    orgaoResponsavel: 'Tribunal de Contas (TCU / TCE)',
    artigoLegal: 'Art. 71 da CF/88 & Regimento Interno',
    icon: FileCheck
  },
  {
    id: 'VIGENTE',
    titulo: '5. Publicação & Vigência',
    subtitulo: 'Publicação no PNCP e eficácia plena',
    orgaoResponsavel: 'Imprensa Oficial / PNCP',
    artigoLegal: 'Art. 94 da Lei 14.133/2021',
    icon: Globe
  }
];

export const BpmnWorkflowViewer: React.FC = () => {
  const [currentStatus, setCurrentStatus] = useState<StatusCicloVida>('EM_ELABORACAO');
  const [numProcesso, setNumProcesso] = useState('SEI-23000.001928/2026-44');
  const [parecerAprovado, setParecerAprovado] = useState(true);
  const [numEmpenho, setNumEmpenho] = useState('2026NE000452');
  const [protocoloTribunal, setProtocoloTribunal] = useState('TCU-REM-2026/09912');
  const [logTransicao, setLogTransicao] = useState<string[]>([
    'Instância BPMN inicializada no estado [EM_ELABORACAO] para o processo SEI-23000.001928/2026-44.'
  ]);
  const [erroBpm, setErroBpm] = useState<string | null>(null);

  const addLog = (msg: string) => {
    setLogTransicao(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev]);
  };

  const handleTransicao = (novoStatus: StatusCicloVida, eventoNome: string) => {
    setErroBpm(null);

    // Validação de Guards do BPMN
    if (novoStatus === 'ANALISE_JURIDICA' && currentStatus !== 'EM_ELABORACAO') {
      setErroBpm('Guard Rejeitado: Transição para ANALISE_JURIDICA só permitida a partir de EM_ELABORACAO.');
      return;
    }

    if (novoStatus === 'EMPENHADO') {
      if (currentStatus !== 'ANALISE_JURIDICA') {
        setErroBpm('Guard Rejeitado: Empenho exige que o contrato tenha passado pela análise jurídica.');
        return;
      }
      if (!parecerAprovado) {
        setErroBpm('Guard Rejeitado: Parecer jurídico desfavorável. O contrato deve ser devolvido para diligência.');
        return;
      }
    }

    if (novoStatus === 'APROVADO_TRIBUNAL') {
      if (currentStatus !== 'EMPENHADO') {
        setErroBpm('Guard Rejeitado: Submissão ao Tribunal de Contas requer nota de empenho vinculada.');
        return;
      }
    }

    if (novoStatus === 'VIGENTE') {
      if (currentStatus !== 'APROVADO_TRIBUNAL') {
        setErroBpm('Guard Rejeitado: Contrato só adquire vigência após chancela do Tribunal de Contas.');
        return;
      }
    }

    setCurrentStatus(novoStatus);
    addLog(`Evento BPMN '${eventoNome}' disparado ➜ Estado alterado para [${novoStatus}].`);
  };

  const handleDevolverDiligencia = () => {
    setErroBpm(null);
    setCurrentStatus('EM_ELABORACAO');
    addLog(`Evento 'DEVOLVER_PARA_DILIGENCIA' disparado ➜ Retornado ao setor requisitante para correções.`);
  };

  const handleReset = () => {
    setCurrentStatus('EM_ELABORACAO');
    setErroBpm(null);
    setLogTransicao(['Instância BPMN reiniciada no estado [EM_ELABORACAO].']);
  };

  const getStepIndex = (status: StatusCicloVida) => {
    return BPMN_STEPS.findIndex(s => s.id === status);
  };

  const currentIndex = getStepIndex(currentStatus);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <GitCommit className="w-5 h-5 text-emerald-400" />
            <h3 className="text-lg font-bold text-slate-100">
              Motor de Processo BPMN / Ciclo de Vida do Contrato Público
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Simulador visual do fluxo corporativo modelado em <code className="text-emerald-300 font-mono">CicloVidaContratoDomainService</code> e <code className="text-emerald-300 font-mono">ContratoStateMachineConfig</code>.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors w-fit"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reiniciar Fluxo BPMN</span>
        </button>
      </div>

      {/* Erro de transição */}
      {erroBpm && (
        <div className="p-3.5 bg-rose-950/70 border border-rose-800 rounded-xl text-rose-200 text-xs flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{erroBpm}</span>
        </div>
      )}

      {/* Stepper visual dos 5 estágios BPMN */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {BPMN_STEPS.map((step, idx) => {
          const StepIcon = step.icon;
          const isCurrent = step.id === currentStatus;
          const isPassed = idx < currentIndex;

          return (
            <div
              key={step.id}
              className={`p-3.5 rounded-xl border transition-all flex flex-col justify-between ${
                isCurrent
                  ? 'bg-emerald-950/60 border-emerald-500 ring-2 ring-emerald-500/30 shadow-lg shadow-emerald-950/50'
                  : isPassed
                  ? 'bg-slate-900/90 border-slate-700 text-slate-300'
                  : 'bg-slate-950/50 border-slate-800/80 text-slate-500'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                    isCurrent ? 'bg-emerald-600 text-white' :
                    isPassed ? 'bg-slate-800 text-emerald-400' : 'bg-slate-900 text-slate-600'
                  }`}>
                    {isPassed ? <CheckCircle2 className="w-4 h-4" /> : <StepIcon className="w-4 h-4" />}
                  </div>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800">
                    Passo {idx + 1}
                  </span>
                </div>

                <h4 className={`text-xs font-bold ${isCurrent ? 'text-emerald-300' : 'text-slate-200'}`}>
                  {step.titulo}
                </h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                  {step.subtitulo}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800/80 text-[10px] text-slate-400 space-y-0.5">
                <div className="truncate font-semibold text-slate-300">{step.orgaoResponsavel}</div>
                <div className="text-slate-500 truncate">{step.artigoLegal}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Painel Interativo de Ações e Parâmetros BPMN */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Painel de Controle */}
        <div className="lg:col-span-7 bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Disparador de Eventos BPMN (Painel do Operador)
            </span>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
              Estado: {currentStatus}
            </span>
          </div>

          {/* Estado: EM_ELABORACAO */}
          {currentStatus === 'EM_ELABORACAO' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-300 leading-relaxed">
                O contrato está na fase interna preparatória. O termo de referência e a planilha orçamentária foram finalizados.
              </p>
              <button
                onClick={() => handleTransicao('ANALISE_JURIDICA', 'ENVIAR_ANALISE_JURIDICA')}
                className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md shadow-blue-950/50"
              >
                <span>Remeter para Análise Jurídica Prévia (Art. 53 da Lei 14.133)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Estado: ANALISE_JURIDICA */}
          {currentStatus === 'ANALISE_JURIDICA' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-300 leading-relaxed">
                A Consultoria Jurídica/AGU está analisando a conformidade legal da minuta contratual.
              </p>
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-2">
                <label className="text-xs text-slate-400 font-medium block">Conclusão do Parecer Jurídico</label>
                <div className="flex gap-4 text-xs">
                  <label className="flex items-center gap-1.5 text-emerald-300 cursor-pointer">
                    <input
                      type="radio"
                      name="parecer"
                      checked={parecerAprovado}
                      onChange={() => setParecerAprovado(true)}
                    />
                    <span>Favorável (Sem Vícios)</span>
                  </label>
                  <label className="flex items-center gap-1.5 text-rose-300 cursor-pointer">
                    <input
                      type="radio"
                      name="parecer"
                      checked={!parecerAprovado}
                      onChange={() => setParecerAprovado(false)}
                    />
                    <span>Com Apontamentos / Diligência</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-2">
                {parecerAprovado ? (
                  <button
                    onClick={() => handleTransicao('EMPENHADO', 'HOMOLOGAR_PARECER_E_EMPENHAR')}
                    className="flex-1 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Homologar Parecer e Autorizar Empenho (SIAFI)</span>
                  </button>
                ) : (
                  <button
                    onClick={handleDevolverDiligencia}
                    className="flex-1 py-2.5 px-4 bg-amber-600 hover:bg-amber-500 text-white font-medium text-xs rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Devolver para Saneamento de Diligência</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Estado: EMPENHADO */}
          {currentStatus === 'EMPENHADO' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-300 leading-relaxed">
                A dotação orçamentária foi bloqueada e a Nota de Empenho foi emitida no SIAFI. O processo está apto para submissão ao Tribunal de Contas.
              </p>
              <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-xs font-mono flex items-center justify-between text-slate-300">
                <span>Nota de Empenho: {numEmpenho}</span>
                <span className="text-emerald-400 font-bold">Saldo Validado ✓</span>
              </div>
              <button
                onClick={() => handleTransicao('APROVADO_TRIBUNAL', 'SUBMETER_TRIBUNAL_CONTAS')}
                className="w-full py-2.5 px-4 bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <FileCheck className="w-4 h-4" />
                <span>Submeter à Chancela Prévia do Tribunal de Contas (TCU/TCE)</span>
              </button>
            </div>
          )}

          {/* Estado: APROVADO_TRIBUNAL */}
          {currentStatus === 'APROVADO_TRIBUNAL' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-300 leading-relaxed">
                O Tribunal de Contas atestou a regularidade prévia do contrato sob o protocolo <code className="text-purple-300">{protocoloTribunal}</code>. O próximo passo é a publicação oficial no Portal Nacional de Contratações Públicas.
              </p>
              <button
                onClick={() => handleTransicao('VIGENTE', 'PUBLICAR_PNCP_E_ATIVAR')}
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/60"
              >
                <Globe className="w-4 h-4" />
                <span>Publicar no PNCP e Ativar Vigência Plena (Art. 94)</span>
              </button>
            </div>
          )}

          {/* Estado: VIGENTE */}
          {currentStatus === 'VIGENTE' && (
            <div className="space-y-3">
              <div className="p-3 bg-emerald-950/80 border border-emerald-600 rounded-lg text-emerald-200 text-xs flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Contrato plenamente VIGENTE, publicado no PNCP e fiscalizado pelos órgãos de controle.</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Todas as fases do ciclo de vida exigidas pela legislação brasileira foram satisfeitas com êxito e registradas em trilha de auditoria contínua.
              </p>
            </div>
          )}
        </div>

        {/* Trilha de Auditoria do BPMN */}
        <div className="lg:col-span-5 bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-3 font-mono">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-xs font-sans font-bold text-slate-300 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              Trilha de Auditoria BPMN
            </span>
            <span className="text-[10px] text-slate-500">{logTransicao.length} evento(s)</span>
          </div>

          <div className="max-h-56 overflow-y-auto space-y-2 text-xs pr-1">
            {logTransicao.map((log, i) => (
              <div key={i} className="p-2 rounded bg-slate-900 border border-slate-800/80 text-slate-300 text-[11px] leading-relaxed">
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
