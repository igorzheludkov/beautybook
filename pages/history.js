import Head from 'next/head'
import Link from 'next/link'
import s from '../styles/history.module.css'
import { getSession } from 'next-auth/react'
import useSWR from 'swr'
import OrdersHistoryItem from '../components/orderhistoryitem'
// import clientPromise from '../lib/mongodb'


export async function getServerSideProps(context) {
  const session = await getSession(context)
  if (!session) {
    context.res.writeHead(302, { Location: '/login' })
    context.res.end()
    return {}
  }
//   const client = await clientPromise
//   const { id } = context.query
//   const filter = id.includes('@') ? { email: id } : { _id: ObjectId(id) }
//   const filterServ = id.includes('@') ? { owner: id } : { owner_id: id }

//   try {
//     const uResponse = await client.db('beautybook').collection('user_public').findOne(filter)
//     const uData = JSON.stringify(uResponse)
//     const sResponse = await client.db('beautybook').collection('user_services').find(filterServ).toArray()
//     const uServ = JSON.stringify(sResponse)

//     return { props: { isConnected: true, user: uData, services: uServ } }
//   } catch (e) {
//     console.log(e)
//     return {
//       props: { isConnected: false },
//     }
//   }
  return {
    props: {
      user: session.user,
    },
  }
}
const fetcher = (url) => fetch(url).then((res) => res.json())

export default function OrdersHistory({ client }) {
//   const { data: bookedOrders } = useSWR(`/api/orderclient?q=${user.userData.phone}`, fetcher)
//   const { data: bookedOrders } = useSWR(`/api/orderclient?q=${user.userData.phone}`, fetcher)

//   if (!bookedOrders) return <div>Loading...</div>

  return (
    <div className='container'>
      {/* <div className={s.history_wrapper}>
        <Head>Історія ваших бронювань</Head>
        <h2 className={s.title_h2}>Мої бронювання</h2>
        {bookedOrders.orders.map((i) => (
          <OrdersHistoryItem key={i._id} order={i} />
        ))}
      </div> */}
    </div>
  )
}
