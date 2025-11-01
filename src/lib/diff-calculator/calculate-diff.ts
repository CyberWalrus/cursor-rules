import { RULES_DIRS } from '../../model/constants/main';
import type { VersionDiff } from '../../model/types/main';

/** Вычисляет diff между версиями правил */
export function calculateDiff(currentVersion: string, targetVersion: string): VersionDiff {
    if (!currentVersion) {
        throw new Error('currentVersion is required');
    }
    if (!targetVersion) {
        throw new Error('targetVersion is required');
    }

    // В MVP версии возвращаем все директории для обновления
    // В будущем здесь будет реальное сравнение файлов
    const allPaths = RULES_DIRS.map((dir) => dir);

    return {
        toAdd: [],
        toDelete: [],
        toUpdate: allPaths,
    };
}
