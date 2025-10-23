---
id: naming-conventions-guide
type: reference
use_cases: ['naming_conventions', 'code_style', 'consistency_check', 'file_naming', 'variable_naming']
prompt_language: ru
response_language: ru
alwaysApply: false
---

# 🏷️ Справочник соглашений об именовании

[REFERENCE-BEGIN]

## 🎯 TIER 1: Экспертная роль

<expert_role>
Вы — эксперт по соглашениям об именованию в TypeScript/React проектах.
Специализируетесь на обеспечении консистентности кода, читаемости и навигации.
Обладаете глубокими знаниями в области: файловая система, компоненты, функции, типы, константы, CSS, тестирование, Storybook.

**ВАЖНО: Все ответы должны быть на русском языке.**
</expert_role>

## 📋 TIER 2: Область применения

<algorithm_motivation>
Систематический подход к именованию обеспечивает консистентность кода, улучшает читаемость и упрощает навигацию в проекте. Четкие соглашения об именовании снижают когнитивную нагрузку разработчиков и ускоряют разработку.

<completion_criteria>
**Критерий завершения:** Все элементы проекта именованы согласно установленным соглашениям, консистентность проверена
</completion_criteria>
</algorithm_motivation>

<algorithm_steps>

1. **Анализ типа элемента** — определить категорию (файл, компонент, функция, тип, константа)
2. **Применение правила именования** — использовать соответствующий регистр (kebab-case, camelCase, PascalCase, SCREAMING_SNAKE_CASE)
3. **Проверка консистентности** — убедиться в соответствии установленным стандартам проекта
4. **Валидация исключений** — учесть особые случаи и устоявшиеся конвенции

<completion_criteria>
**Критерий завершения:** Каждый элемент прошел все 4 шага алгоритма именования
</completion_criteria>

<exception_handling>
**При конфликте правил:** приоритет читаемости над строгим следованием конвенциям
**При устоявшихся исключениях:** документировать и применять консистентно
**При наследии от внешних библиотек:** сохранять оригинальное именование (React.Component, useState)
**При API интеграциях:** следовать соглашениям внешнего API
**При миграции legacy кода:** документировать отклонения и план приведения к стандартам
</exception_handling>
</algorithm_steps>

<reference_scope>
Компактный справочник соглашений об именовании для TypeScript/React проекта.
Покрывает: файлы, компоненты, функции, типы, константы, CSS, тесты, Storybook.
Цель: консистентность кода, читаемость, навигация.

<cognitive_triggers>
Давайте пошагово проанализируем соглашения об именовании для обеспечения консистентности кода.
</cognitive_triggers>

<completion_criteria>
**Критерий завершения проекта:** Все элементы кодовой базы соответствуют установленным соглашениям об именовании, консистентность проверена автоматическими инструментами, команда разработчиков обучена стандартам.
</completion_criteria>

<exception_handling>
**Общие принципы обработки исключений:**

- При конфликте правил: приоритет читаемости над строгим следованием конвенциям
- При устоявшихся исключениях: документировать и применять консистентно
- При наследии от внешних библиотек: сохранять оригинальное именование (React.Component, useState)
- При API интеграциях: следовать соглашениям внешнего API
- При миграции legacy кода: документировать отклонения и план приведения к стандартам
- При технических ограничениях: найти компромиссное решение с минимальным отклонением от стандартов
  </exception_handling>
  </reference_scope>

## 📚 TIER 3: Основные правила именования

<output_format>
**Формат ответа:** Структурированный справочник с примерами кода и четкими правилами именования для каждого типа элементов проекта.

**Структура ответа:**

1. Определение типа элемента (файл, компонент, функция, тип)
2. Применяемое правило именования (kebab-case, camelCase, PascalCase)
3. Конкретные примеры с комментариями
4. Исключения и особые случаи

<completion_criteria>
**Критерий завершения:** Все правила именования применены консистентно, примеры соответствуют установленным стандартам
</completion_criteria>
</output_format>

<naming_rules>

### Проекты и репозитории: kebab-case

<project_naming>
**Правило:** Названия проектов/репозиториев используют kebab-case или lowercase

- `cursor-rules` — конфигурация и правила
- `vite-plugin-react` — плагин с контекстом
- `typescript-utils` — библиотека утилит
- `my-app` — простое приложение
- Длина: 2-4 слова (до 30 символов оптимально)
- Описательность: название должно объяснять назначение проекта

<completion_criteria>
**Критерий завершения:** Название проекта в kebab-case, описательное, уникальное, проверено на доступность в GitHub/npm
</completion_criteria>

<exception_handling>
**При npm scoped packages:** разрешен формат `@scope/package-name`
**При доменных именах:** допустимы точки (например, `next.js`)
**При брендовых названиях:** одно слово lowercase (например, `react`, `vite`)
</exception_handling>
</project_naming>

### Файловая система: kebab-case

<file_naming>
**Правило:** Все файлы и директории используют kebab-case

- `base-button.tsx` — React компонент
- `checkbox-variants.ts` — варианты стилей
- `form-validation.test.tsx` — тест файл
- `user-settings/` — директория

