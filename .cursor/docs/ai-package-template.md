---
id: ai-documentation-package-reference
type: reference
use_cases: ['ai_package_documentation', 'package_templates', 'documentation_standards']
prompt_language: mixed
response_language: ru
alwaysApply: false
---

# 📦 AI Package Documentation Reference (Справочник пакетной документации)

[REFERENCE-BEGIN]

## 🎯 TIER 1: Expert Role

<expert_role>
You are an elite AI Documentation Engineer for complex packages (workspace level) and architectural layers.
Focus: package-level AI documentation (package-ai-docs.md), module_docs policy, and cross-model compatibility.
Target models: Claude, GPT, Gemini, Qwen.

**ВАЖНО: Все ответы должны быть на русском языке.**
</expert_role>

## 🎯 TIER 1: Область применения

<reference_scope>
Полный справочник для создания AI-документации пакетов (package-ai-docs.md).
Покрывает: YAML метаданные, структуру секций, XML шаблоны, примеры реальных пакетов.
Включает правила module_docs для генерации module-ai-docs на уровне модульных единиц.
Используется: при документировании целых пакетов workspace с package.json.
</reference_scope>

## 📦 TIER 2: Шаблон пакетной документации

<package_template>

**Полный шаблон package-ai-docs.md:**

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

**Связь architecture_type с module_docs:**

- `single_module` → module_docs НЕ нужен (весь пакет = одна единица)
- `layered_library` → `by_layer` (по слоям api/ui/lib)
- `fsd_standard|fsd_domain` → `fsd-slices` (по слайсам FSD)
- `server_fsd` → `by_layer` (по серверным слоям)
- `multi_app_monolith` → `custom` (индивидуальные glob-паттерны)

Типы `module_docs.type`:

- `fsd-slices` — генерировать module-ai-docs.md для каждого слайса слоев `pages`, `widgets`, `features`, `entities`.
- `by_layer` — использовать mapping по слоям (например: `core` — библиотеки, `shared` — элементы `ui/lib/api`).
- `custom` — использовать glob-паттерны из `module_docs.targets`.

Правила `module_docs.rule`:

- `per_slice` — один module-ai-docs.md на слайс.
- `per_library` — один на библиотеку в `core`.
- `per_component` — один на компонент в `shared/ui`.

Примеры `module_docs.targets`:

- `['common/pages/*/*', 'common/widgets/*/*', 'common/features/*/*', 'common/entities/*/*']`
- `['common/shared/ui/*/*', 'common/shared/lib/helpers/*', 'common/shared/lib/hooks/*', 'common/core/*']`

</module_docs_policy>

## 🔧 TIER 3: Template переменные

<template_variables>

**Template переменные для пакетной документации:**

- `${PACKAGE_NAME}` - полное имя пакета (@morj/package-name)
- `${PACKAGE_TYPE}` - library|service|tool|application
- `${ARCHITECTURE_TYPE}` - тип архитектуры пакета (см. TIER 4)
- `${WORKSPACE_PATH}` - относительный путь в монорепо
- `${KEY_EXPORTS}` - основные экспорты из src/index.\*
- `${TECH_STACK}` - список используемых технологий
- `${MODULE_*}` - названия архитектурных модулей
- `${FEATURE_*}` - описания ключевых возможностей
- `${E2E_TEST_*}` - описания e2e тестов
- `${HACK_*}` - особенности реализации и хаки

**Дополнительно для module_docs:**

- `${MODULE_DOCS_TYPE}` - тип политики (fsd-slices|by_layer|custom)
- `${MODULE_DOCS_RULE}` - правило (per_slice|per_library|per_component)
- `${MODULE_DOCS_TARGETS}` - список путей/шаблонов для размещения module-ai-docs.md

**Дополнительно для architecture_docs:**

- `${ARCHITECTURE_DOCS_FORMAT}` - 'bundle' | 'single' | 'multi'
- `${ARCHITECTURE_DOCS_ROOT}` - главный файл структуры (для bundle/multi)
- `${ARCHITECTURE_DOCS_FILES}` - список дополнительных файлов структуры
- `${ARCHITECTURE_DOCS_METADATA}` - объект с полями (architecture_type, source_root, workspace_path, entrypoints)

</template_variables>

## 🏗️ TIER 4: Типы архитектур пакетов

<architecture_types>

Поле `architecture_type` в YAML определяет структурную организацию пакета:

### single_module

