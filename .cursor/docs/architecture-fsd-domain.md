---
id: architecture-fsd-domain
type: reference
alwaysApply: false
---

# FSD Domain — Feature-Sliced Design с доменами

[REFERENCE-BEGIN]

## TIER 1: Expert Role

<expert_role>
You are a FSD Domain Architecture Specialist for TypeScript/React projects.

Responsibilities:

- Enforce FSD Domain architecture rules with zero exceptions
- Ensure strict layer hierarchy: app → pages → widgets → features → entities → shared → core with domain grouping in widgets, features, entities
- Validate domain separation and weak coupling between domains via public APIs
- Guide proper domain application (user, payments, betting) and slice organization within domains
- Prioritize no cross-imports within domains on the same layer and downward dependencies only

**ВАЖНО: Все ответы должны быть на русском языке.**
</expert_role>

<expert_completion_criteria>
Expert role clearly defines responsibilities specific to FSD Domain architecture and includes Russian language requirement for responses.
</expert_completion_criteria>

## TIER 2: Purpose and Application

<exception_handling>
When working with FSD Domain architecture, the following exceptional situations are possible:

- Project without domain separation → migrate to fsd_standard
- Absence of optional layers (widgets, features, entities, core) → not an error, added as needed
- Minimal configuration (app, pages, shared) → fully valid for simple projects
- Business logic in entities/service → acceptable, especially if features layer is absent
- Domain coupling violation → immediate refactoring of imports between domains
- Cross-imports within domain → strict checking and moving to shared
- Uncertainty in domain → priority by business entities (user for authorization, payments for payments)

Fix priorities:

1. **Critical:** Fix immediately (hierarchy violation or domain coupling)
2. **Medium:** Plan domain refactoring
3. **Low:** Add facades for inter-domain interactions, create optional layers as project grows
   </exception_handling>
<algorithm_motivation>
FSD Domain architecture provides domain separation for large applications, minimizing coupling through public APIs and strict hierarchy, simplifying enterprise-level maintenance.
</algorithm_motivation>

<cognitive_triggers>
Let's determine step by step if the project is suitable for FSD Domain architecture by analyzing presence of business domains, complexity, and need for separation.
</cognitive_triggers>

<architecture_scope>
FSD Domain — architectural type for frontend applications with Feature-Sliced Design and domain separation, where slices are grouped by business entities (user, payments) in widgets, features, entities layers.
**Purpose:** Large frontend applications with explicit business domains.
**Key principle:** Strict layer hierarchy, domain grouping, weak domain coupling through facades, prohibition of cross-imports within domain.
</architecture_scope>

<scope_completion_criteria>
Architecture scope clearly defines purpose, key principle, and decision criteria for FSD Domain usage.
</scope_completion_criteria>

### Architecture Selection Algorithm

<algorithm_steps>

1. **Domain analysis:** Determine presence of business domains (user, payments, betting)
2. **Complexity check:** Ensure high complexity with multiple areas
3. **Coupling assessment:** Check need for domain separation for weak coupling
4. **Decision making:** Apply architecture selection rules

</algorithm_steps>

If project contains:

- ✓ Explicit business domains (user, payments, betting)
- ✓ High complexity (>50 slices)
- ✓ Need for weak domain coupling
- ✓ Enterprise-level frontend application
- ⚠️ Features layer is optional — created when reuse of functionality is needed

### → FSD Domain

Otherwise → fsd_standard (without domains) or multi_app_monolith (multiple applications)

<step_completion_criteria>
Algorithm is clearly structured with step-by-step instructions and decision criteria for FSD Domain.
</step_completion_criteria>

<exception_handling>

If project is in borderline zone (several domains but low complexity), conduct additional analysis:

- If domains are not critical → fsd_standard
- If full separation is required → FSD Domain
- If uncertain → choose FSD Domain for scalability

If project is server-side → use server_fsd.

</exception_handling>

### Quick Suitability Check

| **Condition** | **✅ Suitable**                | **❌ Not Suitable**      |
| ----------- | ------------------------------ | ----------------------- |
| Domains      | Explicit business domains            | Absent             |
| Complexity   | High/enterprise             | Medium or simple     |
| Structure    | Grouping by domains in layers | Without domains or flat |
| Project Type | Large frontend application    | Library or server   |

