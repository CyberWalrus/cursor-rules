import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';

import { VERSION_FILE_NAME } from '../../model/constants/main';
import type { VersionInfo } from '../../model/types/main';

/** Записывает файл версии в целевую директорию */
export async function writeVersionFile(targetDir: string, versionInfo: VersionInfo): Promise<void> {
    if (!targetDir) {
        throw new Error('targetDir is required');
    }
    if (!versionInfo) {
        throw new Error('versionInfo is required');
    }

    const versionFilePath = join(targetDir, VERSION_FILE_NAME);
    const content = JSON.stringify(versionInfo, null, 2);

    try {
        await writeFile(versionFilePath, content, 'utf-8');
    } catch (error) {
        throw new Error(`Failed to write version file: ${String(error)}`);
    }
}
