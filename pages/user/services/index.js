import { useStoreContext } from '../../../context/store'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { getSession } from 'next-auth/react'
import DashNav from '../../../components/dashnav'
import MasterNav from '../../../components/masternav'
import s from '../../../styles/services.module.css'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Script from 'next/script'
import Cloudinary from '../../../lib/cloudinary'
import { server } from '../../../config/index'
import ScrollBox from '../../../components/scrollbox'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import Gallery from '../../../components/ui/gallery'
import ServiceItem from '../../../components/serviceitem'



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

export default function Services({ user, data }) {
    const router = useRouter()
    const [store, setStore] = useStoreContext()
    const { data: services } = useSWR(user ? `/api/services/${user.email}` : null, fetcher)

    if (!services) return <div>Loading...</div>

    const srv = services.services
    console.log(srv);

    return (
        <div>
            <MasterNav />
            <div className='container'>
                <div className={s.header}>
                    <h1 className={s.title_h2}>Послуги</h1>
                    <Link href='/user/services/serviceadd'>
                        <button className={s.addserv}>Додати послугу</button>
                    </Link>
                </div>
            </div>
            {srv.map((i) => (
            <ServiceItem key={i._id} data={i} adminPanel={true}/>
          ))}
            
        </div>
    )
}
