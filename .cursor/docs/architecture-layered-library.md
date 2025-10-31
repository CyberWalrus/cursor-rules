---
id: architecture-layered-library
type: reference
alwaysApply: false
---

# Layered Library — Multi-Module Package

[REFERENCE-BEGIN]

## TIER 1: Expert Role

<expert_role>
You are a Layered Library Architecture Specialist for TypeScript/React projects.

Responsibilities:

- Enforce Layered Library architecture rules with zero exceptions
- Ensure multi-module organization grouped by thematic layers (api, ui, lib, model)
- Validate facade patterns for each independent modular unit
- Guide proper layer usage and module encapsulation without FSD layers
- Prioritize encapsulation through unit facades and minimal public API

**ВАЖНО: Все ответы должны быть на русском языке.**
</expert_role>

<expert_completion_criteria>
Expert role clearly defines responsibilities specific to Layered Library architecture and includes Russian language requirement for responses.
</expert_completion_criteria>

## TIER 2: Purpose and Application

<exception_handling>
When working with Layered Library architecture, the following exceptional situations are possible:

- Project exceeds module unit limit (more than 10–15) → migrate to FSD or multi_app_monolith
- Layer violation → immediate move of modules to corresponding layers
- Mixing FSD layers → strict check for absence of pages/widgets/features/entities
- Uncertainty in layer selection → priority by thematic grouping (api for integrations, ui for components)

Fix priorities:

1. **Critical:** Fix immediately (facade or layer violation)
2. **Medium:** Plan module refactoring
3. **Low:** Add documentation for new layers
   </exception_handling>

<algorithm_motivation>
Layered Library architecture provides modularity and layered organization for libraries, simplifying maintenance and expansion without breaking encapsulation. Grouping by thematic layers minimizes dependencies and speeds up code search.
</algorithm_motivation>

<cognitive_triggers>
Let's determine step by step if the project is suitable for Layered Library architecture by analyzing number of module units, thematic grouping, and absence of FSD structure.
</cognitive_triggers>

<architecture_scope>
Layered Library — architectural type for packages containing several independent module units, grouped by thematic layers without FSD layers.
**Purpose:** Component libraries, shared layers, utility packages, API clients.
**Key principle:** Facades everywhere (each module has index.ts), common entry through src/index.ts, layered grouping (api, ui, lib, model).
</architecture_scope>

<scope_completion_criteria>
Architecture scope clearly defines purpose, key principle, and decision criteria for Layered Library usage.
</scope_completion_criteria>

### Architecture Selection Algorithm

<algorithm_steps>

1. **Modularity analysis:** Determine number of independent module units (functions/components/hooks)
2. **File and layer count:**
    - Unix/Linux: `find src -type f -name "*.ts*" | wc -l` (excluding tests, types, configs)
    - Check for thematic groups (api, ui, etc.)
3. **Layer assessment:** Check if grouping by themes without FSD structure is possible
4. **Decision making:** Apply architecture selection rules

</algorithm_steps>

If project contains:

- ✓ Several (3–15) independent module units
- ✓ Thematic grouping (api for integrations, ui for components)
- ✓ Absence of FSD layers (pages, features, etc.)
- ✓ Common facade src/index.ts

### → Layered Library

Otherwise → single_module (for 1–2 units) or FSD (for complex applications)

<step_completion_criteria>
Algorithm is clearly structured with step-by-step instructions and decision criteria for Layered Library.
</step_completion_criteria>

<exception_handling>

If number of modules is in borderline zone (2–3), conduct additional analysis:

- If modules are thematically different → Layered Library
- If closely related → single_module
- If uncertain → choose layered architecture for scalability

If more than 15 modules → must use FSD or multi_app_monolith.

</exception_handling>

### Quick Suitability Check

| **Condition** | **✅ Suitable**                 | **❌ Not Suitable**             |
| ----------- | ------------------------------- | ------------------------------ |
| Modularity | 3–15 independent units         | 1 unit or >20              |
| Layers        | Thematic grouping        | FSD layers or flat structure |
| Purpose  | Libraries, shared, API clients | Full applications         |
| Dependencies | Minimal within layers        | Complex cross-layer          |

