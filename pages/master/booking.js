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



export async function getServerSideProps(context) {
    const session = await getSession(context)
    if (!session) {
        context.res.writeHead(302, { Location: '/login' })
        context.res.end()
        return {}
    }
    // const res = await fetch(`${server}/api/services_api?q=${session.user.email}`, {
    //     method: 'GET',
    // })
    // const serv = await res.json()
    return {
        props: {
            user: session.user,
            // data: serv,
        },
    }
}
const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Booking({ user, data }) {
    const [store, setStore] = useStoreContext()
    const { data: services } = useSWR(user ? `/api/orders?q=${user.email}` : null, fetcher)

    if (!services) return <div>Loading...</div>

    const srv = services.services

    console.log('booking',services);





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
                
            </div>
        </div>
    )
}
