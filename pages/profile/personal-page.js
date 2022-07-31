import Head from 'next/head'
import Link from 'next/link'
import { getSession } from 'next-auth/react'
import DashNav from '../../components/dashnav'
import Layout from '../../components/layout'
import dash from '../../styles/dashboard.module.css'
import s from '../../styles/login.module.css'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

export default function PersonalPage() {
  const { data: session, status } = useSession()
  const [userPublic, setUserPublic] = useState('0')
  const [form, setForm] = useState({ about_me: ' ', city: ' ', email: ' ', location: '', name: '', phone: '', social_1: '', social_2: '', specialization_1: '', specialization_2: '', specialization_3: '', street: '', surname: '', work_begin: '', work_end: '' })
  const [imageSrc, setImageSrc] = useState()
  const [uploadData, setUploadData] = useState()

  useEffect(() => {
    if (session?.user.email) {
      fetch(`/api/userdata?q=${session.user.email}`, {
        method: 'GET'
      })
        .then((res) => res.json())
        .then((data) => {
          if (data === null) {
            console.log('new user');
            newUser()
          } else {
            setUserPublic(data)
            setForm(data.userData)
            console.log('registered user');
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

  function formHandler(e) {
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
    console.log('Sended');
  }
  return (
    <>
      <Head>
        <title>Персональна сторінка</title>
      </Head>

      <DashNav source='master' />
      <h1>Персональна сторінка</h1>
      <p>Адреса вашої сторінки {userPublic?._id}</p>
      <Link href={`/master/${userPublic?._id}`}>
        <a>Відкрити</a>
      </Link>
      <p>Додайте інформацію про себе</p>
      {userPublic && (
        <>
          
          <form>
            <label  className={dash.label} htmlFor='name'>Ваше ім`я</label>
            <input  className={dash.input_text} id='name' value={form?.name} onChange={formHandler}  type='text' placeholder={userPublic.name} />

            <label  className={dash.label} htmlFor='phone'>Ваш телефон</label>
            <input  className={dash.input_text} id='phone' value={form?.phone} onChange={formHandler}  type='text' placeholder={userPublic.phone} />

            <label  className={dash.label} htmlFor='surname'>Ваше прізвище</label>
            <input  className={dash.input_text} id='surname' value={form?.surname} onChange={formHandler}  type='text' placeholder={userPublic.surname} />

            <label  className={dash.label} htmlFor='social_1'>Ваш аккаунт в instagram</label>
            <input  className={dash.input_text} id='social_1' value={form?.social_1} onChange={formHandler}  type='text' placeholder={userPublic.social_1} />

            <label  className={dash.label} htmlFor='social_2'>Ваш акаунт в telegram</label>
            <input  className={dash.input_text} id='social_2' value={form?.social_2} onChange={formHandler}  type='text' placeholder={userPublic.social_2} />
            
            <label  className={dash.label} htmlFor='specialization_1'>Ваша основна спеціальність</label>
            <input  className={dash.input_text} id='specialization_1' value={form?.specialization_1} onChange={formHandler}  type='text' placeholder={userPublic.specialization_1} />

            <label  className={dash.label} htmlFor='specialization_2'>Ваша додаткова спеціальність</label>
            <input  className={dash.input_text} id='specialization_2' value={form?.specialization_2} onChange={formHandler}  type='text' placeholder={userPublic.specialization_2} />

            <label  className={dash.label} htmlFor='specialization_3'>Ваша додаткова спеціальність</label>
            <input  className={dash.input_text} id='specialization_3' value={form?.specialization_3} onChange={formHandler}  type='text' placeholder={userPublic.specialization_3} />

            <label  className={dash.label} htmlFor='about_me'>Розкажіть трохи про себе</label>
            <input  className={dash.input_text} id='about_me' value={form?.about_me} onChange={formHandler}  type='text' placeholder={userPublic.about_me} />

            <label  className={dash.label} htmlFor='city'>Ваше місто</label>
            <input  className={dash.input_text} id='city' value={form?.city} onChange={formHandler}  type='text' placeholder={userPublic.city} />

            <label  className={dash.label} htmlFor='street'>Вулиця</label>
            <input  className={dash.input_text} id='street' value={form?.street} onChange={formHandler}  type='text' placeholder={userPublic.street} />

            <label  className={dash.label} htmlFor='location'>Будівля або салон для орієнтиру</label>
            <input  className={dash.input_text} id='location' value={form?.location} onChange={formHandler}  type='text' placeholder={userPublic.location} />

            <label  className={dash.label} htmlFor='work_begin'>О котрій годині починаєте працювати?</label>
            <input  className={dash.input_text} id='work_begin' value={form?.work_begin} onChange={formHandler}  type='text' placeholder={userPublic.work_begin} />

            <label  className={dash.label} htmlFor='work_end'>Коли закінчуєте робочий день?</label>
            <input  className={dash.input_text} id='work_end' value={form?.work_end} onChange={formHandler}  type='text' placeholder={userPublic.work_end} />

            <button onClick={buttonHandler} className={dash.submit_btn}>
              Зберегти
            </button>
          </form>
        </>
      )}
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
