import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import s from '../styles/master.module.css'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'
import { server } from '../config/index'
import { getSession } from 'next-auth/react'
import { useStoreContext } from '../context/store'
import { useSession } from 'next-auth/react'

export default function MasterPage({ user, userInfo }) {
    const { data: session, status } = useSession()
    const [store, setStore] = useStoreContext()



    if (!session) return <div>Для можливості бронювання послуг увійдіть будь-ласка на сайт через ваш аккаунт Google</div>

    return (
        <>
            <Head>
                <title>Ваші замовлення</title>
            </Head>
            <div className='container'>
                <h1>Ваші замовлення</h1>
            </div>
        </>
    )
}