### Key Characteristics

- **Layered architecture:** Strict hierarchy app → pages → widgets → features → entities → shared → core
- **Domain separation:** Slices are grouped by business entities
- **Slice facades:** Each slice has index.ts
- **Cross-import prohibition:** Slices of same layer do not import each other
- **Weak domain coupling:** Domains interact only through public APIs

## TIER 3: Project Structure

<output_format>

When describing project structure, use XML schema with clear file roles and purposes. For each element specify:

- `name` — file/directory name
- `role` — role (layer, domain, module, facade, segment, component, function, types, unit_test)
- `purpose` — purpose
- `exports` — what it exports (for facades)

</output_format>

<cognitive_triggers>
Let's analyze FSD Domain structure step by step, starting with layer hierarchy, domains, and slices.
</cognitive_triggers>

### Базовая схема

```xml
<package_root>
  <source_directory name="src">
    <layer name="app" purpose="Глобальная инициализация">
      <entrypoint name="index.ts" purpose="Точка входа" />
      <directory name="providers">
        <file name="global-providers.tsx" role="component" purpose="Глобальные провайдеры" />
      </directory>
    </layer>
    <layer name="pages" purpose="Страницы (без доменов)">
      <module name="home">
        <facade name="index.ts" role="slice_facade" exports="HomePage" />
        <segment name="ui">
          <file name="HomePage.tsx" role="component" />
        </segment>
        <segment name="route">
          <file name="index.ts" role="config" />
        </segment>
      </module>
      <module name="profile">
        <facade name="index.ts" role="slice_facade" exports="ProfilePage" />
        <segment name="ui">
          <file name="ProfilePage.tsx" role="component" />
        </segment>
      </module>
    </layer>
    <layer name="widgets" purpose="Виджеты с доменами">
      <directory name="user" purpose="Домен user">
        <module name="user-header">
          <facade name="index.ts" role="slice_facade" exports="UserHeader" />
          <segment name="ui">
            <file name="UserHeader.tsx" role="component" />
          </segment>
        </module>
      </directory>
      <directory name="payments" purpose="Домен payments">
        <module name="payment-widget">
          <facade name="index.ts" role="slice_facade" exports="PaymentWidget" />
          <segment name="ui">
            <file name="PaymentWidget.tsx" role="component" />
          </segment>
        </module>
      </directory>
    </layer>
    <layer name="features" purpose="Фичи с доменами">
      <directory name="user" purpose="Домен user">
        <module name="auth">
          <facade name="index.ts" role="slice_facade" exports="AuthForm" />
          <segment name="ui">
            <file name="AuthForm.tsx" role="component" />
          </segment>
          <segment name="model">
            <file name="authStore.ts" role="function" />
          </segment>
        </module>
        <module name="profile">
          <facade name="index.ts" role="slice_facade" exports="ProfileFeature" />
          <segment name="ui">
            <file name="ProfileForm.tsx" role="component" />
          </segment>
        </module>
      </directory>
      <directory name="payments" purpose="Домен payments">
        <module name="payment-form">
          <facade name="index.ts" role="slice_facade" exports="PaymentForm" />
          <segment name="ui">
            <file name="PaymentForm.tsx" role="component" />
          </segment>
          <segment name="service">
            <file name="paymentService.ts" role="workflow" />
          </segment>
        </module>
      </directory>
    </layer>
    <layer name="entities" purpose="Сущности с доменами">
      <directory name="user" purpose="Домен user">
        <module name="user">
          <facade name="index.ts" role="slice_facade" exports="UserEntity" />
          <segment name="model">
            <file name="userModel.ts" role="function" />
            <file name="userTypes.ts" role="types" />
          </segment>
        </module>
      </directory>
      <directory name="payments" purpose="Домен payments">
        <module name="payment">
          <facade name="index.ts" role="slice_facade" exports="PaymentEntity" />
          <segment name="model">
            <file name="paymentModel.ts" role="function" />
          </segment>
        </module>
      </directory>
    </layer>
    <layer name="shared" purpose="Shared (без доменов)">
      <directory name="ui">
        <module name="button">
          <facade name="index.tsx" role="unit_facade" exports="Button" />
          <file name="Button.tsx" role="component" />
        </module>
      </directory>
    </layer>
    <layer name="core" purpose="Core (без доменов)">
      <directory name="router">
        <file name="index.ts" role="function" purpose="Роутер" />
      </directory>
    </layer>
  </source_directory>
</package_root>
```

