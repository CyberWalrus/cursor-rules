---
id: ai-documentation-package-reference
type: reference
alwaysApply: false
---

# 📦 AI Package Documentation Reference

[REFERENCE-BEGIN]

## 🎯 TIER 1: Expert Role

<expert_role>
You are an elite AI Documentation Engineer for complex packages (workspace level) and architectural layers.
Focus: package-level AI documentation (package-ai-docs.md), module_docs policy, and cross-model compatibility.
Target models: Claude, GPT, Gemini, Qwen.

**ВАЖНО: Все ответы должны быть на русском языке.**
</expert_role>

## 📦 TIER 2: Package Documentation Template

<package_template>

**Complete template for package-ai-docs.md:**

````markdown
---
id: package-${PACKAGE_NAME}
documentation_type: 'ai-package-documentation'
package_context:
    name: '${PACKAGE_NAME}'
    type: '${PACKAGE_TYPE}'
    architecture_type: '${ARCHITECTURE_TYPE}' # single_module|layered_library|fsd_standard|fsd_domain|server_fsd|multi_app_monolith
    main_exports: ['${KEY_EXPORTS}']
    workspace_path: '${WORKSPACE_PATH}'
context7_refs: ['${TECH_STACK}']
module_docs:
    type: '${MODULE_DOCS_TYPE}' # fsd-slices|by_layer|custom
    rule: '${MODULE_DOCS_RULE}' # per_slice|per_library|per_component
    targets: ['${MODULE_DOCS_TARGETS}'] # glob-паттерны или ключи слоев
architecture_docs:
    format: 'bundle' # 'bundle' (в папке architecture/), 'single' (в корне пакета architecture.xml), 'multi' (в папке architecture/)
    root: 'architecture/index.xml' # главный файл (для bundle/multi) или architecture.xml (для single)
    files:
        - 'architecture/lib.xml'
        - 'architecture/ui.xml'
---

# 📦 AI-документация: ${PACKAGE_NAME}

<package_purpose>
**Назначение пакета:**
${PACKAGE_PURPOSE_DESCRIPTION}

**Решаемые задачи:**

- ${KEY_PROBLEM_1}
- ${KEY_PROBLEM_2}
- ${KEY_PROBLEM_3}
  </package_purpose>

<package_structure>
**Архитектурная схема:**

> **Примечание:** Детальная XML-структура пакета находится в файле `architecture.xml` (для простых пакетов) или в файлах внутри директории `architecture/` (для сложных пакетов). Данные файлы являются единственным источником правды об архитектуре.

<key_features>
**Основные возможности:**

### ${FEATURE_1_NAME}

- Описание: ${FEATURE_1_DESCRIPTION}
- Использование: ${FEATURE_1_USAGE}
- Особенности: ${FEATURE_1_DETAILS}

### ${FEATURE_2_NAME}

- Описание: ${FEATURE_2_DESCRIPTION}
- Использование: ${FEATURE_2_USAGE}
- Особенности: ${FEATURE_2_DETAILS}
  </key_features>

<architecture_overview>
**Верхнеуровневая архитектура:**

- **${MODULE_1}**: ${MODULE_1_PURPOSE}
- **${MODULE_2}**: ${MODULE_2_PURPOSE}
- **${MODULE_3}**: ${MODULE_3_PURPOSE}

**Взаимодействие модулей:**
${MODULES_INTERACTION}
</architecture_overview>

<detailed_modules>
**Детальная структура модулей:**

### Модуль: ${MODULE_1}

**Статус:** ✅ Готов | ⚠️ Проблемы | 🚧 Заглушка
**Расположение:** `${MODULE_1_PATH}`
**Экспорты:** ${MODULE_1_EXPORTS} (что предоставляет другим модулям)
**Файлы:**

- `${FILE_1}` - ${FILE_1_PURPOSE}
- `${FILE_2}` - ${FILE_2_PURPOSE}

### Модуль: ${MODULE_2}

**Статус:** ✅ Готов | ⚠️ Проблемы | 🚧 Заглушка
**Расположение:** `${MODULE_2_PATH}`
**Экспорты:** ${MODULE_2_EXPORTS}
**Файлы:**

- `${FILE_3}` - ${FILE_3_PURPOSE}
- `${FILE_4}` - ${FILE_4_PURPOSE}
  </detailed_modules>