### Key Characteristics

- **Modularity:** Multiple independent module units
- **Layering:** Grouping by thematic layers (api, ui, lib, model)
- **Facades everywhere:** Each module unit has index.ts
- **Common entry:** Single package facade src/index.ts

## TIER 3: Project Structure

<output_format>

When describing project structure, use XML schema with clear file roles and purposes. For each element specify:

- `name` — file/directory name
- `role` — role (layer, module, facade, function, types, unit_test)
- `purpose` — purpose
- `exports` — what it exports (for facades)

</output_format>

<cognitive_triggers>
Let's analyze mandatory Layered Library structure step by step, starting with common facade and layers, adding modules and files.
</cognitive_triggers>

### Basic Schema

```xml
<package_root>
  <source_directory name="src">
    <entrypoint name="index.ts" purpose="Фасад пакета — общий вход" />
    <layer name="api" purpose="Слой интеграций">
      <directory name="external">
        <module name="service-name">
          <facade name="index.ts" role="unit_facade" purpose="Фасад модульной единицы" exports="createServiceClient" />
          <file name="client.ts" role="function" purpose="Основная функция интеграции" />
          <file name="types.ts" role="types" purpose="Локальные типы" />
          <directory name="__tests__" purpose="Тесты модуля">
            <test name="client.test.ts" role="unit_test" />
          </directory>
        </module>
      </directory>
    </layer>
    <layer name="ui" purpose="Слой компонентов">
      <directory name="base">
        <module name="button">
          <facade name="index.ts" role="unit_facade" purpose="Фасад модульной единицы" exports="Button" />
          <file name="Button.tsx" role="component" purpose="Основной компонент" />
          <file name="types.ts" role="types" purpose="Локальные типы" />
          <directory name="__tests__" purpose="Тесты модуля">
            <test name="button.test.tsx" role="unit_test" />
          </directory>
        </module>
      </directory>
    </layer>
    <layer name="lib" purpose="Слой утилит и хуков">
      <directory name="hooks">
        <module name="use-safe-back">
          <facade name="index.ts" role="unit_facade" purpose="Фасад модульной единицы" exports="useSafeBack" />
          <file name="use-safe-back.ts" role="function" purpose="Основной хук" />
          <directory name="__tests__" purpose="Тесты модуля">
            <test name="use-safe-back.test.ts" role="unit_test" />
          </directory>
        </module>
      </directory>
      <directory name="helpers">
        <module name="format-date">
          <facade name="index.ts" role="unit_facade" purpose="Фасад модульной единицы" exports="formatDate" />
          <file name="format-date.ts" role="function" purpose="Основная функция" />
          <directory name="__tests__" purpose="Тесты модуля">
            <test name="format-date.test.ts" role="unit_test" />
          </directory>
        </module>
      </directory>
    </layer>
    <layer name="model" purpose="Слой типов и схем">
      <directory name="types">
        <module name="user">
          <facade name="index.ts" role="unit_facade" purpose="Фасад модульной единицы" exports="type UserData" />
          <file name="user.ts" role="types" purpose="Типы пользователя" />
        </module>
      </directory>
      <directory name="schemas">
        <module name="validation">
          <facade name="index.ts" role="unit_facade" purpose="Фасад модульной единицы" exports="userSchema" />
          <file name="user-schema.ts" role="schemas" purpose="Схемы валидации" />
        </module>
      </directory>
    </layer>
  </source_directory>
</package_root>
```

<structure_completion_criteria>
Structure is clearly defined with XML schema, element roles and purposes for Layered Library.
</structure_completion_criteria>

### Allowed Layers

#### Core Layers

- `api/` — integrations with external services
- `ui/` — user interface components
- `lib/` — utilities, hooks, helpers
- `model/` — types, schemas, constants. Subdirs (constants/schemas/types): single main.ts preferred; nested modules allowed for sub-groups (e.g., constants/default-values/index.ts)

