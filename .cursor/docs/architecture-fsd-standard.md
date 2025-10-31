---
id: architecture-fsd-standard
type: reference
alwaysApply: false
---

# FSD Standard — Feature-Sliced Design

[REFERENCE-BEGIN]

## TIER 1: Expert Role

<expert_role>
You are a FSD Standard Architecture Specialist for TypeScript/React projects.

Responsibilities:

- Enforce FSD Standard architecture rules with zero exceptions
- Ensure strict layer hierarchy: app → pages → widgets → features → entities → shared → core
- Validate slice facades and segment organization without domain grouping
- Guide proper segment usage (ui, model, service, lib) within slices
- Prioritize no cross-imports between same-layer slices and downward dependencies only

**ВАЖНО: Все ответы должны быть на русском языке.**
</expert_role>

<expert_completion_criteria>
Expert role clearly defines responsibilities specific to FSD Standard architecture and includes Russian language requirement for responses.
</expert_completion_criteria>

## TIER 2: Purpose and Application

<exception_handling>
When working with FSD Standard architecture, the following exceptional situations are possible:

- Project requires domain separation → migrate to fsd_domain
- Absence of optional layers (widgets, features, entities, core) → not an error, added as needed
- Minimal configuration (app, pages, shared) → fully valid for simple projects
- Business logic in entities/service → acceptable, especially if features layer is absent
- Layer hierarchy violation → immediate dependency correction
- Cross-imports in same layer → strict checking and import refactoring
- Uncertainty in code placement → priority by hierarchy (pages for pages, features for features if layer exists)

Fix priorities:

1. **Critical:** Fix immediately (hierarchy violation or cross-imports)
2. **Medium:** Plan slice refactoring
3. **Low:** Add facades for new slices, create optional layers as project grows
   </exception_handling>

<algorithm_motivation>
FSD Standard architecture provides strict layer hierarchy for medium-complexity frontend applications, simplifying scaling without domains and minimizing dependencies through slice facades.
</algorithm_motivation>

<cognitive_triggers>
Let's determine step by step if the project is suitable for FSD Standard architecture by analyzing complexity, absence of domains, and need for layered hierarchy.
</cognitive_triggers>

<architecture_scope>
FSD Standard — architectural type for frontend applications with Feature-Sliced Design without domains, where slices are organized by functionality with hierarchy app → pages → widgets → features → entities → shared → core.
**Purpose:** Medium and complex frontend applications without explicit domain separation.
**Key principle:** Strict layer hierarchy with downward dependencies only, slice facades, prohibition of cross-imports within layer.
</architecture_scope>

<scope_completion_criteria>
Architecture scope clearly defines purpose, key principle, and decision criteria for FSD Standard usage.
</scope_completion_criteria>

### Architecture Selection Algorithm

<algorithm_steps>

1. **Complexity analysis:** Determine presence of pages, widgets, features, and entities
2. **Domain check:** Ensure absence of explicit domain separation
3. **Hierarchy assessment:** Check need for strict layered structure
4. **Decision making:** Apply architecture selection rules

</algorithm_steps>

If project contains:

- ✓ Medium/high complexity (multiple features, pages)
- ✓ Functional grouping without domains
- ✓ Hierarchical dependencies (pages can depend on features if they exist)
- ✓ Frontend application
- ⚠️ Features layer is optional — created when reuse of functionality between pages is needed

### → FSD Standard

Otherwise → layered_library (for libraries) or fsd_domain (with domains)

<step_completion_criteria>
Algorithm is clearly structured with step-by-step instructions and decision criteria for FSD Standard.
</step_completion_criteria>

<exception_handling>

If project is in borderline zone (small number of features), conduct additional analysis:

- If domain separation is required → fsd_domain
- If simple structure → layered_library
- If uncertain → choose FSD Standard for scalability

If project is server-side → use server_fsd.

</exception_handling>

### Quick Suitability Check

| **Condition** | **✅ Suitable**                    | **❌ Not Suitable**                    |
| ----------- | -------------------------- | ----------------------------- |
| Complexity   | Medium/high                | Simple or library            |
| Domains      | Absent                     | Explicit domains            |
| Structure    | Layers: app, pages, features | Without hierarchy or with domains |
| Project Type | Frontend application       | Server or monolithic applications |

