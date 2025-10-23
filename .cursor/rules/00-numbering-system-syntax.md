---
id: numbering-system-syntax
type: compact
alwaysApply: true
---

# 📖 Numbering System Syntax

> **Full documentation:** `./.cursor/docs/numbering-system.md` - for examples, FAQ, patterns, and detailed explanations.

<numbering_syntax>

## Notation Rules

**Separators:** `--` (hierarchy) | `_` (modifiers)

**Core Hierarchy:** `P{n}--S{n}--T{n}--B{n}` (Phase > Step > Task > Block)

**Modifiers:**

- `R{n}` = Run (iteration number)
- `V{n}` = Variant (alternative path)
- `C{n}` = Concurrent (parallel group)
- `F` = Fallback (error recovery, always last)

**Modifier Order:** `_R{n}_V{v}_C{c}_F` (F must be last)

## Key Semantics

**Fallback (F):**

- `T3_F` = if T3 fails → execute fallback
- One per level, always last modifier
- Example: `T4_V2_C1_F` = "Try V2 in C1, if fails → fallback"

**Run (R):**

- Independent counters per level
- `P2_R3--S1_R1--T4_R2` = P2(3rd) → S1(1st) → T4(2nd)

**Concurrent (C):**

- All `C{n}` tasks run parallel → [SYNC POINT] → next serial task
- `T1_C1_F` = fallback only for T1, not entire C1 group

## Quick Examples

`P1--S2--T3--B1` - basic hierarchy
`P2_R3--S1_R1--T4_R2` - multi-level runs
`P1--S2--T1_C1, T2_C1, T3_C1 → [SYNC]` - concurrent group
`T4_V2_F` - variant with fallback
`P1_R2--S3_V1--T4_V2_C1_F--B2` - complex

## Anti-patterns

❌ `T4_F_V2` (F not last) | `T4_C1_V2` (wrong order)
❌ Too many modifiers: `T1_R1_V1_C1_F` (max 2-3)
❌ Run for different logic (use Variant instead)

</numbering_syntax>
