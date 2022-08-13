import Head from 'next/head'
import Link from 'next/link'
import s from '../styles/history.module.css'
import { getSession } from 'next-auth/react'
import useSWR from 'swr'
import OrdersHistoryItem from '../components/orderhistoryitem'

export async function getServerSideProps(context) {
    const session = await getSession(context)
    if (!session) {
        context.res.writeHead(302, { Location: '/login' })
        context.res.end()
        return {}
    }
    return {
        props: {
            client: session.user,
        },
    }
}
const fetcher = (url) => fetch(url).then((res) => res.json())

export default function OrdersHistory({ client }) {
    const { data: bookedOrders } = useSWR(`/api/orderclient?q=${client.email}`, fetcher)

    if (!bookedOrders) return <div>Loading...</div>


    return (
        <div className='container'>
            <div className={s.history_wrapper}>
                <Head>
                    Історія ваших бронювань
                </Head>
                <h2 className={s.title_h2}>Мої бронювання</h2>
                {bookedOrders.orders.map((i) => (
                    <OrdersHistoryItem key={i._id} order={i} />
                ))}
            </div>
        </div>
    )
}
