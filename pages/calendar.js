import { useEffect, useState } from 'react'
import { useStoreContext } from '../context/store'
import Head from 'next/head'

export default function BookingCalendar() {
    const [store, setStore] = useStoreContext()
    let hoursCalendar = []
    let avaliableTime = []
    let timeInterval = 30
    let beginHours = 9 * 60
    let endHours = 18 * 60
    let orderTime = 570
    let orderTime2 = 810
    let orderDuration = 40
    let orderEnd = orderTime + orderDuration

    const [checkedTime, setCheckedTime] = useState(0)
    const [avalTime, setAvalTime] = useState(hoursCalendar)
    const [booking, setBooking] = useState([])

    function bookingListGenerator(start, dur) {
        const orderEnd = start + dur
        const orderParams = { orderStart: start, orderDur: dur, orderEnd }
        return orderParams
    }

    // console.log('booking', booking)

    useEffect(() => {
        setBooking(bookingListGenerator(570, 40))
        // setAvalTime([...hoursCalendar.filter(i => i < orderTime), ...hoursCalendar.filter(i => i > orderEnd)])
    }, [])

    function timeConvert(n) {
        let num = n
        const rhours = Math.floor(num / 60)
        const rminutes = Math.round((num / 60 - rhours) * 60)
        return rminutes > 0 ? `${rhours}:${rminutes}` : `${rhours}`
    }

    do {
        hoursCalendar.push(beginHours)
        beginHours = beginHours + timeInterval
    } while (beginHours < endHours)

    // console.log('hoursCalendar', hoursCalendar)
    // console.log(
    //     'hoursCalendar_converted',
    //     hoursCalendar.map((i) => timeConvert(i))
    // )
    // console.log(
    //     'avalTime',
    //     avalTime.map((i) => timeConvert(i))
    // )

    const style = {
        width: '60px',
        height: '60px',
        float: 'left',
        padding: '10px 5px',
        margin: '10px',
        background: '#dadada',
        borderRadius: '10px',
        textAlign: 'center',
        border: 'none',
    }

    const styleActive = {
        background: '#7ad6ff',
        border: '2px',
    }

    function buttonHandler(e) {
        setCheckedTime(e.target.value)
        console.log(e)
    }
    console.log(checkedTime)

    return (
        <>
            <Head>
                <title>Booking Calendar</title>
            </Head>
            <div className='container'>
                <div style={{ width: '360px', height: '500px' }}>
                    {avalTime.map((i) => (
                        <div key={i}>
                            <label style={style} htmlFor='calendar'>
                                <input onChange={buttonHandler} name='calendar' value={i} type='radio' />
                                {timeConvert(i)}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
