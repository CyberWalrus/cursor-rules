import { z } from 'zod';

/** Схема валидации информации о версии */
export const versionSchema = z.object({
    installedAt: z.string().datetime({ message: 'installedAt must be a valid ISO 8601 datetime' }),
    source: z.string().min(1, 'Source cannot be empty'),
    version: z.string().regex(/^\d+\.\d+\.\d+$/, 'Version must be in semver format (x.y.z)'),
});

/** Тип данных версии на основе схемы */
export type VersionData = z.infer<typeof versionSchema>;
