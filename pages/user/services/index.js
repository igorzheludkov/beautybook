import { useStoreContext } from '../../../context/store'
import Head from 'next/head'
import Link from 'next/link'
import { getSession } from 'next-auth/react'
import MasterNav from '../../../components/masternav'
import s from '../../../styles/services.module.css'
import useSWR from 'swr'
import ServiceItem from '../../../components/serviceitem'

export async function getServerSideProps(context) {
  const session = await getSession(context)
  if (!session) {
    context.res.writeHead(302, { Location: '/login' })
    context.res.end()
    return {}
  }

  return {
    props: {
      user: session.user,
    },
  }
}
const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Services({ user, data }) {
  const { data: services } = useSWR(user ? `/api/services/${user.email}` : null, fetcher)

  if (!services) return <div>Loading...</div>

  const srv = services.services

  return (
    <div>
      <MasterNav />
      <div className='container'>
        <div className={s.header}>
          <h1 className={s.title_h2}>Послуги</h1>
          <Link href='/user/services/serviceadd'>
            <button className={s.addserv}>Додати послугу</button>
          </Link>
        </div>
      </div>
      {srv.map((i) => (
        <ServiceItem key={i._id} data={i} adminPanel={true} />
      ))}
    </div>
  )
}
