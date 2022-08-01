import Link from 'next/link'
import dash from '../styles/dashboard.module.css'

export default function DashNav() {
  return (
    <div>
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
    </div>
  )
}
