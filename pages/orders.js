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
import Order from '../components/orderitem'

export default function MasterPage({ user, userInfo }) {
    const { data: session, status } = useSession()
    const [store, setStore] = useStoreContext()

    if (!session) return <div>Для можливості бронювання послуг увійдіть будь-ласка на сайт через ваш аккаунт Google</div>



    console.log('orders', store.orders);


    async function orderHandler (e) {
        e.preventDefault(e)
    const response = await fetch(`/api/orders/`, {
      method: 'POST',
      body: JSON.stringify(store.orders),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    console.log('Sended')
    console.log(data)
    }

    return (
        <>
            <Head>
                <title>Ваші замовлення</title>
            </Head>
            <div className='container'>
                <h1>Ваші замовлення</h1>

                {store.orders.map((i) => (
                    <Order key={i.orderId} data={i} user={user}/>
                ))}

                <button onClick={orderHandler}>
                    Підтвердити бронювання
                </button>
            </div>
        </>
    )
}
