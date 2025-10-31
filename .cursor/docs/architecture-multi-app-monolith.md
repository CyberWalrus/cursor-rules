---
id: architecture-multi-app-monolith
type: reference
alwaysApply: false
---

# Multi App Monolith — Multi-Application Monolith

[REFERENCE-BEGIN]

## TIER 1: Expert Role

<expert_role>
You are a Multi App Monolith Architecture Specialist for TypeScript projects.

Responsibilities:

- Enforce Multi App Monolith architecture rules with zero exceptions
- Ensure isolation between multiple applications within one package
- Validate interactions through the common application only
- Guide selection of internal architectures for each application
- Prioritize weak coupling and independent entrypoints for applications

**ВАЖНО: Все ответы должны быть на русском языке.**
</expert_role>

<expert_completion_criteria>
Expert role clearly defines responsibilities specific to Multi App Monolith architecture and includes Russian language requirement for responses.
</expert_completion_criteria>

## TIER 2: Purpose and Application

<exception_handling>
When working with Multi App Monolith architecture, the following exceptional situations are possible:

- Project exceeds application limit (more than 5–7) → split into separate packages
- Isolation violation → immediate removal of direct imports between applications
- Dependency mixing → strict check for imports only through common
- Uncertainty in internal architecture selection → priority FSD for frontend, Layered Library for common

Fix priorities:

1. **Critical:** Fix immediately (direct imports between applications)
2. **Medium:** Plan migration of applications to separate packages
3. **Low:** Add documentation for new applications
   </exception_handling>

<algorithm_motivation>
Multi App Monolith architecture allows combining several independent applications in one package, ensuring isolation and code reuse through common, simplifying monolithic development of fullstack projects.
</algorithm_motivation>

<cognitive_triggers>
Let's determine step by step if the project is suitable for Multi App Monolith architecture by analyzing number of applications, their isolation, and presence of common code.
</cognitive_triggers>

<architecture_scope>
Multi App Monolith — architectural type for packages containing several independent applications (frontend, backend, CLI), each with own architecture and entry point, with common modules in applications/common.
**Purpose:** Monorepos with multiple entry points, fullstack projects.
**Key principle:** Application isolation (only through common), weak coupling, own entrypoints.
</architecture_scope>

<scope_completion_criteria>
Architecture scope clearly defines purpose, key principle, and decision criteria for Multi App Monolith usage.
</scope_completion_criteria>

### Architecture Selection Algorithm

<algorithm_steps>

1. **Application analysis:** Determine number of independent applications (frontend, backend, CLI)
2. **Entrypoint count:**
    - Unix/Linux: `find src/applications -name "index.ts" | wc -l`
    - Check for common for shared modules
3. **Isolation assessment:** Check absence of direct imports between applications
4. **Decision making:** Apply architecture selection rules

</algorithm_steps>

If project contains:

- ✓ Several (2–7) independent applications
- ✓ Common code in applications/common
- ✓ Isolation (imports only through common)
- ✓ Own entrypoints for each application

### → Multi App Monolith

Otherwise → separate packages (for microservices) or FSD (for one application)

<step_completion_criteria>
Algorithm is clearly structured with step-by-step instructions and decision criteria for Multi App Monolith.
</step_completion_criteria>

<exception_handling>

If number of applications is in borderline zone (1–2), conduct additional analysis:

- If applications are closely related by common code → Multi App Monolith
- If independent → separate packages
- If uncertain → choose monolith to simplify development

If more than 7 applications → must split into microservices or separate repositories.

</exception_handling>

### Quick Suitability Check

| **Condition**  | **✅ Suitable**         | **❌ Not Suitable**    |
| ------------ | ----------------------- | --------------------- |
| Applications   | 2–7 independent     | 1 or >10             |
| Isolation     | Only through common     | Direct imports        |
| Common Code    | In applications/common   | No reuse |
| Entry points | Own for each | One common            |

### Key Characteristics

- **Multiple applications:** Each application — independent project
- **Weak coupling:** Applications interact only through public APIs of common
- **Own architectures:** Each application can use any internal architecture
- **Common modules:** Reusable code in common application
- **Multiple entry points:** Each application has own entrypoint

## TIER 3: Project Structure

<output_format>

When describing project structure, use XML schema with clear file roles and purposes. For each element specify:

- `name` — file/directory name
- `role` — role (application, layer, module, facade, function, types, unit_test)
- `purpose` — purpose
- `exports` — what it exports (for facades)

</output_format>

