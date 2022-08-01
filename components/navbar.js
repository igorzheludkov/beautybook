import Image from 'next/image'
import Link from 'next/link'
import s from './navbar.module.css'
import { signIn, signOut, useSession } from 'next-auth/react'

export default function Navbar() {
  const { data: session, status } = useSession()
  const loading = status === 'loading'

  return (
    <div className={s.wrapper}>
      <div>
        <Link href='/'>
          <a>
            <div className={s.logo_wrapper}>
              <Image className={s.logo} src='/images/logo.png' width={40} height={40} alt='logo' />
              <span className={s.title}>каталог краси</span>
            </div>
          </a>
        </Link>
      </div>
      <div className={s.navButtons}>
        <Image className={s.bookmarks} src='/images/bookmarks.png' width={30} height={30} alt='logo' />
        <Image className={s.orders} src='/images/orders.png' width={30} height={30} alt='logo' />
        {!session && (
          <>
            <div className={s.login_wrapper}>
              <span className={s.login_title}>
                <a
                  href={`/api/auth/signin`}
                  onClick={(e) => {
                    e.preventDefault()
                    signIn()
                  }}
                >
                  Увійти
                </a>
              </span>
              <Image className={[s.login_image, s.logo]} src='/images/userplaceholder.png' width={40} height={40} alt='logo' />
            </div>
          </>
        )}
        {session?.user && (
          <>
            <div className={s.login_wrapper}>
              <span className={s.login_title}>
                <a
                  href={`/api/auth/signout`}
                  onClick={(e) => {
                    e.preventDefault()
                    signOut()
                  }}
                >
                  Вийти
                </a>
              </span>
              <Link href='/user'>
                <a className={s.link}>
                  <Image width={50} height={50} className={s.login_image} src={session.user.image} alt='logo' />
                </a>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
