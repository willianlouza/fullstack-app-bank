export const currencyMask = (value: string) => {
  value = value.replace(".", "").replace(",", "").replace(/\D/g, "");

  const result = new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 2 }).format(parseFloat(value) / 100);

  return "R$ " + result;
};
