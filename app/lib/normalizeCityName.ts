/**
 * Converts a string to lowercase and replaces spaces with underscores.
 * @param input The string to be converted.
 * @returns The transformed string.
 */
export function normalizeCityName(input: string): string {
  return input.toLowerCase().replace(/\s+/g, '_');
}

