/**
 * @param {string} json
 * @param {any | undefined} fallback
 * @returns Object
 */
const safeParseJSON = (json, fallback) => {
  try {
    return JSON.parse(json);
  } catch {
    return fallback || null;
  }
};

export default safeParseJSON;
