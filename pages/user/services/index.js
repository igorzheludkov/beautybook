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
    console.log(srv)

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
            <div className='serv_wrapper'>
                {srv.map((i, index) => (
                    <div key={i._id} className={s.serv_inner}>
                        <div className='container'>
                            <div className={s.serv_item}>
                                <span className={s.serv_title}>
                                    {index + 1}. {i.item_1.name}
                                </span>
                                <span className={s.serv_price}>{i.item_1.price} грн</span>
                                <span className={s.serv_duration}>{i.item_1.dur} хв</span>
                            </div>
                            <div className={s.serv_item}>
                                <span className={s.serv_subtitle}>
                                    {i.item_2.name ? `${i.item_2.name}` : null}
                                </span>
                                <span className={s.serv_subprice}>
                                    {i.item_2.price ? `${i.item_2.price} грн` : null}
                                </span>
                                <span className={s.serv_subduration}>
                                    {i.item_2.dur ? `${i.item_2.dur} хв` : null}
                                </span>
                            </div>
                            <div className={s.serv_item}>
                                <span className={s.serv_subtitle}>
                                    {i.item_3.name ? `${i.item_3.name}` : null}
                                </span>
                                <span className={s.serv_subprice}>
                                    {i.item_3.price ? `${i.item_3.price} грн` : null}
                                </span>
                                <span className={s.serv_subduration}>
                                    {i.item_3.dur ? `${i.item_3.dur} хв` : null}
                                </span>
                            </div>
                            {/* <div className={s.serv_about}>
                                <span className={s.serv_desc}>{i.about.description}</span>
                            </div> */}
                        </div>
                        <div className={s.images}>
                            <div className={s.images_wrapper}>
                                {i.pic.map((i) => (
                                    <div key={i} className={s.images_container}>
                                        <Image
                                            style={{ borderRadius: '10px' }}
                                            layout='responsive'
                                            objectFit='cover'
                                            width={50}
                                            height={50}
                                            src={i}
                                            alt='service'
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button className={s.remove}>
                            <Link href={`/user/services/${i._id}`}>
                                <a>Редагувати</a>
                            </Link>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}
