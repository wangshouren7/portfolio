export function shortenFloat(value: number, precision = 3) {
  const shortenedValue = Math.round(value * 10 ** precision) / 10 ** precision;

  if (value > 0 && shortenedValue === 0) {
    return 0.1 / 10 ** (precision - 1);
  }

  return shortenedValue;
}