#### Additional Layers (up to 10)

- `core/` — base utilities and modules
- `schemas/` — validation schemas (Zod, JSON Schema)
- `assets/` — static resources
- `services/` — cross-cutting package services
- `cli/` — command line interfaces
- `config/` — configuration modules
- `adapters/` — external system adapters
- `gateways/` — infrastructure access
- `workflows/` — business processes
- `handlers/` — event handlers

#### Custom Layers

0–3 additional layers with meaningful names according to project are allowed.

## TIER 4: Rules and Constraints

### ✅ Requirements

- [ ] **Package facade:** `src/index.ts` as common entry point
- [ ] **Module facades:** Each module unit has `index.ts` facade
- [ ] **Encapsulation:** No export of internal helpers outward
- [ ] **Named exports:** Only named exports
- [ ] **Tests nearby:** Tests in `__tests__/` at module level
- [ ] **One function per file:** Each file — one main function/component
- [ ] **Layered organization:** Modules grouped by thematic layers
- [ ] **Facades index.ts:** Re-exports OR single main function (simple modules ≤10 lines total; no multiple functions/helpers)
- [ ] **Helpers:** Separate file if exported or >10 lines; private — inline in main function file

### ❌ Forbidden

- FSD layers (`pages`, `widgets`, `features`, `entities`)
- Direct imports from internal parts of module units
- Export of auxiliary elements through main facade
- Cross-imports between module units within layer
- `Default` exports
- Facades with multiple functions/logic (god facades)
- Export helpers outward through facade

### Risk Assessment

<cognitive_triggers>
Let's analyze potential risks when using Layered Library architecture and ways to mitigate them.
</cognitive_triggers>

**Potential problems and solutions:**

| **Risk**                  | **Symptoms**                | **Mitigation**                                                    |
| ------------------------- | --------------------------- | ---------------------------------------------------------------- |
| Layer violation      | Modules in wrong layers | ESLint: import path rules + thematic checking           |
| Module limit exceeded        | >15 module units        | Migration to FSD or multi_app_monolith                           |
| Internal API leak     | Export of helper functions      | Hiding through facades, public API only                       |
| Cross-layer dependencies | Imports violate themes   | Limit imports by layers (lib → ui allowed, ui → lib not) |

<risk_completion_criteria>
Risk Assessment contains specific risks, their symptoms, and mitigation methods for Layered Library.
</risk_completion_criteria>

## TIER 5: Usage Examples

### UI Kit Library

**Description:** Component library with ui, lib, model layers

```xml
<package_root>
  <source_directory name="src">
    <entrypoint name="index.ts" purpose="Главный фасад" />
    <layer name="ui" purpose="Компоненты">
      <directory name="base">
        <module name="button">
          <facade name="index.ts" role="unit_facade" exports="Button" />
          <file name="Button.tsx" role="component" />
          <file name="types.ts" role="types" />
          <directory name="__tests__">
            <test name="button.test.tsx" role="unit_test" />
          </directory>
        </module>
        <module name="input">
          <facade name="index.ts" role="unit_facade" exports="Input" />
          <file name="Input.tsx" role="component" />
          <directory name="__tests__">
            <test name="input.test.tsx" role="unit_test" />
          </directory>
        </module>
      </directory>
      <directory name="complex">
        <module name="form">
          <facade name="index.ts" role="unit_facade" exports="Form" />
          <file name="Form.tsx" role="component" />
          <directory name="__tests__">
            <test name="form.test.tsx" role="unit_test" />
          </directory>
        </module>
      </directory>
    </layer>
    <layer name="lib" purpose="Утилиты">
      <directory name="hooks">
        <module name="use-form">
          <facade name="index.ts" role="unit_facade" exports="useForm" />
          <file name="use-form.ts" role="function" />
          <directory name="__tests__">
            <test name="use-form.test.ts" role="unit_test" />
          </directory>
        </module>
        <module name="use-validation">
          <facade name="index.ts" role="unit_facade" exports="useValidation" />
          <file name="use-validation.ts" role="function" />
          <directory name="__tests__">
            <test name="use-validation.test.ts" role="unit_test" />
          </directory>
        </module>
      </directory>
      <directory name="helpers">
        <module name="format-utils">
          <facade name="index.ts" role="unit_facade" exports="formatDate" />
          <file name="format-date.ts" role="function" />
          <directory name="__tests__">
            <test name="format-date.test.ts" role="unit_test" />
          </directory>
        </module>
      </directory>
    </layer>
    <layer name="model" purpose="Типы и схемы">
      <directory name="types">
        <module name="form">
          <facade name="index.ts" role="unit_facade" exports="type FormProps, FormState" />
          <file name="form.ts" role="types" />
        </module>
      </directory>
      <directory name="schemas">
        <module name="validation">
          <facade name="index.ts" role="unit_facade" exports="formSchema" />
          <file name="form-schema.ts" role="schemas" />
        </module>
      </directory>
    </layer>
  </source_directory>
</package_root>
```

