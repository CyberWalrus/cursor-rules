#!/usr/bin/env node
import { runCli } from './cli/main/index';

runCli().catch((error: unknown) => {
    console.error('Error:', error instanceof Error ? error.message : String(error));
    process.exit(1);
});
