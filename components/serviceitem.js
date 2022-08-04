import Image from 'next/image'
import { useStoreContext } from '../context/store'
import s from './serviceitem.module.css'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

export default function ServiceItem({ data, user }) {
    const [store, setStore] = useStoreContext()
    const { data: session, status } = useSession()
    const [checked, setChecked] = useState()

    function cartHandler(e) {
        e.preventDefault()
        setStore({ ...store, orders: [...store.orders, {orderId: Date.now().toString(), masterEmail: user.email, serviceId: data._id, masterId: user._id, title: data.item_1.name, masterName: user.userData.name, masterSurname: user.userData.surname, street: user.userData.street, city: user.userData.city, location: user.userData.location, photo: user.userData.photo, option: checked }] })
        // setStore({ ...store, orders: [...store.orders, e.target.value] })
    }

    return (
        <form>
            <div className={s.serv_inner}>
                <div className={s.serv_item}>
                    <span className={s.serv_title}>{data.item_1.name}</span>
                    <span className={s.serv_price}>{data.item_1.price} грн</span>
                    <span className={s.serv_duration}>
                        {data.item_1.dur} хв
                        <input className={s.opt} onChange={() => setChecked(data.item_1)} name='position' value={data.item_1} type='radio' />
                    </span>
                </div>
                <div className={s.serv_item}>
                    <span className={s.serv_title}></span>
                    <span className={s.serv_price}>{data.item_2.price} грн</span>
                    <span className={s.serv_duration}>
                        {data.item_2.dur} хв
                        <input className={s.opt} onChange={() => setChecked(data.item_2)} name='position' value={data.item_2.name} type='radio' />
                    </span>
                </div>
                <span className={s.serv_desc}>{data.about.description}</span>
                <div className={s.images}>
                    {data.pic.map((i) => (
                        <Image layout='responsive' objectFit='cover' width={50} height={50} key={i} src={i} alt='service' />
                    ))}
                </div>

                {session && checked && (
                    <div>
                        <button onClick={cartHandler} className={s.tobasket}>
                            Додати в кошик
                        </button>
                    </div>
                )}
            </div>
        </form>
    )
}
