---
id: architecture-server-fsd
type: reference
alwaysApply: false
---

# Server FSD — FSD для серверных приложений

[REFERENCE-BEGIN]

## TIER 1: Expert Role

<expert_role>
You are a Server FSD Architecture Specialist for TypeScript backend projects.

Responsibilities:

- Enforce Server FSD architecture rules with zero exceptions
- Ensure flexible layer naming adapted for backend (controllers, services, models)
- Validate modular units with facades and segments for complex modules
- Guide prohibition of cross-imports within layers
- Prioritize encapsulation and custom layer hierarchy for server applications

**ВАЖНО: Все ответы должны быть на русском языке.**
</expert_role>

<expert_completion_criteria>
Expert role clearly defines responsibilities specific to Server FSD architecture and includes Russian language requirement for responses.
</expert_completion_criteria>

## TIER 2: Purpose and Application

<exception_handling>
When working with Server FSD architecture, the following exceptional situations are possible:

- Project exceeds layer limit (more than 7) → simplification or migration to layered_library
- Hierarchy violation → immediate correction of dependencies between layers
- Mixing frontend/backend layers → strict check for server layers (controllers, services)
- Uncertainty in layer naming → priority to meaningful names by domain

Fix priorities:

1. **Critical:** Fix immediately (cross-imports in layers)
2. **Medium:** Plan layer refactoring
3. **Low:** Document custom layers
   </exception_handling>

<algorithm_motivation>
Server FSD architecture adapts FSD principles for server applications, providing flexible layering and modularity, simplifying backend scaling without breaking encapsulation.
</algorithm_motivation>

<cognitive_triggers>
Let's determine step by step if the project is suitable for Server FSD architecture by analyzing application type, layers, and modularity.
</cognitive_triggers>

<architecture_scope>
Server FSD — FSD-like architecture for server and console applications with arbitrary layer names adapted for backend. Within layers — module units with facades and segments.
**Purpose:** Node.js servers, API, CLI, microservices.
**Key principle:** Flexible layers (controllers, services), cross-import prohibition, facades for modules.
</architecture_scope>

<scope_completion_criteria>
Architecture scope clearly defines purpose, key principle, and decision criteria for Server FSD usage.
</scope_completion_criteria>

### Architecture Selection Algorithm

<algorithm_steps>

1. **Type analysis:** Determine if project is server-side/CLI (Node.js, Express, CLI)
2. **Layer count:**
    - Unix/Linux: `find src -type d -maxdepth 1 | grep -v __tests__ | wc -l` (excluding src)
    - Check for server layers (controllers, services)
3. **Modularity assessment:** Check facades in modules and absence of cross-imports
4. **Decision making:** Apply architecture selection rules

</algorithm_steps>

If project contains:

- ✓ Server-side/CLI code without UI
- ✓ 3–7 custom layers (controllers, services, models)
- ✓ Module units with facades
- ✓ Absence of cross-imports in layers

### → Server FSD

Otherwise → layered_library (for libraries) or fsd_standard (for frontend)

<step_completion_criteria>
Algorithm is clearly structured with step-by-step instructions and decision criteria for Server FSD.
</step_completion_criteria>

<exception_handling>

If layers are in borderline zone (2–3), conduct additional analysis:

- If layers are thematically server-side → Server FSD
- If universal → layered_library
- If uncertain → choose Server FSD for backend

If more than 7 layers → must simplify or split project.

</exception_handling>

### Quick Suitability Check

| **Condition** | **✅ Suitable**                | **❌ Not Suitable**     |
| ----------- | ------------------------------ | ---------------------- |
| Project Type | Server/CLI (Node.js, API)      | Frontend/UI            |
| Layers        | 3–7 custom (controllers)    | FSD standard or <3    |
| Modularity | With facades, without cross-imports | Flat structure      |
| Purpose  | API servers, microservices      | Component libraries |

### Key Characteristics

- **Server adaptation:** Layers adapted for backend (controllers, services, models, routes)
- **Flexible layering:** Arbitrary layer names by project needs
- **Module units:** Each module has `index.ts` facade
- **Cross-import prohibition:** Modules of same layer do not import each other
- **Segmentation:** Complex modules are divided into segments
- **Entry point:** `src/index.ts` or `src/app/index.ts`

