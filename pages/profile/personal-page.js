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
  const [form, setForm] = useState({ about_me: ' ', city: ' ', email: ' ', location: ' ', name: ' ', phone: ' ', social_1: ' ', social_2: ' ', specialization_1: ' ', specialization_2: ' ', specialization_3: ' ', street: ' ', surname: 'К', work_begin: ' ', work_end: ' ' })
  const [imageSrc, setImageSrc] = useState()
  const [uploadData, setUploadData] = useState()

  useEffect(() => {
    session &&
      fetch(`/api/userdata?q=${session.user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setUserPublic(data[0])
          setForm(data[0].userData)
        })
  }, [session])

    

  function formHandler(e) {
    let key = e.target.id
    setForm({ ...form, [key]: e.target.value })
  }

  async function buttonHandler(e) {
    e.preventDefault(e)
    const response = await fetch('/api/userdata', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    console.log(data)
  }
  return (
    <>
      <Head>
        <title>Персональна сторінка</title>
      </Head>

      <DashNav source='master' />
      <h1>Персональна сторінка</h1>
      <Link href={`/master/${userPublic._id}`}>
        <a>Go to master/[id].js</a>
      </Link>
      <p>Адреса вашої сторінки {userPublic._id}</p>
      <p>Додайте інформацію про себе</p>
      {userPublic && (
        <>
          <form method='post'>
            <input id='avatar' name='file' className={dash.input_text} type='file' placeholder='Upload your photo' />
            <p>
              <button>Upload Files</button>
            </p>
          </form>
          <form>
            <input id='name' value={form.name} onChange={formHandler} className={dash.input_text} type='text' placeholder={userPublic.name} />
            <input id='phone' value={form.phone} onChange={formHandler} className={dash.input_text} type='text' placeholder={userPublic.phone} />
            <input id='surname' value={form.surname} onChange={formHandler} className={dash.input_text} type='text' placeholder={userPublic.surname} />
            <input id='social_1' value={form.social_1} onChange={formHandler} className={dash.input_text} type='text' placeholder={userPublic.social_1} />
            <input id='social_2' value={form.social_2} onChange={formHandler} className={dash.input_text} type='text' placeholder={userPublic.social_2} />
            <input id='specialization_1' value={form.specialization_1} onChange={formHandler} className={dash.input_text} type='text' placeholder={userPublic.specialization_1} />
            <input id='specialization_2' value={form.specialization_2} onChange={formHandler} className={dash.input_text} type='text' placeholder={userPublic.specialization_2} />
            <input id='specialization_3' value={form.specialization_3} onChange={formHandler} className={dash.input_text} type='text' placeholder={userPublic.specialization_3} />
            <input id='about_me' value={form.about_me} onChange={formHandler} className={dash.input_text} type='text' placeholder={userPublic.about_me} />
            <input id='city' value={form.city} onChange={formHandler} className={dash.input_text} type='text' placeholder={userPublic.city} />
            <input id='street' value={form.street} onChange={formHandler} className={dash.input_text} type='text' placeholder={userPublic.street} />
            <input id='location' value={form.location} onChange={formHandler} className={dash.input_text} type='text' placeholder={userPublic.location} />
            <input id='work_begin' value={form.work_begin} onChange={formHandler} className={dash.input_text} type='text' placeholder={userPublic.work_begin} />
            <input id='work_end' value={form.work_end} onChange={formHandler} className={dash.input_text} type='text' placeholder={userPublic.work_end} />
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
