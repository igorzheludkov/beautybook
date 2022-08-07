import s from './calendar.module.css'
import { useState, useEffect, useCallback } from 'react'

export default function Calendar({ props }) {
    const { visitHandler, orderDur, user, booking } = props
    const currentTime = new Date()
    const currentTimeInMinutes = currentTime.getHours() * 60 + currentTime.getMinutes()
    const [month, setDate] = useState(currentTime.getMonth() + 1)
    const [showMore, setShoMore] = useState(0)

    let generatedMonths = []
    let generatedDays = []
    let generatedTime = []

    if (!user) return <div>Loading...</div>
    const work = {
        startTime: +user.userData.work_begin * 60 ?? 9 * 60,
        endTime: +user.userData.work_end * 60 ?? 18 * 60,
        interval: +user.userData.interval ?? 20,
        except: '',
    }

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

    const getRoundedInterval = (currentTimeInMinutes) => {
        return currentTimeInMinutes + work.interval - (currentTimeInMinutes % work.interval)
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

    if (currentTimeInMinutes < work.startTime || currentTimeInMinutes > work.endTime) {
        for (let i = work.startTime; i <= work.endTime; i = i + work.interval) {
            generatedTime.push(timeConvert(getRoundedInterval(i)))
        }
    } else {
        for (let i = currentTimeInMinutes; i <= work.endTime; i = i + work.interval) {
            generatedTime.push(timeConvert(getRoundedInterval(i)))
        }
    }

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

    const formHeight = generatedTime.length *10
    const displayToggle = { height: showMore ? `${formHeight}px` : '55px' , overflowY: 'hidden' } 

    function showMoreHandler (e) {
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
            {console.log(generatedDays)}
                

            <form style={displayToggle} id='time' className={s.wrapper_time}>
                {generatedTime.map((i, index) => (
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
                                {i.minutes ? i.hours + ':' + i.minutes : i.hours}
                            </span>
                            <span style={timeStyle} className={s.checkmark_time}></span>
                        </label>
                    </div>
                ))}
            </form>
            <button value={showMore} onClick={showMoreHandler} className={s.showmore}>{showMore ? 'Показати менше' : 'Показати більше'}</button>
        </>
    )
}
