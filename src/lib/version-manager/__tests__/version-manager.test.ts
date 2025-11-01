import { readVersionFile } from '../../file-operations/read-version-file';
import { compareVersions } from '../compare-versions';
import { getCurrentVersion } from '../get-current-version';
import { getPackageVersion } from '../get-package-version';

const { mockReadFile } = vi.hoisted(() => ({
    mockReadFile: vi.fn(),
}));

vi.mock('fs-extra', () => ({
    readFile: mockReadFile,
}));

vi.mock('../../file-operations/read-version-file');

const mockReadVersionFile = vi.mocked(readVersionFile);

describe('version-manager', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('getCurrentVersion', () => {
        it('должен возвращать версию если файл существует', async () => {
            mockReadVersionFile.mockResolvedValue({
                installedAt: '2025-11-01T12:00:00.000Z',
                source: 'cursor-rules',
                version: '1.0.0',
            });

            const version = await getCurrentVersion('/target');

            expect(version).toBe('1.0.0');
            expect(mockReadVersionFile).toHaveBeenCalledWith('/target');
        });

        it('должен возвращать null если файл не существует', async () => {
            mockReadVersionFile.mockResolvedValue(null);

            const version = await getCurrentVersion('/target');

            expect(version).toBeNull();
        });

        it('должен выбрасывать ошибку если targetDir не указан', async () => {
            await expect(getCurrentVersion(null as unknown as string)).rejects.toThrow('targetDir is required');
        });
    });

    describe('getPackageVersion', () => {
        it('должен читать версию из package.json', async () => {
            const packageJson = { version: '2.0.0' };
            mockReadFile.mockResolvedValue(JSON.stringify(packageJson));

            const version = await getPackageVersion('/package');

            expect(version).toBe('2.0.0');
            expect(mockReadFile).toHaveBeenCalledWith(expect.stringContaining('package.json'), 'utf-8');
        });

        it('должен выбрасывать ошибку если файл не читается', async () => {
            mockReadFile.mockRejectedValue(new Error('ENOENT'));

            await expect(getPackageVersion('/package')).rejects.toThrow('Failed to read package version');
        });

        it('должен выбрасывать ошибку если packageDir не указан', async () => {
            await expect(getPackageVersion(null as unknown as string)).rejects.toThrow('packageDir is required');
        });
    });

    describe('compareVersions', () => {
        it('должен определять major изменение', () => {
            const result = compareVersions('1.0.0', '2.0.0');

            expect(result).toEqual({
                changeType: 'major',
                current: '1.0.0',
                target: '2.0.0',
            });
        });

        it('должен определять minor изменение', () => {
            const result = compareVersions('1.0.0', '1.1.0');

            expect(result).toEqual({
                changeType: 'minor',
                current: '1.0.0',
                target: '1.1.0',
            });
        });

        it('должен определять patch изменение', () => {
            const result = compareVersions('1.0.0', '1.0.1');

            expect(result).toEqual({
                changeType: 'patch',
                current: '1.0.0',
                target: '1.0.1',
            });
        });

        it('должен определять отсутствие изменений', () => {
            const result = compareVersions('1.0.0', '1.0.0');

            expect(result).toEqual({
                changeType: 'none',
                current: '1.0.0',
                target: '1.0.0',
            });
        });

        it('должен выбрасывать ошибку если версия не указана', () => {
            expect(() => compareVersions(null as unknown as string, '1.0.0')).toThrow('current version is required');

            expect(() => compareVersions('1.0.0', null as unknown as string)).toThrow('target version is required');
        });

        it('должен выбрасывать ошибку если формат версии невалиден', () => {
            expect(() => compareVersions('invalid', '1.0.0')).toThrow('Invalid current version format');

            expect(() => compareVersions('1.0.0', 'invalid')).toThrow('Invalid target version format');
        });
    });
});
