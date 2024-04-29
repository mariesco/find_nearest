/**
 * Extracts a number following a '+' sign in a string.
 * @param input The string containing the number to extract.
 * @returns The extracted number as an integer, or null if no number is found.
 */
export default function extractNumberAfterPlus(input: string): number | null {
  const result = input.match(/\+(\d+)/);
  if (result && result[1]) {
    return parseInt(result[1], 10);
  } else {
    return null;
  }
}