### Typical Server Layers

| **Layer**       | **Purpose**           | **Content**                 |
| -------------- | ------------------------ | ------------------------------ |
| `controllers`  | HTTP controllers and routes | REST API endpoints, middleware |
| `services`     | Business logic and services  | Business processes, workflow      |
| `models`       | Data models and schemas    | TypeScript types, Zod schemas     |
| `repositories` | Data access          | Database queries, ORM          |
| `middleware`   | Middleware         | Auth, logging, validation      |
| `config`       | Application configuration  | Environment, settings          |
| `utils`        | Utilities and helpers        | Helper functions        |
| `adapters`     | External system adapters  | External API clients           |
| `gateways`     | External service gateways | Database, message queues       |

## TIER 3: Project Structure

<output_format>

When describing project structure, use XML schema with clear file roles and purposes. For each element specify:

- `name` — file/directory name
- `role` — role (layer, module, facade, segment, function, types, unit_test)
- `purpose` — purpose
- `exports` — what it exports (for facades)

</output_format>

<cognitive_triggers>
Let's analyze mandatory Server FSD structure step by step, starting with layers, adding modules and segments.
</cognitive_triggers>

### Basic Structure

```xml
<package_root>
  <source_directory name="src">
    <entrypoint name="index.ts" purpose="Точка входа сервера" />
    <layer name="controllers" purpose="HTTP контроллеры">
      <module name="auth">
        <facade name="index.ts" role="unit_facade" purpose="Фасад модуля" exports="authController" />
        <file name="auth-controller.ts" role="function" purpose="Контроллер аутентификации" />
        <segment name="middleware" purpose="Middleware">
          <file name="auth-middleware.ts" role="function" purpose="Middleware аутентификации" />
        </segment>
        <directory name="__tests__" purpose="Тесты модуля">
          <test name="auth.test.ts" role="unit_test" />
        </directory>
      </module>
      <module name="users">
        <facade name="index.ts" role="unit_facade" exports="usersController" />
        <file name="users-controller.ts" role="function" purpose="Контроллер пользователей" />
        <directory name="__tests__">
          <test name="users.test.ts" role="unit_test" />
        </directory>
      </module>
    </layer>
    <layer name="services" purpose="Бизнес-логика">
      <module name="auth-service">
        <facade name="index.ts" role="unit_facade" exports="authService" />
        <segment name="workflows" purpose="Процессы">
          <file name="login-workflow.ts" role="workflow" purpose="Workflow логина" />
        </segment>
        <directory name="__tests__">
          <test name="auth-service.test.ts" role="unit_test" />
        </directory>
      </module>
      <module name="user-service">
        <facade name="index.ts" role="unit_facade" exports="userService" />
        <segment name="workflows" purpose="Процессы">
          <file name="user-workflow.ts" role="workflow" />
        </segment>
        <directory name="__tests__">
          <test name="user-service.test.ts" role="unit_test" />
        </directory>
      </module>
    </layer>
    <layer name="models" purpose="Модели данных">
      <module name="user">
        <facade name="index.ts" role="unit_facade" exports="type User" />
        <file name="user-types.ts" role="types" purpose="Типы пользователя" />
        <file name="user-schemas.ts" role="schemas" purpose="Схемы пользователя" />
        <directory name="__tests__">
          <test name="user.test.ts" role="unit_test" />
        </directory>
      </module>
      <module name="auth">
        <facade name="index.ts" role="unit_facade" exports="type AuthData" />
        <file name="auth-types.ts" role="types" />
        <directory name="__tests__">
          <test name="auth.test.ts" role="unit_test" />
        </directory>
      </module>
    </layer>
    <layer name="repositories" purpose="Доступ к данным">
      <module name="user-repository">
        <facade name="index.ts" role="unit_facade" exports="userRepository" />
        <segment name="queries" purpose="Запросы">
          <file name="user-queries.ts" role="function" purpose="Запросы к БД" />
        </segment>
        <directory name="__tests__">
          <test name="user-repository.test.ts" role="unit_test" />
        </directory>
      </module>
      <module name="auth-repository">
        <facade name="index.ts" role="unit_facade" exports="authRepository" />
        <segment name="queries" purpose="Запросы">
          <file name="auth-queries.ts" role="function" />
        </segment>
        <directory name="__tests__">
          <test name="auth-repository.test.ts" role="unit_test" />
        </directory>
      </module>
    </layer>
    <layer name="middleware" purpose="Промежуточное ПО">
      <module name="auth">
        <facade name="index.ts" role="unit_facade" exports="authMiddleware" />
        <file name="auth-middleware.ts" role="function" purpose="Middleware аутентификации" />
        <directory name="__tests__">
          <test name="auth-middleware.test.ts" role="unit_test" />
        </directory>
      </module>
      <module name="logging">
        <facade name="index.ts" role="unit_facade" exports="loggingMiddleware" />
        <file name="logging-middleware.ts" role="function" purpose="Middleware логирования" />
        <directory name="__tests__">
          <test name="logging.test.ts" role="unit_test" />
        </directory>
      </module>
    </layer>
    <layer name="config" purpose="Конфигурация">
      <module name="database">
        <facade name="index.ts" role="unit_facade" exports="dbConfig" />
        <directory name="__tests__">
          <test name="db-config.test.ts" role="unit_test" />
        </directory>
      </module>
      <module name="app">
        <facade name="index.ts" role="unit_facade" exports="appConfig" />
        <directory name="__tests__">
          <test name="app-config.test.ts" role="unit_test" />
        </directory>
      </module>
    </layer>
    <layer name="utils" purpose="Утилиты">
      <module name="validation">
        <facade name="index.ts" role="unit_facade" exports="validateInput" />
        <directory name="__tests__">
          <test name="validation.test.ts" role="unit_test" />
        </directory>
      </module>
      <module name="helpers">
        <facade name="index.ts" role="unit_facade" exports="formatDate" />
        <directory name="__tests__">
          <test name="helpers.test.ts" role="unit_test" />
        </directory>
      </module>
    </layer>
  </source_directory>
</package_root>
```

