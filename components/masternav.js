import Link from 'next/link'
import Image from 'next/image'
import s from './masternav.module.css'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Avatar from './avatar'

export default function MasterNav({ path, status, avatar }) {
  const route = useRouter()
  const [showMenu, setShowMenu] = useState(0)

  function showMenuHandler(e) {
    showMenu === 0 ? setShowMenu(1) : setShowMenu(0)
  }

  const routes = [
    { link: '/user/admincalendar', label: 'Календар', logo: '/images/booking.png' },
    { link: '/user/booking', label: 'Записи', logo: '/images/cart.png' },
    { link: '/user/services', label: 'Послуги', logo: '/images/star.png' },
    { link: '/user/profile', label: 'Профіль', logo: '/images/profile.png' },
    { link: '/user', label: 'Довідка', logo: '/images/help.png' },
  ]

  return (
    <>
      <button className={s.menu_btn} onClick={showMenuHandler}>
        <Avatar h={40} w={40} src={avatar} />
      </button>
      <div className={s.master_nav} style={showMenu ? { display: 'block' } : { display: 'none' }}>
        {routes.map((i) => (
          <button key={i.label} className={s.nav_button} onClick={showMenuHandler}>
            <div className={s.logo}>
              <Image src={i.logo} width={15} height={15} alt={'logo'} />
            </div>
            <div className={s.link}>
              <Link href={i.link}>
                <a className={s.link_title}
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
            </div>
          </button>
        ))}
      </div>
    </>
  )
}
