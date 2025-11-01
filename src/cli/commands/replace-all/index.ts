import { copyRulesToTarget } from '../../../lib/file-operations/copy-rules-to-target';
import { deleteRulesFromTarget } from '../../../lib/file-operations/delete-rules-from-target';
import { writeVersionFile } from '../../../lib/file-operations/write-version-file';
import { getPackageVersion } from '../../../lib/version-manager/get-package-version';

/** Команда полной замены правил */
export async function replaceAllCommand(packageDir: string, targetDir: string): Promise<void> {
    if (!packageDir) {
        throw new Error('packageDir is required');
    }
    if (!targetDir) {
        throw new Error('targetDir is required');
    }

    // Удаляем старые правила
    await deleteRulesFromTarget(targetDir);

    // Копируем новые правила
    await copyRulesToTarget(packageDir, targetDir);

    // Записываем версию
    const version = await getPackageVersion(packageDir);
    await writeVersionFile(targetDir, {
        installedAt: new Date().toISOString(),
        source: 'cursor-rules',
        version,
    });
}