### API Integration Library

**Description:** Library for multiple external services

```xml
<package_root>
  <source_directory name="src">
    <entrypoint name="index.ts" purpose="Главный фасад" />
    <layer name="api" purpose="Интеграции">
      <directory name="external">
        <module name="payment-service">
          <facade name="index.ts" role="unit_facade" exports="createPaymentClient" />
          <file name="client.ts" role="function" />
          <file name="types.ts" role="types" />
          <directory name="__tests__">
            <test name="client.test.ts" role="unit_test" />
          </directory>
        </module>
        <module name="analytics-service">
          <facade name="index.ts" role="unit_facade" exports="createAnalyticsClient" />
          <file name="client.ts" role="function" />
          <directory name="__tests__">
            <test name="client.test.ts" role="unit_test" />
          </directory>
        </module>
      </directory>
      <directory name="internal">
        <module name="user-api">
          <facade name="index.ts" role="unit_facade" exports="userEndpoints" />
          <file name="endpoints.ts" role="function" />
          <directory name="__tests__">
            <test name="endpoints.test.ts" role="unit_test" />
          </directory>
        </module>
      </directory>
    </layer>
    <layer name="lib" purpose="Утилиты">
      <directory name="helpers">
        <module name="http-client">
          <facade name="index.ts" role="unit_facade" exports="httpClient" />
          <file name="http-client.ts" role="function" />
          <directory name="__tests__">
            <test name="http-client.test.ts" role="unit_test" />
          </directory>
        </module>
        <module name="retry-logic">
          <facade name="index.ts" role="unit_facade" exports="withRetry" />
          <file name="retry.ts" role="function" />
          <directory name="__tests__">
            <test name="retry.test.ts" role="unit_test" />
          </directory>
        </module>
      </directory>
    </layer>
    <layer name="model" purpose="Типы и схемы">
      <directory name="types">
        <module name="api">
          <facade name="index.ts" role="unit_facade" exports="type ApiResponse" />
          <file name="api.ts" role="types" />
        </module>
      </directory>
      <directory name="schemas">
        <module name="requests">
          <facade name="index.ts" role="unit_facade" exports="paymentSchema" />
          <file name="payment-schema.ts" role="schemas" />
        </module>
      </directory>
    </layer>
  </source_directory>
</package_root>
```

**Note:** Each layer contains only relevant modules; tests always next to code.

### Facade Example

**✅ Correct facade (re-exports only):**

```typescript
// src/lib/helpers/format-date/index.ts
export { formatDate } from './format-date';
export type { DateFormatOptions } from './types';
```

**❌ Incorrect (logic in facade):**

```typescript
// BAD: functions in index.ts
export function formatDate(date: Date) { ... }  // Logic here violates
export { formatDate };  // Duplicate
```

### Simple single-function facade

**✅ Correct (single function):**

