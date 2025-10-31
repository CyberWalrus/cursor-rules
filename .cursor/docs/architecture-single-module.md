---
id: architecture-single-module
type: reference
alwaysApply: false
---

# Single Module — Минимальная модульная единица

[REFERENCE-BEGIN]

## TIER 1: Expert Role

<expert_role>
You are a Single Module Architecture Specialist for TypeScript/React projects.

Responsibilities:

- Enforce Single Module architecture rules with zero exceptions
- Ensure encapsulation through facade pattern (src/index.ts)
- Validate single responsibility principle
- Guide proper file organization for simple projects

**ВАЖНО: Все ответы должны быть на русском языке.**
</expert_role>

<expert_completion_criteria>
Expert role clearly defines responsibilities and language requirements for Russian responses.
</expert_completion_criteria>

## TIER 2: Purpose and Application

<exception_handling>
When working with Single Module architecture, the following exceptional situations are possible:

- Project exceeds file limit → migrate to Layered Library
- Facade violation → immediate fix through ESLint rules
- Mixed responsibilities → refactor into separate modules
- Uncertainty in architecture selection → priority simplicity (Single Module)

Fix priorities:

1. **Critical:** Fix immediately (facade violation)
2. **Medium:** Plan refactoring in next sprint
3. **Low:** Add to technical debt
   </exception_handling>

<algorithm_motivation>
Single Module architecture accelerates development of simple packages, provides predictable structure and simplifies onboarding of new developers. Minimizes cognitive load through single facade and clear organization rules.
</algorithm_motivation>

<cognitive_triggers>
Let's determine step by step if the project is suitable for Single Module architecture by analyzing its size, functionality, and responsibility area.
</cognitive_triggers>

<architecture_scope>
Single Module — architectural type for simple packages, where entire project represents one module unit with single facade.

**Purpose:** Minimal architecture for libraries, utilities, components, hooks.
**Key principle:** Everything through single facade `src/index.ts` (Facade Pattern — single entry point for all public APIs)
</architecture_scope>

<scope_completion_criteria>
Architecture scope clearly defines purpose, key principle, and decision criteria for Single Module usage.
</scope_completion_criteria>

### Architecture Selection Algorithm

<algorithm_steps>

1. **Functionality analysis:** Determine number of main functions/components/hooks
2. **File count:**
    - Unix/Linux: `find src -name "*.ts" -not -name "*.test.ts" -not -name "*.spec.ts" -not -name "types.ts" -not -name "constants.ts" -not -name "*.config.*" | wc -l`
    - Windows: `dir /s /b src\*.ts | findstr /v "test spec types constants config" | find /c /v ""`
3. **Responsibility assessment:** Check if project solves one clearly defined task
4. **Decision making:** Apply architecture selection rules
   </algorithm_steps>

If project contains:

- ✓ One main function/component/hook
- ✓ Less than 20 files with business logic (excluding `types.ts`, `constants.ts`, `*.config.*`, `*.test.*`, `*.spec.*`)
- ✓ Single responsibility area

### → Single Module

Otherwise → consider Layered Library or FSD

<step_completion_criteria>
Algorithm is clearly structured with step-by-step instructions and decision criteria.
</step_completion_criteria>

<exception_handling>
If number of files is in borderline zone (8-9 files), conduct additional analysis:

- If files are closely related functionally → Single Module
- If there are clear function groups → Layered Library
- If uncertain → choose simpler architecture (Single Module)

If 20 or more files → must use Layered Library or FSD.
</exception_handling>

### Quick Suitability Check

| **Condition**      | **✅ Suitable**            | **❌ Not Suitable**         |
| ---------------- | -------------------------- | -------------------------- |
| Functionality | Email validator, React hook | UI kit, complex application |
| Size           | < 20 files                | > 30 files                |
| Responsibility  | One clear task         | Multiple tasks       |
| Dependencies      | Minimal                | Complex interconnections        |

### Key Characteristics

- **Simplicity:** One module unit for entire package
- **Encapsulation:** Public API only through `src/index.ts`
- **Minimalism:** Only necessary files
- **Self-sufficiency:** Contains own types/constants/helpers

## TIER 3: Project Structure

<output_format>
When describing project structure, use XML schema with clear file roles and purposes. For each file specify:

- `name` — file name
- `role` — role (function, types, config, helper, unit_test)
- `purpose` — file purpose
- `exports` — what it exports (for entrypoint)
  </output_format>

<cognitive_triggers>
Let's analyze mandatory Single Module structure step by step, starting with entrypoint and adding necessary files.
</cognitive_triggers>

### Required Structure

```xml
<package_root>
  <source_directory name="src">
    <entrypoint name="index.ts" purpose="Фасад — точка входа/реэкспорт" />
    <file name="main-file.ts" role="function" purpose="Основной файл с функционалом" />
    <directory name="__tests__" purpose="Тесты рядом с исходниками">
      <test name="main-file.test.ts" role="unit_test" />
    </directory>
  </source_directory>
</package_root>
```

<structure_completion_criteria>
Structure is clearly defined with XML schema, file roles and purposes.
</structure_completion_criteria>

### Additional Files (Optional)

```xml
<optional_files>
  <file name="src/types.ts" role="types" purpose="TypeScript типы (интерфейсы, enums)" />
  <file name="src/constants.ts" role="config" purpose="Неизменяемые значения" />
  <file name="src/schemas.ts" role="schemas" purpose="Zod схемы, валидаторы" />
  <file name="src/helpers.ts" role="helper" purpose="Internal helper функции" note="не экспортируются" />
</optional_files>
```

