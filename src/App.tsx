import React, { useState } from 'react';
import { 
  Building2, 
  FolderTree, 
  FileCode, 
  Terminal, 
  ShieldCheck, 
  Server, 
  Layers, 
  Play, 
  Copy, 
  Check, 
  Download,
  BookOpen,
  Cpu,
  Database,
  GitCommit,
  Sparkles,
  TrendingUp,
  Radio
} from 'lucide-react';
import { CODE_FILES, DIRECTORY_TREE_ASCII } from './data/govAuditCode';
import { CodeViewer } from './components/CodeViewer';
import { ArchitectureDiagram } from './components/ArchitectureDiagram';
import { ContractSimulator } from './components/ContractSimulator';
import { BpmnWorkflowViewer } from './components/BpmnWorkflowViewer';
import { AiAuditLab } from './components/AiAuditLab';
import { StatisticalTimeSeriesLab } from './components/StatisticalTimeSeriesLab';
import { ObservabilityLab } from './components/ObservabilityLab';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('observability');
  const [selectedFileId, setSelectedFileId] = useState<string>('contrato-pendente');
  const [copiedTree, setCopiedTree] = useState(false);

  const currentFile = CODE_FILES.find(f => f.id === selectedFileId) || CODE_FILES[0];

  const handleCopyTree = async () => {
    try {
      await navigator.clipboard.writeText(DIRECTORY_TREE_ASCII);
      setCopiedTree(true);
      setTimeout(() => setCopiedTree(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Top Banner / Gov Header */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-950/60 ring-1 ring-emerald-400/30">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-slate-100 tracking-tight">GovAudit</h1>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                  DDD Enterprise Core
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800 hidden sm:inline-block">
                  Spring Boot 3.3.x • Java 17+
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Sistema Corporativo de Auditoria de Contratos &amp; Governança Pública (Lei 14.133/2021)
              </p>
            </div>
          </div>

          {/* Quick Badges */}
          <div className="flex items-center gap-2 text-xs">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700/80 text-slate-300">
              <Database className="w-3.5 h-3.5 text-blue-400" />
              <span>PostgreSQL 16</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700/80 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Clean Code &amp; SOLID</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-1 overflow-x-auto text-xs font-medium border-t border-slate-800/60 pt-1 pb-1 scrollbar-none">
          <button
            onClick={() => setActiveTab('observability')}
            className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'observability'
                ? 'bg-emerald-950 text-emerald-300 font-semibold border border-emerald-800'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Radio className="w-4 h-4 text-emerald-400" />
            <span>Observabilidade &amp; OTel</span>
          </button>

          <button
            onClick={() => setActiveTab('stats')}
            className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'stats'
                ? 'bg-blue-950 text-blue-300 font-semibold border border-blue-800'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-blue-400" />
            <span>Séries Temporais &amp; Estatística</span>
          </button>

          <button
            onClick={() => setActiveTab('ai')}
            className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'ai'
                ? 'bg-purple-950 text-purple-300 font-semibold border border-purple-800'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>Módulo de IA &amp; GraphRAG</span>
          </button>

          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-slate-800 text-emerald-400 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Visão Arquitetural DDD</span>
          </button>

          <button
            onClick={() => setActiveTab('bpmn')}
            className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'bpmn'
                ? 'bg-slate-800 text-emerald-400 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <GitCommit className="w-4 h-4 text-emerald-400" />
            <span>Motor BPMN / Ciclo de Vida</span>
          </button>

          <button
            onClick={() => setActiveTab('tree')}
            className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'tree'
                ? 'bg-slate-800 text-emerald-400 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <FolderTree className="w-4 h-4" />
            <span>Árvore de Diretórios</span>
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'code'
                ? 'bg-slate-800 text-emerald-400 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <FileCode className="w-4 h-4" />
            <span>Arquivos &amp; Código-Fonte ({CODE_FILES.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'simulator'
                ? 'bg-slate-800 text-emerald-400 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Play className="w-4 h-4 text-emerald-400" />
            <span>Simulador de Regras &amp; Invariantes</span>
          </button>

          <button
            onClick={() => setActiveTab('solid')}
            className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'solid'
                ? 'bg-slate-800 text-emerald-400 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Princípios SOLID &amp; Clean Code</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">

        {/* TAB 1: VISÃO ARQUITETURAL */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <ArchitectureDiagram />

            {/* Quick Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div 
                onClick={() => { setActiveTab('code'); setSelectedFileId('pom'); }}
                className="cursor-pointer bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-xl p-4 transition-all group hover:shadow-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-emerald-400">pom.xml</span>
                  <span className="text-xs text-slate-500 group-hover:text-emerald-400 transition-colors">Ver Código ➜</span>
                </div>
                <h4 className="font-semibold text-slate-200 text-sm">Stack Tecnológica &amp; Dependências</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Spring Boot 3.3.4, Java 17+, PostgreSQL, Flyway, Testcontainers, ArchUnit e MapStruct.
                </p>
              </div>

              <div 
                onClick={() => { setActiveTab('code'); setSelectedFileId('contrato-pendente'); }}
                className="cursor-pointer bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-xl p-4 transition-all group hover:shadow-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-emerald-400">ContratoPendente.java</span>
                  <span className="text-xs text-slate-500 group-hover:text-emerald-400 transition-colors">Ver Código ➜</span>
                </div>
                <h4 className="font-semibold text-slate-200 text-sm">Aggregate Root Rico (DDD)</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Encapsulamento total, regras da Nova Lei de Licitações (Lei 14.133), Value Objects e eventos.
                </p>
              </div>

              <div 
                onClick={() => { setActiveTab('code'); setSelectedFileId('docker-compose'); }}
                className="cursor-pointer bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-xl p-4 transition-all group hover:shadow-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-emerald-400">docker-compose.yml</span>
                  <span className="text-xs text-slate-500 group-hover:text-emerald-400 transition-colors">Ver Código ➜</span>
                </div>
                <h4 className="font-semibold text-slate-200 text-sm">Infraestrutura Contêinerizada</h4>
                <p className="text-xs text-slate-400 mt-1">
                  PostgreSQL 16 com healthcheck ativo, JVM otimizada para contêineres e segurança non-root.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB OBSERVABILITY: TELEMETRIA, MICROMETER & OPENTELEMETRY */}
        {activeTab === 'observability' && (
          <ObservabilityLab />
        )}

        {/* TAB STATS: SÉRIES TEMPORAIS & ESTATÍSTICA */}
        {activeTab === 'stats' && (
          <StatisticalTimeSeriesLab />
        )}

        {/* TAB AI: MÓDULO DE IA & GRAPHRAG */}
        {activeTab === 'ai' && (
          <AiAuditLab />
        )}

        {/* TAB BPMN: MOTOR DE PROCESSOS */}
        {activeTab === 'bpmn' && (
          <BpmnWorkflowViewer />
        )}

        {/* TAB 2: ÁRVORE DE DIRETÓRIOS */}
        {activeTab === 'tree' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  <FolderTree className="w-5 h-5 text-emerald-400" />
                  Estrutura de Diretórios Canônica DDD (Clean Architecture)
                </h3>
                <p className="text-sm text-slate-400">
                  Estrutura padronizada para sistemas governamentais de alta escalabilidade e isolamento estrito.
                </p>
              </div>

              <button
                onClick={handleCopyTree}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors w-fit"
              >
                {copiedTree ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-semibold">Árvore Copiada!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar Árvore ASCII</span>
                  </>
                )}
              </button>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto max-h-[600px] leading-relaxed">
              <pre>{DIRECTORY_TREE_ASCII}</pre>
            </div>
          </div>
        )}

        {/* TAB 3: VISUALIZADOR DE CÓDIGO */}
        {activeTab === 'code' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Seletor de Arquivos lateral */}
            <div className="lg:col-span-4 space-y-3">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2 px-1">
                  Arquivos do Sistema
                </span>
                <div className="space-y-1">
                  {CODE_FILES.map(file => (
                    <button
                      key={file.id}
                      onClick={() => setSelectedFileId(file.id)}
                      className={`w-full text-left p-2.5 rounded-lg text-xs font-mono transition-all flex items-center justify-between ${
                        selectedFileId === file.id
                          ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-700 font-semibold shadow-sm'
                          : 'text-slate-300 hover:bg-slate-800 hover:text-slate-100 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <FileCode className={`w-3.5 h-3.5 shrink-0 ${
                          selectedFileId === file.id ? 'text-emerald-400' : 'text-slate-500'
                        }`} />
                        <span className="truncate">{file.name}</span>
                      </div>
                      <span className="text-[10px] uppercase px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 shrink-0">
                        {file.category}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dica de Arquitetura */}
              <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3.5 text-xs text-slate-400 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                  <Cpu className="w-4 h-4" />
                  <span>Isolamento Tecnológico</span>
                </div>
                <p>
                  Observe que <strong className="text-slate-200">ContratoPendente.java</strong> não possui import de Spring ou Jakarta Persistence. A persistência é delegada inteiramente à camada de Infrastructure.
                </p>
              </div>
            </div>

            {/* Visualizador de Código com syntax & download */}
            <div className="lg:col-span-8">
              <CodeViewer
                filename={currentFile.name}
                language={currentFile.language}
                code={currentFile.content}
                path={currentFile.path}
                description={currentFile.description}
              />
            </div>
          </div>
        )}

        {/* TAB 4: SIMULADOR DE INVARIANTES */}
        {activeTab === 'simulator' && (
          <ContractSimulator />
        )}

        {/* TAB 5: SOLID & CLEAN CODE */}
        {activeTab === 'solid' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-emerald-400" />
                Princípios SOLID &amp; Clean Code Aplicados ao GovAudit
              </h3>
              <p className="text-sm text-slate-400">
                Padrões arquiteturais exigidos em sistemas governamentais de missão crítica.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
                <h4 className="font-bold text-emerald-400 text-sm mb-1">S - Single Responsibility Principle (SRP)</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  A entidade <code className="text-slate-200">ContratoPendente</code> cuida exclusivamente de regras de negócio e invariantes legais. O caso de uso <code className="text-slate-200">SubmeterContratoAuditoriaUseCase</code> apenas orquestra o fluxo transacional. A persistência física reside nos adaptadores de Infrastructure.
                </p>
              </div>

              <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
                <h4 className="font-bold text-emerald-400 text-sm mb-1">O - Open/Closed Principle (OCP)</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Novos mecanismos de notificação (Kafka, RabbitMQ, e-mail do Tribunal de Contas) são adicionados implementando novos ouvintes de <code className="text-slate-200">DomainEventPublisher</code>, sem modificar o domínio do contrato.
                </p>
              </div>

              <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
                <h4 className="font-bold text-emerald-400 text-sm mb-1">L - Liskov Substitution Principle (LSP)</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Todas as implementações de <code className="text-slate-200">ContratoPendenteRepository</code> cumprem o contrato da interface sem alterar o comportamento esperado pelo caso de uso, seja em banco relacional ou memória.
                </p>
              </div>

              <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
                <h4 className="font-bold text-emerald-400 text-sm mb-1">I - Interface Segregation Principle (ISP)</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Interfaces específicas e coesas. Repositórios de consulta e comando podem ser segregados (CQRS-ready) evitando que consumidores dependam de métodos que não utilizam.
                </p>
              </div>

              <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 md:col-span-2">
                <h4 className="font-bold text-emerald-400 text-sm mb-1">D - Dependency Inversion Principle (DIP)</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  O Domínio de alto nível define a interface <code className="text-slate-200">ContratoPendenteRepository</code>. A camada de baixo nível <code className="text-slate-200">infrastructure.persistence.repository.ContratoRepositoryImpl</code> depende da interface do domínio para implementá-la via Spring Data JPA. O Domínio desconhece o banco de dados.
                </p>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-4 px-6 text-center text-xs text-slate-500">
        GovAudit • Arquitetura de Missão Crítica para Governança e Auditoria Governamental • Java 17+ &amp; Spring Boot 3.x
      </footer>
    </div>
  );
}
