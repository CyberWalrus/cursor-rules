import { readVersionFile } from '../file-operations/read-version-file';

/** Получает текущую версию правил из целевой директории */
export async function getCurrentVersion(targetDir: string): Promise<string | null> {
    if (targetDir === null || targetDir === undefined) {
        throw new Error('targetDir is required');
    }

    const versionInfo = await readVersionFile(targetDir);

    if (versionInfo === null) {
        return null;
    }

    return versionInfo.version;
}
