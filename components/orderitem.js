import s from './orderitem.module.css'
import useSWR from 'swr'
import Image from 'next/image'
import { useStoreContext } from '../context/store'
import { useState } from 'react'
import Avatar from './avatar'
import Calendar from './calendar'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function OrderItem({ item }) {
    const currentTime = new Date()
    const { data: user } = useSWR(item ? `/api/userpublic?q=${item.masterEmail} ` : null, fetcher)
    const { data: booking } = useSWR(item ? `/api/bookedtime?q=${item.masterEmail}` : null, fetcher)

    const [store, setStore] = useStoreContext()

    const defaultTime = {
        year: currentTime.getFullYear().toString(),
        month: currentTime.getMonth() + 1 < 10 ? '0' + (currentTime.getMonth() + 1).toString() : (currentTime.getMonth() + 1).toString(),
        day: currentTime.getDay() < 10 ? '0' + currentTime.getDay().toString() : currentTime.getDay().toString(),
        hour: currentTime.getHours() < 10 ? '0' + currentTime.getHours().toString() : currentTime.getHours().toString(),
        minute: '00',
    }

    const [contacts, setContacts] = useState({ clientName: '', clientPhone: '', suggestions: '' })
    const [dayTime, setDayTime] = useState(defaultTime)
    const orderDur = item.option.dur
    const choosenTime = new Date(`${dayTime.year}-${dayTime.month}-${dayTime.day}T${dayTime.hour}:${dayTime.minute}:00`)
    let mergedData = { ...item, ...contacts, visitDateTime: choosenTime.getTime(), visitDur: orderDur }


    // Із функції повинна прийти дата бронювання у вигляді timestamp
    function visitHandler(e) {

        const typeMinute = e.target.dataset.typeIndexminutes < 10 ? '0' + e.target.dataset.typeIndexminutes : e.target.dataset.typeIndexminutes
        const minuteField = e.target.dataset.typeFieldminutes
        const typeIndex = e.target.dataset.typeIndex < 10 ? '0' + e.target.dataset.typeIndex : e.target.dataset.typeIndex
        const fieldType = e.target.dataset.typeField

        minuteField
            ? setDayTime({ ...dayTime, [fieldType]: typeIndex, [minuteField]: typeMinute })
            : setDayTime({ ...dayTime, [fieldType]: typeIndex })
    }

    function clientContactsHandler(e) {
        setContacts({ ...contacts, [e.target.id]: e.target.value, visitDur: +orderDur })
    }

    // console.log('merged', mergedData);
    const bookingTime = new Date(`2022-08-07T22:06:00`)

    console.log('choosenTime', choosenTime.getTime())
    console.log('mergedData', mergedData)

    async function orderHandler(e) {
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

    function removeHandler(e) {
        e.preventDefault()
        setStore({ ...store, orders: store.orders.filter((i) => e.target.value !== i.orderId) })
    }
    if (!booking) return <div>Loading...</div>

    return (
        <div className={s.orders_wrapper}>
            <div className={s.master_info}>
                <div className={s.master_inner}>
                    <div className={s.avatar}>
                        <Avatar w={50} h={50} src={item.photo} />
                    </div>
                    <div>
                        <div className={s.master_name}>{item.masterName}</div>

                        <div className={s.master_name}>{item.masterSurname}</div>
                    </div>
                </div>
                <div className={s.master_adress}>
                    <div className={s.master_adressLogo}>
                        <Image width={20} height={20} src='/images/adress.png' alt='adress' />
                    </div>

                    <div>
                        <div>{item.city}</div>
                        <div>{item.street}</div>
                        <div>{item.location}</div>
                    </div>
                </div>
            </div>
            <div className={s.serv}>
                <div className={s.serv_name}>{item.option.name}</div>
                <div className={s.serv_price}>{item.option.price} грн</div>
                <div className={s.serv_dur}>{item.option.dur} хв </div>
            </div>

            <Calendar props={{ visitHandler, orderDur, user, booking }} />

            <input id='suggestions' value={contacts.suggestions} onChange={clientContactsHandler} placeholder='Додайте побажання щодо послуги' />
            <div>
                <div>Час</div>
                <div>Дата</div>
                <button value={item.orderId} onClick={removeHandler}>
                    Відмінити
                </button>
            </div>
            <form>
                <input id='clientName' value={contacts.clientName} onChange={clientContactsHandler} placeholder='Ваше ім`я' />
                <input id='clientPhone' value={contacts.clientPhone} onChange={clientContactsHandler} placeholder='Ваш номер телефону' />
                <button value={item.orderId} onClick={orderHandler}>
                    Підтвердити
                </button>
            </form>
        </div>
    )
}
