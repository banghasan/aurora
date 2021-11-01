export const dropProtocol = (url) =>
  url.replace(/(^\w+:|^)\/\//, "").replace("www.", "");
