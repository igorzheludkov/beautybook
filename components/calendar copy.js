import s from './calendar.module.css'
import { useState, useEffect, useCallback, useMemo } from 'react'

let count = 0

export default function Calendar({ props }) {
    count++
    console.log('renders', count)
    const currentTime = new Date()
    const currentTimeInMinutes = currentTime.getHours() * 60 + currentTime.getMinutes()
    const { visitHandler, orderDur, user, booking } = props
    
    if (!user) return <div>Loading...</div>
    
    const [day, setDay] = useState(currentTime.getDate())
    const [month, setDate] = useState(currentTime.getMonth() + 1)
    const [showMore, setShoMore] = useState(0)
    const [genTime, setGenTime] = useState([])
    const memoizedDay = useMemo(() => generateDaysHandler(2022, 7, 6), [day]);
    useEffect(() => {
        setGenTime(memoizedDay)
    }, [])

    console.log(memoizedDay)

    const bookedTime = booking.orders.map((i) => ({
        year: new Date(i.visitDateTime).getFullYear(),
        month: new Date(i.visitDateTime).getMonth(),
        date: new Date(i.visitDateTime).getDate(),
        hour: new Date(i.visitDateTime).getHours(),
        minute: new Date(i.visitDateTime).getMinutes(),
        visitDur: i.visitDur,
    }))

    if (!user) return <div>Loading...</div>

    const work = {
        startTime: +user.userData.work_begin * 60 ?? 9 * 60,
        endTime: +user.userData.work_end * 60 ?? 18 * 60,
        interval: +user.userData.interval ?? 20,
        except: '',
    }
    if (!work) return <div>Loading...</div>

    const getRoundedInterval = (currentTimeInMinutes) => {
        return currentTimeInMinutes + work.interval - (currentTimeInMinutes % work.interval)
    }
    const generateDays = []

    let generatedMonths = []
    let generatedDays = []
    let generatedTime = []


    function generateDaysHandler (year, month, date) {
        let generatedTime = []
        const dayTime = new Date()
        const yearMod = year ?? dayTime.getFullYear()
        const monthMod = month ?? dayTime.getMonth()
        const dateMod = date ?? dayTime.getDate()

        let checkDay = bookedTime?.filter(
            (i) => i.year === yearMod && i.month == monthMod && i.date == dateMod
        )

        let genTimeBooking = [
            { time: 750, dur: 40 },
            { time: 750, dur: 40 },
            { time: 930, dur: 40 },
        ]
        let testArray = []

        // let bookedTimeInMinutes = checkDay.forEach((i) => {
        //     genTimeBooking.push({ time: i.hour * 60 + i.minute, dur: i.visitDur })
        // })

        for (let i = work?.startTime; i <= work?.endTime; i = i + 10) {
            generatedTime.push({ time: i, free: true })
            testArray.push({ time: i, free: true })
        }
        genTimeBooking.forEach((g) => {
            testArray.forEach((i, index) => {
                if (i.time === g.time) {
                    console.log(g.dur / 10 + 1)
                    for (
                        let e = 0;
                        e < (+orderDur + work?.interval) / 10 + (g.dur + work?.interval) / 10;
                        e++
                    ) {
                        testArray[index - (+orderDur + work?.interval) / 10 + e].free = false
                    }
                }
            })
        })

        console.log('render')

        // console.log('generatedTime', generatedTime)
        // console.log('genTimeBooking', genTimeBooking)
        console.log('TA', testArray)

        return testArray
    }

    // if (
    //     currentTimeInMinutes < work.startTime ||
    //     currentTimeInMinutes > work.endTime ||
    //     +currentTime.getDate() !== +day
    // ) {
    //     for (let i = work.startTime; i <= work.endTime; i = i + work.interval) {
    //         generatedTime.push(getRoundedInterval(i))
    //     }
    // } else {
    //     for (let i = currentTimeInMinutes; i <= work.endTime; i = i + work.interval) {
    //         generatedTime.push(getRoundedInterval(i))
    //     }
    // }

    // console.log(generateDaysHandler(null, 8, 8))

    const monthsLabel = [
        'Січень',
        'Лютий ',
        'Березень',
        'Квітень',
        'Травень',
        'Червень',
        'Липень',
        'Серпень',
        'Вересень',
        'Жовтень',
        'Листопад',
        'Грудень',
    ]

    const getDays = (year, month) => {
        return new Date(year, month, 0).getDate()
    }

    const getFormatedDay = (year, month, day) => {
        const date = new Date()
        date.setMonth(month - 1)
        date.setFullYear(year)
        date.setDate(day)

        const options = { weekday: 'long' }
        const dayLong = new Intl.DateTimeFormat('uk-UA', options).format(date)
        const optionsNum = { day: 'numeric', month: 'numeric' }
        const dayNum = new Intl.DateTimeFormat('uk-UA', optionsNum).format(date)
        return { weekday: dayLong, number: dayNum, index: date.getDate() }
    }

    for (let i = +currentTime.getMonth() + 1; i <= +user.userData.horizon + currentTime.getMonth() + 1; i++) {
        generatedMonths.push(i)
    }

    if (+currentTime.getMonth() + 1 === +month) {
        for (let i = currentTime.getDate(); i <= getDays(2022, month); i++) {
            generatedDays.push(getFormatedDay(2022, month, i))
        }
    } else {
        for (let i = 1; i <= getDays(2022, month); i++) {
            generatedDays.push(getFormatedDay(2022, month, i))
        }
    }

    // console.log('bookingCheck', new Date(1659880800000).getMonth());

    function monthHandler(e) {
        console.log(e.target.value)
        setDate(e.target.value)
    }

    // console.log('month', generatedMonths)
    // console.log('day', generatedDays)
    // console.log('time', generatedTime);

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

    const formHeight = genTime.length * 7
    const displayToggle = { height: showMore ? `${formHeight}px` : '55px', overflowY: 'hidden' }

    function showMoreHandler(e) {
        showMore ? setShoMore(0) : setShoMore(1)
    }

    return (
        <>
            <form className={s.wrapper_month}>
                {generatedMonths.map((i) => (
                    <label key={i} style={monthStyle} className={s.container_month}>
                        <input
                            value={i}
                            name='radio'
                            type='radio'
                            onChange={visitHandler}
                            data-type-index={i}
                            data-type-field='month'
                            onClick={monthHandler}
                        />
                        <span style={monthStyle} className={s.name_month}>
                            {monthsLabel[i - 1]}
                        </span>
                        <span style={monthStyle} className={s.checkmark_month}></span>
                    </label>
                ))}
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
                                onClick={() => setDay(i.index)}
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
                {genTime.map((i, index) => (
                    <div key={index}>
                        <label style={timeStyle} className={s.container_time}>
                            <input
                                name='radio'
                                type='radio'
                                onChange={visitHandler}
                                data-type-index={i.hours}
                                data-type-field='hour'
                                data-type-indexminutes={i.minutes}
                                data-type-fieldminutes='minute'
                            />
                            <span style={timeStyle} className={s.name_time}>
                                {i.free ? i.time : null}
                                {/* {i.minutes ? i.hours + ':' + i.minutes : i.hours} */}
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
