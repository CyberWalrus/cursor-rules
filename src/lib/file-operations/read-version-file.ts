import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { VERSION_FILE_NAME } from '../../model/constants/main';
import type { VersionInfo } from '../../model/types/main';
import { pathExists } from './path-exists';

/** Читает файл версии из целевой директории */
export async function readVersionFile(targetDir: string): Promise<VersionInfo | null> {
    if (!targetDir) {
        throw new Error('targetDir is required');
    }

    const versionFilePath = join(targetDir, VERSION_FILE_NAME);
    const fileExists = await pathExists(versionFilePath);

    if (!fileExists) {
        return null;
    }

    try {
        const content = await readFile(versionFilePath, 'utf-8');

        return JSON.parse(content) as VersionInfo;
    } catch {
        return null;
    }
}
