import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { getSession } from 'next-auth/react'
import s from '../../../styles/services_add.module.css'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Script from 'next/script'
import Cloudinary from '../../../lib/cloudinary'
import { server } from '../../../config/index'
import ScrollBox from '../../../components/scrollbox'
import { useRouter } from 'next/router'
import useSWR, { useSWRConfig } from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function ServicesEditPage({ user, category }) {
  const { mutate } = useSWRConfig()
  const router = useRouter()
  const { data: uData } = useSWR(user ? `/api/user/${user.email}` : null, fetcher)
  const [newService, setNewService] = useState(false)

  const servicesModel = {
    owner_id: '',
    owner: user.email,
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

  useEffect(() => {
    setServ({ ...serv, owner_id: uData?._id })
  }, [uData])

  useEffect(() => {
    if (router.query.serviceid !== 'serviceadd') {
      fetch(`/api/services_api?q=${router.query.serviceid}`, {
        method: 'GET',
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.result === null) {
            setServ(servicesModel)
          } else {
            setNewService(false)
            setServ({
              id: data.result._id,
              owner_id: uData?._id,
              owner: data.result.owner,
              cat_top: data.result.cat_top,
              cat_parent: data.result.cat_parent,
              cat_service: data.result.cat_service,
              about: data.result.about,
              popularity: '',
              item_1: data.result.item_1,
              item_2: data.result.item_2,
              item_3: data.result.item_3,
              pic: data.result.pic,
            })
          }
        })
    } else {
      setNewService(true)
    }
  }, [uData])

  const categories = category.categories
  const poslugi = category.poslugi

  function checkboxToggle(e) {
    e.target.checked
      ? setServ({ ...serv, cat_top: [...serv.cat_top, e.target.value] })
      : setServ({ ...serv, cat_top: serv.cat_top.filter((i) => i !== e.target.value) })
  }

  function inputHandler(e) {
    let id = e.target.id
    let type = e.target.dataset.type
    let value = e.target.value

    setServ({ ...serv, [id]: { ...serv[id], opt: id, [type]: value } })
  }

  function photoHandler(result) {
    setServ((items) => ({ ...items, pic: [...items.pic, result.secure_url] }))
  }

  function photoDeleteHandler(e) {
    setServ({ ...serv, pic: serv.pic.filter((_, index) => index !== +e.target.id) })
  }

  async function pushData(e) {
    e.preventDefault(e)
    const response = await fetch(`/api/services_api?q=${router.query.serviceid}`, {
      method: newService ? 'POST' : 'PATCH',
      body: JSON.stringify(serv),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    console.log('Sended')
    if (data.result.acknowledged) {
      mutate(`/api/services/${user.email}`)
      router.push('/user/services')
    }
    console.log(data)
  }

  async function removeData(e) {
    e.preventDefault(e)
    const response = await fetch(`/api/services_api/?q=${router.query.serviceid}`, {
      method: 'DELETE',
      body: JSON.stringify(serv),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    console.log('Sended')

    if (data.result.deletedCount > 0) {
      mutate(`/api/services/${user.email}`)
      router.push('/user/services')
    }
    console.log(data.result.deletedCount > 0)
  }

  return (
    <div className={s.serv_wrapper}>
      <Head>
        <title>???????????? ?????? ???????????????????? ??????????????</title>
      </Head>
      <Script src='https://upload-widget.cloudinary.com/global/all.js' strategy='afterInteractive' />

      <div className='container'>
        <div className='sub_main'></div>
        <h3>?????????????? ?????????? ??????????????</h3>
        <div className={s.form}>
          <span className={s.serv_item}>
            <input
              className={s.input_serv}
              id='item_1'
              data-type='name'
              onChange={inputHandler}
              placeholder='?????????????? ??????????'
              value={serv.item_1.name}
            />
            <input
              className={s.input_serv}
              id='item_1'
              data-type='price'
              onChange={inputHandler}
              placeholder='????????'
              value={serv.item_1.price}
            />
            <input
              className={s.input_serv}
              id='item_1'
              data-type='dur'
              onChange={inputHandler}
              placeholder='????'
              value={serv.item_1.dur}
            />
          </span>

          <textarea
            className={s.input_desc}
            id='about'
            data-type='description'
            onChange={inputHandler}
            placeholder='?????????????? ?????????????? ????????'
            value={serv.about.description}
          />

          <p className={s.subtitle}>?????????????? ???????? (???? 8 ????)</p>
          <div className={s.photo_wrapper}>
            {serv.pic.map((i, index) => (
              <div key={i} className={s.photo_container}>
                <Image
                  style={{ borderRadius: '10px' }}
                  layout='responsive'
                  objectFit='cover'
                  width={80}
                  height={80}
                  src={i ? i : '/images/userplaceholder.png'}
                  alt='serv_pic'
                />
                <button className={s.button_rempicture} onClick={photoDeleteHandler}>
                  <Image id={index} src='/images/remove.png' width={20} height={20} alt='remove' />
                </button>
              </div>
            ))}
          </div>
          <div className={s.images_add}>
            {serv.pic.length < 8 && <Cloudinary uploadHandler={photoHandler} multiple={true} />}
          </div>
        </div>
        <h3>???????????????? ????????????</h3>
        <div className={s.spec}>
          <ScrollBox data={categories} checkboxToggle={checkboxToggle} checkStatus={serv.cat_top} />
        </div>
        <div className={s.buttons_block}>
          {router.query.serviceid !== 'serviceadd' && (
            <button className={s.btn_rem} onClick={removeData}>
              ????????????????
            </button>
          )}
          <button className={s.btn_add} onClick={pushData}>
            ????????????????
          </button>
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
      category: cat,
    },
  }
}
