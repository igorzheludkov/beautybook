import Link from 'next/link'
import s from './masternav.module.css'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function MasterNav({ path, status }) {
  const route = useRouter()

  return (
    <div className={s.master_nav}>
      <button className={s.nav_button}>
        <Link href='/user'>Головна</Link>
      </button>
      <button className={s.nav_button}>
        <Link href='/user/booking'>Бронювання</Link>
      </button>
      <button className={s.nav_button}>
        <Link href='/user/services'>Послуги</Link>
      </button>

      <button className={[`${s.nav_button} `]}>
        <Link href='/user/profile'>Профіль</Link>
      </button>
      <button className={[`${s.nav_button} `]}>
        <Link href='/user/firststeps'>Перші кроки</Link>
      </button>
    </div>
  )
}
