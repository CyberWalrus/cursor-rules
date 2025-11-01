import type { VersionInfo } from '../../../model/types/main';
import { copyRulesToTarget, deleteRulesFromTarget, readVersionFile, writeVersionFile } from '../index';

const { mockCopy, mockPathExists, mockReadFile, mockRemove, mockWriteFile } = vi.hoisted(() => ({
    mockCopy: vi.fn(),
    mockPathExists: vi.fn(),
    mockReadFile: vi.fn(),
    mockRemove: vi.fn(),
    mockWriteFile: vi.fn(),
}));

vi.mock('fs-extra', () => ({
    copy: mockCopy,
    pathExists: mockPathExists,
    readFile: mockReadFile,
    remove: mockRemove,
    writeFile: mockWriteFile,
}));

describe('file-operations', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('copyRulesToTarget', () => {
        it('должен копировать существующие директории правил', async () => {
            mockPathExists.mockResolvedValue(true);
            mockCopy.mockResolvedValue(undefined);

            await copyRulesToTarget('/package', '/target');

            expect(mockPathExists).toHaveBeenCalled();
            expect(mockCopy).toHaveBeenCalled();
        });

        it('должен пропускать несуществующие директории', async () => {
            mockPathExists.mockResolvedValue(false);

            await copyRulesToTarget('/package', '/target');

            expect(mockPathExists).toHaveBeenCalled();
            expect(mockCopy).not.toHaveBeenCalled();
        });
    });

    describe('deleteRulesFromTarget', () => {
        it('должен удалять существующие директории правил', async () => {
            mockPathExists.mockResolvedValue(true);
            mockRemove.mockResolvedValue(undefined);

            await deleteRulesFromTarget('/target');

            expect(mockPathExists).toHaveBeenCalled();
            expect(mockRemove).toHaveBeenCalled();
        });

        it('должен пропускать несуществующие директории', async () => {
            mockPathExists.mockResolvedValue(false);

            await deleteRulesFromTarget('/target');

            expect(mockPathExists).toHaveBeenCalled();
            expect(mockRemove).not.toHaveBeenCalled();
        });
    });

    describe('readVersionFile', () => {
        it('должен читать и парсить файл версии', async () => {
            const versionInfo: VersionInfo = {
                installedAt: '2025-11-01T12:00:00.000Z',
                source: 'cursor-rules',
                version: '1.0.0',
            };

            mockPathExists.mockResolvedValue(true);
            mockReadFile.mockResolvedValue(JSON.stringify(versionInfo));

            const result = await readVersionFile('/target');

            expect(result).toEqual(versionInfo);
            expect(mockPathExists).toHaveBeenCalled();
            expect(mockReadFile).toHaveBeenCalledWith(expect.stringContaining('.cursor-rules-version.json'), 'utf-8');
        });

        it('должен возвращать null если файл не существует', async () => {
            mockPathExists.mockResolvedValue(false);

            const result = await readVersionFile('/target');

            expect(result).toBeNull();
            expect(mockPathExists).toHaveBeenCalled();
            expect(mockReadFile).not.toHaveBeenCalled();
        });
    });

    describe('writeVersionFile', () => {
        it('должен записывать файл версии с правильным форматированием', async () => {
            const versionInfo: VersionInfo = {
                installedAt: '2025-11-01T12:00:00.000Z',
                source: 'cursor-rules',
                version: '1.0.0',
            };

            mockWriteFile.mockResolvedValue(undefined);

            await writeVersionFile('/target', versionInfo);

            expect(mockWriteFile).toHaveBeenCalledWith(
                expect.stringContaining('.cursor-rules-version.json'),
                JSON.stringify(versionInfo, null, 2),
                'utf-8',
            );
        });
    });
});
