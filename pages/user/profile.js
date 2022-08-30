import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { getSession } from 'next-auth/react'
import s from '../../styles/profile.module.css'
import { useState, useEffect } from 'react'
import Script from 'next/script'
import Cloudinary from '../../lib/cloudinary'
import { server } from '../../config/index'
import ScrollBox from '../../components/scrollbox'
import { signIn, signOut, useSession } from 'next-auth/react'
import CheckboxButtons from '../../components/ui/checkboxbuttons'
import RadioButtons from '../../components/ui/radiobuttons'
import ToggleButtons from '../../components/ui/togglebuttons'
import Input from '../../components/ui/input'
import useSWR, { useSWRConfig } from 'swr'
import { useStoreContext } from '../../context/store'

export default function PersonalPage({ user, data }) {
  const [store, setStore] = useStoreContext()

  const { mutate } = useSWRConfig()

  const categories = data.categories

  const [saved, setSaved] = useState(0)
  const [unsaved, setUnsaved] = useState(0)

  const [form, setForm] = useState({
    userId: '',
    photo: '',
    about_me: '',
    city: '',
    location: '',
    name: '',
    phone: '',
    social_1: '',
    social_2: '',
    social_3: '',
    categories: [],
    street: '',
    surname: '',
    work_begin: '9',
    work_end: '18',
    interval: 15,
    horizon: 3,
    url: '',
    work_days: '',
    isPageVisibleInCat: 0,
    isBookingActivated: 0,
  })
  const settingsInitialState = {
    mon: { labelShort: 'Пн', label: 'Понеділок', checked: true, id: 'mon' },
    tue: { labelShort: 'Вт', label: 'Вівторок', checked: true, id: 'tue' },
    wen: { labelShort: 'Ср', label: 'Середа', checked: true, id: 'wen' },
    thu: { labelShort: 'Чт', label: 'Четвер', checked: true, id: 'thu' },
    fri: { labelShort: 'Пт', label: 'П`ятниця', checked: true, id: 'fri' },
    sat: { labelShort: 'Сб', label: 'Субота', checked: false, id: 'sat' },
    sun: { labelShort: 'Нд', label: 'Неділя', checked: false, id: 'sun' },
  }

  const [settings, setSettings] = useState(settingsInitialState)

  useEffect(() => {
    if (store.masterInfo) {
      setForm({ ...store.masterInfo.userData, userId: store.masterInfo._id })
      setSettings(store.masterInfo.userSettings ? store.masterInfo.userSettings : settingsInitialState)
    }
  }, [store])

  async function buttonHandler(e) {
    e.preventDefault(e)
    saveData()
    setSaved(1)
    setSaved(0)
  }

  async function settingsHandler(e) {
    const update = {
      ...settings,
      [e.target.id]: { ...settings[e.target.id], checked: e.target.checked },
    }
    setSettings(update)
    setUnsaved(1)
    setSaved(0)
  }

  function inputHandler(e) {
    let key = e.target.id
    setForm({ ...form, [key]: e.target.value })
    setUnsaved(1)
    setSaved(0)
  }

  function checkboxToggle(e) {
    if (form.categories) {
      e.target.checked
        ? setForm({ ...form, categories: [...form.categories, e.target.value] })
        : setForm({ ...form, categories: form.categories.filter((i) => i !== e.target.value) })
    } else {
      setForm({ ...form, categories: [e.target.value] })
    }
    setUnsaved(1)
    setSaved(0)
  }

  function avatarHandler(result) {
    setForm(() => ({ ...form, photo: result.secure_url }))
    setUnsaved(1)
    setSaved(0)
  }

  console.log(+form.isBookingActivated)
  store.masterInfo &&
    console.log(!(store?.masterInfo?.userData?.isBookingActivated == +form.isBookingActivated))
  async function saveData() {
    const response = await fetch('/api/userdata', {
      method: 'POST',
      body: JSON.stringify({ email: user.email, userData: form, userSettings: settings }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    console.log(data)
    if (
      form.social_2 &&
      +form.isBookingActivated &&
      !(store?.masterInfo?.userData?.isBookingActivated == +form.isBookingActivated)
    ) {
      console.log('booking and telegram nickname fields completed')
      const setNotifications = await fetch('/api/notifications', {
        method: 'POST',
        body: JSON.stringify({
          email: user.email,
          telegramNickname: form.social_2,
          apiMethod: 'sendMessage',
          parseMode: 'HTML',
          message: `Сповіщення про бронювання активовано.%0A%0AВи будете отримувати сповіщення про нові бронювання миттєво.`,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const notificationsStatus = await setNotifications.json()
      console.log(notificationsStatus)
    }
    mutate(`/api/userdata?q=${user.email}`)
    setSaved(1)
    setTimeout(() => {
      setUnsaved(0)
    }, 1000)
  }

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

      <div className={s.main_wrapper}>
        <div className={s.sidebar_left}>
          <div className='container'>
            <div className={s.profile_nav}>
              {form.userId?.length > 0 ? (
                <button className={s.nav_button}>
                  <Link href={`/${form.userId}`}>
                    <a>Відкрити вашу сторінку</a>
                  </Link>
                </button>
              ) : null}
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
              <span>Нікнейм в telegram необхідний для можливості отримання сповіщень про бронювання</span>
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
          </div>
          <div className='container'>
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
          </div>
          <div className={s.scrollbox_wrapper}>
            <p className={s.paragraph}>Виділіть ваші навики</p>
            <ScrollBox data={categories} checkboxToggle={checkboxToggle} checkStatus={form.categories} />
          </div>
        </div>
        <div className={s.sidebar_right}>
          
          
          <div className={s.settings}>
            <h2 className={s.title_h2}>Налаштування</h2>

            <p className={s.paragraph}>Відображати сторінку в каталозі?</p>
            <ToggleButtons
              data={{
                label: [
                  { name: 'Так', value: 1 },
                  { name: 'Ні', value: 0 },
                ],
                id: 'isPageVisibleInCat',
              }}
              inputHandler={inputHandler}
              value={form.isPageVisibleInCat}
            />
            <p className={s.paragraph}>Функція бронювання активна?</p>
            <ToggleButtons
              data={{
                label: [
                  { name: 'Так', value: 1 },
                  { name: 'Ні', value: 0 },
                ],
                id: 'isBookingActivated',
              }}
              inputHandler={inputHandler}
              value={form.isBookingActivated}
            />

            <p className={s.paragraph}>Виділіть робочі дні</p>

            <CheckboxButtons data={settings} handler={settingsHandler} status={settings} default={0} />

            <p className={s.paragraph}>О котрій годині починаєте працювати?</p>
            <RadioButtons
              data={{ label: [8, 9, 10, 11, 12, 13], id: 'work_begin' }}
              inputHandler={inputHandler}
              value={form.work_begin}
            />
            <p className={s.paragraph}>Коли закінчуєте робочий день?</p>
            <RadioButtons
              data={{ label: [16, 17, 18, 19, 20, 21, 22, 23, 24], id: 'work_end' }}
              inputHandler={inputHandler}
              value={form.work_end}
            />
            <p className={s.paragraph}>На скільки місяців наперед клієнти можуть бронювати?</p>
            <RadioButtons
              data={{ label: [1, 3, 12], id: 'horizon' }}
              inputHandler={inputHandler}
              value={form.horizon}
            />
            <p className={s.paragraph}>Скільки хвилин має бути інтервал між бронюваннями?</p>
            <RadioButtons
              data={{ label: [15, 30], id: 'interval' }}
              inputHandler={inputHandler}
              value={form.interval}
            />

            <div className={s.worktime_wrapper}></div>
          </div>

          <div className={s.button_container}>
            {unsaved ? (
              <button onClick={buttonHandler} className={s.submit_btn}>
                {saved > 0 ? 'Інформацію збережено' : 'Зберегти'}
              </button>
            ) : (
              ''
            )}
          </div>
        </div>
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
