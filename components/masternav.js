import Link from 'next/link'
import s from './masternav.module.css'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function MasterNav({ path, status }) {
  const route = useRouter()
  console.log(route.pathname === '/user/services')


  const routes = [
    { link: '/user', label: 'Головна' },
    { link: '/user/booking', label: 'Бронювання' },
    { link: '/user/services', label: 'Послуги' },
    { link: '/user/profile', label: 'Профіль' },
  ]

  return (
    <div className={s.master_nav}>
      {routes.map((i) => (
        <button key={i.label} className={s.nav_button}>
          <Link href={i.link}>
            <a
              style={
                route.pathname === i.link
                  ? {
                      fontWeight: '800',
                    }
                  : {}
              }
            >
              {i.label}
            </a>
          </Link>
        </button>
      ))}
    </div>
  )
}
