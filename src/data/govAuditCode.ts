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
}`
  }
];