<cognitive_triggers>
Let's analyze mandatory Multi App Monolith structure step by step, starting with applications, adding internal layers and common.
</cognitive_triggers>

### Basic Schema

```xml
<package_root>
  <source_directory name="src">
    <entrypoint name="index.ts" purpose="Общая точка входа пакета (опционально)" />
    <directory name="applications" purpose="Контейнер приложений">
      <application name="admin-frontend" purpose="Фронтенд для админов">
        <entrypoint name="index.ts" purpose="Точка входа приложения" />
        <layer name="pages" purpose="FSD структура">
          <module name="dashboard">
            <facade name="index.ts" role="slice_facade" purpose="Фасад модуля" exports="Dashboard" />
            <segment name="ui" purpose="UI компоненты">
              <file name="Dashboard.tsx" role="component" purpose="Основной компонент" />
            </segment>
            <directory name="__tests__" purpose="Тесты модуля">
              <test name="dashboard.test.tsx" role="unit_test" />
            </directory>
          </module>
        </layer>
        <directory name="__tests__" purpose="Тесты приложения">
          <test name="admin.test.tsx" role="unit_test" />
        </directory>
      </application>
      <application name="public-frontend" purpose="Публичный фронтенд">
        <entrypoint name="index.ts" purpose="Точка входа приложения" />
        <layer name="pages" purpose="Страницы">
          <module name="home">
            <facade name="index.ts" role="slice_facade" exports="HomePage" />
            <segment name="ui" purpose="UI компоненты">
              <file name="HomePage.tsx" role="component" />
            </segment>
          </module>
        </layer>
        <directory name="__tests__" purpose="Тесты приложения">
          <test name="public.test.tsx" role="unit_test" />
        </directory>
      </application>
      <application name="api-server" purpose="Backend API">
        <entrypoint name="index.ts" purpose="Точка входа сервера" />
        <layer name="controllers" purpose="Контроллеры">
          <module name="user-controller">
            <facade name="index.ts" role="unit_facade" exports="userController" />
            <file name="user-controller.ts" role="function" purpose="Контроллер пользователя" />
            <directory name="__tests__">
              <test name="user-controller.test.ts" role="unit_test" />
            </directory>
          </module>
        </layer>
        <layer name="services" purpose="Сервисы">
          <module name="user-service">
            <facade name="index.ts" role="unit_facade" exports="userService" />
            <directory name="__tests__">
              <test name="user-service.test.ts" role="unit_test" />
            </directory>
          </module>
        </layer>
      </application>
      <application name="cli-tools" purpose="CLI инструменты">
        <entrypoint name="index.ts" purpose="Точка входа CLI" />
        <layer name="commands" purpose="Команды CLI">
          <module name="build-command">
            <facade name="index.ts" role="unit_facade" exports="buildCommand" />
            <file name="build.ts" role="workflow" purpose="Команда сборки" />
            <directory name="__tests__">
              <test name="build.test.ts" role="unit_test" />
            </directory>
          </module>
          <module name="deploy-command">
            <facade name="index.ts" role="unit_facade" exports="deployCommand" />
            <directory name="__tests__">
              <test name="deploy.test.ts" role="unit_test" />
            </directory>
          </module>
        </layer>
        <directory name="__tests__">
          <test name="cli.test.ts" role="unit_test" />
        </directory>
      </application>
      <application name="common" purpose="Общие модули">
        <entrypoint name="index.ts" purpose="Фасад общих модулей" />
        <layer name="lib" purpose="Общие утилиты">
          <directory name="helpers">
            <module name="format-date">
              <facade name="index.ts" role="unit_facade" exports="formatDate" />
              <file name="format-date.ts" role="helper" />
              <directory name="__tests__">
                <test name="format-date.test.ts" role="unit_test" />
              </directory>
            </module>
          </directory>
          <directory name="hooks">
            <module name="use-api">
              <facade name="index.ts" role="unit_facade" exports="useApi" />
              <directory name="__tests__">
                <test name="use-api.test.ts" role="unit_test" />
              </directory>
            </module>
          </directory>
        </layer>
        <layer name="model" purpose="Общие типы и схемы">
          <directory name="types">
            <module name="user">
              <facade name="index.ts" role="unit_facade" exports="type User" />
              <file name="user.ts" role="types" />
            </module>
          </directory>
          <directory name="schemas">
            <module name="validation">
              <facade name="index.ts" role="unit_facade" exports="userSchema" />
              <file name="validation.ts" role="schemas" />
            </module>
          </directory>
        </layer>
        <layer name="services" purpose="Общие сервисы">
          <directory name="workflows">
            <module name="rebuild-indexes">
              <facade name="index.ts" role="unit_facade" exports="rebuildIndexes" />
              <file name="rebuild-workflow.ts" role="workflow" />
              <directory name="__tests__">
                <test name="rebuild-workflow.test.ts" role="unit_test" />
              </directory>
            </module>
          </directory>
        </layer>
        <directory name="__tests__">
          <test name="common.test.ts" role="unit_test" />
        </directory>
      </application>
    </directory>
    <directory name="__tests__" purpose="Интеграционные тесты пакета">
      <test name="integration.test.ts" role="integration_test" />
    </directory>
  </source_directory>
</package_root>
```

