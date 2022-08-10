import s from './orderitem.module.css'
import useSWR, { mutate } from 'swr'
import Image from 'next/image'
import { useStoreContext } from '../context/store'
import { useState } from 'react'
import Avatar from './avatar'
import Calendar from './calendar'
import { useSession } from 'next-auth/react'
import Link from 'next/link'


const fetcher = (url) => fetch(url).then((res) => res.json())

export default function OrderItem({ item, clientEmail}) {
    
    const { data: session, status } = useSession()
    
    const currentTime = new Date()
    const { data: user } = useSWR(item ? `/api/userpublic?q=${item.masterEmail} ` : null, fetcher)
    const { data: bookedOrders } = useSWR(item ? `/api/bookedtime?q=${item.masterEmail}` : null, fetcher)

    const [store, setStore] = useStoreContext()
    const [statusMessage, setStatusMessage] = useState({ status: 0, message: 'Оберіть місяць, дату та час' })

    const defaultTime = {
        year: currentTime.getFullYear(),
        month: '',
        day: '',
        hour: '',
        minute: '',
    }
    const [contacts, setContacts] = useState({
        clientName: session.user.name,
        clientEmail: clientEmail,
        clientPhone: '',
        suggestions: '',
    })

    const [dayTime, setDayTime] = useState(defaultTime) // отримано поточну дату у форматі для конвертування у timestamp

    const orderDur = item.option.dur //тривалість обраної послуги
    const choosenTimeStamp = new Date(
        `${dayTime.year}-${dayTime.month}-${dayTime.day}T${dayTime.hour}:${dayTime.minute}:00`
    ) // конвертує отриманий з календаря час в timestamp

    let mergedData = { ...item, ...contacts, visitDateTime: dayTime, visitDur: orderDur}
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
        if (validate) {
            const response = await fetch(`/api/order/`, {
                method: 'POST',
                body: JSON.stringify(mergedData),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            const res = await response.json()
            if (res.result.acknowledged) {
                mutate(`/api/bookedtime?q=${item.masterEmail}`)
            }
            console.log('Sended')
            console.log(res.result.acknowledged)
            showMessage()
            setTimeout(() => {
                setStore({ ...store, orders: store.orders.filter((i) => +e.target.value !== i.orderId) })
            }, 5000);
        }
        console.log('statusMessage')
    }

    function removeHandler(e) {
        e.preventDefault()
        setStore({ ...store, orders: store.orders.filter((i) => +e.target.value !== i.orderId) })
    }

    const validate = dayTime.month > 0 && dayTime.day > 0 && dayTime.hour > 0

    function showMessage() {
        setStatusMessage({
            status: 1,
            message:
                'Бронювання надіслано. Можете вибрати інші послуги майстра та забронювати додаткові візити. Бронювання буде переміщено в архів через 5 секунд',
        })
    }

    if (!bookedOrders && !user) return <div>Loading...</div>

    return (
        <div className={s.orders_wrapper}>
            {statusMessage.status === 0 && (
                <div>
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
                    <div className={s.calendar_wrapper}>
                        {bookedOrders && user && (
                            <Calendar
                                props={{ visitHandler, orderDur, user, bookedOrders, choosenTimeStamp }}
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
                                    {dayTime.hour}:{dayTime.minute}
                                </div>
                            </div>
                            <div className={s.date_wrapper}>
                                <Image width={15} height={15} src='/images/booking.png' alt='time' />
                                <div className={s.date}>
                                {dayTime.day}.{dayTime.month}.{dayTime.year}
                                </div>
                            </div>
                            <button className={s.cancel_btn} value={item.orderId} onClick={removeHandler}>
                                Відмінити
                            </button>
                        </div>
                        <div className={s.message}>{statusMessage.message}</div>
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
                </div>
            )}

            {statusMessage.status === 1 && (
                <div className={s.message_wrapper}>
                    <div className={s.message}>{statusMessage.message}</div>
                    <div className={s.master_wrapper}>
                        <div className={s.master_inner}>
                            <div className={s.avatar}>
                                <Avatar w={40} h={40} src={item.photo} />
                            </div>
                            <div>
                                <div className={s.master_name}>{item.masterName}</div>

                                <div className={s.master_name}>{item.masterSurname}</div>
                            </div>
                        </div>
                        <div className={s.masterLink}>
                            <Link href={`/catalog/${item.masterEmail}`}>
                                <a>Сторінка майстра</a>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
