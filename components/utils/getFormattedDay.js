export default function getFormattedDay(year, month, day, type) {
  // console.log('getFormattedDay', year, month, day, type)
  // type param defines weekday and can be 'short' or 'long'
  const date = new Date()
  date.setFullYear(year)
  date.setMonth(month-1, 1)
  date.setDate(day)
  // console.log(date);
  const options = { weekday: type }
  const dayLong = new Intl.DateTimeFormat('uk-UA', options).format(date)
  const optionsNum = { day: 'numeric', month: 'numeric' }
  const dayNum = new Intl.DateTimeFormat('uk-UA', optionsNum).format(date)
  const optionsMonth = { day: 'numeric', month: 'long' }
  const monthNum = new Intl.DateTimeFormat('uk-UA', optionsMonth).format(date)
  // console.log(dayNum);
  return {
    weekday: dayLong,
    number: dayNum,
    index: date.getDate(),
    year: date.getFullYear(),
    month: monthNum,
  }
}
