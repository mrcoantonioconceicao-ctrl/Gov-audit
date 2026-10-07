# GovAudit — Sistema Corporativo de Auditoria de Contratos e Governança Pública

> **Plataforma de Engenharia de Missão Crítica para Fiscalização Concomitante, Análise de Conformidade Legal e Preditividade sob a Nova Lei de Licitações (Lei Federal nº 14.133/2021).**

---

## 🌐 1. Linguagens de Programação e Tecnologias Utilizadas

O sistema **GovAudit** adota uma arquitetura corporativa moderna, poliglota e orientada a microsserviços. Cada linguagem e ferramenta foi selecionada para atender a critérios rigorosos de conformidade, segurança pública e performance:

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                             ECOSSISTEMA DE LINGUAGENS                            │
│                                                                                  │
│   [ JAVA 17 LTS / 21 ]  ──> Backend, DDD Core, Regras Fiscais, IA & Estatística │
│   [ SQL (PostgreSQL) ]  ──> Persistência ACID, Auditoria Imutável, Migrações     │
│   [ TYPESCRIPT / TSX ]  ──> Hub Web Operacional, Simuladores em Tempo Real       │
│   [ DOCKERFILE / YAML]  ──> Containerização Multi-Stage, Orquestração e Redes    │
│   [ XML (Maven) ]       ──> Gestão de Build, Plugins e Testcontainers            │
│   [ JSON / JSONL ]      ──> Model Context Protocol (MCP) e Datasets Fine-Tuning  │
└──────────────────────────────────────────────────────────────────────────────────┘
```

### Especificação Detalhada por Linguagem:

| Linguagem / Formato | Versão | Camada | Papel e Justificativa Técnica |
|---|---|---|---|
| **Java** | **17 LTS / 21** | **Backend Core & Domain** | Linguagem principal do microsserviço corporativo. Utilizada com **Spring Boot 3.3.4**, **Spring Data JPA** e **Spring State Machine**. Fornece tipagem estática rigorosa, Records imutáveis, Pattern Matching e alta performance com Garbage Collectors modernos (G1 / ZGC) para processamento transacional de missão crítica. |
| **SQL** | **PostgreSQL 16 Dialect** | **Banco de Dados Relacional** | Garantia de propriedades ACID, integridade referencial rigorosa para fundos públicos e versionamento estrutural via **Flyway Migrations**. |
| **TypeScript / TSX** | **5.x / React 19** | **Frontend & Hub Interativo** | Desenvolvimento da interface operacional, painéis de auditoria, simulador da máquina de estados BPMN e visualizador da curva de desembolso temporal com **Tailwind CSS v4**. |
| **Dockerfile Syntax** | **v1.7+** | **DevOps & Empacotamento** | Script declarativo para *Multi-Stage Build* com Eclipse Temurin JRE 17 Alpine, separação em camadas com Spring Boot Layertools e conformidade CIS com usuário não-root (`appuser`). |
| **YAML** | **v3.8 (Compose)** | **Orquestração de Infraestrutura** | Arquivo `docker-compose.yml` para subida coordenada do banco PostgreSQL 16 (com *healthchecks* ativos), volumes seguros e redes internas isoladas. |
| **XML** | **POM 4.0.0** | **Gerenciamento de Build** | Arquivo `pom.xml` para gerenciamento determinístico de dependências Maven, compiladores de anotações (MapStruct/Lombok) e testes de governança com **ArchUnit**. |
| **JSON Lines (JSONL)** | **RFC 7464** | **Engenharia de Dados & IA** | Formato de intercâmbio de dados de treino supervisionado (*SFT / Fine-Tuning*) estruturado em pares de instrução e resposta jurídica baseados em acórdãos do TCU. |
| **JSON** | **ECMA-404** | **Protocolo de Agentes (MCP)** | Serialização de mensagens e payloads de contexto do **Model Context Protocol (MCP)** para comunicação padronizada com LLMs e agentes autônomos. |

---

## 🏛️ 2. Arquitetura de Software: Domain-Driven Design (DDD)

O sistema segue a separação estrita em 4 camadas proposta pelo **Domain-Driven Design (DDD)** e pela **Clean Architecture**:

```text
gov-audit/
├── src/main/java/gov/audit/
│   │
│   ├── domain/                         <-- CAMADA 1: NÚCLEO PURO (Zero Frameworks)
│   │   ├── model/contrato/             (ContratoPendente, StatusContrato, ItemContrato)
│   │   ├── model/vo/                   (Cnpj com DV oficial, ValorMonetario, NumeroProcesso)
│   │   ├── service/                    (CicloVidaContratoDomainService)
│   │   ├── repository/                 (ContratoPendenteRepository - Inversão de Dependência)
│   │   ├── event/                      (ContratoSubmetidoEvent, ContratoAuditadoEvent)
│   │   └── exception/                  (InvarianteVioladaException, BusinessRuleException)
│   │
│   ├── application/                    <-- CAMADA 2: CASOS DE USO & INTELIGÊNCIA ARTIFICIAL
│   │   ├── usecase/                    (SubmeterContratoAuditoriaUseCase, CicloVidaContratoUseCase)
│   │   ├── ai/                         (AuditoriaInteligenteService, McpClientPort)
│   │   ├── ai/ast/                     (MinutaContratualAstParser - Árvore Sintática Abstrata)
│   │   ├── ai/graphrag/                (GraphRagKnowledgeService - Travessia CEIS/CNEP/TCU)
│   │   ├── ai/finetuning/              (FineTuningDatasetPipelineService - Exportador JSONL)
│   │   ├── statistics/                 (PrevisaoContratoTimeSeriesService - Regressão e Z-Score)
│   │   └── dto/                        (SubmeterContratoInputDTO, IndicadoresEstatisticosGovDTO)
│   │
│   ├── infrastructure/                 <-- CAMADA 3: ADAPTADORES DE INFRAESTRUTURA
│   │   ├── persistence/                (ContratoJpaEntity, SpringDataJpaRepository, Mappers)
│   │   ├── bpm/                        (ContratoStateMachineConfig - Spring State Machine)
│   │   └── messaging/                  (DomainEventPublisher)
│   │
│   └── presentation/                   <-- CAMADA 4: PONTOS DE ENTRADA HTTP / REST
│       ├── api/                        (ContratoController, AuditoriaIaController, EstatisticaGovController)
│       ├── handler/                    (GlobalExceptionHandler - RFC 7807 ProblemDetail)
│       └── doc/                        (OpenApiSwaggerConfig - Documentação OpenAPI 3.0)
│
├── docker-compose.yml                  (PostgreSQL 16 + Healthcheck + Rede Corporativa)
├── Dockerfile                          (Multi-stage build otimizado com JRE 17 Alpine)
├── pom.xml                             (Spring Boot 3.3.4, Java 17, Testcontainers, ArchUnit)
└── README.md
```

### Regra de Ouro Arquitetural (Verificada via ArchUnit)
A camada **Domain** não possui anotações de persistência (`@Entity`, `@Table`) nem anotações de injeção de dependência do Spring (`@Autowired`, `@Service`). A persistência física é um detalhe de implementação delegado exclusivamente aos adaptadores da camada **Infrastructure**.

---

## 📦 3. Detalhamento dos Módulos Funcionais

### 3.1. Núcleo de Domínio & Lei 14.133/2021
- **Aggregate Root Rico (`ContratoPendente.java`)**:
  - Imutabilidade do identificador e controle estrito de transições de estado via métodos com semântica de negócio (`iniciarAuditoria()`, `aprovarComParecerFavoravel()`, `rejeitarPorInconsistencia()`).
  - Validação dos tetos regulatórios para **Dispensa de Licitação** (Art. 75, I e II da Lei nº 14.133/2021):
    - Dispensa de Compras e Serviços: teto legal de R$ 59.906,02.
    - Dispensa de Obras e Serviços de Engenharia: teto legal de R$ 119.812,02.
- **Value Objects Imutáveis (`vo/`)**:
  - `Cnpj.java`: Implementa o algoritmo oficial da Receita Federal com cálculo ponderado dos dígitos verificadores (módulo 11).
  - `ValorMonetario.java`: Manipulação contábil exata com `BigDecimal` e arredondamento financeiro `HALF_EVEN`.
  - `NumeroProcesso.java`: Validação de padrões oficiais do Sistema Eletrônico de Informações (**SEI/e-Gov**).

### 3.2. Motor de Processos BPMN & Ciclo de Vida do Contrato
Orquestrado pelo `CicloVidaContratoDomainService` e configurado via `ContratoStateMachineConfig` (Spring State Machine) em 5 fases sequenciais:
1. `EM_ELABORACAO`: Fase interna preparatória, termo de referência e planilha orçamentária (Art. 18).
2. `ANALISE_JURIDICA`: Exame obrigatório de legalidade pela Advocacia Pública / AGU (Art. 53).
3. `EMPENHADO`: Bloqueio e vinculação prévia de dotação orçamentária no **SIAFI** (Art. 60 da Lei nº 4.320/1964).
4. `APROVADO_TRIBUNAL`: Remessa e controle prévio de conformidade pelo Tribunal de Contas (**TCU/TCE**).
5. `VIGENTE`: Publicação oficial no **Portal Nacional de Contratações Públicas (PNCP)** e início de eficácia plena (Art. 94).

### 3.3. Inteligência Artificial: AST, GraphRAG, MCP e Fine-Tuning
- **Parser de Árvore Sintática Abstrata (`MinutaContratualAstParser.java`)**:
  - Decompõe minutas contratuais em nós sintáticos (`Documento` ➔ `Cláusula` ➔ `Parágrafo/Inciso`).
  - Executa análise estática identificando vícios formais do Art. 92 (ausência de cláusula de objeto, ausência de índice de reajustamento) e vedações materiais do Art. 145 (pagamento antecipado sem exigência de caução idônea).
- **Recuperação Aumentada por Grafo (`GraphRagKnowledgeService.java`)**:
  - Executa travessias em grafos de conhecimento ligando:
    `(Contrato) ➔ (Empresa Contratada) ➔ (Quadro Societário) ➔ (Sanções CEIS/CNEP) ➔ (Acórdãos TCU)`.
- **Model Context Protocol (`McpContextPayload.java`)**:
  - Envelope padronizado contendo ferramentas (*tools*), recursos regulatórios e achados da AST enviados ao agente de IA.
- **Pipeline de Dados de Fine-Tuning (`FineTuningDatasetPipelineService.java`)**:
  - Exportação automatizada de datasets curados no formato **JSONL** (*Chat/Instruction format*) para especialização contínua de modelos de linguagem em jurisprudência do TCU e contratações públicas.

### 3.4. Séries Temporais & Previsão Estatística
- **Regressão Linear Simples ($Y = aX + b$)**:
  - Projeta a curva acumulada de desembolsos financeiros com base nas liquidações passadas.
- **Detecção de Anomalias por Z-Score ($|Z| \ge 2.0$)**:
  - Sinaliza medições atípicas que distorcem o cronograma físico-financeiro (alerta de antecipação irregular).
- **Previsão de Estouro do Teto de Aditivos (Art. 125)**:
  - Alerta antecipadamente o gestor público se a tendência de desembolso ultrapassará o limite legal de **25%** para aditivos contratuais, prevenindo paralisações de obras e investigações por órgãos de controle.
- **Clusterização de Fornecedores (K-Means)**:
  - Segmentação em 3 perfis: *Baixo Risco (Padrão)*, *Risco Moderado (Aditivos Recorrentes)* e *Risco Crítico (Anomalia de Preço / Alerta TCU)*.

---

## 📡 4. Especificação dos Endpoints REST

| Método | Endpoint | Descrição |
|---|---|---|
| `POST` | `/api/v1/contratos` | Submeter contrato administrativo para validação e auditoria prévia. |
| `GET` | `/api/v1/contratos/{id}` | Buscar detalhes do contrato e trilha histórica de auditoria. |
| `GET` | `/api/v1/contratos` | Listar contratos com paginação (`Pageable`) e filtros por órgão/status. |
| `PATCH`| `/api/v1/contratos/{id}/ciclo-vida/transicao` | Executar transição de estado BPMN (`EMPENHADO`, `VIGENTE`, etc.). |
| `POST` | `/api/v1/auditoria-ia/contratos/{id}/analisar` | Executar auditoria automatizada com AST, GraphRAG e MCP. |
| `GET` | `/api/v1/auditoria-ia/datasets/fine-tuning/exportar` | Download do dataset supervisionado em formato `.jsonl`. |
| `GET` | `/api/v1/estatisticas/contratos/{id}/projecao-desembolso` | Obter projeção de série temporal e risco de estouro do teto de 25%. |
| `GET` | `/api/v1/estatisticas/fornecedores/clusters` | Consultar agrupamentos estatísticos de risco de fornecedores (K-Means). |
| `GET` | `/api/v1/estatisticas/governanca/sla-processos` | Obter métricas de tempo médio de tramitação (SLA) por etapa. |

---

## 💻 5. Instruções de Instalação e Execução

### Pré-requisitos
- **Java 17+ (JDK)** ou superior instalado.
- **Docker 24+** e **Docker Compose v2**.
- **Apache Maven 3.9+** (ou utilizar o wrapper `./mvnw`).

### Executando com Docker Compose (Ambiente Integrado)
```bash
# Compilação e inicialização do PostgreSQL 16 e da aplicação GovAudit
docker compose up -d --build

# Verificando os logs da aplicação
docker compose logs -f govaudit-api
```

### Acessos Locais:
- **API Base**: `http://localhost:8080`
- **Swagger UI / Documentação OpenAPI**: `http://localhost:8080/swagger-ui.html`
- **Actuator Healthcheck**: `http://localhost:8080/actuator/health`

### Executando Testes e Governança de Arquitetura:
```bash
# Executa testes unitários, testes com Testcontainers e validação de regras com ArchUnit
mvn clean verify
```
