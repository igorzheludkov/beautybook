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
import CheckboxButtons from '../../components/ui/checkboxbuttons'
import RadioButtons from '../../components/ui/radiobuttons'
import Input from '../../components/ui/input'

let counter = 0
export default function PersonalPage({ user, data }) {
  const categories = data.categories

  counter++
  // console.log('COUNTER', counter)
  const router = useRouter()
  const { data: session, status } = useSession()
  const [userPublic, setUserPublic] = useState([])
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

  const [settings, setSettings] = useState({
    isPageVisibleInCat: {
      label: 'Сторінка видима в каталозі',
      id: 'isPageVisibleInCat',
      checked: false,
    },
    isBookingActivated: {
      label: 'Активувати бронювання',
      id: 'isBookingActivated',
      checked: false,
    },
  })

  async function settingsHandler(e) {
    const update = {
      ...settings,
      [e.target.id]: { ...settings[e.target.id], checked: e.target.checked },
    }
    setSettings(update)

    const response = await fetch(`/api/userdata`, {
      method: 'PATCH',
      body: JSON.stringify({ email: session.user.email, userSettings: update }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    console.log(data)
  }

  useEffect(() => {
    if (session?.user.email) {
      fetch(`/api/userdata?q=${session.user.email}`, {
        method: 'GET',
      })
        .then((res) => res.json())
        .then((data) => {
          if (data === null) {
            newUser()
          } else {
            setUserPublic(data)
            setForm(data.userData)
          }
        })
    }
  }, [session])

  useEffect(() => {
    userPublic.userSettings ? setSettings(userPublic.userSettings) : null
  }, [userPublic])

  // console.log('settings', settings)

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
    setForm(() => ({ ...form, photo: result.secure_url }))
  }

  const aboutMe = {
    id: 'about_me',
    tp: 'text',
    vl: 'Розкажіть коротко про себе. Це речення буде на головній сторінці біля фото',
    icon: '/images/profile.png',
  }
  
  if (!form) return <div>Loading...</div>

  console.log(form)

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
            <Input
              data={{ id: 'name', tp: 'text', label: ['Ваше ім`я'] }}
              inputHandler={inputHandler}
              value={form.name}
              state={form}
            />
            <Input
              data={{ id: 'surname', tp: 'text', label: ['Ваше прізвище'] }}
              inputHandler={inputHandler}
              value={form.surname}
              state={form}
            />
            <Input
              data={{ id: 'phone', tp: 'text', label: ['Ваше номер телефону'] }}
              inputHandler={inputHandler}
              value={form.phone}
              state={form}
            />
          </div>
        </div>

        <div className={s.social_wrapper}>
          <Input
            data={{
              id: 'social_1',
              tp: 'text',
              label: ['Ваше нікнейм в instagram'],
              icon: '/images/instagram.png',
            }}
            inputHandler={inputHandler}
            value={form.social_1}
            state={form}
          />
          <Input
            data={{
              id: 'social_2',
              tp: 'text',
              label: ['Ваше нікнейм в telegram'],
              icon: '/images/telegram.png',
            }}
            inputHandler={inputHandler}
            value={form.social_2}
            state={form}
          />
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
          <Input
            data={{
              id: 'city',
              tp: 'text',
              label: ['Ваше місто'],
              icon: '/images/adress.png',
            }}
            inputHandler={inputHandler}
            value={form.city}
            state={form}
          />
          <Input
            data={{
              id: 'street',
              tp: 'text',
              label: ['Вулиця'],
              icon: '/images/adress.png',
            }}
            inputHandler={inputHandler}
            value={form.city}
            state={form}
          />
          <Input
            data={{
              id: 'location',
              tp: 'text',
              label: ['Будівля або салон для орієнтиру'],
              icon: '/images/adress.png',
            }}
            inputHandler={inputHandler}
            value={form.city}
            state={form}
          />
        </div>
        <h2 className={s.title_h2}>Налаштування</h2>
        <CheckboxButtons data={settings} settingsHandler={settingsHandler} status={settings} />
        <h4>Додайте ваш графік роботи</h4>
        <p>О котрій годині починаєте працювати?</p>
        <RadioButtons
          data={{ label: [8, 9, 10, 11, 12, 13], id: 'work_begin' }}
          inputHandler={inputHandler}
          value={form.work_begin}
        />
        <p>Коли закінчуєте робочий день?</p>
        <RadioButtons
          data={{ label: [16, 17, 18, 19, 20, 21, 22, 23, 24], id: 'work_end' }}
          inputHandler={inputHandler}
          value={form.work_end}
        />
        <p>На скільки місяців наперед клієнти можуть бронювати?</p>
        <RadioButtons
          data={{ label: [1,3,12], id: 'horizon' }}
          inputHandler={inputHandler}
          value={form.horizon}
        />
        <p>Скільки хвилин має бути інтервал між бронюваннями?</p>
        <RadioButtons
          data={{ label: [10,20,30], id: 'interval' }}
          inputHandler={inputHandler}
          value={form.interval}
        />

        <div className={s.worktime_wrapper}></div>
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
