import s from './orderitem.module.css'
import useSWR from 'swr'
import Image from 'next/image'
import { useStoreContext } from '../context/store'
import { useState } from 'react'
import Avatar from './avatar'
import Calendar from './calendar'
import { useSession } from 'next-auth/react'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function OrderItem({ item }) {
    const { data: session, status } = useSession()

    const currentTime = new Date()
    const { data: user } = useSWR(item ? `/api/userpublic?q=${item.masterEmail} ` : null, fetcher)
    const { data: bookedOrders } = useSWR(item ? `/api/bookedtime?q=${item.masterEmail}` : null, fetcher)

    const [store, setStore] = useStoreContext()

    const mockBooked = [
        {
            masterEmail: '500griven@gmail.com',
            masterId: '62e6840acf4d88a22c64aeed',
            visitDateTime: {
                day: '9',
                hour: '11',
                minute: '00',
                month: '8',
                year: '2022',
            },
            visitDur: 40,
        },
        {
            masterEmail: '500griven@gmail.com',
            masterId: '62e6840acf4d88a22c64aeed',
            visitDateTime: {
                day: '9',
                hour: '14',
                minute: '0',
                month: '8',
                year: '2022',
            },
            visitDur: 60,
        },
        {
            masterEmail: '500griven@gmail.com',
            masterId: '62e6840acf4d88a22c64aeed',
            visitDateTime: {
                day: '9',
                hour: '15',
                minute: '40',
                month: '8',
                year: '2022',
            },
            visitDur: 40,
        },
        {
            masterEmail: '500griven@gmail.com',
            masterId: '62e6840acf4d88a22c64aeed',
            visitDateTime: {
                day: '9',
                hour: '17',
                minute: '0',
                month: '8',
                year: '2022',
            },
            visitDur: 80,
        },
        {
            masterEmail: '500griven@gmail.com',
            masterId: '62e6840acf4d88a22c64aeed',
            visitDateTime: {
                day: '10',
                hour: '14',
                minute: '0',
                month: '9',
                year: '2022',
            },
            visitDur: 80,
        },
        {
            masterEmail: '500griven@gmail.com',
            masterId: '62e6840acf4d88a22c64aeed',
            visitDateTime: {
                day: '10',
                hour: '10',
                minute: '0',
                month: '10',
                year: '2022',
            },
            visitDur: 80,
        },
    ]

    const defaultTime = {
        year: currentTime.getFullYear().toString(),
        month:
            currentTime.getMonth() + 1 < 10
                ? '0' + (currentTime.getMonth() + 1).toString()
                : (currentTime.getMonth() + 1).toString(),
        day:
            currentTime.getDate() < 10
                ? '0' + currentTime.getDate().toString()
                : currentTime.getDate().toString(),
        hour:
            currentTime.getHours() < 10
                ? '0' + currentTime.getHours().toString()
                : currentTime.getHours().toString(),
        minute: '00',
    }
    const [contacts, setContacts] = useState({
        clientName: session.user.name,
        clientPhone: '',
        suggestions: '',
    })
    const [dayTime, setDayTime] = useState(defaultTime) // отримано поточну дату у форматі для конвертування у timestamp

    const orderDur = item.option.dur //тривалість обраної послуги
    const choosenTimeStamp = new Date(
        `${dayTime.year}-${dayTime.month}-${dayTime.day}T${dayTime.hour}:${dayTime.minute}:00`
    ) // конвертує отриманий з календаря час в timestamp

    let mergedData = { ...item, ...contacts, visitDateTime: dayTime, visitDur: orderDur }
    // merged data - об'єднує інформацію в єдине замовлення
    // Із функції повинна прийти дата бронювання у зручному для конвертації вигляді
    function visitHandler(e) {
        const typeMinute =
            e.target.dataset.typeIndexminutes < 10
                ? '0' + e.target.dataset.typeIndexminutes
                : e.target.dataset.typeIndexminutes
        const minuteField = e.target.dataset.typeFieldminutes
        const typeIndex =
            e.target.dataset.typeIndex < 10 ? '0' + e.target.dataset.typeIndex : e.target.dataset.typeIndex
        const fieldType = e.target.dataset.typeField

        minuteField
            ? setDayTime({ ...dayTime, [fieldType]: typeIndex, [minuteField]: typeMinute })
            : setDayTime({ ...dayTime, [fieldType]: typeIndex })
    }

    function clientContactsHandler(e) {
        setContacts({ ...contacts, [e.target.id]: e.target.value, visitDur: +orderDur })
    }

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
    if (!bookedOrders && !user) return <div>Loading...</div>

    return (
        <div className={s.orders_wrapper}>
            <div className={s.serv}>
                <div className={s.serv_name}>{item.option.name}</div>
                <div className={s.serv_price}>{item.option.price} грн</div>
                <div className={s.serv_dur}>{item.option.dur} хв </div>
            </div>

            <div className={s.master_info}>
                <div className={s.master_inner}>
                    <div className={s.avatar}>
                        <Avatar w={40} h={40} src={item.photo} />
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

            {bookedOrders && (
                <Calendar
                    props={{ visitHandler, orderDur, user, bookedOrders, choosenTimeStamp, mockBooked }}
                />
            )}

            <input
                className={s.suggestions}
                id='suggestions'
                value={contacts.suggestions}
                onChange={clientContactsHandler}
                placeholder='Додайте побажання щодо послуги'
            />
            <div className={s.daytime}>
                <div className={s.time_wrapper}>
                    <Image width={15} height={15} src='/images/orders.png' alt='time' />
                    <div className={s.time}>
                        {choosenTimeStamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                </div>
                <div className={s.date_wrapper}>
                    <Image width={15} height={15} src='/images/booking.png' alt='time' />
                    <div className={s.date}>
                        {choosenTimeStamp.toLocaleDateString('uk-UA', {
                            day: 'numeric',
                            year: 'numeric',
                            month: 'long',
                        })}
                    </div>
                </div>
                <button className={s.cancel_btn} value={item.orderId} onClick={removeHandler}>
                    Відмінити
                </button>
            </div>
            <form className={s.contacts}>
                <div>
                    <input
                        className={s.clientName}
                        id='clientName'
                        value={contacts.clientName}
                        onChange={clientContactsHandler}
                        placeholder='Ваше ім`я'
                    />
                    <input
                        className={s.clientPhone}
                        id='clientPhone'
                        value={contacts.clientPhone}
                        onChange={clientContactsHandler}
                        placeholder='Ваш номер телефону'
                    />
                </div>
                <button className={s.submit_btn} value={item.orderId} onClick={orderHandler}>
                    Підтвердити
                </button>
            </form>
        </div>
    )
}
