import { describe, expect, it } from 'vitest';

import { versionSchema } from '../main';

describe('versionSchema', () => {
    it('должен успешно валидировать корректные данные версии', () => {
        const validData = {
            installedAt: '2025-11-01T12:00:00.000Z',
            source: 'cursor-rules',
            version: '1.0.0',
        };

        const result = versionSchema.safeParse(validData);

        expect(result.success).toBe(true);
        if (result.success) {
            expect(result.data).toEqual(validData);
        }
    });

    it('должен отклонять невалидный формат версии', () => {
        const invalidData = {
            installedAt: '2025-11-01T12:00:00.000Z',
            source: 'cursor-rules',
            version: '1.0',
        };

        const result = versionSchema.safeParse(invalidData);

        expect(result.success).toBe(false);
    });

    it('должен отклонять невалидный формат даты', () => {
        const invalidData = {
            installedAt: 'invalid-date',
            source: 'cursor-rules',
            version: '1.0.0',
        };

        const result = versionSchema.safeParse(invalidData);

        expect(result.success).toBe(false);
    });

    it('должен отклонять пустой source', () => {
        const invalidData = {
            installedAt: '2025-11-01T12:00:00.000Z',
            source: '',
            version: '1.0.0',
        };

        const result = versionSchema.safeParse(invalidData);

        expect(result.success).toBe(false);
    });

    it('должен отклонять отсутствующие поля', () => {
        const invalidData = {
            version: '1.0.0',
        };

        const result = versionSchema.safeParse(invalidData);

        expect(result.success).toBe(false);
    });
});