<e2e_testing>
**E2E тестирование:**

### ${E2E_TEST_1}

- **Файл:** `${E2E_TEST_1_FILE}`
- **Покрытие:** ${E2E_TEST_1_COVERAGE}
- **Статус:** работает|сломан|требует обновления

### ${E2E_TEST_2}

- **Файл:** `${E2E_TEST_2_FILE}`
- **Покрытие:** ${E2E_TEST_2_COVERAGE}
- **Статус:** работает|сломан|требует обновления
  </e2e_testing>

<technologies_used>
**Используемые технологии:**

- **TypeScript**: ${TS_VERSION} - ${TS_USAGE_DESCRIPTION}
- **Node.js**: ${NODE_VERSION} - ${NODE_FEATURES_USED}
- **${LIBRARY_1}**: ${LIBRARY_1_PURPOSE}
- **${LIBRARY_2}**: ${LIBRARY_2_PURPOSE}

**Инструменты разработки:**

- ${TOOL_1}: ${TOOL_1_PURPOSE}
- ${TOOL_2}: ${TOOL_2_PURPOSE}
  </technologies_used>

<implementation_details>
**Особенности реализации:**

### ${HACK_1_NAME}

${HACK_1_DESCRIPTION}
**Причина:** ${HACK_1_REASON}

### ${PATTERN_1_NAME}

${PATTERN_1_DESCRIPTION}
**Преимущества:** ${PATTERN_1_BENEFITS}

**Важные детали архитектуры:**

- ${IMPORTANT_DETAIL_1}
- ${IMPORTANT_DETAIL_2}
  </implementation_details>

<development_commands>
**Критическая важность команд разработки:**

🚨 **Эти команды - основа профессиональной разработки! Их игнорирование приводит к техническому долгу и потере репутации команды.**

**⚡ Обязательные команды качества:**

```bash
# 🔍 ЛИНТИНГ - предотвращение 90% багов до коммита
yarn workspace ${WORKSPACE_NAME} lint
# КРИТИЧНО: Запускать перед каждым коммитом!

# 🧪 ТЕСТИРОВАНИЕ - гарантия стабильности в production
yarn workspace ${WORKSPACE_NAME} test
# КРИТИЧНО: Все тесты должны проходить перед деплоем!

# ✅ ПРОВЕРКА ТИПОВ - предотвращение runtime ошибок
yarn workspace ${WORKSPACE_NAME} typecheck
# КРИТИЧНО: TypeScript должен компилироваться без ошибок!

# 📦 СБОРКА - проверка готовности к production (если применимо)
yarn workspace ${WORKSPACE_NAME} build
# КРИТИЧНО: Сборка должна проходить без warnings!

# 🔥 РАЗРАБОТКА - hot reload для быстрой итерации (если применимо)
yarn workspace ${WORKSPACE_NAME} dev
# КРИТИЧНО: Используй для непрерывной разработки!
```

**🎯 Мотивация для команд:**

- **lint** → Чистый код = читаемость = легкость поддержки = счастливая команда
- **test** → Рабочие тесты = уверенность в изменениях = быстрые релизы
- **typecheck** → Строгие типы = меньше багов = больше времени на фичи
- **build** → Успешная сборка = готовность к production = довольные пользователи

**⚠️ ПОСЛЕДСТВИЯ ИГНОРИРОВАНИЯ:**

- Пропуск линтинга → накопление технического долга → замедление разработки
- Игнорирование тестов → баги в production → потеря доверия пользователей
- Игнорирование typecheck → runtime ошибки → аварийные исправления в 3 утра

**✅ ПРОФЕССИОНАЛЬНЫЙ СТАНДАРТ:**
Выполнение всех команд перед каждым коммитом = статус Senior Developer = уважение команды!
</development_commands>
````

</package_template>

## 🧩 TIER 3: Module Docs Policy

<module_docs_policy>

**Relationship between architecture_type and module_docs:**

- `single_module` → module_docs NOT needed (entire package = one unit)
- `layered_library` → `by_layer` (by layers api/ui/lib)
- `fsd_standard|fsd_domain` → `fsd-slices` (by FSD slices)
- `server_fsd` → `by_layer` (by server layers)
- `multi_app_monolith` → `custom` (individual glob patterns)

