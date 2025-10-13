---
id: code-style-reference
type: reference
prompt_language: "ru"
response_language: "ru"
alwaysApply: false
---

# 🛡️ Справочник Правил Код-Стайла

[REFERENCE-BEGIN]

## 🎯 TIER 1: Экспертная роль и область применения

<reference_scope>
Полный и строгий справочник код-стайла проекта с примерами нарушений и корректной реализации. Покрывает: структурные требования, стиль кодирования, документацию, тестирование, импорты/экспорты и валидацию.
**Принцип применения:** источник истины для консультаций и автоматических проверок в процессе разработки.
**КРИТИЧЕСКИЙ ПРИНЦИП:** Каждое правило = закон без исключений. Нарушение = провал.
</reference_scope>

<expert_role>
Роль: «Code Style Guardian & Enforcer».
Задача: строго применять правила справочника при анализе/редактуре кода, предлагая минимальные правки без изменения поведения.
Обязанности: детектировать нарушения, формировать краткие исправления, при необходимости давать лаконичные пояснения причин.
Язык ответов: **ВАЖНО: Все ответы должны быть на русском языке.**
Границы: не менять архитектуру без явного запроса; предпочитать наименьшие изменения без поломки публичного API.
</expert_role>

## 📋 TIER 2: Нормативные определения, идентификаторы и политика соблюдения

<definitions>
**MCP** — система валидации промтов/контента в пайплайне разработки.
**absolute_bans** — перечень правил, нарушение которых недопустимо ни при каких условиях.
**critical_enforcement** — политика нулевой толерантности: любое критичное нарушение блокирует релиз.
**guard_clause** — ранний возврат, предотвращающий глубоко вложенные `if/else`.
**one_file_one_function** — каждый файл содержит ровно одну публичную функцию.
**node_prefix_imports** — импорты стандартных модулей Node.js только с префиксом `node:`.
**single_line_jsdoc_ru** — однострочные JSDoc на русском языке.
**explicit_comparisons** — явные проверки `value === null || value === undefined` и т.п.
</definitions>

<severity_levels>
**critical** — нарушено абсолютное правило, выпуск блокируется до исправления.
**important** — ухудшает поддерживаемость, требует обязательного исправления до мержа.
**warning** — рекомендация к улучшению без блокировки.
</severity_levels>

<rule_id_registry>
structural.one_file_one_function — Один файл = одна функция, максимум 150 строк.
structural.file_size_max_150 — Лимит размера файла 150 строк.
arrays.methods_only — Только методы массивов, никаких `for/while`.
control_flow.guard_clauses — Guard clauses вместо глубокой вложенности.
comparisons.explicit — Только явные сравнения (никаких `!value`).
exports.named_only — Только именованные экспорты, без `default`.
imports.node_prefix — Импорты Node.js с префиксом `node:`.
imports.type_import_prefix — Импорты типов с префиксом `type`.
types.separate_file — Все типы в отдельном `types.ts`.
jsdoc.single_line_ru — Только однострочные JSDoc на русском.
tests.coverage_100_new — 100% покрытие для каждой новой функции.
tests.file_per_function — Один файл теста на каждую функцию.
tests.naming_ru — Названия тестов на русском языке.
tests.pattern_arrange_act_assert — Паттерн Arrange-Act-Assert.
tests.mock_only — Тесты только на мок-данных, без реальных интеграций.
absolute_bans.class — Запрещены `class`, только функциональная композиция.
absolute_bans.multiple_functions_per_file — Запрещено несколько функций в одном файле.
absolute_bans.no_default_exports — Запрещены `default` экспорты.
absolute_bans.no_comments_in_functions — Запрещены комментарии внутри тел функций.
absolute_bans.no_implicit_comparisons — Запрещены неявные сравнения (`!value`).
absolute_bans.no_deep_if_else — Запрещены глубокие ветвления вместо guard clauses.
absolute_bans.files_over_150_lines — Запрещены файлы > 150 строк.
absolute_bans.types_inline_in_code — Запрещены inline-типы внутри кода.
absolute_bans.node_imports_without_prefix — Запрещены Node.js импорты без `node:`.
modules.esm_only — Только ESM, CommonJS запрещён; Node-модули с префиксом `node:`.
</rule_id_registry>

<conformance>
- Ссылка на правило в отчётах/коммитах указывается по `ruleId` из <rule_id_registry>.
- Для `critical` нарушение должно быть исправлено немедленно; временные исключения не допускаются.
- Для `important` допускается короткая отсрочка только с явным обоснованием и задачей на исправление.
- Для `warning` рекомендуется исправление при первой возможности без блокировки.
- Любое отступление фиксируется с причиной и сроком устранения, иначе считается нарушением политики `critical_enforcement`.
</conformance>

