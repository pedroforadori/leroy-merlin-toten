const commercialUnities = [
  { code: 'CXA', name: 'Caixas', plural: true },
  { code: 'FARDO', name: 'Fardos', plural: true },
  { code: 'FD', name: 'Fardos', plural: true },
  { code: 'FRD', name: 'Fardos', plural: true },
  { code: 'FLS', name: 'Folhas', plural: true },
  { code: 'G', name: 'Gramas', plural: true },
  { code: 'KG', name: 'Quilogramas', plural: true },
  { code: 'L', name: 'Litros', plural: true },
  { code: 'M', name: 'Metros', plural: true },
  { code: 'ML', name: 'Mililitros', plural: true },
  { code: 'MTS', name: 'Metros', plural: true },
  { code: 'PCT', name: 'Pacotes', plural: true },
  { code: 'ROLO', name: 'Rolos', plural: true },
  { code: 'UND', name: 'Unidades', plural: true },

  { code: 'CXA', name: 'Caixa', plural: false },
  { code: 'FARDO', name: 'Fardo', plural: false },
  { code: 'FD', name: 'Fardo', plural: false },
  { code: 'FRD', name: 'Fardo', plural: false },
  { code: 'FLS', name: 'Folha', plural: false },
  { code: 'G', name: 'Grama', plural: false },
  { code: 'KG', name: 'Quilograma', plural: false },
  { code: 'L', name: 'Litro', plural: false },
  { code: 'M', name: 'Metro', plural: false },
  { code: 'ML', name: 'Mililitro', plural: false },
  { code: 'MTS', name: 'Metro', plural: false },
  { code: 'PCT', name: 'Pacote', plural: false },
  { code: 'ROLO', name: 'Rolo', plural: false },
  { code: 'UND', name: 'Unidade', plural: false }
]

export const transcriptUnity = (unity, plural = false) => {
  if (unity) {
    let item = commercialUnities.find(
      comUnity => comUnity.code === unity && comUnity.plural === plural
    )

    if (item) {
      return item.name
    } else {
      return unity
    }
  }
}

export const formatMeasure = ({ measureValue, measureUnity }) => {
  if (!measureValue || !measureUnity) {
    return ''
  } else {
    return measureValue + measureUnity
  }
}

export const isUnd = unity => {
  switch (unity) {
    case 'CXA':
    case 'FARDO':
    case 'FD':
    case 'FRD':
    case 'PCT':
    case 'ROLO':
      return false
    default:
      return true
  }
}
