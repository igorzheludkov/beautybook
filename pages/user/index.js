import Head from 'next/head'
import Link from 'next/link'
import {useState} from 'react'
import Layout from '../../components/layout'
import { getSession } from 'next-auth/react'
import MasterNav from '../../components/masternav'
import { useStoreContext } from '../../context/store'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'
import OrdersHistoryItem from '../../components/orderhistoryitem'
import CheckboxButtons from '../../components/ui/checkboxbuttons'

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

export default function OrdersHistory({ user }) {

 

    return (
        <>
            <Head>Профіль клієнта</Head>
            <MasterNav />
            
        </>
    )
}
