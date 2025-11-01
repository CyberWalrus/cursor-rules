---
id: package-cursor-rules
documentation_type: 'ai-package-documentation'
package_context:
    name: 'cursor-rules'
    type: 'tool'
    architecture_type: 'layered_library'
    main_exports: ['initCommand', 'updateCommand', 'replaceAllCommand', 'runCli']
    workspace_path: '.'
context7_refs: ['commander', 'fs-extra', 'chalk', 'zod', 'typescript', 'vitest']
module_docs:
    type: 'by_layer'
    rule: 'per_library'
    targets: ['src/cli/*', 'src/lib/*', 'src/model/*']
architecture_docs:
    format: 'single'
    root: 'architecture.xml'
---

# 📦 AI-документация: cursor-rules

<package_purpose>
**Назначение пакета:**
CLI инструмент для централизованного управления правилами `.cursor` в проектах. Обеспечивает инициализацию, обновление и замену конфигурационных файлов Cursor AI с отслеживанием версий.

**Решаемые задачи:**

- Единообразное распространение правил `.cursor` между проектами
- Версионное управление с инкрементальными обновлениями
- Автоматизация синхронизации правил при изменении базовой конфигурации
- Предотвращение конфликтов при обновлении существующих правил
</package_purpose>

<package_structure>
**Архитектурная схема:**

> **Примечание:** Детальная XML-структура пакета находится в файле `architecture.xml`. Данный файл является единственным источником правды об архитектуре.

**Тип архитектуры:** `layered_library`

