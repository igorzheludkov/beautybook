import { useStoreContext } from '../../context/store'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { getSession } from 'next-auth/react'
import DashNav from '../../components/dashnav'
import MasterNav from '../../components/masternav'
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

export default function Services({ user, data }) {
    const [store, setStore] = useStoreContext()
    const { data: services } = useSWR(user ? `/api/services/${user.email}` : null, fetcher)

    if (!services) return <div>Loading...</div>

    const srv = services.services





    return (
        <div>
            <MasterNav />
            <div className='container'>
                <div className={s.header}>
                <h1 className={s.title_h2}>Послуги</h1>
                    <Link href='serviceadd'>
                        <button>Додати послугу</button>
                    </Link>
                </div>
                <div> </div>
                <div className='serv_wrapper'>
                    {srv.map((i) => (
                        <div key={i._id} className={s.serv_inner}>
                            <div className={s.serv_item}>
                                <span className={s.serv_title}>{i.item_1.name}</span>
                                <span className={s.serv_price}>{i.item_1.price} грн</span>
                                <span className={s.serv_duration}>{i.item_1.dur} хв</span>
                            </div>
                            <div className={s.serv_item}>
                                <span className={s.serv_title}></span>
                                <span className={s.serv_price}>{i.item_1.price} грн</span>
                                <span className={s.serv_duration}>{i.item_1.dur} хв</span>
                            </div>
                            <div className={s.serv_item}>
                                <span className={s.serv_desc}>{i.about.description}</span>
                                <button className={s.remove}>Х</button>
                                <button className={s.remove}>Вибране</button>
                            </div>
                            <div className={s.images}>
                                {i.pic.map((i) => (
                                    <Image layout='responsive' objectFit='cover' width={50} height={50} key={i} src={i} alt='service' />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