Types of `module_docs.type`:

- `fsd-slices` — generate module-ai-docs.md for each slice of layers `pages`, `widgets`, `features`, `entities`.
- `by_layer` — use layer mapping (e.g., `core` — libraries, `shared` — `ui/lib/api` elements).
- `custom` — use glob patterns from `module_docs.targets`.

Rules for `module_docs.rule`:

- `per_slice` — one module-ai-docs.md per slice.
- `per_library` — one per library in `core`.
- `per_component` — one per component in `shared/ui`.

Examples of `module_docs.targets`:

- `['common/pages/*/*', 'common/widgets/*/*', 'common/features/*/*', 'common/entities/*/*']`
- `['common/shared/ui/*/*', 'common/shared/lib/helpers/*', 'common/shared/lib/hooks/*', 'common/core/*']`

</module_docs_policy>

## 🔧 TIER 3: Template Variables

<template_variables>

**Template variables for package documentation:**

- `${PACKAGE_NAME}` - full package name (@${ORG}/package-name)
- `${PACKAGE_TYPE}` - library|service|tool|application
- `${ARCHITECTURE_TYPE}` - package architecture type (see TIER 4)
- `${WORKSPACE_PATH}` - relative path in monorepo
- `${KEY_EXPORTS}` - main exports from src/index.\*
- `${TECH_STACK}` - list of technologies used
- `${MODULE_*}` - architectural module names
- `${FEATURE_*}` - key feature descriptions
- `${E2E_TEST_*}` - e2e test descriptions
- `${HACK_*}` - implementation details and hacks

**Additional for module_docs:**

- `${MODULE_DOCS_TYPE}` - policy type (fsd-slices|by_layer|custom)
- `${MODULE_DOCS_RULE}` - rule (per_slice|per_library|per_component)
- `${MODULE_DOCS_TARGETS}` - list of paths/patterns for placing module-ai-docs.md

**Additional for architecture_docs:**

- `${ARCHITECTURE_DOCS_FORMAT}` - 'bundle' | 'single' | 'multi'
- `${ARCHITECTURE_DOCS_ROOT}` - main structure file (for bundle/multi)
- `${ARCHITECTURE_DOCS_FILES}` - list of additional structure files
- `${ARCHITECTURE_DOCS_METADATA}` - object with fields (architecture_type, source_root, workspace_path, entrypoints)

</template_variables>

## 🏗️ TIER 4: Package Architecture Types

<architecture_types>

The `architecture_type` field in YAML defines the structural organization of the package:

### single_module

**Description:** Entire package represents one module unit  
**Suitable for:** Small libraries, utilities, simple components  
**Structure:** `src/index.ts` + several helper files  
**Example:** `@${ORG}/shared.format-date`, `@${ORG}/ui.button`

### layered_library

**Description:** Multiple module units organized by layers  
**Suitable for:** Component libraries, utility sets, API clients  
**Structure:** `src/{api,ui,lib,model}/modules/` with facades  
**Example:** `@${ORG}/shared` (ui + lib + api), `@${ORG}/ui` (components)

### fsd_standard

**Description:** Feature-Sliced Design without domain grouping  
**Suitable for:** Medium frontend applications  
**Structure:** `pages|widgets|features|entities|shared` layers  
**Example:** `@${ORG}/web-app` (React SPA)

### fsd_domain

**Description:** FSD with business domain grouping  
**Suitable for:** Large frontend applications  
**Structure:** `pages/|widgets/{domain}/|features/{domain}/|entities/{domain}/|shared`  
**Example:** `@${ORG}/app-name` (domains: user, betting, payments)

### server_fsd

**Description:** Server-side FSD for backend applications  
**Suitable for:** API servers, microservices  
**Structure:** `controllers|services|models|repositories|middleware|config` layers  
**Example:** `@${ORG}/api-server`, `@${ORG}/auth-service`

### multi_app_monolith

**Description:** Multiple applications in one package  
**Suitable for:** Monolithic projects, CLI tools with subcommands  
**Structure:** `src/{app1,app2,common}/` with independent entry points  
**Example:** `@${ORG}/monorepo-tools` (CLI + web + API)

**🎯 IMPORTANCE OF SPECIFYING TYPE:**