### Key Characteristics

- **Layered architecture:** Strict hierarchy app → pages → widgets → features → entities → shared → core
- **Without domains:** Slices by functionality, not by business entities
- **Slice facades:** Each slice has index.ts
- **Cross-import prohibition:** Slices of same layer do not import each other

## TIER 3: Project Structure

<output_format>

When describing project structure, use XML schema with clear file roles and purposes. For each element specify:

- `name` — file/directory name
- `role` — role (layer, module, facade, segment, component, function, types, unit_test)
- `purpose` — purpose
- `exports` — what it exports (for facades)

</output_format>

<cognitive_triggers>
Let's analyze FSD Standard structure step by step, starting with layer hierarchy, slices, and segments.
</cognitive_triggers>

### Базовая схема

```xml
<package_root>
  <source_directory name="src">
    <layer name="app" purpose="Точка входа и инициализация">
      <entrypoint name="index.ts" purpose="Фасад приложения" />
      <directory name="providers">
        <file name="global-providers.tsx" role="component" purpose="Глобальные провайдеры" />
      </directory>
      <directory name="styles">
        <file name="global.css" role="asset" purpose="Глобальные стили" />
      </directory>
    </layer>
    <layer name="pages" purpose="Страницы приложения">
      <module name="home">
        <facade name="index.ts" role="slice_facade" purpose="Фасад слайса" exports="HomePage" />
        <segment name="ui" purpose="UI компоненты">
          <file name="main/index.tsx" role="component" purpose="Основная страница" />
        </segment>
        <segment name="route" purpose="Роутинг">
          <file name="index.ts" role="config" purpose="Регистрация роута" />
          <file name="loader.ts" role="function" purpose="Загрузка данных" />
        </segment>
        <directory name="__tests__">
          <test name="home.test.ts" role="unit_test" />
        </directory>
      </module>
      <module name="profile">
        <facade name="index.ts" role="slice_facade" exports="ProfilePage" />
        <segment name="ui">
          <file name="index.tsx" role="component" />
        </segment>
        <segment name="route">
          <file name="index.ts" role="config" />
        </segment>
      </module>
    </layer>
    <layer name="widgets" purpose="Композиции фич">
      <module name="header">
        <facade name="index.ts" role="slice_facade" exports="Header" />
        <segment name="ui">
          <file name="common/Header.tsx" role="component" />
        </segment>
        <directory name="__tests__">
          <test name="header.test.ts" role="unit_test" />
        </directory>
      </module>
    </layer>
    <layer name="features" purpose="Отдельные фичи">
      <module name="auth">
        <facade name="index.ts" role="slice_facade" exports="AuthForm, useAuth" />
        <segment name="ui">
          <file name="common/AuthForm/index.tsx" role="component" />
        </segment>
        <segment name="model">
          <file name="store/index.ts" role="function" purpose="Состояние" />
          <file name="types/index.ts" role="types" />
          <file name="selectors/index.ts" role="function" />
        </segment>
        <segment name="service">
          <file name="auth-flow/index.ts" role="workflow" purpose="Бизнес-процесс" />
        </segment>
        <segment name="lib">
          <file name="helpers/index.ts" role="function" />
        </segment>
      </module>
    </layer>
    <layer name="entities" purpose="Сущности">
      <module name="user">
        <facade name="index.ts" role="slice_facade" exports="UserType, userStore" />
        <segment name="model">
          <file name="types/index.ts" role="types" />
          <file name="store/index.ts" role="function" />
          <file name="selectors/index.ts" role="function" />
        </segment>
        <segment name="lib">
          <file name="helpers/index.ts" role="function" />
        </segment>
      </module>
    </layer>
    <layer name="shared" purpose="Разделяемый код">
      <directory name="ui">
        <directory name="base">
          <module name="button">
            <facade name="index.tsx" role="unit_facade" exports="Button" />
            <file name="Button.tsx" role="component" />
            <directory name="__tests__">
              <test name="button.test.tsx" role="unit_test" />
            </directory>
          </module>
        </directory>
      </directory>
      <directory name="lib">
        <directory name="hooks">
          <module name="use-safe-back">
            <facade name="index.ts" role="unit_facade" exports="useSafeBack" />
            <file name="use-safe-back.ts" role="function" />
            <directory name="__tests__">
              <test name="use-safe-back.test.ts" role="unit_test" />
            </directory>
          </module>
        </directory>
      </directory>
      <directory name="api">
        <directory name="base">
          <file name="index.ts" role="function" purpose="Базовый API" />
        </directory>
      </directory>
    </layer>
    <layer name="core" purpose="Базовые модули">
      <directory name="router">
        <file name="index.ts" role="function" purpose="Роутер" />
      </directory>
    </layer>
  </source_directory>
</package_root>
```

