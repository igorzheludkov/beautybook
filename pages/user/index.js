import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { getSession } from 'next-auth/react'
import s from '../../styles/firststeps.module.css'


export async function getServerSideProps(context) {
    const session = await getSession(context)
    if (!session) {
        context.res.writeHead(302, { Location: '/login' })
        context.res.end()
        return {}
    }
    return {
        props: {
            user: session.user,
        },
    }
}

export default function OrdersHistory({ user }) {

 

    return (
        <>
      <Head>
        <title>Перші кроки</title>
      </Head>
      <div className='container'>
        <h1>Перші кроки</h1>
        <p>
          Даний проект зараз на самому початку і пишеться однією людиною🙂. Тому дуже потрібні ваші побажання
          щодо функцій, яких не вистачає та опис помилок, які виникають при роботі сайту.
        </p>
        <Link href={`https://t.me/zigor535`}>
          
            <a target='_blank' style={{ display: 'flex', alignItems: 'center', width: '125px', justifyContent: 'space-between' }}>
              Ігор{' '}
              <Image width={20} height={20} src='/images/telegram.png' alt='telegram' />
              {' '} zigor535
            </a>
         
        </Link>
        <h2 className={s.title_h2}>1</h2>
        <h4>Внесіть дані про себе на сторінці <b><Link href='/user/profile/'><a>Профіль</a></Link></b></h4>
        <p>Після збереження даних, в профілі з`явиться кнопка з посиланням на вашу сторінку.</p>
        <p>
          Також ваша сторінка буде доступною за поштовою адресою, через яку ви увійшли на сайт, наприклад{' '}
          <b><Link href='krasa.uno/500griven@gmail.com'><a>krasa.uno/500griven@gmail.com</a></Link></b>
        </p>
        <h2 className={s.title_h2}>2</h2>
        <h4>Додайте послуги на сторінці <b><Link href='/user/services/'><a>Послуги</a></Link></b></h4>
        <p>Після додавання послуг, вони з`являться на вашій сторінці</p>
        <p>Для однієї послуги доступно до трьох варіацій і 8 фотографій</p>
        <p>Найближчим часом будуть додані блоки з можливістю завантажити відгуки, сертифікати про освіту, розмістити акції.</p>
        <h2 className={s.title_h2}>3</h2>
        <h4>Вирішіть чи активовувати онлайн-бронювання</h4>
        <p>На даний час бронювання працює в базовому режимі.</p>
        <p>Навіть якщо не вмикати бронювання, доступний зручний календар для ведення записів</p>
        <h2 className={s.title_h2}>4</h2>
        <h4>Вирішіть чи розміщуватись в каталозі</h4>
        <p>
          Каталог зараз в процесі розробки. З часом буде реалізований пошук спеціалістів по містах та за професіями.
        </p>
        <p>Дані функції будуть запускатись поступово протягом найближчих двох місяців</p>
        <h2 className={s.title_h2}>5</h2>
        <h4></h4>
        <p>Про всі нові функції буде повідомлятись в кабінеті та листом на пошту. Буду вдячний за будь-які відгуки</p>
      </div>
    </>
    )
}
