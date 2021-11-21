export const dropProtocol = (url) => {
  return url
    .replace(/(^\w+:|^)\/\//, "")
    .replace(/\/$/, "")
    .replace("www.", "");
};
