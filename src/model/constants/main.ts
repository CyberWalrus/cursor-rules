/** Имя файла для хранения информации о версии */
export const VERSION_FILE_NAME = '.cursor-rules-version.json';

/** Имя директории с правилами Cursor */
export const CURSOR_DIR = '.cursor';

/** Директории с правилами для копирования */
export const RULES_DIRS = ['.cursor/rules', '.cursor/docs', '.cursor/commands', 'user-rules'] as const;

/** Пути к файлам правил относительно пакета */
export const RULES_PATHS = [...RULES_DIRS] as const;

/** Файлы для исключения при копировании */
export const EXCLUDE_FILES = ['.DS_Store', 'Thumbs.db', '.git', 'node_modules'] as const;
