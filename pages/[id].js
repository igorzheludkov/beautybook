import { useRouter } from 'next/router'
// import { useEffect, useState } from 'react'
import s from '../styles/userpage.module.css'
import Image from 'next/image'
import Link from 'next/link'
// import { server } from '../../config/index'
// import { getSession } from 'next-auth/react'
// import { useStoreContext } from '../../context/store'
import useSWR from 'swr'
import ServiceItem from '../components/serviceitem'
// import { useSession } from 'next-auth/react'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function ServiceEdit() {
  const router = useRouter()
  // const { data: session, status } = useSession()
  const { data: user } = useSWR(router.query.id ? `/api/user/${router.query.id}` : null, fetcher)
  const { data: services } = useSWR(user ? `/api/services/${router.query.id}` : null, fetcher)
  services && console.log(services)

  // const [store, setStore] = useStoreContext()

  return user && services ? (
    <>
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
              <Link href={`tel:${user.userData.phone}`}>
                <div className={s.social_link}>
                  <a className='social_link'>
                    <Image width={30} height={30} src='/images/phone.png' alt='phone' />
                  </a>
                </div>
              </Link>
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
            <div className={s.about_me}>{user.userData.about_me}</div>
          </div>
        </div>

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
              {user.userSettings &&
                Object.values(user.userSettings).map((i) => (
                  <div key={i.id} className={s.working_days}>
                    {i.checked ? i.labelShort : null}
                  </div>
                ))}
              <div className={s.working_time}>
                {user.userData.work_begin}-{user.userData.work_end}
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className={s.services}>
        <div className='container'>
          <h1 className={s.title_h2}>Послуги</h1>
        </div>
        <div className='serv_wrapper'>
          {services.services.map((i) => (
            <ServiceItem key={i._id} data={i} user={user} />
          ))}
        </div>
      </section>
    </>
  ) : null
}
