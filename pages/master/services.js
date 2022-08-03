import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { getSession } from 'next-auth/react'
import DashNav from '../../components/dashnav'
import MasterNav from '../../components/masternav'
import dash from '../../styles/dash.module.css'
import s from '../../styles/services_page_admin.module.css'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Script from 'next/script'
import Cloudinary from '../../lib/cloudinary'
import { server } from '../../config/index'
import ScrollBox from '../../components/scrollbox'

export default function PersonalPage({ user, data }) {
  const serv = data.result[0]
  console.log(serv)

  return (
    <div>
      <DashNav />
      <MasterNav />
      <div className='container'>
        <div className={s.header}>
          <h1 className='title'>Послуги</h1>
          <Link href='serviceadd'>
            <button>Додати послугу</button>
          </Link>
        </div>
        <div> </div>
        <div className='serv_wrapper'>
          <div className={s.serv_item}>
            <span className={s.serv_label}>Назва послуги</span>
            <span className={s.serv_label}>Варт.</span>
            <span className={s.serv_label}>Тривал.</span>
          </div>
          <div className={s.serv_inner}>
            <div className={s.serv_item}>
              <span className={s.serv_title}>{serv.item_1.name}</span>
              <span className={s.serv_price}>{serv.item_1.price} грн</span>
              <span className={s.serv_duration}>{serv.item_1.dur} хв</span>
            </div>
            <div className={s.serv_item}>
              <span className={s.serv_title}></span>
              <span className={s.serv_price}>{serv.item_1.price} грн</span>
              <span className={s.serv_duration}>{serv.item_1.dur} хв</span>
            </div>
            <div className={s.serv_item}>
              <span className={s.serv_title}>{serv.about.description}</span>
              <button className={s.remove}>Х</button>
              <button className={s.remove}>Вибране</button>
            </div>
            <div className={s.images}>
              {serv.pic.map((i) => (
                <Image layout='responsive' objectFit='cover' width={50} height={50} key={i} src={i} alt='service' />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  if (!session) {
    context.res.writeHead(302, { Location: '/login' })
    context.res.end()
    return {}
  }
  const res = await fetch(`${server}/api/services_api?q=${session.user.email}`, {
    method: 'GET',
  })
  const serv = await res.json()
  return {
    props: {
      user: session.user,
      data: serv,
    },
  }
}
