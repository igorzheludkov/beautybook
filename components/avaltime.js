import { useEffect, useState } from 'react'
import { useStoreContext } from '../context/store'

export default function AvalTime({ visitHandler, orderDur, dayStart, dayEnd, interval }) {
    const bookingTime = new Date(2022, 7, 6, 15, 30, 0)
    const workStart = dayStart ?? 9
    const workEnd = dayEnd ?? 18
    const workInterval = interval ?? 20


    const [visitDateTime, setVisitTime] = useState(bookingTime.getTime())

    function doSomething() {}
    return (
        <button onClick={visitHandler} value={visitDateTime}>
            Підтвердити час
        </button>
    )
}
