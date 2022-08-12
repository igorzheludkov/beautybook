import { useStoreContext } from '../context/store'
import { useState } from 'react'
import Image from 'next/image'
import Avatar from './avatar'
import s from './bookingitem.module.css'
import GetFormatedDay from './getFormatedDay'


export default function OrderItem({ item }) {
    const [store, setStore] = useStoreContext()

    const getDay = GetFormatedDay(
        item.visitDateTime.year,
        item.visitDateTime.month,
        item.visitDateTime.day
    )


    function clientContactsHandler(e) {
        setContacts({ ...contacts, [e.target.id]: e.target.value })
    }

    async function shiftOrderHandler(e) {
        e.preventDefault(e)
        const response = await fetch(`/api/order/`, {
            method: 'POST',
            body: JSON.stringify(mergedData),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const res = await response.json()
        console.log('Sended')
    }

    function cancelOrderHandler(e) {
        e.preventDefault()
    }


    return (
        <div className={s.booking_wrapper}>
            <div className={s.header}>
                <div className={s.title}>{item.option.name}</div>
                <div className={s.title_info}>
                    <div className={s.price}>{item.option.price} грн</div>
                    <div className={s.dur}>{item.option.dur} хв</div>
                </div>
            </div>
            <div className={s.booking_details}>
                <div className={s.booking_inner}>
                    <div className={s.date_time}>
                        <div className={s.time}>{item.visitDateTime.hour}:{item.visitDateTime.minute}</div>
                        <div className={s.date}>{getDay.weekday} {getDay.number}.{getDay.year}</div>
                    </div>
                    <div className={s.contacts}>
                        <div className={s.phone}>{item.clientPhone}</div>
                        <div className={s.name}>{item.clientName}</div>
                    </div>
                </div>
                <div className={s.buttons}>
                    <button className={s.cancel}>Відмінити</button>
                    <button className={s.shift}>Перенести</button>
                </div>
            </div>
        </div>
    )
}