<structure_completion_criteria>
Structure is clearly defined with XML schema, element roles and purposes for Server FSD.
</structure_completion_criteria>

### Example Architecture for Console Application

```xml
<package_root>
  <source_directory name="src">
    <entrypoint name="index.ts" purpose="Точка входа CLI" />
    <layer name="commands" purpose="CLI команды">
      <module name="migrate">
        <facade name="index.ts" role="unit_facade" exports="migrateCommand" />
        <file name="migrate-command.ts" role="workflow" />
        <segment name="handlers" purpose="Обработчики">
          <file name="database-migrate.ts" role="function" />
        </segment>
        <directory name="__tests__">
          <test name="migrate.test.ts" role="unit_test" />
        </directory>
      </module>
      <module name="seed">
        <facade name="index.ts" role="unit_facade" exports="seedCommand" />
        <file name="seed-command.ts" role="workflow" />
        <directory name="__tests__">
          <test name="seed.test.ts" role="unit_test" />
        </directory>
      </module>
    </layer>
    <layer name="services" purpose="Бизнес-сервисы">
      <module name="database">
        <facade name="index.ts" role="unit_facade" exports="dbService" />
        <file name="connection.ts" role="function" />
        <segment name="migrations" purpose="Миграции">
          <file name="migration-runner.ts" role="workflow" />
        </segment>
        <directory name="__tests__">
          <test name="db-service.test.ts" role="unit_test" />
        </directory>
      </module>
      <module name="file-system">
        <facade name="index.ts" role="unit_facade" exports="fsService" />
        <directory name="__tests__">
          <test name="fs-service.test.ts" role="unit_test" />
        </directory>
      </module>
    </layer>
    <layer name="models" purpose="Модели">
      <module name="migration">
        <facade name="index.ts" role="unit_facade" exports="type Migration" />
        <file name="migration-types.ts" role="types" />
        <directory name="__tests__">
          <test name="migration.test.ts" role="unit_test" />
        </directory>
      </module>
      <module name="config">
        <facade name="index.ts" role="unit_facade" exports="type Config" />
        <file name="config-types.ts" role="types" />
        <directory name="__tests__">
          <test name="config.test.ts" role="unit_test" />
        </directory>
      </module>
    </layer>
    <layer name="adapters" purpose="Адаптеры">
      <module name="database">
        <facade name="index.ts" role="unit_facade" exports="postgresAdapter" />
        <file name="postgres-adapter.ts" role="function" />
        <directory name="__tests__">
          <test name="db-adapter.test.ts" role="unit_test" />
        </directory>
      </module>
      <module name="file-system">
        <facade name="index.ts" role="unit_facade" exports="fsAdapter" />
        <file name="fs-adapter.ts" role="function" />
        <directory name="__tests__">
          <test name="fs-adapter.test.ts" role="unit_test" />
        </directory>
      </module>
    </layer>
    <layer name="config" purpose="Конфигурация">
      <module name="cli">
        <facade name="index.ts" role="unit_facade" exports="cliConfig" />
        <file name="cli-config.ts" role="config" />
        <directory name="__tests__">
          <test name="cli-config.test.ts" role="unit_test" />
        </directory>
      </module>
      <module name="app">
        <facade name="index.ts" role="unit_facade" exports="appConfig" />
        <file name="app-config.ts" role="config" />
        <directory name="__tests__">
          <test name="app-config.test.ts" role="unit_test" />
        </directory>
      </module>
    </layer>
    <layer name="utils" purpose="Утилиты">
      <module name="logger">
        <facade name="index.ts" role="unit_facade" exports="logger" />
        <directory name="__tests__">
          <test name="logger.test.ts" role="unit_test" />
        </directory>
      </module>
      <module name="helpers">
        <facade name="index.ts" role="unit_facade" exports="formatDate" />
        <directory name="__tests__">
          <test name="helpers.test.ts" role="unit_test" />
        </directory>
      </module>
    </layer>
  </source_directory>
</package_root>
```

