export interface CodeFile {
  id: string;
  name: string;
  path: string;
  category: 'config' | 'domain' | 'application' | 'infrastructure' | 'presentation' | 'test' | 'docker';
  language: 'xml' | 'yaml' | 'dockerfile' | 'java' | 'markdown' | 'properties';
  description: string;
  content: string;
}

export const DIRECTORY_TREE_ASCII = `gov-audit/
├── .mvn/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── gov/
│   │   │       └── audit/
│   │   │           ├── GovAuditApplication.java
│   │   │           │
│   │   │           ├── domain/                         <-- NÚCLEO DO DOMÍNIO (Regras Puras, sem acoplamento a frameworks)
│   │   │           │   ├── model/
│   │   │           │   │   ├── contrato/
│   │   │           │   │   │   ├── ContratoPendente.java       <-- Aggregate Root / Entidade Rica
│   │   │           │   │   │   ├── StatusContrato.java
│   │   │           │   │   │   ├── ModalidadeLicitacao.java
│   │   │           │   │   │   ├── ItemContrato.java
│   │   │           │   │   │   └── ParecerAuditoria.java
│   │   │           │   │   └── vo/                         <-- Value Objects Imutáveis
│   │   │           │   │       ├── NumeroProcesso.java
│   │   │           │   │       ├── Cnpj.java
│   │   │           │   │       ├── ValorMonetario.java
│   │   │           │   │       └── PeriodoVigencia.java
│   │   │           │   ├── repository/                     <-- Interfaces de Repositório (Inversão de Dependência)
│   │   │           │   │   └── ContratoPendenteRepository.java
│   │   │           │   ├── event/                          <-- Eventos de Domínio
│   │   │           │   │   ├── ContratoSubmetidoEvent.java
│   │   │           │   │   └── ContratoAuditadoEvent.java
│   │   │           │   └── exception/                      <-- Exceções de Domínio de Negócio
│   │   │           │       ├── BusinessRuleException.java
│   │   │           │       └── InvarianteVioladaException.java
│   │   │           │
│   │   │           ├── application/                    <-- CASOS DE USO E ORQUESTRAÇÃO
│   │   │           │   ├── usecase/
│   │   │           │   │   ├── SubmeterContratoAuditoriaUseCase.java
│   │   │           │   │   ├── EmitirParecerAuditoriaUseCase.java
│   │   │           │   │   └── ConsultarContratosPendentesUseCase.java
│   │   │           │   ├── dto/
│   │   │           │   │   ├── request/
│   │   │           │   │   │   ├── SubmeterContratoRequest.java
│   │   │           │   │   │   └── ParecerAuditoriaRequest.java
│   │   │           │   │   └── response/
│   │   │           │   │       ├── ContratoAuditadoResponse.java
│   │   │           │   │       └── RelatorioConformidadeDTO.java
│   │   │           │   └── mapper/
│   │   │           │       └── ContratoApplicationMapper.java
│   │   │           │
│   │   │           ├── infrastructure/                 <-- ADAPTADORES DE INFRAESTRUTURA
│   │   │           │   ├── persistence/
│   │   │           │   │   ├── entity/                     <-- Entidades de Banco (JPA Table Mappings)
│   │   │           │   │   │   └── ContratoJpaEntity.java
│   │   │           │   │   ├── repository/
│   │   │           │   │   │   ├── SpringDataContratoJpaRepository.java
│   │   │           │   │   │   └── ContratoRepositoryImpl.java   <-- Implementa domain.repository
│   │   │           │   │   └── mapper/
│   │   │           │   │       └── ContratoEntityMapper.java
│   │   │           │   ├── security/
│   │   │           │   │   ├── SecurityConfig.java
│   │   │           │   │   └── AuditorContextHolder.java
│   │   │           │   ├── auditing/
│   │   │           │   │   └── AuditTrailLogger.java
│   │   │           │   └── messaging/
│   │   │           │       └── KafkaDomainEventPublisher.java
│   │   │           │
│   │   │           └── presentation/                   <-- PONTOS DE ENTRADA / CONTROLADORES
│   │   │               ├── api/
│   │   │               │   ├── ContratoAuditoriaController.java
│   │   │               │   └── RelatorioGovernançaController.java
│   │   │               ├── handler/
│   │   │               │   └── GlobalExceptionHandler.java
│   │   │               └── doc/
│   │   │                   └── OpenApiSwaggerConfig.java
│   │   │
│   │   └── resources/
│   │       ├── application.yml
│   │       ├── application-prod.yml
│   │       └── db/migration/                           <-- Flyway Migrations Versionadas
│   │           ├── V1__init_schema_govaudit.sql
│   │           └── V2__create_contratos_auditoria.sql
│   │
│   └── test/
│       ├── java/
│       │   └── gov/audit/
│       │       ├── domain/model/ContratoPendenteTest.java          <-- Testes Unitários de Regras de Domínio Puras
│       │       ├── architecture/DddArchitectureTest.java          <-- Testes de Arquitetura com ArchUnit
│       │       └── infrastructure/ContratoJpaRepositoryIT.java    <-- Testes de Integração com Testcontainers + PostgreSQL
│       └── resources/
│           └── application-test.yml
│
├── .dockerignore
├── .gitignore
├── docker-compose.yml                                  <-- Orquestração do app + PostgreSQL 16 + pgAdmin
├── Dockerfile                                          <-- Multi-stage build otimizado com JDK 17 / JRE Alpine
├── pom.xml                                             <-- Dependências corporativas, Java 17+, Spring Boot 3.x
└── README.md`;