**Основные слои:**
- **cli/** — Слой команд командной строки
- **lib/** — Слой утилит и библиотечных функций
- **model/** — Слой типов, констант и схем
</package_structure>

<key_features>
**Основные возможности:**

### Инициализация правил (init)

- Описание: Первичная установка правил `.cursor` в проект
- Использование: `cursor-rules init`
- Особенности: Проверяет наличие существующих правил, запрашивает подтверждение при конфликте, создает файл версии

### Обновление правил (update)

- Описание: Инкрементальное обновление правил на основе diff между версиями
- Использование: `cursor-rules update`
- Особенности: Читает `.cursor-rules-version.json`, вычисляет изменения (add/update/delete), применяет только необходимые изменения

### Полная замена правил (replace-all)

- Описание: Замена всех правил на актуальную версию из пакета
- Использование: `cursor-rules replace-all`
- Особенности: Удаляет старые правила полностью, копирует свежую версию, обновляет версию в `.cursor-rules-version.json`
</key_features>

<architecture_overview>
**Верхнеуровневая архитектура:**

- **cli/commands/*** — Модули команд (init, update, replace-all)
- **cli/main** — Основной CLI entry point с Commander.js
- **lib/file-operations** — Операции с файловой системой
- **lib/version-manager** — Управление версиями и сравнение
- **lib/diff-calculator** — Вычисление diff между версиями
- **model/*** — Типы, константы, Zod схемы

**Взаимодействие модулей:**
Команды (cli/commands) используют утилиты (lib) для работы с файлами и версиями. Model слой предоставляет типы и схемы валидации для всех остальных модулей.
</architecture_overview>

<detailed_modules>
**Детальная структура модулей:**

### Модуль: CLI Commands Init

**Статус:** 🚧 Заглушка
**Расположение:** `src/cli/commands/init/`
**Экспорты:** initCommand
**Файлы:**

- `index.ts` — Команда инициализации правил в проекте
- `__tests__/init.test.ts` — Unit тесты

### Модуль: CLI Commands Update

**Статус:** 🚧 Заглушка
**Расположение:** `src/cli/commands/update/`
**Экспорты:** updateCommand
**Файлы:**

- `index.ts` — Команда обновления правил на основе diff
- `__tests__/update.test.ts` — Unit тесты

### Модуль: CLI Commands Replace-All

**Статус:** 🚧 Заглушка
**Расположение:** `src/cli/commands/replace-all/`
**Экспорты:** replaceAllCommand
**Файлы:**

- `index.ts` — Команда полной замены правил
- `__tests__/replace-all.test.ts` — Unit тесты

### Модуль: CLI Main

**Статус:** 🚧 Заглушка
**Расположение:** `src/cli/main/`
**Экспорты:** runCli
**Файлы:**

- `index.ts` — Основной CLI entry point с Commander.js
- `__tests__/main.test.ts` — Unit тесты

### Модуль: File Operations

**Статус:** 🚧 Заглушка
**Расположение:** `src/lib/file-operations/`
**Экспорты:** copyRulesToTarget, deleteRulesFromTarget, readVersionFile, writeVersionFile
**Файлы:**

- `index.ts` — Операции с файловой системой (fs-extra)
- `__tests__/file-operations.test.ts` — Unit тесты

### Модуль: Version Manager

**Статус:** 🚧 Заглушка
**Расположение:** `src/lib/version-manager/`
**Экспорты:** getCurrentVersion, getPackageVersion, compareVersions
**Файлы:**

- `index.ts` — Управление версиями и сравнение
- `__tests__/version-manager.test.ts` — Unit тесты

### Модуль: Diff Calculator

**Статус:** 🚧 Заглушка
**Расположение:** `src/lib/diff-calculator/`
**Экспорты:** calculateDiff, getFilesToAdd, getFilesToUpdate, getFilesToDelete
**Файлы:**

- `index.ts` — Вычисление diff между версиями
- `__tests__/diff-calculator.test.ts` — Unit тесты

### Модуль: Model Types

**Статус:** 🚧 Заглушка
**Расположение:** `src/model/types/`
**Экспорты:** CommandType, VersionInfo, RulesConfig
**Файлы:**

- `main.ts` — TypeScript типы

### Модуль: Model Constants

**Статус:** 🚧 Заглушка
**Расположение:** `src/model/constants/`
**Экспорты:** VERSION_FILE_NAME, CURSOR_DIR, RULES_PATHS
**Файлы:**

- `main.ts` — Константы проекта

### Модуль: Model Schemas

**Статус:** 🚧 Заглушка
**Расположение:** `src/model/schemas/`
**Экспорты:** versionSchema
**Файлы:**

- `main.ts` — Zod схемы валидации
- `__tests__/schemas.test.ts` — Unit тесты
</detailed_modules>

<e2e_testing>
**E2E тестирование:**

### Сценарий: Полный цикл init → update → replace-all

- **Файл:** Планируется в `__tests__/e2e/full-cycle.test.ts`
- **Покрытие:** Инициализация в чистом проекте, обновление с версией diff, полная замена
- **Статус:** требует реализации

### Сценарий: Конфликты при обновлении

- **Файл:** Планируется в `__tests__/e2e/conflicts.test.ts`
- **Покрытие:** Обработка существующих файлов, пользовательские модификации, rollback при ошибках
- **Статус:** требует реализации
</e2e_testing>

<technologies_used>
**Используемые технологии:**

- **TypeScript**: ^5.7.2 — Строгая типизация, ESM модули, target ES2022
- **Node.js**: >=18.0.0 — Современные API (fs promises, fetch)
- **commander**: ^12.1.0 — Парсинг CLI команд и аргументов
- **fs-extra**: ^11.2.0 — Расширенные операции с файловой системой
- **chalk**: ^5.3.0 — Цветной вывод в терминал
- **zod**: ^3.24.1 — Валидация схем данных

**Инструменты разработки:**

- vitest: ^2.1.8 — Тестирование с мокированием
- eslint: ^9.17.0 — Линтинг кода
- @typescript-eslint/parser: ^8.18.2 — TypeScript парсер для ESLint
</technologies_used>

<implementation_details>
**Особенности реализации:**

### Версионирование через .cursor-rules-version.json

Создается в корне проекта при инициализации. Содержит текущую версию, дату установки и источник. Используется для вычисления diff при обновлении.

**Причина:** Обеспечивает отслеживание версий без зависимости от git или других VCS.

### ESM модули с node: префиксом

Все Node.js импорты используют `node:` префикс (node:fs, node:path). Полная поддержка ESM без CommonJS.

**Преимущества:** Совместимость с современными инструментами, четкое разделение Node.js API от npm пакетов.

**Важные детали архитектуры:**

- Все модули следуют facade pattern с index.ts
- Named exports only (запрет default exports)
- Один файл = одна функция (кроме helpers.ts)
- Тесты в __tests__ рядом с исходниками
</implementation_details>

<development_commands>
**Критическая важность команд разработки:**

🚨 **Эти команды - основа профессиональной разработки! Их игнорирование приводит к техническому долгу и потере репутации команды.**

**⚡ Обязательные команды качества:**

```bash
# 🔍 ЛИНТИНГ - предотвращение 90% багов до коммита
npm run lint
# КРИТИЧНО: Запускать перед каждым коммитом!

# 🧪 ТЕСТИРОВАНИЕ - гарантия стабильности в production
npm run test
# КРИТИЧНО: Все тесты должны проходить перед деплоем!

# ✅ ПРОВЕРКА ТИПОВ - предотвращение runtime ошибок
npm run typecheck
# КРИТИЧНО: TypeScript должен компилироваться без ошибок!

# 📦 СБОРКА - проверка готовности к production
npm run build
# КРИТИЧНО: Сборка должна проходить без warnings!

# 🔥 РАЗРАБОТКА - hot reload для быстрой итерации
npm run dev
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

