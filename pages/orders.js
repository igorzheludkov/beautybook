import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import s from '../styles/order.module.css'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'
import Avatar from '../components/avatar'
import { server } from '../config/index'
import { getSession } from 'next-auth/react'
import { useStoreContext } from '../context/store'
import { useSession } from 'next-auth/react'

export default function MasterPage({ user, userInfo }) {
    const { data: session, status } = useSession()
    const [store, setStore] = useStoreContext()

    if (!session) return <div>Для можливості бронювання послуг увійдіть будь-ласка на сайт через ваш аккаунт Google</div>

    function removeHandler(e) {
        e.preventDefault()
        setStore({ ...store, orders: store.orders.filter((i) => e.target.value !== i.orderId)})
    }

    return (
        <>
            <Head>
                <title>Ваші замовлення</title>
            </Head>
            <div className='container'>
                <h1>Ваші замовлення</h1>

                {store.orders.map((i) => (
                    <div key={i.orderId} className={s.orders_wrapper}>
                        <div className={s.master_info}>
                            <div className={s.master_inner}>
                                <div className={s.avatar}>
                                    <Avatar w={50} h={50} src={i.photo} />
                                </div>
                                <div>
                                    <div className={s.master_name}>{i.masterName}</div>

                                    <div className={s.master_name}>{i.masterSurname}</div>
                                </div>
                            </div>
                            <div className={s.master_adress}>
                                <div className={s.master_adressLogo}>
                                    <Image width={20} height={20} src='/images/adress.png' alt='adress' />
                                </div>

                                <div>
                                    <div>{i.city}</div>
                                    <div>{i.street}</div>
                                    <div>{i.location}</div>
                                </div>
                            </div>
                        </div>
                        <div className={s.serv}>
                            <div className={s.serv_name}>{i?.option.name}</div>
                            <div className={s.serv_price}>{i?.option.price} грн</div>
                            <div className={s.serv_dur}>
                                {i.option.dur} хв{' '}
                                <button value={i.orderId} onClick={removeHandler}>
                                    Видалити
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
