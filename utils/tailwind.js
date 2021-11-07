export function tailwind(classes, ...args) {
  const staticClassesArray = classes[0]
    .replace(/(\r\n|\n|\r)/gm, "")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ");

  for (const fn of args) {
    const result = typeof fn === "function" ? fn() : fn;
    staticClassesArray.push(result);
  }

  return staticClassesArray.join(" ");
}
