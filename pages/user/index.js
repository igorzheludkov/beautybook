import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/layout'
import { getSession } from 'next-auth/react'
import MasterNav from '../../components/masternav'
import { useStoreContext } from '../../context/store'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'
import OrdersHistoryItem from '../../components/orderhistoryitem'
import s from '../../styles/profile.module.css'

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
                    Профіль клієнта
                </Head>
                <MasterNav />
               
            </div>
        </div>
    )
}