<structure_completion_criteria>
Structure is clearly defined with XML schema, element roles and purposes for FSD Domain.
</structure_completion_criteria>

### Layer Hierarchy

app → pages → widgets → [features]? → entities → shared → core

Layers can depend only on lower layers.

**Important:**

- **Required layers:** app, pages, shared — minimal project configuration
- **Optional layers:** widgets, features, entities, core — added as needed
- **core** layer is created when abstractions over external libraries are needed (router, store, logger)

### Domain Structure

#### Domain Application

**Domains are applied only on layers:**

- `widgets` — widgets related to domain (if layer exists)
- `features` — features of specific domain (if layer exists)
- `entities` — domain entities

**Important:** Domain structure is applied only if corresponding layers exist. Absence of `features` or `widgets` is not an error.

**Domains are NOT applied on layers:**

- `app` — global initialization
- `pages` — pages can use multiple domains
- `shared` — code not related to business logic
- `core` — base libraries

#### Domain Examples

| **Domain**  | **Description**              | **Slice Examples**                            |
| ---------- | ------------------------- | ---------------------------------------------- |
| `user`     | User management | `auth`, `profile`, `registration`, `settings`  |
| `payments` | Payment system         | `payment-form`, `billing`, `invoices`, `cards` |
| `betting`  | Betting and predictions         | `bet-slip`, `odds`, `events`, `results`        |
| `gambling` | Casino games             | `casino`, `slots`, `poker`, `live-games`       |
| `loyalty`  | Loyalty programs      | `points`, `rewards`, `promotions`, `bonuses`   |
| `system`   | System functions         | `notifications`, `settings`, `monitoring`      |

## TIER 4: Rules and Constraints

### ✅ Requirements

- [ ] **Layer hierarchy:** Matches FSD with dependencies only downward in hierarchy
- [ ] **Domain organization:** Layers `widgets`, `features`, `entities` are grouped by domains
- [ ] **Slice facades:** All slices have `index.ts` as Public API
- [ ] **Cross-import prohibition within domain:** No imports between slices of same domain on same layer
- [ ] **Inter-domain imports by hierarchy:** Imports between domains follow layer hierarchy
- [ ] **Named exports:** Only named exports
- [ ] **Slice-level tests:** Tests in `__tests__/` next to slices

### ❌ Forbidden

- Layer hierarchy violation (import from upper layers)
- Cross-imports between slices within same domain on same layer
- Direct import from internal parts of slices (only through facades)
- Cyclic dependencies between domains
- `Default` exports

### Domain Interaction Rules

#### ✅ Domain Interaction Rules

- **Import from slice of one domain to slice of another domain IS ALLOWED**, if vertical layer hierarchy is maintained
- **Direct imports between slices WITHIN same domain** on same layer are forbidden
- **Domains interact through public APIs** of slices (facades)

#### Allowed Import Examples

```typescript
// ✅ ALLOWED: features/payments imports entities/user
// (lower layer + different domain)
import { User } from 'entities/user';

// ✅ ALLOWED: widgets/betting imports features/user
// (lower layer + different domain)
import { AuthForm } from 'features/user';

// ❌ FORBIDDEN: features/user/auth imports features/user/profile
// (same layer + same domain)
import { ProfileForm } from 'features/user/profile';

// ❌ FORBIDDEN: features/user imports widgets/payments
// (upper layer)
import { PaymentWidget } from 'widgets/payments';
```

### Risk Assessment

<cognitive_triggers>
Let's analyze potential risks when using FSD Domain architecture and ways to mitigate them.
</cognitive_triggers>

**Potential problems and solutions:**

| **Risk**                    | **Symptoms**                  | **Mitigation**                                          |
| --------------------------- | ----------------------------- | ------------------------------------------------------ |
| Strong domain coupling | Frequent imports between domains | Limit to public APIs + refactor to shared    |
| Hierarchy violation          | Imports violate layers/domains  | ESLint: import rules + automated checking |
| Uncontrolled domain growth   | >10 domains without documentation  | Domain documentation + migration to multi_app_monolith  |
| Cross-imports within domain | Dependencies within one domain    | Refactoring: extract to separate slices or shared   |

