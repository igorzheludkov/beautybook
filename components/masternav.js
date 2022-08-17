import Link from 'next/link'
import s from './masternav.module.css'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function MasterNav({ path, status }) {
  const route = useRouter()
  console.log(route.pathname === '/user/services')
  const active =
    route.pathname === '/user/services'
      ? {
          fontWeight: '800',
        }
      : {}

      console.log(active);

  return (
    <div className={s.master_nav}>
      <button className={s.nav_button}>
        <Link href='/user'>Головна</Link>
      </button>
      <button className={s.nav_button}>
        <Link href='/user/booking'>Бронювання</Link>
      </button>
      <button className={s.nav_button}>
        <Link  href='/user/services'><a style={route.pathname === '/user/services'
      ? {
          fontWeight: '800',
        }
      : {}}>Послуги</a></Link>
      </button>

      <button className={[`${s.nav_button} `]}>
        <Link href='/user/profile'>Профіль</Link>
      </button>
    </div>
  )
}
