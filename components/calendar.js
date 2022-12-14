import s from './calendar.module.css'
import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { getMonthLabel } from '../lib/calendarLabels'
import getFormattedDay from './utils/getFormattedDay'
export default function Calendar({ props }) {
  const { visitHandler, user, bookedOrders, item } = props
  const monthLabel = getMonthLabel()

  const currentTime = new Date()
  const [stateTime, setStateTime] = useState(currentTime)
  const [yearState, setYearState] = useState(currentTime.getFullYear())
  let curYear = stateTime.getFullYear()
  let curMonth = 1+stateTime.getMonth()
  let curDay = stateTime.getDate()

  const [checkYear, setCheckYear] = useState(stateTime.getFullYear())
  const [checkMonth, setCheckMonths] = useState(curMonth)
  const [checkDay, setCheckDay] = useState(stateTime.getDate())
  const horizonMonths = (horizon) => {
    if (curYear == checkYear) {
      return horizon !== 12 ? horizon + 1 : 12 - +curMonth
    } else {
      return horizon !== 12 ? horizon + 1 : 12
    }
  }

  const work = {
    startTime: +user?.userData.work_begin * 60 ?? 9 * 60,
    endTime: +user?.userData.work_end * 60 ?? 20 * 60,
    interval: +user?.userData.interval ?? 15,
    except: '',
  }
  const [renderTime, setRenderTime] = useState([])

  function yearHandler(e) {
    e.preventDefault()
    e.target.value === '1'
      ? setYearState(yearState + 1)
      : yearState > currentTime.getFullYear()
      ? setYearState(yearState - 1)
      : setYearState(currentTime.getFullYear())
  }

  useEffect(() => {
    if (yearState === currentTime.getFullYear()) {
      setStateTime(new Date())
    } else {
      setStateTime(new Date(`${yearState}-01-01T00:00:00`))
    }
  }, [yearState])

  function monthHandler(e) {
    setCheckMonths(+e.target.value)
  }
  function dayHandler(e) {
    setCheckDay(() => e.target.value)
    setShowMore({ ...showMore, day: 0 })
  }

  useEffect(() => {
    setRenderTime(() => generatedClassicTime(timeTransform()))
  }, [checkDay, bookedOrders])

  const generatedMonths = useMemo(
    () => genMonths(curMonth, horizonMonths(+user?.userData.horizon)),
    [curYear]
  )
  function genMonths(month, horizonMonths) {
    let genMonths = []
    for (let i = month-1; i <= month + horizonMonths - 1; i++) {
      genMonths.push({ month: monthLabel[i], index: i+1 })
    }
    return genMonths
  }
  const generatedDays = useMemo(() => genDays(checkMonth, checkYear), [checkMonth, checkDay])
  function genDays(month, year) {
    let countDays = new Date(year, +month, 0).getDate()
    let genArr = []
    // let i = 1
    let i = month == curMonth ? curDay : 1
    for (i; i <= countDays; i++) {
      genArr.push(getFormattedDay(year, +month, i, 'short'))
    }
    return genArr
  }


  function filteredOrders() {
    let testArr = []
    let arr = bookedOrders.orders.forEach((i) => {
      if (
        +i.visitDateTime.year == +checkYear &&
        +i.visitDateTime.month == +checkMonth &&
        +i.visitDateTime.day == +checkDay
      ) {
        let timeInMinutes = +i.visitDateTime.hour * 60 + +i.visitDateTime.minute
        let add = 0
        for (let rem = 0; rem < (+work.interval + +i.visitDur) / 15; rem++) {
          testArr.push({ time: timeInMinutes + add, free: false })
          add = add + 15
        }
        let sub = 0
        for (let rem = 0; rem < (+i.visitDur ?? 40) / 15; rem++) {
          testArr.push({ time: timeInMinutes - sub, free: false })
          sub = sub + 15
        }
      }
    })
    return testArr
  }

  function generateBaseTime() {
    let bufferArr = []
    if (checkDay == curDay) {
      for (
        let i = currentTime.getHours() * 60 + Math.round(currentTime.getMinutes() / 15) * 15;
        i <= work.endTime;
        i = i + 15
      ) {
        bufferArr.push({ time: i, free: true })
      }
    } else {
      for (let i = work.startTime; i <= work.endTime; i = i + 15) {
        bufferArr.push({ time: i, free: true })
      }
    }
    return bufferArr
  }

  function timeTransform() {
    let transform = generateBaseTime()
    let source = filteredOrders()

    source.forEach((g) => {
      transform.forEach((i) => {
        if (i.time === g.time) {
          i.free = false
        }
      })
    })
    let ex = transform.filter((el) => !(el.time % work.interval) && el.free === true)
    return ex
  }

  function generatedClassicTime(timeInMinutes) {
    let classicTime = []
    const convert = timeInMinutes.forEach((i) => {
      classicTime.push(timeConvert(i.time))
    })
    return classicTime
  }

  function getFormatedDay(year, month, day) {
    const date = new Date()
    date.setMonth(month)
    date.setFullYear(year)
    date.setDate(day)
    const options = { weekday: 'long' }
    const dayLong = new Intl.DateTimeFormat('uk-UA', options).format(date)
    const optionsNum = { day: 'numeric', month: 'numeric' }
    const dayNum = new Intl.DateTimeFormat('uk-UA', optionsNum).format(date)
    return { weekday: dayLong, number: dayNum, index: date.getDate() }
  }

  function timeConvert(n) {
    let num = n
    const hours = num / 60
    const rhours = Math.floor(hours)
    const minutes = (hours - rhours) * 60
    const rminutes = Math.round(minutes)

    return rminutes > 0 ? { hours: rhours, minutes: rminutes } : { hours: rhours, minutes: 0 }
  }

  const [showMore, setShowMore] = useState({ month: 0, day: 0, time: 0 })

  function showMoreHandler(e) {
    e.preventDefault(e)
    setShowMore({ ...showMore, [e.target.value]: showMore[e.target.value] === 0 ? 1 : 0 })
  }

  const monthStyle = {
    height: '25px',
    borderRadius: '20px',
    padding: '0 5px',
  }
  const dayStyle = {
    height: '40px',
    borderRadius: '10px',
  }
  const timeStyle = {
    fontSize: '14px',
    height: '40px',
    width: '50px',
    borderRadius: '7px',
    padding: '0',
  }
  return (
    <>
      <form className={s.wrapper_month}>
        <div className={s.years_wrapper}></div>
        {generatedMonths.map((i) => (
          <label key={i.index} style={monthStyle} className={s.container_month}>
            <input
              value={i.index}
              name='radio'
              type='radio'
              onChange={visitHandler}
              data-type-index={i.index}
              data-type-field='month'
              onClick={monthHandler}
            />
            <span style={monthStyle} className={s.name_month}>
              {i.month}
            </span>
            <span style={monthStyle} className={s.checkmark_month}></span>
          </label>
        ))}
        {user?.userData.horizon == 12 ||
          (12 - curMonth <= user?.userData.horizon && (
            <div className={s.years_wrapper}>
              <button className={s.years} value='0' onClick={yearHandler}>
                {'-'}
              </button>
              {yearState}
              <button className={s.years} value='1' onClick={yearHandler}>
                {'+'}
              </button>
            </div>
          ))} 
      </form>
      <form className={s.wrapper_day} style={showMore.day ? { flexWrap: 'wrap' } : {}}>
        {generatedDays.length >= 6 && (
          <button value='day' onClick={showMoreHandler} className={s.showmore_button}>
            {showMore.day ? '?????????????????? ??????' : '???????????????? ?????? ??????'}
          </button>
        )}

        {generatedDays.map((i, index) => (
          <div key={index}>
            <label style={dayStyle} className={s.container_day}>
              <input
                value={i.index}
                name='radio'
                type='radio'
                onChange={visitHandler}
                data-type-index={i.index}
                data-type-field='day'
                onClick={dayHandler}
              />
              <span style={dayStyle} className={s.name_day}>
                <div className={s.weekday_num}>{i.number}</div>
                <div className={s.weekday}>{i.weekday} </div>
              </span>
              <span style={dayStyle} className={s.checkmark_day}></span>
            </label>
          </div>
        ))}
      </form>

      <form id='time' className={s.wrapper_time} style={showMore.day ? { flexWrap: 'wrap' } : {}}>
        {renderTime.map((i, index) => (
          <div key={index}>
            <label style={timeStyle} className={s.container_time}>
              <input
                name='radio'
                type='radio'
                // value={}
                onChange={visitHandler}
                data-type-index={i.hours}
                data-type-field='hour'
                data-type-indexminutes={i.minutes}
                data-type-fieldminutes='minute'
              />
              <span style={timeStyle} className={s.name_time}>
                {i.free ? i.time : null}
                {i.minutes ? i.hours + ':' + i.minutes : i.hours}
              </span>
              <span style={timeStyle} className={s.checkmark_time}></span>
            </label>
          </div>
        ))}
      </form>
    </>
  )
}
