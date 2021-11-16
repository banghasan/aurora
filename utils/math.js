export const percentage = (n, t) => (n / t) * 100;

export const sum = (args = []) => args.reduce((acc, el) => acc + el, 0);

export const formatter = (number) => {
  if (typeof number === "string") {
    number = Number(number);
  }

  if (number < 1000) {
    return number;
  }

  if (number < 1000000) {
    return `${(number / 1000).toFixed(1)}k`;
  }

  if (number < 1000000000) {
    return `${(number / 1000000).toFixed(1)}M`;
  }

  return `${(number / 1000000000).toFixed(1)}B`;
};