```typescript
// src/lib/simple-utils/simple-func/index.ts
/** Простая утилита */
export function simpleFunc(value: string): string {
    if (!value) return '';
    return value.toUpperCase();
}
```

### Model layer example

**Single file (simple subdir):**
constants/main.ts — exports DEFAULT_CONFIG etc. (self-contained, no facade dir).

**Nested sub-module:**
constants/default-values/index.ts — facade re-exports from sub-files (complex).

## TIER 6: XML Schema for Validator

```xml
<package_root>
  <source_directory name="src">
    <entrypoint name="index.ts" />
    <layer name="api" purpose="интеграции">
      <directory name="external">
        <module name="service-name">
          <facade name="index.ts" role="unit_facade" />
          <file name="client.ts" role="function" />
          <test name="__tests__/client.test.ts" role="unit_test" />
        </module>
      </directory>
    </layer>
    <layer name="ui" purpose="компоненты">
      <directory name="base">
        <module name="button">
          <facade name="index.ts" role="unit_facade" />
          <file name="Button.tsx" role="component" />
          <file name="types.ts" role="types" />
          <test name="__tests__/button.test.ts" role="unit_test" />
        </module>
      </directory>
    </layer>
    <layer name="lib" purpose="утилиты и хуки">
      <directory name="hooks">
        <module name="use-safe-back">
          <facade name="index.ts" role="unit_facade" />
          <file name="use-safe-back.ts" role="function" />
          <test name="__tests__/use-safe-back.test.ts" role="unit_test" />
        </module>
      </directory>
    </layer>
    <layer name="model" purpose="типы и схемы">
      <directory name="types">
        <module name="user">
          <facade name="index.ts" role="unit_facade" />
          <file name="user.ts" role="types" />
        </module>
      </directory>
    </layer>
  </source_directory>
</package_root>
```

> Примечание: для больших пакетов допускается разбиение структуры на несколько XML-файлов (формат `bundle` в папке `architecture/`). Для простых пакетов используется один файл `architecture.xml` в корне пакета (формат `single`). Валидатор объединяет такие файлы детерминированно и проверяет согласованность метаданных.

## TIER 7: Metadata for Validator

### Full Validation

```xml
<architecture_metadata version="1" language="ts">
  <architecture_type>layered_library</architecture_type>
  <scope>full</scope>
  <module_units>
    <unit path="src/api/external/service-name" layer="api" />
    <unit path="src/ui/base/button" layer="ui" />
    <unit path="src/lib/hooks/use-safe-back" layer="lib" />
    <unit path="src/model/types/user" layer="model" />
  </module_units>
  <entrypoints>
    <entrypoint path="src/index.ts" />
  </entrypoints>
  <ruleset>${PROJECT_NAME}-2025-10</ruleset>
</architecture_metadata>
```

### Partial Validation (Single Module)

```xml
<architecture_metadata version="1" language="ts">
  <architecture_type>layered_library</architecture_type>
  <scope>partial</scope>
  <partial_root>src/ui/base/button</partial_root>
  <module_units>
    <unit path="src/ui/base/button" layer="ui" />
  </module_units>
  <entrypoints>
    <entrypoint path="src/index.ts" />
  </entrypoints>
  <ruleset>${PROJECT_NAME}-2025-10</ruleset>
</architecture_metadata>
```

## TIER 8: Applicability and Validation

### ✅ Suitable for

- UI libraries and design systems
- Shared layers in FSD applications
- Utility libraries with different areas
- API clients for multiple services
- Hook and helper libraries

### ❌ Not suitable for

- Simple packages with one function (use `single_module`)
- Full applications (use `fsd_*`)
- Monoliths with multiple applications (use `multi_app_monolith`)

<completion_criteria>
Document is fully ready for use: all Layered Library architecture rules are defined, structure examples provided, XML schemas for validator ready, metadata correct. Document complies with reference prompt standard and can be used for project architecture validation.
</completion_criteria>

[REFERENCE-END]
