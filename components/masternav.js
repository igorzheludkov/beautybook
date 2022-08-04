import Link from 'next/link'
import dash from '../styles/dash.module.css'
import { useRouter } from 'next/router'

export default function MasterNav({ path, status }) {
    const route = useRouter()

    const menuItems = [
        { title: 'Панель', url: '/user' },
        { title: 'Бронювання', url: '/brn' },
        { title: 'Послуги', url: '/poslugi' },
        { title: 'Акції', url: '/akcii' },
        { title: 'Відгуки', url: '/vidguku' },
        { title: 'Сертифікати', url: '/sertif' },
        { title: 'Профіль', url: '/profile' },
    ]
    return (
        <div className={dash.masterNav}>
            <button className={dash.nav_sub_button}>
                <Link href=''>Панель</Link>
            </button>
            <button className={dash.nav_sub_button}>
                <Link href='/master/booking'>Бронювання</Link>
            </button>
            <button className={dash.nav_sub_button}>
                <Link href='/master/services'>Послуги</Link>
            </button>

            <button className={[`${dash.nav_sub_button} ${status}`]}>
                <Link href='/master/profile'>Особиста інформація</Link>
            </button>
        </div>
    )
}
