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
import OrderItem from '../components/orderitem'

export default function MasterPage() {
    const { data: session, status } = useSession()
    const [store, setStore] = useStoreContext()

    if (!session) return <div>Для можливості бронювання послуг увійдіть будь-ласка на сайт через ваш аккаунт Google</div>

    const mockOrder = [{ city: 'м. Вінниця', location: 'Торговий цетр МИР', masterEmail: '500griven@gmail.com', masterId: '62e6840acf4d88a22c64aeed', masterName: 'Ігор', masterSurname: 'Желудков', option: { name: 'Масаж всього тіла', price: '400', dur: '40' }, orderId: 1659761538447, photo: 'https://res.cloudinary.com/dvywpujnv/image/upload/v1659504913/profile_uploads/iih5wi9co4jpmzub7b4y.jpg', serviceId: '62ea1547b4912b56079c3c2f', street: 'вул. Космонавтів 65', title: 'Масаж всього тіла' }]

    console.log('MockOrderEnabled.');
    return (
        <>
            <Head>
                <title>Ваші замовлення</title>
            </Head>
            <div className='container'>
                <h1>Ваші замовлення</h1>

                {/* {store.orders.map((i) => (
                    <OrderItem key={i.orderId} item={i} />
                ))} */}
                {mockOrder.map((i) => (
                    <OrderItem key={i.orderId} item={i} />
                ))}
            </div>
        </>
    )
}