## TIER 4: Rules and Constraints

### ✅ Requirements

- [ ] **Module facades:** Each module has `index.ts` as Public API
- [ ] **Cross-import prohibition:** Modules of same layer do not import each other
- [ ] **Segment organization:** Complex modules are divided into segments
- [ ] **Named exports:** Only named exports
- [ ] **Encapsulation:** Internal module details are hidden
- [ ] **Tests nearby:** Tests in `__tests__/` at module level

### ❌ Forbidden

- Cross-imports between modules of same layer
- Direct import from internal parts of modules
- Export of auxiliary elements through main facades
- `Default` exports
- Cyclic dependencies between layers

### Layer Recommendations

- **Define hierarchy:** Establish clear dependency hierarchy between layers
- **Document rules:** Explicitly describe in team which layer can depend on which
- **Limit quantity:** No more than 5-7 layers to maintain simplicity
- **Meaningful names:** Use project domain terminology

### Risk Assessment

<cognitive_triggers>
Let's analyze potential risks when using Server FSD architecture and ways to mitigate them.
</cognitive_triggers>

**Potential problems and solutions:**

| **Risk**                  | **Symptoms**                | **Mitigation**                                         |
| ------------------------- | --------------------------- | ----------------------------------------------------- |
| Layer hierarchy violation  | Incorrect dependencies    | ESLint: import rules by layers + dependency graph |
| Layer limit exceeded          | >7 layers, complexity         | Simplification or migration to layered_library             |
| Cross-imports in layers     | Imports between modules of layer | Prohibition in ESLint + module refactoring                 |
| Meaningless layer names | Mixed responsibilities   | Documentation + team review of layers                      |

<risk_completion_criteria>
Risk Assessment contains specific risks, their symptoms, and mitigation methods for Server FSD.
</risk_completion_criteria>

## TIER 5: Usage Examples

### API Server with Controllers and Services

**Description:** REST API server for user authentication

