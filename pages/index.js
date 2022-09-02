import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import s from '../styles/landing.module.css'
import { signIn } from 'next-auth/react'
import Catalog from './catalog'

export default function Landing() {
  return (
    <>
      <Head>
        <title>Каталог краси</title>
      </Head>
      <div className='container'>
        <Image src='/images/site.png' width={80} height={80} alt='personal site' />
        <h2 className={s.title_h2}>Персональний міні-сайт</h2>
        <Image src='/images/booking.png' width={80} height={80} alt='personal site' />
        <h2 className={s.title_h2}>Інтуїтивна система онлайн-бронювання</h2>
        <Image src='/images/profile.png' width={80} height={80} alt='personal site' />
        <h2 className={s.title_h2}>Публікація в каталозі спеціалістів</h2>
        <h4>Подивитись як виглядають заповнені сторінки спеціалістів можна нижче</h4>
        <Catalog />

        <br></br>

        <button
          className={s.button}
          onClick={() =>
            signIn('google', {
              callbackUrl: `/user/firststeps`,
            })
          }
        >
          Зареєструватись та увійти
        </button>
        <br></br>
        <br></br>
      </div>
    </>
  )
}
