# Cursor Rules — профессиональная система AI-промптов

Модульная система AI-промптов для Cursor IDE с автоматической классификацией задач и встроенной валидацией качества. Обеспечивает консистентность кода, архитектурную целостность и автоматическое следование best practices. Решает системные проблемы AI-ассистентов: незавершенность задач, игнорирование инструментов, фабрикацию данных.

> **📖 Методики промптинга:** Подробное описание всех методик → [prompt-engineering-techniques.md](./prompt-engineering-techniques.md)

## 📋 Оглавление

- [Быстрый старт](#-быстрый-старт)
    - [Установка Workspace Rules](#установка-workspace-rules)
    - [Настройка User Rules](#настройка-user-rules)
    - [MCP Серверы](#mcp-серверы)
    - [Получение API ключа OpenRouter](#получение-api-ключа-openrouter)
- [Зачем нужна эта система](#-зачем-нужна-эта-система)
    - [Проблемы работы с AI-агентами](#проблемы-работы-с-ai-агентами)
    - [Как система решает эти проблемы](#как-система-решает-эти-проблемы)
- [Ключевые возможности](#-ключевые-возможности)
- [Поддерживаемые модели AI](#-поддерживаемые-модели-ai)
- [Архитектура системы](#️-архитектура-системы)
    - [Режимы работы](#режимы-работы)
    - [Типы задач](#типы-задач-activity-types)
    - [Типы промптов](#типы-промптов)
- [Структура проекта](#-структура-проекта)
- [Примеры использования](#-примеры-использования)
    - [Команды](#команды)
    - [Режимы работы](#режимы-работы-1)
- [Стандарты и принципы](#-стандарты-и-принципы)
    - [Code Standards](#code-standards-основные-правила)
    - [Naming Conventions](#naming-conventions)
    - [Architecture](#architecture-golden-rule)
    - [Testing Essentials](#testing-essentials)
- [Лицензия](#-лицензия)

## 🚀 Быстрый старт

### Установка Workspace Rules

**Скопируйте папку `.cursor/` в корень вашего проекта.**

**Автоматически активируются (alwaysApply: true):**

- `01-chat-mode-router.mdc` — определяет режим работы (Plan/Agent/Ask)
- `02-rules-navigator.mdc` — навигация по правилам
- `03-code-standards-compact.mdc` — стандарты кода
- `04-naming-compact.mdc` — соглашения именования
- `05-testing-compact.mdc` — правила тестирования
- `06-architecture-compact.mdc` — архитектурные правила
- `07-agent-mode-workflow.mdc` — Agent Mode протокол

### Настройка User Rules

**Путь:** `Cursor Settings` → `Rules, Memories, Commands` → `User Rules`

**Шаг 1: Создайте файл с персональным контекстом**

1. Скопируйте шаблон:

   ```bash
   cp user-rules/meta-info.template.md user-rules/meta-info.md
   ```

2. Откройте `user-rules/meta-info.md` и замените переменные на свои данные:
   - `${CURRENT_DATE}` — текущая дата в формате YYYY-MM-DD (например, `"2025-10-22"`)
   - `${NAME}` — ваше имя с никнеймом (например, `Andrey Pakhomov
   `)
   - `${AGE}` — возраст (например, `33`)
   - `${ROLE}` — полная роль/должность (например, `Tech Lead Frontend Engineer`)
   - `${STACK}` — полный стек технологий (например, `TypeScript, Node.js, TSX, React, Vite, Vitest, Go, Docker`)
   - `${OS}` — операционная система с версией и архитектурой (например, `macOS 26.0.1 (darwin 25.0.0, ARM64)`)
   - `${DEVICE}` — устройство с характеристиками (например, `MacBook Pro M4 Max (16 cores, 48GB RAM)`)
   - `${LOCATION}` — страна, город (например, `Russia, Moscow`)
   - `${LANGUAGE}` — языки с приоритетом и контекстом использования (например, `Русский (primary), English (technical terms)`)
   - `${COMMUNICATION_STYLE}` — стиль коммуникации (например, `профессиональный, технический`)

3. Сохраните изменения

**Шаг 2: Добавьте правила в Cursor**

1. Откройте Cursor Settings (`Cmd + ,` на macOS или `Ctrl + ,` на Windows/Linux)
2. Перейдите в раздел **Cursor Settings** → **Rules, Memories, Commands** → **User Rules**
3. Нажмите **Add Rule** и скопируйте содержимое файлов:
   - `user-rules/core-system-instructions.md` — основные принципы работы AI
   - `user-rules/meta-info.md` — ваш персональный контекст

### MCP Серверы

Для работы системы необходимы MCP серверы.

**Обязательные серверы:**

- **[context7](https://github.com/upstash/context7-mcp)** — документация библиотек
- **[mcp-validator](https://github.com/CyberWalrus/mcp-validator)** — валидация кода/промптов/архитектуры

Добавьте серверы в настройки Cursor - `Cursor Settings` → `Tools & MCP` → `New MCP Server`:

Пример конфига для mcp

```json
{
    "mcpServers": {
        "context7": {
            "command": "npx",
            "args": [
                "-y",
                "@upstash/context7-mcp@latest"
            ],
            "env": {}
        },
        "mcp-validator": {
            "command": "npx",
            "args": [
                "-y",
                "mcp-validator"
            ],
            "env": {
                "API_KEY": "YOUR_OPENROUTER_API_KEY_HERE",
                "AI_MODEL": "openai/gpt-oss-120b"
            }
        }
    }
}

```

> **Импорт:** скопируйте содержимое `mcp.json` в настройки Cursor и замените `YOUR_OPENROUTER_API_KEY_HERE` на реальный ключ

### Получение API ключа OpenRouter

Для работы `mcp-validator` требуется API ключ от OpenRouter:

1. Перейдите на [https://openrouter.ai/keys](https://openrouter.ai/keys)
2. Войдите в аккаунт или зарегистрируйтесь
3. Создайте новый API ключ (нажмите "Create Key")
4. Скопируйте ключ (формат: `sk-or-v1-...`)
5. Добавьте его в конфигурацию MCP сервера (замените `YOUR_OPENROUTER_API_KEY_HERE`)

> **💡 Примечание:** OpenRouter поддерживает бесплатные модели (например, `openai/gpt-oss-20b:free`), но для некоторых моделей может потребоваться пополнение баланса.

## 🎯 Зачем нужна эта система

### Проблемы работы с AI-агентами

При работе с AI-ассистентами в code editors возникают системные проблемы:

1. **Непредсказуемое качество** — одна задача выполняется отлично, другая с ошибками
2. **Игнорирование стандартов** — AI забывает правила кода, именования, архитектуры
3. **Избегание инструментов** — не использует web_search, MCP серверы, Context7
4. **Незавершенность** — останавливается на середине, пропускает шаги
5. **Фабрикация фактов** — утверждает без проверки, "галлюцинирует"
6. **Токен-избыточность** — загружает ненужный контекст, дорого и медленно
7. **Универсальность вредит** — один workflow для всех задач снижает качество
8. **Ручная активация** — приходится повторять одни и те же инструкции
9. **Отсутствие валидации** — нет автоматической проверки качества кода/промптов
10. **Консистентность** — каждый разработчик настраивает правила по-своему
11. **Избыточная многословность** — AI даёт длинные объяснения когда нужен краткий ответ
12. **Потеря контекста** — забывает инструкции при длинных сессиях

### Как система решает эти проблемы

**Автоматическое качество:**

- MCP валидация (≥85) после каждого файла
- Linter/type/tests (0 errors) перед завершением
- Blocking checks — AI не может пропустить проверку

**Специализация вместо универсальности:**

- 8 activity types с автоматической классификацией
- Режимы Plan/Agent/Ask для разных сценариев
- Специализированные workflow (UI → browser validation, Code → architecture validation)

**Принудительное использование инструментов:**

- MANDATORY requirements с blocking checks
- Triggers перед модификацией файлов
- web_search обязателен для фактов, Context7 для пакетов

**Завершенность через барьеры:**

- completion_criteria для каждого шага
- pre_response_barrier блокирует переход до выполнения
- PLAN-FIRST + todos tracking для систематического выполнения

**Токен-оптимизация:**

- 5 типов промптов (compact ≤150 строк для роутеров)
- Cascade loading (router → dispatcher → workflow)
- Compact alwaysApply стандарты для базовых правил

**Консистентность без усилий:**

- AlwaysApply rules (03-07) активны автоматически
- Workspace rules в Git (общие), user rules в Settings (личные)
- Self-documenting architecture — AI сам находит нужные правила через rules-catalog

**Эффект:** AI работает как опытный разработчик — следует стандартам, проверяет факты, доводит задачи до конца, использует инструменты автоматически.

## ✨ Ключевые возможности

- **3 режима работы** (Plan/Agent/Ask) с автоматическим переключением на основе контекста
- **8 типов задач** (activity types) со специализированными workflow для каждого типа
- **MCP валидация** (score ≥85) для кода, промптов, архитектуры и документации
- **5 типов промптов** (compact/command/algorithm/reference/combo) для разных сценариев
- **Готовые команды** для Git коммитов, changelog генерации и анализа работы AI

## 🤖 Поддерживаемые модели AI

Ниже перечислены модели AI, для которых система тестировалась и оптимизировалась. Работа проверена в Cursor IDE v2.0.0; при обновлении Cursor с новыми функциями система может устареть.

- **Claude Sonnet 4.5 Thinking** — рекомендуемый вариант, полная поддержка всех режимов и функций
- **Composer 1** — совместим со всеми режимами, стоимость примерно в 2-3 раза ниже Sonnet 4.5
- **Grok 4 Fast Thinking** — бюджетный вариант с ограничениями: не поддерживает Plan Mode
- **Auto** — использовать только в Plan Mode; в остальных режимах стабильность не гарантирована

## 🏗️ Архитектура системы

### Режимы работы

Система автоматически переключается между тремя режимами:

- **Plan Mode** — анализ задачи, классификация типа, создание плана с подтверждением
- **Agent Mode** — автономное выполнение с валидацией (MCP ≥85), проверкой lint/type/tests и финальным отчетом
- **Ask Mode** — консультация без модификации файлов, верификация через web_search и Context7

### Типы задач (Activity Types)

План Mode автоматически определяет тип задачи и применяет соответствующий workflow:

🔧 **Code Development** — разработка с архитектурной валидацией
🔧 **Auxiliary Development** — инфраструктура (VPN, деплой, автоматизация)
🎨 **UI Development** — UI/UX с browser validation
🔍 **Technical Critique** — код-ревью и анализ качества
📋 **JIRA Task Creation** — создание технических заданий
📐 **Detailed Planning** — детальная декомпозиция задач
🧠 **Prompt Engineering** — создание и улучшение AI-промптов
🤖 **AI Documentation** — машиночитаемая документация

### Типы промптов

Система использует 5 типов промптов для разных сценариев:

- **compact** (≤150 строк) — роутеры и быстрые проверки
- **command** (50-200 строк) — исполняемые команды с императивным стилем
- **algorithm** (100-600 строк) — пошаговые workflow с валидацией
- **reference** (100-1000 строк) — справочники и документация
- **combo** (200-1600 строк) — комплексные промпты (algorithm + reference)

## 📁 Структура проекта

```
.cursor/
├── rules/       # Workspace правила (18 файлов)
│                # Роутинг, стандарты, activity workflows
├── docs/        # Детальные справочники (15 файлов)
│                # Стандарты кода, архитектуры, тестирования
└── commands/    # Исполняемые команды (3 файла)
                 # commit, changelog, agent-analysis

user-rules/      # Персональные настройки (не в Git)
                 # core-system-instructions, meta-info
```

**`.cursor/rules/`** — автоматически применяемые правила и workflow для разных типов задач

**`.cursor/docs/`** — детальная документация: стандарты кода, архитектурные паттерны, шаблоны

**`.cursor/commands/`** — готовые команды для Git автоматизации и анализа работы AI

**`user-rules/`** — персональный контекст и принципы работы (настраиваются в Cursor Settings)

> **📋 Полный список файлов** с описаниями см. в `.cursor/docs/rules-catalog.md`

## 💡 Примеры использования

### Команды

**Автоматический коммит с проверкой качества:**

```
/commit
```

**Генерация CHANGELOG из истории коммитов:**

```
/changelog
```

**Анализ работы AI и рекомендации по улучшению:**

```
/agent-analysis
```

### Режимы работы

**Plan Mode** — создание плана с подтверждением:

```
Создай новую функцию валидации email
```

AI проанализирует задачу, определит тип (Code Development), создаст план и запросит подтверждение.

**Agent Mode** — автономное выполнение после подтверждения плана с валидацией через MCP и финальным отчетом.

**Ask Mode** — консультация без модификации файлов:

```
Как работает Context7 MCP?
```

AI использует web_search и Context7 для проверки актуальной информации.

## 📜 Стандарты и принципы

### Code Standards (основные правила)

- **One file = one function** (max 150 lines)
- **100% test coverage** для новых функций
- **Guard clauses** вместо вложенных if
- **Array methods** вместо циклов for/while
- **No classes** — только функции и композиция
- **ESM-only** (no CommonJS)
- **JSDoc** на русском (single line)
- **Named exports** only (no default)
- **Node.js imports** с префиксом `node:`

**Абсолютные запреты:**

- for/while loops
- class keyword
- export default (кроме Storybook)
- any type (use unknown)
- Function type (use concrete signatures)
- JSX.Element (use ReactNode)

### Naming Conventions

- **Files/dirs:** `kebab-case`
- **Components:** `PascalCase`
- **Functions/vars:** `camelCase`
- **Constants:** `SCREAMING_SNAKE_CASE`
- **Tests:** русские описания

**Function prefixes:**

- `get` — selectors/getters
- `handle` — event handlers
- `watch` — saga watchers
- `on` — callbacks
- `create` — factories
- `fetch` — HTTP requests
- `set/add/remove/reset/update` — mutations

### Architecture (Golden Rule)

**Если код нужен ТОЛЬКО одному модульному юниту → он ДОЛЖЕН быть внутри этого юнита.**

**File placement:**

- Types → `types.ts`
- Schemas → `schemas.ts`
- Constants → `constants.ts`
- Functions → отдельные файлы
- Components → `index.tsx` + internal files

**Facade rules:**

- Все модули имеют `index.ts/tsx`
- Named exports only
- Только re-exports (≤10 lines)
- Без логики в фасадах

### Testing Essentials

- **100% coverage** для нового кода
- **Russian names:** `it('должен возвращать true', () => {})`
- **Arrange-Act-Assert** pattern
- **One test file per function** в `__tests__/`
- **Mock data only** (no real dependencies)
- **Typed mocks:** `vi.mocked(fn)`
- **Clear mocks:** `vi.clearAllMocks()` in `beforeEach`

## 📄 Лицензия

MIT License — см. [LICENSE](LICENSE)

---

**Создано для профессиональной разработки с AI ассистентами в Cursor IDE**
