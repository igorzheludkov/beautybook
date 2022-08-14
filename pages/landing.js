import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import s from '../styles/landing.module.css'
import { signIn } from 'next-auth/react'

export default function Login() {
  return (
    <>
      <Head>
        <title>Каталог краси</title>
      </Head>
      <div className='container'>
        <h1>Каталог Краси</h1>
        <Image src='/images/site.png' width={100} height={100} alt='personal site' />
        <h2 className={s.title_h2}>Персональний міні-сайт</h2>
        <Image src='/images/booking.png' width={100} height={100} alt='personal site' />
        <h2 className={s.title_h2}>Інтуїтивна система онлайн-бронювання</h2>
        <Image src='/images/profile.png' width={100} height={100} alt='personal site' />
        <h2 className={s.title_h2}>Публікація в каталозі спеціалістів</h2>
      <button className={s.button} onClick={() => signIn('google')}>
        Зареєструватись та увійти
      </button>
      </div>
    </>

  )
}
