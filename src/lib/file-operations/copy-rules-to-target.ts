import { copy, pathExists } from 'fs-extra';
import { join } from 'node:path';

import { RULES_DIRS } from '../../model/constants/main';

/** Копирует правила из пакета в целевую директорию */
export async function copyRulesToTarget(packageDir: string, targetDir: string): Promise<void> {
    if (packageDir === null || packageDir === undefined) {
        throw new Error('packageDir is required');
    }
    if (targetDir === null || targetDir === undefined) {
        throw new Error('targetDir is required');
    }

    await Promise.all(
        RULES_DIRS.map(async (ruleDir) => {
            const sourcePath = join(packageDir, ruleDir);
            const targetPath = join(targetDir, ruleDir);
            const sourceExists = await pathExists(sourcePath);

            if (!sourceExists) {
                return;
            }

            await copy(sourcePath, targetPath, {
                errorOnExist: false,
                overwrite: true,
            });
        }),
    );
}