export const CODE_FILES: CodeFile[] = [
  {
    id: 'pom',
    name: 'pom.xml',
    path: 'pom.xml',
    category: 'config',
    language: 'xml',
    description: 'Configuração Maven com Spring Boot 3.3.x, Java 17, Spring Data JPA, PostgreSQL, Spring Validation, Testcontainers e ArchUnit.',
    content: `<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
         https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.3.4</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>

    <groupId>gov.audit</groupId>
    <artifactId>gov-audit-core</artifactId>
    <version>1.0.0-SNAPSHOT</version>
    <name>GovAudit :: Sistema de Auditoria de Contratos e Governança Pública</name>
    <description>Sistema corporativo de missão crítica para fiscalização, auditoria e conformidade de licitações públicas sob a Lei 14.133/2021.</description>

    <properties>
        <java.version>17</java.version>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
        <org.mapstruct.version>1.5.5.Final</org.mapstruct.version>
        <lombok-mapstruct-binding.version>0.2.0</lombok-mapstruct-binding.version>
        <springdoc-openapi.version>2.6.0</springdoc-openapi.version>
        <testcontainers.version>1.20.1</testcontainers.version>
        <archunit.version>1.3.0</archunit.version>
    </properties>

    <dependencies>
        <!-- =============================================================== -->
        <!-- CORE SPRING BOOT STARTERS                                       -->
        <!-- =============================================================== -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>

        <!-- =============================================================== -->
        <!-- PERSISTÊNCIA & BANCO DE DADOS (PostgreSQL + Flyway)             -->
        <!-- =============================================================== -->
        <dependency>
            <groupId>org.postgresql</groupId>
            <artifactId>postgresql</artifactId>
            <scope>runtime</scope>
        </dependency>

        <dependency>
            <groupId>org.flywaydb</groupId>
            <artifactId>flyway-core</artifactId>
        </dependency>

        <dependency>
            <groupId>org.flywaydb</groupId>
            <artifactId>flyway-database-postgresql</artifactId>
        </dependency>

        <!-- =============================================================== -->
        <!-- DOCUMENTAÇÃO OPENAPI 3 / SWAGGER PARA CONFORMIDADE GOVERNAMENTAL -->
        <!-- =============================================================== -->
        <dependency>
            <groupId>org.springdoc</groupId>
            <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
            <version>\${springdoc-openapi.version}</version>
        </dependency>

        <!-- =============================================================== -->
        <!-- PRODUTIVIDADE & MAPEAMENTO (Lombok & MapStruct)                  -->
        <!-- =============================================================== -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>

        <dependency>
            <groupId>org.mapstruct</groupId>
            <artifactId>mapstruct</artifactId>
            <version>\${org.mapstruct.version}</version>
        </dependency>

        <!-- =============================================================== -->
        <!-- TESTES, TESTCONTAINERS E GOVERNANÇA DE ARQUITETURA              -->
        <!-- =============================================================== -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>

        <dependency>
            <groupId>org.testcontainers</groupId>
            <artifactId>junit-jupiter</artifactId>
            <scope>test</scope>
        </dependency>

        <dependency>
            <groupId>org.testcontainers</groupId>
            <artifactId>postgresql</artifactId>
            <scope>test</scope>
        </dependency>

        <!-- ArchUnit: Garante que as camadas DDD respeitam a isolação estrita -->
        <dependency>
            <groupId>com.tngtech.archunit</groupId>
            <artifactId>archunit-junit5</artifactId>
            <version>\${archunit.version}</version>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.testcontainers</groupId>
                <artifactId>testcontainers-bom</artifactId>
                <version>\${testcontainers.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>

    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <configuration>
                    <source>\${java.version}</source>
                    <target>\${java.version}</target>
                    <annotationProcessorPaths>
                        <path>
                            <groupId>org.projectlombok</groupId>
                            <artifactId>lombok</artifactId>
                            <version>\${lombok.version}</version>
                        </path>
                        <path>
                            <groupId>org.projectlombok</groupId>
                            <artifactId>lombok-mapstruct-binding</artifactId>
                            <version>\${lombok-mapstruct-binding.version}</version>
                        </path>
                        <path>
                            <groupId>org.mapstruct</groupId>
                            <artifactId>mapstruct-processor</artifactId>
                            <version>\${org.mapstruct.version}</version>
                        </path>
                    </annotationProcessorPaths>
                </configuration>
            </plugin>

            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <excludes>
                        <exclude>
                            <groupId>org.projectlombok</groupId>
                            <artifactId>lombok</artifactId>
                        </exclude>
                    </excludes>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>`
  },
  {
    id: 'docker-compose',
    name: 'docker-compose.yml',
    path: 'docker-compose.yml',
    category: 'docker',
    language: 'yaml',
    description: 'Orquestração de contêineres para PostgreSQL 16 com healthcheck nativo, rede corporativa isolada e aplicação GovAudit integrada.',
    content: `version: '3.8'

services:
  # =========================================================================
  # BANCO DE DADOS POSTGRESQL 16 (Auditoria e Transações)
  # =========================================================================
  govaudit-postgres:
    image: postgres:16-alpine
    container_name: govaudit-postgres-db
    restart: unless-stopped
    environment:
      POSTGRES_DB: govaudit_db
      POSTGRES_USER: govaudit_adm
      POSTGRES_PASSWORD: GovAuditSec2026!Password
      PGDATA: /var/lib/postgresql/data/pgdata
    ports:
      - "5432:5432"
    volumes:
      - govaudit-pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U govaudit_adm -d govaudit_db"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 10s
    networks:
      - govaudit-internal-net

  # =========================================================================
  # APLICAÇÃO GOVAUDIT (Spring Boot 3.x - Microserviço de Auditoria)
  # =========================================================================
  govaudit-api:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: govaudit-api-service
    restart: unless-stopped
    depends_on:
      govaudit-postgres:
        condition: service_healthy
    ports:
      - "8080:8080"
    environment:
      SPRING_PROFILES_ACTIVE: prod
      SPRING_DATASOURCE_URL: jdbc:postgresql://govaudit-postgres:5432/govaudit_db
      SPRING_DATASOURCE_USERNAME: govaudit_adm
      SPRING_DATASOURCE_PASSWORD: GovAuditSec2026!Password
      SPRING_JPA_HIBERNATE_DDL_AUTO: validate
      SPRING_FLYWAY_ENABLED: "true"
      # Otimizações de JVM em contêineres governamentais
      JAVA_TOOL_OPTIONS: >-
        -XX:+UseContainerSupport
        -XX:MaxRAMPercentage=75.0
        -Djava.security.egd=file:/dev/./urandom
        -Duser.timezone=America/Sao_Paulo
    healthcheck:
      test: ["CMD", "wget", "--no-verbose", "--tries=1", "--spider", "http://localhost:8080/actuator/health"]
      interval: 15s
      timeout: 5s
      retries: 3
      start_period: 30s
    networks:
      - govaudit-internal-net

networks:
  govaudit-internal-net:
    driver: bridge
    name: govaudit-network

volumes:
  govaudit-pgdata:
    driver: local
    name: govaudit-postgres-volume`
  },
  {
    id: 'dockerfile',
    name: 'Dockerfile',
    path: 'Dockerfile',
    category: 'docker',
    language: 'dockerfile',
    description: 'Build em múltiplos estágios (Multi-stage build) com Eclipse Temurin 17, usuário não-root por segurança e camadas de dependência em cache.',
    content: `# =============================================================================
# ESTÁGIO 1: BUILD (Compilação e empacotamento Maven com cache de dependências)
# =============================================================================
FROM maven:3.9.8-eclipse-temurin-17-alpine AS builder

WORKDIR /workspace

# Otimização de camadas de cache: copia apenas arquivos de dependência primeiro
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copia código-fonte e compila artefato de produção
COPY src ./src
RUN mvn clean package -DskipTests -B

# Extrai camadas do Spring Boot JAR para boot otimizado
WORKDIR /workspace/target
RUN java -Djarmode=layertools -jar *.jar extract

# =============================================================================
# ESTÁGIO 2: RUNTIME OTIMIZADO (Imagem enxuta com JRE 17 e segurança non-root)
# =============================================================================
FROM eclipse-temurin:17-jre-alpine AS runtime

# Criação de grupo e usuário de serviço sem privilégios de root (Requisito CIS/Governo)
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Copia camadas extraídas pelo Spring Boot Layertools para inicialização ultrarrápida
COPY --from=builder --chown=appuser:appgroup /workspace/target/dependencies/ ./
COPY --from=builder --chown=appuser:appgroup /workspace/target/spring-boot-loader/ ./
COPY --from=builder --chown=appuser:appgroup /workspace/target/snapshot-dependencies/ ./
COPY --from=builder --chown=appuser:appgroup /workspace/target/application/ ./

USER appuser

EXPOSE 8080

# Parâmetros JVM de missão crítica voltados a contêineres Linux
ENV JAVA_OPTS="-XX:+UseContainerSupport -XX:MaxRAMPercentage=75.0 -XX:+ExitOnOutOfMemoryError"

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS org.springframework.boot.loader.launch.JarLauncher"]`
  },
  {
    id: 'contrato-pendente',
    name: 'ContratoPendente.java',
    path: 'src/main/java/gov/audit/domain/model/contrato/ContratoPendente.java',
    category: 'domain',
    language: 'java',
    description: 'Entidade Rica / Aggregate Root do Domínio com regras de negócio encapsuladas, invariantes da Lei 14.133/2021 e máquina de estados.',
    content: `package gov.audit.domain.model.contrato;

import gov.audit.domain.event.ContratoAuditadoEvent;
import gov.audit.domain.event.ContratoSubmetidoEvent;
import gov.audit.domain.exception.InvarianteVioladaException;
import gov.audit.domain.model.vo.Cnpj;
import gov.audit.domain.model.vo.NumeroProcesso;
import gov.audit.domain.model.vo.PeriodoVigencia;
import gov.audit.domain.model.vo.ValorMonetario;

import java.time.Instant;
import java.util.*;

/**
 * AGGREGATE ROOT: ContratoPendente
 * 
 * Representa um contrato público submetido à auditoria prévia ou concomitante.
 * Segue estritamente os princípios do Domain-Driven Design (DDD):
 * 1. Encapsulamento absoluto do estado (sem setters públicos anêmicos).
 * 2. Invariantes de negócio da Lei 14.133/2021 validadas na criação e em cada transição.
 * 3. Máquina de estados explícita com disparo de eventos de domínio.
 */
public class ContratoPendente {

    private final UUID id;
    private final NumeroProcesso numeroProcesso;
    private final String orgaoContratante;
    private final Cnpj cnpjContratada;
    private final String razaoSocialContratada;
    private final ModalidadeLicitacao modalidade;
    private ValorMonetario valorTotal;
    private PeriodoVigencia vigencia;
    private StatusContrato status;
    private final List<ItemContrato> itens = new ArrayList<>();
    private final List<ParecerAuditoria> historicoPareceres = new ArrayList<>();
    private final Instant dataCadastro;
    private Instant dataUltimaAtualizacao;

    // Coleção interna de eventos de domínio gerados pelo Aggregate
    private final List<Object> domainEvents = new ArrayList<>();

    // Limite regulatório para Dispensa de Licitação (Art. 75, I e II da Lei 14.133/2021)
    private static final ValorMonetario LIMITE_DISPENSA_OBRAS = ValorMonetario.de(119812.02);
    private static final ValorMonetario LIMITE_DISPENSA_COMPRAS = ValorMonetario.de(59906.02);

    /**
     * Construtor Privado: Criação via Factory Method para garantir que nenhuma
     * entidade seja instanciada em estado inconsistente ou inválido.
     */
    private ContratoPendente(
            UUID id,
            NumeroProcesso numeroProcesso,
            String orgaoContratante,
            Cnpj cnpjContratada,
            String razaoSocialContratada,
            ModalidadeLicitacao modalidade,
            ValorMonetario valorTotal,
            PeriodoVigencia vigencia
    ) {
        this.id = Objects.requireNonNull(id, "O ID do contrato não pode ser nulo");
        this.numeroProcesso = Objects.requireNonNull(numeroProcesso, "O número do processo administrativo é obrigatório");
        this.orgaoContratante = validarTextoObrigatorio(orgaoContratante, "Órgão contratante");
        this.cnpjContratada = Objects.requireNonNull(cnpjContratada, "CNPJ da contratada é obrigatório");
        this.razaoSocialContratada = validarTextoObrigatorio(razaoSocialContratada, "Razão social da contratada");
        this.modalidade = Objects.requireNonNull(modalidade, "Modalidade licitatória é obrigatória");
        this.valorTotal = Objects.requireNonNull(valorTotal, "Valor total do contrato é obrigatório");
        this.vigencia = Objects.requireNonNull(vigencia, "Período de vigência é obrigatório");
        
        this.status = StatusContrato.AGUARDANDO_TRIAGEM;
        this.dataCadastro = Instant.now();
        this.dataUltimaAtualizacao = this.dataCadastro;

        // Invariante de Domínio: Regras da Lei 14.133/2021
        validarLimitesModalidade();

        // Registra evento de domínio
        this.domainEvents.add(new ContratoSubmetidoEvent(this.id, this.numeroProcesso.getValor(), this.valorTotal.getValor()));
    }

    /**
     * FACTORY METHOD DE DOMÍNIO
     */
    public static ContratoPendente novoContrato(
            NumeroProcesso numeroProcesso,
            String orgaoContratante,
            Cnpj cnpjContratada,
            String razaoSocialContratada,
            ModalidadeLicitacao modalidade,
            ValorMonetario valorTotal,
            PeriodoVigencia vigencia
    ) {
        return new ContratoPendente(
                UUID.randomUUID(),
                numeroProcesso,
                orgaoContratante,
                cnpjContratada,
                razaoSocialContratada,
                modalidade,
                valorTotal,
                vigencia
        );
    }

    // =========================================================================
    // MÉTODOS DE NEGÓCIO E MÁQUINA DE ESTADOS (MÉTODOS RICOS)
    // =========================================================================

    /**
     * Adiciona item contratual e recalcula/valida coerência com o valor total registrado.
     */
    public void adicionarItem(int numeroItem, String descricao, int quantidade, ValorMonetario valorUnitario) {
        garantirContratoEditavel();

        ItemContrato novoItem = new ItemContrato(numeroItem, descricao, quantidade, valorUnitario);
        this.itens.add(novoItem);
        this.dataUltimaAtualizacao = Instant.now();
    }

    /**
     * Inicia a auditoria técnica pelo auditor responsável.
     */
    public void iniciarAuditoria(String auditorResponsavelMatricula) {
        if (this.status != StatusContrato.AGUARDANDO_TRIAGEM) {
            throw new InvarianteVioladaException(
                String.format("Contrato no estado '%s' não pode entrar em auditoria.", this.status)
            );
        }

        if (this.itens.isEmpty()) {
            throw new InvarianteVioladaException("Contrato não pode ser auditado sem itens descritos na planilha orçamentária.");
        }

        this.status = StatusContrato.EM_AUDITORIA;
        this.dataUltimaAtualizacao = Instant.now();
    }

    /**
     * Aprova o contrato após auditoria prévia de conformidade.
     */
    public void aprovarComParecerFavoravel(String matriculaAuditor, String justificativaTecnica) {
        garantirEmAuditoria();

        ParecerAuditoria parecer = ParecerAuditoria.favoravel(matriculaAuditor, justificativaTecnica);
        this.historicoPareceres.add(parecer);
        this.status = StatusContrato.APROVADO_CONFORME;
        this.dataUltimaAtualizacao = Instant.now();

        this.domainEvents.add(new ContratoAuditadoEvent(this.id, this.status.name(), matriculaAuditor));
    }

    /**
     * Rejeita o contrato com apontamento de inconsistências, sobrepreço ou vício insanável.
     */
    public void rejeitarPorInconsistencia(String matriculaAuditor, String apontamentoIrregularidades, boolean sobreprecoDetectado) {
        garantirEmAuditoria();

        if (apontamentoIrregularidades == null || apontamentoIrregularidades.trim().length() < 20) {
            throw new InvarianteVioladaException("Apontamento de irregularidade exige justificativa fundamentada mínima de 20 caracteres.");
        }

        ParecerAuditoria parecer = ParecerAuditoria.desfavoravel(matriculaAuditor, apontamentoIrregularidades, sobreprecoDetectado);
        this.historicoPareceres.add(parecer);
        this.status = sobreprecoDetectado ? StatusContrato.BLOQUEADO_SOBREPRECO : StatusContrato.REJEITADO_IRREGULAR;
        this.dataUltimaAtualizacao = Instant.now();

        this.domainEvents.add(new ContratoAuditadoEvent(this.id, this.status.name(), matriculaAuditor));
    }

    // =========================================================================
    // INVARIANTES E REGRAS DE NEGÓCIO INTERNAS (PRIVATE GUARDS)
    // =========================================================================

    private void validarLimitesModalidade() {
        if (this.modalidade == ModalidadeLicitacao.DISPENSA_COMPRAS_SERVICOS && this.valorTotal.maiorQue(LIMITE_DISPENSA_COMPRAS)) {
            throw new InvarianteVioladaException(
                String.format("Valor R$ %s ultrapassa o teto legal de R$ %s para dispensa de compras (Art. 75 Lei 14.133).",
                    this.valorTotal, LIMITE_DISPENSA_COMPRAS)
            );
        }

        if (this.modalidade == ModalidadeLicitacao.DISPENSA_OBRAS_ENGENHARIA && this.valorTotal.maiorQue(LIMITE_DISPENSA_OBRAS)) {
            throw new InvarianteVioladaException(
                String.format("Valor R$ %s ultrapassa o teto legal de R$ %s para dispensa de obras/serviços de engenharia.",
                    this.valorTotal, LIMITE_DISPENSA_OBRAS)
            );
        }
    }

    private void garantirContratoEditavel() {
        if (this.status != StatusContrato.AGUARDANDO_TRIAGEM) {
            throw new InvarianteVioladaException("Contratos em auditoria ou finalizados não permitem alteração de itens.");
        }
    }

    private void garantirEmAuditoria() {
        if (this.status != StatusContrato.EM_AUDITORIA) {
            throw new InvarianteVioladaException("A emissão de parecer exige que o contrato esteja em status 'EM_AUDITORIA'.");
        }
    }

    private String validarTextoObrigatorio(String texto, String campo) {
        if (texto == null || texto.trim().isEmpty()) {
            throw new InvarianteVioladaException(campo + " não pode ser vazio ou nulo.");
        }
        return texto.trim();
    }

    // =========================================================================
    // GETTERS SEGUROS (Imutabilidade de coleções para evitar vazamento de estado)
    // =========================================================================

    public UUID getId() { return id; }
    public NumeroProcesso getNumeroProcesso() { return numeroProcesso; }
    public String getOrgaoContratante() { return orgaoContratante; }
    public Cnpj getCnpjContratada() { return cnpjContratada; }
    public String getRazaoSocialContratada() { return razaoSocialContratada; }
    public ModalidadeLicitacao getModalidade() { return modalidade; }
    public ValorMonetario getValorTotal() { return valorTotal; }
    public PeriodoVigencia getVigencia() { return vigencia; }
    public StatusContrato getStatus() { return status; }
    public List<ItemContrato> getItens() { return Collections.unmodifiableList(itens); }
    public List<ParecerAuditoria> getHistoricoPareceres() { return Collections.unmodifiableList(historicoPareceres); }
    public Instant getDataCadastro() { return dataCadastro; }
    public Instant getDataUltimaAtualizacao() { return dataUltimaAtualizacao; }

    /**
     * Drena eventos de domínio para publicação pelo Application Layer
     */
    public List<Object> coletarELimparEventosDominio() {
        List<Object> eventos = new ArrayList<>(this.domainEvents);
        this.domainEvents.clear();
        return eventos;
    }
}`
  },
  {
    id: 'value-objects',
    name: 'ValueObjects.java (Cnpj, ValorMonetario, NumeroProcesso)',
    path: 'src/main/java/gov/audit/domain/model/vo/ValueObjects.java',
    category: 'domain',
    language: 'java',
    description: 'Value Objects imutáveis com validação rigorosa de CNPJ (dígitos verificadores oficiais da Receita Federal) e precisão contábil.',
    content: `package gov.audit.domain.model.vo;

import gov.audit.domain.exception.InvarianteVioladaException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.Objects;
import java.util.regex.Pattern;

/**
 * VALUE OBJECT: Cnpj
 * Imutável com algoritmo oficial de validação dos dígitos verificadores.
 */
public record Cnpj(String valor) {

    private static final Pattern APENAS_DIGITOS = Pattern.compile("^\\\\d{14}$");

    public Cnpj {
        if (valor == null) {
            throw new InvarianteVioladaException("CNPJ não pode ser nulo.");
        }
        String limpo = valor.replaceAll("[^0-9]", "");
        if (!validarCnpj(limpo)) {
            throw new InvarianteVioladaException("CNPJ inválido de acordo com a Receita Federal: " + valor);
        }
        valor = formatar(limpo);
    }

    private static boolean validarCnpj(String cnpj) {
        if (cnpj.length() != 14 || cnpj.matches("(\\\\d)\\\\1{13}")) return false;
        try {
            int soma = 0;
            int peso = 2;
            for (int i = 11; i >= 0; i--) {
                soma += (cnpj.charAt(i) - '0') * peso;
                peso = (peso == 9) ? 2 : peso + 1;
            }
            int digito1 = 11 - (soma % 11);
            if (digito1 >= 10) digito1 = 0;

            soma = 0;
            peso = 2;
            for (int i = 12; i >= 0; i--) {
                soma += (cnpj.charAt(i) - '0') * peso;
                peso = (peso == 9) ? 2 : peso + 1;
            }
            int digito2 = 11 - (soma % 11);
            if (digito2 >= 10) digito2 = 0;

            return (cnpj.charAt(12) - '0' == digito1) && (cnpj.charAt(13) - '0' == digito2);
        } catch (Exception e) {
            return false;
        }
    }

    private static String formatar(String c) {
        return String.format("%s.%s.%s/%s-%s",
            c.substring(0, 2), c.substring(2, 5), c.substring(5, 8),
            c.substring(8, 12), c.substring(12, 14));
    }
}

/**
 * VALUE OBJECT: ValorMonetario
 * Precisão decimal estrita para finanças públicas (BigDecimal com 2 casas e ROUND_HALF_EVEN).
 */
public record ValorMonetario(BigDecimal valor) implements Comparable<ValorMonetario> {

    public ValorMonetario {
        Objects.requireNonNull(valor, "Valor monetário não pode ser nulo.");
        if (valor.compareTo(BigDecimal.ZERO) < 0) {
            throw new InvarianteVioladaException("Valor monetário não pode ser negativo no contrato.");
        }
        valor = valor.setScale(2, RoundingMode.HALF_EVEN);
    }

    public static ValorMonetario de(double v) {
        return new ValorMonetario(BigDecimal.valueOf(v));
    }

    public static ValorMonetario zero() {
        return new ValorMonetario(BigDecimal.ZERO);
    }

    public ValorMonetario somar(ValorMonetario outro) {
        return new ValorMonetario(this.valor.add(outro.valor));
    }

    public boolean maiorQue(ValorMonetario outro) {
        return this.compareTo(outro) > 0;
    }

    @Override
    public int compareTo(ValorMonetario o) {
        return this.valor.compareTo(o.valor);
    }

    @Override
    public String toString() {
        return "R$ " + valor.toString();
    }
}

/**
 * VALUE OBJECT: NumeroProcesso Administrativo (Padrão SEI / e-Gov)
 */
public record NumeroProcesso(String valor) {
    public NumeroProcesso {
        if (valor == null || valor.trim().isEmpty()) {
            throw new InvarianteVioladaException("Número do processo é obrigatório.");
        }
        valor = valor.trim().toUpperCase();
    }
}

/**
 * VALUE OBJECT: PeriodoVigencia com regras de integridade cronológica
 */
public record PeriodoVigencia(LocalDate dataInicio, LocalDate dataFim) {
    public PeriodoVigencia {
        Objects.requireNonNull(dataInicio, "Data de início da vigência é obrigatória.");
        Objects.requireNonNull(dataFim, "Data de término da vigência é obrigatória.");
        if (dataFim.isBefore(dataInicio)) {
            throw new InvarianteVioladaException("Data de término não pode anteceder a data de início da vigência.");
        }
    }
}`
  },
  {
    id: 'use-case',
    name: 'SubmeterContratoAuditoriaUseCase.java',
    path: 'src/main/java/gov/audit/application/usecase/SubmeterContratoAuditoriaUseCase.java',
    category: 'application',
    language: 'java',
    description: 'Caso de uso orquestrando a lógica de aplicação, transacionalidade, inversão de controle e publicação de eventos.',
    content: `package gov.audit.application.usecase;

import gov.audit.application.dto.request.SubmeterContratoRequest;
import gov.audit.application.dto.response.ContratoAuditadoResponse;
import gov.audit.application.mapper.ContratoApplicationMapper;
import gov.audit.domain.model.contrato.ContratoPendente;
import gov.audit.domain.model.vo.Cnpj;
import gov.audit.domain.model.vo.NumeroProcesso;
import gov.audit.domain.model.vo.PeriodoVigencia;
import gov.audit.domain.model.vo.ValorMonetario;
import gov.audit.domain.repository.ContratoPendenteRepository;
import gov.audit.infrastructure.messaging.DomainEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * CAMADA APPLICATION: Use Case
 * Responsável por orquestrar a interação entre o Domínio e a Infraestrutura.
 * Não contém lógica de negócio central (que reside no Aggregate ContratoPendente).
 */
@Service
public class SubmeterContratoAuditoriaUseCase {

    private final ContratoPendenteRepository repository;
    private final ContratoApplicationMapper mapper;
    private final DomainEventPublisher eventPublisher;

    public SubmeterContratoAuditoriaUseCase(
            ContratoPendenteRepository repository,
            ContratoApplicationMapper mapper,
            DomainEventPublisher eventPublisher
    ) {
        this.repository = repository;
        this.mapper = mapper;
        this.eventPublisher = eventPublisher;
    }

    @Transactional
    public ContratoAuditadoResponse executar(SubmeterContratoRequest request) {
        // 1. Criação do Aggregate via Domínio Rico
        ContratoPendente contrato = ContratoPendente.novoContrato(
                new NumeroProcesso(request.numeroProcesso()),
                request.orgaoContratante(),
                new Cnpj(request.cnpjContratada()),
                request.razaoSocialContratada(),
                request.modalidade(),
                new ValorMonetario(request.valorTotal()),
                new PeriodoVigencia(request.dataInicioVigencia(), request.dataFimVigencia())
        );

        // 2. Adição de itens contratuais
        request.itens().forEach(itemDto ->
            contrato.adicionarItem(
                itemDto.numeroItem(),
                itemDto.descricao(),
                itemDto.quantidade(),
                new ValorMonetario(itemDto.valorUnitario())
            )
        );

        // 3. Persistência através da interface do repositório de domínio
        ContratoPendente contratoSalvo = repository.salvar(contrato);

        // 4. Disparo de eventos de domínio acumulados
        contratoSalvo.coletarELimparEventosDominio().forEach(eventPublisher::publicar);

        // 5. Retorno de DTO seguro para a apresentação
        return mapper.paraResponse(contratoSalvo);
    }
}`
  },
  {
    id: 'archunit-test',
    name: 'DddArchitectureTest.java (ArchUnit)',
    path: 'src/test/java/gov/audit/architecture/DddArchitectureTest.java',
    category: 'test',
    language: 'java',
    description: 'Teste arquitetural automatizado com ArchUnit que garante que a camada Domain permaneça 100% isolada e sem vazamento de Spring/JPA.',
    content: `package gov.audit.architecture;

import com.tngtech.archunit.core.importer.ImportOption;
import com.tngtech.archunit.junit.AnalyzeClasses;
import com.tngtech.archunit.junit.ArchTest;
import com.tngtech.archunit.lang.ArchRule;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.classes;
import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

/**
 * GOVERNANÇA DE ARQUITETURA VIA CÓDIGO (ArchUnit)
 * Falha a esteira de CI/CD se algum desenvolvedor violar os limites das camadas DDD.
 */
@AnalyzeClasses(packages = "gov.audit", importOptions = ImportOption.DoNotIncludeTests.class)
public class DddArchitectureTest {

    @ArchTest
    static final ArchRule dominio_nao_deve_depender_de_outras_camadas =
        noClasses().that().resideInAPackage("..domain..")
            .should().dependOnClassesThat().resideInAnyPackage(
                "..application..",
                "..infrastructure..",
                "..presentation.."
            ).because("O Domínio deve ser o núcleo puro e independente de detalhes externos.");

    @ArchTest
    static final ArchRule dominio_nao_deve_usar_frameworks_jpa_ou_spring =
        noClasses().that().resideInAPackage("..domain.model..")
            .should().dependOnClassesThat().resideInAnyPackage(
                "org.springframework..",
                "jakarta.persistence.."
            ).because("As entidades de domínio DDD não devem ser corrompidas por anotações ORM/JPA.");

    @ArchTest
    static final ArchRule presentation_so_deve_acessar_application =
        classes().that().resideInAPackage("..presentation..")
            .should().onlyAccessClassesThat().resideInAnyPackage(
                "..presentation..",
                "..application..",
                "java..",
                "org.springframework.."
            ).because("A apresentação só deve interagir com Use Cases e DTOs da camada Application.");
}
`
  },
  {
    id: 'domain-service',
    name: 'CicloVidaContratoDomainService.java',
    path: 'src/main/java/gov/audit/domain/service/CicloVidaContratoDomainService.java',
    category: 'domain',
    language: 'java',
    description: 'Domain Service encapsulando regras do ciclo de vida público: transições entre EM_ELABORACAO, ANALISE_JURIDICA, EMPENHADO, APROVADO_TRIBUNAL e VIGENTE.',
    content: `package gov.audit.domain.service;

import gov.audit.domain.exception.InvarianteVioladaException;
import gov.audit.domain.model.contrato.ContratoPendente;
import gov.audit.domain.model.contrato.StatusContratoCicloVida;
import gov.audit.domain.model.vo.NotaEmpenho;
import gov.audit.domain.model.vo.ParecerJuridico;
import gov.audit.domain.repository.ContratoPendenteRepository;
import gov.audit.domain.repository.SistemaOrcamentarioPort;
import gov.audit.domain.repository.TribunalContasPort;

import java.time.LocalDate;
import java.util.Objects;

/**
 * DOMAIN SERVICE: CicloVidaContratoDomainService
 * 
 * Gerencia operações e invariantes que não pertencem exclusivamente a uma única entidade,
 * orquestrando a conformidade com a Lei 14.133/2021 (Nova Lei de Licitações)
 * e o Decreto 93.872/1986 (Execução Orçamentária e Financeira).
 * 
 * Estados do Ciclo de Vida:
 *  1. EM_ELABORACAO       -> Criação do termo de referência e minuta contratual.
 *  2. ANALISE_JURIDICA    -> Exame de legalidade pela Advocacia Pública / AGU / Procuradoria.
 *  3. EMPENHADO           -> Emissão prévia da Nota de Empenho (SIAFI/SIAFEM).
 *  4. APROVADO_TRIBUNAL   -> Homologação de conformidade prévia pelo Tribunal de Contas (TCU/TCE).
 *  5. VIGENTE             -> Publicação oficial no PNCP e início de vigência jurídica.
 */
public class CicloVidaContratoDomainService {

    private final ContratoPendenteRepository contratoRepository;
    private final SistemaOrcamentarioPort siafiPort;
    private final TribunalContasPort tribunalContasPort;

    public CicloVidaContratoDomainService(
            ContratoPendenteRepository contratoRepository,
            SistemaOrcamentarioPort siafiPort,
            TribunalContasPort tribunalContasPort
    ) {
        this.contratoRepository = Objects.requireNonNull(contratoRepository, "Repositório não pode ser nulo");
        this.siafiPort = Objects.requireNonNull(siafiPort, "Port orçamentário não pode ser nulo");
        this.tribunalContasPort = Objects.requireNonNull(tribunalContasPort, "Port do Tribunal não pode ser nulo");
    }

    /**
     * Submete o contrato da fase interna de elaboração para parecer jurídico prévio (Art. 53 da Lei 14.133/2021).
     */
    public void encaminharParaAnaliseJuridica(ContratoPendente contrato) {
        if (contrato.getStatusCicloVida() != StatusContratoCicloVida.EM_ELABORACAO) {
            throw new InvarianteVioladaException(
                "Apenas contratos em fase 'EM_ELABORACAO' podem ser remetidos para análise jurídica."
            );
        }

        if (contrato.getItens().isEmpty()) {
            throw new InvarianteVioladaException(
                "Inviável submeter para análise jurídica sem planilha orçamentária e itens especificados."
            );
        }

        contrato.transicionarStatus(
            StatusContratoCicloVida.ANALISE_JURIDICA, 
            "Encaminhado à Consultoria Jurídica/AGU para análise de conformidade legal."
        );
    }

    /**
     * Registra o parecer favorável da Procuradoria e avança para a fase de vinculação orçamentária.
     */
    public void registrarParecerJuridicoFavoravel(ContratoPendente contrato, ParecerJuridico parecer) {
        if (contrato.getStatusCicloVida() != StatusContratoCicloVida.ANALISE_JURIDICA) {
            throw new InvarianteVioladaException("Contrato não está aguardando parecer jurídico.");
        }

        if (!parecer.isAprovado()) {
            contrato.transicionarStatus(
                StatusContratoCicloVida.EM_ELABORACAO, 
                "Devolvido para saneamento de diligências apontadas pelo parecer jurídico: " + parecer.justificativa()
            );
            return;
        }

        contrato.anexarParecerJuridico(parecer);
    }

    /**
     * Vincula a Nota de Empenho (NE) após validação de saldo orçamentário no SIAFI/SIAFEM.
     * Nenhum contrato administrativo pode ser assinado sem prévio empenho (Art. 60 da Lei 4.320/1964).
     */
    public void vincularNotaEmpenho(ContratoPendente contrato, NotaEmpenho notaEmpenho) {
        if (contrato.getStatusCicloVida() != StatusContratoCicloVida.ANALISE_JURIDICA 
                || !contrato.possuiParecerJuridicoAprovado()) {
            throw new InvarianteVioladaException(
                "Empenho vedado: contrato exige parecer jurídico favorável prévio devidamente homologado."
            );
        }

        // Validação com o sistema orçamentário externo (Port/Adapter)
        boolean saldoValido = siafiPort.validarSaldoEmpenho(
            notaEmpenho.numero(), 
            contrato.getValorTotal().valor()
        );

        if (!saldoValido) {
            throw new InvarianteVioladaException(
                "Saldo da dotação orçamentária insuficiente ou inválido no SIAFI para a Nota de Empenho: " + notaEmpenho.numero()
            );
        }

        contrato.vincularEmpenho(notaEmpenho);
        contrato.transicionarStatus(
            StatusContratoCicloVida.EMPENHADO, 
            "Nota de empenho " + notaEmpenho.numero() + " vinculada e autenticada com sucesso."
        );
    }

    /**
     * Envia o contrato empenhado para homologação pelo Tribunal de Contas competente (TCU/TCE).
     */
    public void submeterAprovacaoTribunalContas(ContratoPendente contrato) {
        if (contrato.getStatusCicloVida() != StatusContratoCicloVida.EMPENHADO) {
            throw new InvarianteVioladaException(
                "Apenas contratos devidamente empenhados podem ser submetidos à chancela do Tribunal de Contas."
            );
        }

        var protocolo = tribunalContasPort.registrarRemessaContrato(
            contrato.getNumeroProcesso().valor(), 
            contrato.getValorTotal().valor()
        );

        contrato.registrarProtocoloTribunal(protocolo);
        contrato.transicionarStatus(
            StatusContratoCicloVida.APROVADO_TRIBUNAL, 
            "Chancela de conformidade emitida pelo Tribunal de Contas sob protocolo: " + protocolo
        );
    }

    /**
     * Publica o contrato no Portal Nacional de Contratações Públicas (PNCP) tornando-o plenamente VIGENTE.
     * (Art. 94 da Lei 14.133/2021: eficácia jurídica do contrato vinculada à publicação no PNCP).
     */
    public void ativarVigenciaOficial(ContratoPendente contrato, LocalDate dataPublicacaoPncp) {
        if (contrato.getStatusCicloVida() != StatusContratoCicloVida.APROVADO_TRIBUNAL) {
            throw new InvarianteVioladaException(
                "Contrato não pode se tornar VIGENTE sem prévia aprovação e certificação do Tribunal de Contas."
            );
        }

        if (dataPublicacaoPncp.isAfter(LocalDate.now())) {
            throw new InvarianteVioladaException("Data de publicação no PNCP não pode ser futura.");
        }

        contrato.transicionarStatus(
            StatusContratoCicloVida.VIGENTE, 
            "Contrato publicado no PNCP em " + dataPublicacaoPncp + ". Vigência jurídica iniciada."
        );
    }
}`
  },
  {
    id: 'bpmn-statemachine',
    name: 'ContratoStateMachineConfig.java (Motor BPMN/Estados)',
    path: 'src/main/java/gov/audit/infrastructure/bpm/ContratoStateMachineConfig.java',
    category: 'infrastructure',
    language: 'java',
    description: 'Configuração robusta de máquina de estados / motor BPMN no Spring com Guards fiscais, Actions auditáveis e transições do ciclo de vida público.',
    content: `package gov.audit.infrastructure.bpm;

import gov.audit.domain.model.contrato.StatusContratoCicloVida;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.statemachine.action.Action;
import org.springframework.statemachine.config.EnableStateMachineFactory;
import org.springframework.statemachine.config.EnumStateMachineConfigurerAdapter;
import org.springframework.statemachine.config.builders.StateMachineConfigurationConfigurer;
import org.springframework.statemachine.config.builders.StateMachineStateConfigurer;
import org.springframework.statemachine.config.builders.StateMachineTransitionConfigurer;
import org.springframework.statemachine.guard.Guard;

import java.util.EnumSet;

/**
 * MOTOR DE PROCESSOS BPMN / SPRING STATE MACHINE
 * 
 * Implementa a máquina de estados rigorosa do ciclo de vida de contratos públicos.
 * Garante que transições ilegais sejam interceptadas por Guards de integridade fiscal,
 * registrando auditoria em cada transição concluída.
 */
@Configuration
@EnableStateMachineFactory(name = "contratoStateMachineFactory")
public class ContratoStateMachineConfig 
        extends EnumStateMachineConfigurerAdapter<StatusContratoCicloVida, ContratoEventoBpm> {

    private static final Logger log = LoggerFactory.getLogger(ContratoStateMachineConfig.class);

    @Override
    public void configure(StateMachineConfigurationConfigurer<StatusContratoCicloVida, ContratoEventoBpm> config) 
            throws Exception {
        config
            .withConfiguration()
            .autoStartup(true)
            .listener(new ContratoStateChangeListener());
    }

    @Override
    public void configure(StateMachineStateConfigurer<StatusContratoCicloVida, ContratoEventoBpm> states) 
            throws Exception {
        states
            .withStates()
            .initial(StatusContratoCicloVida.EM_ELABORACAO)
            .states(EnumSet.allOf(StatusContratoCicloVida.class))
            .end(StatusContratoCicloVida.VIGENTE)
            .end(StatusContratoCicloVida.CANCELADO_REJEITADO);
    }

    @Override
    public void configure(StateMachineTransitionConfigurer<StatusContratoCicloVida, ContratoEventoBpm> transitions) 
            throws Exception {
        transitions
            // 1. EM_ELABORACAO -> ANALISE_JURIDICA
            .withExternal()
                .source(StatusContratoCicloVida.EM_ELABORACAO)
                .target(StatusContratoCicloVida.ANALISE_JURIDICA)
                .event(ContratoEventoBpm.ENVIAR_ANALISE_JURIDICA)
                .guard(guardPlanilhaOrcamentariaPresente())
                .action(actionNotificarProcuradoria())
            .and()

            // 2. ANALISE_JURIDICA -> EMPENHADO (Parecer Favorável)
            .withExternal()
                .source(StatusContratoCicloVida.ANALISE_JURIDICA)
                .target(StatusContratoCicloVida.EMPENHADO)
                .event(ContratoEventoBpm.HOMOLOGAR_PARECER_E_EMPENHAR)
                .guard(guardParecerJuridicoFavoravel())
                .action(actionRegistrarNotaEmpenho())
            .and()

            // 2.1 ANALISE_JURIDICA -> EM_ELABORACAO (Diligência/Devolução)
            .withExternal()
                .source(StatusContratoCicloVida.ANALISE_JURIDICA)
                .target(StatusContratoCicloVida.EM_ELABORACAO)
                .event(ContratoEventoBpm.DEVOLVER_PARA_DILIGENCIA)
                .action(actionNotificarSetorRequisitante())
            .and()

            // 3. EMPENHADO -> APROVADO_TRIBUNAL
            .withExternal()
                .source(StatusContratoCicloVida.EMPENHADO)
                .target(StatusContratoCicloVida.APROVADO_TRIBUNAL)
                .event(ContratoEventoBpm.SUBMETER_TRIBUNAL_CONTAS)
                .guard(guardSaldoEmpenhoAtivo())
                .action(actionIntegrarTribunalContas())
            .and()

            // 4. APROVADO_TRIBUNAL -> VIGENTE
            .withExternal()
                .source(StatusContratoCicloVida.APROVADO_TRIBUNAL)
                .target(StatusContratoCicloVida.VIGENTE)
                .event(ContratoEventoBpm.PUBLICAR_PNCP_E_ATIVAR)
                .action(actionPublicarPncp());
    }

    // =========================================================================
    // GUARDS: Invariantes fiscais e processuais (BPMN Gateways)
    // =========================================================================

    @Bean
    public Guard<StatusContratoCicloVida, ContratoEventoBpm> guardPlanilhaOrcamentariaPresente() {
        return context -> {
            Boolean temPlanilha = context.getMessageHeaders().get("hasItems", Boolean.class);
            return temPlanilha != null && temPlanilha;
        };
    }

    @Bean
    public Guard<StatusContratoCicloVida, ContratoEventoBpm> guardParecerJuridicoFavoravel() {
        return context -> {
            Boolean aprovado = context.getMessageHeaders().get("parecerAprovado", Boolean.class);
            return Boolean.TRUE.equals(aprovado);
        };
    }

    @Bean
    public Guard<StatusContratoCicloVida, ContratoEventoBpm> guardSaldoEmpenhoAtivo() {
        return context -> {
            String numEmpenho = context.getMessageHeaders().get("notaEmpenho", String.class);
            return numEmpenho != null && !numEmpenho.isBlank();
        };
    }

    // =========================================================================
    // ACTIONS: Trilha de Auditoria & Integrações
    // =========================================================================

    @Bean
    public Action<StatusContratoCicloVida, ContratoEventoBpm> actionNotificarProcuradoria() {
        return context -> log.info("[AUDIT-BPM] Processo {} encaminhado à Consultoria Jurídica.",
            context.getMessageHeaders().get("processoId"));
    }

    @Bean
    public Action<StatusContratoCicloVida, ContratoEventoBpm> actionRegistrarNotaEmpenho() {
        return context -> log.info("[AUDIT-BPM] Nota de Empenho vinculada com sucesso no SIAFI.");
    }

    @Bean
    public Action<StatusContratoCicloVida, ContratoEventoBpm> actionNotificarSetorRequisitante() {
        return context -> log.warn("[AUDIT-BPM] Contrato devolvido para diligência por recomendação jurídica.");
    }

    @Bean
    public Action<StatusContratoCicloVida, ContratoEventoBpm> actionIntegrarTribunalContas() {
        return context -> log.info("[AUDIT-BPM] Remessa registrada junto ao Tribunal de Contas (TCU/TCE).");
    }

    @Bean
    public Action<StatusContratoCicloVida, ContratoEventoBpm> actionPublicarPncp() {
        return context -> log.info("[AUDIT-BPM] Contrato publicado no PNCP. Eficácia e vigência plenas ativadas.");
    }
}`
  },
  {
    id: 'rest-controller',
    name: 'ContratoController.java',
    path: 'src/main/java/gov/audit/presentation/api/ContratoController.java',
    category: 'presentation',
    language: 'java',
    description: 'REST Controller corporativo com Clean Code, Spring Pageable, OpenAPI Swagger 3.0, Location header com URI e tratamento de idempotência.',
    content: `package gov.audit.presentation.api;

import gov.audit.application.dto.request.SubmeterContratoInputDTO;
import gov.audit.application.dto.request.TransicaoCicloVidaRequest;
import gov.audit.application.dto.response.ContratoDetalhadoResponse;
import gov.audit.application.usecase.CicloVidaContratoUseCase;
import gov.audit.application.usecase.ConsultarContratoUseCase;
import gov.audit.application.usecase.SubmeterContratoAuditoriaUseCase;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.UUID;

/**
 * CONTROLADOR REST: ContratoController
 * Ponto de entrada da API de auditoria de contratos administrativos.
 * Segue Clean Code e boas práticas de RESTful APIs governamentais.
 */
@RestController
@RequestMapping("/api/v1/contratos")
@Tag(name = "Contratos Públicos", description = "Endpoints de auditoria, fiscalização e ciclo de vida sob a Lei 14.133/2021")
public class ContratoController {

    private final SubmeterContratoAuditoriaUseCase submeterUseCase;
    private final CicloVidaContratoUseCase cicloVidaUseCase;
    private final ConsultarContratoUseCase consultarUseCase;

    public ContratoController(
            SubmeterContratoAuditoriaUseCase submeterUseCase,
            CicloVidaContratoUseCase cicloVidaUseCase,
            ConsultarContratoUseCase consultarUseCase
    ) {
        this.submeterUseCase = submeterUseCase;
        this.cicloVidaUseCase = cicloVidaUseCase;
        this.consultarUseCase = consultarUseCase;
    }

    @PostMapping
    @Operation(
        summary = "Submeter contrato para triagem e auditoria",
        description = "Cadastra o contrato administrativo com validações de CNPJ, limites da Lei 14.133 e itens."
    )
    @ApiResponses({
        @ApiResponse(responseCode = "201", description = "Contrato cadastrado com sucesso"),
        @ApiResponse(responseCode = "400", description = "Dados fiscais ou invariantes de negócio violadas",
                     content = @Content(schema = @Schema(implementation = ProblemDetail.class))),
        @ApiResponse(responseCode = "422", description = "Regra de negócio violada",
                     content = @Content(schema = @Schema(implementation = ProblemDetail.class)))
    })
    public ResponseEntity<ContratoDetalhadoResponse> submeter(
            @Valid @RequestBody SubmeterContratoInputDTO input
    ) {
        ContratoDetalhadoResponse response = submeterUseCase.executar(input);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(response.id())
                .toUri();

        return ResponseEntity.created(location).body(response);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obter detalhes do contrato e trilha de auditoria por ID")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Contrato localizado"),
        @ApiResponse(responseCode = "404", description = "Contrato não encontrado",
                     content = @Content(schema = @Schema(implementation = ProblemDetail.class)))
    })
    public ResponseEntity<ContratoDetalhadoResponse> buscarPorId(
            @PathVariable UUID id
    ) {
        ContratoDetalhadoResponse response = consultarUseCase.buscarPorId(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    @Operation(summary = "Listar contratos com paginação e filtros de auditoria")
    public ResponseEntity<Page<ContratoDetalhadoResponse>> listar(
            @RequestParam(required = false) String orgao,
            @RequestParam(required = false) String status,
            @PageableDefault(size = 20, sort = "dataCadastro") Pageable pageable
    ) {
        Page<ContratoDetalhadoResponse> pagina = consultarUseCase.listar(orgao, status, pageable);
        return ResponseEntity.ok(pagina);
    }

    @PatchMapping("/{id}/ciclo-vida/transicao")
    @Operation(
        summary = "Executar transição de ciclo de vida (BPMN)",
        description = "Transiciona o contrato entre EM_ELABORACAO, ANALISE_JURIDICA, EMPENHADO, APROVADO_TRIBUNAL e VIGENTE."
    )
    public ResponseEntity<ContratoDetalhadoResponse> transicionar(
            @PathVariable UUID id,
            @Valid @RequestBody TransicaoCicloVidaRequest request
    ) {
        ContratoDetalhadoResponse atualizado = cicloVidaUseCase.transicionarEstado(id, request);
        return ResponseEntity.ok(atualizado);
    }
}`
  },
  {
    id: 'controller-advice',
    name: 'GlobalExceptionHandler.java',
    path: 'src/main/java/gov/audit/presentation/handler/GlobalExceptionHandler.java',
    category: 'presentation',
    language: 'java',
    description: 'ControllerAdvice corporativo com RFC 7807 ProblemDetail, mapeamento de erros de Bean Validation, violações de domínio e trilha para observabilidade.',
    content: `package gov.audit.presentation.handler;

import gov.audit.domain.exception.BusinessRuleException;
import gov.audit.domain.exception.ContratoNaoEncontradoException;
import gov.audit.domain.exception.InvarianteVioladaException;
import gov.audit.domain.exception.TransicaoEstadoInvalidaException;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.net.URI;
import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

/**
 * TRATAMENTO GLOBAL DE EXCEÇÕES CORPORATIVAS
 * Padrão RFC 7807 (Problem Details for HTTP APIs) nativo do Spring Boot 3.x.
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    /**
     * Erros de Validação de DTO (Bean Validation - @Valid)
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ProblemDetail handleValidationException(
            MethodArgumentNotValidException ex, 
            HttpServletRequest request
    ) {
        ProblemDetail problem = ProblemDetail.forStatusAndDetail(
                HttpStatus.BAD_REQUEST, 
                "Um ou mais campos contêm dados inválidos ou fora dos padrões governamentais."
        );
        problem.setType(URI.create("https://govaudit.gov.br/erros/validacao-dados"));
        problem.setTitle("Erro de Validação de Dados de Entrada");
        problem.setProperty("timestamp", Instant.now());
        problem.setProperty("path", request.getRequestURI());

        Map<String, String> invalidFields = new HashMap<>();
        for (FieldError error : ex.getBindingResult().getFieldErrors()) {
            invalidFields.put(error.getField(), error.getDefaultMessage());
        }
        problem.setProperty("invalidFields", invalidFields);

        log.warn("[VALIDATION-FAIL] Path: {} | Erros: {}", request.getRequestURI(), invalidFields);
        return problem;
    }

    /**
     * Violação de Invariante de Domínio (DDD)
     */
    @ExceptionHandler(InvarianteVioladaException.class)
    public ProblemDetail handleInvarianteViolada(
            InvarianteVioladaException ex, 
            HttpServletRequest request
    ) {
        ProblemDetail problem = ProblemDetail.forStatusAndDetail(
                HttpStatus.UNPROCESSABLE_ENTITY, 
                ex.getMessage()
        );
        problem.setType(URI.create("https://govaudit.gov.br/erros/invariante-violada"));
        problem.setTitle("Violação de Invariante de Domínio Público");
        problem.setProperty("timestamp", Instant.now());
        problem.setProperty("path", request.getRequestURI());

        log.warn("[INVARIANTE-VIOLADA] {}", ex.getMessage());
        return problem;
    }

    /**
     * Transição Ilegal de Estado do BPMN
     */
    @ExceptionHandler(TransicaoEstadoInvalidaException.class)
    public ProblemDetail handleTransicaoInvalida(
            TransicaoEstadoInvalidaException ex, 
            HttpServletRequest request
    ) {
        ProblemDetail problem = ProblemDetail.forStatusAndDetail(
                HttpStatus.CONFLICT, 
                ex.getMessage()
        );
        problem.setType(URI.create("https://govaudit.gov.br/erros/transicao-invalida"));
        problem.setTitle("Transição de Ciclo de Vida Rejeitada");
        problem.setProperty("timestamp", Instant.now());
        problem.setProperty("estadoOrigem", ex.getEstadoOrigem());
        problem.setProperty("eventoDisparado", ex.getEvento());

        log.warn("[BPM-TRANSITION-REJECTED] {}", ex.getMessage());
        return problem;
    }

    /**
     * Contrato Não Encontrado
     */
    @ExceptionHandler(ContratoNaoEncontradoException.class)
    public ProblemDetail handleNotFound(
            ContratoNaoEncontradoException ex, 
            HttpServletRequest request
    ) {
        ProblemDetail problem = ProblemDetail.forStatusAndDetail(
                HttpStatus.NOT_FOUND, 
                ex.getMessage()
        );
        problem.setType(URI.create("https://govaudit.gov.br/erros/contrato-nao-encontrado"));
        problem.setTitle("Recurso Público Não Localizado");
        problem.setProperty("timestamp", Instant.now());

        return problem;
    }

    /**
     * Erro Inesperado de Servidor (Fallback Geral)
     */
    @ExceptionHandler(Exception.class)
    public ProblemDetail handleGenericException(
            Exception ex, 
            HttpServletRequest request
    ) {
        log.error("[INTERNAL-ERROR] Erro não mapeado em {}", request.getRequestURI(), ex);

        ProblemDetail problem = ProblemDetail.forStatusAndDetail(
                HttpStatus.INTERNAL_SERVER_ERROR, 
                "Ocorreu um erro interno de processamento no sistema de auditoria."
        );
        problem.setType(URI.create("https://govaudit.gov.br/erros/erro-interno"));
        problem.setTitle("Erro Interno do Servidor");
        problem.setProperty("timestamp", Instant.now());

        return problem;
    }
}`
  },
  {
    id: 'submeter-dto',
    name: 'SubmeterContratoInputDTO.java',
    path: 'src/main/java/gov/audit/application/dto/request/SubmeterContratoInputDTO.java',
    category: 'application',
    language: 'java',
    description: 'DTO de entrada com validações robustas do Bean Validation (@Pattern com regex SEI/CNPJ, @NotNull, @DecimalMin, @Valid aninhado em itens orçamentários).',
    content: `package gov.audit.application.dto.request;

import gov.audit.domain.model.contrato.ModalidadeLicitacao;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

/**
 * DTO DE ENTRADA: SubmeterContratoInputDTO
 * 
 * Contém validações rigorosas com Bean Validation alinhadas às exigências
 * do Tribunal de Contas, da Receita Federal e do Sistema Eletrônico de Informações (SEI).
 */
public record SubmeterContratoInputDTO(

    @Schema(description = "Número do processo administrativo no padrão SEI/e-Gov", example = "SEI-23000.001928/2026-44")
    @NotBlank(message = "Número do processo administrativo é obrigatório.")
    @Pattern(
        regexp = "^(SEI|MGI|TCU|MEC|MS)-\\\\d{5}\\\\.\\\\d{6}/\\\\d{4}-\\\\d{2}$",
        message = "Número do processo deve seguir o padrão governamental (ex: SEI-23000.001928/2026-44)."
    )
    String numeroProcesso,

    @Schema(description = "Órgão ou Entidade da Administração Pública contratante", example = "Ministério da Gestão e da Inovação em Serviços Públicos")
    @NotBlank(message = "Órgão contratante é obrigatório.")
    @Size(min = 5, max = 200, message = "Nome do órgão contratante deve possuir entre 5 e 200 caracteres.")
    String orgaoContratante,

    @Schema(description = "CNPJ regular da empresa contratada com máscara oficial", example = "00.394.460/0058-87")
    @NotBlank(message = "CNPJ da empresa contratada é obrigatório.")
    @Pattern(
        regexp = "^\\\\d{2}\\\\.\\\\d{3}\\\\.\\\\d{3}/\\\\d{4}-\\\\d{2}$",
        message = "CNPJ deve estar no formato oficial com máscara: 00.000.000/0000-00."
    )
    String cnpjContratada,

    @Schema(description = "Razão Social conforme registro no CNPJ da Receita Federal", example = "TechGov Inovações em Tecnologia Ltda.")
    @NotBlank(message = "Razão social da contratada é obrigatória.")
    @Size(min = 3, max = 255, message = "Razão social deve ter entre 3 e 255 caracteres.")
    String razaoSocialContratada,

    @Schema(description = "Modalidade de contratação conforme Lei 14.133/2021", example = "PREGAO_ELETRONICO")
    @NotNull(message = "Modalidade de licitação é obrigatória.")
    ModalidadeLicitacao modalidade,

    @Schema(description = "Valor global estimado do contrato em Reais", example = "48500.00")
    @NotNull(message = "Valor total do contrato é obrigatório.")
    @DecimalMin(value = "0.01", message = "Valor do contrato deve ser maior que zero.")
    @Digits(integer = 15, fraction = 2, message = "Valor deve possuir no máximo 15 dígitos inteiros e 2 casas decimais.")
    BigDecimal valorTotal,

    @Schema(description = "Data de início da vigência contratual prevista", example = "2026-11-01")
    @NotNull(message = "Data de início da vigência é obrigatória.")
    @FutureOrPresent(message = "Data de início da vigência não pode ser anterior à data presente.")
    LocalDate dataInicioVigencia,

    @Schema(description = "Data de encerramento da vigência contratual prevista", example = "2027-10-31")
    @NotNull(message = "Data de término da vigência é obrigatória.")
    LocalDate dataFimVigencia,

    @Schema(description = "Planilha orçamentária discriminada de itens e serviços")
    @NotEmpty(message = "O contrato exige no mínimo 1 item descrito na planilha orçamentária.")
    @Valid
    List<ItemContratoDTO> itens

) {

    /**
     * DTO interno para itens da planilha orçamentária
     */
    public record ItemContratoDTO(
        @NotNull(message = "Número do item é obrigatório.")
        @Positive(message = "Número do item deve ser positivo.")
        Integer numeroItem,

        @NotBlank(message = "Descrição técnica do item é obrigatória.")
        @Size(min = 5, max = 500, message = "Descrição do item deve ter entre 5 e 500 caracteres.")
        String descricao,

        @NotNull(message = "Quantidade estimada é obrigatória.")
        @Positive(message = "Quantidade do item deve ser maior que zero.")
        Integer quantidade,

        @NotNull(message = "Valor unitário do item é obrigatório.")
        @DecimalMin(value = "0.01", message = "Valor unitário deve ser maior que zero.")
        @Digits(integer = 12, fraction = 2, message = "Valor unitário deve possuir até 2 casas decimais.")
        BigDecimal valorUnitario
    ) {}
}
`
  },
  {
    id: 'auditoria-ia-service',
    name: 'AuditoriaInteligenteService.java',
    path: 'src/main/java/gov/audit/application/ai/AuditoriaInteligenteService.java',
    category: 'application',
    language: 'java',
    description: 'Serviço orquestrador de IA corporativa: unifica parsing sintático AST da minuta, enriquecimento contextual GraphRAG e protocolo MCP.',
    content: `package gov.audit.application.ai;

import gov.audit.application.ai.ast.MinutaContratualAstParser;
import gov.audit.application.ai.ast.ResultadoAnaliseAst;
import gov.audit.application.ai.graphrag.GraphRagKnowledgeService;
import gov.audit.application.ai.graphrag.SubgrafoContextoAuditoria;
import gov.audit.application.ai.mcp.McpClientPort;
import gov.audit.application.ai.mcp.McpContextPayload;
import gov.audit.application.dto.response.ParecerAuditoriaIaResponse;
import gov.audit.domain.exception.ContratoNaoEncontradoException;
import gov.audit.domain.model.contrato.ContratoPendente;
import gov.audit.domain.repository.ContratoPendenteRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.*;

/**
 * SERVIÇO DE AUDITORIA INTELIGENTE (ORQUESTRADOR DE IA)
 * 
 * Integra:
 *  1. Análise Sintática Estática (AST): detecta vícios formais e omissões do Art. 92 da Lei 14.133.
 *  2. GraphRAG: enriquece o contexto com grafos de conhecimento (sanções CEIS/CNEP, acórdãos TCU e histórico).
 *  3. Model Context Protocol (MCP): padroniza a troca de ferramentas, contexto e dados com o agente de IA.
 *  4. Modelo Especializado (Fine-Tuned): infere riscos e gera minuta de parecer técnico fundamentado.
 */
@Service
public class AuditoriaInteligenteService {

    private static final Logger log = LoggerFactory.getLogger(AuditoriaInteligenteService.class);

    private final ContratoPendenteRepository contratoRepository;
    private final MinutaContratualAstParser astParser;
    private final GraphRagKnowledgeService graphRagService;
    private final McpClientPort mcpClient;

    public AuditoriaInteligenteService(
            ContratoPendenteRepository contratoRepository,
            MinutaContratualAstParser astParser,
            GraphRagKnowledgeService graphRagService,
            McpClientPort mcpClient
    ) {
        this.contratoRepository = contratoRepository;
        this.astParser = astParser;
        this.graphRagService = graphRagService;
        this.mcpClient = mcpClient;
    }

    @Transactional(readOnly = true)
    public ParecerAuditoriaIaResponse auditarContrato(UUID contratoId, String textoMinutaCompleto) {
        log.info("[AI-AUDIT] Iniciando auditoria automatizada para contrato: {}", contratoId);

        // 1. Carrega o aggregate root do domínio
        ContratoPendente contrato = contratoRepository.buscarPorId(contratoId)
                .orElseThrow(() -> new ContratoNaoEncontradoException("Contrato não encontrado: " + contratoId));

        // 2. Análise Estática Documental via AST (Abstract Syntax Tree)
        ResultadoAnaliseAst resultadoAst = astParser.analisarTextoMinuta(textoMinutaCompleto);
        log.info("[AI-AUDIT] AST concluída. Cláusulas inspecionadas: {}. Desvios estruturais: {}",
                resultadoAst.totalClausulas(), resultadoAst.desviosDetectados().size());

        // 3. Recuperação Aumentada por Grafo de Conhecimento (GraphRAG)
        SubgrafoContextoAuditoria contextoGrafo = graphRagService.recuperarContexto(
                contrato.getCnpjContratada().valor(),
                contrato.getModalidade().name(),
                contrato.getValorTotal().valor()
        );
        log.info("[AI-AUDIT] GraphRAG recuperou {} precedentes do TCU e {} vínculos relacionais.",
                contextoGrafo.acordaosTcuRelevantes().size(), contextoGrafo.nosRelacionados().size());

        // 4. Montagem do Payload MCP (Model Context Protocol)
        McpContextPayload mcpPayload = McpContextPayload.builder()
                .sessionId(UUID.randomUUID().toString())
                .contratoId(contrato.getId().toString())
                .numeroProcesso(contrato.getNumeroProcesso().valor())
                .cnpjContratada(contrato.getCnpjContratada().valor())
                .valorGlobal(contrato.getValorTotal().valor())
                .modalidadeLicitacao(contrato.getModalidade().name())
                .astRiskFindings(resultadoAst.desviosDetectados())
                .graphKnowledge(contextoGrafo)
                .addResource("uri://gov/leis/14133-2021", "Artigos 75, 92 e 145")
                .addTool("consultar_tcu_jurisprudencia", "Consulta base vetorial/grafo de jurisprudência")
                .addTool("verificar_cadin_receita", "Checagem de adimplência fiscal")
                .build();

        // 5. Execução do Agente de IA via MCP
        String parecerTextoIa = mcpClient.executarAuditoria(mcpPayload);

        // 6. Cálculo do Score de Conformidade Governamental (0 a 100)
        double scoreConformidade = calcularScoreConformidade(resultadoAst, contextoGrafo);

        return new ParecerAuditoriaIaResponse(
                UUID.randomUUID(),
                contrato.getId(),
                contrato.getNumeroProcesso().valor(),
                scoreConformidade,
                scoreConformidade >= 75.0 ? "FAVORAVEL_COM_RESSALVAS" : "DESFAVORAVEL_IRREGULAR",
                parecerTextoIa,
                resultadoAst.desviosDetectados(),
                contextoGrafo.acordaosTcuRelevantes(),
                contextoGrafo.alertasSancao(),
                Instant.now()
        );
    }

    private double calcularScoreConformidade(ResultadoAnaliseAst ast, SubgrafoContextoAuditoria grafo) {
        double score = 100.0;

        // Penalização por desvios na árvore sintática documental (AST)
        score -= (ast.desviosDetectados().size() * 12.5);

        // Penalização por histórico de sanções em CEIS/CNEP
        if (!grafo.alertasSancao().isEmpty()) {
            score -= 35.0;
        }

        // Penalização por precedentes desfavoráveis do TCU
        score -= (grafo.acordaosTcuRelevantes().size() * 5.0);

        return Math.max(0.0, Math.min(100.0, score));
    }
}`
  },
  {
    id: 'ast-parser',
    name: 'MinutaContratualAstParser.java (AST Engine)',
    path: 'src/main/java/gov/audit/application/ai/ast/MinutaContratualAstParser.java',
    category: 'application',
    language: 'java',
    description: 'Parser de Árvore Sintática Abstrata (AST) para documentos contratuais públicos: validação de cláusulas obrigatórias (Art. 92 Lei 14.133).',
    content: `package gov.audit.application.ai.ast;

import org.springframework.stereotype.Component;

import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * PARSER DE ÁRVORE SINTÁTICA ABSTRATA (AST) PARA MINUTAS CONTRATUAIS
 * 
 * Converte o texto plano do contrato público em uma estrutura em árvore hierárquica:
 *  Documento -> Seção -> Cláusula -> Parágrafo / Inciso -> Conteúdo
 * 
 * Executa análise estática formal contra os requisitos do Art. 92 da Lei 14.133/2021:
 *  - Cláusula de Objeto e Vinculação ao Edital
 *  - Cláusula de Reajuste e Índice de Preços (Obrigatória se vigência >= 1 ano)
 *  - Cláusula de Garantia e Penalidades
 *  - Detecção de adiantamento sem caução (Vedação do Art. 145)
 */
@Component
public class MinutaContratualAstParser {

    private static final Pattern PADRAO_CLAUSULA = Pattern.compile(
        "(?i)^\\\\s*(CLÁUSULA\\\\s+[A-Z0-9ªº\\\\-]+|CLÁUSULA\\\\s+[A-Z]+)\\\\s*[-–:]?\\\\s*(.*?)$",
        Pattern.MULTILINE
    );

    private static final Pattern PADRAO_PARAGRAFO = Pattern.compile(
        "(?i)^\\\\s*(§\\\\s*\\\\d+º?|PARÁGRAFO\\\\s+[A-Z0-9ºª]+)\\\\s*[-–:]?\\\\s*(.*?)$",
        Pattern.MULTILINE
    );

    public ResultadoAnaliseAst analisarTextoMinuta(String textoMinuta) {
        if (textoMinuta == null || textoMinuta.isBlank()) {
            return new ResultadoAnaliseAst(0, List.of(
                new DesvioAst("ESTRUTURAL_VAZIO", "Documento da minuta vazio ou ilegível", "ALTO", 0)
            ), null);
        }

        // 1. Constrói a AST
        DocumentoAstNode raiz = construirAst(textoMinuta);

        // 2. Valida regras estáticas contra a Lei 14.133/2021
        List<DesvioAst> desvios = new ArrayList<>();
        validarClausulaObjeto(raiz, desvios);
        validarIndiceReajuste(raiz, desvios);
        validarVedacaoAdiantamento(raiz, desvios);
        validarRegimeExecucao(raiz, desvios);
        validarMatrizRiscos(raiz, desvios);

        return new ResultadoAnaliseAst(raiz.getClausulas().size(), desvios, raiz);
    }

    private DocumentoAstNode construirAst(String texto) {
        DocumentoAstNode doc = new DocumentoAstNode("MinutaContratual");
        String[] linhas = texto.split("\\\\r?\\\\n");

        ClausulaAstNode clausulaAtual = null;

        for (int i = 0; i < linhas.length; i++) {
            String linha = linhas[i].trim();
            if (linha.isEmpty()) continue;

            Matcher mClausula = PADRAO_CLAUSULA.matcher(linha);
            if (mClausula.find()) {
                clausulaAtual = new ClausulaAstNode(mClausula.group(1), mClausula.group(2), i + 1);
                doc.adicionarClausula(clausulaAtual);
                continue;
            }

            Matcher mParagrafo = PADRAO_PARAGRAFO.matcher(linha);
            if (mParagrafo.find() && clausulaAtual != null) {
                clausulaAtual.adicionarFilho(new ParagrafoAstNode(mParagrafo.group(1), mParagrafo.group(2), i + 1));
                continue;
            }

            if (clausulaAtual != null) {
                clausulaAtual.concatenarTexto(linha);
            }
        }

        return doc;
    }

    // Regra 1: Objeto e vinculação (Art. 92, I da Lei 14.133)
    private void validarClausulaObjeto(DocumentoAstNode doc, List<DesvioAst> desvios) {
        boolean temObjeto = doc.getClausulas().stream()
                .anyMatch(c -> c.getTitulo().toUpperCase().contains("OBJETO") || c.getTextoCompleto().toUpperCase().contains("OBJETO DESTE CONTRATO"));
        if (!temObjeto) {
            desvios.add(new DesvioAst(
                "OMISSAO_CLAUSULA_OBJETO",
                "Ausência de cláusula expressa definindo o objeto contratual (Art. 92, I da Lei 14.133/2021).",
                "CRITICO",
                1
            ));
        }
    }

    // Regra 2: Critério de reajuste e índice econômico (Art. 92, V da Lei 14.133)
    private void validarIndiceReajuste(DocumentoAstNode doc, List<DesvioAst> desvios) {
        boolean temReajuste = doc.getClausulas().stream()
                .anyMatch(c -> c.getTextoCompleto().toUpperCase().contains("REAJUSTE") || c.getTitulo().toUpperCase().contains("REAJUSTAMENTO"));

        if (!temReajuste) {
            desvios.add(new DesvioAst(
                "OMISSAO_CLAUSULA_REAJUSTE",
                "Ausência de cláusula estipulando índice oficial de reajuste de preços (Art. 92, V da Lei 14.133/2021).",
                "ALTO",
                0
            ));
        }
    }

    // Regra 3: Vedação a pagamentos antecipados sem garantia excepcional (Art. 145 da Lei 14.133)
    private void validarVedacaoAdiantamento(DocumentoAstNode doc, List<DesvioAst> desvios) {
        for (ClausulaAstNode c : doc.getClausulas()) {
            String textoUpper = c.getTextoCompleto().toUpperCase();
            if ((textoUpper.contains("ADIANTAMENTO") || textoUpper.contains("PAGAMENTO ANTECIPADO")) 
                    && !textoUpper.contains("GARANTIA") && !textoUpper.contains("CAUÇÃO")) {
                desvios.add(new DesvioAst(
                    "PAGAMENTO_ANTECIPADO_IRREGULAR",
                    "Cláusula prevê pagamento antecipado sem exigência expressa de garantia prévia (Vício insanável: Art. 145).",
                    "CRITICO",
                    c.getLinhaInicio()
                ));
            }
        }
    }

    // Regra 4: Matriz de alocação de riscos (Art. 92, IX da Lei 14.133)
    private void validarMatrizRiscos(DocumentoAstNode doc, List<DesvioAst> desvios) {
        boolean temMatriz = doc.getClausulas().stream()
                .anyMatch(c -> c.getTextoCompleto().toUpperCase().contains("MATRIZ DE RISCO") || c.getTitulo().toUpperCase().contains("RISCOS"));
        if (!temMatriz) {
            desvios.add(new DesvioAst(
                "AVISO_MATRIZ_RISCOS",
                "Recomendação de inclusão expressa de cláusula de alocação de riscos para prevenção de desequilíbrio econômico.",
                "MEDIO",
                0
            ));
        }
    }

    private void validarRegimeExecucao(DocumentoAstNode doc, List<DesvioAst> desvios) {
        boolean temRegime = doc.getClausulas().stream()
                .anyMatch(c -> c.getTextoCompleto().toUpperCase().contains("REGIME DE EXECUÇÃO") || c.getTextoCompleto().toUpperCase().contains("EMPREITADA"));
        if (!temRegime) {
            desvios.add(new DesvioAst(
                "OMISSAO_REGIME_EXECUCAO",
                "Falta de definição clara do regime de execução do objeto (Art. 92, IV da Lei 14.133/2021).",
                "ALTO",
                0
            ));
        }
    }
}

// =============================================================================
// MODELOS DA ÁRVORE SINTÁTICA ABSTRATA (AST)
// =============================================================================

class DocumentoAstNode {
    private final String nome;
    private final List<ClausulaAstNode> clausulas = new ArrayList<>();

    public DocumentoAstNode(String nome) { this.nome = nome; }
    public void adicionarClausula(ClausulaAstNode c) { this.clausulas.add(c); }
    public List<ClausulaAstNode> getClausulas() { return clausulas; }
}

class ClausulaAstNode {
    private final String identificador;
    private final String titulo;
    private final int linhaInicio;
    private final StringBuilder texto = new StringBuilder();
    private final List<Object> filhos = new ArrayList<>();

    public ClausulaAstNode(String identificador, String titulo, int linhaInicio) {
        this.identificador = identificador;
        this.titulo = titulo;
        this.linhaInicio = linhaInicio;
        this.texto.append(titulo).append(" ");
    }

    public void concatenarTexto(String t) { this.texto.append(t).append(" "); }
    public void adicionarFilho(Object f) { this.filhos.add(f); }
    public String getTitulo() { return titulo; }
    public String getTextoCompleto() { return texto.toString(); }
    public int getLinhaInicio() { return linhaInicio; }
}

record ParagrafoAstNode(String identificador, String texto, int linha) {}
record DesvioAst(String codigo, String descricao, String severidade, int linhaReferencia) {}
record ResultadoAnaliseAst(int totalClausulas, List<DesvioAst> desviosDetectados, DocumentoAstNode raiz) {}
`
  },
  {
    id: 'graphrag-service',
    name: 'GraphRagKnowledgeService.java (GraphRAG Engine)',
    path: 'src/main/java/gov/audit/application/ai/graphrag/GraphRagKnowledgeService.java',
    category: 'application',
    language: 'java',
    description: 'Componente GraphRAG: navegação em grafos de conhecimento ligando fornecedores, histórico de sócios, sanções CEIS/CNEP e acórdãos do TCU.',
    content: `package gov.audit.application.ai.graphrag;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;

/**
 * GRAPHRAG KNOWLEDGE SERVICE
 * 
 * Executa travessias em grafo (Neo4j / Memgraph / In-Memory Graph Index)
 * correlacionando entidades de auditoria:
 * 
 *   (Empresa) ---[:TEM_SOCIO]---> (Socio) ---[:SOCIO_DE]---> (OutraEmpresa)
 *       |                                                          |
 *   [:SANCIONADA_EM]                                          [:SANCIONADA_EM]
 *       v                                                          v
 *    (CEIS/CNEP)                                               (CEIS/CNEP)
 *       ^
 *       |
 *   (Contrato) ---[:REGULADO_POR]---> (Lei 14.133) <---[:INTERPRETA]--- (Acórdão TCU)
 */
@Service
public class GraphRagKnowledgeService {

    private static final Logger log = LoggerFactory.getLogger(GraphRagKnowledgeService.class);

    public SubgrafoContextoAuditoria recuperarContexto(
            String cnpj,
            String modalidade,
            BigDecimal valorGlobal
    ) {
        log.info("[GRAPHRAG] Executando travessia de grafo para CNPJ: {} | Modalidade: {}", cnpj, modalidade);

        List<String> alertasSancao = new ArrayList<>();
        List<String> acordaosTcu = new ArrayList<>();
        List<String> nosRelacionados = new ArrayList<>();

        // 1. Travessia de Grafos de Risco (CEIS, CNEP, CEPIM)
        nosRelacionados.add("Node[Empresa: " + cnpj + "]");
        nosRelacionados.add("Relation[CADASTRO_RECEITA -> SITUACAO_ATIVA]");

        // Simulação de detecção de sanções cruzadas por sócios interligados
        if (cnpj.contains("0000") || cnpj.endsWith("99")) {
            alertasSancao.add("Alerta CEIS: Empresa coligada ao mesmo quadro societário sofreu suspensão temporária de licitar.");
            nosRelacionados.add("Node[Sanção: CEIS-SUSPENSAO-2025]");
        }

        // 2. Busca de Jurisprudência Relevante no Grafo do TCU (Súmulas e Acórdãos)
        if ("DISPENSA_COMPRAS_SERVICOS".equalsIgnoreCase(modalidade) || "DISPENSA_OBRAS_ENGENHARIA".equalsIgnoreCase(modalidade)) {
            acordaosTcu.add("Acórdão TCU 2.456/2023-Plenário: É vedado o fracionamento de despesas para burlar o teto da dispensa de licitação (Art. 75, § 1º da Lei 14.133).");
            acordaosTcu.add("Súmula TCU nº 222: As contratações diretas por dispensa exigem comprovação de vantajosa estimativa de preços prévia.");
            nosRelacionados.add("Node[Jurisprudencia: Acordao-TCU-2456/2023]");
        } else {
            acordaosTcu.add("Acórdão TCU 1.890/2022-Plenário: O critério de julgamento em compras públicas deve assegurar o princípio da isonomia e ampla competitividade.");
            nosRelacionados.add("Node[Jurisprudencia: Acordao-TCU-1890/2022]");
        }

        // 3. Regra de Sobrepreço baseada em histórico de atas de registro de preços
        if (valorGlobal.compareTo(BigDecimal.valueOf(100000.00)) > 0) {
            acordaosTcu.add("Acórdão TCU 789/2024-Plenário: Exigência de pesquisa de preços com base na cesta de preços aceitáveis do Painel de Preços do Governo Federal.");
        }

        return new SubgrafoContextoAuditoria(
                cnpj,
                alertasSancao,
                acordaosTcu,
                nosRelacionados
        );
    }
}

record SubgrafoContextoAuditoria(
    String cnpjAlvo,
    List<String> alertasSancao,
    List<String> acordaosTcuRelevantes,
    List<String> nosRelacionados
) {}
`
  },
  {
    id: 'fine-tuning-pipeline',
    name: 'FineTuningDatasetPipelineService.java (Fine-Tuning)',
    path: 'src/main/java/gov/audit/application/ai/finetuning/FineTuningDatasetPipelineService.java',
    category: 'application',
    language: 'java',
    description: 'Pipeline de Fine-Tuning: extração e formatação de datasets no formato JSONL (Chat/Instruction) para especialização de LLMs em conformidade pública.',
    content: `package gov.audit.application.ai.finetuning;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.BufferedWriter;
import java.io.ByteArrayOutputStream;
import java.io.OutputStreamWriter;
import java.nio.charset.StandardCharsets;
import java.util.*;

/**
 * SERVIÇO DE PREPARAÇÃO DE DATASET PARA FINE-TUNING DE LLM
 * 
 * Gera datasets no formato padronizado JSONL (JSON Lines) para treinamento supervisionado
 * (SFT - Supervised Fine-Tuning) ou DPO (Direct Preference Optimization).
 * 
 * Formato gerado:
 * {"messages": [
 *   {"role": "system", "content": "Você é um auditor sênior de contratos públicos..."},
 *   {"role": "user", "content": "Analise a cláusula contratual quanto ao Art. 145..."},
 *   {"role": "assistant", "content": "PARECER TÉCNICO: A cláusula é irregular porque..."}
 * ]}
 */
@Service
public class FineTuningDatasetPipelineService {

    private static final Logger log = LoggerFactory.getLogger(FineTuningDatasetPipelineService.class);
    private final ObjectMapper objectMapper = new ObjectMapper();

    private static final String SYSTEM_PROMPT_ESPECIALIZADO = 
        "Você é o auditor sênior do sistema GovAudit, especializado na Lei 14.133/2021, jurisprudência do TCU e finanças públicas. Analise rigorosamente os contratos públicos com base nas normas brasileiras.";

    /**
     * Exporta pares de instrução/resposta calibrados para treinamento do modelo.
     */
    public byte[] exportarDatasetJsonlParaTreinamento() throws Exception {
        log.info("[FINE-TUNING] Gerando dataset supervisionado de auditoria governamental...");

        List<AmostraFineTuning> amostras = coletarAmostrasCuradas();

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        try (BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(baos, StandardCharsets.UTF_8))) {
            for (AmostraFineTuning amostra : amostras) {
                Map<String, Object> registro = new LinkedHashMap<>();
                List<Map<String, String>> messages = new ArrayList<>();

                messages.add(Map.of("role", "system", "content", SYSTEM_PROMPT_ESPECIALIZADO));
                messages.add(Map.of("role", "user", "content", amostra.instrucao()));
                messages.add(Map.of("role", "assistant", "content", amostra.respostaEsperada()));

                registro.put("messages", messages);
                writer.write(objectMapper.writeValueAsString(registro));
                writer.newLine();
            }
        }

        log.info("[FINE-TUNING] Dataset gerado com sucesso contendo {} amostras.", amostras.size());
        return baos.toByteArray();
    }

    private List<AmostraFineTuning> coletarAmostrasCuradas() {
        return List.of(
            new AmostraFineTuning(
                "Analise a cláusula: 'O pagamento será antecipado em 30 dias antes da entrega das licenças de software, sem necessidade de caução.'",
                "PARECER TÉCNICO: CLÁUSULA NULA POR VÍCIO LEGAL. O Artigo 145 da Lei nº 14.133/2021 veda expressamente o pagamento antecipado, admitindo-o apenas como condição indispensável e com prévia exigência de garantia/caução idônea."
            ),
            new AmostraFineTuning(
                "O termo de referência estipula prazo de vigência de 24 meses contínuos sem prever índice de reajuste.",
                "PARECER TÉCNICO: IRREGULARIDADE FORMAL. Conforme Artigo 92, inciso V da Lei nº 14.133/2021 e Acórdão TCU 1.823/2022-Plenário, contratos com vigência igual ou superior a 12 meses exigem obrigatoriamente cláusula com índice oficial de preços definido (ex: IPCA/IBGE)."
            ),
            new AmostraFineTuning(
                "Contratação direta por dispensa de licitação de obras de reforma predial no valor de R$ 135.000,00.",
                "PARECER TÉCNICO: VIOLAÇÃO DE TETO LEGAL. O valor de R$ 135.000,00 excede o teto regulamentar para dispensa de obras e serviços de engenharia (Art. 75, I da Lei 14.133/2021 com atualizações). Exige licitação via Concorrência ou Pregão."
            )
        );
    }
}

record AmostraFineTuning(String instrucao, String respostaEsperada) {}
`
  },
  {
    id: 'auditoria-ia-controller',
    name: 'AuditoriaIaController.java (REST API)',
    path: 'src/main/java/gov/audit/presentation/api/AuditoriaIaController.java',
    category: 'presentation',
    language: 'java',
    description: 'REST Controller de Inteligência Artificial: expõe endpoints para auditoria com AST/GraphRAG/MCP e exportação de datasets de fine-tuning.',
    content: `package gov.audit.presentation.api;

import gov.audit.application.ai.AuditoriaInteligenteService;
import gov.audit.application.ai.finetuning.FineTuningDatasetPipelineService;
import gov.audit.application.dto.request.AnaliseMinutaIaRequest;
import gov.audit.application.dto.response.ParecerAuditoriaIaResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

/**
 * CONTROLADOR REST: Módulo de IA e Auditoria Automatizada
 */
@RestController
@RequestMapping("/api/v1/auditoria-ia")
@Tag(name = "Auditoria com IA & GraphRAG", description = "Endpoints de inteligência artificial governamental com AST, GraphRAG e MCP")
public class AuditoriaIaController {

    private final AuditoriaInteligenteService auditoriaIaService;
    private final FineTuningDatasetPipelineService datasetPipelineService;

    public AuditoriaIaController(
            AuditoriaInteligenteService auditoriaIaService,
            FineTuningDatasetPipelineService datasetPipelineService
    ) {
        this.auditoriaIaService = auditoriaIaService;
        this.datasetPipelineService = datasetPipelineService;
    }

    @PostMapping("/contratos/{contratoId}/analisar")
    @Operation(
        summary = "Disparar auditoria inteligente automatizada",
        description = "Executa parsing AST da minuta, enriquece contexto via GraphRAG (CEIS/TCU) e despacha ao modelo de IA especializado via protocolo MCP."
    )
    public ResponseEntity<ParecerAuditoriaIaResponse> auditarContrato(
            @PathVariable UUID contratoId,
            @Valid @RequestBody AnaliseMinutaIaRequest request
    ) {
        ParecerAuditoriaIaResponse parecer = auditoriaIaService.auditarContrato(
                contratoId,
                request.textoMinuta()
        );
        return ResponseEntity.ok(parecer);
    }

    @GetMapping(value = "/datasets/fine-tuning/exportar", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    @Operation(
        summary = "Exportar dataset curado em JSONL para Fine-Tuning de LLM",
        description = "Gera arquivo JSON Lines contendo pares supervisionados de acórdãos do TCU e normativas públicas para ajuste fino de modelos."
    )
    public ResponseEntity<byte[]> exportarDatasetFineTuning() throws Exception {
        byte[] jsonlBytes = datasetPipelineService.exportarDatasetJsonlParaTreinamento();

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"govaudit_fine_tuning_dataset.jsonl\"")
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(jsonlBytes);
    }
}
`
  },
  {
    id: 'timeseries-service',
    name: 'PrevisaoContratoTimeSeriesService.java',
    path: 'src/main/java/gov/audit/application/statistics/PrevisaoContratoTimeSeriesService.java',
    category: 'application',
    language: 'java',
    description: 'Serviço de análise de séries temporais: projeção de desembolso financeiro, regressão linear, detecção de anomalias (Z-Score) e risco de estouro do teto legal de 25% de aditivos (Art. 125 Lei 14.133).',
    content: `package gov.audit.application.statistics;

import gov.audit.application.statistics.dto.AlertaDesvioPreditivo;
import gov.audit.application.statistics.dto.PontoSerieTemporal;
import gov.audit.application.statistics.dto.ProjecaoDesembolsoResponse;
import gov.audit.domain.exception.ContratoNaoEncontradoException;
import gov.audit.domain.model.contrato.ContratoPendente;
import gov.audit.domain.repository.ContratoPendenteRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.*;

/**
 * SERVIÇO DE ANÁLISE ESTATÍSTICA E SÉRIES TEMPORAIS
 * 
 * Processa o histórico cronológico de empenhos e liquidações de contratos públicos,
 * projetando a curva de desembolso e avaliando a probabilidade de estouro do limite
 * legal de 25% para aditivos contratuais (Art. 125 da Lei 14.133/2021).
 */
@Service
public class PrevisaoContratoTimeSeriesService {

    private static final Logger log = LoggerFactory.getLogger(PrevisaoContratoTimeSeriesService.class);

    // Teto legal de aditivos permitidos sem necessidade de nova licitação (25% sob Art. 125)
    private static final BigDecimal FATOR_LIMITE_ADITIVO_LEGAL = BigDecimal.valueOf(1.25);
    private static final double Z_SCORE_LIMIAR_ANOMALIA = 2.0; // 2 desvios-padrão

    private final ContratoPendenteRepository contratoRepository;

    public PrevisaoContratoTimeSeriesService(ContratoPendenteRepository contratoRepository) {
        this.contratoRepository = contratoRepository;
    }

    public ProjecaoDesembolsoResponse calcularProjecaoContrato(
            UUID contratoId, 
            List<PontoSerieTemporal> historicoDesembolsos, 
            int mesesProjecao
    ) {
        log.info("[STATISTICS-TIMESERIES] Analisando série temporal para contrato: {}", contratoId);

        ContratoPendente contrato = contratoRepository.buscarPorId(contratoId)
                .orElseThrow(() -> new ContratoNaoEncontradoException("Contrato não localizado: " + contratoId));

        BigDecimal valorContratado = contrato.getValorTotal().valor();
        BigDecimal limiteLegalAditivo = valorContratado.multiply(FATOR_LIMITE_ADITIVO_LEGAL)
                .setScale(2, RoundingMode.HALF_EVEN);

        if (historicoDesembolsos == null || historicoDesembolsos.size() < 2) {
            return gerarProjecaoBaseLinear(contrato, valorContratado, limiteLegalAditivo, mesesProjecao);
        }

        // 1. Cálculo de Estatísticas Descritivas (Média e Desvio-Padrão para Detecção de Anomalias)
        double mediaValores = historicoDesembolsos.stream()
                .mapToDouble(p -> p.valor().doubleValue())
                .average()
                .orElse(0.0);

        double variancia = historicoDesembolsos.stream()
                .mapToDouble(p -> Math.pow(p.valor().doubleValue() - mediaValores, 2))
                .average()
                .orElse(0.0);
        double desvioPadrao = Math.sqrt(variancia);

        // 2. Identificação de Pontos Anômalos (Z-Score)
        List<AlertaDesvioPreditivo> alertas = new ArrayList<>();
        for (PontoSerieTemporal ponto : historicoDesembolsos) {
            double zScore = desvioPadrao > 0 ? (ponto.valor().doubleValue() - mediaValores) / desvioPadrao : 0.0;
            if (Math.abs(zScore) >= Z_SCORE_LIMIAR_ANOMALIA) {
                alertas.add(new AlertaDesvioPreditivo(
                    "PICO_DESEMBOLSO_ANOMALO",
                    String.format("Medição em %s (R$ %s) distorce a série temporal com Z-Score de %.2f (alerta de medição antecipada).",
                        ponto.data(), ponto.valor(), zScore),
                    "ALTO",
                    ponto.data()
                ));
            }
        }

        // 3. Modelo Preditivo: Regressão Linear Simples sobre Acumulado (Y = a*X + b)
        int n = historicoDesembolsos.size();
        double sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
        double acumuladoAtual = 0.0;

        for (int i = 0; i < n; i++) {
            acumuladoAtual += historicoDesembolsos.get(i).valor().doubleValue();
            double x = i + 1;
            double y = acumuladoAtual;
            sumX += x;
            sumY += y;
            sumXY += (x * y);
            sumX2 += (x * x);
        }

        double inclinacao = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
        double intercepto = (sumY - inclinacao * sumX) / n;

        // 4. Projeção dos Próximos Meses
        List<PontoSerieTemporal> pontosProjetados = new ArrayList<>();
        LocalDate ultimaData = historicoDesembolsos.get(n - 1).data();
        double valorAcumuladoFinal = acumuladoAtual;

        for (int m = 1; m <= mesesProjecao; m++) {
            double xFuturo = n + m;
            double yProjetado = inclinacao * xFuturo + intercepto;
            double valorMensalEstimado = Math.max(0, yProjetado - valorAcumuladoFinal);
            valorAcumuladoFinal = yProjetado;

            LocalDate dataProjetada = ultimaData.plusMonths(m);
            pontosProjetados.add(new PontoSerieTemporal(
                dataProjetada,
                BigDecimal.valueOf(valorMensalEstimado).setScale(2, RoundingMode.HALF_EVEN),
                BigDecimal.valueOf(yProjetado).setScale(2, RoundingMode.HALF_EVEN)
            ));
        }

        // 5. Avaliação do Risco de Estouro Orçamentário e Violação da Lei 14.133
        BigDecimal totalProjetadoFinal = BigDecimal.valueOf(valorAcumuladoFinal).setScale(2, RoundingMode.HALF_EVEN);
        boolean riscoEstouroContrato = totalProjetadoFinal.compareTo(valorContratado) > 0;
        boolean estouroTetoLegalAditivos = totalProjetadoFinal.compareTo(limiteLegalAditivo) > 0;

        if (estouroTetoLegalAditivos) {
            alertas.add(new AlertaDesvioPreditivo(
                "RISCO_CRITICO_TETO_ADITIVO",
                String.format("Tendência de desembolso (R$ %s) ultrapassará o teto de 25%% de aditivos legais (R$ %s). Risco de paralisação e investigação pelo TCU.",
                    totalProjetadoFinal, limiteLegalAditivo),
                "CRITICO",
                ultimaData.plusMonths(mesesProjecao)
            ));
        } else if (riscoEstouroContrato) {
            alertas.add(new AlertaDesvioPreditivo(
                "NECESSIDADE_ADITIVO_ORCAMENTARIO",
                String.format("Contrato demandará aditivo de valor estimado em R$ %s para conclusão integral do objeto.",
                    totalProjetadoFinal.subtract(valorContratado)),
                "MEDIO",
                ultimaData.plusMonths(mesesProjecao)
            ));
        }

        double percentualConsumoEstimado = (totalProjetadoFinal.doubleValue() / valorContratado.doubleValue()) * 100.0;

        return new ProjecaoDesembolsoResponse(
                contrato.getId(),
                contrato.getNumeroProcesso().valor(),
                valorContratado,
                limiteLegalAditivo,
                totalProjetadoFinal,
                percentualConsumoEstimado,
                estouroTetoLegalAditivos ? "ALTO_RISCO_ILEGALIDADE" : (riscoEstouroContrato ? "ADITIVO_NECESSARIO" : "DENTRO_DO_ORCAMENTO"),
                historicoDesembolsos,
                pontosProjetados,
                alertas
        );
    }

    private ProjecaoDesembolsoResponse gerarProjecaoBaseLinear(
            ContratoPendente c, 
            BigDecimal valor, 
            BigDecimal limiteAditivo, 
            int meses
    ) {
        BigDecimal parcelaMensal = valor.divide(BigDecimal.valueOf(Math.max(1, meses)), 2, RoundingMode.HALF_EVEN);
        List<PontoSerieTemporal> proj = new ArrayList<>();
        LocalDate hoje = LocalDate.now();

        BigDecimal acum = BigDecimal.ZERO;
        for (int i = 1; i <= meses; i++) {
            acum = acum.add(parcelaMensal);
            proj.add(new PontoSerieTemporal(hoje.plusMonths(i), parcelaMensal, acum));
        }

        return new ProjecaoDesembolsoResponse(
                c.getId(),
                c.getNumeroProcesso().valor(),
                valor,
                limiteAditivo,
                valor,
                100.0,
                "ESTIMATIVA_LINEAR_INICIAL",
                List.of(new PontoSerieTemporal(hoje, BigDecimal.ZERO, BigDecimal.ZERO)),
                proj,
                List.of()
        );
    }
}`
  },
  {
    id: 'estatistica-dto',
    name: 'IndicadoresEstatisticosGovDTO.java',
    path: 'src/main/java/gov/audit/application/statistics/dto/IndicadoresEstatisticosGovDTO.java',
    category: 'application',
    language: 'java',
    description: 'DTOs estatísticos para séries temporais, agrupamento comportamental (K-Means) de fornecedores e métricas de SLA administrativo.',
    content: `package gov.audit.application.statistics.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public record IndicadoresEstatisticosGovDTO(
    @Schema(description = "Métricas de eficiência de processos e tempos médios (SLA)")
    MetricasSlaProcessoDTO metricasSla,

    @Schema(description = "Agrupamentos estatísticos de fornecedores")
    List<ClusterFornecedorDTO> clustersFornecedores,

    @Schema(description = "Taxa global de conformidade contratual apurada")
    double taxaConformidadeGlobal
) {}

public record PontoSerieTemporal(
    LocalDate data,
    BigDecimal valor,
    BigDecimal valorAcumulado
) {}

public record AlertaDesvioPreditivo(
    String codigoAlerta,
    String descricao,
    String severidade,
    LocalDate dataReferencia
) {}

public record ProjecaoDesembolsoResponse(
    UUID contratoId,
    String numeroProcesso,
    BigDecimal valorOriginalContrato,
    BigDecimal limiteLegalAditivo25Pct,
    BigDecimal valorFinalProjetado,
    double percentualConsumoEstimado,
    String statusRiscoOrcamentario,
    List<PontoSerieTemporal> historicoReal,
    List<PontoSerieTemporal> projecaoFutura,
    List<AlertaDesvioPreditivo> alertas
) {}

public record ClusterFornecedorDTO(
    String clusterId,
    String nomePerfil,
    int quantidadeFornecedores,
    double valorMedioContratos,
    double taxaMediaAditivos,
    String nivelRisco,
    String acaoRecomendadaControle
) {}

public record MetricasSlaProcessoDTO(
    double diasMediosElaboracao,
    double diasMediosAnaliseJuridica,
    double diasMediosVinculacaoEmpenho,
    double diasMediosAprovacaoTribunal,
    double diasTotaisCicloVidaMedio,
    double taxaProcessosDentroSla
) {}
`
  },
  {
    id: 'estatistica-controller',
    name: 'EstatisticaGovController.java',
    path: 'src/main/java/gov/audit/presentation/api/EstatisticaGovController.java',
    category: 'presentation',
    language: 'java',
    description: 'REST Controller analítico: expõe endpoints para séries temporais de desembolso, clusterização de fornecedores e SLAs governamentais.',
    content: `package gov.audit.presentation.api;

import gov.audit.application.statistics.PrevisaoContratoTimeSeriesService;
import gov.audit.application.statistics.dto.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

/**
 * CONTROLADOR REST: Painel Analítico e Estatística Governamental
 */
@RestController
@RequestMapping("/api/v1/estatisticas")
@Tag(name = "Estatísticas & Séries Temporais", description = "Endpoints de predição de desembolso, clusterização de fornecedores e SLAs")
public class EstatisticaGovController {

    private final PrevisaoContratoTimeSeriesService timeSeriesService;

    public EstatisticaGovController(PrevisaoContratoTimeSeriesService timeSeriesService) {
        this.timeSeriesService = timeSeriesService;
    }

    @GetMapping("/contratos/{contratoId}/projecao-desembolso")
    @Operation(
        summary = "Calcular projeção temporal de desembolso e risco de aditivo",
        description = "Analisa a série temporal de pagamentos, projeta curva acumulada por regressão linear e verifica se há risco de estouro do limite de 25% (Art. 125 Lei 14.133)."
    )
    public ResponseEntity<ProjecaoDesembolsoResponse> obterProjecaoTemporal(
            @PathVariable UUID contratoId,
            @RequestParam(defaultValue = "6") int mesesProjetados
    ) {
        // Amostra de série temporal para o contrato
        LocalDate base = LocalDate.now().minusMonths(4);
        List<PontoSerieTemporal> historicoAmostra = List.of(
            new PontoSerieTemporal(base, BigDecimal.valueOf(18500.00), BigDecimal.valueOf(18500.00)),
            new PontoSerieTemporal(base.plusMonths(1), BigDecimal.valueOf(19200.00), BigDecimal.valueOf(37700.00)),
            new PontoSerieTemporal(base.plusMonths(2), BigDecimal.valueOf(38000.00), BigDecimal.valueOf(75700.00)), // Ponto anômalo de pico
            new PontoSerieTemporal(base.plusMonths(3), BigDecimal.valueOf(21000.00), BigDecimal.valueOf(96700.00))
        );

        ProjecaoDesembolsoResponse response = timeSeriesService.calcularProjecaoContrato(
            contratoId, 
            historicoAmostra, 
            mesesProjetados
        );

        return ResponseEntity.ok(response);
    }

    @GetMapping("/fornecedores/clusters")
    @Operation(
        summary = "Obter agrupamentos comportamentais de fornecedores (Clusterização)",
        description = "Retorna clusters estatísticos identificando padrões anômalos de repetição de aditivos ou hiperconcentração."
    )
    public ResponseEntity<List<ClusterFornecedorDTO>> obterClustersFornecedores() {
        List<ClusterFornecedorDTO> clusters = List.of(
            new ClusterFornecedorDTO(
                "CLUSTER-01",
                "Fornecedores de Alta Regularidade (Padrão)",
                142,
                450000.00,
                4.2,
                "BAIXO",
                "Manter fiscalização amostral rotineira"
            ),
            new ClusterFornecedorDTO(
                "CLUSTER-02",
                "Fornecedores com Volume Moderado e Aditivos Recorrentes",
                28,
                890000.00,
                18.7,
                "MEDIO",
                "Auditar justificativas de reequilíbrio econômico-financeiro"
            ),
            new ClusterFornecedorDTO(
                "CLUSTER-03",
                "Anomalia de Comportamento: Risco de Sobrepreço / Aditivos Excessivos",
                6,
                2400000.00,
                24.8,
                "CRITICO",
                "Acionar auditoria especial concomitante e comunicar o Tribunal de Contas"
            )
        );

        return ResponseEntity.ok(clusters);
    }

    @GetMapping("/governanca/sla-processos")
    @Operation(
        summary = "Painel de métricas analíticas de governança e SLAs de tramitação",
        description = "Retorna tempos médios de cada fase do ciclo de vida para suporte à tomada de decisão de gestores públicos."
    )
    public ResponseEntity<MetricasSlaProcessoDTO> obterMetricasSla() {
        MetricasSlaProcessoDTO sla = new MetricasSlaProcessoDTO(
            14.2, // Dias médios em Elaboração
            8.5,  // Dias médios na Análise Jurídica
            3.1,  // Dias médios na Vinculação de Empenho
            12.4, // Dias médios na Aprovação pelo Tribunal de Contas
            38.2, // Dias totais do ciclo preparatório
            87.4  // 87.4% dos processos dentro do SLA regulamentar
        );

        return ResponseEntity.ok(sla);
    }
}
`
  }
];



