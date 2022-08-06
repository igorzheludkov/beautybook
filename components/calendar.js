import s from './calendar.module.css'
import { useState, useEffect, useCallback } from 'react'

export default function Calendar({ props }) {
    const currentTime = new Date()
    const { visitHandler, orderDur, user, booking } = props

    if (!user) return <div>Loading...</div>

    function dayTimeHandler(e) {
        console.log(e.target.dataset)
        const typeIndex = e.target.dataset.typeIndex
        const fieldType = e.target.dataset.typeField
        setDayTime({ ...dayTime, [fieldType]: +typeIndex })
    }

    const daysLabel = ['Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П`ятниця', 'Субота', 'Неділя']
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
    const bookingTime = new Date(`2022-12-17T03:24:00`)
    // console.log(bookingTime)

    let generatedMonths = []
    let generatedDays = []
    let generatedTime = []

    const work = {
        startTime: +user.userData.work_begin * 60 ?? 9 * 60,
        endTime: +user.userData.work_end * 60 ?? 18 * 60,
        interval: +user.userData.interval ?? 20,
        except: '',
    }

    const getDays = (year, month) => {
        return new Date(year, month, 0).getDate()
    }

    for (let i = +currentTime.getMonth() + 1; i <= +user.userData.horizon + currentTime.getMonth() + 1; i++) {
        generatedMonths.push(i)
    }
    for (let i = +currentTime.getDay(); i <= getDays(2022, 8); i++) {
        generatedDays.push(i)
    }

    const currentTimeInMinutes = currentTime.getHours() * 60 + currentTime.getMinutes()
    const timeSlotsQuantity = (work.endTime - work.startTime) / work.interval

    if (currentTimeInMinutes < work.startTime || currentTimeInMinutes > work.endTime) {
        for (let i = work.startTime; i <= work.endTime; i = i + work.interval) {
            generatedTime.push(timeConvert(i))
        }
    } else {
        for (let i = currentTimeInMinutes; i <= work.endTime; i = i + work.interval) {
            generatedTime.push(timeConvert(i))
        }
    }

    // console.log('month', generatedMonths);
    // console.log('day', generatedDays);
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
        height: '30px',
        borderRadius: '7px',
    }

    return (
        <>
            <form className={s.wrapper_month}>
                {generatedMonths.map((i) => (
                    <label key={i} style={monthStyle} className={s.container_month}>
                        <input name='radio' type='radio' onChange={visitHandler} data-type-index={i} data-type-field='month' />
                        <span style={monthStyle} className={s.name_month}>
                            {monthsLabel[i - 1]}
                        </span>
                        <span style={monthStyle} className={s.checkmark_month}></span>
                    </label>
                ))}
            </form>
            <form className={s.wrapper_day}>
                {generatedDays.map((i) => (
                    <div key={i}>
                        <label style={dayStyle} className={s.container_day}>
                            <input name='radio' type='radio' onChange={visitHandler} data-type-index={i} data-type-field='day' />
                            <span style={dayStyle} className={s.name_day}>
                                {i}
                            </span>
                            <span style={dayStyle} className={s.checkmark_day}></span>
                        </label>
                    </div>
                ))}
            </form>
            <form className={s.wrapper_time}>
                {generatedTime.map((i) => (
                    <div key={Math.random()}>
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
        </>
    )
}
