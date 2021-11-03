const UAParser = require("ua-parser-js");

export const parse = (ua) => {
  const elements = [];
  const parsed = new UAParser(ua).getResult();

  const device = parsed.device.type ? parsed.device.type : "desktop";

  if (parsed.browser && parsed.browser.name && parsed.browser.version) {
    elements.push({
      type: "browser",
      value: parsed.browser.name,
      version: parsed.browser.version,
    });
  }

  if (parsed.os && parsed.os.name && parsed.os.version) {
    elements.push({
      type: "os",
      value: parsed.os.name,
      version: parsed.os.version,
    });
  }

  if (parsed.engine && parsed.engine.name && parsed.engine.version) {
    elements.push({
      type: "engine",
      value: parsed.engine.name,
      version: parsed.engine.version,
    });
  }

  return {
    device: device,
    elements: elements,
  };
};