<structure_completion_criteria>
Structure is clearly defined with XML schema, element roles and purposes for FSD Standard.
</structure_completion_criteria>

### Layer Hierarchy

app → pages → widgets → [features]? → entities → shared → core

Layers can depend only on lower layers.

**Important:**

- **Required layers:** app, pages, shared — minimal project configuration
- **Optional layers:** widgets, features, entities, core — added as needed
- **core** layer is created when abstractions over external libraries are needed (router, store, logger)

### Layer Description

| **Layer**   | **Purpose**                                    | **Can depend on**                            | **Cross-import** |
| ---------- | ------------------------------------------------- | ------------------------------------------------ | ---------------- |
| `app`      | Entry point, initialization, global providers | pages, widgets, features, entities, shared, core | ✅               |
| `pages`    | Concrete application pages                    | widgets, features, entities, shared, core        | ❌               |
| `widgets`  | Feature compositions, standalone blocks             | features, entities, shared, core                 | ❌               |
| `features` | Separate functionality parts                  | entities, shared, core                           | ❌               |
| `entities` | Domain models                         | shared, core                                     | ❌               |
| `shared`   | Code not related to business logic                 | core                                             | ✅               |
| `core`     | Base libraries and modules                       | -                                                | ✅               |

### Slice Segments

#### ui/ — User Interface

```text
ui/
├── common/          # Common components (no prefix)
├── desktop/         # Desktop prefix (DesktopAuthForm)
└── mobile/          # Mobile prefix (MobileAuthForm)
```

**Rules:**

- By default components in `common`
- Maximum one additional nesting level
- Nested elements get parent prefix

#### model/ — State Management

```text
model/
├── store/           # Redux store/reducer
├── types/           # TypeScript types
├── constants/       # Constants
├── schemas/         # Zod validation schemas
├── selectors/       # State selectors
└── actions/         # Actions/thunks
```

#### service/ — Side Effects and Business Processes

**Basic structure:**

```text
service/
└── auth-flow/       # Main process (saga/thunk)
    └── index.ts
```

**Extended structure:**

```text
service/
├── adapters/        # External system adapters
├── gateways/        # Infrastructure access
└── workflows/       # Business processes
```

#### route/ — Router Integration (only for pages)

```text
route/
├── index.ts         # Registration/connection with router
├── loader.ts        # Data loading
├── action.ts        # Action handling
└── fetcher.ts       # Data fetchers
```

#### lib/ — Utilities and Hooks

```text
lib/
├── helpers/         # Helpers
└── hooks/           # Hooks
```

#### assets/ — Static Resources

Static files: images, videos, fonts, JSON, localization.

## TIER 4: Rules and Constraints

### ✅ Requirements

- [ ] **Layer hierarchy:** Matches FSD with dependencies only downward in hierarchy
- [ ] **Slice facades:** All slices have `index.ts` as Public API
- [ ] **Cross-import prohibition:** No imports between slices of same layer
- [ ] **Segment organization:** Complex slices are divided into segments
- [ ] **Named exports:** Only named exports
- [ ] **Slice-level tests:** Tests in `__tests__/` next to slices

### ❌ Forbidden

- Layer hierarchy violation (import from upper layers)
- Cross-imports between slices on same layer
- Domain groupings (use `fsd_domain` for this)
- Direct import from internal parts of slices (only through facades)
- `Default` exports

### Risk Assessment

<cognitive_triggers>
Let's analyze potential risks when using FSD Standard architecture and ways to mitigate them.
</cognitive_triggers>

