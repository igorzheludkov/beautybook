import s from '../../styles/admincalendar.module.css'
import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { getMonthLabel } from '../../lib/calendarLabels'
import getFormattedDay from '../../components/utils/getFormattedDay'
import getFormattedTime from '../../components/utils/getFormattedTime'
import { getSession } from 'next-auth/react'
import Head from 'next/head'
import useSWR, { mutate } from 'swr'
import OrderAdd from '../../components/orderadd'
import { useStoreContext } from '../../context/store'

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

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function DayCalendar({ user }) {
  const [store, setStore] = useStoreContext()
  const [uData, setUData] = useState([])
  const { data: bookedOrders } = useSWR(user?.email ? `/api/order?q=${user.email}` : null, fetcher)
  // const { data: uData } = useSWR(user ? `/api/userdata?q=${user.email}` : null, fetcher)
  const { data: uServ } = useSWR(user ? `/api/services/${user.email}` : null, fetcher)
  // const uData = store?.masterInfo ?? null

  useEffect(() => {
    setUData(store.masterInfo)
  }, [store?.masterInfo])

  // uData && console.log(uData);
  const orders = bookedOrders?.orders ?? []
  const monthLabel = getMonthLabel()
  const currentTime = new Date()

  const initialWorkGraphic = { workBegin: 9, workEnd: 18, bookingInterval: 15 }
  const [workGraphic, setWorkGraphic] = useState(initialWorkGraphic)
  const { workBegin, workEnd, bookingInterval } = workGraphic

  useEffect(() => {
    if (uData.userData) {
      setWorkGraphic({
        ...workGraphic,
        workBegin: +uData?.userData?.work_begin,
        workEnd: +uData?.userData?.work_end,
        bookingInterval: +uData?.userData?.interval,
      })
    }
  }, [uData])
  console.log(uData)
  console.log(workGraphic)
  // const workBegin = uData?.userData.work_begin ?? 9
  // const workEnd = uData?.userData.work_end ?? 18
  // const bookingInterval = uData?.userData.interval ?? 15
  const [stateTime, setStateTime] = useState(currentTime)

  const [checkYear, setCheckYear] = useState(stateTime.getFullYear())
  const [checkMonth, setCheckMonths] = useState(stateTime.getMonth())
  const [checkDay, setCheckDay] = useState(stateTime.getDate())

  const currentTimeInMinutes = stateTime.getHours() * 60 + stateTime.getMinutes()
  const formattedTime = getFormattedTime(currentTimeInMinutes)
  const [checkTime, setCheckTime] = useState(formattedTime)

  const [visitDateTime, setVisitDateTime] = useState({
    year: checkYear,
    month: checkMonth,
    day: checkDay,
    hour: '',
    minute: '',
  })

  function currentTimeSet() {
    setStateTime(currentTime)
  }
  useEffect(() => {
    setCheckYear(stateTime.getFullYear())
    setCheckMonths(stateTime.getMonth())
    setCheckDay(stateTime.getDate())
  }, [stateTime])

  const [editOrder, setEditOrder] = useState({})
  function orderEditHandler(e) {
    e.preventDefault(e)
    setEditOrder(...bookedOrders.orders.filter((i) => i._id === e.target.value))
  }

  function cancelOrderHandler(e) {
    e?.preventDefault(e)
    setEditOrder('')
  }
  useEffect(() => {
    setVisitDateTime({
      ...visitDateTime,
      year: checkYear,
      month: checkMonth,
      day: checkDay,
      hour: checkTime.hour,
      minute: checkTime.minute,
    })
  }, [checkYear, checkMonth, checkDay, checkTime])

  async function removeHandler(e) {
    e.preventDefault(e)
    const response = await fetch('/api/booking_api', {
      method: 'DELETE',
      body: JSON.stringify({ _id: e.target.value }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    console.log('Sended')
    console.log(data)
    if (data.result.deletedCount > 0) {
      mutate(`/api/order?q=${user.email}`)
    }
    // if (data.result.deletedCount > 0) return router.push('/user/booking')
    console.log(data.result.deletedCount > 0)
  }

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
    const type = 'short'
    let countDays = new Date(checkYear, checkMonth + 1, 0).getDate()
    let genArr = []
    for (let i = 1; i <= countDays; i++) {
      genArr.push(getFormattedDay(checkYear, month, i, type))
    }
    return genArr
  }

  const generatedTime = useMemo(
    () => generateBaseTime(workBegin, workEnd, bookingInterval),
    [bookedOrders, workGraphic, checkYear, checkMonth, checkDay]
  )

  function generateBaseTime(begin, end, interval) {
    let bufferArr = []
    for (let i = +begin * 60; i <= +end * 60; i = i + +interval) {
      let formattedTime = getFormattedTime(i)
      bufferArr.push({
        time: i,
        free: true,
        hours: formattedTime.hour,
        minutes: formattedTime.minute,
        order: '',
      })
    }
    return bufferArr
  }

  const notFreeTime = useMemo(
    () => bookedTime(checkYear, checkMonth, checkDay, orders),
    [bookedOrders, workGraphic, checkYear, checkMonth, checkDay]
  )

  function bookedTime(year, month, day, orders) {
    let filteredTime = []
    orders.forEach((i) => {
      if (
        +i?.visitDateTime?.year == +year &&
        +i?.visitDateTime?.month == +month &&
        +i?.visitDateTime?.day == +day
      ) {
        let orderTimeInMinutes = +i.visitDateTime.hour * 60 + +i.visitDateTime.minute
        filteredTime.push({ ...i, time: orderTimeInMinutes, visitDur: +i.visitDur })
      }
    })
    return filteredTime
  }
  const getRenderedTime = useMemo(
    () => renderTime(generatedTime, notFreeTime),
    [bookedOrders, workGraphic, checkYear, checkMonth, checkDay]
  )

  function renderTime(gTime, nfTime) {
    let baseTime = gTime
    let baseOrders = nfTime

    baseOrders.forEach((bo, index) => {
      baseTime.forEach((bt) => {
        if (bt.time >= bo.time && bt.time <= bo.time + bo.visitDur) {
          bt.free = index
        }
        if (bt.time === bo.time) {
          bt.order = bo
        }
      })
    })
    return baseTime
  }

  const monthStyle = {
    minWidth: 70,
    height: 25,
    borderRadius: 20,
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
    setTimeout(() => {
      scrollMonth.current.scrollTo({ left: checkMonth * monthStyle.minWidth + 40, behavior: 'smooth' })
      scrollDay.current.scrollTo({ left: checkDay * 49 - 98, behavior: 'smooth' })
    }, 100)
  }, [checkDay])

  useEffect(() => {
    if (stateTime.getDate() === checkDay) {
      window.scrollTo({
        top: Math.round(((currentTimeInMinutes - workBegin * 60) / 15) * 24 - 24),
        behavior: 'smooth',
      })
    } else {
      console.log('another day')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [checkDay])

  return (
    <>
      <Head>
        <title>Day Calendar</title>
      </Head>
      <div className={s.calendar_wrapper}>
        <div className={s.monthDay}>
          <form className={s.wrapper_month} ref={scrollMonth}>
            {generatedMonths.map((i) => (
              <label key={i.index} style={monthStyle} className={s.container_month}>
                <input
                  value={i.index}
                  name='radio'
                  type='radio'
                  checked={i.index === checkMonth}
                  // defaultChecked={i.index === checkMonth}
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
                    checked={i.index === checkDay}
                    // defaultChecked={i.index === checkDay}
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
        </div>
        <form id='time' className={s.wrapper_time}>
          {getRenderedTime.map((i, index) => (
            <div className={s.time_slot} key={index}>
              <label className={s.container_time}>
                <input
                  name='radio'
                  type='radio'
                  onClick={() => setCheckTime({ hour: i.hours, minute: i.minutes })}
                  // value={}
                  // onChange={visitHandler}
                  data-type-index={i.hours}
                  data-type-field='hour'
                  data-type-indexminutes={i.minutes}
                  data-type-fieldminutes='minute'
                />
                <span className={s.name_time}>{i.minutes ? i.hours + ':' + i.minutes : i.hours}</span>
                <span className={s.checkmark_time}></span>
              </label>
              {i.order && (
                <>
                  <div
                    className={s.order_card}
                    style={{ height: `${(i.order.visitDur / 15 + 1) * 24 - 2}px` }}
                  >
                    <div
                      className={s.color_identificator}
                      style={{
                        backgroundColor: `${colorPalette[i.free]}`,
                        height: `${(i.order.visitDur / 15 + 1) * 24 - 2}px`,
                      }}
                    ></div>
                    <div>{i.order.clientName}</div>
                    <div>{i.order.clientPhone}</div>
                    <div></div>
                    <div>
                      {i.order.item_1.name}, {i.order.visitDur} хв
                    </div>
                    <div className={s.edit_buttons}>
                      <button onClick={removeHandler} value={i.order._id} className={s.remove_btn}>
                        Видал.
                      </button>
                      <button onClick={orderEditHandler} value={i.order._id} className={s.shift_btn}>
                        Змінити
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </form>
        {uData.userData && uServ && (
          <OrderAdd
            visitTime={visitDateTime}
            user={uData}
            serv={uServ}
            client={''}
            editOrder={editOrder}
            cancelOrderHandler={cancelOrderHandler}
            bookedOrders={bookedOrders}
          />
        )}
      </div>

      <button
        className={s.today}
        onClick={() => {
          currentTimeSet()
        }}
      >
        Сьогодні
      </button>
    </>
  )
}
