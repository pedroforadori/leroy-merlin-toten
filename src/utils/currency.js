export const currencyDisplay = (value = 0.0, HasPrefix = true) => {
  let settings = {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }

  if (!HasPrefix) delete settings['style']

  return value.toLocaleString('pt-BR', settings)
}