## 🔧 TIER 3: Правила Стиля Кодирования

<quality_standards>

### Структурные требования

<structural_requirements>
**ЖЕЛЕЗНЫЕ ПРАВИЛА:**

- **Размер:** Один файл = одна функция, максимум 150 строк
- **Тесты:** 100% покрытие для каждой новой функции
- **JSDoc:** Комментарии на русском для каждой функции
- **Guard Clauses:** Вместо глубокой вложенности
- **Методы массивов:** Вместо for циклов
- **Линтер:** Без единой ошибки `yarn workspace @morj/[пакет] lint`
- **ESM-only:** Только ES-модули; CommonJS (require/module.exports) запрещён
- **Без классов:** Только функции и композиция
  </structural_requirements>

### Критерии качества кода

<quality_criteria>
**ОБЯЗАТЕЛЬНЫЕ ЭЛЕМЕНТЫ:**

- Линтер: 0 ошибок
- Тесты: все проходят
- JSDoc: присутствует и актуальный
- MCP валидация: код соответствует стандартам проекта
  </quality_criteria>

</quality_standards>

## 📝 TIER 4: Документация и Типы

<coding_rules>

### Функции vs Классы

<function_composition>

```typescript
// ❌ ЗАПРЕЩЕНО - классы
class UserService {
    constructor(private apiClient: ApiClient) {}
    async getUser(id: string) {
        /* */
    }
}

// ✅ ОБЯЗАТЕЛЬНО - функции и композиция
type UserServiceDeps = { apiClient: ApiClient };
export function createUserService(deps: UserServiceDeps) {
    return {
        getUser: (id: string) => deps.apiClient.get(`/users/${id}`),
    };
}
```

</function_composition>

### Guard Clauses vs Вложенность

<guard_clauses>

```typescript
// ❌ ЗАПРЕЩЕНО - глубокая вложенность
function processData(data: unknown) {
    if (data) {
        if (typeof data === "object") {
            if (data.name) {
                return data.name;
            }
        }
    }
    return "Invalid data";
}

// ✅ ОБЯЗАТЕЛЬНО - guard clauses
function processData(data: unknown) {
    if (!data) return "Invalid data";
    if (typeof data !== "object") return "Invalid data";
    if (!data.name) return "No name";
    return data.name;
}
```

</guard_clauses>

### Методы массивов vs Циклы

<array_methods>

```typescript
// ❌ ЗАПРЕЩЕНО - for циклы
for (let i = 0; i < items.length; i++) {
    if (items[i].isValid) {
        results.push(process(items[i]));
    }
}

// ✅ ОБЯЗАТЕЛЬНО - методы массивов
const results = items
    .filter((item) => item.isValid)
    .map((item) => process(item));
```

</array_methods>

### Явные сравнения

<explicit_comparisons>

```typescript
// ❌ ЗАПРЕЩЕНО - неявные сравнения
if (!value) return;
if (!!user.isActive) console.log("active");

// ✅ ОБЯЗАТЕЛЬНО - явные сравнения
if (value === null || value === undefined) return;
if (user.isActive === true) console.log("active");
```

</explicit_comparisons>

</coding_rules>

## 📦 TIER 5: Импорты и Экспорты

<documentation_typing>

### JSDoc (СТРОГО однострочные на русском)

<jsdoc_rules>

```typescript
/** Создает действие для добавления экспорта в index.ts файл */
export function createFacadeExportAction(): void {
    // Реализация
}

// ❌ ЗАПРЕЩЕНО - многострочные JSDoc
/**
 * Создает действие
 * @param data - Данные
 * @returns Результат
 */

// ✅ ОБЯЗАТЕЛЬНО - только однострочные JSDoc
/** Создает действие для добавления экспорта */
```

**ЖЕЛЕЗНОЕ ПРАВИЛО JSDoc:** ТОЛЬКО одна строка с кратким описанием на русском!

</jsdoc_rules>

### Организация типов

<type_organization>

```typescript
// types.ts - все типы в отдельном файле
export type FacadeExportData = {
    /** Имя компонента/библиотеки */
    name: string;
    /** Категория компонента/библиотеки */
    category?: string;
};

// ✅ type вместо interface
// ✅ JSDoc для каждого поля
// ✅ Экспорт типов из Zod: z.infer
// ✅ Дженерики с буквы G: GType, GProps, GData
```

</type_organization>

</documentation_typing>

## 🧪 TIER 6: Стандарты Тестирования

<import_export_standards>

### Группировка импортов

