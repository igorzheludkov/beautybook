import s from '../../styles/admincalendar.module.css'
import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { getMonthLabel } from '../../lib/calendarLabels'
import getFormattedDay from '../../components/utils/getFormattedDay'
import getFormattedTime from '../../components/utils/getFormattedTime'
import { getSession } from 'next-auth/react'
import Head from 'next/head'
import MasterNav from '../../components/masternav'
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function DayCalendar({ user }) {
  const { data: bookedOrders } = useSWR(user.email ? `/api/bookedtime?q=${user.email}` : null, fetcher)
  const orders = bookedOrders?.orders ?? []
  console.log(orders)
  const monthLabel = getMonthLabel()
  const currentTime = new Date()
  const bookingInterval = 10
  const [stateTime, setStateTime] = useState(currentTime)

  const [checkYear, setCheckYear] = useState(stateTime.getFullYear())
  const [checkMonth, setCheckMonths] = useState(stateTime.getMonth())
  const [checkDay, setCheckDay] = useState(stateTime.getDate())
  const [checkTime, setCheckTime] = useState()

  console.log(checkYear, checkMonth, checkDay)

  function yearHandler(e) {
    e.preventDefault()
    e.target.value === '1' ? setCheckYear(checkYear + 1) : setCheckYear(checkYear - 1)
  }

  const generatedMonths = useMemo(() => genMonths(), [])
  function genMonths() {
    let genArr = []
    for (let i = 0; i <= 11; i++) {
      genArr.push({ month: monthLabel[i], index: i })
    }
    return genArr
  }

  const generatedDays = useMemo(() => genDays(checkMonth), [checkMonth, checkDay])

  function genDays(month) {
    let countDays = new Date(checkYear, checkMonth + 1, 0).getDate()
    let genArr = []
    for (let i = 1; i <= countDays; i++) {
      genArr.push(getFormattedDay(checkYear, month, i))
    }
    return genArr
  }

  const generatedTime = useMemo(() => generateBaseTime(600, 1200, bookingInterval), [checkDay])

  function generateBaseTime(begin, end, interval) {
    let bufferArr = []
    for (let i = begin; i <= end; i = i + interval) {
      let formattedTime = getFormattedTime(i)
      bufferArr.push({ time: i, free: true, hours: formattedTime.hours, minutes: formattedTime.minutes })
    }

    return bufferArr
  }

  const notFreeTime = useMemo(() => bookedTime(checkYear, checkMonth, checkDay, orders), [checkDay])

  function bookedTime(year, month, day, orders) {
    let filteredTime = []
    orders.forEach((i) => {
      if (
        +i.visitDateTime.year == +year &&
        +i.visitDateTime.month == +month &&
        +i.visitDateTime.day == +day
      ) {
        let orderTimeInMinutes = +i.visitDateTime.hour * 60 + +i.visitDateTime.minute
        filteredTime.push({ time: orderTimeInMinutes, dur: +i.visitDur })
      }
    })
    return filteredTime
  }
  const getRenderedTime = useMemo(() => renderTime(generatedTime, notFreeTime), [checkDay])

  function renderTime(gTime, nfTime) {
    let baseTime = gTime
    let baseOrders = nfTime

    baseOrders.forEach((bo, index) => {
      baseTime.forEach((bt) => {
        if (bt.time >= bo.time && bt.time <= bo.time + bo.dur) {
          bt.free = index
        }
      })
    })
    return baseTime
  }

  console.log(notFreeTime)
  console.log(getRenderedTime)

  const monthStyle = {
    minWidth: 70,
    height: 25,
    borderRadius: 20,
    // padding: '0 5px',
  }
  const dayStyle = {
    height: '40px',
    borderRadius: '10px',
  }
  const timeStyle = {
    backgroundColor: '#ece226',
    borderRadius: '7px',
  }

  const colorPalette = ['#FFFAC8', '#DCFAC8', '#B1F0E5', '#A7D5FF', '#E3CDFF', '#B9CBBF', '#FFECE4']

  const scrollMonth = useRef(null)
  const scrollDay = useRef(null)

  useEffect(() => {
    scrollMonth.current.scrollLeft = checkMonth * monthStyle.minWidth + 40
    scrollDay.current.scrollLeft = checkDay * 106 - 106
  }, [])

  return (
    <>
      <Head>
        <title>Day Calendar</title>
      </Head>
      <MasterNav />
      <form className={s.wrapper_month} ref={scrollMonth}>
        {generatedMonths.map((i) => (
          <label key={i.index} style={monthStyle} className={s.container_month}>
            <input
              value={i.index}
              name='radio'
              type='radio'
              defaultChecked={i.index === checkMonth}
              onChange={() => setCheckMonths(i.index)}
              data-type-index={i.index}
              data-type-field='month'
              //   onClick={monthHandler}
            />
            <span style={monthStyle} className={s.name_month}>
              {i.month}
            </span>
            <span style={monthStyle} className={s.checkmark_month}></span>
          </label>
        ))}
        <div className={s.years_wrapper}>
          <button className={s.years} value='0' onClick={yearHandler}>
            {'-'}
          </button>
          {checkYear}
          <button className={s.years} value='1' onClick={yearHandler}>
            {'+'}
          </button>
        </div>
      </form>
      <form className={s.wrapper_day} ref={scrollDay}>
        {generatedDays.map((i, index) => (
          <div key={index}>
            <label style={dayStyle} className={s.container_day}>
              <input
                value={i.index}
                name='radio'
                type='radio'
                defaultChecked={i.index === checkDay}
                onChange={() => setCheckDay(i.index)}
                data-type-index={i.index}
                data-type-field='day'
              />
              <span style={dayStyle} className={s.name_day}>
                <div className={s.weekday}>{i.weekday} </div>
                <div className={s.weekday_num}>{i.number}</div>
              </span>
              <span style={dayStyle} className={s.checkmark_day}></span>
            </label>
          </div>
        ))}
      </form>
      <form id='time' className={s.wrapper_time}>
        {generatedTime.map((i, index) => (
          <div key={index}>
            <label className={s.container_time}>
              <input
                name='radio'
                type='radio'
                // value={}
                // onChange={visitHandler}
                data-type-index={i.hours}
                data-type-field='hour'
                data-type-indexminutes={i.minutes}
                data-type-fieldminutes='minute'
              />
              <span
                style={notFreeTime.length > 0 ? {borderRadius: '7px',  backgroundColor: `${colorPalette[i.free]}` } : {}}
                className={s.name_time}
              >
                {i.minutes ? i.hours + ':' + i.minutes : i.hours}
              </span>
              <span className={s.checkmark_time}></span>
            </label>
          </div>
        ))}
      </form>
    </>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  if (!session) {
    context.res.writeHead(302, { Location: '/login' })
    context.res.end()
    return {}
  }

  return {
    props: {
      user: session.user,
    },
  }
}
