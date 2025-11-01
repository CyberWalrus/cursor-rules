import { readFile } from 'fs-extra';
import { join } from 'node:path';

/** Получает версию из package.json пакета */
export async function getPackageVersion(packageDir: string): Promise<string> {
    if (packageDir === null || packageDir === undefined) {
        throw new Error('packageDir is required');
    }

    const packageJsonPath = join(packageDir, 'package.json');

    try {
        const content = await readFile(packageJsonPath, 'utf-8');
        const packageJson = JSON.parse(content) as { version: string };

        return packageJson.version;
    } catch (error) {
        throw new Error(`Failed to read package version: ${String(error)}`);
    }
}
