/**
 * Converts string to number or null
 * @param input
 * @returns
 */
export function NumberOrNull(input: string | null): number | null {
  if (input === null) return null;

  if (isNaN(Number(input))) {
    throw new Error(`Type conversion is returning NaN for value ${input} in NumberOrNull method`);
  }

  return Number(input);
}

/**
 * Converts a string to a number or zero if null
 * @param input
 * @returns
 */
export function NumberOrZeroIfNull(input: string): number {
  if (input === null) return 0;

  if (isNaN(Number(input))) {
    throw new Error(
      `Type conversion is returning NaN for value ${input} in NumberOrZeroIfNull method`,
    );
  }

  return Number(input);
}