**Описание:** Весь пакет представляет одну модульную единицу  
**Подходит для:** Небольших библиотек, утилит, простых компонентов  
**Структура:** `src/index.ts` + несколько вспомогательных файлов  
**Пример:** `@morj/shared.format-date`, `@morj/ui.button`

### layered_library

**Описание:** Несколько модульных единиц, организованных по слоям  
**Подходит для:** Библиотек компонентов, наборов утилит, API клиентов  
**Структура:** `src/{api,ui,lib,model}/модули/` с фасадами  
**Пример:** `@morj/shared` (ui + lib + api), `@morj/ui` (компоненты)

### fsd_standard

**Описание:** Feature-Sliced Design без доменной группировки  
**Подходит для:** Средних frontend приложений  
**Структура:** `pages|widgets|features|entities|shared` слои  
**Пример:** `@morj/web-app` (React SPA)

### fsd_domain

**Описание:** FSD с группировкой по бизнес-доменам  
**Подходит для:** Крупных frontend приложений  
**Структура:** `pages/|widgets/{domain}/|features/{domain}/|entities/{domain}/|shared`  
**Пример:** `@morj/casino-frontend` (домены: user, betting, payments)

### server_fsd

**Описание:** Серверная версия FSD для backend приложений  
**Подходит для:** API серверов, микросервисов  
**Структура:** `controllers|services|models|repositories|middleware|config` слои  
**Пример:** `@morj/api-server`, `@morj/auth-service`

### multi_app_monolith

**Описание:** Несколько приложений в одном пакете  
**Подходит для:** Монолитных проектов, CLI tools с подкомандами  
**Структура:** `src/{app1,app2,common}/` с независимыми точками входа  
**Пример:** `@morj/monorepo-tools` (CLI + web + API)

**🎯 ВАЖНОСТЬ УКАЗАНИЯ ТИПА:**

- AI понимает как устроен пакет и где искать нужные файлы
- Автоматически применяются правильные архитектурные практики
- Валидация структуры происходит согласно выбранному типу
- module_docs политика настраивается в соответствии с архитектурой

</architecture_types>

## 📚 TIER 5: Примеры реальных пакетов

<package_examples>

<example type="mcp_validator_package">
**Пример AI-документации для MCP Validator (сокращенный):**

```markdown
---
id: package-mcp-validator
documentation_type: 'ai-package-documentation'
package_context:
    name: '@morj/tools.mcp-validator'
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

# 🔧 AI-документация: @morj/tools.mcp-validator

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

## ⚠️ TIER 6: Обязательные секции

<required_sections>

**Секции пакетной документации:**

- `<package_purpose>` - назначение и решаемые задачи
- `<package_structure>` - детальная XML структура как в примере MCP Validator
- `<key_features>` - подробное описание всех возможностей
- `<architecture_overview>` - верхнеуровневая архитектура + взаимодействие
- `<detailed_modules>` - модули с экспортами и статусом (готов/проблемы/заглушка)
- `<e2e_testing>` - описание e2e тестов и покрытия
- `<technologies_used>` - все технологии с версиями и назначением
- `<implementation_details>` - хаки, особенности, важные детали
- `<development_commands>` - мотивированные yarn workspace команды

**YAML метаданные:**

- `documentation_type: 'ai-package-documentation'`
- `ai_documentation_version: '2.0.0'`
- `package_context` с полными метаданными пакета:
    - `architecture_type` — **ОБЯЗАТЕЛЬНО**: тип архитектуры из TIER 4
    - `name`, `type`, `main_exports`, `workspace_path`
- `size_limits: content: { max: 4000 }` для больших пакетов
- `module_docs: { type, rule, targets }` — политика размещения module-ai-docs.md
- `architecture_docs: { format, root, files, metadata }` — расположение и политика архитектурных XML файлов

> Workflow: детальную XML‑структуру пакета НЕ хранить внутри `package-ai-docs.md`. Истина — файлы в `architecture/` (для `bundle`/`multi`) или `architecture.xml` в корне пакета (для `single`). Для создания и обновления этих файлов используйте промпт `.cursor/docs/generate-architecture-xml.md`. Эти файлы должны регенерироваться перед архитектурной валидацией и включать метаданные свежести (`generated_at`, `source_revision`).

**Статусы модулей:**

- ✅ **Готов** - полностью реализован и протестирован
- ⚠️ **Проблемы** - работает но есть известные проблемы
- 🚧 **Заглушка** - заготовка или минимальная реализация

</required_sections>

[REFERENCE-END]
