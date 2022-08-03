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


export async function getServerSideProps(context) {
    const session = await getSession(context)
    if (!session) {
        context.res.writeHead(302, { Location: '/login' })
        context.res.end()
        return {}
    }
    const res = await fetch(`${server}/api/services_api?q=${session.user.email}`, {
        method: 'GET',
    })
    const serv = await res.json()
    return {
        props: {
            user: session.user,
            data: serv,
        },
    }
}

export default function Services({ user, data }) {
    const [store, setStore] = useStoreContext()

    const userProfile = store.userProfile.userData
    const services = store.services

    const serv = data

    return (
        <div>
            <DashNav />
            <MasterNav />
            <div className='container'>
                <div className={s.header}>
                    <h1 className='title'>Послуги</h1>
                    <Link href='serviceadd'>
                        <button>Додати послугу</button>
                    </Link>
                </div>
                <div> </div>
                <div className='serv_wrapper'>
                    {services.map((i) => (
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
