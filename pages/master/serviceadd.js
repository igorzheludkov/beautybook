import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { getSession } from 'next-auth/react'
import DashNav from '../../components/dashnav'
import MasterNav from '../../components/masternav'
import dash from '../../styles/dash.module.css'
import s from '../../styles/services_add.module.css'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Script from 'next/script'
import Cloudinary from '../../lib/cloudinary'
import { server } from '../../config/index'


export default function ServicesPage({user, data}) {

  const categories = data.catigories
  const poslugi = data.poslugi
  console.log(data);

  const servicesModel = {
    owner: '',
    cat_top: '',
    cat_parent: '',
    cat_service: '',
    about: [],
    popularity: '',
    item_1: [],
    item_2: [],
    item_3: [],
    pic: [],
  }
  const [serv, setServ] = useState(servicesModel)
  const [photo, setPhoto] = useState([])
  console.log(serv)
  // console.log(photo)

  function inputHandler(e) {
    let id = e.target.id
    let type = e.target.dataset.type
    let value = e.target.value

    setServ({ ...serv, [id]: { ...serv[id], [type]: value } })
  }

  function photoHandler(result) {
    // console.log(result);
    // setPhoto(items => [...items, result.secure_url])
    setServ((items) => ({ ...items, pic: [...items.pic, result.secure_url] }))
  }

  return (
    <div className={s.serv_wrapper}>
      <Head>
        <title>Додати послугу</title>
      </Head>
      <DashNav />
      <MasterNav />
      <Script src='https://upload-widget.cloudinary.com/global/all.js' strategy='afterInteractive' />

      <h4>Виберіть розділ</h4>
      <div className='specialization'></div>
      <h4>Виберіть підкатегорію</h4>
      <div className='sub_cat'></div>
      <h4>Виберіть стандартну назву послуги</h4>
      <div className='sub_main'></div>
      <p>Вкажіть нижче назву послуги своїми словами. Якщо не вказувати, то буде стандартна назва:</p>
      <div className={s.form}>
        <span className={s.serv_item}>
          <input className={s.input_serv} id='item_1' data-type='name' onChange={inputHandler} placeholder='Введіть назву' />
          <input className={s.input_serv} id='item_1' data-type='price' onChange={inputHandler} placeholder='Ціна' />
          <input className={s.input_serv} id='item_1' data-type='dur' onChange={inputHandler} placeholder='Хв' />
        </span>
        <p>Додайте варіації, якщо є. Якщо змінюється тільки тривалість, то вкажіть тільки тривалість і вартість.</p>
        <span className={s.serv_item}>
          <input className={s.input_serv} id='item_2' data-type='name' onChange={inputHandler} placeholder='Введіть назву' />
          <input className={s.input_serv} id='item_2' data-type='price' onChange={inputHandler} placeholder='Ціна' />
          <input className={s.input_serv} id='item_2' data-type='dur' onChange={inputHandler} placeholder='Хв' />
        </span>
        <span className={s.serv_item}>
          <input className={s.input_serv} id='item_3' data-type='name' onChange={inputHandler} placeholder='Введіть назву' />
          <input className={s.input_serv} id='item_3' data-type='price' onChange={inputHandler} placeholder='Ціна' />
          <input className={s.input_serv} id='item_3' data-type='dur' onChange={inputHandler} />
        </span>
        <input className={s.input_desc} id='about' data-type='description' onChange={inputHandler} placeholder='Додайте коротки опис' />
        <p>Додайте фото (до 8 шт)</p>
        <div className={s.photo_wrapper}>
          {serv.pic.map((i) => (
            <div key={i} className={s.photo_container}>
              <Image className={dash.photo_serv} layout='responsive' objectFit='cover' width={80} height={80} src={i ? i : '/images/userplaceholder.png'} alt='serv_pic' />
            </div>
          ))}
        </div>
        <div className={s.images_wrapper}>
          <Cloudinary uploadHandler={photoHandler} multiple={true} />
        </div>
      </div>
    </div>
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
