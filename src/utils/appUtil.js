export const awaitTimeout = (delay) =>
  new Promise((resolve) => setTimeout(resolve, delay));