```xml
<package_root>
  <source_directory name="src">
    <entrypoint name="index.ts" purpose="Точка входа сервера" />
    <layer name="controllers" purpose="HTTP контроллеры">
      <module name="auth">
        <facade name="index.ts" role="unit_facade" exports="authController" />
        <file name="auth-controller.ts" role="function" purpose="Контроллер аутентификации" />
        <segment name="middleware" purpose="Middleware">
          <file name="auth-middleware.ts" role="function" purpose="Middleware аутентификации" />
        </segment>
        <directory name="__tests__">
          <test name="auth.test.ts" role="unit_test" />
        </directory>
      </module>
    </layer>
    <layer name="services" purpose="Бизнес-логика">
      <module name="auth-service">
        <facade name="index.ts" role="unit_facade" exports="authService" />
        <segment name="workflows" purpose="Процессы">
          <file name="login-workflow.ts" role="workflow" purpose="Workflow логина" />
        </segment>
        <directory name="__tests__">
          <test name="auth-service.test.ts" role="unit_test" />
        </directory>
      </module>
    </layer>
    <layer name="models" purpose="Модели данных">
      <module name="user">
        <facade name="index.ts" role="unit_facade" exports="type User" />
        <file name="user-types.ts" role="types" />
        <file name="user-schemas.ts" role="schemas" />
        <directory name="__tests__">
          <test name="user.test.ts" role="unit_test" />
        </directory>
      </module>
    </layer>
    <layer name="repositories" purpose="Доступ к данным">
      <module name="user-repository">
        <facade name="index.ts" role="unit_facade" exports="userRepository" />
        <segment name="queries" purpose="Запросы">
          <file name="user-queries.ts" role="function" />
        </segment>
        <directory name="__tests__">
          <test name="user-repository.test.ts" role="unit_test" />
        </directory>
      </module>
    </layer>
  </source_directory>
</package_root>
```

### CLI Utility for Database Migrations

**Description:** Console application for managing migrations

```xml
<package_root>
  <source_directory name="src">
    <entrypoint name="index.ts" purpose="Точка входа CLI" />
    <layer name="commands" purpose="CLI команды">
      <module name="migrate">
        <facade name="index.ts" role="unit_facade" exports="migrateCommand" />
        <file name="migrate-command.ts" role="workflow" />
        <segment name="handlers" purpose="Обработчики">
          <file name="database-migrate.ts" role="function" />
        </segment>
        <directory name="__tests__">
          <test name="migrate.test.ts" role="unit_test" />
        </directory>
      </module>
      <module name="seed">
        <facade name="index.ts" role="unit_facade" exports="seedCommand" />
        <file name="seed-command.ts" role="workflow" />
        <directory name="__tests__">
          <test name="seed.test.ts" role="unit_test" />
        </directory>
      </module>
    </layer>
    <layer name="services" purpose="Бизнес-сервисы">
      <module name="database">
        <facade name="index.ts" role="unit_facade" exports="dbService" />
        <file name="connection.ts" role="function" />
        <segment name="migrations" purpose="Миграции">
          <file name="migration-runner.ts" role="workflow" />
        </segment>
        <directory name="__tests__">
          <test name="db-service.test.ts" role="unit_test" />
        </directory>
      </module>
      <module name="file-system">
        <facade name="index.ts" role="unit_facade" exports="fsService" />
        <directory name="__tests__">
          <test name="fs-service.test.ts" role="unit_test" />
        </directory>
      </module>
    </layer>
    <layer name="models" purpose="Модели">
      <module name="migration">
        <facade name="index.ts" role="unit_facade" exports="type Migration" />
        <file name="migration-types.ts" role="types" />
        <directory name="__tests__">
          <test name="migration.test.ts" role="unit_test" />
        </directory>
      </module>
      <module name="config">
        <facade name="index.ts" role="unit_facade" exports="type Config" />
        <file name="config-types.ts" role="types" />
        <directory name="__tests__">
          <test name="config.test.ts" role="unit_test" />
        </directory>
      </module>
    </layer>
    <layer name="adapters" purpose="Адаптеры">
      <module name="database">
        <facade name="index.ts" role="unit_facade" exports="postgresAdapter" />
        <file name="postgres-adapter.ts" role="function" />
        <directory name="__tests__">
          <test name="db-adapter.test.ts" role="unit_test" />
        </directory>
      </module>
      <module name="file-system">
        <facade name="index.ts" role="unit_facade" exports="fsAdapter" />
        <file name="fs-adapter.ts" role="function" />
        <directory name="__tests__">
          <test name="fs-adapter.test.ts" role="unit_test" />
        </directory>
      </module>
    </layer>
    <layer name="config" purpose="Конфигурация">
      <module name="cli">
        <facade name="index.ts" role="unit_facade" exports="cliConfig" />
        <file name="cli-config.ts" role="config" />
        <directory name="__tests__">
          <test name="cli-config.test.ts" role="unit_test" />
        </directory>
      </module>
      <module name="app">
        <facade name="index.ts" role="unit_facade" exports="appConfig" />
        <file name="app-config.ts" role="config" />
        <directory name="__tests__">
          <test name="app-config.test.ts" role="unit_test" />
        </directory>
      </module>
    </layer>
    <layer name="utils" purpose="Утилиты">
      <module name="logger">
        <facade name="index.ts" role="unit_facade" exports="logger" />
        <directory name="__tests__">
          <test name="logger.test.ts" role="unit_test" />
        </directory>
      </module>
      <module name="helpers">
        <facade name="index.ts" role="unit_facade" exports="formatDate" />
        <directory name="__tests__">
          <test name="helpers.test.ts" role="unit_test" />
        </directory>
      </module>
    </layer>
  </source_directory>
</package_root>
```

