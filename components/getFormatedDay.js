export default function GetFormatedDay(year, month, day) {
 const date = new Date()
    date.setMonth(+month)
    date.setFullYear(+year)
    date.setDate(+day)
    const options = { weekday: 'long' }
    const dayLong = new Intl.DateTimeFormat('uk-UA', options).format(date)
    const optionsNum = { day: 'numeric', month: 'numeric' }
    const dayNum = new Intl.DateTimeFormat('uk-UA', optionsNum).format(date)
    return { weekday: dayLong, number: dayNum, index: date.getDate(), year: date.getFullYear() }
} 

