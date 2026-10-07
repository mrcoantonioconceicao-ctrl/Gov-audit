import React, { useState } from 'react';
import { 
  Play, 
  ShieldAlert, 
  CheckCircle, 
  AlertTriangle, 
  RefreshCw, 
  FileText, 
  PlusCircle, 
  History,
  Lock,
  ArrowRight
} from 'lucide-react';

interface SimulatedItem {
  numero: number;
  descricao: string;
  quantidade: number;
  valorUnitario: number;
}

interface SimulatedEvent {
  timestamp: string;
  name: string;
  payload: string;
}

// Algoritmo oficial de validação de CNPJ da Receita Federal
function validarCnpj(cnpjStr: string): boolean {
  const limpo = cnpjStr.replace(/\D/g, '');
  if (limpo.length !== 14 || /^(\d)\1{13}$/.test(limpo)) return false;

  let soma = 0;
  let peso = 2;
  for (let i = 11; i >= 0; i--) {
    soma += parseInt(limpo.charAt(i), 10) * peso;
    peso = peso === 9 ? 2 : peso + 1;
  }
  let digito1 = 11 - (soma % 11);
  if (digito1 >= 10) digito1 = 0;

  soma = 0;
  peso = 2;
  for (let i = 12; i >= 0; i--) {
    soma += parseInt(limpo.charAt(i), 10) * peso;
    peso = peso === 9 ? 2 : peso + 1;
  }
  let digito2 = 11 - (soma % 11);
  if (digito2 >= 10) digito2 = 0;

  return parseInt(limpo.charAt(12), 10) === digito1 && parseInt(limpo.charAt(13), 10) === digito2;
}

