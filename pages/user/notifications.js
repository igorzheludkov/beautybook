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

export default function Notifications({ user, updates }) {
  console.log(updates)
  const { data: uData } = useSWR(user ? `/api/userdata?q=${user.email}` : null, fetcher)
  const token = '5738708196:AAEWAEYsyVbsW3QjXzpG-W0AaECRL1qeEqw'

  const { data: chatsList } = useSWR(`https://api.telegram.org/bot${token}/getUpdates?` ?? null, fetcher)
  const [store, setStore] = useStoreContext()

  const [message, setMessage] = useState('')
  const [chatId, setChatId] = useState('')

  useEffect(() => {
    chatsList &&
      uData &&
      setChatId(
        chatsList.result.find((i) => i.message.from.username === uData.userData.social_2).message.chat.id
      )
  }, [uData, chatsList])

  function messageHandler(e) {
    e.preventDefault(e)
    sendMessage(chatId, message, token)
  }

  async function sendMessage(c, m, t) {
    const chat = c
    const message = m
    const token = t
    const meth = 'sendMessage'
    const response = await fetch(
      `https://api.telegram.org/bot${token}/${meth}?chat_id=${chat}&text=${message}`,
      {
        method: 'POST',
        //   body: JSON.stringify({ email: user.email, userNotifications: generateBotKey }),
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
      }
    )
    const data = await response.json()
    console.log(data)
  }

  console.log(chatId)
  console.log(chatsList)

  return (
    <>
      <div className={s.bot_link}>
        <Link href='https://t.me/krasa_uno_bot'>
          <a target='_blank'>t.me/krasa_uno_bot</a>
        </Link>
      </div>
      <div className={s.message}>
        <h2>Повідомлення</h2>
      </div>
      <input value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={messageHandler}>Надіслати</button>
    </>
  )
}
