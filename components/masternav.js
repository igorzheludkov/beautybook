import Link from 'next/link'
import dash from '../styles/dashboard.module.css'
import { useRouter } from 'next/router'


export default function MasterNav({ path, status }) {

  const route = useRouter()
  console.log(path);

  const menuItems = [
    {title: 'Панель', url: '/user'},
    {title: 'Бронювання', url: '/brn'},
    {title: 'Послуги', url: '/poslugi'},
    {title: 'Акції', url: '/akcii'},
    {title: 'Відгуки', url: '/vidguku'},
    {title: 'Сертифікати', url: '/sertif'},
    {title: 'Профіль', url: '/profile'},
  ]
  return (
  
    
        
        <div className={dash.masterNav}>
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
          <button className={[`${dash.nav_sub_button} ${status}`]}>
            <Link href={`${path}profile`}>Особиста інформація</Link>
          </button>
        </div>
    
   
  )
}
