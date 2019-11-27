export const currencyDisplay = (value = 0.0, HasPrefix = true) => {
  let settings = { style: "currency", currency: "BRL" };

  if (!HasPrefix) delete settings["style"];

   return value.toLocaleString("pt-BR", settings);
};
