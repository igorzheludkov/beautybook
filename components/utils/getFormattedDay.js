export default function getFormattedDay(year, month, day, type) {
  // type param defines weekday and can be 'short' or 'long'
  const date = new Date()
  date.setMonth(month)
  date.setFullYear(year)
  date.setDate(day)
  const options = { weekday: type }
  const dayLong = new Intl.DateTimeFormat('uk-UA', options).format(date)
  const optionsNum = { day: 'numeric', month: 'numeric' }
  const dayNum = new Intl.DateTimeFormat('uk-UA', optionsNum).format(date)
  return { weekday: dayLong, number: dayNum, index: date.getDate(), year: date.getFullYear() }
}