**Note:** Layers adapted for CLI; tests next to modules.

## TIER 6: XML Schema for Validator

```xml
<package_root>
  <source_directory name="src">
    <entrypoint name="index.ts" />
    <layer name="controllers" purpose="HTTP контроллеры">
      <module name="auth">
        <facade name="index.ts" role="unit_facade" />
        <file name="auth-controller.ts" role="function" />
        <test name="__tests__/auth-controller.test.ts" role="unit_test" />
      </module>
    </layer>
    <layer name="services" purpose="бизнес-логика">
      <module name="auth-service">
        <facade name="index.ts" role="unit_facade" />
        <segment name="workflows" purpose="процессы">
          <file name="login-workflow.ts" role="workflow" />
        </segment>
      </module>
    </layer>
    <layer name="platform" purpose="инфраструктура">
      <module name="http-client">
        <facade name="index.ts" role="unit_facade" />
        <file name="client.ts" role="function" />
        <test name="__tests__/client.test.ts" role="unit_test" />
      </module>
    </layer>
  </source_directory>
</package_root>
```

## TIER 7: Metadata for Validator

### Full Validation

```xml
<architecture_metadata version="1" language="ts">
  <architecture_type>server_fsd</architecture_type>
  <scope>full</scope>
  <module_units>
    <unit path="src/presentation/auth" layer="presentation" />
    <unit path="src/business/auth-service" layer="business" />
    <unit path="src/platform/http-client" layer="platform" />
  </module_units>
  <entrypoints>
    <entrypoint path="src/index.ts" />
  </entrypoints>
  <ruleset>${PROJECT_NAME}-2025-10</ruleset>
</architecture_metadata>
```

### Partial Validation

```xml
<architecture_metadata version="1" language="ts">
  <architecture_type>server_fsd</architecture_type>
  <scope>partial</scope>
  <partial_root>src/presentation/auth</partial_root>
  <module_units>
    <unit path="src/presentation/auth" layer="presentation" />
  </module_units>
  <entrypoints>
    <entrypoint path="src/index.ts" />
  </entrypoints>
  <ruleset>${PROJECT_NAME}-2025-10</ruleset>
</architecture_metadata>
```

## TIER 8: Applicability and Validation

### ✅ Suitable for

- **Server applications** (Node.js, Express, Fastify, NestJS)
- **Console applications** (CLI utilities, scripts)
- **API servers** with REST/GraphQL endpoints
- **Microservices** with own architecture
- **Backend libraries** and SDK
- **Projects with unique architectural requirements**
- **Teams with established layer naming practices**

### ❌ Not suitable for

- **Frontend applications** (use `fsd_standard` or `fsd_domain`)
- **Simple utilities** (use `single_module`)
- **Component libraries** (use `layered_library`)
- **Projects without clear layered architecture**

<completion_criteria>
Document is fully ready for use: all Server FSD architecture rules are defined, structure examples provided, XML schemas for validator ready, metadata correct. Document complies with reference prompt standard and can be used for project architecture validation.
</completion_criteria>

[REFERENCE-END]
