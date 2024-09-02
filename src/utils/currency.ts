export const convertAmountToToken = (amount: number) =>
  Math.floor(amount * 10 ** 18);

export const convertTokenToAmount = (amount: number) => amount / 10 ** 18;
