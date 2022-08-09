import s from './calendar.module.css'
import { useState, useEffect, useCallback, useMemo } from 'react'
import { getMonthLabel } from '../lib/calendarLabels'

export default function Calendar({ props }) {
    const { visitHandler, orderDur, user, bookedOrders, choosenTimeStamp, mockBooked } = props

    const monthLabel = getMonthLabel()

    const currentTime = new Date()
    const [stateTime, setStateTime] = useState(currentTime)

    let curYear = stateTime.getFullYear()
    let curMonth = stateTime.getMonth()
    let curDay = stateTime.getDate()

    const [checkYear, setCheckYear] = useState(stateTime.getFullYear())
    const [checkMonth, setCheckMonths] = useState(stateTime.getMonth())
    const [checkDay, setCheckDay] = useState(stateTime.getDate())
    const [showMore, setShoMore] = useState(0)

    const [checkTime, setCheckTime] = useState('')
    const horizonMonths = monthLabel.length - checkMonth

    const work = {
        startTime: +user?.userData.work_begin * 60 ?? 9 * 60,
        endTime: +user?.userData.work_end * 60 ?? 22 * 60,
        interval: +user?.userData.interval ?? 20,
        except: '',
    }

    function yearHandler(e) {
        e.preventDefault()
        e.target.value === '2023' && setStateTime(new Date(`2023-01-01T09:00:00`))
        e.target.value === '2022' && setStateTime(new Date())
    }

    function monthHandler(e) {
        setCheckMonths(e.target.value)
    }
    function dayHandler(e) {
        setCheckDay(e.target.value)
    }

    const generatedMonths = useMemo(() => genMonths(curMonth, horizonMonths), [curYear])
    function genMonths(month, horizonMonths) {
        let genArr = []
        for (let i = month; i <= month + horizonMonths - 1; i++) {
            genArr.push({ month: monthLabel[i], index: i })
        }
        return genArr
    }

    const generatedDays = useMemo(() => genDays(checkMonth), [checkMonth])

    function genDays(month) {
        let countDays = new Date(checkYear, checkMonth + 1, 0).getDate()
        let genArr = []
        let i = checkMonth == curMonth ? curDay : 1
        for (i; i <= countDays; i++) {
            genArr.push(getFormatedDay(checkYear, month, i))
        }
        return genArr
    }

    const generatedTime = useMemo(
        () => genTime(checkYear, checkMonth, checkDay),
        [checkYear, checkMonth, checkDay]
    )

    function genTime(year, month, day) {
        let genArr = []
        let filtered = []
        let testArray = []
        const filteredBooking = mockBooked.forEach((i) => {
            if (
                +i.visitDateTime.year == +year &&
                +i.visitDateTime.month == +month + 1 &&
                +i.visitDateTime.day == +day
            ) {
                let timeInMinutes = +i.visitDateTime.hour * 60 + +i.visitDateTime.minute
                filtered.push({ time: timeInMinutes, dur: i.visitDur })
            }
        })

        for (let i = work.startTime; i <= work.endTime; i = i + 10) {
            genArr.push({ time: i, free: true })
            testArray.push({ time: i, free: true })
        }
        filtered.forEach((g) => {
            genArr.forEach((i, index) => {
                if (i.time == g.time) {
                    for (
                        let e = 0;
                        e < (+orderDur + work.interval) / 10 + (g.dur + work.interval) / 10;
                        e++
                    ) {
                        genArr[index - (+orderDur + work.interval) / 10 + e].free = false
                    }
                }
            })
        })
        return genArr
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

    const monthStyle = {
        height: '20px',
        borderRadius: '10px',
        padding: '0 5px',
    }
    const dayStyle = {
        height: '40px',
        borderRadius: '10px',
    }
    const timeStyle = {
        fontSize: '13px',
        height: '30px',
        width: '50px',
        borderRadius: '7px',
        padding: '0',
    }

    const formHeight = generatedTime.length * 8
    const displayToggle = { height: showMore ? `${formHeight}px` : '55px', overflowY: 'hidden' }

    function showMoreHandler(e) {
        showMore ? setShoMore(0) : setShoMore(1)
    }
    if (!generatedMonths) return <div>Loading...</div>

    function showMoreHandler(e) {
        showMore ? setShoMore(0) : setShoMore(1)
    }

    return (
        <>
            <form className={s.wrapper_month}>
                <div className={s.years_wrapper}>
                    <button className={s.years} value='2022' onClick={yearHandler}>
                        {2022}
                    </button>
                </div>
                {generatedMonths.map((i) => (
                    <label key={i.index} style={monthStyle} className={s.container_month}>
                        <input
                            value={i.index}
                            name='radio'
                            type='radio'
                            onChange={visitHandler}
                            data-type-index={i}
                            data-type-field='month'
                            onClick={monthHandler}
                        />
                        <span style={monthStyle} className={s.name_month}>
                            {i.month}
                        </span>
                        <span style={monthStyle} className={s.checkmark_month}></span>
                    </label>
                ))}
                <div className={s.years_wrapper}>
                    <button className={s.years} value='2023' onClick={yearHandler}>
                        {curYear + 1}
                    </button>
                </div>
            </form>
            <form className={s.wrapper_day}>
                {generatedDays.map((i, index) => (
                    <div key={index}>
                        <label style={dayStyle} className={s.container_day}>
                            <input
                                name='radio'
                                type='radio'
                                onChange={visitHandler}
                                data-type-index={i.index}
                                data-type-field='day'
                                onClick={() => setCheckDay(i.index)}
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

            <form style={displayToggle} id='time' className={s.wrapper_time}>
                {generatedTime.map((i, index) => (
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
            <button value={showMore} onClick={showMoreHandler} className={s.showmore}>
                {showMore ? 'Показати менше' : 'Показати більше'}
            </button>
        </>
    )
}