<structure_completion_criteria>
Structure is clearly defined with XML schema, element roles and purposes for Multi App Monolith.
</structure_completion_criteria>

### Internal Architecture Options for Applications

#### Frontend Applications

Can use any architecture:

- **FSD** (`fsd_standard`, `fsd_domain`) — for complex interfaces
- **Server FSD** (`server_fsd`) — for server applications
- **Layered Library** — for simple applications with layer grouping
- **Single Module** — for very simple single-page applications

#### Backend Applications

- **Server FSD** (`server_fsd`) — for complex server applications
- **Layered Library** — grouping by `controllers/`, `services/`, `models/`, `routes/`
- **Single Module** — for simple APIs with single responsibility

#### CLI Applications

- **Server FSD** (`server_fsd`) — for complex CLI with multiple commands
- **Single Module** — for simple utilities
- **Layered Library** — for CLI with functional grouping

#### Common Application

**Layered Library** architecture is recommended for organizing common code by layers.

## TIER 4: Rules and Constraints

### ✅ Requirements

- [ ] **Multiple entrypoints:** Each application has own `index.ts`
- [ ] **Application facades:** Each application has public API
- [ ] **Application isolation:** No direct imports between applications (except `common`)
- [ ] **Common as mediator:** All inter-application dependencies through `applications/common`
- [ ] **Own architectures:** Each application can have its own internal structure
- [ ] **Application-level tests:** Tests in `__tests__/` of each application
- [ ] **No cycles:** Absence of cyclic dependencies between applications

### ❌ Forbidden

- Direct imports between applications (bypassing `common`)
- Import of internal details of other applications
- Cyclic dependencies between applications
- Export of internal `common` modules without facades
- Violation of architectural rules within each application

### Risk Assessment

<cognitive_triggers>
Let's analyze potential risks when using Multi App Monolith architecture and ways to mitigate them.
</cognitive_triggers>

**Potential problems and solutions:**

| **Risk**                | **Symptoms**                      | **Mitigation**                                                       |
| ----------------------- | --------------------------------- | ------------------------------------------------------------------- |
| Isolation violation      | Direct imports between applications | ESLint: import path restrictions + dependency checking            |
| Application limit exceeded   | >7 applications                     | Split into microservices or separate packages                     |
| Internal API leak   | Export of private modules         | Facades only for public API, hide internals                 |
| Cyclic dependencies | Mutual imports of applications       | Dependency graph + analysis tools (madge, dependency-cruiser) |

<risk_completion_criteria>
Risk Assessment contains specific risks, their symptoms, and mitigation methods for Multi App Monolith.
</risk_completion_criteria>

### Import Examples

```typescript
// ✅ ALLOWED: from any application import common
import { formatDate, User, validateUser } from 'applications/common';

// ✅ ALLOWED: external libraries
import { z } from 'zod';
import React from 'react';

// ❌ FORBIDDEN: direct import between applications
import { AdminPanel } from 'applications/admin-frontend';

// ❌ FORBIDDEN: import internal details of common
import { formatDateHelper } from 'applications/common/lib/helpers/format-date/helpers';
```

## TIER 5: Usage Examples

### E-commerce Platform

**Description:** Full e-commerce system with multiple frontends and backend

