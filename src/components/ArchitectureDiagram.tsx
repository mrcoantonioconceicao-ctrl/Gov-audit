import React from 'react';
import { Layers, ShieldCheck, Database, Server, Terminal, ArrowRight, CheckCircle2 } from 'lucide-react';

export const ArchitectureDiagram: React.FC = () => {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-400" />
            Topologia de Camadas DDD (Domain-Driven Design)
          </h3>
          <p className="text-sm text-slate-400">
            Regra Fundamental: <strong className="text-emerald-400">Dependências apontam sempre para dentro</strong>. O Domínio é o núcleo inviolável.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs bg-emerald-950/60 text-emerald-300 border border-emerald-800 px-3 py-1.5 rounded-lg w-fit">
          <ShieldCheck className="w-4 h-4" />
          <span>Isolamento verificado via ArchUnit</span>
        </div>
      </div>

      {/* Visual Layer Flow */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Camada 1: Presentation */}
        <div className="bg-gradient-to-b from-blue-950/40 to-slate-900 border border-blue-800/60 rounded-xl p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-900/50 px-2 py-0.5 rounded">
                1. Presentation
              </span>
              <Terminal className="w-4 h-4 text-blue-400" />
            </div>
            <h4 className="font-semibold text-slate-200 text-sm">Controladores &amp; API</h4>
            <p className="text-xs text-slate-400 mt-1">
              Pontos de entrada HTTP/REST, OpenAPI Swagger e validação de schema de entrada.
            </p>
            <ul className="mt-3 space-y-1.5 text-xs text-slate-300">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                <span>ContratoAuditoriaController</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                <span>GlobalExceptionHandler</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                <span>OpenAPI / Swagger 3.0</span>
              </li>
            </ul>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-blue-300/80">
            Invoca Application Use Cases ➜
          </div>
        </div>

        {/* Camada 2: Application */}
        <div className="bg-gradient-to-b from-purple-950/40 to-slate-900 border border-purple-800/60 rounded-xl p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400 bg-purple-900/50 px-2 py-0.5 rounded">
                2. Application
              </span>
              <Server className="w-4 h-4 text-purple-400" />
            </div>
            <h4 className="font-semibold text-slate-200 text-sm">Orquestração &amp; Casos de Uso</h4>
            <p className="text-xs text-slate-400 mt-1">
              Coordena fluxo transacional, converte DTOs e despacha eventos sem acoplamento a banco.
            </p>
            <ul className="mt-3 space-y-1.5 text-xs text-slate-300">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                <span>SubmeterContratoUseCase</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                <span>EmitirParecerAuditoriaUseCase</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                <span>DTOs &amp; MapStruct Mappers</span>
              </li>
            </ul>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-purple-300/80">
            Comanda o Domínio Puro ➜
          </div>
        </div>

        {/* Camada 3: Domain (Core) */}
        <div className="bg-gradient-to-b from-emerald-950/50 to-slate-900 border-2 border-emerald-500/80 rounded-xl p-4 shadow-lg shadow-emerald-950/50 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 bg-emerald-900/70 px-2 py-0.5 rounded">
                ★ 3. Domain (Core)
              </span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <h4 className="font-semibold text-emerald-200 text-sm">Entidades Ricas &amp; Invariantes</h4>
            <p className="text-xs text-slate-300 mt-1">
              Zero dependência externa. Regras da Lei 14.133/2021, Value Objects imutáveis e Aggregates.
            </p>
            <ul className="mt-3 space-y-1.5 text-xs text-emerald-100 font-mono">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>ContratoPendente (Root)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Cnpj, ValorMonetario (VO)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>ContratoRepository (Interface)</span>
              </li>
            </ul>
          </div>
          <div className="mt-4 pt-3 border-t border-emerald-900/80 text-[11px] text-emerald-300 font-medium">
            100% Puro (Sem Spring / Sem JPA)
          </div>
        </div>

        {/* Camada 4: Infrastructure */}
        <div className="bg-gradient-to-b from-amber-950/40 to-slate-900 border border-amber-800/60 rounded-xl p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-900/50 px-2 py-0.5 rounded">
                4. Infrastructure
              </span>
              <Database className="w-4 h-4 text-amber-400" />
            </div>
            <h4 className="font-semibold text-slate-200 text-sm">Adaptadores &amp; Persistência</h4>
            <p className="text-xs text-slate-400 mt-1">
              Implementa as interfaces do domínio via Spring Data JPA, PostgreSQL 16, Flyway e Messaging.
            </p>
            <ul className="mt-3 space-y-1.5 text-xs text-slate-300">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span>ContratoRepositoryImpl</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span>ContratoJpaEntity (@Table)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span>Flyway Migrations (V1, V2)</span>
              </li>
            </ul>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-amber-300/80">
            Inversão de Dependência (DIP)
          </div>
        </div>
      </div>

      {/* Princípios Técnicos Chave */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
        <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
          <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm mb-1">
            <CheckCircle2 className="w-4 h-4" />
            <span>Encapsulamento Rico</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Nada de anêmicos com getters/setters livres. Transições de status só ocorrem por métodos com significado de negócio (`iniciarAuditoria`, `aprovarComParecerFavoravel`).
          </p>
        </div>

        <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
          <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm mb-1">
            <CheckCircle2 className="w-4 h-4" />
            <span>Separação Domain vs JPA</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            A Entidade de Domínio não carrega anotações `@Entity` ou `@Column`. Um adaptador em `infrastructure/persistence` converte de/para JPA Entity.
          </p>
        </div>

        <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
          <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm mb-1">
            <CheckCircle2 className="w-4 h-4" />
            <span>Testabilidade Máxima</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            O domínio é testado com JUnit 5 em microssegundos sem subir contexto Spring. Integração de banco roda em contêineres reais via Testcontainers.
          </p>
        </div>
      </div>
    </div>
  );
};
