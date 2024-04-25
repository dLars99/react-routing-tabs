export const generateStableId = (): string =>
  Math.random().toString(20).substring(2, 10);
