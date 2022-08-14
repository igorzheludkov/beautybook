import Image from 'next/image'
import { useStoreContext } from '../context/store'
import s from './serviceitem.module.css'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { Router } from 'next/router'
import { useRouter } from 'next/router'

export default function ServiceItem({ data, user }) {
  const router = useRouter()
  const [store, setStore] = useStoreContext()
  const { data: session, status } = useSession()
  const [checked, setChecked] = useState()
  console.log('data', data._id)

  user && console.log(data)
  function cartHandler(e) {
    e.preventDefault()
    setStore({
      ...store,
      orders: [
        ...store.orders,
        {
          orderId: Date.now(),
          masterEmail: user.email,
          masterId: user._id,
          masterName: user.userData.name,
          masterSurname: user.userData.surname,
          street: user.userData.street,
          city: user.userData.city,
          location: user.userData.location,
          masterPhone: user.userData.phone,
          photo: user.userData.photo,
          serviceItem: data,
        },
      ],
    })
    setChecked(1)
  }

  const [fullView, setFullView] = useState('0')

  function fullViewHandler(e) {
    switch (e.target.value) {
      case '1':
        {
          setFullView('1')
        }
        break
      case '0':
        {
          setFullView('0')
        }
        break
    }
  }

  const view = fullView === '1' ? { width: '300px', height: '300px' } : {}

  return (
    <>
      <div className={s.serv_wrapper}>
        <div className='container'>
          <div className={s.serv_inner}>
            <div className={s.serv_item}>
              <span className={s.serv_title}>{data.item_1.name}</span>
              <span className={s.serv_price}>{data.item_1.price} грн</span>
              <span className={s.serv_duration}>{data.item_1.dur} хв</span>
            </div>
            <div className={s.serv_item}>
              {data.item_2.name && (
                <>
                  <span className={s.serv_subtitle}>{data.item_2.name}</span>
                  <span className={s.serv_subprice}>{data.item_2.price} грн</span>
                  <span className={s.serv_subduration}>{data.item_2.dur} хв</span>
                </>
              )}
            </div>
            <div className={s.serv_item}>
              {data.item_3.name && (
                <>
                  <span className={s.serv_subtitle}>{data.item_3.name}</span>
                  <span className={s.serv_subprice}>{data.item_3.price} грн</span>
                  <span className={s.serv_subduration}>{data.item_3.dur} хв</span>
                </>
              )}
            </div>
            <div className={s.serv_desc}>{data.about.description}</div>
          </div>
        </div>

        <div className={s.gallery_wrapper}>
          <div className={s.images}>
              <div className={s.images_wrapper}>
                {data.pic.map((i) => (
                  <div key={i} className={s.images_container} style={view}>
                    <Image
                      style={{ borderRadius: '10px' }}
                      layout='responsive'
                      objectFit='cover'
                      width={80}
                      height={80}
                      key={i}
                      src={i}
                      alt='service'
                    />
                  </div>
                ))}
              </div>
          </div>
        </div>
        <div className={s.buttons}>
          {fullView === '0' ? (
            <button className={s.gallery} onClick={fullViewHandler} value='1'>
              Дивитись фото
            </button>
          ) : (
            <button className={s.gallery} onClick={fullViewHandler} value='0'>
              Згорнути фото
            </button>
          )}
          {checked ? (
            <button
              className={s.gotocart}
              onClick={() => {
                router.push({
                  pathname: '/orders',
                })
              }}
            >
              Вибрати час і забронювати
            </button>
          ) : (
            <button className={s.addtocart} onClick={cartHandler}>
              Додати в кошик
            </button>
          )}
        </div>
      </div>
    </>
  )
}