- AI understands how package is structured and where to find needed files
- Correct architectural practices are automatically applied
- Structure validation occurs according to selected type
- module_docs policy is configured according to architecture

</architecture_types>

## 📚 TIER 5: Real Package Examples

<package_examples>

<example type="mcp_validator_package">
**Example AI documentation for MCP Validator (abbreviated):**

```markdown
---
id: package-mcp-validator
documentation_type: 'ai-package-documentation'
package_context:
    name: '@${ORG}/tools.mcp-validator'
    type: 'tool'
    architecture_type: 'layered_library'
    main_exports: ['validate', 'test-prompt']
    workspace_path: 'executables/tools/mcp-validator'
architecture_docs:
    format: 'bundle'
    root: 'architecture/index.xml'
    files:
        - 'architecture/lib.xml'
        - 'architecture/ui.xml'
---

# 🔧 AI-документация: @${ORG}/tools.mcp-validator

<package_purpose>
**Назначение пакета:**
Инструмент для валидации кода, промптов и архитектуры через MCP протокол и OpenRouter API.

**Решаемые задачи:**

- Автоматическая проверка качества кода в CI/CD
- Параллельное тестирование промптов на консистентность
- Валидация архитектурных решений через ИИ
  </package_purpose>

<detailed_modules>
**Детальная структура модулей:**

### Модуль: Validation Workflows

**Статус:** ✅ Готов
**Расположение:** `src/services/workflows/validation/`
**Экспорты:** validateCode(), getValidationTypes(), testPrompt()
**Файлы:**

- `validate-code.ts` - основная валидация кода
- `test-prompt.ts` - тестирование промптов

### Модуль: MCP Server

**Статус:** ✅ Готов
**Расположение:** `src/services/adapters/mcp-server/`
**Экспорты:** initializeMCPServer(), handleMCPRequest()
**Файлы:**

- `initialize-mcp-server.ts` - запуск MCP сервера
- `handle-mcp-request.ts` - обработка запросов
  </detailed_modules>

<e2e_testing>
**E2E тестирование:**

### Полная симуляция MCP клиента

- **Файл:** `__tests__/e2e/mcp-integration.test.ts`
- **Покрытие:** stdio коммуникация, все типы валидации, error handling
- **Статус:** работает

### OpenRouter API интеграция

- **Файл:** `__tests__/e2e/openrouter-api.test.ts`
- **Покрытие:** реальные вызовы API с мокированием для стабильности
- **Статус:** работает
  </e2e_testing>
```

</example>

</package_examples>

## ⚠️ TIER 6: Required Sections

<required_sections>

**Package documentation sections:**

- `<package_purpose>` - purpose and solved problems
- `<package_structure>` - detailed XML structure as in MCP Validator example
- `<key_features>` - detailed description of all capabilities
- `<architecture_overview>` - high-level architecture + interactions
- `<detailed_modules>` - modules with exports and status (ready/problems/stub)
- `<e2e_testing>` - e2e test description and coverage
- `<technologies_used>` - all technologies with versions and purposes
- `<implementation_details>` - hacks, features, important details
- `<development_commands>` - motivated yarn workspace commands

**YAML metadata:**

- `documentation_type: 'ai-package-documentation'`
- `ai_documentation_version: '2.0.0'`
- `package_context` with full package metadata:
    - `architecture_type` — **REQUIRED**: architecture type from TIER 4
    - `name`, `type`, `main_exports`, `workspace_path`
- `size_limits: content: { max: 4000 }` for large packages
- `module_docs: { type, rule, targets }` — policy for placing module-ai-docs.md
- `architecture_docs: { format, root, files, metadata }` — location and policy for architectural XML files

> Workflow: do NOT store detailed XML structure of package inside `package-ai-docs.md`. Source of truth — files in `architecture/` (for `bundle`/`multi`) or `architecture.xml` in package root (for `single`). For creating and updating these files use prompt `.cursor/docs/generate-architecture-xml.md`. These files should be regenerated before architectural validation and include freshness metadata (`generated_at`, `source_revision`).

**Module statuses:**

- ✅ **Ready** - fully implemented and tested
- ⚠️ **Problems** - works but has known issues
- 🚧 **Stub** - placeholder or minimal implementation

</required_sections>

[REFERENCE-END]
