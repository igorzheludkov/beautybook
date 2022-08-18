import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import s from '../styles/landing.module.css'
import { signIn } from 'next-auth/react'

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
        <h3>
          Подивитись як виглядає заповнений профіль можна{' '}
          <Link href='/62e6840acf4d88a22c64aeed'>
            <a style={{ color: 'blue' }}>тут</a>
          </Link>
        </h3>
        {/* <div style={{width: '100%', height: '500px'}}><Image
          layout='responsive'
          sizes="(min-width: 75em) 33vw,
          (min-width: 48em) 50vw,
          100vw"
          // objectFit='fixed'
          src='/images/first-screen.png'
          width='100'
          height='100'
          alt='first-screen'
        /></div> */}
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
      </div>
    </>
  )
}
