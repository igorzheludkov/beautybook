import Head from 'next/head'
import Link from 'next/link'
import s from '../../styles/firststeps.module.css'
import {signIn } from 'next-auth/react'
import MasterNav from '../../components/masternav'


export default function Login() {

  return (
    <>
      <Head>
        <title>Перші кроки</title>
      </Head>
      <MasterNav  />
      <h1>Перші кроки</h1>
      <h2 className={s.title_h2}>1</h2>
      <p>Заповнити профіль на вкладці Профіль</p>
      <h2 className={s.title_h2}>2</h2>
      <p>Додати послуги</p>
      <h2 className={s.title_h2}>3</h2>
      <p>Скопіювати посилання на вашу сторінку і розмістити в соц. мережах</p>
      <h2 className={s.title_h2}>4</h2>
      <p>Вирішити чи розміщуватись в каталозі майстрів</p>
      <h2 className={s.title_h2}>5</h2>
      <p>Спробувати функції онлайн-бронювання і календаря</p>

    </>
  )
}
