import Head from 'next/head'
import Link from 'next/link'
import s from '../styles/landing.module.css'
import {signIn } from 'next-auth/react'


export default function Login() {

  return (
    <>
      <Head>
        <title>Каталог краси</title>
      </Head>
      <h1>Реєстрація та вхід</h1>
      <p>На даний момент доступна реєстрація через обліковий запис Google. З часом додадуться інші варіанти</p>
      <h2>Для входу натисніть кнопку Google</h2>
      
      <button className={s.button}  onClick={()=> signIn('google')} >Зареєструватись та увійти</button>
    </>
  )
}