```xml
<package_root>
  <source_directory name="src">
    <entrypoint name="index.ts" purpose="Общая точка входа" />
    <directory name="applications">
      <application name="admin-frontend" purpose="Административная панель">
        <entrypoint name="index.ts" />
        <layer name="pages">
          <module name="products">
            <facade name="index.ts" role="slice_facade" exports="ProductsPage" />
            <segment name="ui">
              <file name="ProductsPage.tsx" role="component" />
            </segment>
          </module>
        </layer>
        <directory name="__tests__">
          <test name="admin.test.tsx" role="unit_test" />
        </directory>
      </application>
      <application name="public-frontend" purpose="Публичный магазин">
        <entrypoint name="index.ts" />
        <layer name="pages">
          <module name="catalog">
            <facade name="index.ts" role="slice_facade" exports="CatalogPage" />
            <segment name="ui">
              <file name="CatalogPage.tsx" role="component" />
            </segment>
          </module>
        </layer>
        <directory name="__tests__">
          <test name="public.test.tsx" role="unit_test" />
        </directory>
      </application>
      <application name="api-server" purpose="REST API">
        <entrypoint name="index.ts" />
        <layer name="controllers">
          <module name="product-controller">
            <facade name="index.ts" role="unit_facade" exports="productController" />
            <file name="product-controller.ts" role="function" />
          </module>
        </layer>
      </application>
      <application name="common" purpose="Общие модули">
        <entrypoint name="index.ts" />
        <layer name="model">
          <module name="product">
            <facade name="index.ts" role="unit_facade" exports="type Product" />
            <file name="product.ts" role="types" />
          </module>
        </layer>
      </application>
    </directory>
  </source_directory>
</package_root>
```

### Betting Platform

**Description:** Betting platform with operator and player interfaces

```xml
<package_root>
  <source_directory name="src">
    <entrypoint name="index.ts" />
    <directory name="applications">
      <application name="operator-frontend" purpose="Интерфейс операторов">
        <entrypoint name="index.ts" />
        <layer name="widgets">
          <module name="bet-management">
            <facade name="index.ts" role="slice_facade" exports="BetManagement" />
            <segment name="ui">
              <file name="BetManagement.tsx" role="component" />
            </segment>
          </module>
        </layer>
      </application>
      <application name="player-frontend" purpose="Интерфейс игроков">
        <entrypoint name="index.ts" />
        <layer name="features">
          <module name="live-betting">
            <facade name="index.ts" role="slice_facade" exports="LiveBetting" />
            <segment name="ui">
              <file name="LiveBetting.tsx" role="component" />
            </segment>
          </module>
        </layer>
      </application>
      <application name="admin-frontend" purpose="Административная панель">
        <entrypoint name="index.ts" />
        <layer name="pages">
          <module name="reports">
            <facade name="index.ts" role="slice_facade" exports="ReportsPage" />
            <segment name="ui">
              <file name="ReportsPage.tsx" role="component" />
            </segment>
          </module>
        </layer>
      </application>
      <application name="api-server" purpose="Основной API">
        <entrypoint name="index.ts" />
        <layer name="routes">
          <module name="bet-routes">
            <facade name="index.ts" role="unit_facade" exports="betRoutes" />
            <file name="bet-routes.ts" role="function" />
          </module>
        </layer>
      </application>
      <application name="websocket-server" purpose="Real-time сервер">
        <entrypoint name="index.ts" />
        <layer name="handlers">
          <module name="live-events">
            <facade name="index.ts" role="unit_facade" exports="liveEventHandler" />
            <file name="live-events.ts" role="function" />
          </module>
        </layer>
      </application>
      <application name="cli-tools" purpose="Инструменты управления">
        <entrypoint name="index.ts" />
        <layer name="commands">
          <module name="bet-management-command">
            <facade name="index.ts" role="unit_facade" exports="betManagementCmd" />
            <file name="bet-management.ts" role="workflow" />
          </module>
        </layer>
      </application>
      <application name="common" purpose="Бизнес-логика и типы">
        <entrypoint name="index.ts" />
        <layer name="services">
          <module name="bet-calculation">
            <facade name="index.ts" role="unit_facade" exports="calculateOdds" />
            <file name="bet-calculation.ts" role="function" />
          </module>
        </layer>
        <layer name="model">
          <module name="bet">
            <facade name="index.ts" role="unit_facade" exports="type Bet" />
            <file name="bet.ts" role="types" />
          </module>
        </layer>
      </application>
    </directory>
  </source_directory>
</package_root>
```

**Note:** Each application uses appropriate internal architecture; common — Layered Library.

## TIER 6: XML Schema for Validator

