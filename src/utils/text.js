export const truncateText = (text, charLimit) =>
  text && text.length > charLimit ? text.slice(0, charLimit).concat('...') : text

/*eslint no-useless-escape: "off"*/
export const formatCnpj = text => text.replace(/(\d{2})(\d{3})(\d{3})(\d{4})/g, '$1.$2.$3/$4-')

/*eslint no-useless-escape: "off"*/
export const formatPhone = text => text && text.replace(/(\d{2})(\d{4,5})(\d{4})/g, '($1) $2-$3')

/*eslint no-useless-escape: "off"*/
export const formatCep = text => text.replace(/(\d{5})/g, '$1-')

export const extractNumber = text => text.replace(/\D/g, '')

export const formatAddress = address =>
  `${address.publicPlace} - CEP ${address.cep} - ${address.city} - ${address.state}`

// returns text with the first capital letter (all words, works with all caps)
export const textCapitalize = text => {
  if (!text) return ''
  let lower = text.toLowerCase()

  let words = lower.split(' ')

  return words.reduce((prev, w, index, arr) => {
    let word = w.charAt(0).toUpperCase() + w.slice(1)
    if (index < arr.length - 1) {
      word += ' '
    }
    return prev + word
  }, '')
}