<risk_completion_criteria>
Risk Assessment contains specific risks, their symptoms, and mitigation methods for FSD Domain.
</risk_completion_criteria>

## TIER 5: Usage Examples

### Example Structure with Domains

**Description:** Application with user and payments domains

```xml
<package_root>
  <source_directory name="src">
    <layer name="app" purpose="Глобальная инициализация">
      <entrypoint name="index.ts" purpose="Точка входа" />
      <directory name="providers">
        <file name="global-providers.tsx" role="component" purpose="Глобальные провайдеры" />
      </directory>
    </layer>
    <layer name="pages" purpose="Страницы (без доменов)">
      <module name="home">
        <facade name="index.ts" role="slice_facade" exports="HomePage" />
        <segment name="ui">
          <file name="HomePage.tsx" role="component" />
        </segment>
        <segment name="route">
          <file name="index.ts" role="config" />
        </segment>
      </module>
      <module name="profile">
        <facade name="index.ts" role="slice_facade" exports="ProfilePage" />
        <segment name="ui">
          <file name="ProfilePage.tsx" role="component" />
        </segment>
      </module>
    </layer>
    <layer name="widgets" purpose="Виджеты с доменами">
      <directory name="user" purpose="Домен user">
        <module name="user-header">
          <facade name="index.ts" role="slice_facade" exports="UserHeader" />
          <segment name="ui">
            <file name="UserHeader.tsx" role="component" />
          </segment>
        </module>
      </directory>
      <directory name="payments" purpose="Домен payments">
        <module name="payment-widget">
          <facade name="index.ts" role="slice_facade" exports="PaymentWidget" />
          <segment name="ui">
            <file name="PaymentWidget.tsx" role="component" />
          </segment>
        </module>
      </directory>
    </layer>
    <layer name="features" purpose="Фичи с доменами">
      <directory name="user" purpose="Домен user">
        <module name="auth">
          <facade name="index.ts" role="slice_facade" exports="AuthForm" />
          <segment name="ui">
            <file name="AuthForm.tsx" role="component" />
          </segment>
          <segment name="model">
            <file name="authStore.ts" role="function" />
          </segment>
        </module>
        <module name="profile">
          <facade name="index.ts" role="slice_facade" exports="ProfileFeature" />
          <segment name="ui">
            <file name="ProfileForm.tsx" role="component" />
          </segment>
        </module>
      </directory>
      <directory name="payments" purpose="Домен payments">
        <module name="payment-form">
          <facade name="index.ts" role="slice_facade" exports="PaymentForm" />
          <segment name="ui">
            <file name="PaymentForm.tsx" role="component" />
          </segment>
          <segment name="service">
            <file name="paymentService.ts" role="workflow" />
          </segment>
        </module>
      </directory>
    </layer>
    <layer name="entities" purpose="Сущности с доменами">
      <directory name="user" purpose="Домен user">
        <module name="user">
          <facade name="index.ts" role="slice_facade" exports="UserEntity" />
          <segment name="model">
            <file name="userModel.ts" role="function" />
            <file name="userTypes.ts" role="types" />
          </segment>
        </module>
      </directory>
      <directory name="payments" purpose="Домен payments">
        <module name="payment">
          <facade name="index.ts" role="slice_facade" exports="PaymentEntity" />
          <segment name="model">
            <file name="paymentModel.ts" role="function" />
          </segment>
        </module>
      </directory>
    </layer>
    <layer name="shared" purpose="Shared (без доменов)">
      <directory name="ui">
        <module name="button">
          <facade name="index.tsx" role="unit_facade" exports="Button" />
          <file name="Button.tsx" role="component" />
        </module>
      </directory>
    </layer>
    <layer name="core" purpose="Core (без доменов)">
      <directory name="router">
        <file name="index.ts" role="function" purpose="Роутер" />
      </directory>
    </layer>
  </source_directory>
</package_root>
```

**Note:** Domains group slices in widgets, features, entities; pages and shared without domains; interactions through facades.

### Example user Domain in features

**Description:** auth and profile slices in user domain

