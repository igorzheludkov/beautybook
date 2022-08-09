import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import s from '../../styles/master.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { server } from '../../config/index'
import { getSession } from 'next-auth/react'
import { useStoreContext } from '../../context/store'
import useSWR from 'swr'
import ServiceItem from '../../components/serviceitem'
import { useSession } from 'next-auth/react'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function MasterPage() {
    const { data: session, status } = useSession()

    const [store, setStore] = useStoreContext()

    const router = useRouter()

    const { data: user } = useSWR(session ? `/api/user/${session.user.email}` : null, fetcher)
    const { data: services } = useSWR(session ? `/api/services/${session.user.email}` : null, fetcher)

    return user && services ? (
        <div className='container'>
            {user.userData.name}
            <div className={s.header}>
                <div className={s.avatar_container}>
                    <div className={s.avatar_img_inner}>
                        <Image className={s.avatar_img} placeholder='blur' blurDataURL='/images/userplaceholder.png' layout='responsive' objectFit='cover' width={150} height={150} src={user.userData.photo ? user.userData.photo : '/images/userplaceholder.png'} alt='avatar' />
                    </div>
                    <div className={s.social}>
                        <Link href={user.userData.social_1}>
                            <a target='_blank' className='social_link'>
                                <Image width={30} height={30} src='/images/instagram.png' alt='instagram' />
                            </a>
                        </Link>
                        <Link href={user.userData.social_2}>
                            <a target='_blank' className='social_link'>
                                <Image width={30} height={30} src='/images/telegram.png' alt='instagram' />
                            </a>
                        </Link>
                        <Link href={`tel:${user.userData.phone}`}>
                            <a className='social_link'>
                                <Image width={30} height={30} src='/images/phone.png' alt='instagram' />
                            </a>
                        </Link>
                    </div>
                </div>
                <div className={s.header_block}>
                    <div>
                        <div className={s.title}>{user.userData.name}</div>
                        <div className={s.title}>{user.userData.surname}</div>
                        <div className={s.spec}>{user.userData.specialization_1}</div>
                        <div className={s.spec}>{user.userData.specialization_2}</div>
                        <div className={s.spec}>{user.userData.specialization_3}</div>
                    </div>
                    <div className={s.about_me}>{user.userData.about_me}</div>
                </div>
            </div>
            <div className={s.adress_info}>
                <div className={s.info_a}>
                    <div className={s.info_a_logo}>
                        <Image width={20} height={20} src='/images/adress.png' alt='adress' />
                    </div>
                    <div className={s.info_a_text}>
                        {user.userData.city}
                        <br></br>
                        {user.userData.street}
                        <br></br>
                        {user.userData.location}
                    </div>
                </div>
                <div className={s.info_h}>
                    <div className={s.info_h_logo}>
                        <Image width={20} height={20} src='/images/orders.png' alt='instagram' />
                    </div>
                    <div className={s.info_h_text}>
                        {user.userData.work_begin}-{user.userData.work_end}
                    </div>
                </div>
                <div className={s.info_b}>
                    <div className={s.info_b_logo}>
                        <Image width={20} height={20} src='/images/bookmarks.png' alt='instagram' />
                    </div>
                    <div className={s.info_b_text}>Додати в закладки</div>
                </div>
            </div>
            <section className={s.services}>
                <h1 className={s.title_h2}>Послуги</h1>
                <div className='serv_wrapper'>
                    {services.services.map((i) => (
                        <ServiceItem key={i._id} data={i} user={user} />
                    ))}
                </div>
            </section>
        </div>
    ) : null
}
