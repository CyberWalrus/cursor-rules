# 🎨 Методики написания промптов

> **Важно:** Все методики, описанные в этом документе, активно используются в данной системе промптов (`.cursor/rules/*.mdc`). Каждая методика проверена на практике и применяется в production-ready промптах этого проекта.

## Содержание

**Базовые методики (1-10):**
1. [XML-структурирование](#1-xml-структурирование)
2. [Completion Criteria](#2-completion-criteria)
3. [Cognitive Triggers](#3-cognitive-triggers)
4. [Exception Handling](#4-exception-handling)
5. [YAML Metadata](#5-yaml-metadata)
6. [System Anchors](#6-system-anchors)
7. [Prefill Patterns](#7-prefill-patterns)
8. [Few-Shot Examples](#8-few-shot-examples)
9. [Zero-Shot Prompting](#9-zero-shot-prompting)
10. [Императивные триггеры](#10-императивные-триггеры)

**Продвинутые методики (11-21):**
11. [Chain-of-Thought (CoT)](#11-chain-of-thought-cot)
12. [Pre-Response Barriers](#12-pre-response-barriers)
13. [Blocking Gates](#13-blocking-gates)
14. [Priority Hierarchy](#14-priority-hierarchy)
15. [TIER Structure](#15-tier-structure)
16. [Iterative Validation Cycles](#16-iterative-validation-cycles)
17. [Типы промптов: Combo/Compact/Command](#17-типы-промптов-combocompactcommand)
18. [Step-Back Prompting](#18-step-back-prompting)
19. [Метакогнитивный Prompting](#19-метакогнитивный-prompting)
20. [Constitutional AI](#20-constitutional-ai)
21. [JSON Schema Guidance](#21-json-schema-guidance)

---

## Базовые методики

### 1. XML-структурирование

**Что:** Использование XML тегов для логического разделения секций промпта.

**Зачем:** Parsing-friendly формат, четкая семантика, легкое извлечение секций.

**Эффект:** AI лучше понимает структуру, снижается вероятность смешивания контекстов.

**Примеры тегов:**

- `<expert_role>` — определение роли AI
- `<algorithm_steps>` — пошаговый алгоритм
- `<completion_criteria>` — критерии завершения
- `<exception_handling>` — обработка исключений
- `<examples>` — примеры использования

**Используется в:** все промпты в `.cursor/rules/`, особенно `prompt-workflow.mdc`, `plan-mode-dispatcher.mdc`

### 2. Completion Criteria

**Что:** Явное определение критериев успешного завершения для каждого шага.

**Зачем:** AI знает когда задача выполнена, предотвращает недоделанную работу.

**Эффект:** Повышение качества выполнения, снижение количества итераций.

**Пример:**

```xml
<completion_criteria>
- All 4 files read successfully
- Key principles extracted
- Ready to proceed to next step
</completion_criteria>
```

**Используется в:** `prompt-workflow.mdc`, `code-workflow.mdc`, `detailed-plan-creator.mdc`

### 3. Cognitive Triggers

**Что:** Фразы-триггеры типа "Let's think step by step" для активации режима рассуждений.

**Зачем:** Улучшает качество анализа, снижает количество ошибок.

**Эффект:** Chain-of-Thought режим, более глубокое понимание задачи.

**Пример:**

```xml
<cognitive_triggers>
Let's think step by step about the complete preparation workflow.
</cognitive_triggers>
```

**Используется в:** `plan-mode-dispatcher.mdc`, `prompt-workflow.mdc`

### 4. Exception Handling

**Что:** Явное описание действий AI при различных исключениях.

**Зачем:** Робастность системы, предсказуемое поведение при ошибках.

**Эффект:** AI не "зависает" при неожиданных ситуациях, всегда знает fallback.

**Пример:**

```xml
<exception_handling>
If file missing: STOP, report to user, request fix
If validation fails: iterate max 3 times, then ask user
</exception_handling>
```

**Используется в:** все workflow-промпты, особенно `prompt-workflow.mdc`, `07-agent-mode-workflow.mdc`

### 5. YAML Metadata

**Что:** YAML frontmatter с метаданными (id, type, alwaysApply).

**Зачем:** Управление lifecycle промпта, автоматическая активация.

**Эффект:** Cursor знает когда применять промпт, упрощает управление.

**Пример:**

```yaml
---
id: code-standards-compact
type: compact
alwaysApply: true
---
```

**Используется в:** все `.mdc` файлы в `.cursor/rules/`

### 6. System Anchors

**Что:** Маркеры `[ALGORITHM-BEGIN/END]`, `[REFERENCE-BEGIN/END]` для обозначения типа контента.

**Зачем:** Явная структура, облегчает parsing и навигацию.

**Эффект:** AI четко понимает роль промпта (алгоритм или справочник).

**Используется в:** `prompt-workflow.mdc` (combo type), `plan-mode-dispatcher.mdc`, `rules-catalog.md`

### 7. Prefill Patterns

**Что:** Предзаполненные стартеры ответов для направления вывода AI.

**Зачем:** Гарантирует определенный формат ответа, снижает вариативность.

**Эффект:** Консистентность выходных данных, соответствие ожиданиям.

**Пример:**

```xml
<prefill_starter>
<critique_analysis>**Материал:** CODE|IDEA|MIXED | **Масштаб:** simple|complex|massive
</prefill_starter>
```

**Используется в:** `critique-workflow.mdc`, `prompt-workflow.mdc`

### 8. Few-Shot Examples

**Что:** Примеры правильных и неправильных паттернов с разметкой.

**Зачем:** Демонстрация желаемого поведения через конкретные кейсы.

**Эффект:** AI учится на примерах, снижается количество ошибок.

**Пример:**

```xml
<examples>
✅ CORRECT: [example with explanation]
❌ INCORRECT: [anti-pattern with explanation]
</examples>
```

**Используется в:** `01-chat-mode-router.mdc`, `prompt-workflow.mdc` (TIER 4)

### 9. Zero-Shot Prompting

**Что:** Прямые инструкции без примеров, полагаясь на базовые знания модели.

**Зачем:** Компактность промпта, быстрое выполнение простых задач.

**Эффект:** Работает для стандартных задач без дополнительного контекста.

**Используется в:** compact-промпты (`03-code-standards-compact.mdc`, `04-naming-compact.mdc`, `05-testing-compact.mdc`)

### 10. Императивные триггеры

**Что:** Директивы типа EXECUTE, REQUIRED, MANDATORY, FORBIDDEN.

**Зачем:** Четкое указание критичности действий.

**Эффект:** AI понимает приоритеты, не пропускает обязательные шаги.

**Пример:**

```
**MANDATORY:** Read all files before proceeding
**FORBIDDEN:** Skip validation steps
```

**Используется в:** `01-chat-mode-router.mdc`, `07-agent-mode-workflow.mdc`, все compact-промпты

---

## Продвинутые методики

### 11. Chain-of-Thought (CoT)

**Что:** Пошаговое рассуждение модели через явные промежуточные шаги для решения сложных задач.

**Зачем:** Активирует глубокий аналитический режим, улучшает логические выводы, позволяет отследить ход рассуждений.

**Эффект:** Повышает точность на 40-60% для задач, требующих многошагового анализа, снижает количество логических ошибок.

**Пример:**

```xml
<cognitive_triggers>
Let's think step by step about prompt classification.
</cognitive_triggers>

<algorithm_steps>
1. Analyze user request → identify key verbs
2. Match verbs to activity table → find triggers
3. Determine main type → highest weight wins
4. Validate decision → check against rules
</algorithm_steps>
```

**Используется в:** `plan-mode-dispatcher.mdc` (классификация задач), `prompt-workflow.mdc` (Step 1)

### 12. Pre-Response Barriers

**Что:** Блокирующие чекпоинты перед переходом к следующему этапу алгоритма.

**Зачем:** Гарантирует полноту выполнения текущего этапа, предотвращает пропуск критичных шагов.

**Эффект:** Снижает количество ошибок выполнения на 70%, обеспечивает последовательность действий.

**Пример:**

```xml
<pre_response_barrier>
**BLOCKING CHECK BEFORE NEXT STEP:**

Complete ALL for Step 2:
- [ ] Structure matches type (YAML/TIER/XML correct for type)
- [ ] Language policy applied (English structure OR Russian for command type)
- [ ] All mandatory sections present
- [ ] No structural errors (malformed XML, missing YAML fields)

❌ ANY unchecked → FORBIDDEN to proceed to Step 3

**Motivation:** Structure is framework. Wrong structure → misaligned content → failed validation.
</pre_response_barrier>
```

**Используется в:** `prompt-workflow.mdc` (после каждого Step), `detailed-plan-creator.mdc`

### 13. Blocking Gates

**Что:** Обязательные проверки критериев с чек-листами перед выполнением действий.

**Зачем:** Предотвращает выполнение без необходимых предусловий, явная валидация готовности.

**Эффект:** Исключает "забытые" шаги, повышает надежность multi-step workflows.

**Пример:**

```xml
<mandatory_check>
**BLOCKING GATE:**

- [ ] Operation mode announced
- [ ] MANDATORY requirements for this mode identified
- [ ] Required files reading planned or skipped with justification

❌ ANY unchecked → STOP, complete detection first
</mandatory_check>
```

**Используется в:** `prompt-workflow.mdc` (Step 0), `07-agent-mode-workflow.mdc`

### 14. Priority Hierarchy

**Что:** Явная иерархия приоритетов для разрешения конфликтов между противоречивыми требованиями.

**Зачем:** Четкие правила принятия решений при несовместимых инструкциях, прозрачность выбора.

**Эффект:** Устраняет неопределенность, AI знает как действовать при конфликтах.

**Пример:**

```xml
<priority_hierarchy>
**CONFLICT RESOLUTION ORDER:**

1. **User Explicit Request** (highest) - always takes precedence
2. **Critical Functionality** - prompt must work correctly
3. **MCP Validation Score** - target ≥85, but can be lower if conflicts with #1
4. **Performance Optimization** - token economy, compact rules

**Exception Documentation Required:**
When violating lower priority due to higher priority conflict, document:
- Violated rule: [rule name]
- Reason: [higher priority requirement]
- Trade-off: [what is sacrificed]
</priority_hierarchy>
```

**Используется в:** `prompt-workflow.mdc` (TIER 1), `user-rules/core-system-instructions.md`

### 15. TIER Structure

**Что:** Многоуровневая иерархическая организация контента промпта (TIER 1-6).

**Зачем:** Улучшает навигацию в больших промптах, четкая семантическая структура.

**Эффект:** Упрощает parsing и понимание, модульная организация правил.

**Пример:**

```markdown
## TIER 1: Expert Role
<expert_role>
You are an elite Prompt Engineer...
</expert_role>

## TIER 2: Algorithm
<algorithm_steps>
### Step 1: Analysis
...
### Step 2: Structure Creation
...
</algorithm_steps>

## TIER 3: Output Format
<output_format>
Required response sections...
</output_format>
```

**Используется в:** `prompt-workflow.mdc` (TIER 1-6), `plan-mode-dispatcher.mdc` (TIER 1-6), `code-workflow.mdc`

### 16. Iterative Validation Cycles

**Что:** Циклы "валидация → фикс → ре-валидация" до достижения целевого порога качества.

**Зачем:** Гарантирует production-ready качество через постепенное улучшение.

**Эффект:** Систематическое повышение качества, измеримые метрики прогресса.

**Пример:**

```xml
<iterative_cycle>
**MCP VALIDATION CYCLE:**

1. **Track Score:** Record current score vs target (≥85)
2. **Fix Priority:** Critical issues (score <70) → Warning issues (70-84) → Improvements (≥85)
3. **Apply Fixes:** Document changes, re-validate after major fix batches
4. **Progress Metrics:** +5 points minimum per iteration, max 5 iterations
5. **Escalation:** If <2 points improvement over 2 consecutive iterations

**Success Criteria:** Score ≥85/100 + 0 critical issues + ≤5 warnings
</iterative_cycle>
```

**Используется в:** `prompt-workflow.mdc` (Step 4), `07-agent-mode-workflow.mdc` (MCP validation)

### 17. Типы промптов: Combo/Compact/Command

**Что:** Специализированные форматы промптов для разных целей использования.

**Зачем:** Оптимизация под конкретные задачи (универсальность, скорость, простота).

**Эффект:** Правильный тип → 3-10x эффективность, экономия токенов, читаемость.

#### Combo Type

Универсальные промпты (algorithm + reference в одном файле):

```yaml
---
id: prompt-workflow
type: combo
---

# Prompt Engineering System

[ALGORITHM-BEGIN]
## TIER 1: Expert Role
...
## TIER 2: Algorithm
...
[ALGORITHM-END]

[REFERENCE-BEGIN]
## TIER 1: Expert Role (Reference)
...
## TIER 2: Reference Guidelines
...
[REFERENCE-END]
```

**Используется в:** `prompt-workflow.mdc`, `plan-mode-dispatcher.mdc`

#### Compact Type

Быстрые роутеры (до 150 строк, один XML тег, без TIER):

```yaml
---
id: chat-mode-router
type: compact
alwaysApply: true
---

# Chat Mode Router

<chat_mode_router>

**INSTANT EXECUTION - ABSOLUTE PRIORITY**

Check in order, route immediately:
1. system_reminder "Plan mode" → PLAN MODE → read plan-mode-dispatcher.mdc
2. system_reminder "Ask marker" → ASK MODE → read ask-mode-workflow.mdc
3. Otherwise → AGENT MODE → follow 07-agent-mode-workflow.mdc

</chat_mode_router>
```

**Используется в:** `01-chat-mode-router.mdc`, `03-06-compact.mdc`, `07-agent-mode-workflow.mdc`

#### Command Type

Прямые инструкции (без YAML/TIER/XML):

```markdown
# Git Commit Workflow

Ты — инженер автоматизации git-процессов. Твоя задача — создать атомарные коммиты с проверкой качества.

## 1. Проверка качества кода

Выполни команды последовательно:

\`\`\`bash
yarn lint && yarn test && yarn typecheck
\`\`\`

Если любая упадет — остановись.

## 2. Формат сообщения

\`\`\`
{task-id}: [{type}] {message}
\`\`\`
```

**Используется в:** `.cursor/commands/*.md` (task execution commands)

### 18. Step-Back Prompting

**Что:** Модель делает "шаг назад" для переоценки контекста перед выполнением.

**Зачем:** Предотвращает импульсивные решения, улучшает понимание глобального контекста.

**Эффект:** Повышает точность на 20-30%, снижает количество неверных предположений.

**Пример:**

```xml
<step_back_analysis>
Before implementing the solution:
1. What is the broader goal here?
2. Are there any assumptions I'm making?
3. What alternative approaches exist?
4. What could go wrong with my current approach?

After reassessment: proceed with validated approach
</step_back_analysis>
```

**Применение в системе:** рекомендуется для `plan-mode-dispatcher.mdc` (классификация), `detailed-plan-creator.mdc` (планирование)

### 19. Метакогнитивный Prompting

**Что:** Модель анализирует уверенность в своих ответах и качество собственных выводов.

**Зачем:** Выявляет слабые места в рассуждениях, показывает области неопределенности.

**Эффект:** Повышает качество выводов на 15-25%, улучшает transparency решений.

**Пример:**

```xml
<metacognitive_analysis>
**Self-Assessment:**
- Confidence level: HIGH | MEDIUM | LOW
- Evidence quality: [direct facts | inference | assumption]
- Known gaps: [list uncertainties]
- Verification needed: [yes/no - specify what]

**Quality Check:**
- Did I consider alternative explanations?
- Are my assumptions explicitly stated?
- Can I trace my reasoning backward?
</metacognitive_analysis>
```

**Применение в системе:** рекомендуется для `critique-workflow.mdc` (анализ), `auxiliary-dev-workflow.mdc` (web search validation)

### 20. Constitutional AI

**Что:** Самокритика на основе 2-4 принципов (safety, honesty, usefulness) перед финальным ответом.

**Зачем:** Предотвращает противоречия, улучшает этичность и безопасность ответов.

**Эффект:** Снижает harmful content на 80-90%, повышает adherence к ценностям.

**Пример:**

```xml
<constitutional_ai>
**Principles:**
1. Safety: Does this response avoid harm?
2. Honesty: Am I transparent about limitations?
3. Usefulness: Does this actually help the user?
4. Respect: Is the tone appropriate?

**Self-Critique:**
Draft output → check against principles → revise once if violated → deliver

**Rule:** Prefer minimal, concrete principles over long policy lists
</constitutional_ai>
```

**Используется в:** `prompt-workflow.mdc` (TIER 5), `user-rules/core-system-instructions.md` (core principles)

### 21. JSON Schema Guidance

**Что:** Строгая JSON-схема с conformance instruction для гарантированного формата выходных данных.

**Зачем:** Предсказуемая структура ответа, валидация на уровне схемы, легкий parsing.

**Эффект:** 100% консистентность формата, упрощает интеграцию с системами.

**Пример:**

```xml
<json_schema_guidance>
Return JSON only, conforming to this schema:

\`\`\`json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "title": { "type": "string" },
    "summary": { "type": "string" },
    "confidence": { "type": "number", "minimum": 0, "maximum": 1 }
  },
  "required": ["title", "summary"]
}
\`\`\`

**Instruction:** If invalid, correct and re-emit. No additional text outside JSON.
</json_schema_guidance>
```

**Используется в:** `prompt-workflow.mdc` (TIER 5), рекомендуется для API-интеграций

---

## Дополнительные ресурсы

- **Официальная документация:** см. `.cursor/docs/` для детальных гайдов
- **Примеры применения:** все промпты в `.cursor/rules/*.mdc`
- **Каталог правил:** `.cursor/docs/rules-catalog.md` — полный список промптов с описаниями

## Лицензия

MIT License — см. [LICENSE](../../LICENSE)

