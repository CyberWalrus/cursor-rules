import { Command } from 'commander';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { initCommand } from '../commands/init/index';
import { replaceAllCommand } from '../commands/replace-all/index';
import { updateCommand } from '../commands/update/index';

const currentFilePath = fileURLToPath(import.meta.url);
const packageDir = join(dirname(currentFilePath), '..', '..', '..');

/** Запускает CLI приложение */
export async function runCli(): Promise<void> {
    const program = new Command();

    program.name('cursor-rules').description('CLI tool for managing .cursor rules in projects').version('0.1.0');

    program
        .command('init')
        .description('Initialize .cursor rules in the project')
        .action(async () => {
            const targetDir = process.cwd();
            await initCommand(packageDir, targetDir);
            // eslint-disable-next-line no-console
            console.log('✅ Rules initialized successfully');
        });

    program
        .command('update')
        .description('Update .cursor rules to the latest version')
        .action(async () => {
            const targetDir = process.cwd();
            await updateCommand(packageDir, targetDir);
            // eslint-disable-next-line no-console
            console.log('✅ Rules updated successfully');
        });

    program
        .command('replace-all')
        .description('Replace all .cursor rules with the latest version')
        .action(async () => {
            const targetDir = process.cwd();
            await replaceAllCommand(packageDir, targetDir);
            // eslint-disable-next-line no-console
            console.log('✅ Rules replaced successfully');
        });

    await program.parseAsync(process.argv);
}
