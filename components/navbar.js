import Image from 'next/image'
import Link from 'next/link'
import s from './navbar.module.css'
import { signIn, signOut, useSession, getSession, getProviders } from 'next-auth/react'
import { useStoreContext } from '../context/store'
import MasterNav from './masternav'

export async function getServerSideProps(context) {
  return {
    props: {
      //Why: To check if the user logged-in or not, get the session and pass it to Home component
      session: await getSession(context),
    },
  }
}

export default function Navbar() {
  const [store, setStore] = useStoreContext()
  const { data: session, status } = useSession()
  const loading = status === 'loading'

  return (
    <div className={s.wrapper}>
      <div className={s.logo}>
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
        {/* <div className={s.orders_container}>
          <span className={s.counter}>{store.orders.length}</span>
          <Link href='/bookmarks'>
            <a>
              <Image className={s.orders} src='/images/bookmarks.png' width={25} height={25} alt='logo' />
            </a>
          </Link>
        </div> */}
        <div className={s.orders_container}>
          {/* <span className={s.counter}>{store.orders.length}</span> */}
          <Link href='/user/calendar'>
            <a style={!session ? {pointerEvents: 'none'} : {}}>
              <Image className={s.orders} src='/images/booking.png' width={25} height={25} alt='logo' />
            </a>
          </Link>
        </div>
        {/* <div className={s.orders_container}>
          {store.orders?.length ? <span className={s.counter}>{store.orders.length}</span> : ''}
          <Link href='/orders'>
            <a>
              <Image className={s.orders} src='/images/cart.png' width={25} height={25} alt='logo' />
            </a>
          </Link>
        </div> */}
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
              <Image
                className={[s.login_image, s.logo]}
                src='/images/userplaceholder.png'
                width={40}
                height={40}
                alt='logo'
              />
            </div>
          </>
        )}
        {session?.user && (
          <>
            <div className={s.login_wrapper}>
              <MasterNav avatar={session.user.image} />
              
            </div>
          </>
        )}
      </div>
    </div>
  )
}
