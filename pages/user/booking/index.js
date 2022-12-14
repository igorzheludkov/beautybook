import { useStoreContext } from '../../../context/store'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { getSession } from 'next-auth/react'
import DashNav from '../../../components/dashnav'
import s from '../../../styles/booking.module.css'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Script from 'next/script'
import Cloudinary from '../../../lib/cloudinary'
import { server } from '../../../config/index'
import ScrollBox from '../../../components/scrollbox'
import useSWR from 'swr'
import BookingItem from '../../../components/bookingitem'

export async function getServerSideProps(context) {
    const session = await getSession(context)
    if (!session) {
        context.res.writeHead(302, { Location: '/login' })
        context.res.end()
        return {}
    }
    return {
        props: {
            master: session.user,
        },
    }
}
const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Booking({ master, data }) {
    const [store, setStore] = useStoreContext()
    const { data: booking } = useSWR(master ? `/api/order?q=${master.email}` : null, fetcher)

    useEffect(() => {
        setStore({ ...store, booking: booking?.orders })
    }, [booking])


    if (!booking) return <div>Loading...</div>

    return (
        <div>
            <div className='container'>
                <div className={s.header}>
                    <h1 className={s.title_h2}>Бронювання</h1>
                    <Link href='/user/booking/bookingadd'>
                        <button className={s.addserv}>Додати бронювання</button>
                    </Link>
                </div>
                {booking.orders.map((i) => (
                    <BookingItem key={i._id} item={i} />
                ))}
            </div>
        </div>
    )
}
