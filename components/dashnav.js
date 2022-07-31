import Link from 'next/link'
import dash from '../styles/dashboard.module.css'

export default function DashNav({ source }) {
  return (
    <div>
      {source === 'user' && (
        <>
          <div>
            <button className={dash.nav_button}>
              <Link href='/user'>Профіль клієнта</Link>
            </button>
            <button className={dash.nav_button}>
              <Link href='/master'>Профіль майстра</Link>
            </button>
          </div>
        </>
      )}
      {source === 'master' && (
        <>
          <div>
            <button className={dash.nav_button}>
              <Link href='/user'>Профіль клієнта</Link>
            </button>
            <button className={dash.nav_button}>
              <Link href='/master'>Профіль майстра</Link>
            </button>
          </div>
          <div>
            <button className={dash.nav_sub_button}>
              <Link href='/user'>Панель</Link>
            </button>
            <button className={dash.nav_sub_button}>
              <Link href='/master'>Бронювання</Link>
            </button>
            <button className={dash.nav_sub_button}>
              <Link href='/master'>Послуги</Link>
            </button>
            <button className={dash.nav_sub_button}>
              <Link href='/master'>Акції</Link>
            </button>
            <button className={dash.nav_sub_button}>
              <Link href='/master'>Відгуки</Link>
            </button>
            <button className={dash.nav_sub_button}>
              <Link href='/master'>Сертифікати</Link>
            </button>
            <button className={dash.nav_sub_button}>
              <Link href='/master/personal-page'>Особиста інформація</Link>
            </button>
          </div>
        </>
      )}
    </div>
  )
}
