import { useStoreContext } from '../context/store'
import { useState } from 'react'
import Image from 'next/image'
import Avatar from './avatar'
import s from './bookingitem.module.css'

export default function OrderItem({ item }) {
    const [store, setStore] = useStoreContext()

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

    console.log('booking page', item)

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
                        <div className={s.time}>Час</div>
                        <div className={s.date}>Дата</div>
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
// city: "м. Вінниця"
// clientName: "Марк"
// clientPhone: "28428974892347"
// location: "Торговий цетр МИР"
// masterEmail: "500griven@gmail.com"
// masterId: "62e6840acf4d88a22c64aeed"
// masterName: "Ігор"
// masterSurname: "Желудков"
// option: {name: 'Масаж всього тіла', price: '400', dur: '40'}
// orderId: "1659625794355"
// photo: "https://res.cloudinary.com/dvywpujnv/image/upload/v1659504913/profile_uploads/iih5wi9co4jpmzub7b4y.jpg"
// serviceId: "62ea1547b4912b56079c3c2f"
// street: "вул. Космонавтів 65"
// suggestions: "Не дуже сильно"
// title: "Масаж всього тіла"
// _id: "62ebe159e928ffcf36c1274f"
