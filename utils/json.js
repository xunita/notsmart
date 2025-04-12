/**
 * Dynamically loads a language JSON file based on the provided language code.
 *
 * @async
 * @function loadLang
 * @param {string} lang - The language code (e.g., "en" for English, "fr" for French).
 * @returns {Promise<Object>} A promise that resolves to the language JSON object.
 * If the specified language is not found, it defaults to English.
 */
export const loadLang = async (lang) => {
  const files = {
    en: () => import("@/i18n/locales/en.json"),
    fr: () => import("@/i18n/locales/fr.json"),
  };

  if (files[lang]) {
    return (await files[lang]()).default; // Ensure `.default` is used
  }
  return (await files.en()).default;
};

/**
 * Transforms a JSON object by replacing nested objects containing a `loc.source` property
 * with the value of the `source` property. If the input is not an object, an empty object
 * is returned.
 *
 * @param {Object} [json={}] - The input JSON object to be transformed.
 * @returns {Object} - The transformed JSON object with `loc.source` values extracted.
 */
export const normalJson = (json = {}) => {
  if (typeof json !== "object") return {};
  for (const key in json) {
    if (
      Object.hasOwn(json[key], "loc") &&
      Object.hasOwn(json[key].loc, "source")
    ) {
      json[key] = json[key].loc.source;
    }
  }
  return json;
};
