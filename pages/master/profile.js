import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { getSession } from 'next-auth/react'
import DashNav from '../../components/dashnav'
import MasterNav from '../../components/masternav'
import dash from '../../styles/dash.module.css'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Script from 'next/script'
import Cloudinary from '../../lib/cloudinary'

export default function PersonalPage() {
  const { data: session, status } = useSession()
  const [userPublic, setUserPublic] = useState('0')
  const [form, setForm] = useState({
    photo: '',
    about_me: '',
    city: '',
    email: '',
    location: '',
    name: '',
    phone: '',
    social_1: '',
    social_2: '',
    specialization_1: '',
    specialization_2: '',
    specialization_3: '',
    street: '',
    surname: '',
    work_begin: '',
    work_end: '',
  })
  const [avatar, setAvatar] = useState('')

  console.log(avatar)
  console.log(form)

  useEffect(() => {
    if (session?.user.email) {
      fetch(`/api/userdata?q=${session.user.email}`, {
        method: 'GET',
      })
        .then((res) => res.json())
        .then((data) => {
          if (data === null) {
            console.log('new user')
            newUser()
          } else {
            setUserPublic(data)
            setForm(data.userData)
            console.log('registered user')
          }
        })
    }
  }, [session])

  async function newUser() {
    const response = await fetch('/api/userdata', {
      method: 'PUT',
      body: JSON.stringify({ email: session.user.email, userData: form }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
  }

  function inputHandler(e) {
    let key = e.target.id
    setForm({ ...form, [key]: e.target.value })
  }

  async function buttonHandler(e) {
    e.preventDefault(e)
    const response = await fetch('/api/userdata', {
      method: 'POST',
      body: JSON.stringify({ email: session.user.email, userData: form }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    console.log('Sended')
  }

  function avatarHandler(result) {
    setAvatar(result)
    setForm(() => ({ ...form, photo: result.secure_url }))
  }

  const personalInfo = [
    { id: 'name', tp: 'text', vl: 'Ваше ім`я' },
    { id: 'phone', tp: 'text', vl: 'Ваше номер телефону' },
    { id: 'surname', tp: 'text', vl: 'Ваше прізвище' },
    { id: 'solial_1', tp: 'text', vl: 'Ваш акаунт в instagram' },
    { id: 'solial_2', tp: 'text', vl: 'Ваш акаунт в telegram' },
    { id: 'spec_1', tp: 'text', vl: 'Ваша основна спеціальність' },
    { id: 'spec_2', tp: 'text', vl: 'Ваша додаткова спеціальність' },
    { id: 'spec_3', tp: 'text', vl: 'Ваша додаткова спеціальність' },
    { id: 'about_me', tp: 'text', vl: 'Розкажіть трохи про себе' },
    { id: 'city', tp: 'text', vl: 'Ваше місто' },
    { id: 'street', tp: 'text', vl: 'Вулиця' },
    { id: 'location', tp: 'text', vl: 'Будівля або салон для орієнтиру' },
    { id: 'work_begin', tp: 'text', vl: 'О котрій годині починаєте працювати?' },
    { id: 'work_end', tp: 'text', vl: 'Коли закінчуєте робочий день?' },
  ]

  return (
    <>
      <Head>
        <title>Персональна сторінка</title>
      </Head>
      <Script src='https://upload-widget.cloudinary.com/global/all.js' strategy='afterInteractive' />

      <DashNav />
      <MasterNav path='/' status='active_tab' />

      <div className={dash.link}>
        <Link href={`/catalog/${userPublic?._id}`}>
          <a>Відкрити вашу сторінку</a>
        </Link>
      </div>
      <Cloudinary uploadHandler={avatarHandler} />
      <div className={dash.avatar_container}>
        <Image
          className={dash.avatar_img}
          placeholder='blur'
          blurDataURL='iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAQAAAAnOwc2AAAAEUlEQVR42mPcX8+AARiHsiAAjvgMd/AF3igAAAAASUVORK5CYII='
          layout='responsive'
          objectFit='cover'
          width={150}
          height={150}
          src={form.photo ? form.photo : '/images/userplaceholder.png'}
          alt='avatar'
        />
      </div>

      {personalInfo?.map((i) => (
        <span className={dash.input_item} key={i.id}>
          <label className={dash.label} htmlFor={i.id}>
            {i.vl}
          </label>
          <input className={dash.input_text} id={i.id} value={form[i.id]} onChange={inputHandler} type={i.tp} />
        </span>
      ))}

      <button onClick={buttonHandler} className={dash.submit_btn}>
        Зберегти
      </button>
    </>
  )
}

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
