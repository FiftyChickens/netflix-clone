export const smallestDivisor = (n: number): number => {
  if (n <= 1) return 1;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return i;
  }
  return 1;
};
