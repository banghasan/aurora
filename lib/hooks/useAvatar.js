import { toSvg } from "jdenticon";

export function useAvatar(uuid, size = 100) {
  const svg = toSvg(uuid, size);
  const base64 = Buffer.from(svg, "utf8").toString("base64");
  return `data:image/svg+xml;base64,${base64}`;
}
