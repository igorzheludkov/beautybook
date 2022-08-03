import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import s from '../../styles/master.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { server } from '../../config/index'
import { getSession } from 'next-auth/react'
import { useStoreContext } from '../../context/store'

// export async function getServerSideProps(context) {
//     const session = await getSession(context)
//     const { id } = context.query
//     const res = await fetch(`${server}/api/getdata?q=${id}`, {
//         method: 'GET',
//     })
//     const user = await res.json()

//     const data = await fetch(`${server}/api/services_api?q=${session.user.email}`, {
//         method: 'GET',
//     })
//     const userInfo = await data.json()

//     return { props: { user, userInfo } }
// }

export default function MasterPage({ user, userInfo }) {
    const [store, setStore] = useStoreContext()

    const usr = store.userProfile.userData
    const serv = store.services

    console.log(usr, serv)

    function cartHandler(e) {
        setStore({ ...store, orders: [...store.orders, e.target.value] })
    }

    if (usr && serv) {
        return (
            <div className='container'>
                <div className={s.header}>
                    <div className={s.avatar_container}>
                        <div className={s.avatar_img_inner}>
                            <Image className={s.avatar_img} placeholder='blur' blurDataURL='/images/userplaceholder.png' layout='responsive' objectFit='cover' width={150} height={150} src={usr.photo ? usr.photo : '/images/userplaceholder.png'} alt='avatar' />
                        </div>
                        <div className={s.social}>
                            <Link href={usr.social_1}>
                                <a target='_blank' className='social_link'>
                                    <Image width={30} height={30} src='/images/instagram.png' alt='instagram' />
                                </a>
                            </Link>
                            <Link href={usr.social_2}>
                                <a target='_blank' className='social_link'>
                                    <Image width={30} height={30} src='/images/telegram.png' alt='instagram' />
                                </a>
                            </Link>
                            <Link href={`tel:${usr.phone}`}>
                                <a className='social_link'>
                                    <Image width={30} height={30} src='/images/phone.png' alt='instagram' />
                                </a>
                            </Link>
                        </div>
                    </div>
                    <div className={s.header_block}>
                        <div>
                            <div className={s.title}>{usr.name}</div>
                            <div className={s.title}>{usr.surname}</div>
                            <div className={s.spec}>{usr.specialization_1}</div>
                            <div className={s.spec}>{usr.specialization_2}</div>
                            <div className={s.spec}>{usr.specialization_3}</div>
                        </div>
                        <div className={s.about_me}>{usr.about_me}</div>
                    </div>
                </div>
                <div className={s.adress_info}>
                    <div className={s.info_a}>
                        <div className={s.info_a_logo}>
                            <Image width={20} height={20} src='/images/adress.png' alt='instagram' />
                        </div>
                        <div className={s.info_a_text}>
                            {usr.city}
                            <br></br>
                            {usr.street}
                            <br></br>
                            {usr.location}
                        </div>
                    </div>
                    <div className={s.info_h}>
                        <div className={s.info_h_logo}>
                            <Image width={20} height={20} src='/images/orders.png' alt='instagram' />
                        </div>
                        <div className={s.info_h_text}>
                            {usr.work_begin}-{usr.work_end}
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
                        {store.services.map((i) => (
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
                                <span className={s.serv_desc}>{i.about.description}</span>
                                <div className={s.images}>
                                    {i.pic.map((i) => (
                                        <Image layout='responsive' objectFit='cover' width={50} height={50} key={i} src={i} alt='service' />
                                    ))}
                                </div>
                                <button value={i._id} onClick={cartHandler} className={s.remove}>
                                    Додати в кошик
                                </button>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        )
    }
}
