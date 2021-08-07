export const locales = ['ja_JP', 'en_US'] as const;

export type TLocale = typeof locales[number];