<import_grouping>

```typescript
// 1. Node.js с префиксом 'node:'
import { readFileSync } from "node:fs";
import { join } from "node:path";

// 2. Внешние библиотеки
import { z } from "zod";

// 3. Типы с префиксом type
import type { PackageChoice } from "../../model/types/main";

// 4. Внутренние модули
import { processPackage } from "./process-package";
```

</import_grouping>

### Экспорты

<export_rules>

#### СТРОГИЕ ПРАВИЛА

- ✅ Только именованные export - НИКОГДА default
- ✅ Node.js импорты с префиксом 'node:' (node:fs, node:path)
- ✅ Импорты типов с префиксом `type`
- ✅ Прямой импорт из helpers/, workflows/, adapters/, gateways/
- ❌ CommonJS синтаксис (require/module.exports) запрещён — используем ESM
- ❌ Классы запрещены — используем функции и композицию
  </export_rules>

</import_export_standards>

## ⚠️ TIER 7: Конкретные Примеры Нарушений

<testing_standards>

### Структура тестов

<test_structure>

```typescript
import { validatePackageName } from "..";

describe("validatePackageName", () => {
    it("должен возвращать true для корректного названия пакета", () => {
        const validNames = ["my-package", "test123", "simple-test-package"];

        validNames.forEach((name) => {
            expect(validatePackageName(name)).toBe(true);
        });
    });

    it("должен возвращать ошибку для пустого названия", () => {
        const emptyName = "";

        const result = validatePackageName(emptyName);

        expect(result).toBe("Название пакета обязательно");
    });
});
```

</test_structure>

### Правила тестирования

<test_rules>
**ОБЯЗАТЕЛЬНЫЕ СТАНДАРТЫ:**

- **100% покрытие всех функций тестами**
- **Названия тестов на русском языке**
- **Паттерн Arrange-Act-Assert**
- **Один файл теста на каждую функцию**
- **Vitest: не импортируй `describe`, `it`, `expect` - доступны глобально**
- **Тестируй обычные, граничные и ошибочные случаи**
- **Никаких комментариев внутри тестов**
- **Никаких проверок на реальных данных - только моки**
  </test_rules>

</testing_standards>

## 💀 TIER 8: Абсолютные Запреты

<violation_examples>

### НАРУШЕНИЕ: Несколько функций в файле

```typescript
// ❌ СТРОГО ЗАПРЕЩЕНО
function validateInput() {
    /* код */
}
function formatResult() {
    /* код */
}

// ✅ ОБЯЗАТЕЛЬНО - отдельные файлы
// validate-input.ts: export function validateInput()
// format-result.ts: export function formatResult()
```

### НАРУШЕНИЕ: Типы в коде

```typescript
// ❌ СТРОГО ЗАПРЕЩЕНО
export type UserData = { name: string };
export function processUser() {
    /* код */
}

// ✅ ОБЯЗАТЕЛЬНО - в types.ts
// types.ts: export type UserData = { name: string };
// process-user.ts: import type { UserData } from './types';
```

### НАРУШЕНИЕ: Многострочные JSDoc

```typescript
// ❌ СТРОГО ЗАПРЕЩЕНО
/**
 * Обрабатывает пользователя
 * @param user Данные пользователя
 * @returns Результат обработки
 */

// ✅ ОБЯЗАТЕЛЬНО
/** Обрабатывает пользователя */
```

### НАРУШЕНИЕ: Комментарии в функциях

```typescript
// ❌ СТРОГО ЗАПРЕЩЕНО
export function processData() {
    // Проверяем входные данные
    if (!data) return error;
    // Обрабатываем результат
    return result;
}

// ✅ ОБЯЗАТЕЛЬНО - без комментариев
export function processData() {
    if (!data) return error;
    return result;
}
```

</violation_examples>

## 📏 TIER 9: Чеклист Соблюдения Правил

<critical_prohibitions>

**НАРУШЕНИЕ = ПРОВАЛ ЗАДАЧИ БЕЗ ПРАВА НА АПЕЛЛЯЦИЮ:**

<absolute_bans>

- ❌ **Циклы:** Использование `for` циклов - только методы массивов
- ❌ **Классы:** Использование `class` - только функции и композиция
- ❌ **Default экспорты:** Только именованные import/export
- ❌ **Однобуквенные переменные** (кроме параметров в методах массивов)
- ❌ **Неявные сравнения:** `!value` вместо `value === null`
- ❌ **Отсутствие фигурных скобок** в if/else
- ❌ **Глубокие if/else** вместо guard clauses
- ❌ **Комментарии внутри тела функций** включая `// Guard clause`, `
