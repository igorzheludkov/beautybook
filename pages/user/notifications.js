import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import s from '../../styles/firststeps.module.css'
import { signIn } from 'next-auth/react'
import { getSession } from 'next-auth/react'
import { useStoreContext } from '../../context/store'
import { useState, useEffect } from 'react'
import useSWR, { useSWRConfig } from 'swr'

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

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Notifications({ user }) {
  return (
    <>
      <div className='container'>
        <h2>Підключення сповіщень у telegram</h2>
        <p>
          Для підключення сповіщень у telegram необхідно додати свій нікнейм в телеграмі, потім перейти в бот за посиланням нижче і
          натиснути кнопку /start
        </p>
        <button className={s.bot_link}>
          <Link href='https://t.me/krasa_uno_bot'>
            <a target='_blank'>t.me/krasa_uno_bot</a>
          </Link>
        </button>
        <p></p>
        <div className={s.message}>
          <p>Тепер можна активувати функцію бронювання, після чого прийде сповіщення про успішну активацію.</p>
          <p>Якщо сповіщення не прийшло, потрібно вимкнути і увімкнути знову функцію бронювання.</p>
        </div>
      </div>
    </>
  )
}
