import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout'
import s from '../styles/login.module.css'

export default function Login() {
  return (
    <>
      <Head>
        <title>Login page</title>
      </Head>
      <h1>Реєстрація</h1>
      <form className={s.form}>
        <input className={s.input} type='text' placeholder='+380' />
        <input
          className={s.input}
          type='password'
          placeholder='Придумайте пароль'
        />
        <input className={s.button} type='submit' />
      </form>
    </>
  )
}