## TIER 4: Rules and Constraints

### ✅ Requirements

- [ ] **Facade:** Required `src/index.ts` — entry point/re-export
- [ ] **Named exports:** Only named exports
- [ ] **One function per file:** Each file contains one main function
- [ ] **Type encapsulation:** If types exist, extract to `src/types.ts`
- [ ] **Tests nearby:** Tests in `src/__tests__/`

### ❌ Forbidden

- `Default` exports
- FSD layers (`pages/`, `widgets/`, `features/`)
- Multiple module units
- Export helper functions through facade
- Tests in project root

### Main Prohibitions

- ❌ `Default` exports — only `export { functionName }`
- ❌ FSD layers (`pages/`, `widgets/`, `features/`) — use flat structure in `src/`
- ❌ Multiple main functions — split into Layered Library
- ❌ Export helper functions — hide behind facade
- ❌ Tests in root — place in `src/__tests__/`

### Risk Assessment

<cognitive_triggers>
Let's analyze potential risks when using Single Module architecture and ways to mitigate them.
</cognitive_triggers>

**Potential problems and solutions:**

| **Risk**                    | **Symptoms**                        | **Mitigation**                                                 |
| --------------------------- | ----------------------------------- | ------------------------------------------------------------- |
| Single facade violation    | Direct imports from internal files | ESLint: `import/no-restricted-paths` + `eslint-plugin-import` |
| File limit exceeded    | >20 files with business logic         | Migration to Layered Library                                   |
| Mixed responsibilities | Multiple functions in one file | Refactoring: one function per file                             |
| Internal API leak       | Export of helper functions              | Hiding through facade, public API only                     |

<risk_completion_criteria>
Risk Assessment contains specific risks, their symptoms, and mitigation methods.
</risk_completion_criteria>

## TIER 5: Usage Examples

### Email Validation Library

**Description:** Simple library for email address validation

```xml
<package_root>
  <source_directory name="src">
    <entrypoint name="index.ts" exports="validateEmail" />
    <file name="validate-email.ts" role="function" purpose="основная функция валидации" />
    <file name="types.ts" role="types" exports="ValidationResult, EmailOptions" />
    <file name="constants.ts" role="config" exports="EMAIL_REGEX, ERROR_MESSAGES" />
    <directory name="__tests__">
      <test name="validate-email.test.ts" role="unit_test" />
    </directory>
  </source_directory>
</package_root>
```

**Note:** Structure may vary depending on complexity. For simplest utilities, combining facade and implementation in single `index.ts` file is acceptable.

**Description:** React hook for safe back navigation

```xml
<package_root>
  <source_directory name="src">
    <entrypoint name="index.ts" exports="useSafeBack" />
    <file name="use-safe-back.ts" role="function" purpose="основной React хук" />
    <file name="types.ts" role="types" exports="SafeBackOptions, SafeBackReturn" />
    <file name="helpers.ts" role="helper" purpose="внутренние хелперы" note="не экспортируются" />
    <directory name="__tests__">
      <test name="use-safe-back.test.ts" role="unit_test" />
    </directory>
  </source_directory>
</package_root>
```

### Simple Utility Function

**Description:** Minimal structure for simple utilities

```xml
<package_root>
  <source_directory name="src">
    <entrypoint name="index.ts" purpose="фасад + основная функция (исключение для простейших утилит)" />
    <directory name="__tests__">
      <test name="index.test.ts" role="unit_test" />
    </directory>
  </source_directory>
</package_root>
```

**Note:** For simplest utilities, combining facade and implementation in single `index.ts` file is acceptable, but this is exception to general rule.

## TIER 6: XML Schema for Validator

```xml
<package_root>
  <source_directory name="src">
    <entrypoint name="index.ts" />
    <file name="validate-email.ts" role="function" />
    <file name="types.ts" role="types" />
    <file name="constants.ts" role="config" />
    <test name="__tests__/validate-email.test.ts" role="unit_test" />
  </source_directory>
</package_root>
```

## TIER 7: Metadata for Validator

### Full Validation

```xml
<architecture_metadata version="1" language="ts">
  <architecture_type>single_module</architecture_type>
  <scope>full</scope>
  <module_units>
    <unit path="src" layer="unit" />
  </module_units>
  <entrypoints>
    <entrypoint path="src/index.ts" />
  </entrypoints>
  <ruleset>${PROJECT_NAME}-2025-10</ruleset>
</architecture_metadata>
```

### Частичная валидация

```xml
<architecture_metadata version="1" language="ts">
  <architecture_type>single_module</architecture_type>
  <scope>partial</scope>
  <partial_root>src</partial_root>
  <module_units>
    <unit path="src" layer="unit" />
  </module_units>
  <entrypoints>
    <entrypoint path="src/index.ts" />
  </entrypoints>
  <ruleset>${PROJECT_NAME}-2025-10</ruleset>
</architecture_metadata>
```

## TIER 8: Applicability and Validation

### ✅ Suitable for

- Simple utility libraries
- Individual React hooks
- Validators and parsers
- Mathematical functions
- API clients with single responsibility

### ❌ Not suitable for

- Complex applications
- Packages with multiple functionalities
- UI kits with multiple components
- Applications with routing and state

<completion_criteria>
Document is fully ready for use: all Single Module architecture rules are defined, structure examples provided, prohibition and fix tables contain concrete code examples, Risk Assessment covers main risks, XML schemas for validator ready, metadata correct. Document complies with reference prompt standard and can be used for project architecture validation.
</completion_criteria>

[REFERENCE-END]
