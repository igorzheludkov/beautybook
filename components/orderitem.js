import s from './orderitem.module.css'
import useSWR from 'swr'
import Image from 'next/image'
import { useStoreContext } from '../context/store'
import { useState } from 'react'
import Avatar from './avatar'
import AvalTime from './avaltime'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function OrderItem({ item, user }) {
    // const { data: user } = useSWR(`/api/user/${router.query.id}`, fetcher)
    const { data: booking } = useSWR(item ? `/api/bookedtime?q=${item.masterEmail}` : null, fetcher)

    const [store, setStore] = useStoreContext()

    const [contacts, setContacts] = useState({ clientName: '', clientPhone: '', suggestions: '' })
    const orderDur = item.option.dur
    const [choosenTime, setChoosenTime] = useState({ visitDur: '', visitDateTime: '' })

    let mergedData = { ...item, ...contacts, ...choosenTime }

    // console.log('order item component', mergedData);
    console.log('booked time - order item', booking);

    // Із функції повинна прийти дата бронювання у вигляді timestamp
    function visitHandler(e) {
        setChoosenTime({ ...choosenTime, visitDateTime: +e.target.value, visitDur: +orderDur })
        console.log('Дата і час візиту', +e.target.value)
    }

    function clientContactsHandler(e) {
        setContacts({ ...contacts, [e.target.id]: e.target.value })
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
            <AvalTime visitHandler={visitHandler} orderDur={orderDur} booking={booking.orders} />

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
