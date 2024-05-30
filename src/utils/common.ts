/**
 * A function that parses a json string safely without throwing any errors,
 * it simply returns a null value if it was an invalid json.
 * @param json The json string to be parsed
 * @returns The parsed json object if it was valid or null if invalid.
 */
export const safelyParseJSON = <T = unknown>(json: string): T | null => {
  let result = null;
  try {
    result = JSON.parse(json);
  } catch {
    // do nothing
  }
  return result;
};
