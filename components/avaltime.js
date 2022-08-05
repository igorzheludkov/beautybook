import { useEffect, useState } from 'react'
import { useStoreContext } from '../context/store'
import Calendar from './calendar'

export default function AvalTime({ booking, visitHandler, orderDur, dayStart, dayEnd, interval }) {
    const bookingTime = new Date(2022, 7, 6, 15, 30, 0)
    const work = {
        startTime: dayStart ?? 9,
        endTime: dayEnd ?? 18,
        interval: interval ?? 20,
        except: '',
    }

    const days = ['Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П`ятниця', 'Субота', 'Неділя' ]
    const months = ['Січень', 'Лютий ', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень' ]


    // const bookedDay = booking.map(i => i.visitDateTime)
    
    // console.log(bookedDay)
    console.log('booked time', booking);


    const [visitDateTime, setVisitTime] = useState(bookingTime.getTime())

    const [month, setMonth] = useState(1)
    const [day, setDay] = useState(1)
    const [time, setTime] = useState(work.startTime)

    function doSomething() {}
    return (
        <>
        <Calendar data={days}  />
            <button onClick={visitHandler} value={visitDateTime}>
                Підтвердити час
            </button>
        </>
    )
}
