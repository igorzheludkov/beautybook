import Link from 'next/link'
import s from './masternav.module.css'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function MasterNav({ path, status }) {
  const route = useRouter()


  const routes = [
    { link: '/user/admincalendar', label: 'Календар' },
    { link: '/user/booking', label: 'Записи' },
    { link: '/user/services', label: 'Послуги' },
    { link: '/user/profile', label: 'Профіль' },
    { link: '/user', label: '?' },
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
