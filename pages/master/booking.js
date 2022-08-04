import { useStoreContext } from '../../context/store'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { getSession } from 'next-auth/react'
import DashNav from '../../components/dashnav'
import MasterNav from '../../components/masternav'
import dash from '../../styles/dash.module.css'
import s from '../../styles/services_page_admin.module.css'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Script from 'next/script'
import Cloudinary from '../../lib/cloudinary'
import { server } from '../../config/index'
import ScrollBox from '../../components/scrollbox'
import useSWR from 'swr'
import BookingItem from '../../components/bookingitem'


export async function getServerSideProps(context) {
    const session = await getSession(context)
    if (!session) {
        context.res.writeHead(302, { Location: '/login' })
        context.res.end()
        return {}
    }
    return {
        props: {
            user: session.user,
        },
    }
}
const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Booking({ user, data }) {
    
    const [store, setStore] = useStoreContext()
    const { data: booking } = useSWR(user ? `/api/order?q=${user.email}` : null, fetcher)

    if (!booking) return <div>Loading...</div>

    return (
        <div>
            <DashNav />
            <MasterNav />
            <div className='container'>
                <div className={s.header}>
                <h1 className={s.title_h2}>Бронювання</h1>
                    <Link href='serviceadd'>
                        <button>Додати бронювання</button>
                    </Link>
                </div>
                {booking.orders.map((i) => (
                    <BookingItem key={i.orderId} item={i} />
                ))}
                
            </div>
        </div>
    )
}