```xml
<package_root>
  <source_directory name="src">
    <entrypoint name="index.ts" />
    <application name="admin-frontend">
      <entrypoint name="index.ts" />
      <layer name="pages" purpose="административные страницы">
        <module name="dashboard">
          <facade name="index.ts" role="slice_facade" />
          <segment name="ui" purpose="UI компоненты">
            <file name="Dashboard.tsx" role="component" />
          </segment>
        </module>
      </layer>
      <test name="__tests__/admin.test.tsx" role="unit_test" />
    </application>
    <application name="public-frontend">
      <entrypoint name="index.ts" />
      <layer name="pages" purpose="публичные страницы">
        <module name="home">
          <facade name="index.ts" role="slice_facade" />
          <segment name="ui" purpose="UI компоненты">
            <file name="Home.tsx" role="component" />
          </segment>
        </module>
      </layer>
      <test name="__tests__/public.test.tsx" role="unit_test" />
    </application>
    <application name="api-server">
      <entrypoint name="index.ts" />
      <layer name="controllers" purpose="контроллеры API">
        <module name="user-controller">
          <facade name="index.ts" role="unit_facade" />
          <file name="user-controller.ts" role="function" />
          <test name="__tests__/user-controller.test.ts" role="unit_test" />
        </module>
      </layer>
    </application>
    <application name="cli-tools">
      <entrypoint name="index.ts" />
      <layer name="commands" purpose="CLI команды">
        <module name="build-command">
          <facade name="index.ts" role="unit_facade" />
          <file name="build.ts" role="workflow" />
          <test name="__tests__/build.test.ts" role="unit_test" />
        </module>
      </layer>
    </application>
    <application name="common">
      <entrypoint name="index.ts" />
      <layer name="lib" purpose="общие утилиты">
        <directory name="helpers">
          <module name="format-date">
            <facade name="index.ts" role="unit_facade" />
            <file name="format-date.ts" role="helper" />
            <test name="__tests__/format-date.test.ts" role="unit_test" />
          </module>
        </directory>
      </layer>
      <layer name="services" purpose="общие сервисы">
        <directory name="workflows">
          <module name="rebuild-indexes">
            <facade name="index.ts" role="unit_facade" />
            <file name="rebuild-workflow.ts" role="workflow" />
            <test name="__tests__/rebuild-workflow.test.ts" role="unit_test" />
          </module>
        </directory>
      </layer>
    </application>
  </source_directory>
</package_root>
```

## TIER 7: Metadata for Validator

### Full Validation

```xml
<architecture_metadata version="1" language="ts">
  <architecture_type>multi_app_monolith</architecture_type>
  <scope>full</scope>
  <module_units>
    <unit path="src/applications/admin-frontend" layer="application" />
    <unit path="src/applications/public-frontend" layer="application" />
    <unit path="src/applications/api-server" layer="application" />
    <unit path="src/applications/cli-tools" layer="application" />
    <unit path="src/applications/common" layer="application" />
  </module_units>
  <entrypoints>
    <entrypoint path="src/index.ts" />
    <entrypoint path="src/applications/admin-frontend/index.ts" />
    <entrypoint path="src/applications/public-frontend/index.ts" />
    <entrypoint path="src/applications/api-server/index.ts" />
    <entrypoint path="src/applications/cli-tools/index.ts" />
    <entrypoint path="src/applications/common/index.ts" />
  </entrypoints>
  <ruleset>${PROJECT_NAME}-2025-10</ruleset>
</architecture_metadata>
```

### Partial Validation (Single Application)

```xml
<architecture_metadata version="1" language="ts">
  <architecture_type>multi_app_monolith</architecture_type>
  <scope>partial</scope>
  <partial_root>src/applications/public-frontend</partial_root>
  <module_units>
    <unit path="src/applications/public-frontend" layer="application" />
  </module_units>
  <entrypoints>
    <entrypoint path="src/applications/public-frontend/index.ts" />
  </entrypoints>
  <ruleset>${PROJECT_NAME}-2025-10</ruleset>
</architecture_metadata>
```

## TIER 8: Applicability and Validation

### ✅ Suitable for

- Monorepos with multiple entry points
- Fullstack projects (frontend + backend + CLI in one package)
- Enterprise solutions with administrative and public interfaces
- Projects with common libraries for different applications
- Development environments with shared tooling

### ❌ Not suitable for

- Simple single-application projects (use corresponding FSD type)
- Microservice architecture (each service — separate package)
- Projects without common code between applications
- Cases where applications are developed by independent teams

<completion_criteria>
Document is fully ready for use: all Multi App Monolith architecture rules are defined, structure examples provided, XML schemas for validator ready, metadata correct. Document complies with reference prompt standard and can be used for project architecture validation.
</completion_criteria>

[REFERENCE-END]
