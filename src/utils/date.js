import IMask from 'imask'
import moment from 'moment'
import 'moment/locale/pt-br'

export const getFullDateLocal = date => moment(date).format()

export const getFullDateUtc = date =>
  moment(date)
    .utc()
    .format()

export const getDateLocal = (date, isFullYear) =>
  moment(date).format(`DD/MM/YY${isFullYear ? 'YY' : ''}`)

export const getDateUtc = (date, isFullYear) =>
  moment(date)
    .utc()
    .format(`DD/MM/YY${isFullYear ? 'YY' : ''}`)

export const getTimeLocal = date => moment(date).format('HH:mm')

export const getTimeUtc = date =>
  moment(date)
    .utc()
    .format('HH:mm')

export const getDayLocal = date => moment(date).format('DD')

export const getDayUtc = date =>
  moment(date)
    .utc()
    .format('DD')

export const getWeekDayUtc = date =>
  moment(date)
    .utc()
    .format('dddd')

export const getMonthLocal = date => moment(date).format('MMM')

export const getMonthUtc = date =>
  moment(date)
    .utc()
    .format('MMM')

export const getStartOfMonthUtc = (date, isFullYear) =>
  moment(date)
    .utc()
    .startOf('month')
    .format(`DD/MM/YY${isFullYear ? 'YY' : ''}`)

export const months = [
  'JAN',
  'FEV',
  'MAR',
  'ABR',
  'MAI',
  'JUN',
  'JUL',
  'AGO',
  'SET',
  'OUT',
  'NOV',
  'DEZ'
]

export const getDayNumber = dateString => {
  try {
    if (typeof dateString === 'string') {
      let date = new Date(dateString)
      return date.getDate()
    } else {
      return dateString.getDate()
    }
  } catch (error) {
    return ''
  }
}

export const getMonthString = dateString => {
  try {
    if (typeof dateString === 'string') {
      let date = new Date(dateString)
      return months[date.getMonth()]
    } else {
      return months[dateString.getMonth()]
    }
  } catch (error) {
    return ''
  }
}

export const maskDate = element => {
  let momentFormat = 'YYYY/MM/DD HH:mm'

  let momentMask = IMask(element, {
    mask: Date,
    pattern: momentFormat,
    lazy: false,
    min: new Date(1970, 0, 1),
    max: new Date(2030, 0, 1),
    format: function(date) {
      return moment(date).format(momentFormat)
    },
    parse: function(str) {
      return moment(str, momentFormat)
    },
    blocks: {
      YYYY: {
        mask: IMask.MaskedRange,
        from: 1970,
        to: 2030
      },
      MM: {
        mask: IMask.MaskedRange,
        from: 1,
        to: 12
      },
      DD: {
        mask: IMask.MaskedRange,
        from: 1,
        to: 31
      },
      HH: {
        mask: IMask.MaskedRange,
        from: 0,
        to: 23
      },
      mm: {
        mask: IMask.MaskedRange,
        from: 0,
        to: 59
      }
    }
  })

  return momentMask
}

export const getHours = dateString => {
  try {
    if (typeof dateString === 'string') {
      let date = new Date(dateString)
      let hours = date.getUTCHours().toString()
      return hours.length === 1 ? '0' + hours : hours
    } else {
      let hours = dateString.getUTCHours().toString()
      return hours.length === 1 ? '0' + hours : hours
    }
  } catch (error) {
    return ''
  }
}

export const getMinutes = dateString => {
  try {
    if (typeof dateString === 'string') {
      let date = new Date(dateString)
      let minutes = date.getMinutes().toString()
      return minutes.length === 1 ? '0' + minutes : minutes
    } else {
      let minutes = dateString.getMinutes().toString()
      return minutes.getMinutes().length === 1 ? '0' + minutes.getMinutes() : minutes.getMinutes()
    }
  } catch (error) {
    return ''
  }
}

export const formatDate = dateString => {
  try {
    if (typeof dateString === 'string') {
      let date = new Date(dateString)
      return date.toLocaleDateString('pt-br', { timeZone: 'UTC' })
    } else {
      return dateString.toLocaleDateString('pt-br', { timeZone: 'UTC' })
    }
  } catch (error) {
    return ''
  }
}

export const formatDateTime = dateString => {
  try {
    if (typeof dateString === 'string') {
      let date = new Date(dateString)
      return `${date.toLocaleDateString('pt-br', { timeZone: 'UTC' })} ${date.toLocaleTimeString(
        'pt-br',
        { timeZone: 'UTC' }
      )}`
    } else {
      return `${dateString.toLocaleDateString('pt-br', {
        timeZone: 'UTC'
      })} ${dateString.toLocaleTimeString('pt-br', { timeZone: 'UTC' })}`
    }
  } catch (error) {
    return ''
  }
}
