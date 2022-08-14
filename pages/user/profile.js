import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { getSession } from 'next-auth/react'
import MasterNav from '../../components/masternav'
import s from '../../styles/profile.module.css'
import { useState, useEffect } from 'react'
import Script from 'next/script'
import Cloudinary from '../../lib/cloudinary'
import { server } from '../../config/index'
import ScrollBox from '../../components/scrollbox'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function PersonalPage({ user, data }) {
  const router = useRouter()
  console.log(router)
  console.log(user.email)
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
    categories: [],
    street: '',
    surname: '',
    work_begin: '',
    work_end: '',
    interval: 10,
    horizon: 3,
    url: '',
    work_days: '',
  })
  const [avatar, setAvatar] = useState('')

  const categories = data.categories

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

  function checkboxToggle(e) {
    if (form.categories) {
      e.target.checked
        ? setForm({ ...form, categories: [...form.categories, e.target.value] })
        : setForm({ ...form, categories: form.categories.filter((i) => i !== e.target.value) })
    } else {
      setForm({ ...form, categories: [e.target.value] })
    }
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
  const profileNamePhone = [
    { id: 'name', tp: 'text', vl: 'Ваше ім`я' },
    { id: 'surname', tp: 'text', vl: 'Ваше прізвище' },
    { id: 'phone', tp: 'text', vl: 'Ваш номер телефону' },
  ]
  const social = [
    { id: 'social_1', tp: 'text', vl: 'Ваш нікнейм в instagram', icon: '/images/instagram.png' },
    { id: 'social_2', tp: 'text', vl: 'Ваш нікнейм в telegram', icon: '/images/telegram.png' },
  ]
  const aboutMe = {
    id: 'about_me',
    tp: 'text',
    vl: 'Розкажіть коротко про себе. Це речення буде на головній сторінці біля фото',
    icon: '/images/profile.png',
  }
  const workplace = [
    { id: 'city', tp: 'text', vl: 'Ваше місто', icon: '/images/adress.png' },
    { id: 'street', tp: 'text', vl: 'Вулиця', icon: '/images/adress.png' },
    { id: 'location', tp: 'text', vl: 'Будівля або салон для орієнтиру', icon: '/images/adress.png' },
  ]
  const personalInfo = [
    { id: 'work_begin', tp: 'text', vl: 'О котрій годині починаєте працювати?' },
    { id: 'work_end', tp: 'text', vl: 'Коли закінчуєте робочий день?' },
    { id: 'interval', tp: 'text', vl: 'Скільки хвилин має бути перерва між прийомом клієнтів?' },
    { id: 'horizon', tp: 'text', vl: 'На скільки місяців наперед можуть записуватись люди?' },
    { id: 'work_days', tp: 'text', vl: 'Вкажіть робочі дні' },
  ]

  if (!form) return <div>Loading...</div>

  return (
    <>
      <Head>
        <title>Налаштування персональних даних</title>
      </Head>
      <Script src='https://upload-widget.cloudinary.com/global/all.js' strategy='afterInteractive' />

      <MasterNav path='/' status='active_tab' />

      <div className='container'>
        <div className={s.profile_nav}>
          <button className={s.nav_button}>
            <Link href={`/catalog/${user.email}`}>
              <a>Відкрити вашу сторінку</a>
            </Link>
          </button>
          <button className={s.nav_button}>
            <Link href='/api/auth/signout'>
              <a
                onClick={(e) => {
                  e.preventDefault()
                  signOut()
                }}
              >
                Вийти з системи
              </a>
            </Link>
          </button>
        </div>

        <div className={s.header}>
          <div className={s.avatar_container}>
            <Image
              className={s.avatar_img}
              layout='responsive'
              objectFit='cover'
              width={150}
              height={150}
              src={form.photo ? form.photo : '/images/userplaceholder.png'}
              alt='avatar'
            />
            <Cloudinary uploadHandler={avatarHandler} multiple={false} />
          </div>

          <div className={s.name_wrapper}>
            {profileNamePhone?.map((i) => (
              <div className={s.name_container} key={i.id}>
                <span className={s.input_item}>
                  <input
                    className={s.input_text}
                    id={i.id}
                    value={form[i.id]}
                    onChange={inputHandler}
                    type={i.tp}
                    placeholder={i.vl}
                  />
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className={s.social_wrapper}>
          {social?.map((i) => (
            <div className={s.social_container} key={i.id}>
              <Image src={i.icon} width={20} height={20} alt='social profile' />
              <span className={s.input_item}>
                <input
                  className={s.input_text}
                  id={i.id}
                  value={form[i.id]}
                  onChange={inputHandler}
                  type={i.tp}
                  placeholder={i.vl}
                />
              </span>
            </div>
          ))}
        </div>
        <div className={s.scrollbox_wrapper}>
          <p className={s.paragraph}>Виділіть ваші навики</p>
          <ScrollBox data={categories} checkboxToggle={checkboxToggle} checkStatus={form.categories} />
        </div>
        <div className={s.aboutme_wrapper}>
          <div className={s.aboutme_container}>
            <Image src={aboutMe.icon} width={20} height={20} alt='social profile' />
            <span className={s.input_item}>
              <textarea
                placeholder={aboutMe.vl}
                className={s.aboutme_input}
                id={aboutMe.id}
                value={form[aboutMe.id]}
                onChange={inputHandler}
                type={aboutMe.tp}
              />
            </span>
          </div>
        </div>

        <h4>Додайте робочу адресу</h4>
        <div className={s.workplace_wrapper}>
          {workplace?.map((i) => (
            <div className={s.social_container} key={i.id}>
              <Image src={i.icon} width={20} height={20} alt='social profile' />
              <span className={s.input_item}>
                <input
                  className={s.input_text}
                  id={i.id}
                  value={form[i.id]}
                  onChange={inputHandler}
                  type={i.tp}
                  placeholder={i.vl}
                />
              </span>
            </div>
          ))}
        </div>
        <h4>Додайте ваш графік роботи</h4>
        
        <div className={s.worktime_wrapper}>
          {personalInfo?.map((i) => (
            <div className={s.worktime_container} key={i.id}>
              <span className={s.input_item}>
                <label className={s.label} htmlFor={i.id}>
                  {i.vl}
                </label>
                <input
                  className={s.input_text}
                  id={i.id}
                  value={form[i.id]}
                  onChange={inputHandler}
                  type={i.tp}
                />
              </span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ height: '150px', width: '100%', display: 'flex' }}>
        <button style={{ width: '100px', margin: 'auto' }} onClick={buttonHandler} className={s.submit_btn}>
          Зберегти
        </button>
      </div>
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
  const res = await fetch(`${server}/api/categories`, {
    method: 'GET',
  })
  const cat = await res.json()
  return {
    props: {
      user: session.user,
      data: cat,
    },
  }
}
