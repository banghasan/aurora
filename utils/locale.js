const localeCodes = require("locale-codes");

export const tag = (language) => {
  return localeCodes.getByTag(language);
};
