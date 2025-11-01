import { rm } from 'node:fs/promises';
import { join } from 'node:path';

import { RULES_DIRS } from '../../model/constants/main';
import { pathExists } from './path-exists';

/** Удаляет правила из целевой директории */
export async function deleteRulesFromTarget(targetDir: string): Promise<void> {
    if (!targetDir) {
        throw new Error('targetDir is required');
    }

    await Promise.all(
        RULES_DIRS.map(async (ruleDir) => {
            const targetPath = join(targetDir, ruleDir);
            const targetExists = await pathExists(targetPath);

            if (!targetExists) {
                return;
            }

            await rm(targetPath, {
                force: true,
                recursive: true,
            });
        }),
    );
}
