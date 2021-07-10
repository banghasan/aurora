const path = require("path");

module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "it"],
  },
  localePath: path.resolve("./public/static/locales/"),
};
