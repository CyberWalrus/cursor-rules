import { pathExists, remove } from 'fs-extra';
import { join } from 'node:path';

import { RULES_DIRS } from '../../model/constants/main';

/** Удаляет правила из целевой директории */
export async function deleteRulesFromTarget(targetDir: string): Promise<void> {
    if (targetDir === null || targetDir === undefined) {
        throw new Error('targetDir is required');
    }

    await Promise.all(
        RULES_DIRS.map(async (ruleDir) => {
            const targetPath = join(targetDir, ruleDir);
            const targetExists = await pathExists(targetPath);

            if (!targetExists) {
                return;
            }

            await remove(targetPath);
        }),
    );
}
