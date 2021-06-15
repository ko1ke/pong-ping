export const randRange = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const randPick = <T>(array: T[]): T =>
  array[Math.floor(Math.random() * array.length)];