**Potential problems and solutions:**

| **Risk**                   | **Symptoms**                           | **Mitigation**                                                   |
| -------------------------- | -------------------------------------- | --------------------------------------------------------------- |
| Hierarchy violation         | Imports from upper layers           | ESLint: import rules by layers + automated checking |
| Cross-imports in layer       | Dependencies between slices of same layer | Refactoring: move common code to shared                   |
| Missing facades         | Direct imports from segments            | Required index.ts for each slice                        |
| Complexity growth without domains | >50 slices in features/entities        | Migration to fsd_domain for domain separation                 |

<risk_completion_criteria>
Risk Assessment contains specific risks, their symptoms, and mitigation methods for FSD Standard.
</risk_completion_criteria>

## TIER 5: Usage Examples

### Example Application Structure

**Description:** Full application with pages, widgets, features, and shared

```xml
<package_root>
  <source_directory name="src">
    <layer name="app" purpose="Инициализация">
      <entrypoint name="index.ts" purpose="Точка входа" />
      <directory name="providers">
        <file name="AppProviders.tsx" role="component" />
      </directory>
    </layer>
    <layer name="pages" purpose="Страницы">
      <module name="home">
        <facade name="index.ts" role="slice_facade" exports="HomePage" />
        <segment name="ui">
          <file name="HomePage.tsx" role="component" />
        </segment>
        <segment name="route">
          <file name="route.ts" role="config" />
        </segment>
        <directory name="__tests__">
          <test name="home.test.ts" role="unit_test" />
        </directory>
      </module>
    </layer>
    <layer name="widgets" purpose="Виджеты">
      <module name="header">
        <facade name="index.ts" role="slice_facade" exports="HeaderWidget" />
        <segment name="ui">
          <file name="Header.tsx" role="component" />
        </segment>
        <directory name="__tests__">
          <test name="header.test.ts" role="unit_test" />
        </directory>
      </module>
    </layer>
    <layer name="features" purpose="Фичи">
      <module name="auth">
        <facade name="index.ts" role="slice_facade" exports="AuthFeature" />
        <segment name="ui">
          <file name="AuthForm.tsx" role="component" />
        </segment>
        <segment name="model">
          <file name="authStore.ts" role="function" />
          <file name="authTypes.ts" role="types" />
        </segment>
        <segment name="service">
          <file name="authService.ts" role="workflow" />
        </segment>
      </module>
    </layer>
    <layer name="entities" purpose="Сущности">
      <module name="user">
        <facade name="index.ts" role="slice_facade" exports="UserEntity" />
        <segment name="model">
          <file name="userModel.ts" role="function" />
          <file name="userTypes.ts" role="types" />
        </segment>
      </module>
    </layer>
    <layer name="shared" purpose="Shared">
      <directory name="ui">
        <module name="button">
          <facade name="index.tsx" role="unit_facade" exports="Button" />
          <file name="Button.tsx" role="component" />
        </module>
      </directory>
      <directory name="lib">
        <module name="useDebounce">
          <facade name="index.ts" role="unit_facade" exports="useDebounce" />
          <file name="useDebounce.ts" role="function" />
        </module>
      </directory>
    </layer>
    <layer name="core" purpose="Core">
      <directory name="ui-kit">
        <file name="index.ts" role="function" purpose="Базовый UI Kit" />
      </directory>
    </layer>
  </source_directory>
</package_root>
```

**Note:** Each slice has a facade; segments are used for complex slices; tests nearby.

### Example features/auth Slice

**Description:** Full authorization slice

```xml
<module name="auth">
  <facade name="index.ts" role="slice_facade" exports="AuthForm, useAuth, authStore" />
  <segment name="ui" purpose="UI">
    <directory name="common">
      <file name="AuthForm/index.tsx" role="component" />
    </directory>
    <directory name="desktop">
      <file name="DesktopAuthForm.tsx" role="component" />
    </directory>
  </segment>
  <segment name="model" purpose="Состояние">
    <directory name="store">
      <file name="authSlice.ts" role="function" />
    </directory>
    <directory name="types">
      <file name="authTypes.ts" role="types" />
    </directory>
    <directory name="selectors">
      <file name="authSelectors.ts" role="function" />
    </directory>
  </segment>
  <segment name="service" purpose="Бизнес-логика">
    <directory name="auth-flow">
      <file name="loginFlow.ts" role="workflow" />
    </directory>
  </segment>
  <segment name="lib" purpose="Утилиты">
    <directory name="hooks">
      <file name="useAuth.ts" role="function" />
    </directory>
  </segment>
  <directory name="__tests__">
    <test name="auth.test.ts" role="unit_test" />
  </directory>
</module>
```