export const ContractSimulator: React.FC = () => {
  // Estado do formulário
  const [numeroProcesso, setNumeroProcesso] = useState('SEI-23000.001928/2026-44');
  const [orgaoContratante, setOrgaoContratante] = useState('Ministério da Gestão e Inovação (MGI)');
  const [cnpjContratada, setCnpjContratada] = useState('00.394.460/0058-87'); // Válido (Ministério da Fazenda / Receita)
  const [razaoSocial, setRazaoSocial] = useState('TechGov Soluções em Nuvem Ltda.');
  const [modalidade, setModalidade] = useState<'DISPENSA_COMPRAS_SERVICOS' | 'DISPENSA_OBRAS_ENGENHARIA' | 'PREGAO_ELETRONICO' | 'CONCORRENCIA'>('DISPENSA_COMPRAS_SERVICOS');
  const [valorTotal, setValorTotal] = useState(48500.00);

  // Estado da Entidade de Domínio Simulada
  const [contratoCriado, setContratoCriado] = useState<boolean>(false);
  const [status, setStatus] = useState<string>('AGUARDANDO_TRIAGEM');
  const [itens, setItens] = useState<SimulatedItem[]>([
    { numero: 1, descricao: 'Licenciamento anual de plataforma de auditoria contínua', quantidade: 1, valorUnitario: 48500.00 }
  ]);
  const [eventos, setEventos] = useState<SimulatedEvent[]>([]);
  const [erroInvariante, setErroInvariante] = useState<string | null>(null);
  const [sucessoMsg, setSucessoMsg] = useState<string | null>(null);

  // Parâmetros de auditoria
  const [matriculaAuditor, setMatriculaAuditor] = useState('AUD-99420');
  const [justificativa, setJustificativa] = useState('Documentação fiscal em conformidade com o edital e preços compatíveis com a média do Painel de Preços.');

  const registrarEvento = (nome: string, payload: string) => {
    const novo: SimulatedEvent = {
      timestamp: new Date().toLocaleTimeString(),
      name: nome,
      payload
    };
    setEventos(prev => [novo, ...prev]);
  };

  const handleCriarContrato = () => {
    setErroInvariante(null);
    setSucessoMsg(null);

    // Validação de CNPJ (Value Object Cnpj)
    if (!validarCnpj(cnpjContratada)) {
      setErroInvariante(`[InvarianteVioladaException] CNPJ inválido de acordo com a Receita Federal: ${cnpjContratada}. Dígitos verificadores não conferem.`);
      return;
    }

    // Validação de Limites da Nova Lei de Licitações (Lei 14.133/2021)
    const LIMITE_COMPRAS = 59906.02;
    const LIMITE_OBRAS = 119812.02;

    if (modalidade === 'DISPENSA_COMPRAS_SERVICOS' && valorTotal > LIMITE_COMPRAS) {
      setErroInvariante(`[InvarianteVioladaException] Valor R$ ${valorTotal.toLocaleString('pt-BR')} ultrapassa o teto legal de R$ 59.906,02 para Dispensa de Compras/Serviços (Art. 75, II da Lei 14.133/2021). Exige Pregão Eletrônico.`);
      return;
    }

    if (modalidade === 'DISPENSA_OBRAS_ENGENHARIA' && valorTotal > LIMITE_OBRAS) {
      setErroInvariante(`[InvarianteVioladaException] Valor R$ ${valorTotal.toLocaleString('pt-BR')} ultrapassa o teto legal de R$ 119.812,02 para Dispensa de Obras de Engenharia (Art. 75, I da Lei 14.133/2021).`);
      return;
    }

    setContratoCriado(true);
    setStatus('AGUARDANDO_TRIAGEM');
    setSucessoMsg(`Aggregate Root 'ContratoPendente' instanciado com sucesso! Invariantes validadas.`);
    registrarEvento('ContratoSubmetidoEvent', `Processo: ${numeroProcesso} | Valor: R$ ${valorTotal.toFixed(2)}`);
  };

  const handleIniciarAuditoria = () => {
    setErroInvariante(null);
    setSucessoMsg(null);

    if (itens.length === 0) {
      setErroInvariante('[InvarianteVioladaException] Contrato não pode ser auditado sem itens orçamentários descritos.');
      return;
    }

    setStatus('EM_AUDITORIA');
    setSucessoMsg('Transição de estado para "EM_AUDITORIA" autorizada. Auditor alocado.');
    registrarEvento('AuditoriaIniciadaEvent', `Auditor: ${matriculaAuditor} alocado para triagem técnica.`);
  };

  const handleAprovar = () => {
    setErroInvariante(null);
    setSucessoMsg(null);

    if (status !== 'EM_AUDITORIA') {
      setErroInvariante('[InvarianteVioladaException] Contrato precisa estar em status "EM_AUDITORIA" para receber parecer.');
      return;
    }

    setStatus('APROVADO_CONFORME');
    setSucessoMsg('Parecer favorável emitido! Contrato homologado para formalização.');
    registrarEvento('ContratoAuditadoEvent', `Status: APROVADO_CONFORME | Auditor: ${matriculaAuditor}`);
  };

  const handleRejeitar = (sobrepreco: boolean) => {
    setErroInvariante(null);
    setSucessoMsg(null);

    if (status !== 'EM_AUDITORIA') {
      setErroInvariante('[InvarianteVioladaException] Contrato precisa estar em status "EM_AUDITORIA" para receber parecer.');
      return;
    }

    const novoStatus = sobrepreco ? 'BLOQUEADO_SOBREPRECO' : 'REJEITADO_IRREGULAR';
    setStatus(novoStatus);
    setSucessoMsg(`Contrato rejeitado com parecer desfavorável. Bloqueio cautelar acionado.`);
    registrarEvento('ContratoAuditadoEvent', `Status: ${novoStatus} | Auditor: ${matriculaAuditor}`);
  };

  const handleReset = () => {
    setContratoCriado(false);
    setStatus('AGUARDANDO_TRIAGEM');
    setErroInvariante(null);
    setSucessoMsg(null);
    setEventos([]);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div>
          <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <Play className="w-5 h-5 text-emerald-400" />
            Simulador de Invariantes &amp; Máquina de Estados (DDD)
          </h3>
          <p className="text-sm text-slate-400">
            Teste interativo das regras de negócio encapsuladas na entidade <code className="text-emerald-300 font-mono">ContratoPendente</code> (Lei 14.133/2021).
          </p>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors w-fit"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reiniciar Simulador</span>
        </button>
      </div>

      {/* Alertas de Invariantes */}
      {erroInvariante && (
        <div className="p-4 rounded-xl bg-rose-950/70 border border-rose-700/80 text-rose-200 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-bold block text-sm mb-0.5">Violação de Invariante de Domínio:</span>
            <code className="font-mono">{erroInvariante}</code>
          </div>
        </div>
      )}

      {sucessoMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-950/70 border border-emerald-700/80 text-emerald-200 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-medium">{sucessoMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Lado Esquerdo: Formulário de Entrada do Domínio */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-400" />
              1. Dados do Contrato Administrativo
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Número do Processo (VO)</label>
                <input
                  type="text"
                  value={numeroProcesso}
                  disabled={contratoCriado}
                  onChange={(e) => setNumeroProcesso(e.target.value)}
                  className="w-full text-xs font-mono bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500 disabled:opacity-60"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Órgão Contratante</label>
                <input
                  type="text"
                  value={orgaoContratante}
                  disabled={contratoCriado}
                  onChange={(e) => setOrgaoContratante(e.target.value)}
                  className="w-full text-xs bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500 disabled:opacity-60"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs text-slate-400">CNPJ da Contratada (VO)</label>
                  <span className="text-[10px] text-emerald-400">Dígito verificado</span>
                </div>
                <input
                  type="text"
                  value={cnpjContratada}
                  disabled={contratoCriado}
                  onChange={(e) => setCnpjContratada(e.target.value)}
                  placeholder="00.000.000/0000-00"
                  className="w-full text-xs font-mono bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500 disabled:opacity-60"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Razão Social</label>
                <input
                  type="text"
                  value={razaoSocial}
                  disabled={contratoCriado}
                  onChange={(e) => setRazaoSocial(e.target.value)}
                  className="w-full text-xs bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500 disabled:opacity-60"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Modalidade Licitatória</label>
                <select
                  value={modalidade}
                  disabled={contratoCriado}
                  onChange={(e) => setModalidade(e.target.value as any)}
                  className="w-full text-xs bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500 disabled:opacity-60"
                >
                  <option value="DISPENSA_COMPRAS_SERVICOS">Dispensa (Compras até R$ 59.906,02)</option>
                  <option value="DISPENSA_OBRAS_ENGENHARIA">Dispensa (Obras até R$ 119.812,02)</option>
                  <option value="PREGAO_ELETRONICO">Pregão Eletrônico (Sem teto legal)</option>
                  <option value="CONCORRENCIA">Concorrência Pública</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Valor Total (R$)</label>
                <input
                  type="number"
                  value={valorTotal}
                  disabled={contratoCriado}
                  onChange={(e) => setValorTotal(parseFloat(e.target.value) || 0)}
                  className="w-full text-xs font-mono bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500 disabled:opacity-60"
                />
              </div>
            </div>

            {!contratoCriado ? (
              <button
                onClick={handleCriarContrato}
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/40"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Instanciar Aggregate 'ContratoPendente' (Validar Invariantes)</span>
              </button>
            ) : (
              <div className="text-xs text-emerald-400 font-mono flex items-center gap-2 bg-emerald-950/40 p-2 rounded border border-emerald-900">
                <Lock className="w-3.5 h-3.5" />
                <span>Entidade instanciada com identidade imutável.</span>
              </div>
            )}
          </div>

          {/* Ações de Transição de Estado */}
          {contratoCriado && (
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-emerald-400" />
                2. Transições da Máquina de Estados (Métodos Ricos)
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Auditor Responsável</label>
                  <input
                    type="text"
                    value={matriculaAuditor}
                    onChange={(e) => setMatriculaAuditor(e.target.value)}
                    className="w-full text-xs font-mono bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-200"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Justificativa / Parecer Técnico</label>
                  <input
                    type="text"
                    value={justificativa}
                    onChange={(e) => setJustificativa(e.target.value)}
                    className="w-full text-xs bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-200"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {status === 'AGUARDANDO_TRIAGEM' && (
                  <button
                    onClick={handleIniciarAuditoria}
                    className="flex-1 py-2 px-3 bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>iniciarAuditoria()</span>
                  </button>
                )}

                {status === 'EM_AUDITORIA' && (
                  <>
                    <button
                      onClick={handleAprovar}
                      className="flex-1 py-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>aprovarComParecerFavoravel()</span>
                    </button>

                    <button
                      onClick={() => handleRejeitar(false)}
                      className="flex-1 py-2 px-3 bg-amber-600 hover:bg-amber-500 text-white font-medium text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5"
                    >
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>rejeitarPorInconsistencia()</span>
                    </button>

                    <button
                      onClick={() => handleRejeitar(true)}
                      className="flex-1 py-2 px-3 bg-rose-600 hover:bg-rose-500 text-white font-medium text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5"
                    >
                      <ShieldAlert className="w-3.5 h-3.5" />
                      <span>bloquearSobrepreco()</span>
                    </button>
                  </>
                )}

                {(status === 'APROVADO_CONFORME' || status === 'REJEITADO_IRREGULAR' || status === 'BLOQUEADO_SOBREPRECO') && (
                  <div className="w-full p-2.5 bg-slate-900 rounded-lg border border-slate-700 text-center text-xs text-slate-300">
                    Processo finalizado no estado terminal: <strong className="text-emerald-400">{status}</strong>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Lado Direito: Visualizador de Estado do Aggregate e Eventos */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-3 font-mono">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-sans font-bold text-slate-300">Estado Atual do Aggregate</span>
              <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold uppercase ${
                status === 'APROVADO_CONFORME' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                status === 'BLOQUEADO_SOBREPRECO' || status === 'REJEITADO_IRREGULAR' ? 'bg-rose-950 text-rose-400 border border-rose-800' :
                status === 'EM_AUDITORIA' ? 'bg-blue-950 text-blue-400 border border-blue-800' :
                'bg-slate-800 text-slate-300 border border-slate-700'
              }`}>
                {status}
              </span>
            </div>

            <div className="text-xs space-y-1.5 text-slate-300">
              <div><span className="text-slate-500">processo:</span> {numeroProcesso}</div>
              <div><span className="text-slate-500">cnpj:</span> {cnpjContratada}</div>
              <div><span className="text-slate-500">valorTotal:</span> R$ {valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
              <div><span className="text-slate-500">modalidade:</span> {modalidade}</div>
              <div><span className="text-slate-500">itensRegistrados:</span> {itens.length} item(s)</div>
            </div>
          </div>

          {/* Eventos de Domínio Disparados */}
          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <History className="w-3.5 h-3.5 text-amber-400" />
              Eventos de Domínio Gerados ({eventos.length})
            </h4>

            {eventos.length === 0 ? (
              <p className="text-xs text-slate-500 italic py-2">
                Nenhum evento emitido ainda. Clique em criar o contrato para disparar o ContratoSubmetidoEvent.
              </p>
            ) : (
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {eventos.map((ev, idx) => (
                  <div key={idx} className="bg-slate-900 border border-slate-800 rounded p-2 text-xs font-mono">
                    <div className="flex items-center justify-between text-amber-400 font-semibold mb-0.5">
                      <span>{ev.name}</span>
                      <span className="text-[10px] text-slate-500">{ev.timestamp}</span>
                    </div>
                    <div className="text-slate-400 text-[11px] truncate">{ev.payload}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