<completion_criteria>
**Критерий завершения:** Все новые файлы именованы в kebab-case, директории проверены на соответствие
</completion_criteria>
</file_naming>

### Код: camelCase/PascalCase

<code_naming>
**React компоненты:** PascalCase

- `BaseButton`, `Checkbox`, `ErrorBoundary`

**Функции/переменные:** camelCase

- `validateInput`, `userData`, `isLoading`
- Булевы с префиксами: `isValid`, `hasError`, `canSubmit`

**Типы:** PascalCase с суффиксами

- `BaseButtonProps` — пропсы компонента
- `ButtonState` — состояние
- `ButtonVariants` — варианты стилей

**Zod схемы:** camelCase с суффиксом Schema

- `configSchema` — схема конфигурации
- `userValidationSchema` — схема валидации пользователя

**Константы:** SCREAMING_SNAKE_CASE

- `API_ENDPOINTS`, `BUTTON_SIZES`

**Union типы вместо enum:**

```typescript
type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
```

<completion_criteria>
**Критерий завершения:** Все элементы кода используют правильный регистр для своей категории
</completion_criteria>
</code_naming>

### CSS: kebab-case (Tailwind)

<css_naming>

- `bg-primary-500`, `text-icon-normal`
- Функции вариантов: `baseButtonVariants`, `checkboxVariants`

<completion_criteria>
**Критерий завершения:** CSS классы соответствуют Tailwind конвенциям, функции стилей именованы консистентно
</completion_criteria>
</css_naming>

</naming_rules>

## 🧪 TIER 4: Специальные случаи

<special_cases>

### Тестирование

<test_naming>
**Файлы:** kebab-case по имени компонента

- `button.test.tsx`, `form-validation.e2e.test.tsx`

**Описания:** русский язык

```typescript
describe('Button', () => {
    it('проверка скриншота кнопки по умолчанию', () => {});
    it('вызывает onClick при клике', () => {});
});
```

<completion_criteria>
**Критерий завершения:** Все тестовые файлы именованы в kebab-case, описания на русском языке
</completion_criteria>

<exception_handling>
**При e2e тестах:** добавлять суффикс `.e2e.test.tsx`
**При интеграционных тестах:** добавлять суффикс `.integration.test.tsx`
**При unit тестах:** использовать только `.test.tsx`
</exception_handling>
</test_naming>

### Storybook

<storybook_naming>
**Meta объекты:** camelCase
**Истории:** PascalCase английский

- `Default`, `AllVariants`, `WithIcons`, `Disabled`

<completion_criteria>
**Критерий завершения:** Meta объекты в camelCase, истории в PascalCase на английском языке
</completion_criteria>

<exception_handling>
**При сложных названиях:** использовать описательные имена (например, `WithLongTextAndMultipleLines`)
**При состояниях:** добавлять префикс состояния (`LoadingState`, `ErrorState`)
**При вариантах:** группировать по типу (`SizeVariants`, `ColorVariants`)
</exception_handling>
</storybook_naming>

### Импорты/экспорты

<import_export_naming>
**ТОЛЬКО именованные импорты/экспорты:**

```typescript
// ✅ Правильно
export { BaseButton };
import { BaseButton } from './base-button';

// ❌ Неправильно
export default BaseButton;
import BaseButton from './base-button';
```

<completion_criteria>
**Критерий завершения:** Все импорты и экспорты используют именованный синтаксис, default экспорты исключены
</completion_criteria>

<exception_handling>
**При внешних библиотеках:** разрешены default импорты (например, `import React from "react"`)
**При типах:** использовать `import type` для типов TypeScript
**При реэкспортах:** использовать `export { ... } from "..."` синтаксис
**При циклических зависимостях:** использовать именованные импорты для избежания проблем
</exception_handling>
</import_export_naming>

</special_cases>

## ⚠️ TIER 5: Контроль качества

<quality_control>

### Принципы

<naming_principles>

1. **Читаемость:** `validatePackageName` > `validate`
2. **Консистентность:** одинаковые суффиксы для одного типа
3. **Полные слова:** `button` > `btn` (кроме устоявшихся: `props`, `ref`, `config`)
4. **Описательность:** имя должно объяснять назначение
   </naming_principles>

### Быстрая проверка

<validation_checklist>
**Правильный ли регистр?** kebab/camel/Pascal/SCREAMING_SNAKE
**Описывает ли назначение?** понятно без контекста
**Консистентно с проектом?** следует установленным паттернам
**Избегает сокращений?** полные слова где возможно

<completion_criteria>
**Критерий завершения:** Все элементы соответствуют правилам своих категорий, консистентны в проекте
</completion_criteria>

<exception_handling>
**При конфликте правил:** приоритет читаемости над строгим следованием конвенциям
**При устоявшихся исключениях:** документировать и применять консистентно
**При наследии от внешних библиотек:** сохранять оригинальное именование (React.Component, useState)
**При API интеграциях:** следовать соглашениям внешнего API
**При миграции legacy кода:** документировать отклонения и план приведения к стандартам
</exception_handling>
</validation_checklist>

</quality_control>

[REFERENCE-END]
