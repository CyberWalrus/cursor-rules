import { copyRulesToTarget } from '../../../lib/file-operations/copy-rules-to-target';
import { writeVersionFile } from '../../../lib/file-operations/write-version-file';
import { getCurrentVersion } from '../../../lib/version-manager/get-current-version';
import { getPackageVersion } from '../../../lib/version-manager/get-package-version';

/** Команда инициализации правил */
export async function initCommand(packageDir: string, targetDir: string): Promise<void> {
    if (!packageDir) {
        throw new Error('packageDir is required');
    }
    if (!targetDir) {
        throw new Error('targetDir is required');
    }

    // Проверяем наличие существующих правил
    const existingVersion = await getCurrentVersion(targetDir);
    if (existingVersion !== null) {
        throw new Error(`Rules already initialized with version ${existingVersion}`);
    }

    // Копируем правила
    await copyRulesToTarget(packageDir, targetDir);

    // Записываем версию
    const version = await getPackageVersion(packageDir);
    await writeVersionFile(targetDir, {
        installedAt: new Date().toISOString(),
        source: 'cursor-rules',
        version,
    });
}
