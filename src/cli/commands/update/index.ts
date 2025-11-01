import { calculateDiff } from '../../../lib/diff-calculator/calculate-diff';
import { copyRulesToTarget } from '../../../lib/file-operations/copy-rules-to-target';
import { writeVersionFile } from '../../../lib/file-operations/write-version-file';
import { compareVersions } from '../../../lib/version-manager/compare-versions';
import { getCurrentVersion } from '../../../lib/version-manager/get-current-version';
import { getPackageVersion } from '../../../lib/version-manager/get-package-version';

/** Команда обновления правил */
export async function updateCommand(packageDir: string, targetDir: string): Promise<void> {
    if (!packageDir) {
        throw new Error('packageDir is required');
    }
    if (!targetDir) {
        throw new Error('targetDir is required');
    }

    // Получаем версии
    const currentVersion = await getCurrentVersion(targetDir);
    if (currentVersion === null) {
        throw new Error('Rules not initialized. Run init command first.');
    }

    const packageVersion = await getPackageVersion(packageDir);

    // Сравниваем версии
    const comparison = compareVersions(currentVersion, packageVersion);
    if (comparison.changeType === 'none') {
        return;
    }

    // Вычисляем diff
    calculateDiff(currentVersion, packageVersion);

    // Копируем обновленные правила
    await copyRulesToTarget(packageDir, targetDir);

    // Обновляем версию
    await writeVersionFile(targetDir, {
        installedAt: new Date().toISOString(),
        source: 'cursor-rules',
        version: packageVersion,
    });
}
