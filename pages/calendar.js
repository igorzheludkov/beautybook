import { useEffect, useState } from 'react'
import { useStoreContext } from '../context/store'
import Head from 'next/head'

export default function DayCalendar() {
    const [store, setStore] = useStoreContext()
    const [dayShedule, setDayShedule] = useState(0)

    const dayBegin = new Date(2022,7,6)
    dayBegin.setHours('9', '00', '00')
    const dayEnd = new Date(2022,7,6)
    dayEnd.setHours('18', '00', '00')
    const orderTime = new Date(2022,7,6,12,0,0)

    const servInterval = 40 * 60 * 1000

    useEffect(() => {
        setDayShedule([dayBegin.getTime(), dayEnd.getTime()])
    }, [])

    console.log((dayShedule[1] - dayShedule[0]) / 1000 / 60)
    console.log(orderTime.getTime() )

    const dateTime = new Date(dayShedule[0])

    function bookingListGenerator(start, dur) {
        const orderEnd = start + dur
        const orderParams = { orderStart: start, orderDur: dur, orderEnd }
        return orderParams
    }

    // do {
    //     hoursCalendar.push(beginHours)
    //     beginHours = beginHours + timeInterval
    // } while (beginHours < endHours)

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

    return (
        <>
            <Head>
                <title>Day Calendar</title>
            </Head>
            <div className='container'>
                <div style={{ width: '360px', height: '500px' }}>
                    {/* {avalTime.map((i) => (
                        <div key={i}>
                            <label style={style} htmlFor='calendar'>
                                <input onChange={buttonHandler} name='calendar' value={i} type='radio' />
                                {timeConvert(i)}
                            </label>
                        </div>
                    ))} */}
                </div>
            </div>
        </>
    )
}
