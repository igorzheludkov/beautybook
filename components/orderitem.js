import s from './orderitem.module.css'

import Image from 'next/image'
import { useStoreContext } from '../context/store'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import Avatar from './avatar'

export default function OrderItem({ data, user }) {
    const [store, setStore] = useStoreContext()
    const { data: session, status } = useSession()
    const [checked, setChecked] = useState()

    function orderHandler(e) {
        e.preventDefault()
        setStore({ ...store, orders: [...store.orders, { orderId: Date.now().toString(), masterEmail: user.email, serviceId: data._id, masterId: user._id, title: data.item_1.name, masterName: user.userData.name, masterSurname: user.userData.surname, street: user.userData.street, city: user.userData.city, location: user.userData.location, photo: user.userData.photo, option: checked }] })
        // setStore({ ...store, orders: [...store.orders, e.target.value] })
    }

    function removeHandler(e) {
        e.preventDefault()
        setStore({ ...store, orders: store.orders.filter((i) => e.target.value !== i.orderId) })
    }

    return (
        <div className={s.orders_wrapper}>
            <div className={s.master_info}>
                <div className={s.master_inner}>
                    <div className={s.avatar}>
                        <Avatar w={50} h={50} src={data.photo} />
                    </div>
                    <div>
                        <div className={s.master_name}>{data.masterName}</div>

                        <div className={s.master_name}>{data.masterSurname}</div>
                    </div>
                </div>
                <div className={s.master_adress}>
                    <div className={s.master_adressLogo}>
                        <Image width={20} height={20} src='/images/adress.png' alt='adress' />
                    </div>

                    <div>
                        <div>{data.city}</div>
                        <div>{data.street}</div>
                        <div>{data.location}</div>
                    </div>
                </div>
            </div>
            <div className={s.serv}>
                <div className={s.serv_name}>{data.option.name}</div>
                <div className={s.serv_price}>{data.option.price} грн
                <button value={data.orderId} onClick={removeHandler}>
                        Видалити
                    </button></div>
                <div className={s.serv_dur}>
                    {data.option.dur} хв{' '}
                    <button value={data.orderId} >
                        Підтвердити
                    </button>
                </div>
            </div>
        </div>
    )
}
