import s from './footer.module.css'
import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <div className={s.wrapper}>
      <div className='container'>
        <div className={s.contacts}>
          <Link href={`https://t.me/zigor535`}>
            <div className={s.social_link}>
              <a target='_blank' style={{ display: 'flex', alignItems: 'center' }}>
                <span className={s.link_title}>Адміністратор проекту</span>
                <Image width={20} height={20} src='/images/telegram.png' alt='telegram' />
                <span className={s.link_text}>zigor535</span>
              </a>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
