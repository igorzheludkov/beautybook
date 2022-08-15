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
import ToggleButtons from '../../components/ui/togglebuttons'
import Input from '../../components/ui/input'
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json())

let counter = 0
export default function PersonalPage({ user, data }) {
  const { data: uData } = useSWR(user ? `/api/userdata?q=${user.email}` : null, fetcher)

  const categories = data.categories

  counter++
  console.log('COUNTER', counter)
  const router = useRouter()
  const { data: session, status } = useSession()
  const [saved, setSaved] = useState(0)
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
    social_3: '',
    categories: [],
    street: '',
    surname: '',
    work_begin: '',
    work_end: '',
    interval: 10,
    horizon: 3,
    url: '',
    work_days: '',
    isPageVisibleInCat: 0,
    isBookingActivated: 0,
  })

  useEffect(() => {
    if (uData) {
      setUserPublic(uData)
      setForm(uData.userData)
      setSettings(uData.userSettings)
    } else if (uData === null) {
      newUser()
    }
  }, [uData])

  const [settings, setSettings] = useState({
    mon: { label: 'Понеділок', checked: false, id: 'mon' },
    tue: { label: 'Вівторок', checked: false, id: 'tue' },
    wen: { label: 'Середа', checked: false, id: 'wen' },
    thu: { label: 'Четвер', checked: false, id: 'thu' },
    fri: { label: 'П`ятниця', checked: false, id: 'fri' },
    sat: { label: 'Субота', checked: false, id: 'sat' },
    sun: { label: 'Неділя', checked: false, id: 'sun' },
  })
  console.log('settings', settings)

  async function settingsHandler(e) {
    const update = {
      ...settings,
      [e.target.id]: { ...settings[e.target.id], checked: e.target.checked },
    }
    setSettings(update)
  }

  console.log('form', form)

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
    const settingsUpdate = await fetch(`/api/userdata`, {
      method: 'PATCH',
      body: JSON.stringify({ email: session.user.email, userSettings: settings }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const responseUpdate = await settingsUpdate.json()
    setSaved(1)
    console.log(responseUpdate)
    setTimeout(() => {
      setSaved(0)
    }, 1000)
  }

  function avatarHandler(result) {
    setForm(() => ({ ...form, photo: result.secure_url }))
  }

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

  // console.log(form);
  const aboutMe = {
    id: 'about_me',
    tp: 'text',
    vl: 'Розкажіть коротко про себе. Це речення буде на головній сторінці біля фото',
    icon: '/images/profile.png',
  }

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
              data={{ id: 'phone', tp: 'text', label: ['Ваш номер телефону'] }}
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
              label: ['Ваш нікнейм в instagram без @'],
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
              label: ['Ваш нікнейм в telegram без @'],
              icon: '/images/telegram.png',
            }}
            inputHandler={inputHandler}
            value={form.social_2}
            state={form}
          />
          <Input
            data={{
              id: 'social_3',
              tp: 'text',
              label: ['Ваш номер з вайбером у вигляді 380...'],
              icon: '/images/viber.png',
            }}
            inputHandler={inputHandler}
            value={form.social_3}
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

        <p>Відображати сторінку в каталозі?</p>
        <ToggleButtons
          data={{ label: [{name: 'Так', value: 1}, {name: 'Ні', value: 0}], id: 'isPageVisibleInCat' }}
          inputHandler={inputHandler}
          value={form.isPageVisibleInCat}
        />
        <p>Функція бронювання активна?</p>
        <ToggleButtons
          data={{ label: [{name: 'Так', value: 1}, {name: 'Ні', value: 0}], id: 'isBookingActivated' }}
          inputHandler={inputHandler}
          value={form.isBookingActivated}
        />

        <h4>Додайте ваш графік роботи</h4>
        <p>Виділіть робочі дні</p>

        <CheckboxButtons data={settings} handler={settingsHandler} status={settings} />

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
          data={{ label: [1, 3, 12], id: 'horizon' }}
          inputHandler={inputHandler}
          value={form.horizon}
        />
        <p>Скільки хвилин має бути інтервал між бронюваннями?</p>
        <RadioButtons
          data={{ label: [10, 20, 30], id: 'interval' }}
          inputHandler={inputHandler}
          value={form.interval}
        />

        <div className={s.worktime_wrapper}></div>
      </div>

      <div className={s.button_container}>
        <button onClick={buttonHandler} className={s.submit_btn}>
          {saved > 0 ? 'Інформацію збережено' : 'Зберегти'}
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