```xml
<directory name="user" purpose="Домен user">
  <module name="auth">
    <facade name="index.ts" role="slice_facade" exports="AuthForm" />
    <segment name="ui">
      <file name="AuthForm.tsx" role="component" />
    </segment>
    <segment name="model">
      <file name="authStore.ts" role="function" />
    </segment>
    <segment name="service">
      <file name="authService.ts" role="workflow" />
    </segment>
  </module>
  <module name="profile">
    <facade name="index.ts" role="slice_facade" exports="ProfileFeature" />
    <segment name="ui">
      <file name="ProfileForm.tsx" role="component" />
    </segment>
    <segment name="model">
      <file name="profileStore.ts" role="function" />
    </segment>
  </module>
</directory>
```

## TIER 6: XML Schema for Validator

```xml
<package_root>
  <source_directory name="src">
    <layer name="app" purpose="инициализация приложения">
      <entrypoint name="index.ts" />
    </layer>
    <layer name="widgets" purpose="виджеты">
      <directory name="user">
        <module name="user-header">
          <facade name="index.ts" role="slice_facade" />
          <segment name="ui" purpose="UI компоненты">
            <file name="common/UserHeader.tsx" role="component" />
          </segment>
        </module>
      </directory>
      <directory name="betting">
        <module name="bet-slip">
          <facade name="index.ts" role="slice_facade" />
          <segment name="ui" purpose="UI компоненты">
            <file name="common/BetSlip.tsx" role="component" />
          </segment>
        </module>
      </directory>
    </layer>
    <layer name="features" purpose="фичи">
      <directory name="user">
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
      </directory>
      <directory name="payments">
        <module name="payment-form">
          <facade name="index.ts" role="slice_facade" />
          <segment name="ui" purpose="UI компоненты">
            <file name="common/PaymentForm.tsx" role="component" />
          </segment>
        </module>
      </directory>
    </layer>
    <layer name="entities" purpose="сущности">
      <directory name="user">
        <module name="user">
          <facade name="index.ts" role="slice_facade" />
          <segment name="model" purpose="модель пользователя">
            <file name="types/index.ts" role="types" />
            <file name="store/index.ts" role="function" />
          </segment>
        </module>
      </directory>
    </layer>
    <layer name="shared" purpose="разделяемый код">
      <directory name="ui">
        <directory name="base">
          <module name="button">
            <facade name="index.tsx" role="unit_facade" />
            <file name="Button.tsx" role="component" />
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
  <architecture_type>fsd_domain</architecture_type>
  <scope>full</scope>
  <module_units>
    <unit path="src/widgets/user/user-header" layer="widgets" />
    <unit path="src/features/user/auth" layer="features" />
    <unit path="src/features/payments/payment-form" layer="features" />
    <unit path="src/entities/user/user" layer="entities" />
    <unit path="src/shared/ui/base/button" layer="shared" />
  </module_units>
  <entrypoints>
    <entrypoint path="src/app/index.ts" />
  </entrypoints>
  <ruleset>${PROJECT_NAME}-2025-10</ruleset>
</architecture_metadata>
```

### Partial Validation (Single Domain)

```xml
<architecture_metadata version="1" language="ts">
  <architecture_type>fsd_domain</architecture_type>
  <scope>partial</scope>
  <partial_root>src/features/user</partial_root>
  <module_units>
    <unit path="src/features/user/auth" layer="features" />
    <unit path="src/features/user/profile" layer="features" />
  </module_units>
  <entrypoints>
    <entrypoint path="src/app/index.ts" />
  </entrypoints>
  <ruleset>${PROJECT_NAME}-2025-10</ruleset>
</architecture_metadata>
```

## TIER 8: Applicability and Validation

### ✅ Suitable for

- Large frontend applications with explicit domain separation
- Projects with multiple business areas
- Teams with FSD experience
- Enterprise applications with multiple functionalities

### ❌ Not suitable for

- Simple applications (use `single_module` or `layered_library`)
- Projects without explicit domain separation (use `fsd_standard`)
- Server applications (use `server_fsd`)
- Monorepos with multiple applications (use `multi_app_monolith`)

<completion_criteria>
Document is fully ready for use: all FSD Domain architecture rules are defined, structure examples provided, XML schemas for validator ready, metadata correct. Document complies with reference prompt standard and can be used for project architecture validation.
</completion_criteria>

[REFERENCE-END]