## TIER 6: XML Schema for Validator

```xml
<package_root>
  <source_directory name="src">
    <layer name="app" purpose="инициализация приложения">
      <entrypoint name="index.ts" />
      <directory name="providers">
        <file name="providers.tsx" role="component" />
      </directory>
    </layer>
    <layer name="pages" purpose="страницы приложения">
      <module name="home">
        <facade name="index.ts" role="slice_facade" />
        <segment name="ui" purpose="UI компоненты">
          <file name="HomePage.tsx" role="component" />
        </segment>
        <segment name="route" purpose="роутинг">
          <file name="index.ts" role="config" />
          <file name="loader.ts" role="function" />
        </segment>
        <test name="__tests__/home.test.ts" role="unit_test" />
      </module>
    </layer>
    <layer name="features" purpose="фичи">
      <module name="auth">
        <facade name="index.ts" role="slice_facade" />
        <segment name="ui" purpose="UI компоненты">
          <file name="common/AuthForm/index.tsx" role="component" />
        </segment>
        <segment name="model" purpose="состояние">
          <file name="store/index.ts" role="function" />
          <file name="types/index.ts" role="types" />
        </segment>
        <segment name="service" purpose="бизнес-логика">
          <file name="auth-flow/index.ts" role="workflow" />
        </segment>
      </module>
    </layer>
    <layer name="shared" purpose="разделяемый код">
      <directory name="ui">
        <directory name="base">
          <module name="button">
            <facade name="index.tsx" role="unit_facade" />
            <file name="Button.tsx" role="component" />
            <test name="__tests__/button.test.tsx" role="unit_test" />
          </module>
        </directory>
      </directory>
    </layer>
  </source_directory>
</package_root>
```

## TIER 7: Metadata for Validator

### Full Validation

```xml
<architecture_metadata version="1" language="ts">
  <architecture_type>fsd_standard</architecture_type>
  <scope>full</scope>
  <module_units>
    <unit path="src/pages/home" layer="pages" />
    <unit path="src/widgets/header" layer="widgets" />
    <unit path="src/features/auth" layer="features" />
    <unit path="src/entities/user" layer="entities" />
    <unit path="src/shared/ui/base/button" layer="shared" />
  </module_units>
  <entrypoints>
    <entrypoint path="src/app/index.ts" />
  </entrypoints>
  <ruleset>${PROJECT_NAME}-2025-10</ruleset>
</architecture_metadata>
```

### Partial Validation (Single Slice)

```xml
<architecture_metadata version="1" language="ts">
  <architecture_type>fsd_standard</architecture_type>
  <scope>partial</scope>
  <partial_root>src/features/auth</partial_root>
  <module_units>
    <unit path="src/features/auth" layer="features" />
  </module_units>
  <entrypoints>
    <entrypoint path="src/app/index.ts" />
  </entrypoints>
  <ruleset>${PROJECT_NAME}-2025-10</ruleset>
</architecture_metadata>
```

## TIER 8: Applicability and Validation

### ✅ Suitable for

- Medium and complex frontend applications
- Projects without explicit domain separation
- Teams starting with FSD
- Applications with clear functional structure

### ❌ Not suitable for

- Simple applications (use `single_module` or `layered_library`)
- Projects with explicit domain separation (use `fsd_domain`)
- Server applications (use `server_fsd`)
- Monorepos with multiple applications (use `multi_app_monolith`)

<completion_criteria>
Document is fully ready for use: all FSD Standard architecture rules are defined, structure examples provided, XML schemas for validator ready, metadata correct. Document complies with reference prompt standard and can be used for project architecture validation.
</completion_criteria>

[REFERENCE-END]
