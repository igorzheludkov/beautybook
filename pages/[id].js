
import s from '../styles/id.module.css'
import Image from 'next/image'
import Link from 'next/link'
import clientPromise from '../lib/mongodb'
// import { server } from '../../config/index'
// import { getSession } from 'next-auth/react'
// import { useStoreContext } from '../../context/store'
import useSWR from 'swr'
import ServiceItem from '../components/serviceitem'
// import { useSession } from 'next-auth/react'

const fetcher = (url) => fetch(url).then((res) => res.json())
// const { MongoClient, ObjectId } = require('mongodb')
import { ObjectId } from 'mongodb'
// const url = process.env.MONGODB_URI
// const client = new MongoClient(url)

export async function getServerSideProps(context) {
  const client = await clientPromise
  await client.connect()
  const { id } = context.query
  console.log(context);
  const filter = id.includes('@') ? { email: id } : { _id: ObjectId(id) }
  const filterServ = id.includes('@') ? { owner: id } : { owner_id: id }

  try {
    const uResponse = await client.db('beautybook').collection('user_public').findOne(filter)
    const uData = JSON.stringify(uResponse)
    const sResponse = await client.db('beautybook').collection('user_services').find(filterServ).toArray()
    const uServ = JSON.stringify(sResponse)
    // await client.close()
    return { props: { isConnected: true, user: uData, services: uServ } }
  } catch (e) {
    return {
      props: { isConnected: false },
    }
  }
}

export default function UserPage(props) {
  const user = JSON.parse(props.user)
  const services = JSON.parse(props.services)
  const { data: bookedOrders } = useSWR(user.email ? `/api/bookedtime?q=${user.email}` : null, fetcher)



  return (
    <>
      <div className={s.main_wrapper}>
        <div className={s.sidebar_left}>
          <div className='container'>
            <div className={s.header}>
              <div className={s.avatar_container}>
                <div className={s.avatar_img_inner}>
                  <Image
                    className={s.avatar_img}
                    placeholder='blur'
                    blurDataURL='/images/userplaceholder.png'
                    layout='responsive'
                    objectFit='cover'
                    width={150}
                    height={150}
                    src={user.userData.photo ? user.userData.photo : '/images/userplaceholder.png'}
                    alt='avatar'
                  />
                  {/* <div className={s.bookmark_add}>
                <Image width={20} height={20} src='/images/bookmarks.png' alt='instagram' />
              </div> */}
                </div>
              </div>
              <div className={s.header_block}>
                <div className={s.header_name}>
                  <div className={s.title}>{user.userData.name}</div>
                  <div className={s.title}>{user.userData.surname}</div>
                  <div className={s.spec_wrapper}>
                    {user.userData.categories.map((i) => (
                      <div key={i} className={s.spec}>
                        {i}
                      </div>
                    ))}
                  </div>
                </div>
                <div className={s.social}>
                  {user.userData.social_1 && (
                    <Link href={`https://www.instagram.com/${user.userData.social_1}`}>
                      <div className={s.social_link}>
                        <a target='_blank' className='social_link'>
                          <Image width={30} height={30} src='/images/instagram.png' alt='instagram' />
                        </a>
                      </div>
                    </Link>
                  )}
                  {user.userData.social_2 && (
                    <Link href={`https://t.me/${user.userData.social_2}`}>
                      <div className={s.social_link}>
                        <a target='_blank' className='social_link'>
                          <Image width={30} height={30} src='/images/telegram.png' alt='telegram' />
                        </a>
                      </div>
                    </Link>
                  )}
                  {user.userData.social_3 && (
                    <Link href={`viber://chat?number=%2B${user.userData.social_3}`}>
                      <div className={s.social_link}>
                        <a className='social_link'>
                          <Image width={30} height={30} src='/images/viber.png' alt='viber' />
                        </a>
                      </div>
                    </Link>
                  )}
                  {user.userData.phone && (
                    <Link href={`tel:${user.userData.phone}`}>
                      <div className={s.social_link}>
                        <a className='social_link'>
                          <Image width={30} height={30} src='/images/phone.png' alt='phone' />
                        </a>
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            </div>
            <div className={s.about_me}>{user.userData.about_me}</div>

            <div className={s.adress_info}>
              <div className={s.adress}>
                <div className={s.adress_logo}>
                  <Image width={20} height={20} src='/images/adress.png' alt='adress' />
                </div>
                <div className={s.adress_text}>
                  {user.userData.city}
                  <br></br>
                  {user.userData.street}
                  <br></br>
                  {user.userData.location}
                </div>
              </div>
              <div className={s.work_time}>
                <div className={s.work_time_logo}>
                  <Image width={20} height={20} src='/images/orders.png' alt='instagram' />
                </div>
                <div className={s.daytime}>
                  <div className={s.working_hours}>
                    {user.userData.work_begin}-{user.userData.work_end}
                  </div>
                  {user.userSettings &&
                    Object.values(user.userSettings).map((i) => (
                      <div key={i.id} className={s.working_days}>
                        {i.checked ? i.labelShort : null}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className={s.services}>
          <div className='container'>
            <h1 className={s.title_h2}>??????????????</h1>
          </div>
          <div className='serv_wrapper'>
            {services.map((i) => (
              <ServiceItem key={i._id} data={i} user={user} bookedOrders={bookedOrders} />
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
