import s from './layout.module.css'
import Head from 'next/head'
import Navbar from './navbar'
import useSWR, { useSWRConfig } from 'swr'
import { useStoreContext } from '../context/store'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Layout({ children }) {
  const { data: session, status } = useSession()
  const [store, setStore] = useStoreContext()
  const { data: uData } = useSWR(session ? `/api/userdata?q=${session.user.email}` : null, fetcher)
  const { data: services } = useSWR(session ? `/api/services/${session.user.email}` : null, fetcher)

  useEffect(() => {
      setStore({ ...store, masterInfo: uData })
  }, [uData])
  useEffect(() => {
      setStore({ ...store, services: services })
  }, [services])
  

  return (
    <>
      <Head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
        />
      </Head>
      <div className={s.container}>
        <Navbar />
        <div className='padding-top'></div>
        <div className={s.content_wrapper}>{children}</div>
      </div>
    </>
  )
}

